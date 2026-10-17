# Large language models: understanding, generation, and reasoning

The chat models you use every day raise several questions: how text becomes model input, what a model learns from data, how training choices change its answers, and how to tell whether it has improved.

Large language models learn representations and patterns for generating text. Instructions, examples, and context help them perform tasks such as question answering, summarization, and coding. Data, architecture, and training shape these capabilities; at inference time, context organization and the allocation of computation also become research questions.

<a id="llm-learning"></a>

## Where to start

Start with tokenization, embeddings, attention, and next-token cross-entropy; then connect a training batch to the text generated at inference time. Linear algebra, conditional probability, and backpropagation from [foundations](basics.md) are enough to begin. You can learn these ideas by working through a small model's diagrams and training objective; you do not need to train a large model.

Keep four operations separate when reading a paper:

| Operation | What changes? | What should you look for? |
| --- | --- | --- |
| Pretraining | Weights learn from a broad training corpus | Objective, data mixture, and compute |
| Fine-tuning or preference training | Weights are adapted using demonstrations or feedback | Data provenance, reward or preference definition, and what is updated |
| In-context learning | The current input supplies instructions or examples | Prompt format, example selection, and context length |
| Retrieval or tool use | External information enters the computation | Retrieval quality, source access, and how results affect the answer |

Next-token prediction defines a training objective; it does not guarantee factual answers. Attention mixes information from available positions; its weights alone do not establish why an answer is correct. Lower language-model loss on held-out data and better performance on a particular task are related, but they need to be measured separately.

## Tokenization, representations, and model architecture

A tokenizer converts text into a token sequence, which the model maps to vectors. The [Transformer](https://arxiv.org/abs/1706.03762) uses attention to combine information across positions. An autoregressive language model predicts the next token from the preceding context, while [BERT](https://arxiv.org/abs/1810.04805) learns bidirectional representations by predicting masked content. Architecture and training objectives affect both the representations learned and how the model can be used.

The [Hugging Face LLM Course](https://huggingface.co/learn/llm-course/chapter1/1) introduces models, tokenizers, data processing, and fine-tuning. [LLMs from Scratch](https://github.com/rasbt/LLMs-from-scratch) connects tokenization, attention, and language-model training to implementations. [CS224N](https://web.stanford.edu/class/cs224n/) develops language representations, neural methods, and NLP tasks. Revisit [foundations](basics.md) for the relevant mathematics and deep learning.

## Pretraining and scaling

Pretraining fits model parameters using large amounts of data. Data sources, quality, mixtures, model size, objectives, and compute budgets all affect what the model learns. Scaling research studies relationships between these factors and performance, including how smaller experiments can inform decisions about larger training runs.

[Stanford CS336, 2025](https://cs336.stanford.edu/spring2025/) covers language-model implementation and training, including tokenization, models, data processing, scaling, and systems, with implementation assignments. Jiaxuan Zou's Chinese essay on [pretraining and scaling as methodology and scientific perspective](https://jiaxuanzou0714.github.io/blog/2026/pretrain-scaling-methodology-scientific-perspective/) discusses scale, data, stability, and problem selection. His [scaling notes](blogs.md#zou) also cover experiment organization and extrapolation.

## Post-training and inference

Post-training uses demonstrations, preferences, or rewards to adjust model behavior. Instruction fine-tuning trains models to respond to requests; preference learning and reinforcement learning use comparisons or task feedback. [LoRA](https://arxiv.org/abs/2106.09685) changes how parameters are adapted, reducing the number of trainable parameters. Rewards, policy gradients, and optimization connect this area to [reinforcement learning](rl.md).

Here, inference means running a trained model; reasoning refers to a capability assessed on tasks. Inference research concerns context, search, verification, and compute allocation. The same model can generate multiple candidates, call external tools, or revise an answer using feedback, with different costs in time and computation. See [agents](agent.md) for tool interaction and [multimodal models](multimodal.md) for connections between images and language.

## Computation and further reading

Long contexts, caches, numerical precision, and hardware affect training and inference costs; see [efficiency and systems](systems.md). [Jianlin Su's Chinese technical articles](blogs.md#su) develop positional encodings and optimizer derivations. [Mu Li's Chinese paper discussions](https://github.com/mli/paper-reading) explain classic work in detail. More courses and projects appear in the [LLM catalog](catalog-directions.md#topic-14).

## Design a testable language-model study

- **Question and controls:** identify the factor under study—tokenization, data mixtures, adaptation, or inference strategy—and keep the other task, data, and compute conditions comparable. Separate pretraining, supervised fine-tuning, preference learning, and in-context learning; control components when multiple stages change.
- **Evaluation:** record model and data revisions, prompts, decoding, context length, answer extraction, and evaluators. Report task-level results, error types, and time or token costs. Check for overlap between training and evaluation data, and note when training exposure is unknown.
- **Limits:** fluency, instruction following, factuality, and reasoning correctness need different evidence. Fewer trainable parameters with LoRA do not imply proportional improvements in total memory, inference cost, or quality.

[Research design](research-methods.md) · [Data and evaluation](datasets.md)

Continue with [retrieval and evidence](advanced-topics.md#retrieval), and use [research engineering](engineering.md) to record tokenizer, model, data, and execution versions. [Responsible AI](responsible-ai.md) separates factuality, citations, privacy, and tool-boundary evaluation.
