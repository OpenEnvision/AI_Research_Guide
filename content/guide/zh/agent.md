# 智能体：工具、反馈与任务执行

让模型解释报错，与让系统打开项目、修改文件并检查结果，是不同的问题。智能体反复观察环境、选择动作，再根据反馈决定下一步。它的行为同时取决于模型和外围程序：工具、上下文、记忆、权限与停止规则。

<a id="agent-learning"></a>

## 初学者的阅读路线：梳理一次完整任务

先理解[语言模型的推理](llm.md)、基本程序接口，以及生成文字和实际执行动作之间的区别。学习智能体系统不需要自己预训练模型。中文 [Hello Agents](https://github.com/datawhalechina/hello-agents) 与英文 [Hugging Face Agents Course](https://huggingface.co/learn/agents-course/en/unit0/introduction) 都提供具体讲解。

阅读 [ReAct 项目页](https://react-lm.github.io/)中的一个例子，分清任务、模型可见信息、所选动作、返回观察与最终状态。模型发出的工具调用只是请求，仍需由外部程序校验并执行；写出计划也不能证明动作已经发生。

| 组成 | 作用 | 阅读时要问什么 |
| --- | --- | --- |
| 模型或策略 | 选择回答或动作 | 当时能看到哪些观察与指令？ |
| 工具与环境 | 执行动作并返回观察 | 哪些状态可以改变，哪里可能失败？ |
| 上下文与记忆 | 为后续步骤保留和提供信息 | 保留、遗漏或错误检索了什么？ |
| Harness 或 Scaffold | 组织调用、重试、限制与停止 | 哪些行为来自模型，哪些来自外围代码？ |
| 评价器 | 检查结果 | 是否依据实际产物或环境状态判断完成？ |

## 研究问题与代表论文

### 规划、工具与记忆

较长的任务容易暴露错误传播、信息丢失和恢复困难等问题。先找到第一处缺乏依据或错误的决策，再判断是否属于推理问题。[Reflexion](https://arxiv.org/abs/2303.11366) 将反馈写成后续尝试可用的记忆，不更新模型权重；[Voyager](https://voyager.minedojo.org/) 将 Minecraft 中的任务选择、代码修改与可复用技能库连接起来。记忆需要被恰当地检索与使用才可能帮助决策，存下更多文字本身不能证明效果更好。

### 多智能体的组织

多个 Agent 可以分工、检查结果，也可以模拟互动。[AutoGen](https://arxiv.org/abs/2308.08155) 研究可配置的角色与对话，[Generative Agents](https://arxiv.org/abs/2304.03442) 将个体记忆和规划与模拟小镇中的行为联系起来。阅读时需要判断：智能体之间的通信带来了什么，哪些收益仅来自额外调用或重复采样。在相近时间和计算约束下与简单系统比较，并检查成员是否重复彼此的错误。多 Agent 协作不要求使用强化学习。

### 轨迹数据与训练

轨迹可以包含观察、动作、工具结果与任务结局。[Toolformer](https://arxiv.org/abs/2302.04761) 生成、执行并筛选候选工具调用；[AgentTuning](https://arxiv.org/abs/2310.12823) 将交互轨迹与通用指令混合训练。阅读训练方法时，分清轨迹中哪些是模型预测目标、哪些由环境提供。数据如何选择、是否覆盖失败情形、任务之间是否重叠，与轨迹格式同样重要。

[Search-R1](https://arxiv.org/abs/2503.09516) 将搜索接入强化学习；[Agent Lightning](https://arxiv.org/abs/2508.03680) 衔接执行轨迹、训练与信用分配。通过奖励更新权重，与改变上下文或保存文字反馈，应当分别理解。策略学习的基础见[强化学习](rl.md)。

### 环境、评测与接口

[AgentBench](https://arxiv.org/abs/2308.03688) 包含操作系统、数据库等任务，并提供[环境代码](https://github.com/THUDM/AgentBench)；[WebArena](https://arxiv.org/abs/2307.13854) 提供可复现的网站任务；[SWE-bench](https://www.swebench.com/) 评估代码仓库中的问题修复。比较分数前，先了解任务成功的判定标准与环境重置流程。

接口也会影响能力。[SWE-agent](https://arxiv.org/abs/2405.15793) 研究文件查看、编辑与执行接口；[OpenHands](https://arxiv.org/abs/2407.16741) 将命令行、代码执行、浏览器和沙箱结合。效果改善可能来自更强的模型，也可能来自更好的接口，应分别检验。[相关笔记](blogs.md#chai)讨论评分与多 Agent 组织。

<a id="agent-projects"></a>

## 项目示例：应该观察什么

这些例子用于理解系统设计，不构成排名。可以结合文档或代码研究接口与执行轨迹；产品演示不等于有对照的比较。

### 编程 Agent

<div class="agent-project-grid">
<article class="agent-project"><h4><a href="https://openai.com/codex/">Codex ↗</a></h4><p>跟随一次编程任务，理解代码仓库的检索、文件修改与测试反馈。</p></article>
<article class="agent-project"><h4><a href="https://code.claude.com/docs/en/overview">Claude Code ↗</a></h4><p>观察终端工具、项目指令及执行结果怎样影响后续步骤。</p></article>
<article class="agent-project"><h4><a href="https://www.kimi.com/code/en">Kimi Code ↗</a></h4><p>比较终端与编辑器中代码搜索、修改和验证的接口。</p></article>
<article class="agent-project"><h4><a href="https://www.zcode.network/en/">ZCode ↗</a></h4><p>观察项目上下文，以及通过 AGENTS.md 提供的约定。</p></article>
<article class="agent-project"><h4><a href="https://pi.dev/">Pi ↗</a></h4><p>阅读轻量 Harness，理解文件工具、命令执行与扩展如何配合。</p></article>
</div>

### 个人、科研与领域 Agent

<div class="agent-project-grid">
<article class="agent-project"><h4><a href="https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/">Muse ↗</a></h4><p>研究个人 Agent 中的持续任务状态、应用连接与权限边界。</p></article>
<article class="agent-project"><h4><a href="https://openai.com/index/introducing-dots/">Dots ↗</a></h4><p>观察持续任务、用户偏好与云端执行怎样配合。</p></article>
<article class="agent-project"><h4><a href="https://github.com/NousResearch/hermes-agent">Hermes ↗</a></h4><p>从开源实现中理解跨会话记忆与可复用技能。</p></article>
<article class="agent-project"><h4><a href="https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep">ARIS ↗</a></h4><p>了解文献阅读、实验、分析与修改各环节的执行和审阅过程。</p></article>
<article class="agent-project"><h4><a href="https://www.antgroup.com/en/news-media/press-releases/1765779300000">蚂蚁阿福 / Ant A-Fu ↗</a></h4><p>观察健康助手怎样组织问题、报告、记录与服务入口。</p></article>
</div>

学习中怎样使用这些工具，见 [AI 工具](ai.md)与[论文阅读工作流](irene-workflow.md)。介绍系统组件的早期综述可读 [LLM Powered Autonomous Agents](https://lilianweng.github.io/posts/2023-06-23-agent/)；有了具体问题后，再查[论文列表](https://github.com/WooooDyy/LLM-Agent-Paper-List)或 [Agent 资料目录](catalog-directions.md#topic-21)。

## 怎样判断一篇 Agent 论文

先选定范围明确的研究主张，例如改善错误恢复、记忆、工具选择或协作。明确方法与基线中的模型、提示、权限、初始状态、重试和总预算。任务可预测时，简单的固定流程也是有价值的基线。

除总体成功率外，还要检查轨迹，区分决策错误、工具错误、环境故障、评分错误与人工干预。在相同尝试预算下报告完成情况、时间、调用、费用和失败。系统在最终消息中声称成功，不能替代对实际产物或环境状态的核查。

比较协议见[研究设计](research-methods.md)和[数据与评测](datasets.md)，执行记录与恢复见[研究工程](engineering.md)，不可信外部内容与越权测试见 [Agent 安全](responsible-ai.md#llm-agent-security)。
