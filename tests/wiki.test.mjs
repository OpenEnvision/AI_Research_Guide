import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {missingRefs} from '../scripts/guide-verify.mjs';
import {fileURLToPath} from 'node:url';
import '../scripts/build-wiki.mjs';

const base=new URL('../public/blog/guide/wiki/',import.meta.url);
const sourceCategories=JSON.parse(fs.readFileSync(new URL('../content/wiki/categories.json',import.meta.url),'utf8'));
const sourceCollections=sourceCategories.map(({id})=>({
 id,entries:JSON.parse(fs.readFileSync(new URL(`../content/wiki/${id}.json`,import.meta.url),'utf8'))
}));
const sourceEntries=sourceCollections.flatMap(collection=>collection.entries);
const contexts=Object.fromEntries(['zh','en'].map(lang=>{
 const context=vm.createContext({Intl,console});
 context.window=context;context.globalThis=context;
 for(const f of ['vendor/minisearch.min.js',lang==='en'?'data-en.js':'data.js','search.js'])
  vm.runInContext(fs.readFileSync(new URL(f,base),'utf8'),context);
 return [lang,context];
}));

test('useful links cover every category with matching bilingual destinations and concrete descriptions',()=>{
 const source=JSON.parse(fs.readFileSync(new URL('../content/wiki/useful-links.json',import.meta.url),'utf8'));
 const expected=['all',...sourceCategories.map(category=>category.id)].sort();
 for(const [lang,{WIKI_DATA:data}] of Object.entries(contexts)){
  assert.deepEqual(Object.keys(data.usefulLinks).sort(),expected);
  for(const category of expected){
   const collection=data.usefulLinks[category],original=source.collections[category];
   assert.equal(collection.description,original[lang].description);
   assert.ok(collection.links.length>=4&&collection.links.length<=5,`${category}: keep recommendations focused`);
   assert.deepEqual(Array.from(collection.links,link=>link.id),original.links,`${category}: preserve editorial order`);
   assert.deepEqual(Array.from(collection.links,link=>link.url),Array.from(contexts.zh.WIKI_DATA.usefulLinks[category].links,link=>link.url));
   assert.equal(new Set(collection.links.map(link=>link.url)).size,collection.links.length,`${category}: duplicate destinations`);
   for(const link of collection.links){
    assert.equal(new URL(link.url).protocol,'https:');
    assert.equal(link.title,source.resources[link.id][lang].title);
    assert.equal(link.description,source.resources[link.id][lang].description);
    for(const value of [link.title,link.description,collection.description]){
     assert.ok(value.trim());
     if(lang==='en')assert.doesNotMatch(value,/[\u3400-\u9fff]/,`${category}: Chinese fallback in English resources`);
    }
   }
  }
 }
});

test('deadline tools stay with venues while publishing keeps writing and reference tools',()=>{
 for(const {WIKI_DATA:data} of Object.values(contexts)){
  const urls=category=>Array.from(data.usefulLinks[category].links,link=>link.url);
  assert.ok(urls('venues').includes('https://ccfddl.com'));
  assert.ok(urls('venues').includes('https://time.is/Anywhere_on_Earth'));
  assert.ok(urls('all').includes('https://paperswithcode.co/'));
  assert.ok(urls('publishing').includes('https://www.overleaf.com/learn'));
  assert.ok(urls('publishing').includes('https://www.zotero.org/'));
  for(const {id} of sourceCategories.filter(category=>!['publishing','venues'].includes(category.id))){
   assert.ok(!urls(id).includes('https://ccfddl.com'),`${id}: generic deadline links displace field resources`);
   assert.ok(!urls(id).includes('https://time.is/Anywhere_on_Earth'),`${id}: time zones are not field resources`);
  }
 }
});

test('every topic has a focused bilingual resource selection with stable destinations',()=>{
 const source=JSON.parse(fs.readFileSync(new URL('../content/wiki/useful-links.json',import.meta.url),'utf8'));
 for(const [lang,{WIKI_DATA:data}] of Object.entries(contexts)){
  assert.equal(data.usefulLinks.all.topics,undefined,'general selection has no artificial topics');
  for(const category of sourceCategories){
   const collection=data.usefulLinks[category.id],topics=collection.topics;
   assert.deepEqual(Object.keys(topics).sort(),Array.from(data.grouping[category.id].groups,group=>group.id).sort());
   for(const [group,topic] of Object.entries(topics)){
    const original=source.topics[category.id][group];
    assert.ok(topic.links.length>=2&&topic.links.length<=4,`${category.id}/${group}: focused resource count`);
    assert.equal(topic.description,original[lang].description);
    assert.notDeepEqual(Array.from(topic.links,link=>link.id).sort(),Array.from(collection.links,link=>link.id).sort(),`${category.id}/${group}: topic must not copy the category list`);
    assert.deepEqual(Array.from(topic.links,link=>link.id),original.links);
    assert.deepEqual(Array.from(topic.links,link=>link.url),Array.from(contexts.zh.WIKI_DATA.usefulLinks[category.id].topics[group].links,link=>link.url));
    assert.equal(new Set(topic.links.map(link=>link.url)).size,topic.links.length);
    for(const link of topic.links){
     assert.equal(link.title,source.resources[link.id][lang].title);
     assert.equal(link.description,source.resources[link.id][lang].description);
     assert.equal(new URL(link.url).protocol,'https:');
     for(const text of [topic.description,link.title,link.description]){
      assert.ok(text.trim());
      if(lang==='en')assert.doesNotMatch(text,/[\u3400-\u9fff]/);
     }
    }
   }
  }
 }
});

test('publishing topic resources distinguish versions, presentations, authorship, and evaluation',()=>{
 for(const {WIKI_DATA:data} of Object.values(contexts)){
  const urls=group=>Array.from(data.usefulLinks.publishing.topics[group].links,link=>link.url);
  assert.ok(urls('稿件版本').includes('https://info.arxiv.org/help/replace.html'));
  assert.ok(urls('会议展示').includes('https://www.overleaf.com/learn/latex/Posters'));
  assert.ok(urls('署名与贡献').includes('https://credit.niso.org/'));
  assert.ok(urls('期刊与会议评价').includes('https://www.ccf.org.cn/Academic_Evaluation/By_category/'));
  const selections=Object.values(data.usefulLinks.publishing.topics).map(topic=>Array.from(topic.links,link=>link.url).sort().join('|'));
  assert.equal(new Set(selections).size,selections.length,'publishing topics must offer different relevant selections');
 }
});

test('both glossary editions link to existing guide articles in their own language',()=>{
 const manifest=JSON.parse(fs.readFileSync(new URL('../content/guide/uestc/manifest.json',import.meta.url),'utf8'));
 const pages=new Set(manifest.map(page=>page.id==='home'?'index.html':page.id+'.html'));
 for(const [lang,context] of Object.entries(contexts))for(const category of context.WIKI_DATA.categories){
  assert.ok(category.guide.startsWith(`../${lang}/`),`${lang}: ${category.id} points to another language`);
  const file=category.guide.split('#')[0].split('/').at(-1);
  assert.ok(pages.has(file),`${category.id}: ${category.guide} is missing from the compact guide`);
 }
});

test('every Chinese glossary entry has complete English explanations and the same references',()=>{
 const zh=contexts.zh.WIKI_DATA.entries,en=contexts.en.WIKI_DATA.entries;
 assert.equal(zh.length,sourceEntries.length);
 assert.deepEqual(Array.from(en,e=>e.id),Array.from(zh,e=>e.id));
 for(let i=0;i<zh.length;i++){
  const original=zh[i],translated=en[i];
  assert.equal(translated.detail.length,original.detail.length,original.id);
  assert.deepEqual(Array.from(translated.sources,s=>s.url),Array.from(original.sources,s=>s.url),original.id);
  assert.deepEqual(Array.from(translated.related),Array.from(original.related),original.id);
  assert.equal(translated.group,original.group,'group identity must survive language switching');
  assert.equal(translated.category,original.category,original.id);
  assert.deepEqual(Array.from(translated.categories),Array.from(original.categories),original.id);
  assert.deepEqual(Object.entries(translated.categoryGroups||{}),Object.entries(original.categoryGroups||{}),original.id);
  for(const value of [translated.summary,...translated.detail,translated.groupLabel,...Object.values(translated.categoryGroupLabels||{}),...translated.sources.map(s=>s.title)]){
   assert.equal(typeof value,'string');
   assert.ok(value.trim(),`${original.id}: empty English text`);
   assert.doesNotMatch(value,/[\u3400-\u9fff]/,`${original.id}: Chinese fallback in English prose`);
  }
 }
});

test('cross-listing keeps one source entry and one generated entry per concept',()=>{
 const sourceIds=sourceEntries.map(entry=>entry.id);
 assert.equal(new Set(sourceIds).size,sourceIds.length,'cross-listed concepts must not be copied into multiple source files');
 for(const {id,entries} of sourceCollections)for(const entry of entries){
  assert.equal(entry.category,id,`${entry.id}: source file must match its primary category`);
  assert.ok(entry.categories.includes(id),`${entry.id}: primary category missing from membership`);
 }
 for(const [lang,{WIKI_DATA:data}] of Object.entries(contexts)){
  assert.deepEqual(Array.from(data.categories,category=>category.id),sourceCategories.map(category=>category.id));
  assert.deepEqual(Array.from(data.entries,entry=>entry.id).sort(),[...sourceIds].sort(),`${lang}: generated concepts differ from source files`);
 }
});

test('both languages support names, abbreviations, typos, and Chinese lookup',()=>{
 for(const [lang,context] of Object.entries(contexts)){
  const {entries,categories}=context.WIKI_DATA;
  const engine=context.WikiSearch.createSearch(entries,categories);
  for(const [query,id] of [['ckpt','checkpoint'],['nips','neurips'],['tpmai','tpami'],['harnes','agent-harness'],['model based','model-based-rl'],['检查点','checkpoint']]){
   assert.ok(engine.search(query).slice(0,3).some(e=>e.id===id),`${lang}: ${query}`);
  }
  for(const query of ['robotics conference','robotics conferences','机器人 会议']){
   const result=engine.search(query);
   assert.ok(result.length>0,`${lang}: ${query}`);
   assert.ok(result.every(e=>e.kind==='conference'),`${lang}: unexpected kind for ${query}`);
   assert.ok(result.some(e=>e.id==='icra'||e.id==='iros'),`${lang}: robotics venues missing`);
  }
 }
});

test('related concepts retain distinct English and Chinese exact lookups',()=>{
 const families=[
  ['action','action-space'],
  ['activation','activation-function'],
  ['stop-sequence','eos-token'],
  ['convolution','kernel'],
  ['protein-folding','protein-structure-prediction'],
  ['inference-batching','dynamic-batching','continuous-batching'],
  ['git','github'],
  ['git-pull','pull-request'],
  ['container-image','container'],
  ['training-set','validation-set','test-set']
 ];
 for(const [lang,context] of Object.entries(contexts)){
  const {entries,categories}=context.WIKI_DATA;
  const engine=context.WikiSearch.createSearch(entries,categories);
  const byId=new Map(entries.map(entry=>[entry.id,entry]));
  for(const family of families)for(const id of family){
   const entry=byId.get(id);
   assert.ok(entry,`${lang}: missing distinct concept ${id}`);
   for(const query of [entry.term,entry.zh]){
    const result=engine.search(query);
    assert.equal(result[0]?.id,id,`${lang}: ${query} should prioritize ${id}`);
    assert.ok(!result.some(candidate=>family.includes(candidate.id)&&candidate.id!==id),`${lang}: ${query} also resolves to a different concept in ${family.join(', ')}`);
   }
  }
  for(const [query,id] of [['EOS','eos-token'],['GPU kernel','kernel'],['Pull','git-pull'],['PR','pull-request']]){
   assert.equal(engine.search(query)[0]?.id,id,`${lang}: ${query} has an incorrect alias`);
  }
 }
});

test('new concepts across the glossary are present and searchable in both languages',()=>{
 const ids=[
  'forward-pass','inference','batch-size','gradient-accumulation','adamw','cross-validation','generalization','mae','rmse','greedy-decoding',
  'agent-workflow','reinforcement-learning','td-learning','q-learning','forward-kinematics','robot-navigation','belief-state','observation-model',
  'feature-map','neural-audio-codec','normalizing-flow','content-based-recommendation','survivorship-bias',
  'fp32','activation-checkpointing','staging-area','git-fetch','git-push','git-tag','rlj'
 ];
 for(const [lang,context] of Object.entries(contexts)){
  const {entries,categories}=context.WIKI_DATA;
  const engine=context.WikiSearch.createSearch(entries,categories);
  for(const id of ids){
   const entry=entries.find(candidate=>candidate.id===id);
   assert.ok(entry,`${lang}: missing ${id}`);
   assert.match(entry.zh,/[\u3400-\u9fff]/,`${lang}: ${id} needs a Chinese lookup name`);
   assert.equal(engine.search(entry.zh)[0]?.id,id,`${lang}: Chinese lookup for ${id}`);
   const result=engine.search(entry.term);
   if(/^[A-Z0-9]{2,5}$/.test(entry.term)){
    assert.ok(result.slice(0,3).some(candidate=>candidate.id===id),`${lang}: abbreviation ${entry.term} must remain reachable`);
   }else assert.equal(result[0]?.id,id,`${lang}: English lookup for ${id}`);
  }
 }
});

test('cross-listed concepts use the destination category group and remain searchable',()=>{
 const memberships=[
  ['ocr','multimodal',[['vision','视觉任务']]],
  ['nas','science',[['training','模型选择与搜索']]],
  ['environment','agents',[['rl','环境与交互'],['robotics','具身基础']]],
  ['belief-state','world-model',[['rl','环境与交互']]],
  ['active-learning','science',[['training','监督信号'],['data','数据处理']]],
  ['contrastive-learning','multimodal',[['vision','视觉表示'],['training','迁移与训练策略']]]
 ];
 for(const [lang,context] of Object.entries(contexts)){
  const {entries,categories}=context.WIKI_DATA;
  const {createSearch,groupFor}=context.WikiSearch;
  const engine=createSearch(entries,categories);
  for(const [id,primary,destinations] of memberships){
   const matches=entries.filter(entry=>entry.id===id);
   assert.equal(matches.length,1,`${lang}: ${id} must have one shared definition`);
   const entry=matches[0];
   assert.equal(entry.category,primary,`${lang}: ${id} primary category changed`);
   assert.equal(groupFor(entry,primary),entry.group,`${lang}: ${id} lost its primary group`);
   for(const [category,group] of destinations){
    assert.ok(entry.categories.includes(category),`${lang}: ${id} missing from ${category}`);
    assert.equal(groupFor(entry,category),group,`${lang}: wrong destination group for ${id} in ${category}`);
    const filtered=engine.search('',{category,group});
    assert.equal(filtered.filter(candidate=>candidate.id===id).length,1,`${lang}: ${id} must occur once in ${category}/${group}`);
    for(const query of [entry.term,entry.zh]){
     assert.equal(engine.search(query,{category,group})[0]?.id,id,`${lang}: ${query} is unreachable in ${category}/${group}`);
    }
   }
  }
 }
});

test('methods, execution techniques, and publication records use their intended categories',()=>{
 const placements=[
  ['knowledge-distillation','training','迁移与训练策略'],
  ['flash-attention','systems','计算与显存优化'],
  ['ddim','generation','采样与引导'],
  ['latent-diffusion','generation','生成表示与结构'],
  ['dft','science','科学计算'],
  ['git','development','代码与版本'],
  ['git-pull','development','远程同步'],
  ['github','development','协作与发布']
 ];
 for(const [lang,context] of Object.entries(contexts)){
  const {entries,categories}=context.WIKI_DATA;
  const engine=context.WikiSearch.createSearch(entries,categories);
  for(const [id,category,group] of placements){
   const entry=entries.find(candidate=>candidate.id===id);
   assert.ok(entry,`${lang}: missing ${id}`);
   assert.equal(entry.category,category,`${lang}: ${id} primary category`);
   assert.ok(engine.search('',{category,group}).some(candidate=>candidate.id===id),`${lang}: ${id} is missing from ${category}/${group}`);
  }
  assert.equal(engine.search('Knowledge Distillation',{category:'data'}).length,0,`${lang}: distillation is a training strategy`);
  assert.equal(engine.search('RLC',{category:'venues',kind:'conference'})[0]?.id,'rlc');
  assert.equal(engine.search('RLJ',{category:'venues',kind:'journal'})[0]?.id,'rlj');
  assert.equal(engine.search('RLJ',{category:'venues',kind:'conference'}).length,0,`${lang}: RLJ is a journal`);
 }
});

test('all category groups are localized, ordered consistently, nonempty, and cover their memberships',()=>{
 const expectedCategories=sourceCategories.map(category=>category.id).sort();
 for(const [lang,context] of Object.entries(contexts)){
  const {entries,categories,grouping}=context.WIKI_DATA;
  const {createSearch,groupFor}=context.WikiSearch;
  const engine=createSearch(entries,categories);
  assert.deepEqual(Object.keys(grouping).sort(),expectedCategories,`${lang}: missing category grouping`);
  for(const {id:category} of categories){
   const metadata=grouping[category];
   const order=Array.from(metadata.groups,group=>group.id);
   assert.ok(order.length,`${lang}: ${category} has no groups`);
   assert.equal(new Set(order).size,order.length,`${lang}: ${category} has duplicate groups`);
   assert.deepEqual(order,Array.from(contexts.zh.WIKI_DATA.grouping[category].groups,group=>group.id),`${lang}: ${category} group order differs from Chinese`);
   for(const copy of [metadata.description,...metadata.groups.flatMap(group=>[group.label,group.description])]){
    assert.equal(typeof copy,'string',`${lang}: ${category} missing grouping copy`);
    assert.ok(copy.trim(),`${lang}: ${category} has blank grouping copy`);
    if(lang==='en')assert.doesNotMatch(copy,/[\u3400-\u9fff]/,`${category}: Chinese fallback in English grouping`);
   }
   const expected=Array.from(entries.filter(entry=>entry.categories.includes(category)),entry=>entry.id).sort();
   assert.deepEqual(Array.from(engine.search('',{category}),entry=>entry.id).sort(),expected,`${lang}: ${category} membership filter lost entries`);
   const covered=[];
   for(const group of order){
    const result=engine.search('',{category,group});
    assert.ok(result.length,`${lang}: ${category}/${group} is empty`);
    for(const entry of result){
     assert.equal(groupFor(entry,category),group,`${lang}: ${entry.id} appears in the wrong ${category} group`);
     covered.push(entry.id);
    }
   }
   assert.equal(new Set(covered).size,covered.length,`${lang}: duplicate entries across ${category} groups`);
   assert.deepEqual(covered.sort(),expected,`${lang}: ${category} grouping leaves entries unreachable`);
   for(const [oldGroup,newGroup] of Object.entries(metadata.legacyGroups||{})){
    assert.ok(oldGroup.trim()&&!order.includes(oldGroup),`${lang}: invalid legacy group ${category}/${oldGroup}`);
    assert.ok(newGroup===''||order.includes(newGroup),`${lang}: ${oldGroup} points to missing group ${newGroup}`);
   }
  }
 }
});

test('publishing filters separate paper types, manuscript versions, venues, and presentations',()=>{
 const examples={
  '论文与报告类型':['research-article','survey','technical-report','position-paper'],
  '稿件版本':['preprint','accepted-manuscript','camera-ready','version-of-record'],
  '发表渠道与论文集':['findings','proceedings','journal','conference','workshop'],
  '会议展示':['oral','poster','spotlight'],
  '审稿流程与规范':['peer-review','rebuttal','double-blind','conflict-of-interest'],
  '审稿角色与组织':['reviewer','area-chair','program-chair','program-committee'],
  '学术平台':['arxiv','openreview'],
  '论文结构与材料':['appendix','supplementary-material'],
  '署名与贡献':['authorship','first-author','credit'],
  '检索与标识':['doi','scie'],
  '期刊与会议评价':['ccf','jcr','impact-factor']
 };
 for(const [lang,context] of Object.entries(contexts)){
  const {entries,categories}=context.WIKI_DATA;
  const engine=context.WikiSearch.createSearch(entries,categories);
  const byId=new Map(entries.map(entry=>[entry.id,entry]));
  for(const [group,ids] of Object.entries(examples)){
   const filtered=engine.search('',{category:'publishing',group});
   for(const id of ids){
    assert.ok(filtered.some(entry=>entry.id===id),`${lang}: ${id} missing from ${group}`);
    for(const query of [byId.get(id).term,byId.get(id).zh]){
     assert.ok(engine.search(query,{category:'publishing',group}).some(entry=>entry.id===id),`${lang}: ${query} is unreachable inside ${group}`);
    }
   }
  }
  const paperTypes=engine.search('',{category:'publishing',group:'论文与报告类型'});
  for(const group of ['稿件版本','发表渠道与论文集','会议展示'])for(const id of examples[group]){
   assert.ok(!paperTypes.some(entry=>entry.id===id),`${lang}: ${id} is not a paper type`);
   const query=byId.get(id).term;
   assert.equal(engine.search(query,{category:'publishing',group:'论文与报告类型'}).length,0,`${lang}: ${query} leaks into paper types`);
  }
 }
});

test('program chairs and the program committee resolve to distinct glossary entries',()=>{
 for(const [lang,context] of Object.entries(contexts)){
  const {entries,categories}=context.WIKI_DATA;
  const engine=context.WikiSearch.createSearch(entries,categories);
  for(const [query,expected,wrong] of [
   ['Program Chair','program-chair','program-committee'],
   ['程序主席','program-chair','program-committee'],
   ['Program Committee','program-committee','program-chair'],
   ['程序委员会','program-committee','program-chair']
  ]){
   const result=engine.search(query,{category:'publishing'});
   assert.equal(result[0]?.id,expected,`${lang}: ${query} should resolve to ${expected}`);
   assert.ok(!result.some(entry=>entry.id===wrong),`${lang}: ${query} incorrectly resolves to ${wrong}`);
  }
 }
});

test('new publishing concepts are reachable by their English and Chinese names in either locale',()=>{
 for(const [lang,context] of Object.entries(contexts)){
  const {entries,categories}=context.WIKI_DATA;
  const engine=context.WikiSearch.createSearch(entries,categories);
  for(const id of ['research-article','position-paper','accepted-manuscript','version-of-record','reviewer','program-chair']){
   const entry=entries.find(candidate=>candidate.id===id);
   assert.ok(entry,`${lang}: missing ${id}`);
   assert.match(entry.zh,/[\u3400-\u9fff]/,`${lang}: ${id} has no Chinese lookup name`);
   for(const query of [entry.term,entry.zh]){
    assert.equal(engine.search(query)[0]?.id,id,`${lang}: exact lookup for ${query}`);
   }
  }
 }
});

test('publishing group metadata is localized, ordered, nonempty, and covers every publishing entry',()=>{
 const order=['论文与报告类型','稿件版本','发表渠道与论文集','会议展示','审稿流程与规范','审稿角色与组织','学术平台','论文结构与材料','署名与贡献','检索与标识','期刊与会议评价'];
 for(const [lang,context] of Object.entries(contexts)){
  const {entries,categories,grouping}=context.WIKI_DATA;
  const metadata=grouping?.publishing;
  assert.ok(metadata,`${lang}: missing publishing grouping metadata`);
  assert.deepEqual(Array.from(metadata.groups,group=>group.id),order,`${lang}: grouping order changed`);
  for(const text of [metadata.description,...metadata.groups.flatMap(group=>[group.label,group.description])]){
   assert.equal(typeof text,'string',`${lang}: missing group copy`);
   assert.ok(text.trim(),`${lang}: empty group copy`);
   if(lang==='en')assert.doesNotMatch(text,/[\u3400-\u9fff]/,'English grouping copy contains Chinese fallback');
  }
  const engine=context.WikiSearch.createSearch(entries,categories);
  const publishing=engine.search('',{category:'publishing'});
  assert.equal(publishing.length,43,`${lang}: publishing category size`);
  const covered=[];
  for(const {id} of metadata.groups){
   const result=engine.search('',{category:'publishing',group:id});
   assert.ok(result.length,`${lang}: ${id} would be an empty filter`);
   covered.push(...result.map(entry=>entry.id));
  }
  assert.equal(new Set(covered).size,covered.length,`${lang}: entries occur in multiple publishing groups`);
  assert.deepEqual(covered.sort(),Array.from(publishing,entry=>entry.id).sort(),`${lang}: group filters leave publishing entries unreachable`);
  assert.ok(metadata.legacyGroups,`${lang}: missing legacy group migration`);
  for(const [oldGroup,newGroup] of Object.entries(metadata.legacyGroups)){
   assert.ok(oldGroup.trim(),`${lang}: blank legacy group`);
   assert.ok(newGroup===''||order.includes(newGroup),`${lang}: ${oldGroup} migrates to unknown group ${newGroup}`);
  }
  assert.equal(metadata.legacyGroups['论文类型'],'论文与报告类型',`${lang}: old paper-type links should retain their filter`);
 }
});

test('glossary pages have localized navigation and a genuine EN / CN counterpart',()=>{
 for(const lang of ['zh','en']){
  const file=new URL(lang==='en'?'en.html':'index.html',base);
  const html=fs.readFileSync(file,'utf8');
  assert.match(html,new RegExp(`<html lang="${lang==='en'?'en':'zh-CN'}"`));
  assert.ok(html.includes(`href="../${lang}/index.html"`));
  assert.ok(html.includes(lang==='en'?'Look up AI concepts, conferences, and journals':'按中文、英文或缩写检索 AI 概念、会议与期刊'));
  assert.ok(!html.includes('释义目前为中文'));
  assert.ok(!html.includes('total-count'));
  if(lang==='en')assert.doesNotMatch(html.replace(/<[^>]+>/g,''),/[\u3400-\u9fff]/);
  const header=html.match(/<header\b[\s\S]*?<\/header>/)?.[0]||'';
  const group=header.match(/<div\b[^>]*class="[^"]*\blanguage-switch\b[^"]*"[^>]*>[\s\S]*?<\/div>/)?.[0];
  assert.ok(group);
  const links=[...group.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)];
  assert.deepEqual(links.map(link=>link[2].trim()),['EN','CN']);
  assert.match(links[0][1],/href="en\.html"/);
  assert.match(links[1][1],/href="index\.html"/);
  assert.equal(links.filter(link=>/aria-current="page"/.test(link[1])).length,1);
  assert.equal(/aria-current="page"/.test(links[0][1]),lang==='en');
  assert.match(group,/id="wiki-language"/,'the alternate locale needs a state-preserving target');
  const brand=header.match(/<a class="brand"[^>]*href="([^"]+)"/);
  assert.equal(brand?.[1],lang==='en'?'../index.html':'../zh.html');
  assert.deepEqual(missingRefs(fileURLToPath(file),html),[]);
 }
});
