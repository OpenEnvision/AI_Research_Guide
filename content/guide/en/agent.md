# Agents: tools, feedback, and task execution

A model that explains an error and a system that opens a project, edits files, and checks the result solve different problems. An agent repeatedly observes an environment, chooses an action, and uses feedback to decide what to do next. Its behavior depends on the model and the program around it: tools, context, memory, permissions, and stopping rules.

<a id="agent-learning"></a>

## Where to start: follow one complete trajectory

Start with [language-model inference](llm.md), basic programming interfaces, and the difference between generated text and an executed action. You do not need to pretrain a model to understand how an agent system works. The Chinese [Hello Agents](https://github.com/datawhalechina/hello-agents) tutorial and English [Hugging Face Agents Course](https://huggingface.co/learn/agents-course/en/unit0/introduction) provide worked explanations.

Follow one example on the [ReAct project page](https://react-lm.github.io/). Separate the task, information available to the model, selected action, returned observation, and final state. A tool call is a request: an external program still has to validate and execute it. A stated plan is not evidence that those actions happened.

| Component | Its role | A useful reading question |
| --- | --- | --- |
| Model or policy | Selects a response or action | Which observations and instructions were available? |
| Tools and environment | Execute actions and return observations | What state can change, and what can fail? |
| Context and memory | Make information available across steps | What is retained, omitted, or retrieved incorrectly? |
| Harness or scaffold | Organizes calls, retries, limits, and stopping | Which behavior comes from the model, and which from surrounding code? |
| Evaluator | Checks the outcome | Is completion verified against an artifact or environment state? |

## Research questions and representative papers

### Planning, tools, and memory

Long tasks can expose error propagation, missing information, and poor recovery. Before attributing a failure to reasoning, find the first decision that was incorrect or unsupported by the available information. [Reflexion](https://arxiv.org/abs/2303.11366) turns feedback into written memory for subsequent attempts without updating model weights. [Voyager](https://voyager.minedojo.org/) connects task selection, code revision, and a reusable skill library in Minecraft. Memory helps only when the system retrieves and uses relevant information; storing more text does not by itself lead to better decisions.

### Multi-agent organization

Multiple agents can divide work, check results, or simulate interactions. [AutoGen](https://arxiv.org/abs/2308.08155) studies configurable roles and conversations; [Generative Agents](https://arxiv.org/abs/2304.03442) connects individual memory and planning with behavior in a simulated town. Ask what communication contributes beyond extra calls or repeated sampling. Compare with a simpler system under similar time and compute constraints, and inspect whether agents repeat one another's errors. Multi-agent coordination does not require reinforcement learning.

### Trajectory data and training

A trajectory can contain observations, actions, tool results, and outcomes. [Toolformer](https://arxiv.org/abs/2302.04761) generates, executes, and filters candidate tool calls; [AgentTuning](https://arxiv.org/abs/2310.12823) mixes interaction trajectories with general instructions. When reading a training method, identify which parts of a trajectory are model targets and which are supplied by the environment. Data selection, failure coverage, and task overlap matter as much as the format of a trace.

[Search-R1](https://arxiv.org/abs/2503.09516) integrates search with reinforcement learning; [Agent Lightning](https://arxiv.org/abs/2508.03680) connects execution traces to training and credit assignment. Distinguish changing weights using rewards from changing context or retaining written feedback. The underlying policy-learning concepts are introduced in [reinforcement learning](rl.md).

### Environments, evaluation, and interfaces

[AgentBench](https://arxiv.org/abs/2308.03688) includes operating-system and database tasks and provides [environment code](https://github.com/THUDM/AgentBench). [WebArena](https://arxiv.org/abs/2307.13854) supplies reproducible website tasks; [SWE-bench](https://www.swebench.com/) evaluates repository issue resolution. Before comparing scores, read how each benchmark defines success and resets its environment.

Interfaces also shape capability. [SWE-agent](https://arxiv.org/abs/2405.15793) studies file viewing, editing, and execution interfaces; [OpenHands](https://arxiv.org/abs/2407.16741) integrates a command line, code execution, browser, and sandbox. A stronger model and a better interface are different explanations for an improvement. [Chai's notes](blogs.md#chai) discuss scoring and multi-agent organization.

<a id="agent-projects"></a>

## Project examples: what to inspect

These examples illustrate different system designs; they are not a ranking. Use the linked documentation or code to study interfaces and traces; a product demonstration is not a controlled comparison.

### Coding agents

<div class="agent-project-grid">
<article class="agent-project"><h4><a href="https://openai.com/codex/">Codex ↗</a></h4><p>Follow repository exploration, editing, and test feedback through a coding task.</p></article>
<article class="agent-project"><h4><a href="https://code.claude.com/docs/en/overview">Claude Code ↗</a></h4><p>Inspect terminal tools, project instructions, and how execution results affect subsequent steps.</p></article>
<article class="agent-project"><h4><a href="https://www.kimi.com/code/en">Kimi Code ↗</a></h4><p>Compare the terminal and editor interfaces for code search, changes, and verification.</p></article>
<article class="agent-project"><h4><a href="https://www.zcode.network/en/">ZCode ↗</a></h4><p>Inspect project context and conventions supplied through AGENTS.md.</p></article>
<article class="agent-project"><h4><a href="https://pi.dev/">Pi ↗</a></h4><p>Read a lightweight harness to see how file tools, command execution, and extensions fit together.</p></article>
</div>

### Personal, research, and domain agents

<div class="agent-project-grid">
<article class="agent-project"><h4><a href="https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/">Muse ↗</a></h4><p>Study persistent task state, connected apps, and permission boundaries in a personal agent.</p></article>
<article class="agent-project"><h4><a href="https://openai.com/index/introducing-dots/">Dots ↗</a></h4><p>Examine how ongoing tasks, preferences, and cloud execution fit together.</p></article>
<article class="agent-project"><h4><a href="https://github.com/NousResearch/hermes-agent">Hermes ↗</a></h4><p>Inspect cross-session memory and reusable skills in an open-source implementation.</p></article>
<article class="agent-project"><h4><a href="https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep">ARIS ↗</a></h4><p>Trace execution and review across literature, experiments, analysis, and revision.</p></article>
<article class="agent-project"><h4><a href="https://www.antgroup.com/en/news-media/press-releases/1765779300000">Ant A-Fu ↗</a></h4><p>Examine how a health assistant organizes questions, reports, records, and service access.</p></article>
</div>

For ways to use these tools in your studies, see [AI tools](ai.md) and [paper-reading workflows](irene-workflow.md). For an early component-based overview, read [Lilian Weng's LLM Powered Autonomous Agents](https://lilianweng.github.io/posts/2023-06-23-agent/); use the [paper list](https://github.com/WooooDyy/LLM-Agent-Paper-List) or [agent catalog](catalog-directions.md#topic-21) once you have a specific question.

## How to assess an agent paper

Choose a narrow claim: better recovery, memory, tool selection, or coordination. Identify the model, prompt, permissions, initial state, retries, and total budget in both the method and baseline. A simple fixed workflow can be a valuable baseline when the task is predictable.

Inspect trajectories as well as aggregate success. Distinguish an incorrect decision from a tool error, environment failure, evaluator error, or human intervention. Report completion, time, calls, cost, and failures with the same number of allowed attempts. A claim of success in the final message cannot substitute for checking the resulting artifact or environment.

Use [research design](research-methods.md) and [data and evaluation](datasets.md) for comparison protocols, [research engineering](engineering.md) for execution records and recovery, and [agent security](responsible-ai.md#llm-agent-security) for untrusted external content and unauthorized-action tests.
