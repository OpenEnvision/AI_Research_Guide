// Shared reading shell. Navigation links remain direct siblings of .navgroup:
// guide-motion.js uses that relationship when revealing the current section.
import { STRINGS, escape, filename, plain } from './guide-model.mjs';
import { languageSwitch } from './guide-language.mjs';
import { renderGuideExplorer, guideExplorerAnchors } from './guide-explorers.mjs';

export const ASSETS='../../';
export const SKIN=ASSETS+'guide-uestc.css?v=20261016-foundations';

const TITLES={
 home:['指南概览','Guide overview'], 'learning-path':['学习路线','Learning path'],
 basics:['基础知识','Foundations'], courses:['课程与公开课','Courses & MOOCs'],
 practice:['练习与竞赛','Practice & competitions'], start:['入门项目','Starter projects'],
 directions:['研究方向地图','Research map'], llm:['大语言模型','Language models'],
 agent:['智能体','Agents'], vision:['计算机视觉','Computer vision'],
 multimodal:['多模态学习','Multimodal learning'], generation:['生成模型','Generative models'],
 rl:['强化学习','Reinforcement learning'], 'world-model':['世界模型','World models'],
 embodied:['具身智能','Embodied AI'], systems:['高效 AI 与系统','Efficient AI & systems'],
 ai4x:['跨学科 AI','Interdisciplinary AI'], 'advanced-topics':['进阶专题','Specialized topics'],
 research:['科研入门问答','Research Q&A'], reading:['文献检索与阅读','Literature search & reading'],
 'research-methods':['实验设计与复现','Experimental design'], datasets:['数据与评测','Datasets & evaluation'],
 engineering:['研究工程','Research engineering'], 'responsible-ai':['负责任 AI','Responsible AI'],
 'irene-workflow':['阅读与笔记工作流','Reading & notes'], writing:['写作与汇报','Writing & communication'],
 contact:['学术联系与合作','Academic collaboration'], ai:['AI 研究工具','AI research tools'],
 resources:['资源库','Resource library'], papers:['论文选读','Selected papers'],
 'catalog-foundation':['课程与教材','Courses & textbooks'], 'catalog-research':['科研方法与工具','Methods & tools'],
 'catalog-directions':['专题资源','Resources by field'], 'catalog-channels':['信息渠道','Research updates'],
 blogs:['技术博客','Technical blogs'], lesswrong:['研究判断与反思','Research judgment'],
 limu:['深度学习精读','Deep learning walkthroughs'], labs:['实验室与团队','Labs & research groups'],
 lookout:['研究动态与社区','Research communities'], 'research-conversations':['研究者访谈与经验','Research conversations'],
 ama:['提问与贡献','Questions & contributions'], about:['关于指南','About this guide'],
 welcome:['学习与研究的起点','Starting your research journey'], experience:['经验与反思','Experiences & reflections'],
 life:['学习之外的生活','Life alongside research']
};
const SECTIONS=[
 {id:'learning',label:['系统学习','Learning'],pages:['home','learning-path','basics','courses','practice','start']},
 {id:'areas',label:['研究方向','Research areas'],pages:['directions','llm','agent','vision','multimodal','generation','rl','world-model','embodied','systems','ai4x','advanced-topics']},
 {id:'practice',label:['科研实践','Research practice'],pages:['research','reading','research-methods','datasets','engineering','responsible-ai','irene-workflow','writing','contact','ai']},
 {id:'resources',label:['资源库','Resources'],pages:['resources','papers','catalog-foundation','catalog-research','catalog-directions','catalog-channels','blogs','lesswrong','limu','labs']},
 {id:'community',label:['研究社区','Research community'],pages:['lookout','research-conversations','ama']},
 {id:'about',label:['关于指南','About'],pages:['about']},
 {id:'perspectives',label:['社区经验与视角','Community perspectives'],pages:['welcome','experience','life'],collapsed:true}
];
const navTitle=(p,lang)=>TITLES[p.id]?.[lang==='zh'?0:1]||p.navTitle?.[lang]||p.title;
const sectionFor=id=>SECTIONS.find(section=>section.pages.includes(id));
const searchIcon='<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.75" cy="10.75" r="6.75"></circle><path d="m16 16 4.5 4.5"></path></svg>';
const menuIcon='<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>';

function navigation(pages,p,lang,assets){
 const i=lang==='zh'?0:1,byId=new Map(pages.map(page=>[page.id,page]));
 return SECTIONS.map(section=>{
  const members=section.pages.map(id=>byId.get(id)).filter(Boolean);
  if(!members.length)return '';
  const collapsed=Boolean(section.collapsed&&!members.some(page=>page.id===p.id));
  const heading=`<div class="navgroup${section.collapsed?' perspectives-group':''}" role="button" tabindex="0" aria-expanded="${!collapsed}">${escape(section.label[i])}</div>`;
  const links=members.map(page=>`<a data-page="${page.id}" href="${filename(page.id)}"${page.id===p.id?' aria-current="page"':''}${collapsed?' class="nav-collapsed" inert':''}>${escape(navTitle(page,lang))}</a>`+(page.id==='basics'?`<a href="${assets}wiki/${i===0?'index':'en'}.html">${i===0?'术语与会议速查':'Terminology reference'}</a>`:'')).join('');
  return heading+links;
 }).join('');
}

function readingMinutes(html){
 const text=html.replace(/<[^>]*>/g,' ').replace(/&[a-z0-9#]+;/gi,' ');
 const cjk=(text.match(/[\u3400-\u9fff]/g)||[]).length;
 const words=(text.replace(/[\u3400-\u9fff]/g,' ').match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu)||[]).length;
 return Math.max(1,Math.ceil(cjk/400+words/220));
}

function descriptionFor(html){
 const text=plain(html),limit=160;
 if(text.length<=limit)return text;
 const excerpt=text.slice(0,limit);
 const sentence=excerpt.match(/^([\s\S]*[.!?。！？])(?:\s|$)/)?.[1];
 if(sentence&&sentence.length>=70)return sentence;
 return (/[A-Za-z0-9]$/.test(excerpt)?excerpt.replace(/\s+\S*$/,''):excerpt).trimEnd()+'…';
}

export function pageShell({p,pages,index,lang,alternatePage,assets=ASSETS,skin=SKIN}){
 const t=STRINGS[lang],zh=lang==='zh';
 const section=sectionFor(p.id),sectionLabel=section?.label[zh?0:1]||(zh?'指南':'Guide');
 // Presentation pages always live above the language folder; media may be
 // shared from a different depth in the nested compact edition.
 const website=zh?'../zh.html':'../index.html';
 // Sequential sec-N headings and resource-N entries are generated separately.
 // Only semantic IDs verified in both articles are safe to carry across.
 const alternateIds=new Set([...(alternatePage?.html||'').matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
 const sharedAnchors=[...p.html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]).filter(id=>!/^(?:sec|resource)-\d+$/.test(id)&&alternateIds.has(id));
 sharedAnchors.push(...guideExplorerAnchors(p.id));
 const languages=languageSwitch({lang,enHref:'../en/'+filename(p.id),zhHref:'../zh/'+filename(p.id),alternateId:'language',sharedAnchors});
 const byId=new Map(pages.map(page=>[page.id,page]));
 const orderedIds=SECTIONS.flatMap(section=>section.pages);
 const readingOrder=[...orderedIds.map(id=>byId.get(id)).filter(Boolean),...pages.filter(page=>!orderedIds.includes(page.id))];
 const position=readingOrder.findIndex(page=>page.id===p.id);
 const neighbors=[readingOrder[position-1],readingOrder[position+1]].map((page,i)=>page?`<a href="${filename(page.id)}"><small>${i?t.next:t.prev} ${i?'→':'←'}</small><span>${escape(navTitle(page,lang))}</span></a>`:'<span></span>').join('');
 const clean=p.html.replace(/<img class="home-logo"[^>]*>\s*/g,'');
 const head=clean.match(/^\s*<h1>([\s\S]*?)<\/h1>([\s\S]*)$/);
 const title=head?head[1]:escape(p.title);
 let body=head?head[2]:clean;
 const lead=body.match(/^\s*<p>([\s\S]*?)<\/p>/);
 if(lead)body=body.slice(lead[0].length);
 const minutes=readingMinutes(body+(lead?.[1]||''));
 const updated=/^\d{4}-\d{2}-\d{2}$/.test(p.updated||'')?`<span>${zh?'修订于':'Revised'} <time datetime="${p.updated}">${p.updated}</time></span>`:'';
 const explorer=renderGuideExplorer({id:p.id,lang});
 const explorerLead=p.id==='learning-path'?(zh?'看清知识之间的依赖，从当前能力出发，找到可以动手验证的下一步。':'Connect the foundations, choose a starting point, and turn understanding into work you can check.'):p.id==='directions'?(zh?'从核心问题出发，连接十个研究方向、先修知识与代表论文。':'Explore ten research areas through their questions, prerequisites, and representative papers.') : '';
 if(explorer&&lead)body=lead[0]+body;
 const explorerHeading=p.id==='learning-path'?{id:'learning-explorer',title:zh?'知识依赖图':'Learning map'}:{id:'research-explorer',title:zh?'探索研究方向':'Explore research areas'};
 const tocLinks=(explorer?[explorerHeading,...p.headings]:p.headings).map(heading=>`<a href="#${heading.id}">${escape(heading.title)}</a>`).join('');
 const mobileToc=p.headings.length?`<details class="mobile-toc"><summary>${t.onpage}<span aria-hidden="true">⌄</span></summary><nav aria-label="${t.onpage}">${tocLinks}</nav></details>`:'';
 return `<!doctype html>
<html lang="${zh?'zh-CN':'en'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${escape(p.title)} · OpenEnvision</title><meta name="description" content="${escape(descriptionFor(lead?.[1]||body))}"><link rel="icon" href="${assets}favicon-openenvision.png"><link rel="alternate" hreflang="zh-CN" href="../zh/${filename(p.id)}"><link rel="alternate" hreflang="en" href="../en/${filename(p.id)}"><link rel="stylesheet" href="${assets}guide.css"><link rel="stylesheet" href="${assets}fieldnotes.css"><link rel="stylesheet" href="${assets}guide-motion.css?v=20261016-openenvision"><link rel="stylesheet" href="${skin}">${p.id==='ai4x'?`<link rel="stylesheet" href="${assets}ai4x/expanded.css">`:''}<link rel="stylesheet" href="${assets}guide-academic.css?v=20261016-guide-mobile-navigation"><link rel="stylesheet" href="${assets}guide-controls.css?v=20261016-controls">${explorer?`<link rel="stylesheet" href="${assets}guide-explorers.css?v=20261017-maps">`:""}<link rel="stylesheet" href="${assets}language-switch.css?v=20261016-formal"></head>
<body class="guide-reader" data-lang="${lang}" data-page="${p.id}">
<a class="skip" href="#content">${t.skip}</a>
<header class="app-topbar">
<div class="topbar-brand"><button id="menu" class="icon-button mobile-menu" type="button" aria-controls="nav" aria-expanded="false" aria-label="${t.menu}">${menuIcon}</button><a class="reader-brand" href="${website}" aria-label="OpenEnvision · ${zh?'网站主页':'Website home'}"><span class="reader-brand-mark"><img src="${assets}logo-openenvision.png" alt="OpenEnvision" width="72" height="72"></span><strong>OpenEnvision</strong></a></div>
<nav class="topbar-context" aria-label="${zh?'当前位置':'Breadcrumb'}"><a href="index.html">${zh?'指南':'Guide'}</a><span aria-hidden="true">/</span><span>${escape(navTitle(p,lang))}</span></nav>
<div class="topbar-actions"><a class="website-link" href="${website}">${zh?'网站主页':'Website'} <span aria-hidden="true">↗</span></a>${languages}<a class="github-link" href="https://github.com/OpenEnvision/ai_research_guide" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a><button id="mobile-search" class="icon-button" type="button" aria-label="${t.label}">${searchIcon}</button><button id="theme" class="icon-button" aria-label="${t.theme}" hidden>◐</button></div>
</header>
<div class="app-shell">
<button class="sidebar-scrim" id="shade" type="button" aria-label="${t.close}" hidden></button>
<aside id="nav" class="app-sidebar" aria-label="${t.menu}"><div class="sidebar-heading">${zh?'AI 学习与科研指南':'AI Learning & Research Guide'}</div><button id="opensearch" class="search-field" type="button" aria-haspopup="dialog" aria-controls="searchdialog" aria-label="${t.label}"><span>${searchIcon}${zh?'搜索指南':'Search guide'}</span><kbd data-search-shortcut>Ctrl K</kbd></button>${navigation(pages,p,lang,assets)}<div class="sidebar-source"><a href="https://github.com/OpenEnvision/ai_research_guide" target="_blank" rel="noopener noreferrer">${zh?'在 GitHub 参与贡献':'Contribute on GitHub'} <span aria-hidden="true">↗</span></a></div></aside>
<div class="app-main">
<main class="app-content" id="content" tabindex="-1"><div class="article-layout">
<article class="markdown-body"><header class="page-title-band"><nav class="article-breadcrumb" aria-label="${zh?'文章分类':'Article location'}"><a href="index.html">${zh?'指南':'Guide'}</a><span aria-hidden="true">/</span><span>${escape(sectionLabel)}</span></nav><h1>${title}</h1>${lead?`<p class="article-lead">${explorerLead||lead[1]}</p>`:''}<div class="article-meta"><span>${zh?`预计阅读 ${minutes} 分钟`:`Estimated ${minutes} min read`}</span>${updated}</div></header>${mobileToc}${explorer}<div class="article-body">${body}</div><nav class="neighbors" aria-label="${zh?'前后文章':'Adjacent articles'}">${neighbors}</nav></article>
<aside id="toc" aria-label="${t.onpage}"><strong>${t.onpage}</strong>${tocLinks}</aside>
</div></main>
<footer class="app-footer"><span>OpenEnvision · ${escape(t.brand)}</span><span><a href="https://github.com/OpenEnvision/ai_research_guide/edit/main/${p.sourcePath}" target="_blank" rel="noopener noreferrer">${t.source}</a><a href="${zh?'../zh.html':website}">${zh?'网站主页':'Website home'} <span aria-hidden="true">↗</span></a></span></footer>
</div></div>
<dialog id="searchdialog" data-search-src="../search-data.${lang}.json" aria-label="${t.label}"><div class="searchhead">${searchIcon}<input id="searchinput" type="search" placeholder="${t.placeholder}" aria-label="${t.label}" autocomplete="off"><button id="closesearch" type="button">${t.close}<kbd>Esc</kbd></button></div><div id="results" aria-live="polite"></div></dialog>
<script>window.guideUI=${JSON.stringify(t)};</script><script src="${assets}guide.js?v=20261017-global-guide"></script><script src="${assets}fieldnotes.js?v=20261016-guide-mobile-navigation"></script><script src="${assets}guide-motion.js?v=20261017-navigation"></script>${explorer?`<script src="${assets}guide-explorers.js?v=20261017-maps"></script>`:""}${p.id==='ai4x'?['motion-core','motion-physical','motion-bio','motion-research','motion-en','motion-player'].map(script=>`<script src="${assets}ai4x/${script}.js${script==='motion-player'?'?v=20261016-guide-mobile-navigation':['motion-en','motion-bio','motion-research'].includes(script)?'?v=20261017-bilingual-polish':''}"></script>`).join(''):''}</body></html>`;
}

