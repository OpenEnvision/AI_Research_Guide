// Small, progressively enhanced maps. All summaries and links are readable
// without JavaScript; the client adds selection and keyboard navigation.
import { escape } from './guide-model.mjs';

const LEARNING = [
 {id:'programming',anchor:'route-programming',mark:'01 A',icon:'code',
  zh:{title:'编程',hint:'跟踪数据的处理过程',question:'从输入追踪到输出',audience:'正在学习阅读和修改简短程序。',focus:'Python 函数、数组、形状与索引；按需要学习终端与 Git。',outcome:'解释数据与标签怎样对应，修改一个小程序，并定位一次输入处理中的错误。'},
  en:{title:'Programming',hint:'Follow the data',question:'Trace one input to its result',audience:'You are learning to read and modify short programs.',focus:'Python functions, arrays, shapes, and indexing; terminal and Git as needed.',outcome:'Explain how data and labels align, modify a small program, and trace an input to find a bug.'},
  links:[['basics.html#basics-arrays','数组与形状','Arrays & shapes'],['practice.html','编程练习','Programming practice']]},
 {id:'math',anchor:'route-math',mark:'01 B',icon:'math',
  zh:{title:'数学',hint:'理解运算的含义',question:'让每个符号对应一个问题',audience:'能够理解代码，但对矩阵、导数或概率的含义还不熟悉。',focus:'向量与矩阵、导数与链式法则、概率与抽样；可在学习机器学习基础时同步巩固。',outcome:'手算一个点积和简单导数，解释它们怎样参与预测与参数更新。'},
  en:{title:'Mathematics',hint:'Understand the operations',question:'Connect each symbol to a question',audience:'You can follow code, but matrices, derivatives, or probability are unclear.',focus:'Vectors and matrices, derivatives and the chain rule, probability and sampling; strengthen these alongside introductory ML.',outcome:'Work through a dot product and a simple derivative, explaining their roles in prediction and parameter updates.'},
  links:[['basics.html#basics-linear-algebra','线性代数','Linear algebra'],['basics.html#basics-calculus','微积分','Calculus']]},
 {id:'ml',anchor:'route-ml',mark:'02',icon:'chart',
  zh:{title:'机器学习',hint:'区分拟合与评估',question:'如何判断一个评测分数是否可信？',audience:'能处理简单数组，也能解释基础数学运算。',focus:'简单监督学习模型、损失与指标、训练／验证／测试划分。',outcome:'建立可复现的基线，分析错误，并说明比较结果支持哪些结论。'},
  en:{title:'Machine learning',hint:'Separate fitting from evaluation',question:'What evidence supports a good score?',audience:'You can work with simple arrays and explain the underlying mathematics.',focus:'Simple supervised models, losses and metrics, and training, validation, and test splits.',outcome:'Build a reproducible baseline, examine its errors, and explain what a comparison establishes.'},
  links:[['basics.html#basics-evaluation','理解评估','Understand evaluation'],['start.html','第一个项目','A first project']]},
 {id:'dl',anchor:'route-deep-learning',mark:'03 A',icon:'network',
  zh:{title:'深度学习',hint:'学习表示与优化',question:'复杂模型增加了什么？',audience:'能够解释简单模型、损失与评价方式。',focus:'张量、网络层、自动微分与参数更新；按任务理解网络结构。',outcome:'追踪一个批次的前向计算与参数更新过程，在相同条件下比较神经网络与简单基线。'},
  en:{title:'Deep learning',hint:'Study representations and optimization',question:'What does a more complex model add?',audience:'You can explain a simple model, its loss, and its evaluation.',focus:'Tensors, network layers, automatic differentiation, and parameter updates; connect architectures to tasks.',outcome:'Trace one batch through a forward pass and update, then compare a network fairly with a simple baseline.'},
  links:[['courses.html','选择课程','Choose a course'],['engineering.html','研究工程','Research engineering']]},
 {id:'research',anchor:'route-research',mark:'03 B',icon:'paper',
  zh:{title:'科研方法',hint:'提出问题，检查证据',question:'把好奇心转化为可检验的问题',audience:'已理解一个模型、损失、指标与数据划分；可以从这里开始学习科研方法。',focus:'研究问题、假设、比较条件与不确定性；根据问题补充数学或模型知识。',outcome:'写清一个问题、所需证据与分析方案，并保留可以复查的实验或推导记录。'},
  en:{title:'Research methods',hint:'Frame questions and inspect evidence',question:'Turn curiosity into a question you can test',audience:'You understand how a model, loss, evaluation metric, and data split work together.',focus:'Research questions, assumptions, comparison conditions, and uncertainty; add mathematics or model knowledge as needed.',outcome:'Define a question, plan the evidence and analysis you need, and keep records of experiments or derivations that others can check.'},
  links:[['research-methods.html#question-hypothesis','研究问题与假设','Questions & hypotheses'],['directions.html','寻找研究方向','Explore research areas']]}
];

const AREAS = [
 {id:'llm',group:0,paper:['transformer-2017','Transformer'],
  zh:{title:'大语言模型',question:'模型如何从文本中学习？数据与训练如何影响其能力？',prerequisite:'监督学习、神经网络、概率；逐步理解 token 与 Attention。',evidence:'固定任务与提示，比较基线，检查数据污染与计算成本。',paperNote:'从注意力理解序列建模。'},
  en:{title:'Language models',question:'How do models learn from text, and how do data and training shape their capabilities?',prerequisite:'Supervised learning, neural networks, and probability; build up to tokens and attention.',evidence:'Keep tasks and prompts fixed, compare baselines, and check for data contamination and computational costs.',paperNote:'Start with attention and sequence modeling.'}},
 {id:'vision',group:0,paper:['resnet-2016','ResNet'],
  zh:{title:'计算机视觉',question:'怎样从图像、视频与三维结构中提取有用信息？',prerequisite:'数组与张量、监督学习、神经网络；理解图像和标注。',evidence:'检查数据划分、分辨率、逐类结果与跨域变化。',paperNote:'理解残差连接与深层网络训练。'},
  en:{title:'Computer vision',question:'How can useful information be extracted from images, video, and 3D structure?',prerequisite:'Arrays and tensors, supervised learning, neural networks, and image annotations.',evidence:'Inspect splits, resolution, per-class results, and changes across domains.',paperNote:'Understand residual connections and training deeper networks.'}},
 {id:'multimodal',group:0,paper:['clip-2021','CLIP'],
  zh:{title:'多模态学习',question:'不同来源的信息如何对齐、融合，并支持一个任务？',prerequisite:'视觉与语言表示、向量相似度；理解配对数据。',evidence:'加入单模态对照，检查配对质量、模态缺失与回答依据。',paperNote:'了解模型如何学习图像与文字的共享表示。'},
  en:{title:'Multimodal learning',question:'How can information from different modalities be aligned and combined to support a task?',prerequisite:'Visual and language representations, vector similarity, and paired data.',evidence:'Use unimodal controls; inspect pairing quality, missing inputs, and evidence for answers.',paperNote:'See how models learn shared representations of images and text.'}},
 {id:'generation',group:0,paper:['ddpm-2020','DDPM'],
  zh:{title:'生成模型',question:'怎样学习数据分布，并控制生成的内容和过程？',prerequisite:'概率分布、神经网络与优化；区分训练目标和采样过程。',evidence:'同时检查质量、多样性、条件一致性与采样预算。',paperNote:'从逐步加噪与去噪理解扩散。'},
  en:{title:'Generative models',question:'How can models learn distributions and control the generation process?',prerequisite:'Probability distributions, neural networks, and optimization; distinguish training from sampling.',evidence:'Inspect quality, diversity, conditioning fidelity, and sampling budgets together.',paperNote:'Understand diffusion through gradual noising and denoising.'}},
 {id:'agent',group:1,paper:['react-2023','ReAct'],
  zh:{title:'智能体',question:'模型怎样使用工具与环境反馈，完成一个多步任务？',prerequisite:'语言模型基础、程序与 API；理解动作、观察和环境状态。',evidence:'检查完整轨迹、任务成功、重试次数与工具权限。',paperNote:'跟随一条推理、行动与观察的轨迹。'},
  en:{title:'Agents',question:'How can models use tools and environmental feedback to complete multi-step tasks?',prerequisite:'Language-model basics, programming and APIs; understand actions, observations, and environment state.',evidence:'Inspect full trajectories, task success, retries, and tool permissions.',paperNote:'Follow a trajectory of reasoning, action, and observation.'}},
 {id:'rl',group:1,paper:['rl-ppo','PPO'],
  zh:{title:'强化学习',question:'当行动会影响后续状态时，如何通过反馈学习长期决策？',prerequisite:'概率、优化与机器学习；理解状态、动作、奖励和策略。',evidence:'记录交互与调参预算，使用独立评估，检查回报分布。',paperNote:'理解策略更新与优化目标。'},
  en:{title:'Reinforcement learning',question:'How can an agent learn from feedback when its actions affect future decisions?',prerequisite:'Probability, optimization, and ML; understand states, actions, rewards, and policies.',evidence:'Record interaction and tuning budgets, evaluate separately, and inspect return distributions.',paperNote:'Study policy updates and their optimization objective.'}},
 {id:'world-model',group:1,paper:['wm-dreamerv3','DreamerV3'],
  zh:{title:'世界模型',question:'对环境变化的预测如何支持表示学习、规划与控制？',prerequisite:'序列建模、概率与强化学习基础。',evidence:'分开检查多步预测误差与闭环任务效果。',paperNote:'了解智能体如何利用想象轨迹学习行为。'},
  en:{title:'World models',question:'How can predictions about an environment support representation, planning, and control?',prerequisite:'Sequence modeling, probability, and reinforcement-learning foundations.',evidence:'Evaluate multi-step prediction error and closed-loop task performance separately.',paperNote:'Explore how an agent learns to act using imagined trajectories.'}},
 {id:'embodied',group:1,paper:['embodied-rt2','RT-2'],
  zh:{title:'具身智能',question:'感知与决策怎样转化为真实环境中的物理动作？',prerequisite:'视觉、机器学习与控制概念；理解机器人任务和动作空间。',evidence:'明确控制条件、人工干预、泛化与迁移的范围。',paperNote:'观察视觉、语言与动作怎样连接。'},
  en:{title:'Embodied AI',question:'How can perception and decisions become physical actions in real environments?',prerequisite:'Vision, ML, and control concepts; understand robot tasks and action spaces.',evidence:'Specify control conditions, human interventions, and the scope of generalization and transfer.',paperNote:'See how vision, language, and actions connect.'}},
 {id:'systems',group:2,paper:['flashattention-2022','FlashAttention'],
  zh:{title:'高效 AI 与系统',question:'在质量约束下，怎样提高训练与推理的效率？',prerequisite:'模型训练基础、程序性能分析；逐步理解硬件与内存。',evidence:'同时报告硬件、精度、吞吐、延迟分布与资源用量。',paperNote:'从数据搬运理解注意力算子的优化。'},
  en:{title:'Efficient AI & systems',question:'How can training and inference become more efficient under quality constraints?',prerequisite:'Model-training basics and profiling; build an understanding of hardware and memory.',evidence:'Report hardware, precision, throughput, latency distributions, and resource use.',paperNote:'Understand attention optimization through data movement.'}},
 {id:'ai4x',group:2,paper:['ai4x-alphafold2','AlphaFold2'],
  zh:{title:'跨学科 AI',question:'怎样让 AI 回答具有领域约束的科学与工程问题？',prerequisite:'机器学习与相关领域知识；理解测量、数据来源和任务限制。',evidence:'采用领域基线与合理划分，检查测量限制与外部验证。',paperNote:'从蛋白质结构预测理解领域问题与方法的结合。'},
  en:{title:'Interdisciplinary AI',question:'How can AI answer scientific and engineering questions with domain constraints?',prerequisite:'ML and relevant domain knowledge; understand measurements, data sources, and task limits.',evidence:'Use domain baselines and appropriate splits, checking measurement limits and external validation.',paperNote:'Connect domain questions and methods through protein-structure prediction.'}}
];

const ICONS = {
 code:'<path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18"/>',
 math:'<path d="M3 6h18M8 6v8c0 3-1 4-3 5m11-13v11c0 2 2 2 4 1"/>',
 chart:'<path d="M4 19V12m7 7V7m7 12V3M2 21h20"/>',
 network:'<circle cx="12" cy="4" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="m11 6-5 10m7-10 5 10M8 19h8"/>',
 paper:'<path d="M5 2h10l5 5v15H5zM15 2v6h5M9 12h7m-7 4h7"/>'
};
const icon = name => `<svg class="explorer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
const link = (href,label,className='') => `<a${className?` class="${className}"`:''} href="${escape(href)}">${escape(label)} <span aria-hidden="true">↗</span></a>`;
const field = (label,value) => `<div><dt>${escape(label)}</dt><dd>${escape(value)}</dd></div>`;

function learningExplorer(lang){
 const zh=lang==='zh';
 const t=zh?{title:'找到你的下一步',eyebrow:'学习路线 · 知识依赖',hint:'选择一个节点，了解所需基础、学习重点和预期成果。',phases:['并行建立基础','连接方法与数据','按问题继续深入'],audience:'适用基础',focus:'学习重点',outcome:'预期成果',read:'阅读相关章节',note:'箭头表示知识依赖。编程与入门数学可以并行；理解简单模型与评估后，也可以开始学习科研方法。'}:{title:'Find your next step',eyebrow:'Learning path · Knowledge dependencies',hint:'Select a node to see where to start, what to study, and what you will be able to do.',phases:['Build foundations in parallel','Connect methods and data','Follow your question'],audience:'A useful starting point if',focus:'What to study',outcome:'What you can do',read:'Read this section',note:'Arrows show knowledge dependencies. You can study programming and introductory mathematics in parallel, and begin research methods once you understand a simple model and how to evaluate it.'};
 const panels=LEARNING.map(stage=>{
  const c=stage[lang],id='learn-'+stage.id;
  return `<section class="explorer-panel learning-detail" id="${id}" data-explorer-panel aria-labelledby="${id}-title"><div class="explorer-panel-top"><span class="explorer-kicker">${escape(stage.mark+' · '+c.title)}</span>${link('#'+stage.anchor,t.read,'explorer-primary')}</div><h3 id="${id}-title">${escape(c.question)}</h3><dl class="learning-detail-grid">${field(t.audience,c.audience)}${field(t.focus,c.focus)}${field(t.outcome,c.outcome)}</dl><div class="explorer-reading-links">${stage.links.map(([href,cn,en])=>link(href,zh?cn:en)).join('')}</div></section>`;
 }).join('');
 return `<section class="guide-explorer learning-explorer" id="learning-explorer" data-guide-explorer data-explorer-default="learn-programming" aria-labelledby="learning-explorer-title"><header class="explorer-heading"><span class="explorer-kicker">${t.eyebrow}</span><h2 id="learning-explorer-title">${t.title}</h2><p>${t.hint}</p></header><div class="learning-map"><div class="learning-phases" aria-hidden="true">${t.phases.map((phase,i)=>`<span><b>0${i+1}</b>${phase}</span>`).join('')}</div><nav class="learning-nodes" data-explorer-tabs aria-label="${zh?'选择学习阶段':'Choose a learning stage'}"><svg class="learning-lines learning-lines-wide" viewBox="0 0 1000 228" preserveAspectRatio="none" aria-hidden="true"><path d="M285 51C330 51 325 114 345 114M285 177C330 177 325 114 345 114M630 114C670 114 665 51 705 51M630 114C670 114 665 177 705 177"/><path class="line-arrow" d="m336 110 9 4-9 4M686 47l9 4-9 4m0 118 9 4-9 4"/></svg><svg class="learning-lines learning-lines-tall" viewBox="0 0 1000 360" preserveAspectRatio="none" aria-hidden="true"><path d="M240 89v17q0 14 20 14h220q20 0 20 20v12M760 89v17q0 14-20 14H520q-20 0-20 20M500 208v12q0 20-20 20H260q-20 0-20 20v12M500 220q0 20 20 20h220q20 0 20 20v12"/></svg>${LEARNING.map(stage=>{const c=stage[lang],id='learn-'+stage.id;return `<a class="learning-node learning-node-${stage.id}" id="${id}-tab" data-explorer-tab href="#${id}">${icon(stage.icon)}<span><small>${stage.mark}</small><strong>${escape(c.title)}</strong><span class="learning-node-hint">${escape(c.hint)}</span></span></a>`;}).join('')}</nav><p class="explorer-note">${t.note}</p></div><div class="explorer-panels">${panels}</div></section>`;
}

function researchExplorer(lang){
 const zh=lang==='zh';
 const groups=zh?[['理解与生成','从信息到表示与样本'],['行动与决策','从观察到反馈与策略'],['系统与应用','从计算约束到领域证据']]:[['Understand & generate','Information, representations, and samples'],['Act & decide','Observation, feedback, and policy'],['Build & apply','Computation and domain evidence']];
 const t=zh?{title:'从问题出发，探索十个方向',eyebrow:'研究地图 · 方向与联系',hint:'选择感兴趣的方向，了解核心问题、先修知识与建议阅读的论文。',selected:'当前方向',preparation:'先修知识',evidence:'先检查哪些证据',paper:'代表论文导读',read:'了解这一方向',foundation:'回到学习路线',note:'这些方向相互交叉；连线表示联系，不代表必修顺序。所列论文供入门选读，并非按重要性排名。'}:{title:'Explore ten areas through questions',eyebrow:'Research map · Areas and connections',hint:'Choose an area to find its main questions, useful background, and a suggested first paper.',selected:'Selected area',preparation:'Useful preparation',evidence:'What to check',paper:'A representative paper',read:'Explore this area',foundation:'Return to the learning path',note:'These areas overlap. Connections indicate relationships, not a required study order. The papers are suggested starting points, not a ranked list.'};
 const panels=AREAS.map(area=>{
  const c=area[lang],id='area-'+area.id;
  return `<section class="explorer-panel research-detail" id="${id}" data-explorer-panel aria-labelledby="${id}-title"><div class="explorer-panel-top"><span class="explorer-kicker">${t.selected} · 0${area.group+1}</span><span class="explorer-group-name">${groups[area.group][0]}</span></div><h3 id="${id}-title">${escape(c.title)}</h3><p class="explorer-question">${escape(c.question)}</p><div class="research-detail-grid"><dl>${field(t.preparation,c.prerequisite)}${field(t.evidence,c.evidence)}</dl><div class="explorer-paper"><span class="explorer-kicker">${t.paper}</span>${link(area.id+'.html#paper-'+area.paper[0],area.paper[1],'explorer-paper-title')}<p>${escape(c.paperNote)}</p></div></div><div class="explorer-reading-links">${link(area.id+'.html',t.read,'explorer-primary')}${link('learning-path.html',t.foundation)}</div></section>`;
 }).join('');
 return `<section class="guide-explorer research-explorer" id="research-explorer" data-guide-explorer data-explorer-default="area-llm" aria-labelledby="research-explorer-title"><header class="explorer-heading"><span class="explorer-kicker">${t.eyebrow}</span><h2 id="research-explorer-title">${t.title}</h2><p>${t.hint}</p></header><nav class="research-map" data-explorer-tabs aria-label="${zh?'选择研究方向':'Choose a research area'}"><svg class="research-connections" viewBox="0 0 1000 44" preserveAspectRatio="none" aria-hidden="true"><path d="M160 30C160 0 500 0 500 30C500 0 840 0 840 30"/><circle cx="160" cy="30" r="3"/><circle cx="500" cy="30" r="3"/><circle cx="840" cy="30" r="3"/></svg>${groups.map(([title,description],group)=>`<div class="research-group"><div class="research-group-heading"><span class="research-group-number">0${group+1}</span><h3>${title}</h3><p>${description}</p></div><div class="research-area-list">${AREAS.filter(area=>area.group===group).map(area=>`<a class="research-node" id="area-${area.id}-tab" data-explorer-tab href="#area-${area.id}"><span class="research-node-dot" aria-hidden="true"></span><span>${escape(area[lang].title)}</span><span class="research-node-arrow" aria-hidden="true">↗</span></a>`).join('')}</div></div>`).join('')}</nav><p class="explorer-note">${t.note}</p><div class="explorer-panels">${panels}</div></section>`;
}

export function guideExplorerAnchors(id){
 if(id==='learning-path')return ['learning-explorer',...LEARNING.map(stage=>'learn-'+stage.id)];
 if(id==='directions')return ['research-explorer',...AREAS.map(area=>'area-'+area.id)];
 return [];
}

export function renderGuideExplorer({id,lang='en'}){
 if(id==='learning-path')return learningExplorer(lang);
 if(id==='directions')return researchExplorer(lang);
 return '';
}
