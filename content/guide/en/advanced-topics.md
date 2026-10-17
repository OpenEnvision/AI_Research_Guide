# Advanced topics: from task definitions to testable research

Retrieval, recommendation, graphs, time series, causal inference, and probabilistic modeling are research areas in their own right and foundations for language models, robotics, and scientific work. This chapter builds on the [research map](directions.md), suggesting where to start, what to compare, and how to interpret the results.

Choose one topic and revisit the relevant probability, linear algebra, optimization, and data-split concepts in [foundations](basics.md). On your first reading, focus on the core idea and work through one example by hand. The project suggestions are optional ways to apply the ideas; they are not prerequisites for using this chapter. Use [courses and MOOCs](courses.md) for structured study and [research engineering](engineering.md) when implementation becomes relevant.

## Choose a topic by task

| What you need to do or explain | Topic | A first result others can review |
| --- | --- | --- |
| Find evidence in a document collection | Information retrieval | Queries, relevance judgments, a baseline ranking, and per-query results |
| Rank candidate items for users | Recommendation | Temporal splits, candidate definitions, popularity baseline, and cold-start analysis |
| Use relationships between objects | Graph learning | Graph construction, a no-graph control, and node/edge/graph evaluation |
| Predict future observations from the past | Time series | Information availability, rolling backtests, and horizon-specific errors |
| Estimate how an intervention changes an outcome | Causal inference | Estimand, identification assumptions, causal graph, and sensitivity analysis |
| Express assumptions and predictive uncertainty | Probabilistic modeling | Generative process, priors, inference diagnostics, and predictive checks |
| Process speech or sound events | Audio and speech | Sampling and text conventions, speaker splits, and disaggregated errors |
| Recover geometry from images or point clouds | 3D vision | Coordinate systems, camera conventions, geometric errors, and visualization |
| Prove when a learning method works | Learning theory | Assumptions, proposition, derivation, and counterexamples |

<a id="retrieval"></a>

## Information retrieval: candidates, rankings, and evidence

Retrieval returns relevant objects for a query; generating an answer is an optional downstream step. Distinguish lexical retrieval, dense retrieval, reranking, and RAG. A better component score does not automatically improve the whole question-answering system. You will need a grounding in text processing, vectors, probability, and evaluation.

**Core idea.** Lexical methods score shared terms, dense methods compare learned representations, and rerankers evaluate a smaller set of candidates in more detail. A reranker cannot recover a relevant document excluded from its candidates.

**Project.** Assemble documents and relevance judgments for a small set of meaningful queries. Keep TF-IDF or BM25 as a baseline, then add dense retrieval or a reranker while keeping the corpus, candidate set, and hardware comparable. Record index revision, chunking, query processing, retrieval depth, and latency. Queries should reflect the information people need, rather than being chosen simply because their keywords are easy to match.

**Evidence and limits.** Recall@k measures how many relevant items reach the top k; MRR rewards an early first relevant result, while nDCG@k accounts for relevance gains and position discounts. Moving an item within the same top-k set can change the latter two without changing Recall@k. Define the relevance grades and explain how you handle queries with no relevant documents and tied scores. Judgments may be incomplete: unjudged does not necessarily mean irrelevant. If the system also generates answers, evaluate their correctness, whether their citations support them, and how the system handles unanswerable questions.

- **[Introduction to Information Retrieval](https://nlp.stanford.edu/IR-book/)** — English textbook, available from its authors, on indexes, weighting, probabilistic retrieval, and evaluation. Implement a small ranker and check the evaluation assumptions.
- **[BEIR](https://github.com/beir-cellar/beir)** — Official benchmark implementation requiring Python and retrieval basics. Start with one manageable task and record the versions of the corpus, queries, and relevance judgments (qrels); an average across tasks does not guarantee performance in every setting.

<a id="recommendation"></a>

## Recommendation: interactions are not direct observations of preference

Recommendation includes candidate generation, ranking, sequences, cold start, and long-term feedback. Exposure, position, and user choices shape clicks and ratings. Missing interactions can mean either disinterest or lack of exposure. Useful preparation includes matrix factorization, classification and ranking losses, probability, and data processing.

**Core idea.** Matrix factorization represents users and items with low-dimensional vectors whose interactions predict scores. It learns from the recorded exposure and feedback process, so a predicted score is not a direct measurement of a person’s underlying preference.

**Project.** Compare popularity and simple collaborative filtering or matrix factorization before adding a target model. Define the prediction time and which history, attributes, and items were available then. Design temporal training, validation, and test protocols, with separate analyses for new users, new items, and established users.

**Evidence and limits.** Keep the candidate set, negative-sampling procedure, rules for filtering items the user has already interacted with, and metric cutoffs fixed. Recall/nDCG on sampled candidates cannot be directly compared with full-catalog evaluation. Rating error and ranking quality also answer different questions. Offline scores alone do not establish satisfaction or long-term benefit. Experiments with real users also need a plan for assigning participants, delivering the intervention, and monitoring its impact.

- **[D2L · Recommender Systems](https://d2l.ai/chapter_recommender-systems/index.html)** — An English textbook chapter covering tasks, matrix factorization, and related models. Redesign a split and explain the resulting difference.
- **[RecBole official repository](https://github.com/RUCAIBox/RecBole)** — Python/PyTorch research framework for readers with ML and recommendation foundations. Study data formats and evaluation configuration, recording the full configuration and software versions.

<a id="graphs"></a>

## Graph learning: define how the graph was constructed

Nodes, edges, and attributes determine what information a model receives. Node classification, link prediction, and graph classification have different evaluation units. Transductive use of one graph and inductive evaluation on new nodes or graphs also differ. Review graph algorithms, linear algebra, probability, and neural networks.

**Core idea.** A message-passing layer combines neighboring information and updates node representations. Repeated layers expand the information available to a node; graph construction therefore changes the model’s input, rather than simply providing a visualization.

**Project.** Establish a node-feature-only model, then add neighborhood statistics or message passing. Keep the rules for graph construction, edge direction, self-loops, sampling, and features consistent. Link prediction must specify which edges are removed and how negatives are generated. In a temporal task, edges that appear in the future must not be available for message passing before that time.

**Evidence and limits.** Follow the dataset split and evaluator, checking whether labels leak through attributes, graph construction, or preprocessing. State whether evaluation is performed over nodes, graphs, or time periods. Where feasible, inspect structural perturbations, low-degree nodes, and heterophilous relations. An edge-removal experiment can reveal what the model depends on; it does not establish a domain mechanism by itself.

- **[Stanford CS224W](https://web.stanford.edu/class/cs224w/)** — English university course on graph representations, GNNs, and graph tasks. Requires programming, probability, and linear algebra; check current and archived access separately.
- **[OGB · Node Property Prediction](https://ogb.stanford.edu/docs/nodeprop/)** — Official tasks and split documentation. Compare a feature baseline with a simple GNN using the same revision, recording which parts of the graph are visible and which evaluator is used.

<a id="time-series"></a>

## Time series: make the prediction time explicit

Forecasting, classification, anomaly detection, and imputation allow access to different kinds of information. Specify the observation window, horizon, frequency, update schedule, and availability of exogenous variables. Useful preparation includes statistics, regression, time indexing, and basic signal concepts.

**Core idea.** A forecast is conditional on information available at a particular time. A seasonal-naive forecast reuses the last observed value from the corresponding season; this simple rule tests whether a more complex model learns more than recurrence.

**Project.** Start with naive or seasonal-naive forecasting, then compare a statistical or lag-feature model. Use rolling forecasting origins and fit transformations within each training window. Hyperparameter tuning must also use only information available at the relevant time. If training-label horizons overlap validation information, design an appropriate gap or purging rule based on that overlap rather than applying an arbitrary constant.

**Evidence and limits.** Report horizon-specific MAE/RMSE, aggregation weights across series, and prediction-interval coverage and width. MAPE becomes unstable near zero; raw errors across incompatible scales should not simply be averaged. Overlapping backtest windows are dependent. Revised data and exogenous variables known only retrospectively can also introduce future information.

- **[Forecasting: Principles and Practice · Toolbox](https://otexts.com/fpp3/toolbox.html)** — English textbook using R, available from its authors. Study baselines, errors, intervals, and time-series cross-validation.
- **[sktime](https://www.sktime.net/)** — Official Python documentation and examples. Build a rolling backtest that specifies when each input becomes available and reports results for each forecast horizon.

<a id="causal"></a>

## Causal inference: identification comes before estimation

Predicting who will experience an outcome differs from estimating how an intervention changes it. Define treatment, outcome, target population, time zero, and estimand before discussing identification from randomized or observational data. Start with probability, statistics, and regression, using simulation before making claims about real-world settings where decisions have significant consequences.

**Core idea.** Students who seek tutoring may differ from those who do not before tutoring begins. A comparison of their observed outcomes mixes the effect of tutoring with the differences that led them to seek it. Identification specifies the design or assumptions needed to distinguish the target effect from those differences.

**Project.** Use a known data-generating process, draw its causal graph, and vary confounding and sample size. Compare crude association, adjustment under appropriate assumptions, and deliberate omission of a confounder. Explain consistency, exchangeability, and positivity in the particular problem, checking that the estimator targets the intended effect. Repeat data generation to estimate bias and interval coverage, reporting the number of repetitions and Monte Carlo uncertainty. One generated dataset gives one estimation error and one coverage indicator; it cannot establish these repeated-sampling properties.

**Evidence and limits.** Report the true effect used in the simulation, the bias, interval coverage, and the conditions under which estimation fails. For observational studies, name assumptions that the data cannot verify. Sensitivity analysis exposes dependencies; it does not establish the absence of unmeasured confounding. Counterfactual frameworks, graphs, and software organize reasoning without replacing identification arguments.

- **[Causal Inference: What If](https://miguelhernan.org/whatifbook)** — English textbook and accompanying code by Hernán and Robins. Study treatments, counterfactuals, trials, and observational studies; define an estimand for a simulation.
- **[Brady Neal · Causal Inference Course](https://www.bradyneal.com/causal-inference-course)** — English lectures and notes. Express one question through both graphs and potential outcomes, listing identification conditions.

<a id="probabilistic"></a>

## Probabilistic modeling: check assumptions and predictions

Describe the generative process: unknown quantities, how observations arise, and what is independent or shared. Distinguish likelihood, prior, posterior, and posterior predictive distributions. Uncertainty about parameters differs from variability in future observations. Review probability, calculus, and numerical computing.

**Core idea.** For a coin model, a prior describes uncertainty about its bias, the likelihood describes observed tosses given that bias, and the posterior updates uncertainty after observing them. Posterior predictions average over that uncertainty when predicting another toss.

**Project.** Begin with an analytically tractable model, then build a small hierarchical model. Use prior predictive checks to inspect the data implied by priors. Compare analytic and numerical inference, recording chains, initialization, budgets, and diagnostics. Add posterior predictive checks and appropriate held-out evaluation for real data.

**Evidence and limits.** Report assumptions, prior sensitivity, diagnostics, and predictive errors together. For MCMC, check mixing, effective sample size, and convergence; for HMC, also inspect divergence diagnostics. Good diagnostics increase confidence in numerical inference without proving model adequacy. Credible intervals depend on the model and prior and should not be relabeled as frequentist coverage statements.

- **[Probabilistic Machine Learning · Kevin Murphy](https://probml.github.io/pml-book/)** — English textbook series on models, inference, and learning. Connect a model's generative process, objective, and computation.
- **[PyMC · Learn](https://www.pymc.io/projects/docs/en/stable/learn.html)** — Official Python learning resources for readers with probability and programming. Create a notebook with predictive checks, diagnostics, and a record of its dependencies.

<a id="audio"></a>

## Audio and speech: preprocessing is part of the protocol

Recognition, synthesis, speaker tasks, and sound classification have different targets. Understand sample rate, channels, waveforms, spectra, segmentation, and duration. Resampling transforms the signal rather than merely changing a file's sample-rate label. Review Python, basic signal processing, and deep learning.

**Core idea.** The waveform records amplitude over time; a spectrogram describes frequency content across short time windows. Speech recognition maps audio to a token sequence, so the signal representation and transcript conventions jointly define the task.

**Project.** Run a pretrained baseline on a small appropriately licensed dataset, then compare one augmentation, segmentation, or adaptation strategy. Separate speakers, sessions, or recording sources as the task requires; segments of one recording should not leak across splits. Preserve text normalization, punctuation, case, tokenization, and transcript versions.

**Evidence and limits.** ASR evaluations may report word or character error rates (WER/CER), defined by the protocol and broken down into substitutions, deletions, and insertions; specify the token units across languages. Classification needs per-class and noise-condition results. For synthesis, evaluate naturalness, intelligibility, and speaker similarity separately. A low transcription error rate alone does not establish fairness, privacy, or robustness across accents.

- **[Hugging Face Audio Course](https://huggingface.co/learn/audio-course/chapter0/introduction)** — Official English course requiring a grounding in deep learning and Transformers; covers audio processing, classification, ASR, and synthesis. Begin with a baseline and error analysis.
- **[LibriSpeech](https://www.openslr.org/12)** — Official dataset of read speech in English. Record the subset and speaker protocol; read-speech results do not directly establish performance on meetings or noisy conversations.

<a id="geometry"></a>

## 3D vision: coordinate conventions affect the answer

Calibration, multiview geometry, depth, registration, and reconstruction require geometry, not only convincing rendered images. Review projection, camera intrinsics/extrinsics, homogeneous coordinates, rigid transforms, scale, and occlusion. Specify world-to-camera versus camera-to-world, handedness, and length units.

**Core idea.** A camera projects a 3D point to an image location, losing depth information. Recovering geometry requires additional constraints from views, motion, or measurements; a visually plausible reconstruction can still have incorrect scale or shape.

**Project.** Validate transform direction on synthetic point clouds with a known transform before running ICP. Record initialization, correspondence thresholds, downsampling, and noise. For multiview reconstruction, keep camera settings and the split between input and held-out views fixed; evaluate geometry and image reconstruction separately.

**Evidence and limits.** Report task-appropriate rotation/translation errors, registration success, reprojection error, or geometric distances, specifying alignment and scale treatment. ICP can reach local solutions; small residuals do not guarantee correct correspondences. Novel-view quality, geometric accuracy, and depth usable for control are distinct claims.

- **[Computer Vision: Algorithms and Applications](https://szeliski.org/Book/)** — The second edition of Szeliski's English textbook, available from the author. Derive and verify one projection or calibration example before scaling up.
- **[Open3D · ICP registration](https://www.open3d.org/docs/release/tutorial/pipelines/icp_registration.html)** — Official tutorial requiring Python and linear algebra. Compare initial and registered errors under known transforms, then vary noise and initialization.

<a id="theory"></a>

## Learning theory and optimization: state the conditions precisely

Theory can study sample complexity, generalization, optimization, representation, or computational limits. Empirical curves can motivate propositions without proving them. Review probability inequalities, linear algebra, calculus, convexity, and proof techniques as needed for the result you want to understand.

**Core idea.** A generalization bound connects observed sample performance to population performance under stated conditions; an optimization bound concerns progress toward an objective’s optimum. Neither statement can be transferred to a different sampling process or objective without checking its assumptions.

**Project.** Choose a simple result and define sampling, hypothesis class or objective, and sources of randomness. Annotate the assumptions in a finite-class uniform-convergence argument or a bound on progress per gradient-descent step under smoothness conditions, then construct examples violating those assumptions.

**Evidence and limits.** Distinguish population from empirical risk, expectation from high-probability bounds, and asymptotic from finite-sample statements. Bounds may be loose, so using them to predict which method will perform better in practice requires further argument. Lower optimization loss does not automatically establish better generalization. Define the mathematical objects, quantifiers, constants or rates, then present a proof and counterexamples. Make clear that numerical illustrations demonstrate only the specific cases they cover.

- **[CMU 10-701 · Learning theory lecture archive](https://www.cs.cmu.edu/~tom/10701_sp11/lectures.shtml)** — English university materials including PAC learning and mistake bounds. Readers with probability and proof foundations can work through a derivation and annotate its assumptions.
- **[An Introduction to Statistical Learning](https://www.statlearning.com/)** — English textbook with R/Python resources. Use resampling and test-error experiments to connect theory to measurements; it does not replace all required proofs.

## Turn a topic into a reviewable research plan

Prepare four connected documents: a table linking the problem to relevant literature, a record of the data and when information becomes available, a protocol for baselines and controls, and a report of results and limitations. If you change the data, model, and evaluation together, you cannot attribute an improvement to any one of them.

| Milestone | What to inspect | Condition for continuing |
| --- | --- | --- |
| Define the task | Inputs, targets, evaluation units, and use setting | You can manually judge a few cases |
| Establish a baseline | Splits, preprocessing, metrics, and minimal software | Others can inspect and reproduce the scores |
| Form a question | Literature differences, falsifiable hypothesis, and budget | Exploration is separated from final evaluation |
| Compare under controls | Runs, errors, costs, and alternatives | Failures and uncertainty are included |
| Deliver evidence | Settings, provenance, tables, plots, and limits | Another person can trace claims to evidence |

See [research methods](research-methods.md) for experimental design and worked examples and [datasets and evaluation](datasets.md) for protocols. Use [trustworthy and responsible AI](responsible-ai.md) when studying fairness, privacy, robustness, explanations, or real-world use.

Links to official resources and author websites were checked on **2026-10-16**. Textbooks, courses, tools, and benchmarks serve different roles; consult their access, dependency, and data-version details. This is a learning map rather than a complete survey or ranking.
