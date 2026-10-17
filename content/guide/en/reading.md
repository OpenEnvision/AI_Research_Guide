# Finding and reading papers

A literature review connects a question to the evidence already available. Use it to establish what is known, compare assumptions and methods, and identify what remains unresolved. Keep a record of the claims, supporting evidence, and questions that could guide your next experiment.

<h2 id="reading-overview">Understanding a field</h2>

Use a survey, course, or talk to get to know the main questions and terminology, then follow one question through foundational and later papers. Ask what prompted the work, what changed, and what remains unresolved. Author pages and technical blogs can reveal context, while specific findings should be checked in the original work.

You do not need an overview of every subfield before beginning. Choose a small set of papers connected by a question, and update your understanding as you read, discuss, or inspect implementations. You develop research judgment by comparing arguments and evidence, not simply by recognizing more paper titles.

## Finding papers and related work

<a id="research-map"></a>

When you are new to a topic, use surveys and courses to learn its vocabulary, then check methods and results in original papers. AI can suggest search terms, organize papers to consider, and explain terminology. **Verify titles, authors, versions, publication status, and specific claims against original papers and publication records.** A fluent summary does not replace reading the evidence.

[Google Scholar](https://scholar.google.com/) can help find later citations and related papers; a paper's references lead to the work it builds on. Author pages, project sites, and code repositories often include talks, demos, and updates. [Scholar help](https://scholar.google.com/intl/en/scholar/help.html) explains its search features, and [AMiner](https://docs.aminer.cn/user-guide/platform-overview/) also offers paper search and reading tools. See [targeted literature search](irene-workflow.md#search) for more approaches.


<a id="search-protocol"></a>

### Keep a search record you can update

1. **Write down your question and related search terms.** For retrieval failures, search the task name, retrieval failure, query reformulation, hard negatives, and terminology used in the application domain. Include abbreviations and terms from adjacent fields.
2. **Go from broad to specific.** Surveys map a field, foundational papers explain the original question, and recent work explores new settings. Look for studies that support, challenge, or attempt to reproduce earlier findings, rather than only papers that agree with your idea.
3. **Trace in both directions.** Follow references and later citations, then check author pages, proceedings, appendices, project sites, and code versions. Scholar supports quoted titles, `author:`, year filters, and citation tracing; see its [official search help](https://scholar.google.com/intl/en/scholar/help.html).
4. **Record your scope.** Note the date, databases, search queries, and reasons for including or excluding papers. A course project need not claim to be a systematic review: describe it as a focused investigation when that is what you conducted.

### Original papers, preprints, and peer review

Original papers report the authors' own methods, data, or analyses; surveys and blogs help explain the context. For a specific finding, trace it to the original work and read the corresponding result or argument.

A preprint may await peer review or coexist with a published version. [arXiv's official guidance](https://info.arxiv.org/help/moderation/index.html) distinguishes moderation from peer review. Check proceedings, journal pages, or a formal OpenReview decision and record the version you read. Being on arXiv does not establish that a paper is unpublished; acceptance does not establish independent reproduction. Methods and numbers can change between versions, so verify the version you cite.

<a id="reading-depth"></a>

## Reading depth

**How closely you read depends on what you want to understand.** For an introduction to a piece of work, focus on the problem, main method, and key results. To understand a field, compare the connections between papers. To reproduce or extend a method, look more closely at the architecture, equations, data, and experimental setup.

You can return to the same paper several times. Questions from a first reading may become clearer after seeing later work, the code, or an experiment. [Keshav's How to Read a Paper](https://cs.uwaterloo.ca/~brecht/courses/854-Experimental-Performance-Evaluation-2018/readings/common/how-to-read/keshav-paper-reading.pdf) describes a three-pass approach; [Mu Li's How to Read Papers](https://www.bilibili.com/video/BV1H44y1t75x/) also discusses reading order and depth.


### Decide what you want to take away from a paper

| Level | Question to answer | Output |
| --- | --- | --- |
| Locate | What is the task and main claim? Is it relevant? | One-sentence summary and inclusion/exclusion reason |
| Understand | How do inputs, assumptions, and method steps connect? | Your own diagram, notation list, and worked example |
| Evaluate | Is the comparison fair? How far does the evidence reach? | Claim–evidence table, limitations, alternative explanations |
| Reproduce | Can data, processing, configuration, and evaluation be mapped to code? | Fixed version, minimal command, unresolved differences |

You do not need to reproduce every paper you read. For a central equation, explain its variables and assumptions, then check dimensions, limiting cases, or a small example. If you cannot follow a derivation, note where you get stuck and consult the relevant background material or a collaborator.

<figure class="resource-figure medium"><a href="https://www.bilibili.com/video/BV1H44y1t75x/"><img src="../../../public/blog/guide/figures/uestc/reading/limu-reading.jpg" alt="Mu Li: How to Read Papers (in Chinese)" loading="lazy" width="800" height="450"></a><figcaption><a href="https://www.bilibili.com/video/BV1H44y1t75x/">How to Read Papers</a><span class="caption-dot">·</span>Mu Li · Chinese<span class="caption-dot">·</span><a href="https://www.zhihu.com/zvideo/1428973951632969728">Zhihu</a></figcaption></figure>

## Problems, methods, and experiments

The abstract, introduction, key figures, and conclusion give an initial picture of **what the authors did, why, and how**. The experiments show how the results support their claims. You can return to method details and unclear passages as you read further.

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

Use the paper's data flow to navigate its repository. Appendices, configurations, and issues may explain details absent from the main text. Code is evidence about an implementation, not an automatic guarantee that the implementation or paper is correct. Pin the version before investigating a difference.

### Map the paper to its implementation

Trace one example through raw files → splits and processing → model inputs → outputs and losses → postprocessing → metrics. Record paper locations, code files and functions, configuration keys, and the repository commit. Run a small batch first and inspect tensor shapes, label meanings, and metric direction. A program that runs successfully has not necessarily reproduced the paper's result. When paper and code differ, record the differences, their possible effects, and how you handled them. Do not speculate about the authors' reasons as though they were facts.

<a id="paper-notes"></a>

## Notes and reference management

[Zotero](https://www.zotero.org/support/quick_start_guide) stores paper metadata, PDFs, and annotations. Obsidian, Feishu, or Notion can hold your understanding, questions, and related material. Alongside what a paper says, it is useful to keep **why it caught your attention and what you have not yet figured out**, with relevant figures and locations in the original. The [paper and note workflow](irene-workflow.md#notes) includes Zotero and Obsidian setup and examples.

When several papers address the same question, bringing them together helps you compare their methods, experimental conditions, and unresolved problems. Those connections can change as your reading and experiments progress. [Research questions and related work](irene-workflow.md#depth) describes one way to organize them.


<a id="literature-matrix"></a>

### Compare papers using a literature matrix

Use one row per paper and the fields below. Write “not reported” or “unverified” for missing information rather than filling it with defaults.

| Field | Record |
| --- | --- |
| Identity and status | Title, authors, year, DOI/arXiv, version, formal publication record |
| Question and assumptions | Task, inputs/outputs, and conditions of the claim |
| Data and protocol | Data version, splitting unit, extra pretraining or retrieval |
| Method and baselines | Main change, strong baselines, reruns under comparable conditions |
| Results and costs | Metric definition, direction, variation, training and inference budgets |
| Limits and locations | Failures, untested scope, pages/figures/appendices |
| Your next step | Reusable code/data, differences to verify, testable questions |

When papers appear to disagree, first compare tasks, data, assumptions, evaluators, and budgets. Different conditions can explain different findings; do not average incompatible scores into a ranking or assume one result refutes the other. Record what a matched comparison would need to resolve. A survey's taxonomy is an organizing choice that can change with evidence.

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

Facts organized by AI still need references to the relevant passages in the original sources. Keep unsupported statements marked as unverified. Distinguish short quotations, your paraphrases, and your judgments. A reference manager preserves sources; research notes record how you reasoned from the evidence. Link them together.

<a id="reading-outputs"></a>

## Outputs to aim for

For your first paper, write one note covering the question, central claim, location of the evidence, and something you still do not understand. Add a literature matrix when comparing several works; add a paper-to-code map when implementation matters. These are options for different purposes, not four required documents for every paper.

Explain the paper to a peer and ask which link in the argument is still unclear. Let that gap guide what you read or check next. Continue with [experimental design](research-methods.md), or return to the [course map](courses.md) for a prerequisite that blocks understanding.

## Paper discussions and further reading

[Mu Li's paper readings](https://github.com/mli/paper-reading) discuss background, methods, experiments, and writing, often paragraph by paragraph. Videos on Transformer, ViT, and CLIP appear in [selected papers](papers.md#paper-reading); more courses and paper discussions are collected under [deep learning courses and paper readings](limu.md).

[Research methods and tools](catalog-research.md) · [Research experiences and conversations](research-conversations.md) · [Contact and collaboration](contact.md)
