# Selected papers and where to start

This selection introduces research questions, methods, and evidence across AI. It is a starting point, not a complete survey or a ranking. The [paper-reading chapter](reading.md) explains search, reading depth, and note-taking.

<a id="paper-selection"></a>

## Start with a question, then choose a paper

Choose a paper whose task you can explain and whose main figure you can begin to follow. If every sentence requires unfamiliar background, read a course chapter or illustrated explanation first; you can return to the paper with a more specific question.

| Starting question | A useful first paper | What to inspect |
| --- | --- | --- |
| Why can a deeper network fit its training data worse? | [ResNet](https://arxiv.org/abs/1512.03385) | The degradation problem, residual block, and comparison with plain networks |
| How does attention process a sequence? | [Attention Is All You Need](https://arxiv.org/abs/1706.03762) | Inputs and outputs, masks, and the translation setting |
| How does a language model act on external feedback? | [ReAct](https://react-lm.github.io/) | One complete action trace, the comparison methods, and a failure case |

The summaries below explain each paper's question, core idea, and limitations, with suggestions on what to read first. Publication years can refer to a conference, journal, or first preprint; consult the linked record for the version you cite. A historical result describes its own data and evaluation, rather than a current leaderboard position.

<!-- paper-library -->

<a id="paper-reading"></a>

## Compare your reading with an explanation

Before watching a detailed walkthrough, write a short account of the question, method, evidence, and one question that remains unresolved. Afterward, note which figure or assumption changed your interpretation. This helps you use the explanation to deepen your own reading.

[Mu Li's paper readings](limu.md) are in Chinese. His discussions of [Transformer](https://www.bilibili.com/video/BV1pu411o7BE/), [ViT](https://www.bilibili.com/video/BV15P4y137jb/), and [CLIP](https://www.bilibili.com/video/BV1SL4y1s7LQ/) also have Zhihu editions for [Transformer](https://www.zhihu.com/zvideo/1437034536677404672), [ViT](https://www.zhihu.com/zvideo/1449195245754380288), and [CLIP](https://www.zhihu.com/zvideo/1475706654562299904). For English Transformer explanations, use [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/) and [The Annotated Transformer](https://github.com/harvardnlp/annotated-transformer).

## Extend the list when your question requires it

For language-model transfer and adaptation, add [BERT](https://arxiv.org/abs/1810.04805) and [LoRA](https://arxiv.org/abs/2106.09685). Read their objectives and adaptation settings before comparing them with later systems.

Topic indexes collect more work: [agents](https://github.com/WooooDyy/LLM-Agent-Paper-List), [multimodal models](https://github.com/BradyFU/Awesome-Multimodal-Large-Language-Models), [world models](https://github.com/JiahuaDong/Awesome-World-Models), [embodied AI](https://github.com/TianxingChen/Embodied-AI-Guide), and [AI for Science](https://github.com/ai4s-research/awesome-ai-for-science). Use [Hugging Face Daily Papers](https://huggingface.co/papers) to discover recent work. Inclusion, popularity, or a large reading list does not establish the strength of a paper's evidence; read the original paper and compare it with closely related work.

[Research map](directions.md) · [Finding and reading papers](reading.md) · [Research-area catalog](catalog-directions.md)
