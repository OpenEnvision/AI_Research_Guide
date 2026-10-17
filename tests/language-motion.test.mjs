// Canvas labels are drawn at runtime, so inspecting generated HTML cannot find
// untranslated labels that appear only during a later animation phase.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const base=new URL('../public/blog/guide/ai4x/',import.meta.url);
const cjk=/[\u3400-\u9fff]/u;
const samples=Array.from({length:32},(_,i)=>i/31*.9999);

function fakeContext(onText=()=>{}){
 const state={globalAlpha:1},stack=[];
 const methods={
  save(){stack.push({...state});},
  restore(){const previous=stack.pop();if(previous){for(const key of Object.keys(state))delete state[key];Object.assign(state,previous);}},
  fillText(value,x,y){assert.ok(Number.isFinite(x)&&Number.isFinite(y),'Canvas label coordinates must be finite');onText(String(value));},
  measureText(value){return {width:String(value).length*10};},
  createLinearGradient(){return {addColorStop(){}};},
  createRadialGradient(){return {addColorStop(){}};},
  createImageData(width,height){return {width,height,data:new Uint8ClampedArray(width*height*4)};}
 };
 for(const method of ['arc','beginPath','bezierCurveTo','clearRect','clip','closePath','drawImage','ellipse','fill','fillRect','lineTo','moveTo','putImageData','quadraticCurveTo','rect','rotate','roundRect','scale','setLineDash','setTransform','stroke','strokeRect','transform','translate'])methods[method]=()=>{};
 return new Proxy(state,{get(target,key){return key in methods?methods[key]:target[key];},set(target,key,value){target[key]=value;return true;}});
}

const context=vm.createContext({
 console,
 document:{createElement(tag){assert.equal(tag,'canvas');return {width:0,height:0,getContext(kind){assert.equal(kind,'2d');return fakeContext();}};}}
});
context.window=context;
for(const name of ['motion-core','motion-physical','motion-bio','motion-research','motion-en']){
 vm.runInContext(fs.readFileSync(new URL(name+'.js',base),'utf8'),context,{filename:name+'.js'});
}
const registry=context.AI4X_MOTION,translations=context.AI4X_EN;

test('the scientific animation registry contains every published scene',()=>{
 assert.deepEqual(Object.keys(registry).sort(),['automl','cell','eeg','finance','genome','graphs','image','math','molecule','physics','protein','research','rsi']);
});

for(const [id,scene] of Object.entries(registry))test(`${id}: all phases render with translated English steps and canvas labels`,()=>{
 assert.equal(scene.steps.length,4,`${id}: expected four process steps`);
 const labels=new Set(scene.steps),ctx=fakeContext(value=>labels.add(value));
 for(const progress of samples)assert.doesNotThrow(()=>scene.draw(ctx,progress,context.AI4X_KIT),`${id} at ${progress.toFixed(4)}`);
 const chineseLabels=[...labels].filter(value=>cjk.test(value));
 assert.ok(chineseLabels.length>=4,`${id}: the exercise must capture the scene's Chinese source labels`);
 for(const original of chineseLabels){
  assert.ok(Object.hasOwn(translations,original),`${id}: missing English translation for “${original}”`);
  assert.equal(typeof translations[original],'string',`${id}: invalid translation for “${original}”`);
  assert.ok(translations[original].trim(),`${id}: empty translation for “${original}”`);
  assert.doesNotMatch(translations[original],cjk,`${id}: Chinese fallback for “${original}”`);
 }
 // Apply the same fillText translation boundary as motion-player.js, including
 // labels rendered directly by individual scenes rather than kit.text().
 const englishLabels=new Set(),englishCtx=fakeContext(value=>englishLabels.add(translations[value]||value));
 for(const progress of samples)assert.doesNotThrow(()=>scene.draw(englishCtx,progress,context.AI4X_KIT),`${id}: English draw at ${progress.toFixed(4)}`);
 assert.ok(englishLabels.size>0,`${id}: no runtime canvas labels captured`);
 for(const label of englishLabels)assert.doesNotMatch(label,cjk,`${id}: untranslated English canvas label “${label}”`);
});
