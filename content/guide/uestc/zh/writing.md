# 写作、画图和汇报

你已经在一个问题上花了很多时间，读者还没有。写作要把读者带到能理解**问题、做法和证据**的位置。

## 先说清你发现了什么

可以先用几句话写出：以前有什么问题，你做了什么，结果让我们多知道了什么。再把相应的图、实验或分析放在旁边。发现某句话没有依据时，就知道还缺哪一块。

这是一个表达示例：

<div class="guide-compare"><div><strong>缺少可核对信息</strong><p>我们提出了一个创新、高效、鲁棒的框架。</p></div><div><strong>说明现象、改动与验证目标</strong><p>系统在长任务中经常丢失早期约束，因此加入任务状态记录，并检查它是否减少这类失败。</p></div></div>

第二种写法交代了现象、做法和验证目标。写完再问，后面的结果是否回答了前面的句子。

## 从文章结构到具体段落

[黄哲威、丁霄汉的 Writing AI Conference Papers](https://github.com/hzwer/WritingAIPaper)适合在提炼贡献、搭结构和修改初稿时查。[Simon Peyton Jones 的写作讲座](https://www.microsoft.com/en-us/research/academic-program/write-great-research-paper/)可以一起看，参考如何在前部交代关键想法。

- **Introduction**：交代问题、现有缺口和贡献。
- **方法**：说明输入输出、核心步骤与必要假设。
- **实验**：给出与主张对应的比较、消融和分析。
- **相关工作**：说明与已有方法的联系和差异。

把重要条件直接写清，把不支持的形容词删掉。遇到有争议的选择，解释理由与结果即可，不需要替所有可能的批评预先写一段辩护。

已有一批阅读笔记时，围绕这次要回答的问题，把自己的判断和支撑它的论文、实验放在一起，再列段落提纲。让 AI 协助整理时，可以要求每段附上笔记位置和原始来源，接着补入自己的分析。[笔记配置与任务示例](irene-workflow.md#notes)可以配着用。

## 图先决定让人看见什么

- **方法图**：输入 → 处理步骤 → 输出，标明关键模块和数据流。
- **结果图**：比较对象、坐标、单位、评价条件与波动范围。
- **图例与标注**：每种颜色、箭头和符号对应固定含义。

<span id="figure-overview"></span>

### 先让读者看见整个系统

第一次介绍一个系统时，可以先把它放进具体场景。下面这张 MineDojo 总览图把环境、Agent 和知识来源分成三块：你先看到它能做哪些任务，再沿着箭头看它怎样与环境和资料交互。自己的项目也可以先回答三个问题：<strong>处理什么、由谁处理、信息从哪里来。</strong>

<figure class="guide-figure">
<a class="guide-figure-link" href="../../../public/blog/guide/figures/uestc/writing-minedojo-overview.png" target="_blank" rel="noopener" aria-label="查看大图：MineDojo"><img src="../../../public/blog/guide/figures/uestc/writing-minedojo-overview.png" alt="MineDojo 总览：环境任务在左，Agent 居中，知识来源在右，箭头连接三者。" width="934" height="376" loading="lazy" decoding="async"></a>
<figcaption>先看三个区域，再看它们之间的连线。 <a href="https://minedojo.org/" target="_blank" rel="noopener">MineDojo</a> · <a href="../../../public/blog/guide/figures/uestc/writing-minedojo-overview.png" target="_blank" rel="noopener">查看大图</a></figcaption>
</figure>

<span id="figure-methods"></span>

### 比较两种方法，把相同环节对齐

如果想说明“我们改了哪里”，可以把两种方法放在同一套列标题下。这张图中，横着读能跟完整个流程，竖着看能找到同一环节的差异。画自己的对照图时，先确定两边共有的步骤，再用文字、符号和颜色标出变化；读者就不用来回寻找对应关系。

<figure class="guide-figure">
<a class="guide-figure-link" href="../../../public/blog/guide/figures/uestc/writing-method-comparison.png" target="_blank" rel="noopener" aria-label="查看大图：FunPoison · Figure 2"><img src="../../../public/blog/guide/figures/uestc/writing-method-comparison.png" alt="FunPoison 与 CoProtector 的两行对照图，各列对齐同一处理环节，并标注差异。" width="2380" height="560" loading="lazy" decoding="async"></a>
<figcaption>观察相同列标题下，两行怎样交代不同结果；细节可打开大图阅读。 <a href="https://aclanthology.org/2026.findings-acl.1564/" target="_blank" rel="noopener">FunPoison · Figure 2</a> · <a href="../../../public/blog/guide/figures/uestc/writing-method-comparison.png" target="_blank" rel="noopener">查看大图</a></figcaption>
</figure>

<span id="figure-tasks"></span>

### 任务有什么不同，放在一起看

介绍数据集或几类任务时，只有名称往往不够。LIBERO 的这张图为每组任务配了实际场景和一句区别说明，读者能直接对照物体、布局和目标的变化。你也可以挑几组有代表性的样本，用相近的视角和尺寸摆在一起，把差异写在样本旁边。

<figure class="guide-figure">
<a class="guide-figure-link" href="../../../public/blog/guide/figures/uestc/writing-libero-tasks.png" target="_blank" rel="noopener" aria-label="查看大图：LIBERO"><img src="../../../public/blog/guide/figures/uestc/writing-libero-tasks.png" alt="LIBERO 总览上半部分：四组任务分别配有机器人场景和差异说明。" width="948" height="299" loading="lazy" decoding="async"></a>
<figcaption>这里只保留任务分组部分，让样本与旁边的说明一起被看见。 <a href="https://libero-project.github.io/main.html" target="_blank" rel="noopener">LIBERO</a> · <a href="../../../public/blog/guide/figures/uestc/writing-libero-tasks.png" target="_blank" rel="noopener">查看大图</a></figcaption>
</figure>

<span id="figure-results"></span>

### 结果图先让人找到比较对象

下面这张结果图把代码质量和注释质量分成两个面板，同一种方法在两边保持同一种颜色。读者先认图例，再在每组指标里比较。画自己的结果时，也要把<strong>方法、指标和单位</strong>交代清楚。这张原图还使用了双纵轴，读数前要确认指标对应哪一侧；如果要精确比较，把不同尺度拆成小图通常更容易读。

<figure class="guide-figure">
<a class="guide-figure-link" href="../../../public/blog/guide/figures/uestc/writing-grouped-results.png" target="_blank" rel="noopener" aria-label="查看大图：FunPoison · Figure 1"><img src="../../../public/blog/guide/figures/uestc/writing-grouped-results.png" alt="FunPoison 结果图：代码质量与注释质量分别展示，各组柱子按方法配色。" width="1176" height="428" loading="lazy" decoding="async"></a>
<figcaption>布局示例，评价条件与指标定义见原文图 1。 <a href="https://aclanthology.org/2026.findings-acl.1564/" target="_blank" rel="noopener">FunPoison · Figure 1</a> · <a href="../../../public/blog/guide/figures/uestc/writing-grouped-results.png" target="_blank" rel="noopener">查看大图</a></figcaption>
</figure>

<span id="figure-radial"></span>

### 多指标总览，也要交代尺度

AlphaEdit 把多组指标排在圆周上，适合放在总览位置，让读者先看到比较覆盖了哪些方面。需要读具体数值时，仍然要回到组名、数值和图例。<strong>各组指标的尺度不同，跨组柱长不能直接比较。</strong>如果你最想讲清的是某个指标提高了多少，就把那一组单独画出来，不必为了图形丰富而用环形布局。

<figure class="guide-figure guide-figure--compact">
<a class="guide-figure-link" href="../../../public/blog/guide/figures/uestc/writing-radial-results.png" target="_blank" rel="noopener" aria-label="查看大图：AlphaEdit · Figure 2"><img src="../../../public/blog/guide/figures/uestc/writing-radial-results.png" alt="AlphaEdit 径向柱状图，多组指标沿圆周排列，方法颜色对应下方图例。" width="1088" height="1228" loading="lazy" decoding="async"></a>
<figcaption>可借鉴分组与颜色对应；比较数值时留在同一指标组内。 <a href="https://arxiv.org/abs/2410.02355" target="_blank" rel="noopener">AlphaEdit · Figure 2</a> · <a href="../../../public/blog/guide/figures/uestc/writing-radial-results.png" target="_blank" rel="noopener">查看大图</a></figcaption>
</figure>

按最终展示尺寸检查字号、图例和阅读顺序，再请未参与项目的人复述图意。[Fundamentals of Data Visualization](https://clauswilke.com/dataviz/)适合查图表类型与表达方式。白板、PPT 或其他绘图工具，选能完成这张图的就好。

<aside class="guide-note"><strong>交图前检查</strong><p>缩到论文或幻灯片的实际尺寸后，标题、坐标与图例仍能读清；仅看图和图注，可以说明比较了什么、条件是什么。</p></aside>

## 排版与汇报

排版用 [Overleaf 的 LaTeX 入门](https://www.overleaf.com/learn/latex/Learn_LaTeX_in_30_minutes)查文字、公式、图片与引用。日常笔记和项目 README，用 [Markdown 基础语法](https://www.markdownguide.org/basic-syntax/)就能开始。

汇报时先想听众已经知道什么，选足够讲清核心问题的内容。[研究汇报讲座](https://www.microsoft.com/en-us/research/academic-program/give-great-research-talk/)有进一步材料。一次组会可以围绕问题、关键结果、当前解释和想讨论的地方展开。

[投稿与发表](publishing.md) · [实验记录](experiments.md) · [借助 AI 修改](ai.md)

## 写到具体段落时再查

[黄哲威与丁霄汉的写作手册](blogs.md#ding)适合对照贡献、结构和初稿；[The Bottom Line](lesswrong.md#bottom-line)讨论证据怎样决定结论。LaTeX、画图和汇报的材料放在[科研资料目录](catalog-research.md#topic-11)。
