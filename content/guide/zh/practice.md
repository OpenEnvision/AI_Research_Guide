# 练习与竞赛

从 34 个平台与项目入口中选一个，练好一项技能，再把方法用到小项目中。可以从下面的目标中选择一项，保留能说明学习成果的代码、测试和推理过程。

<a id="sec-1"></a>
<h2 id="practice-start">按目标选择入口</h2>

<div class="practice-starts">
<section class="practice-start">
<h3 class="practice-start-title">练好 Python</h3>
<p>从 <a href="#resource-7">Exercism</a> 开始，有具体知识缺口时再选<a href="#practice-programming">算法题</a>。</p>
<p>保留通过测试的代码，解释一次改进。</p>
</section>
<section class="practice-start">
<h3 class="practice-start-title">查询与处理数据</h3>
<p>先用 <a href="#resource-9">SQLBolt</a>，再试 <a href="#resource-11">PostgreSQL Exercises</a>。</p>
<p>保留查询语句、指标定义，以及空值与重复值的检查记录。</p>
</section>
<section class="practice-start">
<h3 class="practice-start-title">动手实现 ML</h3>
<p>用 <a href="#resource-16">Deep-ML</a> 练习算法实现，用 <a href="#resource-14">Kaggle Learn</a> 完成小型建模练习。</p>
<p>保留数值检查、简单基线和误差分析。</p>
</section>
<section class="practice-start">
<h3 class="practice-start-title">体验一次竞赛</h3>
<p>在 <a href="#resource-17">Kaggle</a> 选一项符合基础与设备条件的入门挑战。</p>
<p>保留本地验证划分和可复现的提交。</p>
</section>
<section class="practice-start">
<h3 class="practice-start-title">交付一个项目</h3>
<p>用 <a href="#resource-21">GitHub Skills</a> 学工作流，做深度学习项目时再配合 <a href="#resource-23">PyTorch 教程</a>。</p>
<p>保留可运行仓库、测试和安装说明。</p>
</section>
</div>

采用一个简单循环：**独立尝试 → 构造反例 → 阅读反馈 → 关闭参考重写 → 迁移到新任务**。记录错误时，区分是误读了要求、缺少相关概念，还是推理、实现或评价出了问题；反复出现的问题先补概念，间隔一段时间再用结构不同的新题检查理解。

<a id="sec-2"></a>
<h2 id="practice-programming">编程与算法</h2>

**练习安排与自查：** 先用[课程页](courses.md)中的 Python 主课打好语法基础，再从 LeetCode/力扣、Exercism 或 CSES 中选一个平台。每个专题都尝试不看参考重写一次，再把方法用于一道新题；保留正确性论证、复杂度分析与反例，无需频繁更换平台来增加题量。

- **[LeetCode](https://leetcode.com/problemset/)** — **语言：英语为主；准备：掌握一种编程语言。** 用于数组、哈希、树、图、搜索和动态规划等专题练习。 **建议成果：** 为一道题写出暴力基线、优化理由、复杂度与边界测试。
- **[力扣中国](https://leetcode.cn/)** — **语言：中文为主；准备：基础编程。** 提供中文题面、专题学习与在线判题，可作为 LeetCode 的地区和语言选择。 **建议成果：** 把一个算法解释给同伴，并在没有题目模板的本地程序中复用。
- **[HackerRank · Algorithms](https://www.hackerrank.com/domains/algorithms)** — **语言：英语；准备：基本语法与输入输出。** 覆盖实现、排序、搜索、图、贪心和动态规划。 **建议成果：** 保留一组能定位错误的数据与一次修改记录。
- **[Codeforces](https://codeforces.com/)** — **语言：英语、俄语等；准备：熟练编程与基础算法。** 适合限时竞赛、专题题库、赛后题解和反例训练。 **建议成果：** 赛后重建一题的推理，并解释一个能够揭示错误解法的反例。
- **[AtCoder](https://atcoder.jp/)** — **语言：日语、英语；准备：从基础语法到算法，按比赛级别选择。** 通过定期比赛练习读题、实现、数学与算法推理。 **建议成果：** 完成赛后补题报告，比较原思路与正式解法的适用条件。
- **[洛谷](https://www.luogu.com.cn/problem/list)** — **语言：中文为主；准备：基础编程，竞赛题通常还需算法知识。** 提供题库、主题训练、比赛与题解。 **建议成果：** 围绕一个专题写出包含证明、实现和测试的学习笔记。
- **[Exercism · Python Track](https://exercism.org/tracks/python)** — **语言：英语；准备：可从 Python 基础开始。** 通过概念练习、自动测试和社区反馈提高编程语言的运用能力与代码可读性。 **建议成果：** 比较第一版与重构版，说明命名、结构、测试覆盖和可读性变化。
- **[CSES Problem Set](https://cses.fi/problemset/)** — **语言：英语；准备：基本数据结构与算法。** 按排序搜索、动态规划、图、树与数学等类别系统训练。 **建议成果：** 把同一算法用于两个结构不同的问题，说明为什么能够迁移，并在本地测试溢出、复杂度与极端输入。

<a id="sec-3"></a>
<h2 id="practice-sql">SQL 与数据处理</h2>

**练习安排与自查：** 零基础可以先选 SQLBolt 或 SQLZoo，已有基础后再用 PostgreSQL Exercises 或 DataLemur。为同一指标分别编写 SQL 与 pandas 实现，在存在空值、重复行、缺失关联或分母变化时核对结果；查询能够运行只是第一步。

- **[SQLBolt](https://sqlbolt.com/)** — **语言：英语；准备：无需数据库经验。** 在浏览器中练习 SELECT、过滤、连接、聚合及数据修改概念。 **建议成果：** 为一组查询说明每一步如何改变数据行，以及结果中的一行代表什么。
- **[SQLZoo](https://sqlzoo.net/wiki/SQL_Tutorial)** — **语言：英语为主，部分内容有翻译；准备：基本表结构概念。** 覆盖查询、子查询、JOIN、NULL、聚合等交互练习。 **建议成果：** 构造空值、重复行和缺失关联的反例来检查查询，注明所用 SQL 方言。
- **[PostgreSQL Exercises](https://pgexercises.com/)** — **语言：英语；准备：基础 SQL。** 围绕一个连贯示例数据集练习连接、聚合、日期、递归与窗口函数等。 **建议成果：** 在本地 PostgreSQL 复现查询并说明结果粒度和排序。
- **[DataLemur · SQL Questions](https://datalemur.com/questions)** — **语言：英语；准备：基础 SQL，并能辨析指标的统计口径。** 面向分析与面试情境练习 SQL，按题目要求处理聚合与窗口等逻辑。 **访问：** 部分题目需要 Premium。 **建议成果：** 先写指标定义和分母，再写查询与边界测试。

<a id="sec-4"></a>
<h2 id="practice-ml">数学与机器学习实现</h2>

**练习安排与自查：** 用 Deep-ML 检查一个数学组件的实现，用 Kaggle Learn 或 Google 实验完成小型建模练习，再回到[课程页](courses.md)补充推导。检查独立数值测试与数据划分，排除数据泄漏，并解释误差；Project Euler 适合进一步练习离散推理。

- **[Project Euler](https://projecteuler.net/)** — **语言：英语；准备：基本编程与数学推理。** 通过数学和计算问题训练观察、推导与高效实现。 **建议成果：** 写出从朴素枚举到数学化简的过程，验证小规模实例。
- **[Kaggle Learn](https://www.kaggle.com/learn)** — **语言：英语；准备：按课程从零基础编程到基础 Python 不等。** 用短课与 notebook 练习 Python、pandas、SQL、ML、可视化等。 **建议成果：** 离开模板后，用新数据重建清洗、建模与评估流程。
- **[Google ML Crash Course · Exercises](https://developers.google.com/machine-learning/crash-course/exercises)** — **语言：英语及中文等版本；准备：Python、代数与基础统计。** 提供交互、测验和编程练习，覆盖回归、分类、数据、泛化与公平性。 **运行：** 编程题通过 Colab 在浏览器中完成。 **建议成果：** 改变一个训练或数据设置，先预测结果，再做实验并解释预测与实测的差异。
- **[Deep-ML](https://www.deep-ml.com/)** — **语言：英语；准备：Python/NumPy 和相应数学基础。** 通过编码问题练习线性代数、统计、ML 与 DL 组件。 **建议成果：** 为一个实现写公式、形状说明、数值稳定性检查和独立测试。

<a id="sec-5"></a>
<h2 id="practice-competitions">数据与 AI 竞赛</h2>

**练习安排与自查：** 先选择一场任务清楚、数据与预算可控的挑战，参照[数据与评测](datasets.md)制定验证方案。先提交一个可复现的简单基线，至少做一次受控改动，再检查本地验证与榜单结果的差异、数据许可、运行命令和失败案例。

参赛前先阅读任务和评估说明，核对当期参赛资格，以及组队、数据使用与提交规则。用本地验证选择模型，把公开榜分数作为有限参考。样本因时间、用户或组织而存在相关性时，随机拆分可能泄漏信息；划分方式应匹配真实使用场景。

- **[Kaggle Competitions](https://www.kaggle.com/competitions)** — **语言：英语为主；准备：Python、数据分析与 ML 基线。** 提供学习型与正式建模竞赛，可练习公开/私有评估与提交工作流。 **建议成果：** 可复现基线、验证方案、实验表和赛后复盘。
- **[DrivenData · Competitions](https://www.drivendata.org/competitions/)** — **语言：英语；准备：数据分析、ML 和任务背景阅读。** 以社会与科学相关问题组织数据挑战。 **建议成果：** 除分数外，解释数据代表性、错误代价和潜在使用情境。
- **[AIcrowd · Challenges](https://www.aicrowd.com/challenges)** — **语言：英语；准备：按挑战具备 ML、仿真或软件打包能力。** 包含多类 AI 任务和不同提交机制。 **建议成果：** 按照具体评测协议交付可运行模型或智能体，保留环境与预算记录；先确认它采用文件、容器还是交互式提交。
- **[阿里云天池 · 竞赛](https://tianchi.aliyun.com/competition)** — **语言：中文为主；准备：Python、数据处理与对应建模能力。** 提供入门练习与行业任务竞赛。 **建议成果：** 建立有清晰验证集、特征来源和消融记录的方案，再整理成复现报告。

<a id="sec-6"></a>
<h2 id="practice-engineering">工程与项目式学习</h2>

**练习安排与自查：** 用 Missing Semester 与 GitHub Skills 学习项目管理，再按任务选一个模型教程。配合[工程实践](engineering.md)，检查能否在全新环境中安装、完成一次测试，并定位一个失败原因；训练任务还应检查能否从检查点恢复。

- **[GitHub Learn · Skills](https://learn.github.com/skills)** — **语言：英语为主；准备：基础文件与代码操作。** 使用真实仓库、Issue、Pull Request 和 Actions 进行交互练习；[官方 Skills 仓库](https://github.com/skills)也提供入口。 **建议成果：** 一个包含分支、审阅记录、自动检查与清晰 README 的小项目。
- **[MIT · The Missing Semester of Your CS Education](https://missing.csail.mit.edu/)** — **语言：英语，提供翻译入口；准备：能编写简单程序。** 通过 shell、编辑器、版本控制、调试和性能等工具练习补充工程基础。 **建议成果：** 将零散命令整理成可重复运行的数据或训练流程。
- **[PyTorch Tutorials · 实验与配方](https://docs.pytorch.org/tutorials/)** — **语言：英语；准备：Python 与基本 DL。** 用于训练循环、模型保存、部署和性能等动手实验。 **建议成果：** 从同一检查点恢复训练，验证结果并分析一个性能瓶颈；比较时固定设备、依赖与工作量。
- **[Hugging Face Learn](https://huggingface.co/learn)** — **语言：英语为主，部分课程有翻译；准备：按课程具备 Python 与 ML 基础。** 提供大语言模型、智能体、音频、计算机视觉、强化学习等学习入口。 **建议成果：** 交付带评估、数据说明和复现步骤的小型处理流程或智能体。
- **[NVIDIA Deep Learning Institute](https://www.nvidia.com/en-us/training/)** — **语言：英语为主，具体课程语言不同；准备：按课程要求。** 提供 GPU、深度学习、加速计算等课程和动手实验。 **访问：** [自学课程](https://www.nvidia.com/en-us/training/self-paced-courses/)包含免费选项与配套云 GPU 实验，具体条件按课程查看。 **建议成果：** 记录同一任务优化前后的正确性、吞吐和资源使用。
- **[freeCodeCamp · Learn](https://www.freecodecamp.org/learn)** — **语言：英语为主，另有本地化内容；准备：按路径从基础开始。** 通过交互课程和项目训练编程、数据与应用开发；[官方课程仓库](https://github.com/freeCodeCamp/freeCodeCamp)可查课程来源。 **建议成果：** 完成一个独立、可运行、有测试和说明文档的项目。

<a id="sec-7"></a>
<h2 id="practice-chinese">中文教程：数据处理与训练</h2>

**练习安排与自查：** 用 Joyful-Pandas 把原始数据整理成附有数据字典的训练表，再用 MMEngine 实现可配置的训练流程。检查连接前后的行数与键唯一性、缺失值处理策略、训练与验证的隔离、配置和检查点；可以使用更小的模型控制资源消耗。

- **[Datawhale · Joyful-Pandas](https://github.com/datawhalechina/joyful-pandas)** — **语言：中文；准备：Python、NumPy 与基本表结构概念。** 项目方提供 pandas 教程、数据、notebook 与习题，覆盖索引、分组、连接、变形、缺失值和时序数据。 **建议成果：** 独立完成一次多表清洗与聚合，为重复键、类别和日期构造测试，再把 notebook 整理成可重复运行的脚本；按仓库区分网页版与纸质版内容。
- **[OpenMMLab · MMEngine 训练流程入门](https://mmengine.readthedocs.io/zh-cn/latest/get_started/15_minutes.html)** — **语言：中文，另有[英文版](https://mmengine.readthedocs.io/en/latest/get_started/15_minutes.html)；准备：Python、PyTorch 与基本训练循环。** 通过官方代码练习模型、数据加载器、指标和 Runner 的组合。 **建议成果：** 先运行简化配置，再加入一个自定义指标与恢复训练检查，解释配置如何进入训练过程。

<a id="sec-8"></a>
<h2 id="practice-specialist">图、推荐与时序实验</h2>

**练习安排与自查：** 根据任务选择 [CS224W](https://web.stanford.edu/class/cs224w/)、[Google 推荐课程](https://developers.google.com/machine-learning/recommendation)或 [FPP3](https://otexts.com/fpp3/)。图实验核查预测时可访问的结构，推荐实验核查候选与负采样，时序实验核查预测时点。保留简单基线、划分、预算和逐任务结果。

- **[DGL · A Blitz Introduction](https://www.dgl.ai/dgl_docs/tutorials/blitz/index.html)** — **语言：英语；准备：Python、PyTorch、基本图与 DL 概念。** 官方代码实验包含图表示、自定义 GNN、节点分类、链接预测和图分类。 **建议成果：** 复现一个小图任务后改变聚合方式，并与不使用图结构的基线比较，说明标签和测试节点信息何时可用。
- **[RecBole · 官方仓库 Quick-Start](https://github.com/RUCAIBox/RecBole)** — **语言：英语为主；准备：Python、PyTorch 与推荐系统基础。** 仓库提供配置式推荐实验与 BPR/MovieLens 快速示例，支持比较不同推荐任务。 **建议成果：** 对照热门物品基线运行一个模型，记录物品候选、划分、负采样、Recall/nDCG 与冷启动结果；按真实预测任务决定是否采用时间划分，不能默认所有场景都适合示例随机划分。
- **[sktime · Notebook Examples](https://www.sktime.net/docs/examples/)** — **语言：英语；准备：Python、pandas、统计和基础 ML。** 官方 notebook 演示预测、分类、变换与时序模型组合，可在本地按版本运行。 **建议成果：** 完成一个带朴素基线的滚动回测，分步长报告误差，并核查特征构造是否使用了未来信息。

<a id="sec-9"></a>
<h2 id="practice-probability">概率、因果与语音实验</h2>

**练习安排与自查：** 概率模型可以配合 [Murphy 教材](https://probml.github.io/pml-book/)或 [Python 贝叶斯教材](https://bayesiancomputationbook.com/welcome.html)，因果实验配合 [Brady Neal](https://www.bradyneal.com/causal-inference-course)，语音配合 [Aalto 教材](https://speechprocessingbook.aalto.fi/)或 [CS224S](https://web.stanford.edu/class/cs224s/)。先用小型或合成数据验证已知答案，再迁移到真实数据；按任务检查概率归一化、识别假设，或音频与文本预处理。

- **[pgmpy · Example Notebooks](https://pgmpy.org/examples.html)** — **语言：英语；准备：Python、条件概率和图模型基础。** 官方 notebook 覆盖贝叶斯网络、参数与结构学习、精确或近似推断和模拟。 **建议成果：** 为一个小网络手算条件概率，用库结果与模拟核对，说明条件独立与图结构假设。
- **[PyWhy DoWhy · Getting Started](https://www.pywhy.org/dowhy/main/getting_started/index.html)** — **语言：英语；准备：Python、统计与因果图/潜在结果基础。** 官方可运行示例展示建模、识别、估计和反驳检查的流程，也介绍图式因果模型。 **建议成果：** 在已知生成机制的合成数据上比较正确与错误调整，记录识别假设和敏感性；通过反驳检查并不证明不存在未观测混杂。
- **[SpeechBrain · Speech Recognition from Scratch](https://speechbrain.readthedocs.io/en/stable/tutorials/tasks/speech-recognition-from-scratch.html)** — **语言：英语；准备：Python、PyTorch、DL 和基础语音处理。** 实验涵盖数据清单、分词器、训练配置、识别器和解码。 **运行：** 示例使用 mini-LibriSpeech，建议使用 GPU。 **建议成果：** 在小型语音集上完成训练或评测，保留说话人划分、文本规范化、WER/CER、错误片段和运行预算；根据可用算力调整数据与模型规模。

更多任务定义见[拓展研究专题](advanced-topics.md)。

<a id="sec-10"></a>
<h2 id="practice-access">访问与版本</h2>

开始前检查依赖版本、数据／模型许可、硬件、存储及账户或云资源条件。遵守课程与竞赛的 AI 工具规则，只上传获准的数据，保留环境文件与算力费用记录。

<details class="practice-note">
<summary>资源核验与访问说明 · 2026-10-16</summary>
<p>本页 34 个入口包括平台、项目方教程与社区课程。同一平台的学习与竞赛模式分别列出，中英文资源和顺序一致。</p>
<p>官方入口与公开说明核验于 2026-10-16；动态页面使用官方入口、帮助页或官方检索摘要，未逐一运行实验。本地教程需要自行配置环境和下载资源；能够阅读材料，不代表同时获得托管算力或认证服务。</p>
</details>

<a id="sec-11"></a>
<h2 id="practice-evidence">成果记录</h2>

使用 AI 辅助时，记录它参与的步骤。请求完整解答前，先写下已经尝试的思路和具体卡点；提示、反例或对反馈的解释，往往就能帮助你继续思考。之后关闭参考，独立解释并检查关键推理。

按任务保留相应记录：算法练习写清要求、正确性、复杂度和诊断输入；SQL 练习保留表定义、行级核对与指标分母；建模项目再记录数据来源、划分、基线、配置、错误与局限。提出研究主张时，增加相关工作和受控比较；普通学习练习无需套用完整科研报告。选择课程见[课程与教材](courses.md)，完成项目见[第一个 AI 项目](start.md)，设计实验见[研究方法](research-methods.md)；整体安排可参考[学习路径](learning-path.md)。
