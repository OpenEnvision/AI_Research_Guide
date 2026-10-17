import test from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { loadGuide } from '../scripts/guide-model.mjs';
import { pageShell } from '../scripts/guide-shell-uestc.mjs';

const root=fileURLToPath(new URL('../',import.meta.url));
const {all}=loadGuide(root);
const article=lang=>all[lang].find(page=>page.id==='practice');
const render=lang=>pageShell({p:article(lang),pages:all[lang],alternatePage:article(lang==='en'?'zh':'en'),index:all[lang].findIndex(page=>page.id==='practice'),lang,assets:'../'});

test('practice translations retain every resource and old chapter bookmark',()=>{
 for(const lang of ['en','zh']){
  const page=article(lang);
  assert.equal(page.headings.length,11);
  assert.equal((page.html.match(/<li id="resource-\d+"/g)||[]).length,34);
  for(let i=1;i<=11;i++)assert.ok(page.html.includes(`id="sec-${i}"`),`${lang}: old chapter ${i} lost`);
  assert.match(page.html,/<li id="resource-9"><strong><a[^>]+href="https:\/\/sqlbolt.com\/"/);
  assert.match(page.html,/<li id="resource-34"><strong><a[^>]+href="https:\/\/speechbrain.readthedocs.io\//);
 }
 assert.deepEqual(article('en').headings.map(h=>h.id),article('zh').headings.map(h=>h.id));
 assert.ok(article('en').headings.every(h=>h.id.startsWith('practice-')));
});

test('both reader navigation surfaces link to existing chapters with translated counterparts',()=>{
 for(const lang of ['en','zh']){
  const html=render(lang);
  const mobile=html.match(/<details class="mobile-toc">([\s\S]*?)<\/details>/)?.[1];
  assert.ok(mobile);
  const links=[...mobile.matchAll(/href="#([^"]+)"/g)].map(m=>m[1]);
  assert.deepEqual(links,article(lang).headings.map(h=>h.id));
  const anchors=JSON.parse(html.match(/data-shared-anchors="([^"]+)"/)[1].replaceAll('&quot;','"'));
  for(const id of links)assert.ok(anchors.includes(id));
 }
});

test('search is available on demand without a parser-blocking full index',()=>{
 for(const lang of ['en','zh']){
  const html=render(lang);
  assert.ok(html.includes(`data-search-src="../search-data.${lang}.json"`));
  assert.doesNotMatch(html,/<script[^>]+src="[^"]*search-data/);
 }
});

test('practice next and previous articles follow the visible learning sequence',()=>{
 for(const lang of ['en','zh']){
  const neighbors=render(lang).match(/<nav class="neighbors"[^>]*>([\s\S]*?)<\/nav>/)[1];
  assert.deepEqual([...neighbors.matchAll(/href="([^"]+)"/g)].map(m=>m[1]),['courses.html','start.html']);
 }
});

test('long titles do not consume the description budget or cut words',()=>{
 const lead='Choose one practice resource for your goal, then keep a small, runnable result that demonstrates what you learned.';
 const p={id:'practice',title:'A deliberately long title '.repeat(10),plain:'unused',html:`<h1>Practice</h1><p>${lead}</p><h2 id="practice-start">Start</h2>`,headings:[{id:'practice-start',title:'Start'}]};
 const html=pageShell({p,pages:[p],alternatePage:p,index:0,lang:'en'});
 assert.equal(html.match(/<meta name="description" content="([^"]*)"/)[1],lead);
});
