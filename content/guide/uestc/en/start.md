# Your first AI project: from a baseline to reproducible results

Aim for a small experiment you can explain, compare, and rerun. Choose a task whose data and errors you can inspect before deciding whether it needs a neural network. The core routes below require no API key, cloud model, GPU, or robot hardware. After downloading public dependencies or data, you can work locally.

## Learning objectives and a shared workflow

A completed project should explain its task and data, justify its baseline, identify what training changed, establish independent evaluation, locate failures, and show someone else how to reproduce it. Fill gaps with [foundations](basics.md); use the [learning path](learning-path.md), [courses](courses.md), and [practice](practice.md) for a systematic sequence.

1. **Data:** define inputs, targets, observation units, provenance/license, and splits. Inspect labels, duplicates, and missing values. Split before fitting preprocessing.
2. **Baseline:** run a constant predictor, keyword rule, or simple linear model and verify metric calculations.
3. **Training:** fix a configuration and save parameters, seeds, data versions, and logs. Change one main factor at a time.
4. **Evaluation:** select on validation data; lock the protocol before testing. Split related observations by group and forecasting data by time.
5. **Error analysis:** retain successes and failures; slice by class, length, scene, or source. A successful screenshot is insufficient.
6. **Reproduction:** rerun in a fresh directory and retain code, dependency versions, configuration, metrics, and a short report. Document discrepancies and possible causes.

The project designs and controls are **suggested exercises from this guide**, rather than promised results from the linked tutorials. Plan around an ordinary CPU computer with roughly 8 GB RAM, small datasets, sparse features, and small models. Actual memory and time depend on hardware, versions, and configuration. Set a per-run budget, such as a 30-minute stopping limit; reduce scale and document the change if it is exceeded. Do not assume free GPUs or uninterrupted cloud quotas.

| Level | Route | Minimum result |
| --- | --- | --- |
| A: basic Python | [Digit classification](#project-mnist), [tabular regression](#project-tabular) | Fixed splits, baseline, metrics, error analysis |
| B: ML evaluation | [Document retrieval](#project-retrieval), [tool agent](#project-agent) | Labeled queries/tasks, controls, traceable outputs |
| C: training loops | [Character language model](#project-language-model), [object detection](#project-yolo) | Small-scale training or local inference, cost records, ablations |
| D: direction exploration | [Robot data](#project-robotics) | Data checks, time-series baseline, scope limits |

<a id="project-mnist"></a>

## A1. Digit classification: complete the experimental loop on a CPU

**Task and data.** Predict a digit from 0 to 9. Begin with scikit-learn's bundled [digits dataset](https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_digits.html): 1,797 images at 8×8 pixels, **distinct from 28×28 MNIST**. The official [digit-classification example](https://scikit-learn.org/stable/auto_examples/classification/plot_digits_classification.html) demonstrates loading, flattening, fitting, and a confusion matrix.

- **Prerequisites and baseline:** understand arrays and train/validation/test splits. Begin with majority-class predictions, then scaling plus logistic regression. Fit scaling only on training data.
- **Training and control:** fix stratified splits and compare logistic regression with an SVM or small MLP. Tune on validation data; do not repeatedly reuse the official example's test set for selection.
- **Metrics:** accuracy, macro-F1, class counts, and a confusion matrix. Display errors and distinguish difficult examples from label/preprocessing problems.
- **Resources:** bundled digits is a CPU starting point without external services. Cap MLP width, epochs, and search trials; record actual elapsed time.
- **Deliverables:** split indices, runnable script, prediction CSV, metrics table, and at least ten errors, or all errors if fewer exist. Explain whether additional model complexity earns its cost.

For an extension, use [torchvision MNIST](https://docs.pytorch.org/vision/stable/generated/torchvision.datasets.MNIST.html). Start with a fixed training subset and compare an MLP with a small CNN on identical splits. Reserve its official test set until the method is fixed. The original MNIST illustration and attribution below are retained; they do not depict the bundled digits data above.

<figure class="resource-figure wide"><a href="https://en.wikipedia.org/wiki/MNIST_database" target="_blank" rel="noopener"><img src="../../../public/blog/guide/figures/uestc/intro/mnist.png" alt="MNIST handwritten digits" loading="eager"></a><figcaption><a href="https://en.wikipedia.org/wiki/MNIST_database" target="_blank" rel="noopener">MNIST handwritten digits</a> <span class="caption-dot">·</span> <a href="https://www.kaggle.com/competitions/digit-recognizer/overview" target="_blank" rel="noopener">Kaggle</a></figcaption></figure>

[Kaggle Digit Recognizer](https://www.kaggle.com/competitions/digit-recognizer/overview), its [Data](https://www.kaggle.com/competitions/digit-recognizer/data) page, and its [Code](https://www.kaggle.com/competitions/digit-recognizer/code) page are optional competition resources, subject to the platform's access and execution conditions. A submission is not required and cannot replace local validation. For network intuition, use [3Blue1Brown](https://www.3blue1brown.com/lessons/neural-networks/); for training loops, use [PyTorch Basics](https://docs.pytorch.org/tutorials/beginner/basics/intro.html). Its example uses FashionMNIST, another distinct dataset.

<a id="project-tabular"></a>

## A2. Tabular regression: inspect the data before adding complexity

**Task and data.** Predict the documented continuous target in [scikit-learn diabetes](https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_diabetes.html), with 442 examples and ten features. Use `load_diabetes(scaled=False)` and fit preprocessing within training folds. This is an educational statistical dataset. Conclusions apply to this dataset and protocol; the exercise is not a medical prediction tool.

- **Prerequisites and baseline:** understand means, variances, and regression. Use the training-target mean in `DummyRegressor`, then a ridge-regression Pipeline with scaling fitted within training folds.
- **Training and control:** reserve an outer test set and select regularization through cross-validation on the remaining data. Optionally compare a depth-limited tree. Use identical folds and comparable tuning budgets, rather than selecting a winner on the small test set.
- **Metrics:** MAE, RMSE, residual plots, test sample count, and variation across folds. RMSE emphasizes large errors; R² may be negative. The bundled dataset has specific default scaling, so this exercise explicitly uses `scaled=False` and documents its own preprocessing.
- **Resources:** CPU, hundreds of rows, no pretrained weights or cloud training. Cap tree depth and hyperparameter candidates.
- **Deliverables:** field descriptions, splits, configuration, cross-validation/test results, and residual analysis. In a fresh directory, check that Pipeline scaling is fitted within each training fold and that test data only receives the fitted transformation.

<a id="project-retrieval"></a>

## B1. Document retrieval: evaluate the retrieval component of RAG first

**Task and data.** Return relevant passages and sources from 30–100 passages of your own course notes. Write about 40 queries with relevant passage IDs; group near-duplicate question forms before splitting development/test queries. The fixed document collection is the searchable corpus. Keep test relevance labels out of tuning.

- **Prerequisites and baseline:** understand strings, sets, and metrics. Rank by keyword overlap, then compare [scikit-learn TF-IDF](https://scikit-learn.org/stable/modules/feature_extraction.html#text-feature-extraction) with cosine similarity. For Chinese, explicitly consider character n-grams rather than silently applying English-oriented tokenization.
- **Training and control:** fit TF-IDF on the fixed document collection. Compare two chunk lengths or word/character features using development queries, then lock the test configuration. No generative-model training is required.
- **Metrics:** Recall@k, the fraction of labeled relevant passages retrieved; MRR, the mean reciprocal rank of the first relevant result; and query latency. State k, treatment of unanswerable queries, and limits of annotation coverage.
- **Resources:** CPU, a small corpus, and sparse matrices. Limit total text and feature count. No vector database, API key, or large embedding-model download is necessary.
- **Deliverables:** corpus manifest, labels/splits, per-query rankings/scores/sources, metrics, and error categories. Separate chunking failures, vocabulary mismatch, ambiguous relevance, and genuinely unanswerable questions.

Returning source passages completes this **retrieval project**, rather than a complete generative RAG system. As an extension, add a local generator that fits your hardware and separately evaluate retrieval recall, answer correctness, and citation support. Fluent answers do not prove good retrieval. Instructions in retrieved documents must not become tool permissions or executable commands.

<a id="project-agent"></a>

## B2. A tool agent: make actions and feedback inspectable

**Task and data.** Build a tool loop operating only on local test data: read a task, choose a calculator or note retriever, inspect the result, then answer or stop. Write about 50 tasks covering normal input, missing answers, invalid parameters, and out-of-scope requests. Group by template before development/test splitting.

- **Prerequisites and baseline:** understand functions, exceptions, JSON, and simple state machines. Begin with single-step rule routing. Add failure handling, a three-call maximum, and an explicit stopping state to the loop policy.
- **Training and control:** begin with a rule policy and no language model. Compare single-step/multistep policies and parameter validation on/off. If fitting a local intent classifier, use only the development side's training data and hold out test templates. This is an entry exercise in tool control; it does not reproduce LLM-agent reasoning.
- **Metrics:** task success under written answers/tolerances, invalid-call rate, average calls, and budget-exceedance rate. Include failed tasks in the denominator.
- **Resources:** Python's standard library and local retrieval suffice on a CPU. Disable arbitrary shell/network access. A calculator should allow only specified arithmetic operations and cap expression length, number size, and steps. Do not `eval` user input. The [Python AST documentation](https://docs.python.org/3/library/ast.html) explains syntax trees; parsing alone is not a security sandbox.
- **Deliverables:** tool input/output schemas, task splits, a grader, and complete traces showing task, action, arguments, result, and stopping reason. Fix external state so repeated runs are comparable.

The [Hugging Face Agents Course](https://huggingface.co/learn/agents-course/en/unit0/introduction) and [Hello Agents](https://github.com/datawhalechina/hello-agents) are continuations for model-driven tool use. Check model, dependency, account, and compute requirements before selecting an example. The core exercise above does not depend on online models.

<figure class="resource-figure medium"><a href="https://huggingface.co/learn/agents-course/en/unit0/introduction" target="_blank" rel="noopener"><img src="../../../public/blog/guide/figures/uestc/intro/hf-agents.jpg" alt="Hugging Face Agents Course" loading="eager"></a><figcaption><a href="https://huggingface.co/learn/agents-course/en/unit0/introduction" target="_blank" rel="noopener">Hugging Face Agents Course</a></figcaption></figure>

The authors' [ReAct project](https://react-lm.github.io/) illustrates language-model reasoning/actions alternating with environment feedback. Distinguish a rule baseline from a model policy when comparing them; continue to [agents](agent.md).

<a id="project-language-model"></a>

## C1. Character language modeling: from counts to a small network

**Task and data.** Generate strings with character statistics similar to a training list. Use the author's [Zero to Hero](https://karpathy.ai/zero-to-hero.html) and [makemore README](https://raw.githubusercontent.com/karpathy/makemore/master/README.md). Retain provenance for its example name data, or use your own short word list. Deduplicate and split whole entries before creating context windows.

- **Prerequisites and baseline:** understand conditional probability, cross-entropy, and training loops. Begin with a smoothed character-bigram count model. Define boundary symbols, vocabulary, and unknown-character handling.
- **Training and control:** implement a short-context MLP with a small subset and hidden layer. Fix data, vocabulary, evaluation windows, and update budget before comparing context length or width. A Transformer is an optional extension.
- **Metrics:** held-out mean negative log-likelihood per character and perplexity under the same tokenization/boundary conventions. Retain samples and measure duplication against training entries. Perplexities with different tokenizers or preprocessing are not directly comparable.
- **Resources:** begin on a CPU, for example with at most tens of thousands of characters, a short context, and fewer than roughly 100,000 parameters. Measure one batch's speed and memory before choosing training steps. These are suggested scales; runtime must be measured.
- **Deliverables:** provenance/splits, learning curves, baseline/network metrics, seeded samples, parameter count, and elapsed time. Name-like strings and language understanding support different conclusions.

<a id="project-yolo"></a>

## C2. Object detection: measure local inference before deciding to train

**Task and data.** Locate supported object classes in photos you have permission to use. Select one officially supported small pretrained detector and run it locally on a CPU using [Ultralytics Quickstart](https://docs.ultralytics.com/quickstart). Record the exact model file and software versions; a moving “latest” model name cannot define a future reproduction.

<figure class="resource-figure wide"><a href="https://docs.ultralytics.com/tasks/detect/" target="_blank" rel="noopener"><img src="../../../public/blog/guide/figures/uestc/intro/yolo-detection.png" alt="Ultralytics · Object Detection" loading="eager"></a><figcaption><a href="https://docs.ultralytics.com/tasks/detect/" target="_blank" rel="noopener">Ultralytics · Object Detection</a></figcaption></figure>

- **Prerequisites and baseline:** understand classification versus detection and IoU. Fix a pretrained model/configuration and annotate an independent small evaluation set. State whether it might overlap the pretraining data.
- **Training and control:** begin without training. Compare a confidence threshold or input resolution, select settings on development images, and evaluate test images once the protocol is fixed. Label this an inference experiment. Consider fine-tuning only after planning resources and separate train/validation/test sets.
- **Metrics:** follow the [official validation documentation](https://docs.ultralytics.com/modes/val) for precision, recall, mAP50, mAP50–95, and per-image latency. State classes, IoU conventions, sample counts, and hardware. Precision/recall at a confidence threshold differ from AP aggregated over thresholds.
- **Resources:** try a small model and a few static images on a CPU. Weights require download/storage space. Budget videos and training separately; real-time performance and free GPUs are not guaranteed.
- **Deliverables:** annotations/license, splits, predicted boxes, metrics/timing procedure, and slices for occlusion, small objects, misses, and false positives. Visualizations alone are not quantitative performance evidence.

[COCO8](https://docs.ultralytics.com/datasets/detect/coco8) contains only eight images. It can check data formatting and the [training/validation pipeline](https://docs.ultralytics.com/modes/train), but cannot support a reliable model-performance comparison. The original [Colab tutorial](https://docs.ultralytics.com/integrations/google-colab) remains an optional execution environment, subject to actual quota and hardware availability. Continue to [computer vision](vision.md).

<a id="project-robotics"></a>

## D. Robotics: understand demonstrations before buying hardware

The [ACT / ALOHA](https://tonyzhaozh.github.io/aloha/) videos illustrate learning manipulation from human demonstrations. [LeRobot documentation](https://huggingface.co/docs/lerobot/index) and [code](https://github.com/huggingface/lerobot) provide robot-data and learning tools.

<figure class="resource-figure robot"><a href="https://tonyzhaozh.github.io/aloha/" target="_blank" rel="noopener"><img src="../../../public/blog/guide/figures/uestc/intro/aloha.jpg" alt="ACT / ALOHA" loading="eager"></a><figcaption><a href="https://tonyzhaozh.github.io/aloha/" target="_blank" rel="noopener">ACT / ALOHA</a></figcaption></figure>

- **Task and data:** select a few complete episodes from a public demonstration dataset. Inspect images, states, actions, timestamps, units, coordinate frames, and control frequency. Retain provenance, license, and version.
- **Prerequisites and baseline:** understand time series and regression. Plot actions first. Where continuous-action semantics permit it, use the preceding action as a next-step prediction baseline.
- **Training and control:** split by complete episode and fit a small linear next-action predictor. Compare one state frame with a short history. Do not randomly distribute adjacent frames from the same trajectory across training and test sets.
- **Metrics:** report per-action-dimension MAE with units and a baseline comparison. This is offline prediction error; **it does not substitute for closed-loop task success or safety evaluation**.
- **Resources and deliverables:** read a small subset and fit a small regressor on a CPU, budgeting image/video decoding and download space. Retain a field dictionary, episode splits, plots, errors, and limitations. Simulation policy training, real control, and hardware experiments are later resource stages; see [embodied AI](embodied.md).

## How to reduce a failing problem

| Symptom | Investigation order |
| --- | --- |
| Dependency installation or download fails | Retain the complete error, check official version/path requirements, and try bundled data before changing the entire framework |
| Training loss stalls or becomes NaN | Check labels, ranges, output/loss compatibility, and gradients; fit a tiny batch before expanding |
| Validation scores look implausibly high | Check duplicates, target leakage, test-aware preprocessing, and person/time/document splits |
| New scenes perform poorly | Inspect coverage and distribution shifts; sample failure types and fix data/protocol before changing the model |
| CPU is slow or memory is exhausted | Measure the bottleneck, reduce examples/resolution/context/search, retain a comparable baseline, and plan extra resources only as needed |
| Tool loops fail to stop or citations drift | Add call budgets and stopping conditions, retain failures, and check whether source passages support answers |

## A reproducible project package

At minimum, retain a README, an executable entry point, pinned dependencies/configuration, data acquisition/split instructions, raw predictions/metrics, and a one-to-two-page report. Explain the **question, method, controls, results, uncertainty, failures, and limits**. If stochastic training and budget permit, repeat multiple seeds and report individual results plus a summary. Finish one trustworthy small experiment before scaling. Research comparisons also require attention to statistical units, confidence intervals, and tuning budgets; see [research methods](research-methods.md).

Coding assistants can help with implementation and explanation. The original tool links below are retained as an optional index; an ordinary editor and local Python are sufficient for these exercises. Understand and check the code. Generated reports or scores are not evidence of verification by themselves.

<div class="logo-strip"><a class="logo-entry" href="https://www.trae.cn/" target="_blank" rel="noopener"><img src="../../../public/blog/guide/figures/uestc/intro/trae-logo.png" alt="TRAE"><span>TRAE</span></a><a class="logo-entry" href="https://www.workbuddy.cn/" target="_blank" rel="noopener"><img src="../../../public/blog/guide/figures/uestc/intro/workbuddy-logo.svg" alt="WorkBuddy"><span>WorkBuddy</span></a><a class="logo-entry" href="https://claude.com/product/claude-code" target="_blank" rel="noopener"><img src="../../../public/blog/guide/figures/uestc/intro/claude-logo.png" alt="Claude Code"><span>Claude Code</span></a><a class="logo-entry" href="https://zcode.z.ai/" target="_blank" rel="noopener"><img src="../../../public/blog/guide/figures/uestc/intro/zcode-logo.png" alt="ZCode"><span>ZCode</span></a><a class="logo-entry" href="https://openai.com/codex/" target="_blank" rel="noopener"><img src="../../../public/blog/guide/figures/uestc/intro/openai-logo.png" alt="Codex"><span>Codex</span></a></div>

[AI tools](ai.md) · [Foundations](basics.md) · [Learning path](learning-path.md) · [Courses](courses.md) · [Practice](practice.md) · [Research methods](research-methods.md) · [Directions](directions.md) · [Finding and reading papers](reading.md)
