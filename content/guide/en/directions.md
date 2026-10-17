# AI research areas: tasks, evidence, and open questions

Choose an area by starting with a question you want to understand: what information is available, what should a system predict or do, and what would count as convincing evidence? The areas below overlap. A demonstration can spark a research question, but its data, assumptions, and evaluation determine what you can conclude.

## Understanding and generating content

- **[Large language models](llm.md)**: how models learn from text, and how data, training, and computation shape capability.
- **[Computer vision](vision.md)**: recognizing objects, locating them, and understanding scenes and 3D structure.
- **[Multimodal models](multimodal.md)**: connecting images, language, and other information to answer questions.
- **[Generative models](generation.md)**: learning distributions and producing text, images, audio, or other samples, with or without conditioning.

## Acting

- **[Agents](agent.md)**: giving models tools and environments, then observing how they complete tasks.
- **[Reinforcement learning](rl.md)**: learning from feedback to choose actions that shape what happens next.
- **[World models](world-model.md)**: learning predictive models of environment dynamics, sometimes conditioned on actions, for representation, planning, or control.
- **[Embodied AI](embodied.md)**: connecting perception and action to complete tasks in physical environments.

These areas overlap: robots can use vision, generative models, and RL, and agents can learn through RL too. Follow your question wherever it leads.

## Putting models to use

- **[Efficiency and systems](systems.md)**: understanding slow programs, limited GPU memory, and quality–latency–cost trade-offs.
- **[Interdisciplinary AI](ai4x.md)**: combining AI methods with scientific, medical, or engineering questions and their domain-specific evidence.

Each page introduces key concepts, suggests where to start, and points to further reading. For individual papers, see [selected papers](papers.md); for researchers’ perspectives, see [Lookout](lookout.md). Treat a course, benchmark, paper, and commentary as different kinds of sources: they explain a subject, define a test, present evidence, and offer an interpretation, respectively.

## Courses, papers, and people

The [research-area catalog](catalog-directions.md) includes Lumina, curated resource lists, courses, papers, and projects. Continue to the [lab directory](labs.md) to learn about the people working on these questions.

## Compare areas through tasks and evidence

Use this map to find a research problem. Its categories overlap. One question can involve representation learning, generation, decision-making, and systems. Your background and experimental budget matter more when choosing where to start than the name of the field.

| Area | Typical research question | Evidence to inspect when starting |
| --- | --- | --- |
| Language models and NLP | How do representations, data, adaptation, generation, and reasoning affect tasks? | Fixed tasks and prompts, baselines, contamination, and costs |
| Computer vision | How can we extract and use information from images, video, or 3D structure? | Splits, labels, resolution, class-level results, domain changes |
| Multimodal learning | How can modalities be aligned and combined to support tasks? | Unimodal controls, pairing quality, missing inputs, supporting evidence |
| Generative models | How can data distributions be modeled and generation controlled? | Quality, diversity, conditioning fidelity, sampling budgets |
| Agents | How can systems complete multi-step tasks with tools and environments? | Environment state, success, trajectories, retries, permissions |
| Reinforcement learning | How can feedback improve long-term decisions? | Interaction and tuning budgets, separate evaluation, return distributions |
| World models | How can prediction support representation, planning, and control? | Rollout error and closed-loop performance, evaluated separately |
| Embodied AI | How can perception and decisions produce physical actions? | Tasks, control conditions, interventions, generalization, transfer |
| AI systems | How can training and inference become more efficient under quality constraints? | Hardware, precision, throughput, latency distributions, resource use |
| Interdisciplinary AI | How can models answer questions with domain constraints? | Domain baselines, appropriate splits, measurement limits, external validation |

Each area page includes a section on designing a testable study, linked to [research methods](research-methods.md) and [datasets and evaluation](datasets.md). Paper cards introduce selected representative work; they are not exhaustive histories, systematic reviews, or importance rankings.

## Foundations and additional connections

AI research extends beyond large models and robotics. These topics can be research areas in their own right or foundations for the tasks above.

- **[Probabilistic Machine Learning · Kevin Murphy](https://probml.github.io/pml-book/)** — English textbooks for readers with probability, linear algebra, and basic ML. Study probabilistic modeling, inference, and learning. For one model, state the assumptions, work through a derivation, and run a small experiment rather than comparing scores alone.
- **[Machine Learning with Graphs · Stanford CS224W](https://web.stanford.edu/class/cs224w/)** — An English course requiring programming, probability, and linear algebra. Study graph representations and node-, edge-, and graph-level tasks. Compare simple graph features with a GNN under prescribed splits; see the [graph and time-series catalog](catalog-directions.md#topic-25).
- **[Time-series learning · sktime](https://www.sktime.net/)** — Official English documentation and examples for readers with Python, statistics, and ML. Explore forecasting and classification workflows. Compare appropriate seasonal or other simple baselines with backtesting that respects the prediction time; future information must not enter training features.
- **[Introduction to Causal Inference · Brady Neal](https://www.bradyneal.com/causal-inference-course)** — An English course and notes requiring probability. Study potential outcomes, causal graphs, confounding, identification, and estimation. Specify an intervention, assumptions, and identification conditions for one question. Predictive accuracy does not itself establish causation.
- **[Fairness assessment · Fairlearn](https://fairlearn.org/main/user_guide/assessment/index.html)** — Official English guidance requiring classification and statistics. Study disaggregated metrics and assessment assumptions. Document affected groups and metric trade-offs; one fairness score does not replace sociotechnical context.

These entry points were consulted on 2026-10-16. Courses guide study and documentation supports implementation; neither replaces original research evidence. Find additional topics in [MOOCs and structured courses](courses.md).

## Turn an area into a research question

Choose a task whose results you can inspect and formulate two or three candidate questions. For each, identify what is already known, which comparison or argument could resolve the uncertainty, and what data or mathematical assumptions it needs. Prefer a question you can evaluate with available support over a broad claim about an entire field. Empirical work may begin with a simple baseline; theoretical work may begin with a precise proposition and counterexamples.

If meaningful evaluation is still unclear, narrow the task or develop more domain knowledge. Consider interests, available feedback, permissions, and real budgets together. The [learning path](learning-path.md) sets out goals for each stage, and the [projects page](start.md) offers small experiments to get you started.


## Explore a specialized topic

[Specialized topics](advanced-topics.md) covers retrieval, recommendation, graphs, time series, causal inference, probabilistic modeling, audio and speech, 3D geometry, and learning theory. Each section connects preparation to baselines, experiments, and metric limits. Pair it with [research engineering](engineering.md) and [trustworthy and responsible AI](responsible-ai.md) to turn what you learn into research that others can inspect and assess.
