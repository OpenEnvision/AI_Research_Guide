# Generative models: objectives, sampling, and control

Generating an image from text, filling a masked region, or editing an image to follow a request requires learning a data distribution and incorporating conditions into generation. Research concerns how to train a model, sample from it, and control what it produces.

Images are just one type of output these models can generate. Related methods also produce video, audio, molecular structures, and action sequences. There may be several valid outputs; a model needs to represent that diversity and the spatial, temporal, or structural relationships within the data.

<a id="generation-learning"></a>

## Keep three design choices separate

Begin with probability distributions, expectations, gradients, and latent variables in [foundations](basics.md). Understand one training objective before comparing model families. For diffusion or flow matching, distinguish the following:

| Choice | Question | Examples |
| --- | --- | --- |
| Training objective | What should the network predict? | Noise, a clean sample, a score, or a velocity field |
| Representation and architecture | Where and how is that prediction computed? | Pixels or latent variables; a U-Net or a Transformer |
| Sampling procedure | How do predictions produce a sample at inference time? | Stochastic updates or numerical integration with a chosen step schedule |

DiT is an architecture, while flow matching describes a training approach; these names therefore do not identify mutually exclusive model families. The [flow-matching paper](https://arxiv.org/abs/2210.02747) explains the probability-path formulation. A different sampler can change speed without retraining the underlying network, but its compatibility depends on what the network predicts. Compare the entire path from training target to sampling update.

## Objectives and model architecture

Variational autoencoders (VAEs) describe data through latent variables and use variational inference during training. Generative adversarial networks (GANs) learn through competition between a generator and a discriminator. Diffusion models learn to predict denoising targets at different noise levels, then generate samples through a sequence of sampling steps. Flow matching learns a velocity field connecting noise and data, with samples obtained by numerical integration.

The training objective, the representation used for computation, and the network architecture are distinct design choices. Latent diffusion models (LDMs) perform diffusion in a compressed latent space and decode the result into an image. Diffusion Transformers (DiTs) process latent image patches with a Transformer. Conditioning information can guide content, layout, or style through these networks.

## Diffusion and flow matching

DDPM training constructs examples by adding noise to data; a network receives a noisy sample and a time step and predicts a target such as the added noise. Score-based methods learn gradients of log probability densities, connecting distributions at different noise levels with a sampling process. Flow matching uses a specified probability path to construct velocity targets and learn how samples move along that path.

[Lilian Weng's Diffusion Models](https://lilianweng.github.io/posts/2021-07-11-diffusion-models/) explains objectives and derivations. [Yang Song's Score-based Generative Modeling](https://yang-song.net/blog/2021/score/) develops generation through scores and stochastic differential equations. [MIT Flow Matching and Diffusion, 2025](https://diffusion.csail.mit.edu/2025/) covers ODEs/SDEs, probability paths, flow matching, and score matching, with code exercises. Probability, gradients, and differential equations play different roles in modeling, training, and sampling; revisit [mathematics](basics.md) as needed.

## Conditioning and sampling efficiency

Text, existing images, depth, or layouts can condition generation. A model must respond to those conditions while preserving sample quality. Local editing, detail preservation, and the interaction of several conditions each raise specific research questions.

A sampler determines how network predictions update a sample. Step counts, update rules, and randomness jointly affect speed and results. Latent compression reduces computation but changes how detail is represented. These trade-offs connect generation quality with computational efficiency.

[Diffusion Policy](https://diffusion-policy.cs.columbia.edu/) applies diffusion to action sequences, using visual observations to predict robot actions; see [embodied AI](embodied.md). Generative methods can also support environment prediction and interactive simulation, connecting them to [world models](world-model.md).

## Tutorials and technical articles

The [Hugging Face Diffusion Course](https://huggingface.co/learn/diffusion-course/unit1/1) combines explanations with code. [Jianlin Su's diffusion series](blogs.md#su) provides Chinese mathematical derivations, while [LoopDiT](blogs.md#chai) discusses model comparisons. More courses and projects appear in the [generation catalog](catalog-directions.md#topic-16).

## Design a testable generative-model study

- **Question and controls:** distinguish the effects of the objective, architecture, conditioning, and sampler. Record data, resolution, pretraining sources, sampling steps, guidance, and compute budgets.
- **Evaluation:** examine quality, diversity, conditioning fidelity, failures, and runtime. Distribution metrics depend on sample counts, feature extractors, and implementations. Human comparisons need documented tasks, blinding, and annotation protocols.
- **Limits:** visual sharpness, an automatic metric, and downstream usefulness support different claims. Avoid reporting only selected successes; use fixed seeds or a predefined example-selection rule.

[Research design](research-methods.md) · [Data and evaluation](datasets.md)

Review assumptions, likelihoods, and predictive checks through [probabilistic modeling](advanced-topics.md#probabilistic), and use [engineering](engineering.md) for training diagnosis and performance work. Document sampling procedures, scoring rubrics, and disagreements for [human evaluation](responsible-ai.md#human-evaluation).
