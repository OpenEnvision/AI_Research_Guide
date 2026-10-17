import './build-wiki.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGuide, validateGuide, buildSearchData, searchDataJs, filename } from './guide-model.mjs';
import { pageShell } from './guide-shell-uestc.mjs';
import { landingPage } from './guide-landing.mjs';
import { assertAssetsResolve, missingRefs } from './guide-verify.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=path.join(root,'public/blog/guide');
const {manifest,all}=loadGuide(root);
const report=validateGuide(all,manifest);
// Old bookmarks still reach the corresponding current article.
const redirects={experiments:'research-methods.html',publishing:'writing.html#submission'};
for(const lang of ['zh','en']){
 const dir=path.join(out,lang);
 fs.mkdirSync(dir,{recursive:true});
 const expected=new Set([...all[lang].map(p=>filename(p.id)),...Object.keys(redirects).map(id=>id+'.html')]);
 for(const file of fs.readdirSync(dir))if(file.endsWith('.html')&&!expected.has(file))fs.unlinkSync(path.join(dir,file));
 for(const [index,p] of all[lang].entries())
  fs.writeFileSync(path.join(dir,filename(p.id)),pageShell({p,pages:all[lang],alternatePage:all[lang==='zh'?'en':'zh'].find(page=>page.id===p.id),index,lang,assets:'../',skin:'../guide-uestc.css?v=20261016-foundations'}));
 for(const [id,target] of Object.entries(redirects))fs.writeFileSync(path.join(dir,id+'.html'),`<!doctype html><html lang="${lang==='zh'?'zh-CN':'en'}"><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${target}"><title>${lang==='zh'?'AI 学习与科研指南':'AI Learning & Research Guide'} · OpenEnvision</title><a href="${target}">${lang==='zh'?'继续阅读':'Continue reading'}</a></html>`);
}
const searchData=buildSearchData(all);
// Keep the legacy bundle for existing integrations; readers fetch only their
// language's JSON on the first search, after navigation is already interactive.
fs.writeFileSync(path.join(out,'search-data.js'),searchDataJs(searchData));
for(const lang of ['zh','en'])fs.writeFileSync(path.join(out,`search-data.${lang}.json`),JSON.stringify(searchData[lang]));
fs.writeFileSync(path.join(out,'index.html'),landingPage());
fs.writeFileSync(path.join(out,'zh.html'),landingPage({lang:'zh'}));
fs.writeFileSync(path.join(root,'public/index.html'),landingPage({assets:'blog/guide/',guideRoot:'blog/guide/',languageRoot:'blog/guide/'}));
// Branch-based GitHub Pages serves the repository root directly.
const rootEntry=path.join(root,'index.html');
const rootHomepage=landingPage({assets:'public/blog/guide/',guideRoot:'public/blog/guide/',languageRoot:'public/blog/guide/'});
fs.writeFileSync(rootEntry,rootHomepage);
fs.writeFileSync(path.join(root,'.nojekyll'),'');
const missingRootRefs=missingRefs(rootEntry,rootHomepage);
if(missingRootRefs.length)throw Error(`Unresolved repository homepage references: ${missingRootRefs.join(', ')}`);
for(const lang of ['zh','en'])assertAssetsResolve(path.join(out,lang),`personal ${lang}`);
fs.mkdirSync(path.join(root,'work/guide-review'),{recursive:true});
fs.writeFileSync(path.join(root,'work/guide-review/build.json'),JSON.stringify(report,null,2));
console.log(`Guide built: ${manifest.length} pages × 2 languages; 60 questions, shared presentation, and legacy redirects.`);
