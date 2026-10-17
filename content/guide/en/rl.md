# Reinforcement learning: learning from interaction

Some choices change what you can see and do next. A small reward now may cost a later opportunity in a game; a robot's action affects whether it can complete a task. RL studies how to learn actions through interaction and feedback.

A policy selects actions from the current observation, while value estimates describe the returns those choices may lead to. Games, robotics, and language-model post-training have different observations and actions, but each studies how feedback can improve a policy.

<a id="rl-learning"></a>

## First distinguish the learning setting

Start with a small Markov decision process, then work through returns and Bellman equations before moving on to value learning and policy gradients. [Spinning Up's key concepts](https://spinningup.openai.com/en/latest/spinningup/rl_intro.html) provides an English introduction. Expectation, conditional probability, and gradients are the main prerequisites; robotics and large language models are applications, not entry requirements.

| Distinction | Why it matters |
| --- | --- |
| State and observation | A state summarizes what determines future transitions; an observation may reveal only part of it, so history or memory may be needed. |
| Reward and intended goal | The optimized feedback can be an imperfect proxy for the behavior people want. |
| Online and offline RL | Online learning can collect further interactions; offline learning uses a fixed dataset with limited action coverage. |
| On-policy and off-policy | This concerns the relationship between the policy being improved and the policy that collected the data. Off-policy learning is not necessarily offline. |
| Termination and truncation | A terminal task state and an externally imposed time limit can require different value targets; see [Gymnasium's explanation](https://gymnasium.farama.org/tutorials/gymnasium_basics/handling_time_limits/). |

Do not confuse generating a long reasoning trace with learning a policy through rewards. Likewise, coordinating several LLM agents does not by itself constitute multi-agent RL.

## States, actions, rewards, and interaction

The environment provides an observation, the policy selects an action, and the environment changes and returns a reward. Return accumulates subsequent rewards to describe longer-term outcomes. The Chinese-language textbook [Hands-on Reinforcement Learning](https://hrl.boyuai.com/) introduces these concepts and common algorithms. [Gymnasium Basic Usage](https://gymnasium.farama.org/introduction/basic_usage/) shows the interaction interface for observations, actions, and rewards.

The reward definition determines which behaviors training encourages. Sparse rewards, delayed feedback, and exploration affect whether a policy discovers effective action sequences.

## Value estimation and policy optimization

Value learning estimates long-term return from a state or action. Policy gradients directly optimize a policy's expected return, while actor–critic methods combine value estimation with policy updates. DQN, PPO, and SAC use these ideas with different objectives and ways of using data.

Probability and expectation enter the return objective, and gradients update model parameters; see [mathematics and deep learning foundations](basics.md). [CleanRL](https://docs.cleanrl.dev/) provides implementations of common deep RL algorithms.

For a more detailed treatment, use [Berkeley's deep RL course](https://rail.eecs.berkeley.edu/deeprlcourse/). For another introduction in Chinese, see [Easy RL](https://github.com/datawhalechina/easy-rl).

## Research routes in reinforcement learning

Language models produce tokens, agents call tools, and humanoids control joints. These applications share algorithms but differ in data, environments, and evaluation. The routes below follow research questions; methods such as model-based and offline RL can also be used in robotics and other applications.

### Language-model post-training: improving responses through feedback

Once a model can generate text, how can it follow instructions or solve problems more reliably? RL can use a reward model trained on human preferences, or verifiable feedback from answers and program tests. The reward source and training method affect the resulting behavior. PPO uses mechanisms such as clipping to discourage excessively large policy updates. GRPO estimates advantages from the relative rewards of a group of responses, applying policy optimization to language-model training.

- [InstructGPT](https://arxiv.org/abs/2203.02155): follow demonstrations, preference comparisons, reward modeling, and policy optimization through the RLHF pipeline.
- [DeepSeekMath](https://arxiv.org/abs/2402.03300): introduces group relative policy optimization (GRPO); compare its group-based advantage estimates with value-model-based approaches.
- [DeepSeek-R1](https://arxiv.org/abs/2501.12948): examine rewards for reasoning and the different training pipelines of R1-Zero and R1.
- [verl](https://github.com/verl-project/verl): connect response sampling, reward computation, and policy updates to code. More model reports are on the [LLM page](llm.md).

### Agentic RL: learning to complete tasks over multiple turns

An action might search, run code, or operate an interface. Its result affects the next decision. Training must account for an entire interaction: which actions contributed to success, how errors accumulated, and whether tool use actually helped.

- [Search-R1](https://arxiv.org/abs/2503.09516): integrates search into reasoning and uses RL to learn when to retrieve and how to use results; see the [project code](https://github.com/PeterGriffinJin/Search-R1).
- [RAGEN](https://arxiv.org/abs/2504.20073): studies training stability, environment feedback, and policy learning in multi-turn interactions.

Trace a full trajectory: which text came from the model, which observations came from the environment, and when rewards arrived. Tool use and task execution are introduced on the [agents page](agent.md).

### Humanoid control: from simulation to real robots

Balancing, walking, motion tracking, and whole-body coordination require continuous control. Policies are often trained in simulation and transferred to hardware, where contact, latency, and dynamics differ. Examine observations, action representations, rewards, and how simulation is aligned with reality.

- [Humanoid-Gym](https://arxiv.org/abs/2404.05695): introduces simulation training and zero-shot sim-to-real transfer for humanoid locomotion.
- [ASAP](https://arxiv.org/abs/2502.01143): aligns simulated and real dynamics to learn agile whole-body skills.
- [Unitree RL Gym](https://github.com/unitreerobotics/unitree_rl_gym): follow robot configurations, training environments, and deployment code. For manipulation and VLA models, continue to [embodied AI](embodied.md).

### Model-based RL: predicting the consequences of actions

Learn how an environment changes under actions, then use that model to train a policy or plan. Predictions can be made in latent space without generating recognizable images. Distinguish learning a policy from imagined trajectories from searching over candidate actions during execution.

- [DreamerV3](https://arxiv.org/abs/2301.04104): learns a world model and trains behavior in imagined trajectories; follow the connection between model learning and policy learning.
- [TD-MPC2](https://arxiv.org/abs/2310.16828): learns a latent model for control and selects actions through model predictive control; compare its decision process with Dreamer's.

For broader work on prediction, video simulation, and interactive environments, see [world models](world-model.md).

### Offline RL: learning from existing interaction data

When real-world trials are expensive or only previously collected data are available, a policy must learn from a fixed dataset. Behavior cloning imitates recorded actions. Offline RL also uses rewards and long-term returns, while addressing unreliable value estimates when a policy moves beyond the data distribution.

- [CQL](https://arxiv.org/abs/2006.04779): uses conservative value estimation to reduce overoptimism about actions poorly covered by the data.
- [IQL](https://arxiv.org/abs/2110.06169): combines implicit value learning with advantage-weighted policy extraction, reducing reliance on values of out-of-distribution actions during training.

Check which policies collected the data, which behaviors they cover, and how improvements beyond the demonstrations are evaluated.

### Multi-agent RL: coordinating multiple decision-makers

When several agents act together, each may see only part of the environment while the others' policies also change. Cooperation, competition, communication, and credit assignment become central questions. A shared team reward makes individual contributions particularly hard to identify.

- [MAPPO](https://arxiv.org/abs/2103.01955): examines PPO in cooperative multi-agent tasks, including centralized value estimation and decentralized execution.
- [Official implementation](https://github.com/marlbenchmark/on-policy): compare local observations, global information, and individual actions to understand what information is available during training and execution.

LLM multi-agent systems also involve coordination; whether they use RL depends on whether their policies are trained through interaction rewards.

## Read a reward specification critically

Choose one published task and trace how each reward term encourages behavior. Ask what a policy could do to increase the score while missing the intended goal. Compare the reward curve with the authors' recorded trajectories and success definition; this reading exercise does not require training a policy.

## RL textbooks, implementations, and projects

Chinese textbooks, small environments, implementations, and advanced courses are in the [RL catalog](catalog-directions.md#topic-18). For robotics and control projects, see [labs](labs.md).

## Design a testable RL study

- **Question and controls:** specify environments, observations, actions, rewards, termination versus truncation, and online or offline settings. Match interaction and tuning budgets and available information, not just training epochs.
- **Evaluation:** keep evaluation separate from training and tuning. Record environment versions, training and evaluation seeds, episode counts, return distributions, and failures. Report interactions and actual compute costs; document normalization and aggregation across tasks.
- **Limits:** increasing reward does not necessarily improve intended behavior. Inspect reward design, exploitation, and generalization. Improvements observed with a few random seeds do not automatically transfer to other tasks or robots.

[Research design](research-methods.md) · [Data and evaluation](datasets.md)

Use [engineering](engineering.md) for training state, randomness, and distributed execution. Distinguish [lower training loss from better generalization](advanced-topics.md#theory) when making theoretical arguments. Reliability still depends on tasks, environment changes, and failure consequences.
