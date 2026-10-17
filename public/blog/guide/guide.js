(()=>{
 const $=id=>document.getElementById(id);
 const lang=document.body.dataset.lang||'en',t=window.guideUI||{};
 const nav=$('nav'),menu=$('menu'),shade=$('shade'),main=document.querySelector('.app-main');
 const mq=matchMedia('(max-width:800px)');
 let lastFocus=null;
 const focusable='a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex="0"]';
 const visible=el=>!el.closest('[inert]')&&el.getClientRects().length>0;
 const platform=navigator.userAgentData?.platform||navigator.platform||'';
 document.querySelectorAll('[data-search-shortcut]').forEach(el=>{el.textContent=/Mac|iPhone|iPad|iPod/i.test(platform)?'⌘ K':'Ctrl K';});

 // Optional controls must not prevent the remainder of the guide from loading.
 const theme=$('theme');
 if(theme&&!theme.hidden)theme.addEventListener('click',()=>{
  const dark=document.documentElement.dataset.theme!=='dark';
  document.documentElement.dataset.theme=dark?'dark':'light';
  try{localStorage.setItem('theme',dark?'dark':'light');}catch{}
 });
 function closeMenu(restoreFocus=false){
  const wasOpen=document.body.classList.contains('navopen');
  document.body.classList.remove('navopen');
  menu?.setAttribute('aria-expanded','false');
  if(shade)shade.hidden=true;
  if(nav){nav.inert=mq.matches;nav.setAttribute('aria-hidden',String(mq.matches));}
  if(main)main.inert=false;
  if(restoreFocus&&wasOpen)menu?.focus();
 }
 function openMenu(){
  if(!mq.matches||!nav)return;
  nav.inert=false;nav.setAttribute('aria-hidden','false');
  document.body.classList.add('navopen');
  menu?.setAttribute('aria-expanded','true');
  if(shade)shade.hidden=false;
  if(main)main.inert=true;
  ($('opensearch')||nav.querySelector(focusable))?.focus();
 }
 menu?.addEventListener('click',()=>document.body.classList.contains('navopen')?closeMenu(true):openMenu());
 shade?.addEventListener('click',()=>closeMenu(true));
 mq.addEventListener('change',()=>{
  const hiddenFocus=mq.matches&&nav?.contains(document.activeElement);
  closeMenu();
  if(hiddenFocus)menu?.focus({preventScroll:true});
 });
 closeMenu();
 nav?.addEventListener('click',event=>{if(event.target.closest('a[href]')&&mq.matches)closeMenu();});

 // Keep the shared .navgroup / direct <a> sibling structure, and initialise
 // before guide-motion.js so an explicitly collapsed community group stays so.
 nav?.querySelectorAll('.navgroup').forEach(group=>{
  group.dataset.motionReady='1';
  const toggle=()=>{
   const collapse=group.getAttribute('aria-expanded')==='true';
   group.setAttribute('aria-expanded',String(!collapse));
   let sibling=group.nextElementSibling;
   while(sibling&&!sibling.classList.contains('navgroup')){
    if(sibling.matches('a')){sibling.classList.toggle('nav-collapsed',collapse);sibling.inert=collapse;}
    sibling=sibling.nextElementSibling;
   }
  };
  group.addEventListener('click',toggle);
  group.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();toggle();}});
 });
 function reveal(hash=location.hash,scroll=false){
  let id='';
  try{id=decodeURIComponent(hash.slice(1));}catch{return;}
  const el=id?document.getElementById(id):null;
  if(el){const details=el.closest('details');if(details)details.open=true;if(scroll)requestAnimationFrame(()=>el.scrollIntoView({block:'start'}));}
 }
 let prepareReadingNavigation=()=>{};
 if(document.body.dataset.page){
  // Fragment history can restore the heading instead of the position read
  // after it. Give each history entry its own in-memory reading position.
  const positions=new Map(),prefix=Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
  let serial=0,entry='',restoreVersion=0,restoring=false,pendingHref='';
  const save=()=>{if(!restoring)positions.set(entry,{left:scrollX,top:scrollY});};
  const newEntry=()=>{
   entry=prefix+'-'+(++serial);
   history.replaceState({...history.state,guideReadingEntry:entry},'',location.href);
   save();
  };
  newEntry();
  prepareReadingNavigation=destination=>{
   ++restoreVersion;restoring=false;save();
   pendingHref=destination.href===location.href?'':destination.href;
  };
  document.addEventListener('click',event=>{
   if(event.defaultPrevented||event.button||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
   const link=event.target.closest?.('a[href]');
   if(!link||link.hasAttribute('download')||(link.target&&link.target!=='_self'))return;
   const destination=new URL(link.href);
   if(destination.hash&&destination.origin===location.origin&&destination.pathname===location.pathname&&destination.search===location.search)prepareReadingNavigation(destination);
  },true);
  addEventListener('scroll',save,{passive:true});
  addEventListener('hashchange',()=>{pendingHref='';save();});
  addEventListener('popstate',event=>{
   const version=++restoreVersion,id=event.state?.guideReadingEntry;
   const saved=pendingHref!==location.href&&positions.get(id);
   pendingHref='';
   if(!saved){restoring=false;newEntry();return;}
   entry=id;restoring=true;
   // Native fragment restoration finishes after popstate. Keep its scroll
   // events from overwriting the saved position until our restoration settles.
   requestAnimationFrame(()=>{
    if(version!==restoreVersion)return;
    window.scrollTo({...saved,behavior:'instant'});
    requestAnimationFrame(()=>{
     if(version!==restoreVersion)return;
     restoring=false;save();
    });
   });
  });
 }
 // Open folded answers before the browser performs a deliberate anchor jump.
 // A history traversal must retain its saved scroll position, which can be
 // much farther down the article than the fragment still shown in the URL.
 document.addEventListener('click',event=>{
  if(event.defaultPrevented||event.button||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  const link=event.target.closest?.('a[href]');
  if(!link||link.hasAttribute('download')||(link.target&&link.target!=='_self'))return;
  const destination=new URL(link.href);
  if(destination.origin===location.origin&&destination.pathname===location.pathname&&destination.search===location.search)reveal(destination.hash);
 });
 // Preserve only anchors verified by the build in both translations. Generated
 // sec-N headings and resource-N entries can refer to different topics.
 const language=$('language');
 const languageLinks=[...document.querySelectorAll('.language-switch a')].map(link=>({link,base:new URL(link.getAttribute('href'),location.href)}));
 const sharedAnchors=new Set(JSON.parse(language?.dataset.sharedAnchors||'[]'));
 const stateInputs=document.body.dataset.page==='papers'?[$('paper-query'),$('paper-domain')]:[];
 const stateParams=new URLSearchParams(location.search);
 stateInputs.forEach((el,i)=>{
  if(!el)return;
  const value=stateParams.get(i===1?'field':'q');
  if(value!==null&&(!(el instanceof HTMLSelectElement)||[...el.options].some(option=>option.value===value)))el.value=value;
 });
 function syncLanguage(){
  let id='';try{id=decodeURIComponent(location.hash.slice(1));}catch{}
  if(document.body.dataset.page==='practice'){
   if(window.guideCurrentSection===null)id='';
   else if(sharedAnchors.has(window.guideCurrentSection))id=window.guideCurrentSection;
  }
  const scene=new URLSearchParams(location.search).get('scene');
  const validScene=document.body.dataset.page==='ai4x'&&[...document.querySelectorAll('.ai4x-domain[data-topic]')].some(el=>el.dataset.topic===scene);
  languageLinks.forEach(({link,base})=>{
   const target=new URL(base);target.search='';target.hash='';
   if(link===language?sharedAnchors.has(id):Boolean(document.getElementById(id)))target.hash=id;
   stateInputs.forEach((el,i)=>{if(el?.value.trim())target.searchParams.set(i===1?'field':'q',el.value.trim());});
   if(validScene)target.searchParams.set('scene',scene);
   link.href=target.href;
  });
 }
 window.guideSyncLanguage=syncLanguage;
 stateInputs.forEach(el=>{el?.addEventListener('input',syncLanguage);el?.addEventListener('change',syncLanguage);});
 addEventListener('hashchange',syncLanguage);syncLanguage();
 addEventListener('hashchange',()=>reveal());
 if(location.hash)reveal(location.hash,true);
 const expand=$('expand');
 if(expand){
  const answers=[...document.querySelectorAll('details.qa')];
  const syncExpand=()=>{expand.textContent=answers.length&&answers.every(el=>el.open)?t.collapse:t.all;};
  expand.addEventListener('click',()=>{
   const open=answers.some(el=>!el.open);
   answers.forEach(el=>{el.open=open;});syncExpand();
  });
  document.addEventListener('toggle',event=>{if(event.target.matches?.('details.qa'))syncExpand();},true);
  syncExpand();
 }

 const dialog=$('searchdialog'),input=$('searchinput'),results=$('results');
 const searchViewport=window.visualViewport;
 let searchViewportFrame=0;
 function fitSearchViewport(){
  if(!dialog?.open)return;
  // Mobile keyboards can shrink and pan only the visual viewport. vh/dvh and
  // window.resize alone still describe the page behind the keyboard.
  const height=searchViewport?.height||window.innerHeight;
  const top=Math.max(0,searchViewport?.offsetTop||0);
  const compact=height<400,gap=compact?8:Math.min(130,height*.15);
  dialog.classList.toggle('search-compact',compact);
  dialog.style.setProperty('--search-top',top+gap+'px');
  dialog.style.setProperty('--search-max-height',Math.max(0,height-gap-12)+'px');
 }
 function scheduleSearchViewport(){
  if(dialog?.open&&!searchViewportFrame)searchViewportFrame=requestAnimationFrame(()=>{searchViewportFrame=0;fitSearchViewport();});
 }
 function clearSearchViewport(){
  dialog?.classList.remove('search-compact');
  dialog?.style.removeProperty('--search-top');
  dialog?.style.removeProperty('--search-max-height');
 }
 searchViewport?.addEventListener('resize',scheduleSearchViewport,{passive:true});
 searchViewport?.addEventListener('scroll',scheduleSearchViewport,{passive:true});
 addEventListener('resize',scheduleSearchViewport,{passive:true});
 const normalize=value=>String(value||'').normalize('NFKC').toLocaleLowerCase();
 let records=Array.isArray(window.guideSearch?.[lang])?window.guideSearch[lang]:null;
 let searchState=records?'ready':'idle',searchRequest=null,searchTarget=null;
 const searchCopy=lang==='zh'?{
  loading:'正在加载搜索…',error:'搜索暂时无法加载，请检查网络后重试。',retry:'重新加载'
 }:{
  loading:'Loading search…',error:'Search could not load. Check your connection and try again.',retry:'Retry'
 };
 function loadSearch(){
  if(searchState==='ready'||searchState==='loading')return searchRequest;
  searchState='loading';search();
  const source=dialog?.dataset.searchSrc||`../search-data.${lang}.json`;
  searchRequest=fetch(new URL(source,location.href),{credentials:'same-origin',cache:'no-cache'})
   .then(response=>{if(!response.ok)throw Error('Search data unavailable');return response.json();})
   .then(data=>{
    if(!Array.isArray(data)||!data.every(record=>record&&typeof record.title==='string'&&typeof record.body==='string'&&typeof record.url==='string'))throw Error('Invalid search data');
    records=data;searchState='ready';
   })
   .catch(()=>{searchState='error';})
   .finally(()=>{searchRequest=null;if(dialog?.open)search();});
  return searchRequest;
 }
 function search(){
  if(!input||!results||!dialog?.open)return;
  results.replaceChildren();
  results.setAttribute('aria-busy',String(searchState==='loading'));
  if(searchState==='idle'||searchState==='loading'){results.textContent=searchCopy.loading;return;}
  if(searchState==='error'){
   const message=document.createElement('p');message.textContent=searchCopy.error;
   const retry=document.createElement('button');retry.type='button';retry.className='search-retry';retry.textContent=searchCopy.retry;
   retry.addEventListener('click',()=>{input.focus();loadSearch();});
   results.append(message,retry);return;
  }
  const query=normalize(input.value.trim());
  if(!query){results.textContent=t.hint||'Search topics, papers, and resources.';return;}
  const terms=query.split(/\s+/);
  const found=records.map(record=>{
   const title=normalize(record.title),body=normalize(record.body),haystack=title+' '+body;
   // Prefer concise article titles over long questions that happen to contain
   // the same word (for example 实验设计 before a question about 实验室).
   const score=terms.every(term=>haystack.includes(term))?(title===query?30:title.includes(query)?10+Math.min(8,query.length/Math.max(1,title.length)*12):1):0;
   return {record,score};
  }).filter(item=>item.score).sort((a,b)=>b.score-a.score).slice(0,30);
  if(!found.length){results.textContent=t.empty||'No matches. Try a shorter phrase.';return;}
  for(const {record} of found){
   const link=document.createElement('a');link.className='result';link.href=record.url;
   const title=document.createElement('strong');title.textContent=record.title;
   const snippet=document.createElement('span');
   const body=String(record.body||''),pos=normalize(body).indexOf(terms[0]),start=Math.max(0,pos-30);
   snippet.textContent=(start?'…':'')+body.slice(start,start+150)+(body.length>start+150?'…':'');
   link.append(title,snippet);
   link.addEventListener('click',event=>{
    if(event.defaultPrevented||event.button||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    const destination=new URL(link.href);
    let target=null;
    if(destination.origin===location.origin&&destination.pathname===location.pathname&&(!destination.search||destination.search===location.search)){
     let id='';try{id=decodeURIComponent(destination.hash.slice(1));}catch{}
     target=id?document.getElementById(id):null;
     if(target){
      event.preventDefault();searchTarget=target;
      // Search records have canonical URLs. An in-article jump should retain
      // the reader's current filters or selected process diagram.
      if(!destination.search)destination.search=location.search;
      prepareReadingNavigation(destination);
      location.hash=destination.hash;
     }
    }
    dialog?.close();closeMenu();
    if(target?.isConnected){
     // close() has completed native focus restoration synchronously. Move the
     // reading position now; its later close event must not undo a quick Tab.
     document.body.classList.remove('searchopen');
     clearSearchViewport();
     const details=target.closest('details');if(details)details.open=true;
     if(!target.hasAttribute('tabindex')){target.setAttribute('tabindex','-1');target.addEventListener('blur',()=>target.removeAttribute('tabindex'),{once:true});}
     target.focus({preventScroll:true});target.scrollIntoView({block:'start'});
     window.guideRequestTocTarget?.(destination.hash);
    }
   });
   results.append(link);
  }
 }
 function openSearch(){
  if(!dialog||!input||dialog.open)return;
  const origin=document.activeElement;
  searchTarget=null;
  lastFocus=mq.matches&&nav?.contains(origin)?menu:origin;
  closeMenu();
  document.querySelectorAll('.mobile-toc[open]').forEach(toc=>{toc.open=false;});
  dialog.showModal();document.body.classList.add('searchopen');
  fitSearchViewport();
  input.value='';loadSearch();search();input.focus({preventScroll:true});
 }
 $('opensearch')?.addEventListener('click',openSearch);
 $('mobile-search')?.addEventListener('click',openSearch);
 $('closesearch')?.addEventListener('click',()=>dialog?.close());
 input?.addEventListener('input',search);
 dialog?.addEventListener('close',()=>{
  if(dialog.open)return;
  document.body.classList.remove('searchopen');
  clearSearchViewport();
  const target=searchTarget;searchTarget=null;
  if(!target&&lastFocus?.isConnected&&visible(lastFocus))lastFocus.focus();
 });
 dialog?.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
 addEventListener('keydown',event=>{
  if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){
   event.preventDefault();dialog?.open?dialog.close():openSearch();return;
  }
  if(event.key==='Escape'){
   if(dialog?.open){event.preventDefault();dialog.close();return;}
   if(document.querySelector('.paper-dialog[open]'))return;
   closeMenu(true);
  }
  if(event.key==='Tab'&&mq.matches&&document.body.classList.contains('navopen')&&!dialog?.open){
   const items=[...nav.querySelectorAll(focusable)].filter(visible);
   if(!items.length)return;
   if(event.shiftKey&&document.activeElement===items[0]){event.preventDefault();items.at(-1).focus();}
   else if(!event.shiftKey&&document.activeElement===items.at(-1)){event.preventDefault();items[0].focus();}
  }
 });
 addEventListener('beforeprint',()=>document.querySelectorAll('.qa').forEach(details=>{details.open=true;}));
})();
