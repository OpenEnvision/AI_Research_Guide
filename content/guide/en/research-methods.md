# Research methods and experimental design

A research result is an argument: a question leads to a comparison, the comparison produces evidence, and the evidence supports a conclusion within certain limits. This chapter explains how those steps connect.

<a id="methods-start"></a>

You can begin once you understand a model's inputs and predictions, [parameters and loss](basics.md#basics-learning), and the roles of [training, validation, and testing](basics.md#basics-evaluation). You can study the statistical details as you need them. Follow the main explanation first; the expandable note adds detail for readers interpreting error bars. This chapter focuses on empirical comparisons; theoretical claims need proofs, and studies with people need methods appropriate to their questions.

We will follow a simple example: **does standardizing numerical features help a classifier predict new cases?** The numbers below are illustrative teaching examples, not results from actual experiments. You can reason through the design without writing code.

<a id="question-hypothesis"></a>
<a id="worked-prediction"></a>

## Turn an interest into a question

“Improve classification” is an interest, not yet a question. A more useful question is: “For this dataset and learner, does standardizing the features improve accuracy on new cases from the same source?” It identifies what changes, what it is compared with, what is being evaluated, and where the answer should apply.

A **hypothesis** is a proposed answer, with a reason to investigate it. Features measured on very different scales may influence learning differently. Standardization rescales them using a mean and standard deviation learned from training data; its effects depend on the learning algorithm and its settings. The [feature-scaling example](https://scikit-learn.org/stable/auto_examples/preprocessing/plot_scaling_importance.html) illustrates why the outcome is not universal.

Your task is to find out what happens under clearly defined conditions, including when the results do not support your proposal. In this example, weaker performance or little difference would require revising the expectation. A question about new devices, people, or future periods would need different data and evaluation, even if the code were identical.

<a id="baselines-budget"></a>

## Decide what the comparison can tell you

A **baseline** is a reference for assessing the effect of a change. Here, A trains the classifier on the original features and B trains the same kind of classifier after standardization. Comparing B only with an unrelated weak method would not isolate what scaling adds.

Use the same examples in each data split and the same evaluation procedure. Explain any changes to training, tuning, or resources. If B also gets more training or more chances to choose a favorable setting, an improvement cannot be attributed to standardization alone. Fairness means matching conditions that matter to the question, rather than demanding that every conceivable cost be identical.

There are also two legitimate questions within this example. Holding all learner settings fixed tells you how scaling affects **that configuration**. Giving both versions comparable tuning opportunities asks which **selected pipeline** works better. A regularization setting, which controls a penalty on model complexity, may suit the two feature scales differently. State which comparison you intend; do not describe one as evidence for the other.

<a id="ablation"></a>

An **ablation** removes or replaces part of a system to examine its contribution. The A/B comparison is a simple instance. In a larger model, removing a component may also change capacity, optimization, or information. The result describes the tested intervention; it rarely establishes a universal mechanism. Understanding these alternatives is more useful than treating every score gain as a new explanation.

<a id="data-leakage"></a>

## Keep learning, choosing, and evaluating separate

Imagine that one person contributes several measurements. If their rows appear in both training and testing, success may reflect recognizing a familiar person rather than predicting for a new one. **Choose a split that matches how you want the model to generalize**, then decide which examples belong to each part. When predicting future events, also account for when each piece of information becomes available.

**Data leakage** occurs when model development uses information that the intended prediction task would not provide. In the scaling example, estimate the mean and standard deviation on training data, then apply that same transformation to validation and test data. Learning the transformation from the entire dataset lets evaluation data influence the fitted pipeline. This principle also applies to imputation and feature selection; see the [scikit-learn pitfalls guide](https://scikit-learn.org/stable/common_pitfalls.html).

<a id="tuning-test"></a>

### Parameters and choices have different roles

| Data role | What happens there | In our example |
| --- | --- | --- |
| Training | Fit the quantities learned from examples | Scaling statistics and classifier weights |
| Validation or development | Choose among candidate settings or procedures | Whether to scale and regularization strength, judged by a predefined metric |
| Test | Assess the selected procedure on held-out evidence | Compare its predictions with labels not used for those choices |

Validation can select a procedure as well as a numerical setting. Once test results guide a revision, those results are no longer independent evidence for that choice. Inspecting errors can generate a good new idea; identify it as exploratory and seek new evaluation for the revised claim.

**Cross-validation** rotates training and validation roles across subsets so each example can contribute to a held-out score. Learned preprocessing belongs inside each training fold. If these scores select a configuration, a suitable outer evaluation or separate test set is needed to assess the selected procedure. Group and time relationships still matter. The [cross-validation guide](https://scikit-learn.org/stable/modules/cross_validation.html) explains these choices in more detail.

For pretrained systems, a separate issue is **benchmark contamination**: evaluation material may have appeared in pretraining or later adaptation. Correct local splits do not remove that uncertainty. Record any known overlap and note which training information you cannot access. Failing to find overlap does not prove there is none.

<a id="evaluation"></a>

## Read the score as a measurement

A **loss** guides fitting; an **evaluation metric** measures an aspect of performance. They can differ. Accuracy is convenient for our example, but rare classes or unequal error costs may require precision, recall, or another metric. The [metric guide](datasets.md#metrics) explains those choices. Changing the metric after seeing results also changes what question the reported result answers.

Denominators matter. Suppose 10 assigned prediction tasks yield 6 correct outputs, 2 wrong outputs, 1 timeout, and 1 invalid output. Overall success is **6/10 = 60%**. Correctness among valid outputs is **6/8 = 75%**, with **80% coverage**. Both numbers can be informative; reporting only 75% hides the failed cases. A retry uses resources and does not create a new independent task.

<a id="uncertainty"></a>

### Interpreting an observed gain

Suppose A and B predict the same 20 held-out cases:

| Outcome | Cases |
| --- | ---: |
| Both correct | 9 |
| Only A correct | 3 |
| Only B correct | 5 |
| Both wrong | 3 |

A gets 12/20 right and B gets 14/20: **60% versus 70%, a gain of 10 percentage points**. Pairing the predictions reveals that B fixes five errors and introduces three. Looking only at the two totals loses that useful information.

The observed gain is clear; its reliability beyond these cases is a different question. New test cases, a different training sample, or training randomness can change it. **Effect size** describes how much changed. **Uncertainty** describes how well a specified quantity has been estimated. Repeating runs with different seeds on fixed data measures run-to-run variability, not performance on newly sampled people or domains.

<details><summary>Reading confidence intervals, averages, and dependent data</summary>

State the quantity you want to estimate, sometimes called the **estimand**. Comparing two fitted models on new cases differs from comparing training procedures across new datasets. Scoring one query at a time does not make queries independent if several share a document or source; splitting and uncertainty analysis must respect that relationship.

An average also implies a weighting choice. If one source has 90 correct answers out of 100 and another has 0 out of 5, query-weighted accuracy is 90/105 = **85.7%**. Averaging the two source accuracies gives **45%**. Choose the quantity that matches the intended use, and state the weights.

A frequentist 95% confidence-interval procedure would cover the fixed target in about 95% of repeated samples under its assumptions. This is not an interval containing 95% of individual predictions or future runs; see [NIST's explanation](https://itl.nist.gov/div898/handbook/prc/section1/prc14.htm). Check which randomness the calculation includes. A fixed-model test-case interval does not automatically include retraining or model-selection uncertainty.

Cross-validation folds share training observations, so dividing their score standard deviation by the square root of the fold count does not automatically give a valid standard error. Searching many metrics or subgroups also creates more opportunities to find a favorable result; distinguish planned comparisons from exploratory findings. An interval including zero does not prove equality, and excluding zero does not establish practical value.

</details>

<a id="sample-budget"></a>

There is no universally sufficient number of samples or seeds. Plan around the effect size or level of precision that matters to your question, the variability you expect, and your available resources. Set a stopping rule rather than adding runs until the result becomes favorable. With limited evidence, make a narrower claim and explain what remains uncertain.

<a id="negative-results"></a>

## Let the conclusion follow the evidence

In the constructed example, “B scored higher on these 20 cases” is an observation. “Scaling helps this learning procedure on new cases from the same source” needs supporting evaluation and uncertainty analysis. “Scaling always improves classifiers” goes far beyond the design.

If the gain disappears after both pipelines are tuned fairly, the initial finding may concern a particular setting rather than an overall advantage. If neither version learns reliably, diagnose implementation or optimization before judging the idea. If the comparison is sound but imprecise, more evidence may be needed. No observed improvement, evidence of a meaningful difference, and an unresolved question are distinct outcomes.

Failure analysis helps identify the next question: which cases changed, what do they share, and could another explanation account for the difference? Use [scientific writing](writing.md#claim-evidence) to match the breadth of a sentence to its evidence. Better wording cannot replace a missing comparison.

<a id="worked-rag"></a>

### Transfer the reasoning to another task

For retrieval-augmented answering, replace “scaling” with “reranking the retrieved passages.” Keep the initial candidate pool, answering system, and final context budget comparable; disclose the extra computation. Better retrieval need not improve answers, and a correct answer can cite an irrelevant source. Evaluate retrieval, answer correctness, evidence support, and handling of unanswerable questions separately. [RAGAs](https://aclanthology.org/2024.eacl-demo.16/) offers an entry point into these evaluation dimensions.

The same chain applies: specify the change, keep evaluation separate from model selection, define success, and limit the claim. Different tasks require different measurements, not a different standard of reasoning.

<a id="artifacts"></a>
<a id="experiment-record"></a>

## Keep the decisions that explain the result

You do not need a new form for every idea. A short note can preserve the question, comparison, selection decision, and reason for the conclusion. For example:

> **Question:** does scaling help this classifier on new cases from this source? **Comparison:** original versus standardized features, with the same split and comparable tuning. **Selection:** fit preprocessing on training data and choose settings using validation; keep test evidence for the selected procedures. **Interpretation:** inspect changed predictions and uncertainty before claiming an advantage. The 20-case table above only illustrates how to read a difference.

Before seeing results, record choices that might otherwise shift toward a favorable answer. Afterward, document important changes and the reasons for them, including unsuccessful attempts. In a real project, link this reasoning to versions, configurations, predictions, and analysis through [research engineering](engineering.md). Releasing files, rerunning a program, and independently validating a conclusion are separate achievements.

<a id="ethics-license"></a>

Permission and responsibility affect the design too. Check sources, versions, allowed uses, privacy, annotation arrangements, and relevant institutional requirements before collection or release. The [NeurIPS paper checklist](https://neurips.cc/public/guides/PaperChecklist) is a reference for research reporting; choose the requirements relevant to the work. [Responsible AI](responsible-ai.md) explores who may be affected and how intended use shapes these decisions.

<a id="reproduction-checklist"></a>
<a id="methods-outputs"></a>

## Use the chapter while reading

Choose one paper and explain its question, the main comparison, and the conclusion in your own words. Then follow one reported result backward: which examples, selection decisions, and measurements produced it? Locate the first point you cannot explain and investigate that gap. This is a more useful starting task than filling every field of a generic checklist.

Return to [foundations](basics.md#basics-learning) for model and optimization concepts, [datasets and evaluation](datasets.md) for protocol details, or [paper reading](reading.md) for claims and sources. Use the [learning path](learning-path.md#route-research) to decide what to study next.
