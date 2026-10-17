import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {wikiPage} from './wiki-shell.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const source=path.join(root,'content/wiki');
const read=file=>JSON.parse(fs.readFileSync(path.join(source,file),'utf8'));
const categories=read('categories.json');
const entries=categories.flatMap(c=>read(c.id+'.json'));
const ids=new Set(entries.map(e=>e.id));
const categoryIds=new Set(categories.map(c=>c.id));
const groupFor=(entry,category)=>entry.categoryGroups?.[category]||entry.group;
if(ids.size!==entries.length)throw Error('Duplicate wiki IDs');
for(const e of entries){
 for(const key of ['id','term','zh','category','summary','detail','sources']){
  if(!e[key]?.length)throw Error(`Wiki entry ${e.id} is missing ${key}`);
 }
 if(!categoryIds.has(e.category))throw Error(`Unknown wiki category: ${e.category}`);
 if(!Array.isArray(e.categories)||!e.categories.includes(e.category)||new Set(e.categories).size!==e.categories.length||e.categories.some(c=>!categoryIds.has(c)))throw Error(`Invalid category membership: ${e.id}`);
 if(!['term','conference','journal'].includes(e.kind)||(e.category==='venues'&&e.kind==='term'))throw Error(`Invalid entry kind: ${e.id}`);
 for(const [category,group] of Object.entries(e.categoryGroups||{})){
  if(!e.categories.includes(category)||category===e.category||typeof group!=='string'||!group.trim())throw Error(`Invalid category group: ${e.id} / ${category}`);
 }
 for(const id of e.related)if(!ids.has(id))throw Error(`Unknown related term: ${e.id} → ${id}`);
}
const meta=read('locales.en.json');
for(const e of entries)for(const group of [e.group,...Object.values(e.categoryGroups||{})])if(!meta.groups[group])throw Error(`Missing English group: ${group}`);
const groupingSource=read('grouping.json');
for(const id of categoryIds)if(!groupingSource[id])throw Error(`Missing category grouping: ${id}`);
const grouping={},englishGrouping={};
for(const [category,config] of Object.entries(groupingSource)){
 if(!categories.some(c=>c.id===category))throw Error(`Unknown grouped category: ${category}`);
 const groupIds=new Set(config.groups.map(g=>g.id));
 if(groupIds.size!==config.groups.length)throw Error(`Duplicate groups in ${category}`);
 const categoryEntries=entries.filter(e=>e.categories.includes(category));
 for(const e of categoryEntries)if(!groupIds.has(groupFor(e,category)))throw Error(`Ungrouped entry in ${category}: ${e.id}`);
 for(const group of config.groups){
  if(!group.description?.trim()||!categoryEntries.some(e=>groupFor(e,category)===group.id))throw Error(`Empty group: ${category} / ${group.id}`);
 }
 for(const [oldGroup,newGroup] of Object.entries(config.legacyGroups||{})){
  if(!oldGroup.trim()||groupIds.has(oldGroup)||(newGroup!==''&&!groupIds.has(newGroup)))throw Error(`Invalid group migration: ${oldGroup} → ${newGroup}`);
 }
 if(!config.description?.trim())throw Error(`Missing category description: ${category}`);
 const description=meta.categoryDescriptions?.[category];
 const translatedGroups=config.groups.map(group=>({id:group.id,label:meta.groups[group.id],description:meta.groupDescriptions?.[category]?.[group.id]}));
 for(const value of [description,...translatedGroups.flatMap(g=>[g.label,g.description])]){
  if(typeof value!=='string'||!value.trim()||/[\u3400-\u9fff]/.test(value))throw Error(`Invalid English grouping text: ${category}`);
 }
 grouping[category]={...config,groups:config.groups.map(group=>({...group,label:group.id}))};
 englishGrouping[category]={...config,description,groups:translatedGroups};
}
const translations=categories.flatMap(c=>read('en/'+c.id+'.json'));
const byId=new Map(translations.map(e=>[e.id,e]));
if(byId.size!==entries.length||translations.length!==entries.length||translations.some(e=>!ids.has(e.id)))throw Error('English wiki IDs must match Chinese wiki IDs exactly');
const englishEntries=entries.map(e=>{
 const t=byId.get(e.id);
 if(!t?.summary?.trim()||t.detail?.length!==e.detail.length||t.sourceTitles?.length!==e.sources.length)throw Error(`Incomplete English wiki entry: ${e.id}`);
 for(const value of [t.summary,...t.detail,...t.sourceTitles])if(typeof value!=='string'||!value.trim()||/[\u3400-\u9fff]/.test(value))throw Error(`Invalid English wiki prose: ${e.id}`);
 const categoryGroupLabels=e.categoryGroups?Object.fromEntries(Object.entries(e.categoryGroups).map(([category,group])=>[category,meta.groups[group]])):undefined;
 return {...e,summary:t.summary,detail:t.detail,groupLabel:meta.groups[e.group],...(categoryGroupLabels?{categoryGroupLabels}:{}),sources:e.sources.map((s,i)=>({...s,title:t.sourceTitles[i]}))};
});
const englishCategories=categories.map(c=>{
 const t=meta.categories[c.id];
 if(!t||t.length!==4||t.some(v=>!v.trim()))throw Error(`Missing English category: ${c.id}`);
 return {...c,name:t[0],short:t[1],section:t[2],guide:c.guide.replace('../zh/','../en/'),guideTitle:t[3]};
});
const linkSource=read('useful-links.json');
const collectionIds=['all',...categoryIds],usedResources=new Set();
if(Object.keys(linkSource.collections).length!==collectionIds.length)throw Error('Useful links must cover all wiki categories and the general collection');
const checkLinkCopy=(copy,fields,lang,id)=>{
 for(const field of fields)if(typeof copy?.[field]!=='string'||!copy[field].trim()||(lang==='en'&&/[\u3400-\u9fff]/.test(copy[field])))throw Error(`Invalid ${lang} useful-link ${field}: ${id}`);
};
const resourceUrls=new Set();
for(const [id,resource] of Object.entries(linkSource.resources)){
 const url=new URL(resource.url);
 if(url.protocol!=='https:'||url.username||url.password||resourceUrls.has(url.href))throw Error(`Invalid or duplicate useful-link URL: ${id}`);
 resourceUrls.add(url.href);
 for(const lang of ['zh','en'])checkLinkCopy(resource[lang],['title','description'],lang,id);
}
const validateLinkCollection=(collection,id,min,max)=>{
 if(!Array.isArray(collection?.links)||collection.links.length<min||collection.links.length>max||new Set(collection.links).size!==collection.links.length)throw Error(`Invalid useful-link collection: ${id}`);
 for(const resourceId of collection.links){
  if(!Object.hasOwn(linkSource.resources,resourceId))throw Error(`Unknown useful link: ${id} / ${resourceId}`);
  usedResources.add(resourceId);
 }
 for(const lang of ['zh','en'])checkLinkCopy(collection[lang],['description'],lang,id);
};
for(const id of collectionIds)validateLinkCollection(linkSource.collections[id],id,4,5);
if(Object.keys(linkSource.topics||{}).length!==categoryIds.size)throw Error('Useful links must cover every category’s topics');
for(const category of categoryIds){
 const topics=linkSource.topics[category],groups=groupingSource[category].groups;
 if(!topics||Object.keys(topics).length!==groups.length)throw Error(`Incomplete useful-link topics: ${category}`);
 for(const {id:group} of groups)validateLinkCollection(topics[group],`${category} / ${group}`,2,4);
}
if(usedResources.size!==Object.keys(linkSource.resources).length)throw Error('Unused useful-link resources');
const localizeLinkCollection=(collection,lang)=>({
 description:collection[lang].description,
 links:collection.links.map(resourceId=>{
  const resource=linkSource.resources[resourceId];
  return {id:resourceId,url:resource.url,label:new URL(resource.url).hostname.replace(/^www\./,''),...resource[lang]};
 })
});
const usefulLinksFor=lang=>Object.fromEntries(collectionIds.map(id=>[id,{
 ...localizeLinkCollection(linkSource.collections[id],lang),
 ...(id==='all'?{}:{topics:Object.fromEntries(Object.entries(linkSource.topics[id]).map(([group,collection])=>[group,localizeLinkCollection(collection,lang)]))})
}]));
const out=path.join(root,'public/blog/guide/wiki');
fs.mkdirSync(out,{recursive:true});
for(const [lang,data,file] of [
 ['zh',{categories,entries,grouping,usefulLinks:usefulLinksFor('zh')},'data.js'],
 ['en',{categories:englishCategories,entries:englishEntries,groupLabels:meta.groups,grouping:englishGrouping,usefulLinks:usefulLinksFor('en')},'data-en.js'],
]){
 fs.writeFileSync(path.join(out,file),'window.WIKI_DATA = '+JSON.stringify({...data,lang}).replace(/</g,'\\u003c')+';\n');
 fs.writeFileSync(path.join(out,lang==='en'?'en.html':'index.html'),wikiPage(lang));
}
console.log(`Wiki built: ${entries.length} entries × 2 languages.`);
