import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source=fs.readFileSync(new URL('../public/blog/guide/guide.js',import.meta.url),'utf8');
const settle=()=>new Promise(resolve=>setImmediate(resolve));

// Run the real reader script against a small DOM harness. Deferred responses
// exercise the menu/search race without relying on machine or network speed.
function reader({lang='en',url='https://guide.test/blog/guide/en/practice.html',legacy,hash='',mobile=true,setup,deferFrames=false,initialState=null,page='practice',visualViewport}={}){
 const location=new URL(url);location.hash=hash;
 const requests=[],timers=[],frames=[],scrollCalls=[],replacements=[],windowListeners=new Map(),documentListeners=new Map(),viewportListeners=new Map(),mediaListeners=[],nodes=new Map();
 let document;
 class Element{
  constructor(tag='div',id=''){
   this.tagName=tag.toUpperCase();this.id=id;this.dataset={};this.children=[];this.listeners=new Map();this.attrs={};this.isConnected=true;this.value='';this.hidden=false;
   const properties=new Map();this.style={setProperty:(name,value)=>properties.set(name,value),removeProperty:name=>properties.delete(name),getPropertyValue:name=>properties.get(name)||''};
   const classes=new Set();
   this.classList={add:name=>classes.add(name),remove:name=>classes.delete(name),contains:name=>classes.has(name),toggle:(name,on)=>on?classes.add(name):classes.delete(name)};
  }
  addEventListener(name,fn){const list=this.listeners.get(name)||[];list.push(fn);this.listeners.set(name,list);}
  emit(name,event={}){for(const fn of this.listeners.get(name)||[])fn({target:this,preventDefault(){},...event});}
  setAttribute(name,value){this.attrs[name]=String(value);}
  getAttribute(name){return this.attrs[name]??null;}
  hasAttribute(name){return Object.hasOwn(this.attrs,name);}
  removeAttribute(name){delete this.attrs[name];}
  set textContent(value){this.children=[];this.text=String(value);}
  get textContent(){return this.text||this.children.map(child=>child.textContent).join('');}
  set href(value){this.hrefValue=new URL(value,location.href).href;}
  get href(){return this.hrefValue;}
  append(...children){this.text='';this.children.push(...children);children.forEach(child=>{child.parent=this;});}
  replaceChildren(){this.children.forEach(child=>{child.isConnected=false;});this.children=[];this.text='';}
  querySelector(){return null;}
  querySelectorAll(){return [];}
  closest(selector){if(selector==='details')return this.details||null;if(selector==='a[href]')return this.tagName==='A'&&this.href?this:this.parent?.closest(selector)||null;return null;}
  contains(element){return this===element||this.children.some(child=>child.contains(element));}
  getClientRects(){return this.hidden?[]:[{}];}
  focus(options){if(document.activeElement!==this)document.activeElement?.emit('blur');document.activeElement=this;this.focusOptions=options;}
  showModal(){this.returnFocus=document.activeElement;this.open=true;}
  close(){if(!this.open)return;this.open=false;this.returnFocus?.focus();queueMicrotask(()=>this.emit('close'));}
  scrollIntoView(){this.scrolled=true;}
 }
 for(const id of ['nav','menu','shade','opensearch','mobile-search','searchdialog','searchinput','closesearch','results','language'])nodes.set(id,new Element('div',id));
 nodes.get('nav').append(nodes.get('opensearch'));
 const language=nodes.get('language');
 language.attrs.href='../zh/practice.html';
 language.dataset.sharedAnchors='["practice-algorithms","practice-sql"]';
 nodes.get('searchdialog').dataset.searchSrc=`../search-data.${lang}.json`;
 const body=new Element(),main=new Element();body.dataset={lang,page};
 document={body,documentElement:new Element(),activeElement:body,getElementById:id=>nodes.get(id)||null,createElement:tag=>new Element(tag),querySelector:selector=>selector==='.app-main'?main:null,querySelectorAll:selector=>selector==='.language-switch a'?[language]:[],addEventListener:(name,fn)=>{const list=documentListeners.get(name)||[];list.push(fn);documentListeners.set(name,list);}};
 const media={matches:mobile,addEventListener:(name,fn)=>{if(name==='change')mediaListeners.push(fn);}};
 const history={state:initialState,replaceState(state){this.state=state;replacements.push(state);}};
 const viewport=visualViewport?{height:600,offsetTop:0,...visualViewport,addEventListener:(name,fn)=>{const list=viewportListeners.get(name)||[];list.push(fn);viewportListeners.set(name,list);}}:undefined;
 const context=vm.createContext({document,location,history,scrollX:0,scrollY:0,innerHeight:600,visualViewport:viewport,navigator:{platform:'Linux'},URL,URLSearchParams,HTMLSelectElement:class{},setTimeout:fn=>timers.push(fn),requestAnimationFrame:fn=>deferFrames?frames.push(fn):fn(),matchMedia:()=>media,addEventListener:(name,fn)=>{const list=windowListeners.get(name)||[];list.push(fn);windowListeners.set(name,list);},fetch:(input,options)=>new Promise((resolve,reject)=>requests.push({url:String(input),options,resolve,reject}))});
 context.scrollTo=options=>{scrollCalls.push(options);context.scrollX=options.left;context.scrollY=options.top;for(const fn of windowListeners.get('scroll')||[])fn();};
 context.window=context;context.guideUI={hint:lang==='zh'?'搜索主题与资源。':'Search topics and resources.'};
 if(legacy)context.guideSearch={[lang]:legacy};
 setup?.({nodes,Element,document,context});
 vm.runInContext(source,context,{filename:'guide.js'});
 const emit=(name,event)=>{for(const fn of windowListeners.get(name)||[])fn({preventDefault(){},...event});};
 const emitDocument=(name,event)=>{for(const fn of documentListeners.get(name)||[])fn({preventDefault(){},...event});};
 const setMobile=matches=>{media.matches=matches;mediaListeners.forEach(fn=>fn({matches}));};
 const flushFrame=()=>{const scheduled=frames.splice(0);scheduled.forEach(fn=>fn());};
 const emitViewport=name=>{for(const fn of viewportListeners.get(name)||[])fn();};
 return {nodes,document,context,requests,location,history,replacements,scrollCalls,timers,emit,emitDocument,emitViewport,setMobile,flushFrame,Element};
}

const sqlRecords=[{url:'practice.html#resource-1',title:'SQLBolt',body:'Interactive SQL exercises in your browser.'},{url:'practice.html#resource-2',title:'Algorithms',body:'Practise sorting and graphs.'}];
const respond=(request,data=sqlRecords)=>request.resolve({ok:true,json:async()=>data});

for(const [edition,url,dataUrl] of [
 ['default','https://guide.test/blog/guide/en/practice.html','https://guide.test/blog/guide/search-data.en.json'],
 ['nested','https://guide.test/blog/guide/guide-uestc/en/practice.html','https://guide.test/blog/guide/guide-uestc/search-data.en.json'],
 ['standalone','https://guide.test/en/practice.html','https://guide.test/search-data.en.json']
])test(`${edition}: navigation works before search, which fetches its edition's language only when opened`,async()=>{
 const {nodes,document,requests}=reader({url});
 assert.equal(requests.length,0);
 nodes.get('menu').emit('click');
 assert.equal(document.body.classList.contains('navopen'),true);
 assert.equal(nodes.get('nav').inert,false);
 nodes.get('opensearch').emit('click');
 assert.equal(requests.length,1);
 assert.equal(requests[0].url,dataUrl);
 assert.equal(requests[0].options.cache,'no-cache','revalidate the index so revised and retired text does not survive in a fresh page');
 assert.equal(document.body.classList.contains('navopen'),false);
 assert.equal(nodes.get('results').textContent,'Loading search…');
 assert.equal(nodes.get('results').getAttribute('aria-busy'),'true');
 nodes.get('searchinput').value='SQLBolt';nodes.get('searchinput').emit('input');
 respond(requests[0]);await settle();
 assert.equal(nodes.get('results').getAttribute('aria-busy'),'false');
 assert.equal(nodes.get('results').children.length,1);
 assert.equal(nodes.get('results').children[0].children[0].textContent,'SQLBolt');
 assert.equal(nodes.get('results').children[0].href,new URL('practice.html#resource-1',url).href);
});

test('closing a pending search keeps focus and the dialog closed when data arrives; reopening reuses it',async()=>{
 const {nodes,document,requests,emit}=reader();
 nodes.get('mobile-search').focus();
 emit('keydown',{ctrlKey:true,key:'k'});
 assert.equal(nodes.get('searchdialog').open,true);
 emit('keydown',{key:'Escape'});
 assert.equal(nodes.get('searchdialog').open,false);
 assert.equal(document.activeElement,nodes.get('mobile-search'));
 respond(requests[0]);await settle();
 assert.equal(nodes.get('searchdialog').open,false);
 assert.equal(document.activeElement,nodes.get('mobile-search'));
 emit('keydown',{metaKey:true,key:'k'});
 assert.equal(requests.length,1);
 assert.equal(nodes.get('results').textContent,'Search topics and resources.');
 nodes.get('searchinput').value='SQLBolt';nodes.get('searchinput').emit('input');
 assert.equal(nodes.get('results').children.length,1);
});

test('reopening during a request does not issue another download and uses the latest query',async()=>{
 const {nodes,requests}=reader();
 nodes.get('mobile-search').emit('click');nodes.get('closesearch').emit('click');
 nodes.get('mobile-search').emit('click');
 nodes.get('searchinput').value='graphs';nodes.get('searchinput').emit('input');
 assert.equal(requests.length,1);
 respond(requests[0]);await settle();
 assert.equal(nodes.get('results').children.length,1);
 assert.equal(nodes.get('results').children[0].children[0].textContent,'Algorithms');
});

test('failed search has a localized retry and recovers without losing the query',async()=>{
 const {nodes,document,requests}=reader({lang:'zh',url:'https://guide.test/zh/practice.html'});
 nodes.get('mobile-search').emit('click');
 assert.equal(requests[0].url,'https://guide.test/search-data.zh.json');
 assert.equal(nodes.get('results').textContent,'正在加载搜索…');
 nodes.get('searchinput').value='SQLBolt';nodes.get('searchinput').emit('input');
 requests[0].reject(Error('Network unavailable'));await settle();
 assert.equal(nodes.get('results').getAttribute('aria-busy'),'false');
 const retry=nodes.get('results').children[1];
 assert.equal(retry.tagName,'BUTTON');assert.equal(retry.textContent,'重新加载');
 retry.focus();retry.emit('click');
 assert.equal(document.activeElement,nodes.get('searchinput'));
 assert.equal(requests.length,2);
 respond(requests[1]);await settle();
 assert.equal(nodes.get('searchinput').value,'SQLBolt');
 assert.equal(nodes.get('results').children[0].children[0].textContent,'SQLBolt');
});

test('invalid search responses expose retry instead of silently showing no results',async()=>{
 const {nodes,requests}=reader();nodes.get('mobile-search').emit('click');
 respond(requests[0],{error:'not a search index'});await settle();
 assert.match(nodes.get('results').textContent,/Search could not load/);
 assert.equal(nodes.get('results').children[1].textContent,'Retry');
});

test('same-page results focus after native restoration and survive a quick Tab before the deferred close event',async()=>{
 const {nodes,context,location,timers,Element}=reader({legacy:sqlRecords});
 const target=new Element(),resourceLink=new Element('a');target.append(resourceLink);target.details={open:false};nodes.set('resource-1',target);
 const requested=[];context.guideRequestTocTarget=hash=>requested.push(hash);
 nodes.get('mobile-search').focus();
 nodes.get('mobile-search').emit('click');
 nodes.get('searchinput').value='SQLBolt';nodes.get('searchinput').emit('input');
 let prevented=false;
 nodes.get('results').children[0].focus();
 nodes.get('results').children[0].emit('click',{preventDefault(){prevented=true;}});
 assert.equal(nodes.get('searchdialog').open,false);
 assert.equal(context.document.activeElement,target,'keyboard reading must move immediately after native close restores the opener');
 assert.equal(prevented,true);
 assert.equal(location.hash,'#resource-1');
 assert.deepEqual(requested,['#resource-1'],'explicit search navigation informs the table of contents');
 assert.equal(timers.length,0,'focus must follow native restoration without a guessed delay');
 assert.equal(target.scrolled,true);assert.equal(target.details.open,true);
 assert.equal(target.getAttribute('tabindex'),'-1');
 assert.equal(target.focusOptions.preventScroll,true);
 assert.equal(context.document.body.classList.contains('searchopen'),false);
 // Model Tab advancing from the LI to its first resource link before the
 // asynchronously dispatched close event reaches the application's handler.
 resourceLink.focus();await settle();
 assert.equal(context.document.activeElement,resourceLink,'a late close event must not move focus back to the opener or the LI');
 assert.equal(target.hasAttribute('tabindex'),false,'temporary tabindex is removed when reading moves on');
});

test('cancel after following a search result restores the new opener instead of revisiting the old result',async()=>{
 const {nodes,document,Element}=reader({legacy:sqlRecords});
 const target=new Element();nodes.set('resource-1',target);
 nodes.get('mobile-search').focus();nodes.get('mobile-search').emit('click');
 nodes.get('searchinput').value='SQLBolt';nodes.get('searchinput').emit('input');
 nodes.get('results').children[0].emit('click');await settle();
 assert.equal(document.activeElement,target);
 nodes.get('mobile-search').focus();nodes.get('mobile-search').emit('click');
 nodes.get('closesearch').emit('click');await settle();
 assert.equal(document.activeElement,nodes.get('mobile-search'));
});

test('practice language switching follows the visible shared chapter and preserves explicit anchors',()=>{
 const {nodes,context,location}=reader({hash:'#practice-algorithms'});
 assert.match(nodes.get('language').href,/#practice-algorithms$/);
 context.guideCurrentSection='practice-sql';context.guideSyncLanguage();
 assert.match(nodes.get('language').href,/#practice-sql$/);
 context.guideCurrentSection=null;context.guideSyncLanguage();
 assert.equal(new URL(nodes.get('language').href).hash,'','scrolling above the first chapter must discard a stale URL hash');
 context.guideCurrentSection=undefined;context.guideSyncLanguage();
 assert.match(nodes.get('language').href,/#practice-algorithms$/,'before TOC initialization an explicit incoming anchor must survive');
 location.hash='';context.guideSyncLanguage();
 assert.equal(new URL(nodes.get('language').href).hash,'');
 context.document.body.dataset.page='papers';location.hash='#practice-algorithms';context.guideCurrentSection='practice-sql';context.guideSyncLanguage();
 assert.match(nodes.get('language').href,/#practice-algorithms$/);
});

test('history hash changes reveal folded answers without overriding the browser-restored reading position',()=>{
 const {nodes,emit,location,Element}=reader();
 const target=new Element();target.details={open:false};nodes.set('q12',target);
 location.hash='#q12';emit('hashchange');
 assert.equal(target.details.open,true);
 assert.equal(target.scrolled,undefined,'restoring an older fragment must not force a jump to its heading');
});

test('an initial FAQ deep link expands the answer and explicitly locates it',()=>{
 const {nodes}=reader({hash:'#q12',setup({nodes,Element}){const target=new Element();target.details={open:false};nodes.set('q12',target);}});
 assert.equal(nodes.get('q12').details.open,true);
 assert.equal(nodes.get('q12').scrolled,true);
});

test('ordinary same-page anchor activation expands its answer before native navigation without delayed scrolling',()=>{
 const {nodes,emitDocument,Element}=reader();
 const target=new Element();target.details={open:false};nodes.set('q12',target);
 const link=new Element('a'),label=new Element('strong');link.href='#q12';link.append(label);
 let prevented=false;
 emitDocument('click',{target:label,button:0,preventDefault(){prevented=true;}});
 assert.equal(target.details.open,true,'keyboard and pointer activation both expose the destination before the default jump');
 assert.equal(prevented,false,'the browser retains native anchor navigation and history');
 assert.equal(target.scrolled,undefined,'no delayed scroll can override a rapid follow-up navigation');
 target.details.open=false;emitDocument('click',{target:label,button:0,metaKey:true});
 assert.equal(target.details.open,false,'opening a new tab must not mutate the current article');
});

test('changing to a narrow viewport moves focus out of the newly hidden sidebar',()=>{
 const {nodes,document,setMobile}=reader({mobile:false});
 nodes.get('opensearch').focus();setMobile(true);
 assert.equal(nodes.get('nav').inert,true);
 assert.equal(document.activeElement,nodes.get('menu'));
 assert.equal(nodes.get('menu').focusOptions.preventScroll,true);
 setMobile(false);nodes.get('mobile-search').focus();setMobile(true);
 assert.equal(document.activeElement,nodes.get('mobile-search'),'focus outside the sidebar is left alone');
});

test('practice history restores each entry independently, including repeated URLs, without writing state on scroll',()=>{
 const r=reader({deferFrames:true,initialState:{otherFeature:'kept'}});
 const {context,history,location,emit,flushFrame,replacements}=r;
 assert.equal(history.state.otherFeature,'kept');
 const first=history.state;
 const scroll=top=>{context.scrollY=top;emit('scroll');};
 const visit=hash=>{location.hash=hash;history.state=null;emit('popstate',{state:null});emit('hashchange');return history.state;};
 scroll(320);const second=visit('#practice-sql');scroll(2100);const third=visit('#practice-specialist');scroll(4700);const fourth=visit('#practice-sql');scroll(2500);
 assert.notEqual(second.guideReadingEntry,fourth.guideReadingEntry,'repeated URLs must not share a reading position');
 assert.equal(replacements.length,4,'each new entry is written once; scrolling only updates memory');
 const restore=(state,hash,nativePosition)=>{
  history.state=state;location.hash=hash;emit('popstate',{state});scroll(nativePosition);emit('hashchange');flushFrame();flushFrame();
 };
 restore(third,'#practice-specialist',4000);assert.equal(context.scrollY,4700);
 restore(second,'#practice-sql',1800);assert.equal(context.scrollY,2100);
 restore(fourth,'#practice-sql',1800);assert.equal(context.scrollY,2500);
 restore(first,'',0);assert.equal(context.scrollY,320);
 assert.equal(replacements.length,4,'traversing known entries does not replace their state');
});

test('a rapid Back then Forward cancels the obsolete pending restoration',()=>{
 const {context,history,location,emit,flushFrame,scrollCalls}=reader({deferFrames:true});
 const first=history.state;context.scrollY=500;emit('scroll');
 location.hash='#practice-sql';history.state=null;emit('popstate',{state:null});emit('hashchange');
 const second=history.state;context.scrollY=2500;emit('scroll');
 history.state=first;location.hash='';emit('popstate',{state:first});context.scrollY=0;emit('scroll');emit('hashchange');
 history.state=second;location.hash='#practice-sql';emit('popstate',{state:second});context.scrollY=1800;emit('scroll');emit('hashchange');
 flushFrame();flushFrame();
 assert.equal(context.scrollY,2500);
 assert.deepEqual(scrollCalls.map(call=>call.top),[2500],'the superseded Back frame must not scroll the page');
});

test('explicit practice navigation saves the exact departure position before the next scroll event',()=>{
 const {context,history,location,emit,emitDocument,Element,flushFrame}=reader({deferFrames:true});
 const first=history.state;context.scrollY=1234;
 const link=new Element('a');link.href='#practice-sql';
 emitDocument('click',{target:link,button:0});
 location.hash='#practice-sql';history.state=null;emit('popstate',{state:null});emit('hashchange');context.scrollY=2000;emit('scroll');
 history.state=first;location.hash='';emit('popstate',{state:first});context.scrollY=0;emit('scroll');emit('hashchange');flushFrame();flushFrame();
 assert.equal(context.scrollY,1234);
});

test('activating the current hash cancels an older restoration without creating another history entry',()=>{
 const {context,history,location,emit,emitDocument,Element,flushFrame,scrollCalls,replacements}=reader({deferFrames:true,hash:'#practice-programming'});
 const first=history.state;context.scrollY=1500;emit('scroll');
 location.hash='#practice-sql';history.state=null;emit('popstate',{state:null});emit('hashchange');context.scrollY=2500;emit('scroll');
 history.state=first;location.hash='#practice-programming';emit('popstate',{state:first});context.scrollY=1200;emit('scroll');
 const link=new Element('a');link.href='#practice-programming';emitDocument('click',{target:link,button:0});
 // Native same-hash activation has moved to the requested heading before the
 // older history-restoration frame gets a chance to run.
 context.scrollY=1200;emit('scroll');flushFrame();flushFrame();
 assert.equal(context.scrollY,1200);assert.equal(scrollCalls.length,0);assert.equal(replacements.length,2);
});

test('pages outside the guide reader retain native history state and scrolling',()=>{
 const {history,replacements,emit,scrollCalls}=reader({page:'',initialState:{otherFeature:'kept'}});
 emit('popstate',{state:{guideReadingEntry:'outside'}});emit('scroll');
 assert.deepEqual(history.state,{otherFeature:'kept'});
 assert.equal(replacements.length,0);assert.equal(scrollCalls.length,0);
});

test('search follows keyboard-sized visual viewport resize and pan without resizing the page',()=>{
 const {nodes,context,emitViewport,flushFrame}=reader({deferFrames:true,visualViewport:{height:360,offsetTop:120}});
 nodes.get('mobile-search').emit('click');
 const dialog=nodes.get('searchdialog'),input=nodes.get('searchinput');
 assert.equal(dialog.style.getPropertyValue('--search-top'),'128px');
 assert.equal(dialog.style.getPropertyValue('--search-max-height'),'340px');
 assert.equal(dialog.classList.contains('search-compact'),true);
 assert.equal(input.focusOptions.preventScroll,true);
 input.value='SQLBolt';
 context.visualViewport.height=300;context.visualViewport.offsetTop=80;
 emitViewport('resize');emitViewport('scroll');flushFrame();
 assert.equal(context.innerHeight,600,'the layout viewport is unchanged, as with a mobile keyboard');
 assert.equal(dialog.style.getPropertyValue('--search-top'),'88px');
 assert.equal(dialog.style.getPropertyValue('--search-max-height'),'280px');
 assert.equal(input.value,'SQLBolt');
 assert.equal(context.scrollY,0,'viewport fitting must not scroll the article');
});

test('closing search clears viewport sizing and a queued keyboard event cannot bring it back',async()=>{
 const {nodes,context,emitViewport,flushFrame}=reader({deferFrames:true,visualViewport:{height:360,offsetTop:120}});
 nodes.get('mobile-search').emit('click');emitViewport('resize');
 nodes.get('closesearch').emit('click');await settle();flushFrame();
 const dialog=nodes.get('searchdialog');
 assert.equal(dialog.open,false);
 assert.equal(dialog.style.getPropertyValue('--search-top'),'');
 assert.equal(dialog.style.getPropertyValue('--search-max-height'),'');
 assert.equal(dialog.classList.contains('search-compact'),false);
 context.visualViewport.height=600;context.visualViewport.offsetTop=0;
 nodes.get('mobile-search').emit('click');
 assert.equal(dialog.style.getPropertyValue('--search-top'),'90px');
 assert.equal(dialog.style.getPropertyValue('--search-max-height'),'498px');
 assert.equal(dialog.classList.contains('search-compact'),false);
});

test('search falls back to window height when the visual viewport API is unavailable',()=>{
 const {nodes,context,emit,flushFrame}=reader({deferFrames:true});
 nodes.get('mobile-search').emit('click');
 context.innerHeight=480;emit('resize');flushFrame();
 assert.equal(nodes.get('searchdialog').style.getPropertyValue('--search-top'),'72px');
 assert.equal(nodes.get('searchdialog').style.getPropertyValue('--search-max-height'),'396px');
});

test('manual FAQ toggles keep the expand-all action label accurate',()=>{
 const {nodes,emitDocument}=reader({page:'research',setup({nodes,Element,document,context}){
  const answers=[new Element('details'),new Element('details')];answers.forEach(el=>{el.open=false;el.matches=selector=>selector==='details.qa';});
  document.querySelectorAll=selector=>selector==='details.qa'?answers:[];
  nodes.set('expand',new Element('button','expand'));nodes.set('answer-1',answers[0]);nodes.set('answer-2',answers[1]);
  Object.assign(context.guideUI,{all:'展开全部',collapse:'收起全部'});
 }});
 const button=nodes.get('expand'),first=nodes.get('answer-1'),second=nodes.get('answer-2');
 assert.equal(button.textContent,'展开全部');button.emit('click');assert.equal(first.open,true);assert.equal(second.open,true);assert.equal(button.textContent,'收起全部');
 first.open=false;emitDocument('toggle',{target:first});assert.equal(button.textContent,'展开全部');
 button.emit('click');assert.equal(first.open,true);assert.equal(button.textContent,'收起全部');
 button.emit('click');assert.equal(first.open,false);assert.equal(second.open,false);assert.equal(button.textContent,'展开全部');
});

for(const [page,url] of [['papers','https://guide.test/blog/guide/zh/papers.html?field=vision'],['ai4x','https://guide.test/blog/guide/en/ai4x.html?scene=finance']])test(`${page}: in-article search retains filters and scene state instead of reloading`,async()=>{
 const {nodes,location,history,document,Element}=reader({page,url,legacy:[{url:`${page}.html#destination`,title:'Unique topic',body:'A result within this article.'}]});
 const target=new Element();nodes.set('destination',target);
 nodes.get('mobile-search').focus();nodes.get('mobile-search').emit('click');nodes.get('searchinput').value='Unique topic';nodes.get('searchinput').emit('input');
 let prevented=false;nodes.get('results').children[0].emit('click',{preventDefault(){prevented=true;}});await settle();
 assert.equal(prevented,true);assert.equal(location.search,new URL(url).search);assert.equal(location.hash,'#destination');assert.equal(document.activeElement,target);assert.equal(target.scrolled,true);assert.ok(history.state.guideReadingEntry);
});

test('research reading positions survive a search jump and browser Back',()=>{
 const {context,history,location,emit,flushFrame}=reader({page:'research',url:'https://guide.test/blog/guide/zh/research.html#q12',deferFrames:true});
 const first=history.state;context.scrollY=2344;emit('scroll');location.hash='#q43';history.state=null;emit('popstate',{state:null});emit('hashchange');context.scrollY=18000;emit('scroll');
 history.state=first;location.hash='#q12';emit('popstate',{state:first});context.scrollY=1844;emit('scroll');emit('hashchange');flushFrame();flushFrame();
 assert.equal(context.scrollY,2344);assert.equal(history.state.guideReadingEntry,first.guideReadingEntry);
});
