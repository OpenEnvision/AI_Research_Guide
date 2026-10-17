# AI 辅助学习与研究

AI 可以帮助解释概念、阅读代码、比较笔记或修改草稿。如何使用它，取决于当前任务，以及你能够核查哪些内容。先提出一个范围明确的小任务，保留原始材料，并说明怎样的回答才算有用。

## 为每项任务明确检查方法

| 任务 | 可以怎样辅助 | 仍需检查什么 |
| --- | --- | --- |
| 学习概念 | 换种解释、连续提问、小例子 | 定义、假设，以及不看答案时自己的解释 |
| 阅读文献 | 检索词、工作比较、来源位置 | 文献是否存在，原文是否支持对应陈述 |
| 理解或修改代码 | 梳理文件结构、提出修改建议、诊断错误 | 实际差异、输入输出、测试与评估逻辑 |
| 分析结果 | 整理表格、作图、提出可能解释 | 原始数据、分母、计算与其他解释 |
| 写作与汇报 | 组织结构、调整措辞、绘制示意图，以及根据受众调整表达 | 含义、数值、引用与主张所对应的证据 |

有效的请求说明材料、目标、范围、输出格式与检查方式。例如：“根据这三份笔记比较数据和评估条件，每项附来源位置，缺少的信息写未知。”赞同或流畅回答不是独立证据。

## 接受代码修改前先理解变化

先让助手沿一个样本梳理实现，再讨论大范围重写。审查改了什么、为什么改，包括预处理、标签、指标和依赖。对一次运行的描述，并不能证明它实际发生过；需要核查执行情况时，应保留真实命令、环境、输出和失败记录。

下面是编程助手示例，不是必需的工具组合或排名。访问、费用、语言支持、权限和数据处理方式各不相同，本指南不要求付费订阅。

<div class="logo-strip">
<a class="logo-entry" href="https://www.trae.cn/"><img src="../../../public/blog/guide/figures/uestc/intro/trae-logo.png" alt=""><span>TRAE</span></a>
<a class="logo-entry" href="https://www.workbuddy.cn/"><img src="../../../public/blog/guide/figures/uestc/intro/workbuddy-logo.svg" alt=""><span>WorkBuddy</span></a>
<a class="logo-entry" href="https://claude.com/product/claude-code"><img src="../../../public/blog/guide/figures/uestc/intro/claude-logo.png" alt=""><span>Claude Code</span></a>
<a class="logo-entry" href="https://zcode.z.ai/"><img src="../../../public/blog/guide/figures/uestc/intro/zcode-logo.png" alt=""><span>ZCode</span></a>
<a class="logo-entry" href="https://openai.com/codex/"><img src="../../../public/blog/guide/figures/uestc/intro/openai-logo.png" alt=""><span>Codex</span></a>
</div>

排错时提供小而可复现的问题，正确性检查见[研究工程](engineering.md)。文件与执行权限只开放任务所需范围，影响重要材料或外部状态的操作先检查再执行。

## 让文献整理始终有原文依据

要求提供段落、公式定义、图表位置或代码出处，再亲自核对。题名正确不保证总结正确，生成的参考文献也可能不存在。区分作者陈述、助手解释和自己的判断。

用[阅读笔记](reading.md#paper-notes)和[可选笔记工作流](irene-workflow.md#notes)保存这些区别。[Markdown](https://www.markdownguide.org/basic-syntax/)可以组织笔记、表格、图和未解问题；文献管理器与普通文本文件已足以起步。

## 从证据生成图表

数值图应来自保存的数据和可检查的计算。AI 可以起草绘图代码、标签与布局，但不能编造缺失观测、误差条或“看起来合理”的结果。概念图注明是示意，逐项核对箭头、标签与公式。

准备报告时交代听众、时长、核心问题与来源材料。修改后检查听众能否解释主要主张并找到证据。相关方法见[写作与画图](writing.md)。

<a id="grill-me"></a>

## 用提问检验理解

先自己解释方法或公式，再请助手一次追问一个问题，围绕输入、假设、组件作用与证据展开。先作答，再看生成的解释；讨论暴露缺口时回到论文。

[paper-tools-marketplace](https://github.com/tseirene6/paper-tools-marketplace)中的 **Grill Me** 是一种可选实现，[阅读工作流](irene-workflow.md#grill)介绍用法。同样的学习方法也可以与同伴一起完成，不依赖特定软件。

<a id="ai-feedback"></a>

## 保留自己的判断与不确定性

主动询问还可能有哪些解释，以及哪些观察会削弱自己倾向的解释。模型可能强化提问中给定的前提，多份生成答案也可能共享同一错误。有争议的主张需要通过推导、原文、计算或适当的实验来核查；未解问题也应与能够判断的人讨论。

把建议做的工作和实际完成的工作分开。对研究有影响的辅助工作，应记录来源材料、重要改动和人工核查情况。分享受限或未公开材料前，确认允许的处理方式；本地文件访问不意味着计算一定留在本机。投稿披露见[写作章节](writing.md#ai-disclosure)。

**理解检查：**现在能否解释关键步骤、指出证据来自哪里，并识别一种错误解释？如果不能，缩小任务并补上缺失概念。借助工具完成任务，与真正理解任务，是两种不同的收获。

## 继续阅读

[两篇 AI 使用反思](lesswrong.md#ai)讨论信念强化与学生学习。想了解助手背后的系统，可看 [Lilian Weng 的 Agent 文章](https://lilianweng.github.io/posts/2023-06-23-agent/)和 [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)。它们描述特定设计，不保证所有产品都有相同表现。
