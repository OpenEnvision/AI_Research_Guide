import {mechanism,roadmapMotion} from './guide-motion.mjs';
import {reportDirectory} from './guide-directory.mjs';
import fs from 'node:fs';
import path from 'node:path';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const loadFields=(root,edition='personal')=>{
 const dir=path.join(root,'content/guide/fieldnotes');
 const overrides=Object.fromEntries(['zh','en'].map(lang=>{
  const file=path.join(root,'content/guide/uestc',lang==='zh'?'fieldnotes.json':'fieldnotes.en.json');
  return [lang,fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):{}];
 }));
 return fs.existsSync(dir)?fs.readdirSync(dir).filter(x=>x.endsWith('.json')).sort().map(x=>{
  const field=JSON.parse(fs.readFileSync(path.join(dir,x),'utf8'));
  // Both editions share the reviewed prose, paper cards, and figures.
  return {...field,...Object.fromEntries(['zh','en'].map(lang=>[lang,{...field[lang],...overrides[lang][field.id]}]))};
 }):[];
};
const names={llm:['大语言模型','Language models'],vision:['计算机视觉','Computer vision'],generation:['生成模型','Generative models'],multimodal:['多模态学习','Multimodal learning'],agent:['智能体','Agents'],rl:['强化学习','Reinforcement learning'],'world-model':['世界模型','World models'],embodied:['具身智能','Embodied AI'],systems:['高效 AI 与系统','Efficient AI & systems'],ai4x:['跨学科 AI','Interdisciplinary AI']};
const label=(id,lang)=>names[id]?.[lang==='zh'?0:1]||id;
const figures=JSON.parse(fs.readFileSync(new URL('../content/guide/paper-figures.json',import.meta.url),'utf8'));
const figureFor=p=>{
 const fig=figures[p.id];
 if(!fig)throw Error('Missing paper figure '+p.id);
 if(!fs.existsSync(new URL('../public/blog/guide/figures/'+fig.file,import.meta.url)))throw Error('Missing figure asset '+fig.file);
 return fig;
};
export function paperCards(papers,lang,assets='../'){
 const zh=lang==='zh',t=zh?{open:'查看论文导读',original:'论文原文',code:'项目与代码',close:'关闭',question:'研究问题',idea:'核心方法',why:'入选理由',read:'阅读重点',limit:'局限与开放问题',figure:'论文原图'}:{open:'Read paper summary',original:'Original paper',code:'Project and code',close:'Close',question:'Research question',idea:'Core method',why:'Why this paper',read:'What to focus on',limit:'Limitations and open questions',figure:'Figure excerpt from the paper'};
 return `<div class="paper-grid">${papers.map((p,i)=>{const c=p[lang],fig=figureFor(p),credit=lang==='en'?(fig.creditEn||fig.credit):fig.credit;return `<div class="paper-item" data-domains="${esc((p.domains||[]).join(' '))}" data-find="${esc(p.title+' '+c.tag+' '+c.question)}"><button class="paper-card" data-paper="${esc(p.id)}" aria-label="${zh?'查看论文导读：':'Read paper summary: '}${esc(p.title)}" aria-haspopup="dialog"><span class="paper-stamp"><b>${String(i+1).padStart(2,'0')}</b><span>${p.year} · ${esc(c.tag)}</span></span><span class="paper-art"><img src="${assets}figures/${fig.file}" width="${fig.width}" height="${fig.height}" loading="lazy" alt="${esc(p.title+' · '+credit)}"></span><strong>${esc(p.title)}</strong><span class="paper-question">${esc(c.question)}</span><span class="paper-open">${t.open} <b>↗</b></span></button><dialog class="paper-dialog" id="paper-${esc(p.id)}" aria-labelledby="title-${esc(p.id)}"><div class="paper-dialog-head"><span>${p.year} · ${esc(p.venue)}</span><button data-close-paper aria-label="${t.close}">×</button></div><div class="paper-dialog-body"><h2 id="title-${esc(p.id)}">${esc(p.title)}</h2><div class="paper-links"><a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">${t.original} ↗</a>${p.code?`<a href="${esc(p.code)}" target="_blank" rel="noopener noreferrer">${t.code} ↗</a>`:''}</div>${fig?`<figure class="paper-full-figure"><a href="${assets}figures/${fig.file}" target="_blank"><img src="${assets}figures/${fig.file}" width="${fig.width}" height="${fig.height}" loading="lazy" alt="${esc(p.title+' · '+credit)}"></a><figcaption>${t.figure} · ${esc(credit)} · <a href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">${t.original}</a></figcaption></figure>`:''}${['question','idea','why','read','limit'].filter(k=>c[k]).map(k=>`<section><h3>${t[k]}</h3><p>${esc(c[k])}</p></section>`).join('')}</div></dialog></div>`}).join('')}</div>`;
}
export function fieldNotes(field,lang,intro,practice,assets='../'){
 // AI4X ships an expanded layout of its own: the markdown carries
 // <div data-ai4x-papers="id,id"> placeholders that expand into paper cards.
 if(field.id==='ai4x'&&field.expanded){return `<div class="ai4x-expanded" data-lang="${lang}">${intro+practice}</div>`.replace(/<div data-ai4x-papers="([^"]+)"><\/div>/g,(_,ids)=>paperCards(ids.split(',').map(id=>{const p=field.papers.find(p=>p.id===id);if(!p)throw Error('Unknown AI4X paper '+id);return p}),lang,assets));}
 const zh=lang==='zh',c=field[lang],heading=(id,text)=>`<h2 id="field-${id}">${text}</h2>`;
 return `<div class="fieldnotes">${intro}${c.overview.map(p=>`<p>${esc(p)}</p>`).join('')}<div class="field-problems"><strong>${c.tasksTitle?esc(c.tasksTitle):(zh?'主要任务':'Research tasks')}</strong><ul>${c.solves.map(s=>`<li>${esc(s)}</li>`).join('')}</ul></div>${c.stance?`<p class="field-stance">${esc(c.stance)}</p>`:''}${mechanism(field,lang)}${heading('roadmap',zh?'发展路线与代表工作':'Research milestones')}${roadmapMotion(field,lang,assets)}<ol class="field-roadmap">${c.roadmap.map(s=>`<li><span class="road-year">${esc(s.year)}</span><div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p><div class="road-papers">${s.papers.map(id=>{const p=field.papers.find(p=>p.id===id);if(!p)throw Error('Unknown roadmap paper '+id);return `<a href="#paper-${esc(id)}">${esc(p[lang].tag)} ↗</a>`}).join('')}${(s.links||[]).map(l=>`<a href="${esc(l.url)}"${l.url.startsWith('https:')?' target="_blank" rel="noopener noreferrer"':''}>${esc(l.title)} ↗</a>`).join('')}</div></div></li>`).join('')}</ol>${heading('terms',zh?'关键概念':'Key concepts')}<dl class="field-terms">${c.terms.map(t=>`<div><dt>${esc(t.term)}</dt><dd>${esc(t.text)}</dd></div>`).join('')}</dl><a id="field-practice"></a>${practice}${field.id==='llm'?reportDirectory(lang,assets,c.reportIntro):''}${heading('papers',zh?'代表论文':'Representative papers')}${c.paperIntro?`<p>${esc(c.paperIntro)}</p>`:''}${paperCards(field.papers,lang,assets)}${c.checklist.length?`${heading('checklist',zh?'入门练习':'Getting started')}<div class="field-checklist">${c.checklist.map((s,i)=>`<label><input type="checkbox" data-check="${field.id}-${i}"><span>${esc(s)}</span></label>`).join('')}</div>`:'<a id="field-checklist"></a>'}${c.followup===false?'':`<p class="field-followup"><a href="ama.html">${zh?'提问与反馈':'Ask a question about the guide'} ↗</a></p>`}</div>`;
}
export function paperLibrary(fields,lang,assets='../',{compact=false}={}){
 const zh=lang==='zh',byId=new Map();for(const f of fields)for(const p of f.papers){if(byId.has(p.id)){byId.get(p.id).domains.push(f.id)}else byId.set(p.id,{...p,domains:[f.id]})}
 const papers=[...byId.values()].sort((a,b)=>a.year-b.year);
 return `<section class="paper-library"><h2 id="paper-library">${zh?(compact?'经典与代表论文':'代表论文导读'):'Representative papers'}</h2>${compact?'':`<p>${zh?'按研究方向检索代表论文，了解研究问题、核心思路与验证方法。每篇导读附有阅读建议和论文原文链接。':'Explore representative papers by research field, with guidance on research questions, core ideas, and evaluation methods. Each summary includes reading suggestions and a link to the original paper.'}</p>`}<div class="paper-filters"><label>${zh?'方向':'Field'}<select id="paper-domain" aria-label="${zh?'方向':'Field'}"><option value="">${zh?'所有方向':'All fields'}</option>${fields.map(f=>`<option value="${f.id}">${esc(label(f.id,lang))}</option>`).join('')}</select></label><label>${zh?'检索论文':'Search papers'}<input id="paper-query" aria-label="${zh?'检索论文':'Search papers'}" type="search" placeholder="ReAct / diffusion / attention"></label></div><p id="paper-count" aria-live="polite">${papers.length} ${zh?'篇代表论文':'papers'}</p>${paperCards(papers,lang,assets)}</section>`;
}
