(()=>{
'use strict';const $=id=>document.getElementById(id),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const {entries,categories,lang='zh',groupLabels={},grouping={},usefulLinks:linkCollections}=window.WIKI_DATA,english=lang==='en';
const L=english?{
 allCategories:'All categories',conference:'Conference',journal:'Journal',related:'Related concepts',references:'References',copy:'Copy link',copyLabel:'Copy term link',back:'Back',backLabel:'Return to term list',searchResults:'Search results',allTerms:'All terms',commonTerms:'Common terms',allTopics:'All topics',empty:'No matching terms',emptyCategory:'Search all categories or try different keywords.',emptyAll:'Search by name, full title, or abbreviation.',everywhere:'Search all categories',suggest:'Suggest a term',full:'View full entry',copied:'Term link copied',copyFallback:'Link selected. Copy it to continue.',openCategories:'Open categories',closeCategories:'Close categories',count:n=>`${n} ${n===1?'entry':'entries'}`,more:n=>`Load more · ${n} remaining`
}:{
 allCategories:'全部分类',conference:'会议',journal:'期刊',related:'相关概念',references:'参考资料',copy:'复制链接',copyLabel:'复制词条链接',back:'返回',backLabel:'返回词条列表',searchResults:'搜索结果',allTerms:'全部词条',commonTerms:'常用词条',allTopics:'全部主题',empty:'未找到匹配词条',emptyCategory:'请搜索全部分类，或调整关键词。',emptyAll:'支持按中文名称、英文全称或缩写检索。',everywhere:'搜索全部分类',suggest:'建议新增词条',full:'查看完整词条',copied:'词条链接已复制',copyFallback:'链接已选中，请复制。',openCategories:'打开词条分类',closeCategories:'关闭词条分类',count:n=>`${n} 个词条`,more:n=>`加载更多 · 剩余 ${n} 个词条`
};
const displayGroup=group=>groupLabels[group]||group;
const entryGroup=e=>WikiSearch.groupFor(e,state.cat);
const entryCategory=e=>catMap.get(e.categories.includes(state.cat)?state.cat:e.category);
// Retain common misspellings in the search index without presenting them as
// accepted names in the definition.
const searchOnlyAliases=new Set(['tpmai']);
const displayAliases=e=>e.aliases.filter(a=>!searchOnlyAliases.has(a.toLowerCase())&&(!english||!/[\u3400-\u9fff]/.test(a)));
const byId=new Map(entries.map(e=>[e.id,e])),catMap=new Map(categories.map(c=>[c.id,c])),engine=WikiSearch.createSearch(entries,categories);
const navMq=matchMedia('(max-width:700px)');
const resourcesMq=matchMedia('(max-width:950px)');
resourcesMq.addEventListener('change',({matches})=>{const panel=$('detail').querySelector('.useful-links');if(panel)panel.open=!matches;});
const platform=navigator.userAgentData?.platform||navigator.platform||'';
document.querySelectorAll('[data-search-shortcut]').forEach(el=>{el.textContent=/Mac|iPhone|iPad|iPod/i.test(platform)?'⌘ K':'Ctrl K';});
const common=['checkpoint','neurips','harness','pre-training','post-training','sota','model-based','kv-cache','agent','tpami','environment','rlhf'];
const resolve=name=>byId.get(name)||entries.find(e=>[e.term,e.zh,...e.aliases].some(a=>WikiSearch.compact(a)===WikiSearch.compact(name)));
let state={q:'',cat:'',kind:'',group:'',id:'',all:false},limit=24,visible=[],focusIndex=-1,returnFocus=null,returnY=0;
function normalizeState(s){
 const config=grouping[s.cat];if(!config||!s.group)return s;
 if(Object.hasOwn(config.legacyGroups,s.group)){
  const selected=byId.get(s.id);
  return {...s,group:selected?.categories.includes(s.cat)?WikiSearch.groupFor(selected,s.cat):config.legacyGroups[s.group]};
 }
 return config.groups.some(g=>g.id===s.group)?s:{...s,group:''};
}
function parse({alignTermGroup=false}={}){
 const p=new URLSearchParams(location.hash.slice(1)),original={q:p.get('q')||'',cat:p.get('cat')||'',kind:p.get('kind')||'',group:p.get('group')||'',id:p.get('term')||'',all:p.get('all')==='1'};
 let next=normalizeState(original);
 // An opened bookmark may retain a valid group whose selected term has moved.
 // Related-term navigation and history keep their original list as the return point.
 const selected=byId.get(next.id);
 if(alignTermGroup&&original.group&&selected?.categories.includes(next.cat))next={...next,group:WikiSearch.groupFor(selected,next.cat)};
 if(encode(original)!==encode(next)){const hash=encode(next);history.replaceState({},'',location.pathname+location.search+(hash?'#'+hash:''));}
 return next;
}
function encode(s){const p=new URLSearchParams();for(const k of ['q','cat','kind','group'])if(s[k])p.set(k,s[k]);if(s.all)p.set('all','1');if(s.id)p.set('term',s.id);return p.toString()}
function go(patch,{replace=false}={}){const next=normalizeState({...state,...patch});const hash=encode(next);const url=location.pathname+location.search+(hash?'#'+hash:'');history[replace?'replaceState':'pushState']({},'',url);state=next;render()}
function highlight(s){const parts=WikiSearch.tokenize(state.q).filter(t=>t.length>1).sort((a,b)=>b.length-a.length);if(!parts.length)return esc(s);const re=new RegExp('('+parts.map(t=>t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')','giu');return String(s).split(re).map((x,i)=>i%2?'<mark>'+esc(x)+'</mark>':esc(x)).join('')}
function nav(){let section='';$('category-list').innerHTML=`<button data-cat="" class="${!state.cat?'active':''}">${L.allCategories}<span>${entries.length}</span></button>`+categories.map(c=>{const heading=c.section!==section?`<div class="nav-group">${esc(c.section)}</div>`:'';section=c.section;return heading+`<button data-cat="${c.id}" class="${state.cat===c.id?'active':''}" aria-pressed="${state.cat===c.id}">${esc(c.name)}<span>${entries.filter(e=>e.categories.includes(c.id)).length}</span></button>`}).join('');}
function row(e){const selected=state.id===e.id,kind=e.kind==='conference'?L.conference:e.kind==='journal'?L.journal:entryCategory(e).short,alternate=english?displayAliases(e).find(a=>a.toLowerCase()!==e.term.toLowerCase()):e.zh;return `<button class="term-row ${selected?'selected':''}" data-id="${e.id}" aria-expanded="${selected}"><span class="row-top"><strong>${highlight(e.term)}</strong>${alternate?`<span class="row-zh">${highlight(alternate)}</span>`:''}</span><span class="row-summary">${highlight(e.summary)}</span><span class="row-tags">${esc(kind)} · ${esc(displayGroup(entryGroup(e)))}</span><span class="row-arrow" aria-hidden="true">↗</span></button>`}
function usefulLinks(open=!resourcesMq.matches){
 const category=catMap.get(state.cat),categoryId=category?category.id:'all',base=linkCollections[categoryId],topic=base.topics?.[state.group],collection=topic||base,group=topic?state.group:'';
 const context=category?category.name+(group?' · '+displayGroup(group):''):(english?'General resources':'通用资源');
 return `<details class="useful-links" data-category="${categoryId}" data-group="${esc(group)}" data-scope="${esc(categoryId+'/'+group)}"${open?' open':''}><summary><h2>${english?'Useful links':'实用资源'}</h2><span class="useful-links-category">${esc(context)}</span></summary><div class="useful-links-body"><p class="useful-links-intro">${esc(collection.description)}</p><ul>${collection.links.map(link=>`<li><a data-resource="${esc(link.id)}" href="${esc(link.url)}" target="_blank" rel="noopener noreferrer"><span class="useful-link-title">${esc(link.title)}<span aria-hidden="true">↗</span></span><span class="useful-link-description">${esc(link.description)}</span><span class="useful-link-url">${esc(link.label)}</span></a></li>`).join('')}</ul></div></details>`;
}
function detail(){const e=byId.get(state.id),pane=$('detail'),previousPanel=pane.querySelector('.useful-links'),previousCollection=previousPanel?.dataset.scope;pane.setAttribute('aria-label',e?(english?'Term details':'词条详情'):(english?'Useful links':'实用资源'));pane.classList.toggle('open',!!e);document.body.classList.toggle('detail-open',!!e);const modal=!!e&&resourcesMq.matches;if(modal){pane.setAttribute('role','dialog');pane.setAttribute('aria-modal','true')}else{pane.removeAttribute('role');pane.removeAttribute('aria-modal')}if(!e){pane.innerHTML=usefulLinks(previousPanel?.open);if(previousCollection!==pane.querySelector('.useful-links').dataset.scope)pane.scrollTop=0;return;}
const aliases=displayAliases(e),cat=entryCategory(e),rels=e.related.map(resolve).filter(r=>r&&r.id!==e.id);const sources=e.sources.map(s=>`<a href="${esc(s.url)}" target="_blank" rel="noopener"><span>${esc(s.title)}</span><span aria-hidden="true">↗</span></a>`).join('');
pane.innerHTML=`<div class="detail-top"><span>${esc(cat.short)} · ${esc(displayGroup(entryGroup(e)))}</span><div class="detail-tools"><button id="copy-term" aria-label="${L.copyLabel}">${L.copy}</button><button id="close-detail" aria-label="${L.backLabel}">${L.back}</button></div></div><h2 class="detail-title" tabindex="-1">${esc(e.term)}</h2>${!english?`<p class="detail-zh">${esc(e.zh)}</p>`:''}${aliases.length?`<p class="alias-line">${aliases.slice(0,7).map(esc).join(' / ')}</p>`:''}<p class="definition">${esc(e.summary)}</p><div class="explanation">${e.detail.map(p=>`<p>${esc(p)}</p>`).join('')}</div>${rels.length?`<h3 class="detail-section-title">${L.related}</h3><div class="related">${[...new Map(rels.map(r=>[r.id,r])).values()].slice(0,6).map(r=>`<button data-id="${r.id}">${esc(r.term)}</button>`).join('')}</div>`:''}<h3 class="detail-section-title">${L.references}</h3><div class="source-links">${sources}<a href="${esc(cat.guide)}" target="_blank" rel="noopener"><span>${esc(cat.guideTitle)}</span><span>↗</span></a></div>`;
}
function render(){nav();if($('query').value!==state.q)$('query').value=state.q;$('clear').hidden=!state.q;
 const c=catMap.get(state.cat);$('section-title').textContent=state.q?L.searchResults:c?c.name:state.all?L.allTerms:L.commonTerms;$('all-terms').hidden=!!state.cat||state.all||!!state.q;
 const venue=state.cat==='venues';$('kind-filter').hidden=!venue;$('kind').value=state.kind;
 const config=grouping[state.cat],availableGroups=c?[...new Set(entries.filter(e=>e.categories.includes(c.id)&&(!state.kind||e.kind===state.kind)).map(entryGroup))]:[];
 const groups=config?config.groups.map(g=>g.id).filter(id=>availableGroups.includes(id)):availableGroups;
 $('group-filter').hidden=!c||groups.length<2;$('group').innerHTML=`<option value="">${L.allTopics}</option>`+groups.map(g=>`<option value="${esc(g)}">${esc(displayGroup(g))}</option>`).join('');$('group').value=state.group;
 const description=config?(config.groups.find(g=>g.id===state.group)?.description||config.description):'';
 $('group-description').hidden=!description;$('group-description').textContent=description;
 if(description)$('group').setAttribute('aria-describedby','group-description');else $('group').removeAttribute('aria-describedby');
 let result=engine.search(state.q,{category:state.cat,kind:state.kind,group:state.group});
 if(!state.q&&!state.cat&&!state.all)result=common.map(resolve).filter(Boolean);
 if(!state.q&&state.cat){
  const ranks=config?new Map(config.groups.map((g,index)=>[g.id,index])):null;
  result.sort((a,b)=>ranks?ranks.get(entryGroup(a))-ranks.get(entryGroup(b)):displayGroup(entryGroup(a)).localeCompare(displayGroup(entryGroup(b)),english?'en':'zh'));
 }
 visible=result.slice(0,limit);$('result-count').textContent=L.count(result.length);
 let lastGroup='';$('results').innerHTML=visible.map(e=>{const h=!state.q&&state.cat&&!state.group&&entryGroup(e)!==lastGroup?`<h3 class="group-heading">${esc(displayGroup(entryGroup(e)))}</h3>`:'';lastGroup=entryGroup(e);return h+row(e)}).join('');
 if(!result.length)$('results').innerHTML=`<div class="empty"><h3>${L.empty}</h3><p>${state.cat?L.emptyCategory:L.emptyAll}</p>${state.cat?`<button id="search-everywhere">${L.everywhere}</button>`:''}<a href="https://github.com/OpenEnvision/ai_research_guide/issues/new" target="_blank" rel="noopener">${L.suggest} ↗</a></div>`;
 $('more').hidden=result.length<=limit;$('more').textContent=L.more(Math.max(0,result.length-limit));
 const hash=encode(state);document.querySelectorAll('.language-link').forEach(link=>{link.href=(link.hreflang==='en'?'en.html':'index.html')+location.search+(hash?'#'+hash:'');});
 detail();focusIndex=-1;
}
// Related terms share the original list row and scroll position as their return point.
function rememberListPosition(id){returnFocus=document.querySelector(`.term-row[data-id="${id}"]`)||$('query');returnY=scrollY}
function restoreListPosition(){const originId=returnFocus?.dataset?.id;const origin=originId?document.querySelector(`.term-row[data-id="${originId}"]`):null;const target=origin?.getClientRects().length&&!origin.closest('[inert]')?origin:$('query');target.focus({preventScroll:true});scrollTo(0,returnY);returnFocus=null}
function focusDetail(){if(byId.has(state.id)&&matchMedia('(max-width:950px)').matches)$('detail').querySelector('h2')?.focus({preventScroll:true})}
function openTerm(id){if(!byId.has(id))return;if(!state.id)rememberListPosition(id);go({id});$('detail').scrollTop=0;focusDetail()}
function closeTerm(){go({id:''});restoreListPosition()}
let inputTimer;function input(){clearTimeout(inputTimer);inputTimer=setTimeout(()=>{limit=24;go({q:$('query').value.trim(),id:'',all:false},{replace:true})},65)}
$('query').addEventListener('input',input);$('query').addEventListener('compositionend',input);$('search-form').addEventListener('submit',e=>{e.preventDefault();clearTimeout(inputTimer);go({q:$('query').value.trim(),id:''},{replace:true});if(visible.length)openTerm(visible[0].id)});
$('query').addEventListener('keydown',e=>{if(e.key==='ArrowDown'){e.preventDefault();document.querySelector('.term-row')?.focus()}});
document.addEventListener('click',async event=>{const t=event.target.closest('button,a');if(!t)return;
 if(t.classList.contains('nav-active')){closeMenu();return}
 if(t.dataset.id){openTerm(t.dataset.id);return}if(t.dataset.resolve){const r=resolve(t.dataset.resolve);if(r)openTerm(r.id);return}
 if(t.dataset.peek){const r=resolve(t.dataset.peek);if(r){$('peek-content').innerHTML=`<h2>${esc(r.term)}</h2><p>${esc(r.summary)}</p><button id="peek-full" data-target="${r.id}">${L.full} →</button>`;$('term-peek').showModal()}return}
 if(t.id==='peek-full'){$('term-peek').close();openTerm(t.dataset.target);return}
 if(t.hasAttribute('data-cat')){limit=24;go({cat:t.dataset.cat,group:'',kind:'',id:'',q:'',all:!t.dataset.cat});closeMenu();window.scrollTo({top:0});return}
 if(t.hasAttribute('data-query')){limit=24;go({q:t.dataset.query,cat:'',group:'',kind:'',id:''});$('query').focus();return}
 if(t.id==='close-detail'){closeTerm();return}
 if(t.id==='copy-term'){const url=location.href;try{await navigator.clipboard.writeText(url);toast(L.copied)}catch{let input=document.createElement('input');input.className='copy-fallback';input.readOnly=true;input.value=url;$('detail').querySelector('.detail-top').after(input);input.select();if(document.execCommand('copy')){input.remove();toast(L.copied)}else toast(L.copyFallback)}return}
 if(t.id==='clear'){$('query').value='';go({q:'',id:''},{replace:true});$('query').focus()}
 if(t.id==='all-terms'){limit=24;go({all:true,id:''})}if(t.id==='more'){limit+=24;render()}
 if(t.id==='search-everywhere'){go({cat:'',kind:'',group:''})}
 if(t.id==='menu'){document.body.classList.contains('nav-open')?closeMenu(true):openMenu()}
 if(t.id==='shade')closeMenu(true);if(t.id==='close-peek')$('term-peek').close();
});
function closeMenu(restoreFocus=false){const wasOpen=document.body.classList.contains('nav-open');document.body.classList.remove('nav-open');$('menu').setAttribute('aria-expanded','false');$('menu').setAttribute('aria-label',L.openCategories);$('shade').hidden=true;$('categories').inert=navMq.matches;$('categories').setAttribute('aria-hidden',String(navMq.matches));if(restoreFocus&&wasOpen)$('menu').focus()}
function openMenu(){if(!navMq.matches)return;$('categories').inert=false;$('categories').setAttribute('aria-hidden','false');document.body.classList.add('nav-open');$('menu').setAttribute('aria-expanded','true');$('menu').setAttribute('aria-label',L.closeCategories);$('shade').hidden=false;$('categories').querySelector('a,button')?.focus()}
navMq.addEventListener('change',()=>closeMenu());closeMenu();
$('kind').addEventListener('change',()=>{limit=24;go({kind:$('kind').value,group:'',id:''})});$('group').addEventListener('change',()=>{limit=24;go({group:$('group').value,id:''})});
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();closeMenu();if(state.id)go({id:''});$('query').focus();$('query').select()}if(e.key==='Escape'){if($('term-peek').open)return;if(document.body.classList.contains('nav-open'))closeMenu(true);else if(state.id)closeTerm();else $('query').blur()}
 if(e.key==='Tab'&&document.body.classList.contains('nav-open')){const items=[...$('categories').querySelectorAll('a[href],button')].filter(el=>el.getClientRects().length&&!el.closest('[inert]'));if(e.shiftKey&&document.activeElement===items[0]){e.preventDefault();items.at(-1)?.focus()}else if(!e.shiftKey&&document.activeElement===items.at(-1)){e.preventDefault();items[0]?.focus()}}
 if(e.key==='Tab'&&state.id&&matchMedia('(max-width:950px)').matches&&!document.body.classList.contains('nav-open')){const items=[...$('detail').querySelectorAll('button,a[href],input')];const first=items[0],last=items.at(-1);if(e.shiftKey&&(document.activeElement===first||!$('detail').contains(document.activeElement))){e.preventDefault();last?.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus()}}
 if(e.target.classList.contains('term-row')&&['ArrowDown','ArrowUp'].includes(e.key)){e.preventDefault();const rows=[...document.querySelectorAll('.term-row')];const i=rows.indexOf(e.target);rows[Math.max(0,Math.min(rows.length-1,i+(e.key==='ArrowDown'?1:-1)))].focus()}
});
let toastTimer;function toast(s){$('toast').textContent=s;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),2400)}
// A history traversal can emit both events; rebuilding twice would discard restored focus.
function syncLocation(){const next=parse();if(encode(next)===encode(state))return;const closed=!!state.id&&!next.id,detailChanged=state.id!==next.id;if(!state.id&&next.id)rememberListPosition(next.id);state=next;render();if(closed)restoreListPosition();else if(detailChanged)focusDetail()}
window.addEventListener('popstate',syncLocation);window.addEventListener('hashchange',syncLocation);state=parse({alignTermGroup:true});render();focusDetail();
window.wikiTest={search:engine.search,entries,categories,resolve};
})();
