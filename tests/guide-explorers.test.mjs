import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGuide, filename } from '../scripts/guide-model.mjs';
import { renderGuideExplorer, guideExplorerAnchors } from '../scripts/guide-explorers.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { all } = loadGuide(root);

test('bilingual explorer links resolve to published pages and semantic anchors', () => {
 for (const lang of ['zh', 'en']) {
  const pages = new Map(all[lang].map(page => [filename(page.id), page]));
  for (const id of ['learning-path', 'directions']) {
   const html = renderGuideExplorer({ id, lang });
   const page = pages.get(filename(id));
   for (const [, href] of html.matchAll(/href="([^"]+)"/g)) {
    const [file, anchor] = href.split('#');
    const target = file ? pages.get(file) : page;
    assert.ok(target, `${lang}/${id}: unpublished destination ${href}`);
    if (anchor) {
     const content = target.html + renderGuideExplorer({ id: target.id, lang });
     assert.ok(content.includes(`id="${anchor}"`), `${lang}/${id}: missing anchor ${href}`);
    }
   }
  }
 }
});

test('both translations publish identical shareable selections and visible no-JS detail', () => {
 for (const [id, count] of [['learning-path', 5], ['directions', 10]]) {
  const anchors = guideExplorerAnchors(id);
  assert.equal(anchors.length, count + 1);
  for (const lang of ['zh', 'en']) {
   const html = renderGuideExplorer({ id, lang });
   for (const anchor of anchors) assert.ok(html.includes(`id="${anchor}"`), `${lang}/${id}: missing shareable state ${anchor}`);
   assert.equal([...html.matchAll(/data-explorer-panel/g)].length, count);
   assert.equal([...html.matchAll(/data-explorer-tab\s/g)].length, count);
   assert.doesNotMatch(html, /\shidden(?:[\s=>])/);
   assert.doesNotMatch(html, /<button\b/); // Without JS, every node remains an ordinary working link.
   const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
   assert.equal(new Set(ids).size, ids.length, `${lang}/${id}: duplicate generated ids`);
  }
 }
 assert.equal(renderGuideExplorer({ id: 'about', lang: 'zh' }), '');
 assert.deepEqual(guideExplorerAnchors('about'), []);
});

test('learning path retains parallel foundations and a research branch after ML', () => {
 const zh = renderGuideExplorer({ id: 'learning-path', lang: 'zh' });
 const en = renderGuideExplorer({ id: 'learning-path', lang: 'en' });
 assert.deepEqual(guideExplorerAnchors('learning-path').slice(1), ['learn-programming', 'learn-math', 'learn-ml', 'learn-dl', 'learn-research']);
 assert.match(zh, /编程与入门数学可以并行/);
 assert.match(en, /begin research methods once you understand a simple model and how to evaluate it/);
 assert.match(zh, /href="#route-deep-learning"/);
 assert.match(en, /href="#route-research"/);
});
