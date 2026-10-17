# Finding and reading papers

Getting started in research may be closer than you think. While reading, building a project, or talking with others, **you come across a question that interests you or a possible improvement**. Following it through related work, trying things out, making sense of the results, and writing up what you find is how a research project begins to take shape.

<h2 id="reading-overview">Understanding a field</h2>

Research also brings you into contact with the wider field. Surveys, talks, and courses offer an overview; foundational papers and researchers' blogs help connect its development: **What prompted each piece of work? Why did the authors take that approach? What did it solve, and what did it change about our understanding?** These connections reveal different lines of research and the smaller areas within a broad field.

Some questions will catch your interest. Other work may offer a method, a dataset, or a useful explanation for your current project. As you keep reading, discussing, and experimenting, you develop your own judgment about **what is worth investigating, what remains unclear, and what to try next**. Research taste and ideas grow through this experience.

When a paper interests you, the authors' earlier and later work, homepage, blog, and talks are worth a look too. Following **the same question** across several papers can reveal reasoning that is hard to see in one article alone.

## Finding papers and related work

<a id="research-map"></a>

When you are new to a topic, use surveys and courses to learn its vocabulary, then check methods and results in original papers. AI can propose search terms, organize candidates, and explain terminology. **Verify titles, authors, versions, publication status, and specific claims against original papers and publication records.** A fluent summary does not replace reading the evidence.

[Google Scholar](https://scholar.google.com/) can help find later citations and related papers; a paper's references lead to the work it builds on. Author pages, project sites, and code repositories often include talks, demos, and updates. [Scholar help](https://scholar.google.com/intl/en/scholar/help.html) explains its search features, and [AMiner](https://docs.aminer.cn/user-guide/platform-overview/) also offers paper search and reading tools. See [targeted literature search](irene-workflow.md#search) for more approaches.


<a id="search-protocol"></a>

### Keep a search record you can update

1. **Write the question and its synonyms.** For retrieval failures, search the task name, retrieval failure, query reformulation, hard negatives, and terminology used in the application domain. Include abbreviations and terms from adjacent fields.
2. **Go from broad to specific.** Surveys locate research directions, foundational papers explain the original question, and recent work introduces new conditions. Seek supporting, conflicting, and reproduction studies, rather than only papers that agree with your idea.
3. **Trace in both directions.** Follow references and later citations, then check author pages, proceedings, appendices, project sites, and code versions. Scholar supports quoted titles, `author:`, year filters, and citation tracing; see its [official search help](https://scholar.google.com/intl/en/scholar/help.html).
4. **Record your scope.** Keep the date, databases, queries, and inclusion or exclusion reasons. A course project need not claim to be a systematic review: describe it as a focused investigation when that is what you conducted.

### Original papers, preprints, and peer review

Original papers report the authors' own methods, data, or analyses; surveys and blogs help explain the context. For a specific finding, trace it to the original work and read the corresponding result or argument.

A preprint may await peer review or coexist with a published version. [arXiv's official guidance](https://info.arxiv.org/help/moderation/index.html) distinguishes moderation from peer review. Check proceedings, journal pages, or a formal OpenReview decision and record the version you read. Being on arXiv does not establish that a paper is unpublished; acceptance does not establish independent reproduction. Methods and numbers can change between versions, so verify the version you cite.

<a id="reading-depth"></a>

## Reading depth

**How closely you read depends on what you want to understand.** For an introduction to a piece of work, focus on the problem, main method, and key results. To understand a field, compare the connections between papers. To reproduce or extend a method, look more closely at the architecture, equations, data, and experimental setup.

You can return to the same paper several times. Questions from a first reading may become clearer after seeing later work, the code, or an experiment. [Keshav's How to Read a Paper](https://cs.uwaterloo.ca/~brecht/courses/854-Experimental-Performance-Evaluation-2018/readings/common/how-to-read/keshav-paper-reading.pdf) describes a three-pass approach; [Mu Li's How to Read Papers](https://www.bilibili.com/video/BV1H44y1t75x/) also discusses reading order and depth.


### Choose an output for each reading purpose

| Level | Question to answer | Output |
| --- | --- | --- |
| Locate | What is the task and main claim? Is it relevant? | One-sentence summary and inclusion/exclusion reason |
| Understand | How do inputs, assumptions, and method steps connect? | Your own diagram, notation list, and worked example |
| Evaluate | Is the comparison fair? How far does the evidence reach? | Claim–evidence table, limitations, alternative explanations |
| Reproduce | Can data, processing, configuration, and evaluation be mapped to code? | Fixed version, minimal command, unresolved differences |

Every paper need not reach the reproduction level. For a central equation, explain its variables and assumptions, then check dimensions, limiting cases, or a small example. Keep an unresolved derivation as a question and consult prerequisite material or a collaborator.

<figure class="resource-figure medium"><a href="https://www.bilibili.com/video/BV1H44y1t75x/"><img src="../../../public/blog/guide/figures/uestc/reading/limu-reading.jpg" alt="Mu Li: How to Read Papers (in Chinese)" loading="lazy" width="800" height="450"></a><figcaption><a href="https://www.bilibili.com/video/BV1H44y1t75x/">How to Read Papers</a><span class="caption-dot">·</span>Mu Li · Chinese<span class="caption-dot">·</span><a href="https://www.zhihu.com/zvideo/1428973951632969728">Zhihu</a></figcaption></figure>

## Problems, methods, and experiments

The abstract, introduction, key figures, and conclusion give a first view of **what the authors did, why, and how**. The experiments show how the results support their claims. You can return to method details and unclear passages as you read further.

<a id="claims-evidence"></a>

If the authors attribute an improvement to a module, look at whether the ablation isolates that change. If they claim generalization to new settings, examine how the test settings relate to the training data. When comparing papers, differences in **tasks, data, and compute** matter alongside differences in methods. Questions that arise while reading can lead to a discussion, or you can [ask AI to question your explanation](ai.md#grill-me).


### Match claims to evidence

| Claim | Evidence to look for | Alternative explanation to check |
| --- | --- | --- |
| A module helps | An ablation with other conditions and budgets controlled | More parameters, training, or tuning opportunities |
| Greater efficiency | Time, memory, calls, or tokens at comparable quality | Different hardware, batching, caching, or implementation |
| Better generalization | New entities, periods, or domains with a clear relation to training data | Near duplicates or shared subjects across splits |
| Greater robustness | Defined perturbations, subgroups, and failure rates | Favorable perturbations or differences hidden by averages |

This table is a suggested reading tool. It follows the [NeurIPS checklist's principle of matching claim scope to evidence](https://neurips.cc/public/guides/PaperChecklist). **Mark an untested comparison as unknown; an unreported result does not establish failure.** See [research methods and experimental design](research-methods.md) for the next step.

<a id="paper-code"></a>

## Papers and code

A paper's repository can contain many files, and individual implementations may be hard to follow at first. Use the architecture and design in the paper as a guide: **trace how data moves through the program, then how training and inference work**. The overall structure becomes easier to understand. AI can work with the paper and repository to help you find the relevant implementation and explain how the parts connect and why they are written that way.

When reproducing a result, data processing, training configuration, and evaluation often become clearer through the code. Some details that affect the results are absent from the main text; **appendices, configuration files, and repository issues** often fill in the gaps.


### Map the paper to its implementation

Trace one example through raw files → splits and processing → model inputs → outputs and losses → postprocessing → metrics. Record paper locations, code files and functions, configuration keys, and the repository commit. Run a small batch first and inspect tensor shapes, label meanings, and metric direction. A completed program is not sufficient evidence of reproduction. When paper and code differ, record the facts, possible effects, and your chosen treatment without inventing the authors' explanation.

<a id="paper-notes"></a>

## Notes and reference management

[Zotero](https://www.zotero.org/support/quick_start_guide) stores paper metadata, PDFs, and annotations. Obsidian, Feishu, or Notion can hold your understanding, questions, and related material. Alongside what a paper says, it is useful to keep **why it caught your attention and what you have not yet figured out**, with relevant figures and locations in the original. The [paper and note workflow](irene-workflow.md#notes) includes Zotero and Obsidian setup and examples.

When several papers address the same question, bringing them together helps you compare their methods, experimental conditions, and unresolved problems. Those connections can change as your reading and experiments progress. [Research questions and related work](irene-workflow.md#depth) describes one way to organize them.


<a id="literature-matrix"></a>

### Compare a question with a literature matrix

Use one row per work and the fields below. Write “not reported” or “unverified” for missing information rather than filling it with defaults.

| Field | Record |
| --- | --- |
| Identity and status | Title, authors, year, DOI/arXiv, version, formal publication record |
| Question and assumptions | Task, inputs/outputs, and conditions of the claim |
| Data and protocol | Data version, splitting unit, extra pretraining or retrieval |
| Method and reference | Main change, strong baselines, fair reruns |
| Results and costs | Metric definition, direction, variation, training and inference budgets |
| Limits and locations | Failures, untested scope, pages/figures/appendices |
| Your next step | Reusable code/data, differences to verify, testable questions |

Do not combine scores from different data versions, evaluators, or inference budgets into one ranking. Identify incompatible conditions before deciding whether to rerun under a shared protocol. A survey's taxonomy is also an organizing choice that can change with evidence.

### A verifiable reading note

```text
Paper identifier / version read / reading date:
Why I read it:
One-sentence question and main conclusion:
Authors' explicit claim: [page, section, figure/table]
Supporting experiment or argument: [setup, control, result location]
Data, model, budget, and evaluation protocol:
My interpretation: [separate from the authors' statements]
Unresolved: [missing details, alternative explanations, code differences]
Actionable next step: [minimal reproduction, control, precise author question]
Original source and license for quotations or adapted figures:
```

AI-organized facts also need original locations. Keep unsupported statements marked as unverified. Distinguish short quotations, your paraphrases, and your judgments. A reference manager preserves sources; research notes record how you reasoned from the evidence. Link them together.

<a id="reading-outputs"></a>

## Outputs to aim for

For a specific question, produce a search record, a literature matrix, a claim–evidence note for a central paper, and a paper-to-code map. Identify one unresolved question and the experiment that could change your judgment. The appropriate amount of reading depends on scope; peer-verifiable outputs matter more than a paper count. Continue with a [practice project](practice.md) or [experimental design](research-methods.md), and use the [course map](courses.md) for missing foundations.

## Paper discussions and further reading

[Mu Li's paper readings](https://github.com/mli/paper-reading) discuss background, methods, experiments, and writing, often paragraph by paragraph. Videos on Transformer, ViT, and CLIP appear in [selected papers](papers.md#sec-1); more courses and paper discussions are collected under [deep learning courses and paper readings](limu.md).

[Research methods and tools](catalog-research.md) · [Research experiences and conversations](research-conversations.md) · [Contact and collaboration](contact.md)
