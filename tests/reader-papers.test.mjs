import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source=fs.readFileSync(new URL('../public/blog/guide/fieldnotes.js',import.meta.url),'utf8');

function reader({lang='en',domain='',query='',hash='',library=true}={}){
 const location=new URL('https://guide.test/blog/guide/en/papers.html'+hash);
 const listeners=new Map(),events=[],timers=[],replacements=[];
 let document;
 class Element{
  constructor(id='',classes=[]){
   this.id=id;this.classes=new Set(classes);this.children=[];this.listeners=new Map();this.dataset={};this.hidden=false;this.open=false;this.isConnected=true;this.value='';this.top=150;
   this.classList={contains:name=>this.classes.has(name),add:name=>this.classes.add(name),remove:name=>this.classes.delete(name)};
  }
  append(child){if(child.parent)child.parent.children=child.parent.children.filter(item=>item!==child);child.parent=this;this.children.push(child);}
  matches(selector){return selector==='.paper-dialog'?this.classes.has('paper-dialog'):false;}
  closest(selector){
   for(let el=this;el;el=el.parent){
    if(selector==='.paper-library'&&el.classes.has('paper-library'))return el;
    if(selector==='[hidden], [inert], dialog:not([open])'&&(el.hidden||el.inert||(el.classes.has('paper-dialog')&&!el.open)||(el.id==='searchdialog'&&!el.open)))return el;
   }
   return null;
  }
  contains(other){return other===this||this.children.some(child=>child.contains(other));}
  getClientRects(){return this.closest('[hidden], [inert], dialog:not([open])')?[]:[{}];}
  getBoundingClientRect(){return {top:this.top,bottom:this.top+40,left:10,right:300};}
  querySelector(selector){return selector==='[data-close-paper]'?this.children.find(child=>child.closeButton):null;}
  addEventListener(name,fn){this.listeners.set(name,[...(this.listeners.get(name)||[]),fn]);}
  emit(name,event={}){for(const fn of this.listeners.get(name)||[])fn({target:this,preventDefault(){},...event});}
  focus(options){if(!this.getClientRects().length)return;document.activeElement=this;this.focusOptions=options;}
  showModal(){this.returnFocus=document.activeElement;this.open=true;this.querySelector('[data-close-paper]')?.focus();}
  close(){if(!this.open)return;this.open=false;this.returnFocus?.focus({preventScroll:true});events.push(()=>this.emit('close'));}
 }
 const body=new Element('body'),container=new Element('library',library?['paper-library']:[]),grid=new Element('grid');body.dataset.lang=lang;body.append(container);container.append(grid);
 const domainInput=new Element('paper-domain'),queryInput=new Element('paper-query'),count=new Element('paper-count'),mobileSearch=new Element('mobile-search'),desktopSearch=new Element('opensearch'),menu=new Element('menu');
 domainInput.value=domain;queryInput.value=query;desktopSearch.hidden=true;
 [domainInput,queryInput,count,mobileSearch,desktopSearch,menu].forEach(el=>body.append(el));
 const entries=[['transformer','llm','Attention Is All You Need'],['resnet','vision','Deep Residual Learning'],['bert','llm','BERT Pretraining']].map(([id,domains,find])=>{
  const item=new Element('', ['paper-item']),card=new Element('card-'+id),dialog=new Element('paper-'+id,['paper-dialog']),close=new Element('close-'+id);
  item.dataset={domains,find};card.dataset.paper=id;close.closeButton=true;grid.append(item);item.append(card);item.append(dialog);dialog.append(close);
  return {id,item,card,dialog,close};
 });
 const nodes=[body,container,grid,domainInput,queryInput,count,mobileSearch,desktopSearch,menu,...entries.flatMap(entry=>[entry.item,entry.card,entry.dialog,entry.close])];
 document={body,activeElement:body,getElementById:id=>nodes.find(node=>node.id===id)||null,querySelectorAll(selector){
  if(selector==='.paper-dialog')return entries.map(entry=>entry.dialog);
  if(selector==='[data-paper]')return entries.map(entry=>entry.card);
  if(selector==='.paper-library .paper-item')return library?entries.map(entry=>entry.item):[];
  return [];
 }};
 const history={state:{guideReadingEntry:'reader-1',otherFeature:'kept'},replaceState(state,title,url){this.state=state;location.href=new URL(url,location).href;replacements.push({state,url});}};
 const context={document,history,location,innerHeight:844,matchMedia:()=>({matches:true}),setTimeout:fn=>timers.push(fn),addEventListener:(type,fn)=>listeners.set(type,[...(listeners.get(type)||[]),fn]),guideSyncLanguage(){}};
 context.window=context;vm.runInNewContext(source,context,{filename:'fieldnotes.js'});
 return {context,document,history,location,entries,container,domainInput,queryInput,count,mobileSearch,desktopSearch,menu,replacements,Element,
  flush(){while(events.length)events.shift()();},
  hash(value){location.hash=value;for(const fn of listeners.get('hashchange')||[])fn();}
 };
}

test('a paper URL opens a readable modal even when its card is excluded by an active filter',()=>{
 const page=reader({domain:'vision',hash:'#paper-transformer'}),entry=page.entries[0];
 assert.equal(entry.item.hidden,true,'the selected filter remains applied to the card');
 assert.equal(page.domainInput.value,'vision');
 assert.equal(page.count.textContent,'1 paper');
 assert.equal(entry.dialog.parent,page.container,'the dialog must be outside the filtered card');
 assert.equal(entry.dialog.open,true);
 assert.equal(entry.dialog.getClientRects().length,1);
 entry.close.emit('click');page.flush();
 assert.equal(page.document.activeElement,page.mobileSearch);
 assert.equal(page.mobileSearch.focusOptions.preventScroll,true);
});

test('search can open a filtered paper and closing it does not focus a closed search dialog',()=>{
 const page=reader({domain:'vision'}),entry=page.entries[0];
 const searchDialog=new page.Element('searchdialog'),result=new page.Element('result');searchDialog.append(result);page.document.body.append(searchDialog);page.document.activeElement=result;
 page.hash('#paper-transformer');
 assert.equal(entry.dialog.open,true);assert.equal(entry.dialog.getClientRects().length,1);
 entry.close.emit('click');page.flush();
 assert.equal(page.document.activeElement,page.mobileSearch);
 assert.equal(page.mobileSearch.focusOptions.preventScroll,true);
 assert.equal(page.domainInput.value,'vision');assert.equal(page.count.textContent,'1 paper');
});

test('card activation restores its explicit opener without changing reading history metadata',()=>{
 const page=reader(),entry=page.entries[1],state=page.history.state;
 // Touch activation need not make a Safari button the activeElement first.
 assert.equal(page.document.activeElement,page.document.body);
 entry.card.emit('click');
 assert.equal(entry.dialog.open,true);assert.equal(page.location.hash,'#paper-resnet');
 entry.close.emit('click');page.flush();
 assert.equal(page.document.activeElement,entry.card);
 assert.equal(entry.card.focusOptions.preventScroll,true);
 assert.equal(page.history.state,state);
 assert.equal(page.location.hash,'');
 assert.equal(page.replacements.length,2);
});

test('switching papers retains the original opener and a delayed close cannot steal the new modal focus',()=>{
 const page=reader(),first=page.entries[0],second=page.entries[1];
 first.card.emit('click');page.hash('#paper-resnet');page.flush();
 assert.equal(first.dialog.open,false);assert.equal(second.dialog.open,true);
 assert.equal(page.document.activeElement,second.close);
 second.close.emit('click');page.flush();
 assert.equal(page.document.activeElement,first.card);
});

test('paper filtering accepts pasted whitespace and full-width text, and keeps Chinese counts',()=>{
 const page=reader({lang:'zh'});
 page.queryInput.value=' Ａｔｔｅｎｔｉｏｎ Ｉｓ Ａｌｌ Ｙｏｕ Ｎｅｅｄ ';page.queryInput.emit('input');
 assert.equal(page.count.textContent,'1 篇论文');
 assert.equal(page.entries[0].item.hidden,false);
 assert.equal(page.entries[1].item.hidden,true);
 page.queryInput.value='   ';page.queryInput.emit('input');assert.equal(page.count.textContent,'3 篇论文');
 page.domainInput.value='vision';page.domainInput.emit('change');assert.equal(page.count.textContent,'1 篇论文');
});

test('direction-page modals keep their structure and non-modal paper-library anchors are harmless',()=>{
 const page=reader({library:false}),entry=page.entries[0],parent=entry.dialog.parent;
 page.hash('#paper-library');assert.equal(entry.dialog.open,false);
 entry.card.emit('click');assert.equal(entry.dialog.parent,parent);assert.equal(entry.dialog.open,true);
 entry.close.emit('click');page.flush();assert.equal(page.document.activeElement,entry.card);
});
