# World models: prediction, representation, and control

If a robot pushes an object, how will its position and state change? A world model learns aspects of environmental change from observations and actions. Its predictions may be future images or internal states that preserve task-relevant information, supporting simulated interaction, policy learning, or planning.

What a model needs to represent depends on how it will be used. Generating images requires visible detail; decisions also require information about the consequences of actions. Researchers ask what information to retain, how far ahead to predict, and how prediction errors affect downstream use.

<a id="world-model-learning"></a>

## What kind of prediction is needed?

First learn sequence prediction and the state, observation, policy, and return concepts in [reinforcement learning](rl.md). Then ask how a learned model enters the decision process:

| Use | What happens? | Evidence to look for |
| --- | --- | --- |
| Passive forecasting | Predict what follows a recorded history | Forecast error on new sequences and time horizons |
| Imagined policy learning | Train behavior on trajectories generated inside a model | Whether the resulting policy succeeds in the actual environment |
| Planning at decision time | Compare candidate actions through model predictions | Decisions and task outcomes at a stated planning budget |

A one-step predictor receives recorded history; a rollout repeatedly uses its own predictions as input, so it can drift into unfamiliar states. Planning can also favor actions whose consequences the model predicts incorrectly. Low average reconstruction error therefore need not identify the most useful model for control. For stochastic environments, distinguish uncertainty about possible outcomes from a model's lack of evidence about unfamiliar situations.

After an initial reading, you should be able to draw a diagram showing where observations and actions enter the system, and where model predictions stand in for real feedback.

## Representation, prediction, and control

[World Models](https://worldmodels.github.io/) combines visual compression, dynamics prediction, and control. A visual model maps images to compact representations, a dynamics model describes how they change, and a controller uses them to choose actions. Its racing and game demonstrations show these components working together.

A world model may predict pixels or operate in latent space. Pixel prediction represents visible scene changes; latent modeling uses training objectives to preserve useful information. Representation learning and sequence prediction are therefore part of modeling an environment.

## Learning from imagined trajectories and planning

[DreamerV3](https://danijar.com/project/dreamerv3/) produces imagined trajectories in a learned model to train policies and value estimates. MuZero learns decision-relevant latent states, rewards, and values and uses its model in search. Using a model to train a policy and using it to plan during action selection are different roles.

These approaches connect to policies, returns, and values in [reinforcement learning](rl.md). Prediction errors can accumulate across simulated steps; their effect on policy learning or search depends on how the model is used.

## Video simulation and interactive environments

Video models describe how images change over time; action-conditioned models connect those changes to actions. An interactive environment needs to maintain scene and state consistency under a sequence of actions. Robot environment models also involve objects, contact, and dynamics. See [generative models](generation.md) and [embodied AI](embodied.md).

## Projects and research resources

[Awesome World Models](https://github.com/JiahuaDong/Awesome-World-Models) organizes papers and projects. The [world-model catalog](catalog-directions.md#topic-17) includes classic work and surveys, and [Purshow's model-architecture notes](blogs.md#purshow) cover WAM and related topics.

## Design a testable world-model study

- **Question and controls:** specify prediction targets, horizons, action conditioning, and representations. Distinguish video prediction, state modeling, and models used for decisions. Compare direct policies, simple dynamics, or model-free baselines as appropriate.
- **Evaluation:** inspect one-step prediction, rollout error, uncertainty, and closed-loop decisions separately. Record data coverage, action distributions, planning budgets, and environmental changes; analyze error accumulation.
- **Limits:** coherent generated video alone does not show that a model captures the dynamics accurately or is useful for control. Claims that a model improves planning need evidence from tasks and decisions, not just visual examples.

[Research design](research-methods.md) · [Data and evaluation](datasets.md)

The [time-series route](advanced-topics.md#time-series) informs prediction protocols, but passive forecasting does not replace action-conditioned or closed-loop control experiments. Review geometric representations and coordinates through [3D vision](advanced-topics.md#geometry).
