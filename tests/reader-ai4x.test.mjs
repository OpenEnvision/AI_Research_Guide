import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source=fs.readFileSync(new URL('../public/blog/guide/ai4x/motion-player.js',import.meta.url),'utf8');

function player({headingTabindex,reduce=true}={}){
 let activeElement=null;
 class Element{
  constructor(id=''){this.id=id;this.dataset={};this.attrs={};this.children=[];this.listeners=new Map();this.clientWidth=320;this.isConnected=true;this.classList={toggle(){}};}
  setAttribute(name,value){this.attrs[name]=String(value);}
  hasAttribute(name){return Object.hasOwn(this.attrs,name);}
  removeAttribute(name){delete this.attrs[name];}
  addEventListener(name,fn){this.listeners.set(name,fn);}
  focus(options){activeElement?.listeners.get('blur')?.();activeElement=this;this.focusOptions=options;}
  scrollIntoView(options){this.scrollOptions=options;}
  querySelectorAll(){return this.children;}
  set innerHTML(html){
   if(this.id==='scene-host'){this.children=[canvas];this.firstElementChild=canvas;return;}
   this.children=[...html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)].map(([,attrs,text])=>{
    const button=new Element();button.textContent=text;
    for(const [,key,value] of attrs.matchAll(/([\w-]+)="([^"]*)"/g)){if(key.startsWith('data-'))button.dataset[key.slice(5)]=value;else button.attrs[key]=value;}
    return button;
   });
  }
 }
 const context2d=new Proxy({fillText(){},createLinearGradient(){return {addColorStop(){}};}},{get:(target,key)=>target[key]||(()=>{})});
 const canvas=new Element();canvas.getContext=()=>context2d;
 const nodes=new Map(['scene-host','process','ai4x-process','topic-select','scene-groups','scene-tabs','process-labels','read-topic','motion-toggle'].map(id=>[id,new Element(id)]));
 if(headingTabindex!==undefined)nodes.get('ai4x-process').setAttribute('tabindex',headingTabindex);
 const expanded=new Element();expanded.dataset.lang='zh';const progress={style:{}};
 const topics=['molecule','finance'].map(id=>{const element=new Element();element.dataset={topic:id,group:'Group',short:id};return element;});
 const button=new Element();button.dataset.scene='finance';
 const document={body:{dataset:{}},hidden:false,addEventListener(){},removeEventListener(){},querySelector(selector){
  if(selector==='.ai4x-expanded')return expanded;
  if(selector==='.ai4x-expanded #scene-host')return nodes.get('scene-host');
  if(selector==='.scene-progress i')return progress;
  if(selector==='#scene-tabs [aria-selected="true"]')return nodes.get('scene-tabs').children.find(el=>el.attrs['aria-selected']==='true');
  return nodes.get(selector.slice(1));
 },querySelectorAll:selector=>selector==='[data-scene]'?[button]:topics};
 const location=new URL('https://guide.test/zh/ai4x.html?scene=molecule#finance');
 const state={guideReadingEntry:'reading-entry',otherFeature:{value:42}};
 const history={state,replaceState(next,unused,url){this.state=next;location.href=url.href;}};
 const requested=[];
 const context=vm.createContext({document,location,history,URL,URLSearchParams,devicePixelRatio:1,matchMedia:()=>({matches:reduce,addEventListener(){},removeEventListener(){}}),requestAnimationFrame:()=>1,cancelAnimationFrame(){},ResizeObserver:class{observe(){}disconnect(){}},IntersectionObserver:class{observe(){}disconnect(){}}});
 context.window=context;context.AI4X_KIT={clamp:x=>x};context.AI4X_MOTION=Object.fromEntries(topics.map(topic=>[topic.dataset.topic,{steps:['one','two','three','four'],draw(){}}]));
 context.guideRequestTocTarget=hash=>requested.push(hash);
 vm.runInContext(source,context,{filename:'motion-player.js'});
 return {nodes,button,history,state,location,context,requested,focus:()=>activeElement};
}

test('returning from an AI4X article focuses the process heading and preserves reading history state',()=>{
 const {nodes,button,history,state,location,context,requested,focus}=player();
 assert.equal(history.state,state,'initial scene selection must preserve existing history fields');
 button.focus();button.onclick();
 const heading=nodes.get('ai4x-process');
 assert.equal(context.ai4xMotion.state.id,'finance');
 assert.equal(location.searchParams.get('scene'),'finance');
 assert.equal(history.state,state,'changing the scene must retain its reading entry identifier');
 assert.equal(focus(),heading);
 assert.equal(heading.attrs.tabindex,'-1');
 assert.equal(heading.focusOptions.preventScroll,true);
 assert.equal(heading.scrollOptions.block,'start');
 assert.equal(heading.scrollOptions.behavior,'instant');
 assert.equal(nodes.get('process').scrollOptions,undefined,'scrolling the surrounding section would double the header offset');
 assert.deepEqual(requested,['#ai4x-process']);
 nodes.get('motion-toggle').focus();
 assert.equal(heading.hasAttribute('tabindex'),false);
});

test('return navigation respects animation preference and existing heading focus attributes',()=>{
 const {nodes,button}=player({headingTabindex:'0',reduce:false});
 button.onclick();
 const heading=nodes.get('ai4x-process');
 assert.equal(heading.scrollOptions.behavior,'smooth');
 nodes.get('motion-toggle').focus();
 assert.equal(heading.attrs.tabindex,'0');
});
