# Datasets, benchmarks, and evaluation

A dataset provides the data. A benchmark also defines the tasks, splits, metrics, and protocols used to compare methods. Downloading the same data does not establish that two experiments are comparable. Define the research question and target setting before choosing data and evaluation methods.

The official resource pages and documentation below were consulted on **2026-10-16**. These are candidate learning and research resources, not guarantees of data quality, licensing scope, or continued availability. Check the original project for versions, permissions, access conditions, and task rules. See [research methods](research-methods.md) for the full experimental workflow.

## Choose a task before choosing data

| Task | Useful starting comparison | Conditions to define first |
| --- | --- | --- |
| Tabular classification or regression | Constant predictions, linear models, tree models | Observation unit, missing-value handling, group or temporal splits |
| Image classification, detection, segmentation | A simple model or public implementation at a specified input size | Classes, annotations, augmentation, pretraining data |
| Text classification and reading comprehension | Sparse-feature baselines, smaller pretrained models | Tokenization, truncation, labels, scoring scripts |
| Retrieval and RAG | Lexical versus dense retrieval; evaluate retrieval separately first | Corpus version, queries, relevance judgments, chunking, top-k |
| Language models and tool agents | A simple prompt or rule-based workflow on fixed tasks | Prompts, tool permissions, retries, budget, termination |
| RL and robotics | A simple controller, behavioral cloning, or a standard algorithm | Environment version, interaction budget, evaluation seeds, success criteria |

Start with manageable public data that you can inspect. Larger datasets should serve a research question; download size is not a contribution by itself.

## Discovering and loading data

- **[UCI Machine Learning Repository](https://archive.ics.uci.edu/)** — A source of tabular and other ML datasets for learning to describe data and build classification and regression models. Check each dataset's feature definitions, targets, citations, and license; these vary across the repository.
- **[OpenML documentation](https://docs.openml.org/)** — Connects data, tasks, workflows, and experimental runs. Record dataset IDs, task IDs, versions, and prescribed folds. Do not mix results on custom splits with results from a defined benchmark task.
- **[Hugging Face Datasets](https://huggingface.co/docs/datasets/en/index)** — A library for loading and processing text, vision, audio, and other data, integrated with the Hub. Pin repository revisions, configurations, splits, and preprocessing. Hosting does not imply a common license for all datasets.
- **[Torchvision Datasets](https://docs.pytorch.org/vision/stable/datasets.html)** — Interfaces for datasets including MNIST, Fashion-MNIST, and CIFAR, plus base classes for image data. Useful for small vision experiments. Distinguish versions of the data, loader, augmentation, and evaluator.
- **[TensorFlow Datasets](https://www.tensorflow.org/datasets/overview)** — Dataset builders and loading interfaces across tasks. Record the builder, configuration, version, and split. A data loader does not replace the original dataset's documentation and terms.

## Vision, language, speech, and graphs

- **[COCO](https://cocodataset.org/)** — Resources for detection, segmentation, keypoints, and captioning. Use task-appropriate annotations and official evaluation implementations. State the year, split, IoU thresholds, and prediction limits; AP50 and the main COCO AP are not interchangeable.
- **[ImageNet](https://www.image-net.org/)** — A source for image classification and representation learning. Identify the subset and challenge protocol and check access and usage terms. Beginners can learn the complete workflow on smaller data first.
- **[GLUE](https://gluebenchmark.com/)** — A multitask language-understanding benchmark; see the [original paper](https://arxiv.org/abs/1804.07461) for task definitions. Analyze individual tasks alongside aggregate scores. An aggregate does not establish general reliability in open environments.
- **[SQuAD](https://rajpurkar.github.io/SQuAD-explorer/)** — Passage-based reading comprehension, including unanswerable questions in SQuAD 2.0. Match the evaluator to the dataset version. Exact match and token F1 differ from factual accuracy in a real application.
- **[LibriSpeech / OpenSLR](https://www.openslr.org/12)** — Recordings of English speech read aloud, with transcripts, for studying speech recognition. Preserve training, development, and test splits; document text normalization, tokenization, and word error rate computation. Performance on speech read aloud does not directly establish performance on noisy conversations or other languages.
- **[Open Graph Benchmark](https://ogb.stanford.edu/)** — Graph-learning datasets, loaders, and evaluators for node-, edge-, and graph-level tasks. Follow prescribed splits and evaluation rules. Random, temporal, and cross-structure generalization are different questions.

## Retrieval, language models, and agents

- **[BEIR](https://github.com/beir-cellar/beir)** — Heterogeneous information-retrieval evaluation for comparing lexical and dense methods across datasets. Record the versions of the corpus, queries, and relevance judgments (qrels), and report results for each dataset. Judgments may be incomplete; unjudged does not necessarily mean irrelevant.
- **[MTEB](https://github.com/embeddings-benchmark/mteb)** — Evaluation tools for representation and retrieval tasks, including multilingual and multimodal tasks. Pin task sets and versions and verify input formats, instructions, and metrics. Different leaderboard aggregates or task versions are not directly comparable.
- **[SWE-bench](https://www.swebench.com/)** — A benchmark for resolving real software issues. Specify the variant, task set, execution environment, and resource budget. Passing the prescribed tests does not establish every aspect of software quality or security.

For RAG, record retrieval recall, evidence support, answer quality, and abstention separately. For agents, also record task success, failure types, tool calls, retries, and cost. A model used as a judge is a measurement instrument: compare a sample with human annotations and examine order, length, prompt, and language effects. See [research methods](research-methods.md) for controlled comparisons.

## Decision-making, robotics, and system performance

- **[Minari](https://minari.farama.org/)** — Standards and tools for offline-RL datasets containing trajectories. Inspect episodes, termination versus truncation, data-collection policies, and environment compatibility. Offline measurements and online returns answer different questions.
- **[Open X-Embodiment](https://robotics-transformer-x.github.io/)** — Robotic manipulation data and model research across platforms. Compare observation and action spaces, control frequencies, formats, and task definitions; trajectories from different robots are not automatically homogeneous samples.
- **[MLPerf Inference Datacenter](https://mlcommons.org/benchmarks/inference-datacenter/)** — Measures inference systems under specified tasks, quality requirements, and scenarios. Match versions, scenarios, quality targets, hardware, and software before comparing results. Throughput and latency are distinct and must be interpreted alongside quality constraints.

<a id="metrics"></a>

## Choosing and interpreting metrics

Consult the [scikit-learn evaluation documentation](https://scikit-learn.org/stable/modules/model_evaluation.html) and each benchmark's evaluator. For precision–recall curves, specify whether the score is [average precision (AP)](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.average_precision_score.html) or trapezoidal area, including implementation and interpolation rules. They are not interchangeable measures of PR-AUC. The questions below help you choose an appropriate metric; no single metric is best for every task.

Consider a hypothetical binary classification task with 100 cases, of which 10 are positive. A method finds 8, misses 2, and wrongly flags 18 of the 90 negatives. **Precision is 8/26 = 30.8%; recall is 8/10 = 80%; accuracy is 80/100 = 80%.** Predicting every case as negative would reach 90% accuracy while finding no positives. Which behavior is useful depends on the task and costs. Always name the positive class and inspect the counts before comparing scores.

| Task | Common metrics | Context that must accompany the score |
| --- | --- | --- |
| Imbalanced classification | Precision, recall, F1, PR-AUC; ROC-AUC where appropriate | Positive class, threshold, prevalence, macro/micro/weighted aggregation |
| Regression | MAE, RMSE, R² | Target units, outliers, data range, improvement over simple baselines |
| Probability prediction | Log loss, Brier score, calibration analysis | Probability quality differs from thresholded classification and ranking |
| Retrieval ranking | Recall@k, MRR, nDCG@k | Candidate corpus, relevance grades, cutoff k, query distribution |
| Detection and segmentation | AP, IoU, Dice | IoU thresholds, aggregation, small objects, rare classes |
| Text and image generation | Task metrics, reference or distribution measures, human evaluation | One automatic score cannot establish factuality, diversity, perceptual quality, and usefulness together |
| Decision-making and systems | Success, return, latency, throughput, resource use | Budget, failure handling, evaluation tasks, quality constraints |

Mean and standard deviation across random seeds describe run variability; they are not automatically a population confidence interval. Explain whether uncertainty concerns data sampling, training randomness, task selection, or annotations, and choose a unit of analysis that accounts for dependencies in the data.

## Data audit and permissions

Record the following before training. [Hugging Face Dataset Cards](https://huggingface.co/docs/hub/en/datasets-cards) provide a documentation reference. Use this checklist to guide your research documentation; verify the actual agreements and institutional requirements.

1. **Provenance and purpose:** creators, original source, collection process, intended uses, and excluded settings.
2. **Version and integrity:** download date, revision, checksums, filtering, and deduplication.
3. **Observations and labels:** sampling unit, label definitions, missingness, noise, annotation process, and representativeness.
4. **Splits and contamination:** group or temporal dependence, duplicates, train–evaluation overlap, and uncertainty about whether evaluation data appeared in foundation-model training.
5. **Permissions and privacy:** licenses, attribution, redistribution, personal information, and access controls. A code license does not automatically cover images, speech, text, or weights.
6. **Compute costs:** downloading, extraction, caching, preprocessing, storage, and full evaluation.

<a id="evaluation-record"></a>

## Understand how an evaluation was conducted

When inspecting a paper or preparing a report, look for these five elements and how they connect:

| Item | Why it matters |
| --- | --- |
| Task and target population | Defines what success and generalization mean |
| Data version and split rule | Identifies what was available for learning and evaluation |
| Selected system and budget | Includes preprocessing, prompts, tools, and tuning opportunities |
| Evaluator and raw outcomes | Lets readers check definitions, denominators, failures, and aggregation |
| Uncertainty and limits | Separates observed differences from broader claims |

See the [short decision record](research-methods.md#experiment-record) for an example of how these choices fit together. To practice, annotate one paper's evaluation and identify one missing detail. A project report can add per-class or per-task outcomes and representative failures. The number of baselines should follow the question, rather than a fixed quota. Once test results guide prompts, thresholds, or model choices, disclose that use and seek independent evaluation of the revised procedure.

## Continue

[Projects](start.md) · [Research methods](research-methods.md) · [Paper reading](reading.md) · [Courses](courses.md) · [Practice and competitions](practice.md) · [Research tools](catalog-research.md)
