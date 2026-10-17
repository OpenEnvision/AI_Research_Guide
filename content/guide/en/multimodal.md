# Multimodal models: images, language, and sound

Give a model an image and ask what the person on the left is holding. It must connect visual information to the question. Image–text retrieval asks whether an image and text match; visual question answering also requires an answer grounded in the image. Sound, video, and text can complement one another in other ways, too.

Multimodal models process information with different structures: spatial positions in images, acoustic and semantic content in speech, and events unfolding over time in video. Representing this information, aligning it, and combining it for a task are central research questions.

<a id="multimodal-learning"></a>

## Separate alignment, fusion, and generation

Start with embeddings and [language-model](llm.md) and [vision](vision.md) encoders. Then follow one image–text pair through a model: which representations are compared, which components exchange information, and which objective supplies the training signal?

| Concept | What it does | What it does not establish on its own |
| --- | --- | --- |
| Alignment | Makes related information comparable across modalities | A high matching score does not explain an image in words |
| Fusion | Combines information across modalities for a task | Receiving an image does not prove that an answer uses it |
| Conditional generation | Produces text, images, or other outputs given inputs | Fluent output does not guarantee grounding in the provided evidence |

A CLIP-style retrieval model scores image–text compatibility; a visual question-answering system must also produce or select an answer. To understand grounding, compare questions that genuinely require the image with ones answerable from text alone. Reading a chart additionally depends on reading labels and quantities; describing a video may depend on frame selection and temporal order. Be explicit about what each task requires, rather than treating all scores as measures of a single multimodal ability.

## Image–text matching and vision-language models

[CLIP](https://github.com/openai/CLIP) encodes images and text separately and compares them in a shared representation space, supporting retrieval and classification. A vision-language model must also connect image information to a language model to generate answers. [LLaVA](https://llava-vl.github.io/) uses visual instruction data to train this question-answering behavior.

There are several ways to connect an image encoder, a representation adapter, and a language model. BLIP-2 uses a Q-Former to extract information from visual features and pass it to a language model. [Hugging Face's VLM article](https://huggingface.co/blog/vlms) explains these components and training approaches. [Purshow's Encoder-Free analysis](blogs.md#purshow) examines the relationship between visual encoding, computational workloads, and parallel scheduling.

## Visual detail and information over time

Recognizing an image's main subject differs from answering questions about counts, positions, charts, or document details. Resolution, visual-token organization, and training data affect which information the model retains. Common associations in language can also influence an answer, leading it away from what the image actually shows.

Video understanding adds event order, motion, and longer time spans. Audio-video tasks require alignment among images, sound, and text. These questions connect spatial and temporal representations in [computer vision](vision.md) with context modeling in [language models](llm.md). See the [research Q&A](research.md#q44) for questions about testing these capabilities.

## Courses, papers, and related areas

The [multimodal LLM paper index](https://github.com/BradyFU/Awesome-Multimodal-Large-Language-Models) organizes models and work by topic. More courses, papers, and projects appear in the [multimodal catalog](catalog-directions.md#topic-15). Shared training prerequisites are covered in [foundations](basics.md).

Multimodal information can also condition generation and action. Text descriptions guide image generation; visual observations and language instructions guide robot actions. Continue to [generative models](generation.md) and [embodied AI](embodied.md).

## Design a testable multimodal study

- **Question and controls:** identify complementary information in each modality. Compare full inputs with text-only, image-only, or missing-modality baselines while controlling data, capacity, and training budget.
- **Evaluation:** inspect pairing, temporal alignment, conflicting inputs, OCR dependence, and languages. Use input perturbations or modality controls to check which information the model uses, and manually check a sample of answers and evidence.
- **Limits:** training on paired data does not mean every answer depends on the image. Language priors, leakage, and evaluator bias can affect measurement; one aggregate score does not explain cross-modal reasoning.

[Research design](research-methods.md) · [Data and evaluation](datasets.md)

For sound, use [audio and speech](advanced-topics.md#audio) to check sampling, segmentation, speakers, and text conventions. For judgments and preferences, define correctness, evidence, and preference separately with the [human-evaluation protocol](responsible-ai.md#human-evaluation).
