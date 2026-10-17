# Trustworthy and responsible AI

A model can be accurate on average while making serious mistakes for particular people, languages, environments, or tool actions. Responsible research asks what the system is for, who is affected, and what the available evidence leaves uncertain. There is no single score that establishes trustworthiness.

Use this chapter as a reference: choose the issue relevant to a paper or project, learn its definition, and examine the evidence. You do not need to carry out every kind of assessment in a first project. [Research methods](research-methods.md) covers comparisons and uncertainty; [datasets and evaluation](datasets.md) covers data and metrics.

<a id="scope-context"></a>

## Start with the people and the setting

Map the process from data collection to an output and the action taken on it. Who supplies the information, uses the result, bears the consequences of mistakes, or can challenge an outcome? A research prototype and a system making automatic decisions need different evidence and oversight.

The voluntary [NIST AI RMF](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf) organizes these questions through Govern, Map, Measure, and Manage. It is a framework for reasoning about risks, not a certificate for a model.

For example, a translation aid used by a researcher who checks the original differs from one used by a reader who cannot verify the source language. The same output quality can have different consequences. Identify intended uses, affected people, plausible errors, and who can correct them before choosing a metric.

<a id="data-documentation"></a>

## Ask what the data and labels represent

A label can measure a target directly or serve as a proxy. Clicks reflect exposure and user behavior as well as relevance; historical decisions can reproduce earlier practices. Missingness and annotation disagreement may also vary across populations.

[Datasheets for Datasets](https://arxiv.org/abs/1803.09010) gives questions about collection, composition, processing, uses, and maintenance. Start by asking who and what are represented, how labels were produced, and which conditions are missing. Record unknowns rather than assuming a public dataset fits the task.

**Reading check:** could a high score mean the model predicts the recorded label well while failing at the real goal? See the [data audit](datasets.md) for provenance and split checks.

<a id="fairness"></a>

## Understand what a fairness measure compares

Fairness is a question about people and systems. A statistical criterion measures a particular aspect of that question; explain why it matters in the setting. Removing a sensitive feature does not ensure that other features contain no related information.

| Binary-classification criterion | Comparison |
| --- | --- |
| Demographic parity | Positive-prediction rates across groups |
| Equal opportunity | True-positive rates across groups |
| Equalized odds | Both true-positive and false-positive rates across groups |
| Group calibration | Predicted probabilities and observed frequencies within groups |

[Fairlearn](https://fairlearn.org/main/user_guide/assessment/common_fairness_metrics.html) explains definitions and their assumptions. Always inspect denominators, label quality, small groups, and uncertainty. A small measured gap alone does not establish fair treatment. Some criteria cannot all be satisfied under the same conditions. The [original risk-score analysis](https://arxiv.org/abs/1609.05807) identifies specific incompatibilities; it does not imply that every notion of fairness conflicts with every other.

**Reading check:** why was this criterion chosen, whose errors matter, and which groups or consequences remain unexamined? [MetricFrame](https://fairlearn.org/main/api_reference/generated/fairlearn.metrics.MetricFrame.html) and [AIF360](https://github.com/Trusted-AI/AIF360) are implementation references when needed.

<a id="robustness-ood"></a>

## Separate different kinds of robustness

A new hospital, camera, language, or time period poses a different evaluation question from image corruption or a deliberate adversarial change. Specify what changes, why the original label remains meaningful, and what information or budget an attacker has.

[WILDS](https://wilds.stanford.edu/) studies real distribution shifts; [RobustBench](https://robustbench.github.io/) organizes specified robustness benchmarks. Read the exact task and threat model before interpreting a result. Strong performance in one setting does not establish reliability under every change.

Report absolute performance as well as degradation, and inspect affected groups and failure types. An unsuccessful attack tells you only about that test; it does not prove the system is secure.

<a id="calibration"></a>

## Distinguish confidence, calibration, and abstention

For a calibrated binary predictor, examples assigned probability near 0.8 should have an observed positive fraction near 80% in the evaluation population. This describes a collection of predictions; it does not guarantee that one particular answer is correct. A language model's verbal certainty is not automatically a calibrated probability.

Reliability diagrams show probabilities against observed frequencies. The [scikit-learn calibration guide](https://scikit-learn.org/stable/modules/calibration.html) explains why Brier score and log loss measure more than calibration alone. Binning choices and sample counts matter too. Calibration fitted on development data should be checked on independent evaluation data and reconsidered under distribution shift.

Abstention trades off coverage against the error rate on the cases the system chooses to answer. Report both quantities, which cases are rejected, and what happens afterward. A system that answers fewer difficult questions can appear more accurate without improving service for those users.

<a id="interpretability"></a>

## Ask what an explanation can establish

An interpretable model structure, a feature attribution, and a real-world causal explanation answer different questions. [InterpretML](https://interpret.ml/docs/ebm.html) introduces additive models; [SHAP explanations](https://interpret.ml/docs/shap.html) attribute specified model outputs. Neither alone establishes what would happen after a real intervention.

For an attribution, identify the model, output scale, background data, and treatment of correlated features. [Permutation importance](https://scikit-learn.org/stable/modules/permutation_importance.html) can assign low individual importance to correlated features that carry useful information together. A visually convincing heatmap still needs a clear definition and validation.

**Reading check:** is the claim about the model's computation, a person's understanding, or a real-world cause? Does the evaluation address that claim?

<a id="privacy-memory"></a>

## Separate memorization, privacy, and access control

Training-data extraction, membership inference, and exposure of retrieved records or current context involve different data flows. [Training-data extraction research](https://www.usenix.org/conference/usenixsecurity21/presentation/carlini-extracting) shows why memorization matters; a few unsuccessful extraction attempts do not establish confidentiality.

Differential privacy bounds how much a mechanism's output distribution can change between specified neighboring datasets. The guarantee depends on the protected unit, privacy parameters, mechanism, and accounting method. Record-level protection is not automatically user-level protection. Removing names or adding arbitrary noise is not a DP guarantee. Repeated private-data use may require composition accounting; creating a new accounting object does not reset the privacy cost of earlier uses. See the [Opacus FAQ](https://opacus.ai/docs/faq) and [Dwork–Roth textbook](https://www.cis.upenn.edu/~aaroth/Papers/privacybook.pdf).

Training privacy does not secure application logs or grant permission to access a record. Map collection, training, retrieval, logging, and release separately. Learning examples can use fictional records; you do not need to use other people's private information.

<a id="llm-agent-security"></a>

## Understand trust boundaries in LLMs and agents

External text can contain instructions, but retrieved content does not become an authorized command. A model proposing a tool call also does not establish permission to execute it. Map the user request, external sources, model, tools, data, and executor, then identify who controls each boundary.

[OWASP's prompt-injection guidance](https://genai.owasp.org/llmrisk/llm01-prompt-injection/) and [Excessive Agency guidance](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/) introduce common failure modes. Least privilege, resource checks, argument validation, and bounded execution belong in the surrounding system; a prompt alone cannot establish those controls.

| Question | Evidence to inspect |
| --- | --- |
| Can external content redirect the task? | Complete traces and unauthorized requests |
| Can a tool access another user's material? | Resource-level permission checks |
| Can a proposed action exceed its permission or budget? | Executor decisions, actual effects, limits, and termination |

Distinguish an unauthorized request from unauthorized execution. For learning, inspect mock tools and fictional data in a controlled environment. Report normal-task failures and false refusals as well as attack outcomes.

<a id="human-evaluation"></a>

## Make human evaluation interpretable

Correctness, helpfulness, clarity, preference, and harm are different judgments. Define a rubric and show raters the evidence needed for the task. A majority preference does not by itself establish factual accuracy.

The [human-evaluation reporting study](https://aclanthology.org/2020.inlg-1.23/) explains why definitions and procedures matter. Check how outputs were sampled, how raters were assigned, which languages and expertise they had, whether system identities and order were masked, and how ties, missing ratings, and disagreements were handled. Pilot the instructions before finalizing the formal evaluation.

Repeated ratings of the same output are not new independent examples. Uncertainty should account for relevant item and rater dependence. If an LLM judge is used, check a representative sample against qualified human judgments and disclose its rubric, version, and selection effects.

<a id="release-documentation"></a>

## Document the scope of the evidence

[Model Cards](https://arxiv.org/abs/1810.03993) and dataset documentation connect intended use, evaluation, and limitations to a specific version. Describe tested populations and conditions, known failures, access restrictions, and what remains untested. “Fair,” “robust,” or “private” without a definition and evidence tells the reader little.

For a learning project, a short README and a scoped evaluation note may be enough. A released system also needs a contact person, someone responsible for maintenance, and criteria for repeating the evaluation when data, models, users, or permissions change. Documentation makes the work easier to assess; it does not substitute for the assessments it describes.

<a id="project-acceptance"></a>

## Turn findings into a decision

Connect each concern to **the condition examined → the observation → the remaining uncertainty → the next decision**. Distinguish a failed assessment from insufficient evidence, an assessment that does not apply, and a setting that has not been tested.

For example, a prototype tested only on English questions may support an English-language research result. It does not support a multilingual reliability claim. The next decision could be to narrow the claim or evaluate a defined additional language population. A universal pass threshold would obscure the reasoning behind that choice.

Use the [decision record](research-methods.md#experiment-record) to explain the main research choices. Add the specific people, risks, evaluation conditions, and unresolved issues that matter here; duplicating a long form for every topic is unnecessary.

<a id="learning-resources"></a>

## Choose a manageable path through the material

Start with a paper or familiar project and explain how it is used and what data it relies on. Then select one issue—such as subgroup error, source shift, calibration, or tool permissions—and write a short critique of what its evidence establishes. Discuss a concrete improvement and the evidence needed to assess it.

The resources have different roles: NIST organizes risks; Fairlearn and AIF360 implement specified assessments; WILDS and RobustBench provide defined settings; scikit-learn and InterpretML explain measurements; Opacus teaches a particular privacy approach; OWASP organizes threats; Model Cards and Datasheets improve documentation. Choose the resource that answers your question.

[Foundations](basics.md) · [Research methods](research-methods.md) · [Datasets and evaluation](datasets.md) · [Writing and disclosure](writing.md#ai-disclosure)
