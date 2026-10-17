import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source=fs.readFileSync(new URL('../public/blog/guide/guide-motion.js',import.meta.url),'utf8');

function reader({positions=[],hash='',scroll=0,scene=false,aliases=false,viewport=null,navigation=null}={}){
 const location=new URL('https://guide.test/blog/guide/en/practice.html');location.hash=hash;
 const frames=new Map(),windowEvents=new Map(),documentEvents=new Map(),viewportEvents=new Map(),observers=[];
 let nextFrame=0,now=1000,syncs=0;
 const listen=(registry,type,fn)=>registry.set(type,[...(registry.get(type)||[]),fn]);
 const emit=(registry,type,event={})=>{for(const fn of registry.get(type)||[])fn(event);};
 const classes=()=>({values:new Set(),toggle(name,on){on?this.values.add(name):this.values.delete(name);},add(name){this.values.add(name);}});
 const attributes=()=>({attrs:{},setAttribute(key,value){this.attrs[key]=value;},removeAttribute(key){delete this.attrs[key];},hasAttribute(key){return Object.hasOwn(this.attrs,key);}});
 const scroller={scrollTop:scroll,scrollHeight:2200};
 const menu={addEventListener(type,fn){if(type==='click')this.click=fn;}};
 const nav=navigation?{
  dataset:{},scrollTop:navigation.scroll||0,clientTop:0,clientHeight:navigation.height||500,
  getBoundingClientRect:()=>({top:76}),
  querySelectorAll:()=>[selected],querySelector:()=>selected
 }:null;
 const navGroup={expanded:navigation?.collapsed?'false':'true',classList:{contains:name=>name==='navgroup'},getAttribute(){return this.expanded;},click(){this.expanded='true';}};
 const selected=navigation?{dataset:{page:'practice'},previousElementSibling:navGroup,getBoundingClientRect(){const top=76+navigation.top-nav.scrollTop;return {top,bottom:top+36};}}:null;
 const summary={focused:false,documentTop:300,focus(){this.focused=true;},getClientRects:()=>[{}],getBoundingClientRect(){const top=Math.max(72,this.documentTop-scroller.scrollTop);return {top,bottom:top+40};}};
 const mobile={open:false,style:{values:{},setProperty(key,value){this.values[key]=value;}},addEventListener(type,fn){if(type==='toggle')this.onToggle=fn;},contains(target){return target===summary||links.some(link=>link.mobile&&link===target);},querySelector(selector){return selector==='summary'?summary:null;}};
 const headings=positions.map((top,i)=>({
  ...attributes(),id:`sec-${i+1}`,top,focused:false,closest(){return null;},addEventListener(){},
  getBoundingClientRect(){return {top:this.top-scroller.scrollTop};},
  scrollIntoView(){scroller.scrollTop=Math.min(scroller.scrollHeight-600,Math.max(0,this.top-100));},
  focus(){this.focused=true;}
 }));
 const legacyAnchors=aliases?headings.map((heading,i)=>({
  id:`legacy-${i+1}`,tagName:'A',textContent:'',nextElementSibling:heading,
  closest:()=>null,getBoundingClientRect:()=>({top:heading.top-40-scroller.scrollTop})
 })):[];
 const links=[false,true].flatMap(isMobile=>headings.map(heading=>({
  ...attributes(),hash:'#'+heading.id,origin:location.origin,pathname:location.pathname,search:location.search,mobile:isMobile,classList:classes(),
  closest(selector){return selector==='.mobile-toc'?(this.mobile?mobile:null):this;}
 })));
 const canvas={width:0,height:0,getBoundingClientRect:()=>({width:720,height:360}),getContext:()=>new Proxy({},{get:(object,key)=>object[key]||(()=>{}),set:(object,key,value)=>(object[key]=value,true)})};
 const animation={dataset:{motion:'llm'},isConnected:true,hasAttribute:()=>false,querySelector:selector=>selector==='canvas'?canvas:{style:{}},querySelectorAll:()=>[]};
 const reduced={matches:false,addEventListener(type,fn){this.onChange=fn;}};
 const document={
  hidden:false,dialogOpen:false,documentElement:scroller,scrollingElement:scroller,body:{dataset:{page:'practice'}},
  addEventListener:(type,fn)=>listen(documentEvents,type,fn),
  getElementById:id=>id==='nav'?nav:id==='menu'?menu:[...headings,...legacyAnchors].find(element=>element.id===id)||null,
  querySelector(selector){if(selector==='dialog[open]')return this.dialogOpen?{}:null;if(selector==='.mobile-toc[open]')return mobile.open?mobile:null;return null;},
  querySelectorAll(selector){
   if(selector==='[data-motion]')return scene?[animation]:[];
   if(selector==='h2[id], .guide-explorer[id]')return headings;
   if(selector==='#toc a, .mobile-toc a')return links;
   if(selector==='.mobile-toc')return [mobile];
   if(selector==='.mobile-toc[open]')return mobile.open?[mobile]:[];
   return [];
  }
 };
 const context={
  document,location,innerHeight:600,devicePixelRatio:1,
  visualViewport:viewport?{height:600,offsetTop:0,...viewport,addEventListener:(type,fn)=>listen(viewportEvents,type,fn)}:null,
  getComputedStyle:element=>({scrollPaddingTop:element===scroller?'100px':'0px',scrollMarginTop:'0px',top:element===mobile?'72px':'0px',getPropertyValue:()=>''}),
  scrollBy:({top})=>{scroller.scrollTop=Math.min(scroller.scrollHeight-600,scroller.scrollTop+top);},
  matchMedia:()=>reduced,
  requestAnimationFrame:fn=>{frames.set(++nextFrame,fn);return nextFrame;},cancelAnimationFrame:id=>frames.delete(id),
  addEventListener:(type,fn)=>listen(windowEvents,type,fn),
  IntersectionObserver:class {constructor(callback){this.callback=callback;observers.push(this);}observe(){}unobserve(){}disconnect(){}},
  ResizeObserver:class {observe(){}disconnect(){}},MutationObserver:class {observe(){}},
  guideSyncLanguage(){syncs++;}
 };
 context.window=context;
 vm.runInNewContext(source,context,{filename:'guide-motion.js'});
 return {
  context,frames,headings,links,mobile,summary,animation,document,reduced,scroller,nav,navGroup,selected,menu,
  get syncs(){return syncs;},
  frame(){const callbacks=[...frames.values()];frames.clear();now+=16;callbacks.forEach(fn=>fn(now));},
  event:(type,event)=>emit(windowEvents,type,event),
  viewportEvent:(type,event)=>emit(viewportEvents,type,event),
  documentEvent:(type,event)=>emit(documentEvents,type,event),
  intersect(visible){observers[0].callback([{target:animation,isIntersecting:visible}]);},
  scrollTo(top){scroller.scrollTop=top;emit(windowEvents,'scroll');},
  active(){return links.filter(link=>link.attrs['aria-current']==='location').map(link=>link.hash);}
 };
}

test('selected sidebar entries stay visible without changing the article scroll position',()=>{
 const page=reader({scroll:900,navigation:{top:1300,collapsed:true}});
 assert.equal(page.navGroup.expanded,'true');
 assert.equal(page.nav.scrollTop,848);
 assert.equal(page.scroller.scrollTop,900);
 assert.equal(page.selected.getBoundingClientRect().bottom,76+500-12);
 // The mobile menu initially focuses its search control, which can reset the
 // sidebar's own offset. Opening it must reveal the current article again.
 page.nav.scrollTop=0;page.menu.click();page.frame();
 assert.equal(page.nav.scrollTop,848);
 assert.equal(page.scroller.scrollTop,900);
 page.nav.clientHeight=300;page.event('resize');
 assert.equal(page.selected.getBoundingClientRect().bottom,76+300-12);
 assert.equal(page.scroller.scrollTop,900);
});

test('sidebar reveal leaves visible entries still and handles entries above its viewport',()=>{
 const visible=reader({navigation:{top:300,scroll:200}});
 assert.equal(visible.nav.scrollTop,200);
 const above=reader({navigation:{top:300,scroll:600}});
 assert.equal(above.nav.scrollTop,288);
 assert.equal(above.selected.getBoundingClientRect().top,76+12);
});

test('a reader without animations schedules no perpetual frames',()=>{
 const page=reader({positions:[300,1000,1850]});
 assert.equal(page.frames.size,1,'TOC needs one initial measurement');
 page.frame();
 assert.equal(page.context.guideCurrentSection,null);
 assert.deepEqual(page.active(),[]);
 assert.equal(page.frames.size,0);
 const blank=reader();
 assert.equal(blank.frames.size,0,'a page without animations or headings stays idle');
});

test('animation frames run only while a connected scene is visible and motion is enabled',()=>{
 const page=reader({scene:true});
 assert.equal(page.frames.size,0);
 page.intersect(true);
 assert.equal(page.frames.size,1);
 page.frame();
 assert.equal(page.frames.size,1);
 page.intersect(false);
 assert.equal(page.frames.size,0);
 page.intersect(true);
 page.document.hidden=true;page.documentEvent('visibilitychange');
 assert.equal(page.frames.size,0);
 page.document.hidden=false;page.documentEvent('visibilitychange');
 assert.equal(page.frames.size,1);
 page.reduced.matches=true;page.reduced.onChange();
 assert.equal(page.frames.size,0);
 assert.equal(page.animation.dataset.frame,'99');
 page.intersect(false);
 page.reduced.matches=false;page.reduced.onChange();
 assert.equal(page.frames.size,0);
 page.intersect(true);page.frame();
 assert.equal(page.frames.size,1);
 page.animation.isConnected=false;page.frame();
 assert.equal(page.frames.size,0);
});

test('TOC follows jumps, upward scrolling and the page bottom in both directories',()=>{
 const page=reader({positions:[300,1000,1850]});
 page.frame();
 page.scrollTo(900);page.event('scroll');page.event('resize');
 assert.equal(page.frames.size,1,'scroll and resize share one pending measurement');
 page.frame();
 assert.equal(page.context.guideCurrentSection,'sec-2');
 assert.deepEqual(page.active(),['#sec-2','#sec-2']);
 page.scrollTo(1600);page.frame();
 assert.equal(page.context.guideCurrentSection,'sec-3','short final sections must become current at the bottom');
 page.scrollTo(500);page.frame();
 assert.equal(page.context.guideCurrentSection,'sec-1');
 page.scrollTo(0);page.frame();
 assert.equal(page.context.guideCurrentSection,null);
 assert.deepEqual(page.active(),[]);
 assert.equal(page.frames.size,0);
 assert.equal(page.syncs,5,'language links refresh only when the current section changes');
});

test('direct hashes and explicitly selected short final sections retain the chosen section',()=>{
 const page=reader({positions:[300,1750,1850],hash:'#sec-2',scroll:1600});
 page.frame();
 assert.equal(page.context.guideCurrentSection,'sec-2');
 page.event('resize');page.frame();
 assert.equal(page.context.guideCurrentSection,'sec-2');
 page.scrollTo(1500);page.frame();
 assert.equal(page.context.guideCurrentSection,'sec-1','manual scrolling releases the explicit target');
 page.scrollTo(1600);page.frame();
 assert.equal(page.context.guideCurrentSection,'sec-3');
 page.documentEvent('click',{target:page.links[1],button:0});page.frame();
 assert.equal(page.context.guideCurrentSection,'sec-2','clicking a section at the same final offset must still select it');
 page.context.location.hash='#sec-3';page.event('hashchange');page.frame();
 assert.equal(page.context.guideCurrentSection,'sec-3');
});

test('empty legacy anchors before a heading select that heading despite its upper margin',()=>{
 const page=reader({positions:[300,1000,1850],aliases:true,hash:'#legacy-2',scroll:860});
 page.frame();
 assert.equal(page.context.guideCurrentSection,'sec-2');
 assert.deepEqual(page.active(),['#sec-2','#sec-2']);
 page.context.location.hash='#legacy-3';page.scrollTo(1600);page.context.guideRequestTocTarget('#legacy-3');page.event('hashchange');page.frame();
 assert.equal(page.context.guideCurrentSection,'sec-3');
});

test('mobile TOC closes after selection, positions and focuses the heading, and supports dismissal',()=>{
 const page=reader({positions:[300,1000,1850]});page.frame();
 page.mobile.open=true;
 const link=page.links.find(link=>link.mobile&&link.hash==='#sec-2');
 page.documentEvent('click',{target:link,button:0});
 assert.equal(page.mobile.open,false);
 page.frame();page.frame();
 assert.equal(page.scroller.scrollTop,900);
 assert.equal(page.headings[1].focused,true);
 assert.equal(page.context.guideCurrentSection,'sec-2');
 page.mobile.open=true;
 let prevented=false;
 page.documentEvent('keydown',{key:'Escape',preventDefault(){prevented=true;}});
 assert.equal(page.mobile.open,false);assert.equal(page.summary.focused,true);assert.equal(prevented,true);
 page.mobile.open=true;page.document.dialogOpen=true;
 page.documentEvent('keydown',{key:'Escape',preventDefault(){throw Error('An open dialog owns Escape');}});
 assert.equal(page.mobile.open,true);
 page.document.dialogOpen=false;
 page.documentEvent('click',{target:{closest:()=>null}});
 assert.equal(page.mobile.open,false);
});

test('mobile TOC fits the space below its actual summary on opening, scrolling and resizing',()=>{
 const page=reader({positions:[300,1000,1850]});page.frame();
 page.mobile.open=true;page.mobile.onToggle();
 assert.equal(page.mobile.style.values['--toc-available-height'],'244px');
 assert.equal(page.scroller.scrollTop,0,'a summary with sufficient room should not move the page');
 page.scrollTo(200);page.frame();
 assert.equal(page.mobile.style.values['--toc-available-height'],'444px');
 page.context.innerHeight=500;page.event('resize');page.frame();
 assert.equal(page.mobile.style.values['--toc-available-height'],'344px');
 page.summary.documentTop=520;page.context.innerHeight=400;page.event('resize');page.frame();
 assert.equal(page.summary.getBoundingClientRect().top,72,'a smaller viewport moves an open menu into usable space');
 assert.equal(page.mobile.style.values['--toc-available-height'],'272px');
 assert.equal(page.frames.size,0,'an open menu does not require a perpetual frame loop');
});

test('opening a TOC near the viewport bottom first brings its summary to the sticky position',()=>{
 const page=reader({positions:[300,1000,1850]});page.frame();
 page.summary.documentTop=520;page.mobile.open=true;page.mobile.onToggle();
 assert.equal(page.scroller.scrollTop,448);
 assert.equal(page.summary.getBoundingClientRect().top,72);
 assert.equal(page.mobile.style.values['--toc-available-height'],'472px');
 page.frame();
 assert.equal(page.frames.size,0);
});

test('visual viewport changes resize an open TOC without scrolling the document',()=>{
 const page=reader({positions:[300,1000,1850],scroll:200,viewport:{}});page.frame();
 page.mobile.open=true;page.mobile.onToggle();
 assert.equal(page.mobile.style.values['--toc-available-height'],'444px');
 page.context.visualViewport.height=240;
 page.viewportEvent('resize');page.viewportEvent('scroll');page.viewportEvent('resize');
 assert.equal(page.frames.size,1,'visual viewport events share one measurement frame');
 page.frame();
 assert.equal(page.mobile.style.values['--toc-available-height'],'84px');
 assert.equal(page.scroller.scrollTop,200,'keyboard changes must not move the document to make room');
 page.context.visualViewport.offsetTop=80;page.viewportEvent('scroll');page.frame();
 assert.equal(page.mobile.style.values['--toc-available-height'],'164px','available height uses the visible bottom edge, including panning');
 page.context.visualViewport.height=80;page.context.visualViewport.offsetTop=0;page.viewportEvent('resize');page.frame();
 assert.equal(page.mobile.style.values['--toc-available-height'],'0px','a fully obscured menu never gets a negative height');
 page.context.visualViewport.height=600;page.viewportEvent('resize');page.frame();
 assert.equal(page.mobile.style.values['--toc-available-height'],'444px');
 assert.equal(page.scroller.scrollTop,200);
 assert.equal(page.frames.size,0);
});

test('opening a TOC fits the current visual viewport while retaining the layout fallback',()=>{
 const page=reader({positions:[300,1000,1850],viewport:{height:400}});page.frame();
 page.summary.documentTop=360;page.mobile.open=true;page.mobile.onToggle();
 assert.equal(page.summary.getBoundingClientRect().top,72);
 assert.equal(page.mobile.style.values['--toc-available-height'],'272px');
});

test('TOC uses visible reading boundaries when a keyboard or zoom changes the visual viewport',()=>{
 const page=reader({positions:[300,1000,1850],scroll:1600,viewport:{height:300}});page.frame();
 assert.equal(page.context.guideCurrentSection,'sec-2','the hidden layout-viewport bottom must not select the last section');
 page.context.visualViewport.height=600;page.viewportEvent('resize');page.frame();
 assert.equal(page.context.guideCurrentSection,'sec-3');
 page.context.visualViewport.height=300;page.viewportEvent('resize');page.frame();
 assert.equal(page.context.guideCurrentSection,'sec-2');
 page.scrollTo(700);page.frame();
 assert.equal(page.context.guideCurrentSection,'sec-1');
 page.context.guideRequestTocTarget('#sec-1');page.frame();
 page.context.visualViewport.offsetTop=220;page.viewportEvent('scroll');page.frame();
 assert.equal(page.context.guideCurrentSection,'sec-2','visual panning advances the reading line and releases an older explicit selection');
 assert.equal(page.scroller.scrollTop,700);
});

test('history restores the visible chapter instead of pinning an older hash',()=>{
 const page=reader({positions:[300,1000,1850],hash:'#sec-1',scroll:200});page.frame();
 page.scrollTo(1100);page.frame();
 assert.equal(page.context.guideCurrentSection,'sec-2');
 page.context.location.hash='#sec-3';page.context.guideRequestTocTarget('#sec-3');
 page.scrollTo(1600);page.event('hashchange');page.frame();
 assert.equal(page.context.guideCurrentSection,'sec-3');
 page.context.location.hash='#sec-1';page.scrollTo(1100);page.event('hashchange');page.frame();
 assert.equal(page.context.guideCurrentSection,'sec-2');
 assert.deepEqual(page.active(),['#sec-2','#sec-2']);
});

test('expanding article details refreshes the chapter and releases a stale bottom target',()=>{
 const page=reader({positions:[300,1000,1850],hash:'#sec-3',scroll:1600});page.frame();
 assert.equal(page.context.guideCurrentSection,'sec-3');
 page.scroller.scrollHeight+=300;page.headings[2].top+=300;
 page.documentEvent('toggle',{target:{matches:selector=>selector==='.app-main details:not(.mobile-toc)'}});
 assert.equal(page.frames.size,1);
 page.frame();
 assert.equal(page.context.guideCurrentSection,'sec-2');
 assert.deepEqual(page.active(),['#sec-2','#sec-2']);
 assert.equal(page.frames.size,0);
});
