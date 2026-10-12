# 找资料和读论文

<h2 id="reading-overview">先看看这个领域是怎样发展起来的</h2>

刚接触一个方向时，可以先找一篇好的综述、一场报告或一组课程，看看大家在研究什么，主要有哪些思路。带着这点整体认识，再去读几篇经典论文和相关 blog，会更容易理解一篇文章为什么出现、它在整个领域里处于什么位置。

读的时候，试着把文章之间的关系接起来：

- **前一项工作留下了什么问题？** 后来的研究为什么换了一种做法？
- **是什么带来了变化？** 新的数据、新的现象，还是原来的方法遇到了瓶颈？
- **几项工作怎样联系？** 它们沿着同一条路线推进，提出不同的解释，还是把原本分开的方向接到了一起？

遇到一篇感兴趣的文章，也可以看看作者之前和之后的工作、主页、blog 和报告。沿着同一个问题读下去，有时能看见单篇论文里不容易察觉的思考过程。

## 查找论文与相关工作

[Google Scholar](https://scholar.google.com/) 可以查论文的后续引用与相关工作；论文中的参考文献则能找到它所依赖的前人工作。作者主页、项目页和代码仓库常有报告、演示与后续更新。检索功能见 [Scholar 官方说明](https://scholar.google.com/intl/en/scholar/help.html)，[AMiner](https://docs.aminer.cn/user-guide/platform-overview/) 也提供论文检索与阅读功能。

<a id="research-map"></a>

比如最近关心 Agent 的长任务失败，可以按规划、工具使用、记忆和环境反馈查找相关工作：各篇解释了哪种失败，实验覆盖哪些情况，还有哪些现象没有解释？搜索时结合研究对象、方法和任务，再沿参考文献与引用找基础工作、直接前作和同期研究。更具体的检索示例见[定向文献检索](irene-workflow.md#search)。

<a id="reading-depth"></a>

## 读到什么程度

**阅读深度取决于这次想弄明白什么。** 了解一项工作时，先关注问题、主要方法和关键结果；梳理一个方向时，要比较工作之间的联系；准备复现或改进，则需要细看架构、公式、数据和实验设置。

同一篇论文也可以分几次读。第一遍留下的疑问，可能在看过后续工作、代码或实验之后才有答案。[Keshav 的 How to Read a Paper](https://cs.uwaterloo.ca/~brecht/courses/854-Experimental-Performance-Evaluation-2018/readings/common/how-to-read/keshav-paper-reading.pdf) 介绍了三遍阅读法；李沐的[如何读论文](https://www.bilibili.com/video/BV1H44y1t75x/)也谈到论文的阅读顺序与深度。

<figure class="resource-figure medium"><a href="https://www.bilibili.com/video/BV1H44y1t75x/"><img src="../../../public/blog/guide/figures/uestc/reading/limu-reading.jpg" alt="李沐：如何读论文" loading="lazy" width="800" height="450"></a><figcaption><a href="https://www.bilibili.com/video/BV1H44y1t75x/">如何读论文</a><span class="caption-dot">·</span>跟李沐学 AI<span class="caption-dot">·</span><a href="https://www.zhihu.com/zvideo/1428973951632969728">知乎</a></figcaption></figure>

## 论文里的问题、方法与实验

从摘要、引言、关键图和结论开始，了解**做了什么、为什么做、怎么做**，再去实验里看结果怎样支持这些判断。方法细节和没弄懂的地方，可以回头再查。

<a id="claims-evidence"></a>

比如作者说一个模块带来了提升，就看看消融是否单独改变了这个模块；说能泛化到新场景，就找测试场景与训练数据的关系。比较几篇工作时，除了方法差别，还要看它们使用的任务、数据和计算资源是否相同。阅读中的疑问也可以拿来讨论，或[让 AI 围绕你的理解追问](ai.md#grill-me)。

## 复现时要看的细节

数据怎么来的，划分有没有重叠，指标具体怎么算，baseline 怎样设置，核心实现在哪里，随机性有多大。把论文和代码放在一起看，有时最重要的条件在**附录、配置文件或 issue** 里。

<a id="paper-notes"></a>

## 论文笔记与文献整理

[Zotero](https://www.zotero.org/support/quick_start_guide) 可以保存论文信息、PDF 和批注；Obsidian、飞书或 Notion 都可以用来整理自己的理解、疑问和相关材料。图表留下页码，摘录与自己的判断分开，之后比较论文、写文章时也方便查回原文。Zotero 与 Obsidian 的配置和笔记示例见[论文与笔记工作流](irene-workflow.md#notes)。

几篇论文讨论同一个问题时，可以把它们放在一起，整理方法之间的联系、各自的实验条件和仍未解决的问题。随着阅读和实验推进，这些联系也会变化。[研究问题与文献对应表](irene-workflow.md#depth)里有一种整理方式。

## 论文讲解与相关资料

[李沐论文精读](https://github.com/mli/paper-reading)逐段讲解研究背景、方法与实验，也讨论论文写作。Transformer、ViT、CLIP 等视频见[论文选读](papers.md#sec-1)，更多课程与精读视频见[课程与论文精读](limu.md)。

[科研资料目录](catalog-research.md) · [科研问答与 AMA](research-conversations.md) · [做实验](experiments.md) · [联系老师与合作](contact.md)
