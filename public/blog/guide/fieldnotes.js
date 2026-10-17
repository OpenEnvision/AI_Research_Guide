(() => {
 const lang=document.body.dataset.lang;
 const dialogs=[...document.querySelectorAll('.paper-dialog')];
 const cards=[...document.querySelectorAll('[data-paper]')];
 const openers=new WeakMap();
 let active=null;
 const visible=el=>el?.isConnected&&el!==document.body&&!el.closest('[hidden], [inert], dialog:not([open])')&&el.getClientRects().length>0;
 const fallback=d=>{
  const card=cards.find(button=>'paper-'+button.dataset.paper===d.id);
  const rect=visible(card)?card.getBoundingClientRect():null;
  const viewport=window.visualViewport,top=viewport?.offsetTop||0,bottom=top+(viewport?.height??innerHeight);
  if(rect&&rect.bottom>top&&rect.top<bottom)return card;
  return ['mobile-search','opensearch','menu'].map(id=>document.getElementById(id)).find(visible);
 };
 const closePaper=d=>{
  if(!d.open||d.classList.contains('leaving'))return;
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){d.close();return;}
  d.classList.add('leaving');
  setTimeout(()=>{d.close();d.classList.remove('leaving');},180);
 };
 const openPaper=(id,source)=>{
  const d=document.getElementById('paper-'+id);
  if(!d?.matches('.paper-dialog'))return;
  if(active&&active!==d){
   if(!source&&active.contains(document.activeElement))source=openers.get(active);
   active.close();
  }
  if(!d.open){
   const origin=source||document.activeElement;
   openers.set(d,visible(origin)&&!d.contains(origin)?origin:fallback(d));
   d.showModal();d.querySelector('[data-close-paper]')?.focus({preventScroll:true});
  }
  active=d;window.guideSyncLanguage?.();
 };
 cards.forEach(button=>button.addEventListener('click',()=>{
  history.replaceState(history.state,'','#paper-'+button.dataset.paper);
  openPaper(button.dataset.paper,button);
 }));
 const fromHash=()=>{if(location.hash.startsWith('#paper-')){try{openPaper(decodeURIComponent(location.hash.slice(7)));}catch{}}};
 dialogs.forEach(d=>{
  // A filtered card uses display:none. Keep its modal outside that ancestor so
  // a search result or a shared paper URL remains readable under any filter.
  d.closest('.paper-library')?.append(d);
  d.querySelector('[data-close-paper]')?.addEventListener('click',()=>closePaper(d));
  d.addEventListener('click',event=>{
   if(event.target===d){const rect=d.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closePaper(d);}
  });
  d.addEventListener('cancel',event=>{event.preventDefault();closePaper(d);});
  d.addEventListener('close',()=>{
   if(active===d)active=null;
   if(location.hash==='#'+d.id)history.replaceState(history.state,'',location.pathname+location.search);
   window.guideSyncLanguage?.();
   const origin=openers.get(d);openers.delete(d);
   if(!active?.open)(visible(origin)?origin:fallback(d))?.focus({preventScroll:true});
  });
 });
 window.addEventListener('hashchange',fromHash);fromHash();
 document.querySelectorAll('[data-check]').forEach(c=>{const key='guide-check-'+c.dataset.check;try{c.checked=localStorage.getItem(key)==='1';}catch{}c.addEventListener('change',()=>{try{localStorage.setItem(key,c.checked?'1':'0');}catch{}});});
 const normalize=value=>String(value||'').normalize('NFKC').toLocaleLowerCase();
 const filter=()=>{
  const domain=document.getElementById('paper-domain')?.value||'',q=normalize(document.getElementById('paper-query')?.value).trim();
  let n=0;
  document.querySelectorAll('.paper-library .paper-item').forEach(el=>{
   const show=(!domain||(el.dataset.domains||'').split(' ').includes(domain))&&normalize(el.dataset.find).includes(q);
   el.hidden=!show;if(show)n++;
  });
  const count=document.getElementById('paper-count');if(count)count.textContent=n+' '+(lang==='zh'?'篇论文':n===1?'paper':'papers');
 };
 document.getElementById('paper-domain')?.addEventListener('change',filter);document.getElementById('paper-query')?.addEventListener('input',filter);
 if(document.getElementById('paper-domain'))filter();
})();
