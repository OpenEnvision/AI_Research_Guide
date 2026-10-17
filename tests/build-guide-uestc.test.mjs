// Regression contracts for the bilingual guide, presentation homepages, and
// nested / independently hosted editions.
//
// These exist because the skin reuses the first edition's HTML fragments and
// browser JS verbatim, which makes three classes of breakage silent:
//   · a missing JS-bound id — guide.js:3 dereferences #theme first and would
//     throw, killing the menu, search, QA expansion and paper dialogs;
//   · a wrong asset prefix — the second edition sits one directory deeper, and
//     some asset paths are authored in Markdown no template can reach;
//   · a token the skin forgot to define — the fragments then fall back to the
//     first edition's palette (or a JS default) and quietly look wrong.
// Run with: npm test   (node --test, no dependencies)
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { loadGuide, validateGuide, buildSearchData, filename } from '../scripts/guide-model.mjs';
import { assertAssetsResolve, localRefs, missingRefs } from '../scripts/guide-verify.mjs';
import { landingPage } from '../scripts/guide-landing.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const guide = path.join(root, 'public/blog/guide');
const uestc = path.join(guide, 'guide-uestc');
const standalone = path.join(root, 'dist/guide-uestc-guide');
const pagesPackage = path.join(root, 'dist/github-pages');
const LANGS = ['zh', 'en'];

// Inspect rendered navigation, so these contracts also cover wrong paths or
// active-language state passed by a caller of the shared language component.
const languageGroup = (html, { lang, enHref, zhHref, context }) => {
  const groups = [...html.matchAll(/<div\b[^>]*class="[^"]*\blanguage-switch\b[^"]*"[^>]*>[\s\S]*?<\/div>/g)];
  assert.equal(groups.length, 1, `${context}: expected one language selector`);
  const group = groups[0][0];
  assert.match(group, /role="group"/);
  assert.match(group, /aria-label="[^"]+"/);
  const links = [...group.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)];
  assert.deepEqual(links.map(link => link[2].trim()), ['EN', 'CN'], `${context}: visible language choices changed`);
  assert.equal(links.filter(link => /aria-current="page"/.test(link[1])).length, 1, `${context}: current language must be unambiguous`);
  for (const [index, code, href] of [[0, 'en', enHref], [1, 'zh-CN', zhHref]]) {
    const attrs = links[index][1];
    assert.ok(attrs.includes(`href="${href}"`), `${context}: ${code} points to the wrong page`);
    assert.match(attrs, new RegExp(`\\blang="${code}"`), `${context}: ${code} has an invalid language tag`);
    assert.match(attrs, new RegExp(`\\bhreflang="${code}"`), `${context}: ${code} has an invalid destination language`);
    assert.equal(/aria-current="page"/.test(attrs), code === (lang === 'zh' ? 'zh-CN' : 'en'), `${context}: ${code} has the wrong active state`);
  }
  assert.match(group, /<span\b[^>]*aria-hidden="true"[^>]*>\/<\/span>/);
  return links;
};

test('default, nested, and standalone editions build', () => {
  // Unpublishing an article must also remove output left by an earlier build.
  for (const lang of LANGS) {
    fs.mkdirSync(path.join(guide, lang), { recursive: true });
    fs.writeFileSync(path.join(guide, lang, 'timeline.html'), 'stale annual review');
  }
  execFileSync(process.execPath, ['scripts/build-github-pages.mjs'], { cwd: root, stdio: 'pipe' });
  // Simulate files left by a previous 40-page club build.
  for (const lang of LANGS) {
    fs.mkdirSync(path.join(uestc, lang), { recursive: true });
    for (const id of ['welcome', 'timeline', 'life', 'experience', 'experiments', 'publishing'])
      fs.writeFileSync(path.join(uestc, lang, `${id}.html`), 'stale personal page');
  }
  execFileSync(process.execPath, ['scripts/build-guide-uestc.mjs'], { cwd: root, stdio: 'pipe' });
  execFileSync(process.execPath, ['scripts/build-guide-uestc.mjs', '--standalone'], { cwd: root, stdio: 'pipe' });
});

const pagesOf = (dir, lang) =>
  fs.readdirSync(path.join(dir, lang)).filter(f => f.endsWith('.html')).sort();

test('club output follows its manifest and removes stale personal pages', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'content/guide/uestc/manifest.json'), 'utf8'));
  const personalManifest = JSON.parse(fs.readFileSync(path.join(root, 'content/guide/manifest.json'), 'utf8'));
  assert.equal(personalManifest.length, 45);
  assert.equal(manifest.length, 42);
  for (const lang of LANGS) {
    const a = pagesOf(guide, lang);
    const b = pagesOf(uestc, lang);
    assert.equal(a.length, personalManifest.length + 2, `${lang}: default pages must match the manifest plus two legacy redirects`);
    assert.equal(b.length, manifest.length);
    assert.deepEqual(b, manifest.map(p => filename(p.id)).sort());
    assert.deepEqual(pagesOf(standalone, lang), b, `${lang}: standalone article set differs`);
    for (const id of ['welcome', 'timeline', 'life', 'experience', 'experiments', 'publishing'])
      assert.ok(!b.includes(`${id}.html`), `${lang}: excluded page ${id} survived`);
  }
});

// Derived from the browser JS rather than hardcoded, so adding a binding to
// guide.js/fieldnotes.js fails this test until the shell carries it.
const boundIds = () => {
  const ids = new Set();
  for (const file of ['guide.js', 'fieldnotes.js']) {
    const src = fs.readFileSync(path.join(guide, file), 'utf8');
    for (const m of src.matchAll(/\$\('([A-Za-z][\w-]*)'\)/g)) ids.add(m[1]);
    for (const m of src.matchAll(/getElementById\('([A-Za-z][\w-]*)'\)/g)) ids.add(m[1]);
    for (const m of src.matchAll(/querySelector(?:All)?\('#([A-Za-z][\w-]*)'\)/g)) ids.add(m[1]);
  }
  return [...ids].sort();
};

test('#theme survives — guide.js dereferences it before anything else', () => {
  // guide.js:3 is `$('theme').onclick=...` as the IIFE's first statement. If the
  // element is absent the whole script throws and every other binding is lost.
  for (const edition of [guide, uestc]) for (const lang of LANGS)
    for (const page of pagesOf(edition, lang).filter(file => !['experiments.html', 'publishing.html'].includes(file))) {
      const html = fs.readFileSync(path.join(edition, lang, page), 'utf8');
      assert.match(html, /id="theme"/, `${lang}/${page}: missing #theme`);
      // The shared academic reader has no dark theme toggle.
      assert.match(html, /id="theme"[^>]*\shidden/, `${lang}/${page}: #theme must be hidden`);
    }
});

test('every JS-bound id is present on every page', () => {
  const skip = new Set(['paper-domain', 'paper-query', 'paper-count', 'expand']); // page-specific
  const required = boundIds().filter(id => !skip.has(id));
  assert.ok(required.includes('theme') && required.includes('nav'), 'id derivation broke');
  for (const edition of [guide, uestc]) for (const lang of LANGS)
    for (const page of pagesOf(edition, lang).filter(file => !['experiments.html', 'publishing.html'].includes(file))) {
      const html = fs.readFileSync(path.join(edition, lang, page), 'utf8');
      for (const id of required)
        assert.match(html, new RegExp(`id="${id}"`), `${lang}/${page}: missing #${id}`);
    }
});

test('page-specific bindings appear where they are used', () => {
  const expect = {
    'research.html': ['expand'],
    'papers.html': ['paper-domain', 'paper-query', 'paper-count'],
  };
  for (const edition of [guide, uestc]) for (const lang of LANGS)
    for (const [page, ids] of Object.entries(expect)) {
      const html = fs.readFileSync(path.join(edition, lang, page), 'utf8');
      for (const id of ids)
        assert.match(html, new RegExp(`id="${id}"`), `${lang}/${page}: missing #${id}`);
    }
});

test('community participation uses the guide issue tracker without a legacy feed or inactive controls', () => {
  for (const edition of [guide, uestc, standalone]) for (const lang of LANGS) {
    const html = fs.readFileSync(path.join(edition, lang, 'ama.html'), 'utf8');
    assert.match(html, /id="community-participation"/);
    assert.match(html, /href="https:\/\/github\.com\/OpenEnvision\/ai_research_guide\/issues"/);
    assert.match(html, /href="research\.html"/);
    assert.match(html, /href="contact\.html"/);
    assert.doesNotMatch(html, /Takamatsu-Hikaru|ama-data|ama-query|ama-refresh|ama-list|Loading discussions|正在加载讨论/);
    assert.doesNotMatch(html, /<script[^>]+src="[^"]*ama\.js/);
    const participation = html.match(/<section id="community-participation"[\s\S]*?<\/section>/)?.[0];
    assert.ok(participation);
    assert.doesNotMatch(participation, /<(?:form|input|button)\b/);
  }
  const compatibility = fs.readFileSync(path.join(guide, 'ama.js'), 'utf8');
  assert.doesNotMatch(compatibility, /fetch\s*\(|raw\.githubusercontent\.com|ama-data/);
});

const VOID = new Set(['img', 'br', 'input', 'hr', 'meta', 'link', 'source', 'track', 'area', 'base', 'col', 'embed', 'param', 'wbr']);
// Direct element children of an HTML fragment, ignoring anything nested.
const directChildren = (inner) => {
  const out = [];
  let depth = 0;
  for (const m of inner.matchAll(/<(\/?)([a-zA-Z][\w-]*)\b([^>]*)>/g)) {
    const [, close, tag, attrs] = m;
    if (close) { depth--; continue; }
    if (depth === 0) out.push({ tag: tag.toLowerCase(), attrs });
    if (!VOID.has(tag.toLowerCase()) && !/\/\s*$/.test(attrs)) depth++;
  }
  return out;
};

test('every direct <a> child of #nav is a nav link', () => {
  // Two contracts decide this. `#nav>a.nav-collapsed` is a child selector, so
  // the links must be direct children. And initNavigation() (guide-motion.js:828)
  // walks FORWARD from each .navgroup toggling .nav-collapsed on its <a>
  // siblings until it reaches the next .navgroup or runs out of siblings — so
  // any other direct <a> child placed after the last group gets swallowed when
  // that group is collapsed. The external GitHub link is wrapped in a <div>
  // for exactly that reason; this test is what keeps it that way.
  for (const edition of [guide, uestc]) for (const lang of LANGS) {
    const html = fs.readFileSync(path.join(edition, lang, 'index.html'), 'utf8');
    const nav = html.match(/<aside id="nav"[\s\S]*?<\/aside>/)?.[0];
    assert.ok(nav, `${lang}: no #nav`);
    const inner = nav.slice(nav.indexOf('>') + 1, nav.lastIndexOf('</aside>'));
    const links = directChildren(inner).filter(el => el.tag === 'a');
    assert.ok(links.length > 10, `${lang}: expected the nav links as direct children, found ${links.length}`);
    for (const { attrs } of links)
      assert.match(attrs, /href="(?:[a-z0-9-]+\.html|(?:\.\.\/){1,2}wiki\/(?:index|en)\.html)"/, `${lang}: a non-page link is a direct child of #nav: <a${attrs}>`);
  }
});

test('every asset reference in the uestc edition resolves', () => {
  assertAssetsResolve(uestc, 'guide-uestc edition');
});

test('both readers identify the guide and its repository without depending on brand markup', () => {
  for (const edition of [guide, uestc]) for (const lang of LANGS) {
    const html = fs.readFileSync(path.join(edition, lang, 'index.html'), 'utf8');
    assert.match(html, /<title>[^<]+ · OpenEnvision<\/title>/);
    assert.match(html, /logo-openenvision\.png/);
    assert.match(html, /<link rel="icon" href="(?:\.\.\/)+favicon-openenvision\.png"/);
    assert.match(html, /href="https:\/\/github\.com\/OpenEnvision\/ai_research_guide"/);
    assert.match(html, /href="https:\/\/github\.com\/OpenEnvision\/ai_research_guide\/edit\/main\/content\/guide\//);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `${edition}/${lang}: expected a single article title`);
    assert.doesNotMatch(html, /UESTC AI/);
  }
});

// A wrong prefix is the specific failure this guards: the fragment modules take
// an `assets` argument that defaults to '../' (the first edition's depth), so a
// call site that forgets to thread '../../' produces a plausible-looking but
// dead path. `../search-data.js` and the ../zh/ ../en/ page links are correctly
// one level up and are deliberately not in this list.
test('shared assets are referenced at the deeper prefix', () => {
  const shallow = /(?:src|href|poster)="\.\.\/(?:figures|brands|chronicle|sources)\/|(?:src|href)="\.\.\/(?:logo(?:-openenvision)?|favicon-openenvision)\.png"/;
  for (const lang of LANGS)
    for (const page of pagesOf(uestc, lang)) {
      const html = fs.readFileSync(path.join(uestc, lang, page), 'utf8');
      const hit = html.match(shallow);
      assert.equal(hit, null, `${lang}/${page}: shared asset referenced at the wrong depth: ${hit?.[0]}`);
    }
});

test('shared articles stay identical across editions', () => {
  const personal = loadGuide(root);
  const club = loadGuide(root, '../', 'uestc');
  for (const lang of LANGS) for (const page of club.all[lang]) {
    if (page.id === 'home') continue; // Compact overview omits links to archived personal essays.
    const other = personal.all[lang].find(p => p.id === page.id);
    assert.equal(other.html, page.html, lang + '/' + page.id);
    assert.equal(other.title, page.title);
    assert.equal(other.group, page.group);
  }
});

test('personal additions survive without restoring removed teaching copy', () => {
  const { all } = loadGuide(root);
  for (const lang of LANGS) {
    assert.ok(all[lang].find(p => p.id === 'home').html.includes('welcome.html'));
    const lesswrong = all[lang].find(p => p.id === 'lesswrong').html;
    for (const slug of ['working-yourself-ragged-is-not-a-virtue', 'tsuyoku-naritai-i-want-to-become-stronger', 'generalizing-from-one-example'])
      assert.ok(lesswrong.includes(slug), lang + ': missing ' + slug);
    for (const id of ['experiments', 'publishing']) {
      assert.ok(!all[lang].some(p => p.id === id));
      assert.match(fs.readFileSync(path.join(guide,lang,id+'.html'),'utf8'), /http-equiv="refresh"/);
    }
    assertAssetsResolve(path.join(guide, lang), 'personal ' + lang);
  }
  assert.doesNotMatch(all.zh.find(p => p.id === 'lesswrong').plain, /读的时候想一想|讲什么：/);
});

test('club articles, navigation, and search have no removed-page links or personal promotion', () => {
  const { all, manifest } = loadGuide(root, '../../', 'uestc');
  validateGuide(all, manifest);
  const excluded = /^(?:\.{1,2}\/)*(?:(?:zh|en)\/)?(?:welcome|timeline|life|experience)\.html(?:[?#]|$)/;
  for (const lang of LANGS) {
    for (const p of all[lang]) {
      const rendered = fs.readFileSync(path.join(uestc, lang, filename(p.id)), 'utf8');
      for (const link of rendered.matchAll(/\bhref="([^\"]+)"/g))
        assert.doesNotMatch(link[1], excluded, `${lang}/${p.id}: removed local page`);
      assert.doesNotMatch(p.html, /https:\/\/takamatsu-hikaru\.github\.io\/blog\//i);
      assert.doesNotMatch(p.plain, /顿觉天地宽|写给刚进大学的你|怎么好好生活|甜蜜的牢房|愚者之峰|rising star|personal progress|living well/i);
      for (const match of p.html.matchAll(/<a\b[^>]*href="irene-workflow\.html[^\"]*"[^>]*>([^]*?)<\/a>/g))
        assert.doesNotMatch(match[1], /irene|experience|经历/i, `${lang}/${p.id}: personality-led workflow label`);
    }
    const search = buildSearchData(all)[lang];
    assert.ok(search.length > manifest.length);
    for (const p of all[lang]) assert.ok(search.some(item => item.url === filename(p.id)), `${lang}/${p.id}: article is missing from search`);
    for (const item of search) assert.doesNotMatch(item.url, excluded);
    assert.doesNotMatch(fs.readFileSync(path.join(uestc, 'search-data.js'), 'utf8'), /"url":"(?:welcome|timeline|life|experience)\.html(?:[?#"])/);
    const research = all[lang].find(p => p.id === 'research');
    assert.equal((research.html.match(/class="qa"/g) || []).length, 60);
  }
});

test('both languages and editions retain the resource catalog and all sixty research questions', () => {
  const reports = [];
  for (const edition of ['personal', 'uestc']) {
    const { all, manifest } = loadGuide(root, '../', edition);
    const report = validateGuide(all, manifest);
    reports.push(report);
    assert.equal(report.questionsPerLanguage, 60);
    assert.equal(report.resourceEntries.zh, report.resourceEntries.en);
    assert.ok(report.resourceEntries.en >= 141, `${edition}: catalog entries were dropped`);
    for (const lang of LANGS) {
      const questions = [...all[lang].find(p => p.id === 'research').html.matchAll(/<details class="qa" id="(q\d+)"/g)].map(m => m[1]);
      assert.equal(questions.length, 60);
      assert.equal(new Set(questions).size, 60, `${edition}/${lang}: duplicate research question IDs`);
    }
  }
  assert.deepEqual(reports[0].resourceEntries, reports[1].resourceEntries);
});

test('workflow attribution, requested authors, earlier guide provenance, and correct edit sources survive', () => {
  const { all } = loadGuide(root, '../../', 'uestc');
  for (const lang of LANGS) {
    const workflow = all[lang].find(p => p.id === 'irene-workflow');
    assert.equal(workflow.group, '科研实践');
    assert.match(workflow.html, /https:\/\/github.com\/tseirene6/);
    assert.doesNotMatch(workflow.title, /irene/i);
    const blog = all[lang].find(p => p.id === 'blogs');
    for (const name of ['Purshow', 'Wenhao Chai', 'knightnemo', 'Elon Musk', 'Sam Altman', 'Dario Amodei'])
      assert.ok(blog.plain.includes(name), `Missing ${name}`);
    const memberSection = blog.html.slice(blog.html.lastIndexOf('<h3'));
    const memberLinks = [...memberSection.matchAll(/href="([^\"]+)"/g)].map(m => m[1]);
    assert.deepEqual(memberLinks, ['https://github.com/Takamatsu-Hikaru/AI-Research-Guide', 'about.html']);
    for (const p of all[lang]) {
      const source = `content/guide/${lang}/${p.id}.md`;
      assert.equal(p.sourcePath, source, `${lang}/${p.id}: stale edition-specific source`);
      for (const edition of [guide, uestc, standalone]) {
        const html = fs.readFileSync(path.join(edition, lang, filename(p.id)), 'utf8');
        assert.ok(html.includes(`/edit/main/${source}`), `${edition}/${lang}/${p.id}: wrong edit link`);
        assert.match(html, /<link rel="stylesheet" href="(?:\.\.\/)+guide-academic\.css(?:\?[^"]*)?">/);
        const styles = [...html.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map(m => m[1]);
        assert.ok(styles.at(-1).includes('language-switch.css'), `${edition}/${lang}/${p.id}: shared language selector overrides must load last`);
      }
    }
  }
});

test('the skin defines every token the reused fragments need', () => {
  // The whole reuse-by-token approach rests on this: an undefined token makes
  // the fragment fall back to the first edition's palette or a JS default.
  const used = new Set();
  for (const file of ['guide.css', 'fieldnotes.css', 'guide-motion.css']) {
    const src = fs.readFileSync(path.join(guide, file), 'utf8');
    // Only var() with no fallback — a fallback is itself a definition.
    for (const m of src.matchAll(/var\(\s*(--[a-z0-9-]+)\s*\)/g)) used.add(m[1]);
  }
  // guide-motion.js:7-9 reads these by name at setup() and caches the result for
  // the life of the scene, so a stale value miscolours the canvases.
  for (const t of ['--motion-primary', '--motion-result', '--motion-signal', '--motion-line']) used.add(t);
  // Set inline on each element by guide-motion.mjs, not a theme token.
  used.delete('--order');
  const skin = fs.readFileSync(path.join(guide, 'guide-uestc.css'), 'utf8');
  const defined = new Set([...skin.matchAll(/(--[a-z0-9-]+)\s*:/g)].map(m => m[1]));
  const missing = [...used].filter(t => !defined.has(t)).sort();
  assert.deepEqual(missing, [], `guide-uestc.css does not define: ${missing.join(', ')}`);
});

test('the skin breaks at the same width guide.js does', () => {
  // guide.js:4 hardcodes matchMedia('(max-width:800px)'). If the CSS used
  // uestc_ai's 820px, 801-820px would show a hamburger the JS refuses to open.
  const js = fs.readFileSync(path.join(guide, 'guide.js'), 'utf8');
  const jsWidth = js.match(/max-width:\s*(\d+)px/)?.[1];
  const skin = fs.readFileSync(path.join(guide, 'guide-uestc.css'), 'utf8');
  const cssWidths = [...skin.matchAll(/max-width:\s*(\d+)px/g)].map(m => m[1]);
  assert.ok(jsWidth, 'could not read the breakpoint out of guide.js');
  assert.ok(cssWidths.includes(jsWidth), `skin has no ${jsWidth}px breakpoint (found ${cssWidths.join(', ')})`);
});

const RESEARCH_AREAS = ['llm', 'agent', 'vision', 'multimodal', 'generation', 'rl', 'world-model', 'embodied', 'systems', 'ai4x'];

test('landing pages are substantial bilingual entrances with working research and learning links', () => {
  for (const dir of [guide, uestc, standalone]) for (const lang of ['en', 'zh']) {
    const file = path.join(dir, lang === 'en' ? 'index.html' : 'zh.html');
    const html = fs.readFileSync(file, 'utf8');
    assert.match(html, new RegExp(`<html lang="${lang === 'en' ? 'en' : 'zh-CN'}"`));
    assert.doesNotMatch(html, /http-equiv="refresh"/, `${file}: homepage redirects instead of presenting the guide`);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `${file}: expected one main heading`);
    assert.match(html, /<main\b/);
    for (const section of ['paths', 'areas', 'practice']) assert.ok(html.includes(`id="${section}"`), `${file}: missing ${section} section`);
    assert.match(html, /href="(?:[^"]*\/)?landing\.css(?:\?[^"]*)?"/);
    assert.match(html, /src="(?:[^"]*\/)?landing\.js(?:\?[^"]*)?"/);
    assert.match(html, /class="language-link"[^>]*href="(?:index|zh)\.html"/);
    assert.ok(html.includes(`href="${lang === 'en' ? 'zh.html' : 'index.html'}"`), `${file}: missing matching language entrance`);
    for (const landmark of ['header', 'footer']) {
      const fragment = html.match(new RegExp(`<${landmark}\\b[\\s\\S]*?<\\/${landmark}>`))?.[0];
      assert.ok(fragment, `${file}: missing ${landmark}`);
      languageGroup(fragment, { lang, enHref: 'index.html', zhHref: 'zh.html', context: `${file} ${landmark}` });
    }
    const styles = [...html.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map(m => m[1]);
    assert.match(styles.at(-1), /(?:^|\/)language-switch\.css(?:\?|$)/, `${file}: language styles must load last`);
    assert.ok(html.includes(`href="${lang}/learning-path.html"`), `${file}: no learning start`);
    assert.ok(html.includes(`href="${lang}/research-methods.html"`), `${file}: no research practice entry`);
    const areaLinks = [...html.matchAll(/<a class="area-row" href="([^"]+)"/g)].map(m => m[1]);
    assert.deepEqual(areaLinks, RESEARCH_AREAS.map(id => `${lang}/${id}.html`), `${file}: research directions must link to their articles`);
    assert.deepEqual(missingRefs(file, html), [], `${file}: unresolved homepage reference`);
    assert.ok(html.replace(/<[^>]+>/g, ' ').length > 1000, `${file}: homepage content was lost`);
    assert.ok(lang === 'en' ? /university students and junior researchers/i.test(html) : /大学生与初级研究者/.test(html), `${file}: audience was lost`);
  }
});

test('the public root defaults to English and resolves assets and links from its own depth', () => {
  const file = path.join(root, 'public/index.html');
  const html = fs.readFileSync(file, 'utf8');
  assert.match(html, /<html lang="en"/);
  assert.doesNotMatch(html, /http-equiv="refresh"/);
  assert.match(html, /href="blog\/guide\/zh\.html"/);
  for (const id of ['learning-path', 'research-methods', ...RESEARCH_AREAS])
    assert.ok(html.includes(`href="blog/guide/en/${id}.html"`), `root homepage has a wrong ${id} link`);
  assert.match(html, /href="blog\/guide\/landing\.css(?:\?[^"]*)?"/);
  for (const landmark of ['header', 'footer']) {
    const fragment = html.match(new RegExp(`<${landmark}\\b[\\s\\S]*?<\\/${landmark}>`))?.[0];
    languageGroup(fragment || '', { lang: 'en', enHref: 'blog/guide/index.html', zhHref: 'blog/guide/zh.html', context: `public root ${landmark}` });
  }
  assert.deepEqual(missingRefs(file, html), []);
});

test('repository-root homepage serves the guide without a redirect or missing resources', () => {
  const file = path.join(root, 'index.html');
  const html = fs.readFileSync(file, 'utf8');
  assert.match(html, /<html lang="en"/);
  assert.doesNotMatch(html, /http-equiv="refresh"/);
  assert.match(html, /<main\b/);
  assert.match(html, /href="public\/blog\/guide\/zh\.html"/);
  assert.match(html, /href="public\/blog\/guide\/en\/learning-path\.html"/);
  assert.deepEqual(missingRefs(file, html), []);
  assert.ok(fs.existsSync(path.join(root, '.nojekyll')));
});

test('GitHub Pages package includes the complete main guide and dynamic search data', () => {
  assert.equal(fs.readFileSync(path.join(pagesPackage, 'index.html'), 'utf8'), fs.readFileSync(path.join(root, 'index.html'), 'utf8'));
  assert.ok(fs.existsSync(path.join(pagesPackage, '.nojekyll')));
  const packagedGuide = path.join(pagesPackage, 'public/blog/guide');
  for (const lang of LANGS) {
    assert.deepEqual(pagesOf(packagedGuide, lang), pagesOf(guide, lang));
    assert.ok(fs.existsSync(path.join(packagedGuide, lang, 'welcome.html')));
    assert.equal(fs.readFileSync(path.join(packagedGuide, `search-data.${lang}.json`), 'utf8'), fs.readFileSync(path.join(guide, `search-data.${lang}.json`), 'utf8'));
  }
  for (const excluded of ['node_modules', 'content', 'scripts', 'work', 'public/blog/guide/guide-uestc'])
    assert.ok(!fs.existsSync(path.join(pagesPackage, excluded)), `unrelated output included: ${excluded}`);
  assertAssetsResolve(pagesPackage, 'GitHub Pages deployment');
});

test('published HTML references stay within an arbitrary GitHub Pages project prefix', () => {
  const base = new URL('https://example.github.io/guide-repository/');
  for (const relative of fs.readdirSync(pagesPackage, { recursive: true }).filter(file => file.endsWith('.html'))) {
    const file = path.join(pagesPackage, relative);
    const pageURL = new URL(relative.split(path.sep).join('/'), base);
    for (const ref of localRefs(fs.readFileSync(file, 'utf8'))) {
      const target = new URL(ref, pageURL);
      if (target.origin !== base.origin) continue;
      assert.ok(target.pathname.startsWith(base.pathname), `${relative}: ${ref} escapes the repository prefix`);
    }
  }
});

test('landing renderer defaults to English and supports an independently hosted guide', () => {
  const html = landingPage();
  assert.match(html, /<html lang="en"/);
  assert.match(html, /href="en\/learning-path\.html"/);
  assert.match(html, /href="zh\.html"/);
  const nested = landingPage({lang:'zh', assets:'../shared/', guideRoot:'../reader/', languageRoot:'../home/'});
  assert.match(nested, /href="\.\.\/reader\/zh\/learning-path\.html"/);
  assert.match(nested, /href="\.\.\/shared\/landing\.css(?:\?[^"]*)?"/);
  assert.match(nested, /href="\.\.\/home\/index\.html"/);
});

test('standalone packaging includes the presentation assets and serves its homepage at the root', () => {
  for (const name of ['landing.css', 'landing.js', 'guide-academic.css', 'language-switch.css', 'guide.js', 'search-data.js'])
    assert.ok(fs.statSync(path.join(standalone, name)).size > 0, `standalone package is missing ${name}`);
  assertAssetsResolve(standalone, 'standalone guide');
  const config = JSON.parse(fs.readFileSync(path.join(standalone, 'vercel.json'), 'utf8'));
  assert.ok(!(config.redirects || []).some(rule => rule.source === '/'), 'standalone root redirects away from the homepage');
  assert.ok(!(config.rewrites || []).some(rule => rule.source === '/'), 'standalone root bypasses the homepage');
});

test('the skin overrides the FAB styling guide.css gives #menu and #mobile-search', () => {
  // guide.css pins #mobile-search as a floating FAB — position:fixed with
  // bottom/right, an ink pill and a 3px offset shadow — at ID specificity, so
  // .icon-button loses badly. Left unoverridden it floated over the topbar and
  // covered the hamburger (46x28px overlap at 390px), which made the mobile
  // navigation look like it was missing entirely. The override has to be
  // id-level too, hence this guard.
  const skin = fs.readFileSync(path.join(guide, 'guide-uestc.css'), 'utf8');
  const block = skin.match(/#menu,\s*#mobile-search\s*\{[^}]*\}/)?.[0];
  assert.ok(block, 'the id-level #menu/#mobile-search override is gone from the skin');
  for (const decl of ['position: static', 'box-shadow: none', 'background: transparent'])
    assert.ok(block.includes(decl), `the override lost "${decl}"`);
  // ...and both must still be revealed at the drawer breakpoint.
  const mobile = skin.slice(skin.indexOf(`@media (max-width: 800px)`));
  assert.match(mobile, /#menu\s*\{\s*display:\s*inline-flex/, '#menu is not shown at the mobile breakpoint');
  assert.match(mobile, /#mobile-search\s*\{\s*display:\s*inline-flex/, '#mobile-search is not shown at the mobile breakpoint');
});

test('home pages do not emit an orphaned community-directory wrapper', () => {
  // enrichDirectory used to wrap the community block in
  // <section class="community-directory"> on `home` as well, where the shell
  // already wraps every <h2> block in .home-section. The stray unclosed tag made
  // the shell's regex close the wrong element, nesting one .home-section inside
  // the previous one — which pushed the community grid into an implicit column
  // (a 250px hole, cards stuck 400px wide in a 650px column).
  for (const lang of LANGS) {
    for (const dir of [path.join(guide, lang), path.join(uestc, lang)]) {
      const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
      assert.doesNotMatch(html, /<section class="community-directory">\s*<\/section>/,
        `${dir}: orphaned community-directory wrapper is back`);
      // ...but lookout has no .home-section shell, so it must keep its wrapper.
      const lookout = fs.readFileSync(path.join(dir, 'lookout.html'), 'utf8');
      assert.match(lookout, /<section class="community-directory">/,
        `${dir}/lookout.html: lost the community wrapper it still needs`);
    }
  }
});

test('reader navigation controls retain accessible drawer and language targets', () => {
  for (const edition of [guide, uestc]) for (const lang of LANGS) {
    const html = fs.readFileSync(path.join(edition, lang, 'index.html'), 'utf8');
    const menu = html.match(/<button\b[^>]*id="menu"[^>]*>/)?.[0];
    assert.ok(menu, `${edition}/${lang}: missing mobile navigation`);
    assert.match(menu, /aria-controls="nav"/);
    assert.match(menu, /aria-expanded="false"/);
    assert.match(menu, /aria-label="[^"]+"/);
    assert.match(html, new RegExp(String.raw`<a[^>]*id="language"[^>]*href="\.\.\/${lang === 'zh' ? 'en' : 'zh'}\/index\.html"`));
  }
});

test('reader language selectors preserve the current article in every edition', () => {
  // Include a nested-assets article as well as a normal article: neither may
  // use the media prefix or reset the language destination to the overview.
  for (const edition of [guide, uestc, standalone]) for (const lang of LANGS)
    for (const page of pagesOf(edition, lang).filter(page => !['experiments.html','publishing.html'].includes(page))) {
      const file = path.join(edition, lang, page);
      const html = fs.readFileSync(file, 'utf8');
      const header = html.match(/<header\b[\s\S]*?<\/header>/)?.[0];
      const links = languageGroup(header || '', { lang, enHref: `../en/${page}`, zhHref: `../zh/${page}`, context: file });
      assert.match(links[lang === 'en' ? 1 : 0][1], /id="language"/, `${file}: alternate-language binding was lost`);
      assert.doesNotMatch(links[lang === 'en' ? 0 : 1][1], /\bid="language"/, `${file}: alternate-language binding moved to the current language`);
      const css = [...html.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].at(-1)?.[1];
      assert.match(css || '', /(?:^|\/)language-switch\.css(?:\?|$)/, `${file}: missing final language stylesheet`);
      assert.ok(fs.existsSync(path.resolve(path.dirname(file), css.split('?')[0])), `${file}: language stylesheet path does not resolve`);
    }
});

test('English navigation, prompts, image descriptions, and article copy have no Chinese fallback', () => {
  for (const edition of [guide, uestc, standalone])
    for (const page of pagesOf(edition, 'en').filter(page => !['experiments.html', 'publishing.html'].includes(page))) {
      const file = path.join(edition, 'en', page);
      const html = fs.readFileSync(file, 'utf8');
      const text = html.replace(/<(script|style)\b[\s\S]*?<\/\1>/g, '').replace(/<[^>]+>/g, '');
      assert.doesNotMatch(text, /[\u3400-\u9fff]/, `${file}: Chinese fallback in rendered English copy`);
      for (const attribute of html.matchAll(/\b(?:aria-label|title|placeholder|alt)="([^"]*)"/g))
        assert.doesNotMatch(attribute[1], /[\u3400-\u9fff]/, `${file}: Chinese fallback in an accessible description`);
    }
});

test('language switches carry only semantic anchors present in both translations', () => {
  for (const edition of [guide, uestc, standalone]) for (const lang of LANGS)
    for (const page of pagesOf(edition, lang).filter(page => !['experiments.html', 'publishing.html'].includes(page))) {
      const file = path.join(edition, lang, page);
      const html = fs.readFileSync(file, 'utf8');
      const alternate = fs.readFileSync(path.join(edition, lang === 'en' ? 'zh' : 'en', page), 'utf8');
      const raw = html.match(/id="language"[^>]*data-shared-anchors="([^"]*)"/)?.[1];
      assert.ok(raw !== undefined, `${file}: missing verified anchor metadata`);
      const anchors = JSON.parse(raw.replaceAll('&quot;', '"').replaceAll('&amp;', '&'));
      const namedIds = document => [...new Set([...document.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]).filter(id => !/^(?:sec|resource)-\d+$/.test(id)))].sort();
      assert.deepEqual(namedIds(html), namedIds(alternate), `${file}: a named learning section lost its translated counterpart`);
      for (const id of anchors) {
        assert.doesNotMatch(id, /^(?:sec|resource)-\d+$/, `${file}: unsafe sequential anchor`);
        assert.ok(html.includes(`id="${id}"`) && alternate.includes(`id="${id}"`), `${file}: missing counterpart for #${id}`);
      }
      if (page === 'research-methods.html') assert.ok(anchors.includes('question-hypothesis'), `${file}: named research-methods sections should survive switching`);
      const brand = html.match(/<a class="reader-brand"[^>]*href="([^"]+)"/)?.[1];
      assert.equal(brand, lang === 'en' ? '../index.html' : '../zh.html', `${file}: home resets the reader's language`);
    }
});

test('paper-selection guidance precedes a single complete paper library in both languages', () => {
  for (const edition of [guide, uestc, standalone]) for (const lang of LANGS) {
    const file = path.join(edition, lang, 'papers.html');
    const html = fs.readFileSync(file, 'utf8');
    const selection = html.indexOf('id="paper-selection"');
    const library = html.indexOf('class="paper-library"');
    assert.ok(selection >= 0 && selection < library, `${file}: selection guidance must appear before the cards`);
    assert.equal((html.match(/class="paper-library"/g) || []).length, 1, `${file}: duplicate paper collection`);
    assert.equal((html.match(/class="paper-card"/g) || []).length, 49, `${file}: incomplete paper collection`);
    assert.ok(!html.includes('<!-- paper-library -->'), `${file}: unexpanded library marker`);
  }
});

test('paper filters expose a visible and accessible search purpose in both languages', () => {
  for (const edition of [guide, uestc, standalone]) for (const lang of LANGS) {
    const file = path.join(edition, lang, 'papers.html');
    const html = fs.readFileSync(file, 'utf8');
    const label = html.match(/<label>\s*([^<]+)<input\b[^>]*id="paper-query"[^>]*><\/label>/);
    assert.ok(label, `${file}: paper search lost its visible label`);
    assert.equal(label[1].trim(), lang === 'zh' ? '检索论文' : 'Search papers');
    assert.ok(label[0].includes(`aria-label="${label[1].trim()}"`), `${file}: visible and accessible paper-search labels differ`);
  }
});

test('personal perspectives remain available at the end of the full navigation and collapse on guide pages', () => {
  const archive = ['welcome', 'experience', 'life'];
  for (const lang of LANGS) {
    const home = fs.readFileSync(path.join(guide, lang, 'index.html'), 'utf8');
    const nav = home.match(/<aside id="nav"[\s\S]*?<\/aside>/)?.[0];
    const links = [...nav.matchAll(/<a\b[^>]*data-page="([^"]+)"[^>]*>/g)];
    assert.deepEqual(links.slice(-archive.length).map(m => m[1]), archive);
    for (const match of links.slice(-archive.length)) {
      assert.match(match[0], /class="nav-collapsed"/);
      assert.match(match[0], /\sinert(?:\s|>)/);
    }
    for (const id of archive) {
      const html = fs.readFileSync(path.join(guide, lang, `${id}.html`), 'utf8');
      assert.match(html, /<h1\b/);
      assert.ok(html.includes(`/edit/main/content/guide/${lang}/${id}.md`));
      const current = html.match(new RegExp(String.raw`<a\b[^>]*data-page="${id}"[^>]*>`))?.[0];
      assert.ok(current, `${lang}/${id}: archive article is not navigable`);
      assert.match(current, /aria-current="page"/);
      assert.doesNotMatch(current, /\sinert(?:\s|>)/);
    }
  }
});

test('the retired annual review is absent from published pages and search', () => {
  for (const lang of LANGS) {
    assert.ok(!fs.existsSync(path.join(guide, lang, 'timeline.html')));
    for (const page of pagesOf(guide, lang)) {
      const html = fs.readFileSync(path.join(guide, lang, page), 'utf8');
      assert.doesNotMatch(html, /href="timeline\.html(?:[?#"])/, `${lang}/${page}: retired article is still linked`);
      assert.doesNotMatch(html, /data-page="timeline"/);
    }
    const records = JSON.parse(fs.readFileSync(path.join(guide, `search-data.${lang}.json`), 'utf8'));
    assert.ok(records.every(record => !/^timeline\.html(?:[?#]|$)/.test(record.url)));
  }
  assert.doesNotMatch(fs.readFileSync(path.join(guide, 'search-data.js'), 'utf8'), /"url":"timeline\.html(?:[?#"])/);
});

test('image assets are sized for the role they are used in', () => {
  // The original logo.png was 2048x2048 / 3.1MB and served as both the favicon
  // and a 40px header mark on every page — 3.1MB per page view. These ceilings
  // are what stop a full-resolution source being dropped back in; they are
  // generous next to the current sizes (favicon 9.7KB, mark 197KB, poster 96KB).
  const ICON_MAX = 32 * 1024;
  const IMG_MAX = 512 * 1024;
  const oversize = [];
  for (const edition of [...LANGS, ...LANGS.map(l => `guide-uestc/${l}`)]) {
    const dir = path.join(guide, edition);
    if (!fs.existsSync(dir)) continue;
    const check = (ref, limit, page) => {
      if (/^(https?:|#|data:)/.test(ref)) return;
      const target = path.resolve(dir, decodeURIComponent(ref.split('#')[0].split('?')[0]));
      if (!fs.existsSync(target)) return;   // resolution is covered by its own test
      const size = fs.statSync(target).size;
      if (size > limit) oversize.push(`${edition}/${page} → ${ref} (${Math.round(size / 1024)}KB > ${Math.round(limit / 1024)}KB)`);
    };
    for (const page of fs.readdirSync(dir).filter(f => f.endsWith('.html'))) {
      const html = fs.readFileSync(path.join(dir, page), 'utf8');
      for (const m of html.matchAll(/<link rel="icon" href="([^"]+)"/g)) check(m[1], ICON_MAX, page);
      for (const m of html.matchAll(/<img[^>]*src="([^"]+)"[^>]*>/g))
        if (!/loading="lazy"/.test(m[0])) check(m[1], IMG_MAX, page);
      for (const m of html.matchAll(/poster="([^"]+)"/g)) check(m[1], IMG_MAX, page);
    }
  }
  const unique = [...new Set(oversize)];
  assert.deepEqual(unique, [], `oversized image assets:\n  ${unique.join('\n  ')}`);
});

test('dark mode is unreachable from the uestc edition', () => {
  for (const lang of LANGS) {
    const html = fs.readFileSync(path.join(uestc, lang, 'index.html'), 'utf8');
    assert.match(html, /<meta name="color-scheme" content="light">/, `${lang}: color-scheme not pinned`);
    assert.doesNotMatch(html, /dataset\.theme\s*=/, `${lang}: shell still bootstraps a theme`);
  }
});

test('reader terminology links follow the reader language in every edition', () => {
  for (const dir of [guide, uestc, standalone]) for (const lang of LANGS) {
    const html = fs.readFileSync(path.join(dir, lang, 'index.html'), 'utf8');
    const prefix = dir === uestc ? '../../' : '../';
    const target = `${prefix}wiki/${lang === 'en' ? 'en' : 'index'}.html`;
    assert.ok(html.includes(`href="${target}"`), `${dir}/${lang}: incorrect glossary language`);
    if (lang === 'en') {
      assert.ok(html.includes('>Terminology reference</a>'));
      assert.ok(!html.includes('Terminology reference · 中文'));
      assert.ok(!html.includes('Chinese terminology and conference reference'));
    }
  }
});

test('all editions include the interactive learning and research maps in both languages', () => {
  for (const dir of [guide, uestc, standalone]) for (const lang of ['en', 'zh']) {
    for (const [page, overview, selection] of [['learning-path','learning-explorer','learn-ml'], ['directions','research-explorer','area-agent']]) {
      const file = path.join(dir, lang, page + '.html');
      const html = fs.readFileSync(file, 'utf8');
      assert.ok(html.includes(`id="${overview}"`), `${file}: missing map`);
      assert.ok(html.includes(`href="#${overview}"`), `${file}: map absent from contents`);
      assert.ok(html.includes(`id="${selection}"`), `${file}: missing selection panel`);
      assert.match(html, /guide-explorers\.css/);
      assert.match(html, /guide-explorers\.js/);
      assert.deepEqual(missingRefs(file, html), [], `${file}: unresolved explorer reference`);
    }
  }
});
