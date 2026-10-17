# Practice and competitions

These 34 platforms and project tutorials can help you practice a skill, then apply it in a small project. Start with one goal below and keep the code, tests, and reasoning that show what you learned.

<a id="sec-1"></a>
<h2 id="practice-start">Choose your starting point</h2>

<div class="practice-starts">
<section class="practice-start">
<h3 class="practice-start-title">Practice Python</h3>
<p>Start with <a href="#resource-7">Exercism</a>; use <a href="#practice-programming">algorithm problems</a> to work on a specific gap.</p>
<p>Keep a tested solution and explain one improvement.</p>
</section>
<section class="practice-start">
<h3 class="practice-start-title">Query data</h3>
<p>Start with <a href="#resource-9">SQLBolt</a>, then try <a href="#resource-11">PostgreSQL Exercises</a>.</p>
<p>Save your queries, define each metric, and check for NULLs and duplicates.</p>
</section>
<section class="practice-start">
<h3 class="practice-start-title">Implement ML</h3>
<p>Practice individual components with <a href="#resource-16">Deep-ML</a>, then try a small workflow with <a href="#resource-14">Kaggle Learn</a>.</p>
<p>Check your calculations, establish a baseline, and analyze the errors.</p>
</section>
<section class="practice-start">
<h3 class="practice-start-title">Try a competition</h3>
<p>Choose a learning challenge on <a href="#resource-17">Kaggle</a> that fits your skills and equipment.</p>
<p>Keep a local validation split and a reproducible submission.</p>
</section>
<section class="practice-start">
<h3 class="practice-start-title">Build a project</h3>
<p>Learn the workflow with <a href="#resource-21">GitHub Skills</a>; use <a href="#resource-23">PyTorch tutorials</a> for a deep-learning project.</p>
<p>Keep a runnable repository, tests, and setup instructions.</p>
</section>
</div>

Try a simple cycle: **attempt a solution → test a counterexample → review feedback → reimplement without references → try a new task**. Record whether an error came from the specification, a missing concept, reasoning, implementation, or evaluation. Revisit recurring gaps, then check your understanding with a problem with a different structure after some time has passed.

<a id="sec-2"></a>
<h2 id="practice-programming">Programming and algorithms</h2>

**Suggested workflow:** learn syntax through a Python course on the [course page](courses.md), then choose LeetCode, Exercism, or CSES. For each topic, rewrite a solution without references and apply it to a new problem, checking correctness, complexity, and counterexamples. Switching platforms is not a substitute for applying what you learned.

- **[LeetCode](https://leetcode.com/problemset/)** — **Language: mainly English; prerequisites: one programming language.** Practice arrays, hashing, trees, graphs, search, and dynamic programming. **Suggested output:** a brute-force baseline, optimization argument, complexity analysis, and boundary-case tests.
- **[LeetCode China](https://leetcode.cn/)** — **Language: mainly Chinese; prerequisites: basic programming.** A regional, Chinese-language version of LeetCode with problems, topic-based lessons, and an online judge. **Suggested output:** explain an algorithm to a peer and reuse it in a local program without a judge template.
- **[HackerRank · Algorithms](https://www.hackerrank.com/domains/algorithms)** — **Language: English; prerequisites: syntax and input/output basics.** Covers implementation, sorting, search, graphs, greedy methods, and dynamic programming. **Suggested output:** diagnostic test cases and a documented correction.
- **[Codeforces](https://codeforces.com/)** — **Languages: English, Russian, and others; prerequisites: confident programming and basic algorithms.** Supports timed contests, topic practice, editorial review, and counterexample construction. **Suggested output:** reconstruct a solution after the contest and explain a counterexample to an incorrect approach.
- **[AtCoder](https://atcoder.jp/)** — **Languages: Japanese and English; prerequisites: basic syntax; algorithms for higher contest levels.** Regular contests develop problem interpretation, implementation, mathematics, and algorithmic reasoning. **Suggested output:** an after-contest review comparing your approach with the official solution's assumptions.
- **[Luogu](https://www.luogu.com.cn/problem/list)** — **Language: mainly Chinese; prerequisites: basic programming, with algorithms for competition tasks.** Offers problems, topic-based practice, contests, and editorials. **Suggested output:** notes on one topic containing proofs, implementation, and tests.
- **[Exercism · Python Track](https://exercism.org/tracks/python)** — **Language: English; prerequisites: start with Python basics.** Concept exercises, tests, and community feedback develop language use and code clarity. **Suggested output:** compare first and refactored versions, explaining naming, structure, test coverage, and readability.
- **[CSES Problem Set](https://cses.fi/problemset/)** — **Language: English; prerequisites: basic data structures and algorithms.** Organizes practice in sorting/searching, dynamic programming, graphs, trees, and mathematics. **Suggested output:** apply one algorithm to two differently structured problems, explain why the same approach applies to both, and test overflow, complexity, and extreme inputs locally.

<a id="sec-3"></a>
<h2 id="practice-sql">SQL and data processing</h2>

**Suggested workflow:** begin with SQLBolt or SQLZoo; use PostgreSQL Exercises or DataLemur after the basics. Implement one metric in both SQL and pandas, checking NULLs, duplicates, missing matches, and changing denominators. A query that runs successfully still needs to be checked for correctness.

- **[SQLBolt](https://sqlbolt.com/)** — **Language: English; prerequisites: no database experience required.** Browser exercises introduce SELECT, filtering, joins, aggregation, and modification concepts. **Suggested output:** explain how each step changes the rows and what each output row represents.
- **[SQLZoo](https://sqlzoo.net/wiki/SQL_Tutorial)** — **Language: mainly English, with some translations; prerequisites: basic table concepts.** Interactive practice covers queries, subqueries, joins, NULLs, and aggregation. **Suggested output:** construct cases with NULLs, duplicate rows, and missing matches, noting the SQL dialect.
- **[PostgreSQL Exercises](https://pgexercises.com/)** — **Language: English; prerequisites: basic SQL.** A coherent example dataset supports joins, aggregation, dates, recursion, and window-function practice. **Suggested output:** reproduce queries in local PostgreSQL and explain what each result row represents and how the rows are ordered.
- **[DataLemur · SQL Questions](https://datalemur.com/questions)** — **Language: English; prerequisites: SQL basics and attention to metric definitions.** Analytics and interview problems provide practice with SQL, aggregation, and window functions. **Access:** some questions require Premium. **Suggested output:** define the metric and denominator before writing the query and edge-case tests.

<a id="sec-4"></a>
<h2 id="practice-ml">Mathematics and ML implementation</h2>

**Suggested workflow:** verify a mathematical component with Deep-ML, complete a small task with Kaggle Learn or Google's labs, then use the [course page](courses.md) to revisit any derivations you do not understand. Use independent numerical tests, check that data splits avoid leakage, and explain the errors you find. Project Euler offers additional discrete-reasoning practice.

- **[Project Euler](https://projecteuler.net/)** — **Language: English; prerequisites: basic programming and mathematical reasoning.** Mathematical programming problems develop observation, derivation, and efficient implementation. **Suggested output:** show the transition from enumeration to mathematical simplification, verifying small cases.
- **[Kaggle Learn](https://www.kaggle.com/learn)** — **Language: English; prerequisites: varies from no programming to basic Python.** Short courses and notebooks cover Python, pandas, SQL, ML, and visualization. **Suggested output:** build your own cleaning, modeling, and evaluation workflow using new data, without relying on the provided template.
- **[Google ML Crash Course · Exercises](https://developers.google.com/machine-learning/crash-course/exercises)** — **Languages: English, Chinese, and others; prerequisites: Python, algebra, and basic statistics.** Interactive exercises, quizzes, and coding tasks cover regression, classification, data, generalization, and fairness. **Runtime:** programming exercises run in your browser through Colab. **Suggested output:** predict the effect of one training or data change, then test and explain discrepancies.
- **[Deep-ML](https://www.deep-ml.com/)** — **Language: English; prerequisites: Python/NumPy and relevant mathematics.** Coding problems let you practice components from linear algebra, statistics, ML, and DL. **Suggested output:** equations, shape annotations, numerical-stability checks, and independent tests for one implementation.

<a id="sec-5"></a>
<h2 id="practice-competitions">Data and AI competitions</h2>

**Suggested workflow:** choose one challenge with a clear task, manageable data, and a realistic budget. Use [datasets and evaluation](datasets.md) to plan your validation. Submit a reproducible simple baseline and test one controlled change. Explain differences between local and leaderboard results, document data permissions and run commands, and analyze failures.

Read the task, evaluation, and current eligibility, team, data-use, and submission rules before entering. Use local validation to choose models; treat public leaderboard scores as a limited check. Random splits can leak information when observations share users, organizations, or time dependencies; match your split to the intended use.

- **[Kaggle Competitions](https://www.kaggle.com/competitions)** — **Language: mainly English; prerequisites: Python, data analysis, and ML baselines.** Learning challenges and formal competitions give you experience with public and private evaluations and the submission process. **Suggested output:** a reproducible baseline, validation design, experiment table, and retrospective.
- **[DrivenData · Competitions](https://www.drivendata.org/competitions/)** — **Language: English; prerequisites: data analysis, ML, and background reading.** Organizes challenges around social and scientific problems. **Suggested output:** discuss representation in the data, the costs of errors, and the intended use alongside the score.
- **[AIcrowd · Challenges](https://www.aicrowd.com/challenges)** — **Language: English; prerequisites: ML, simulation, or software packaging as required.** Hosts a range of AI tasks with different submission formats. **Suggested output:** a runnable model or agent matching its evaluation protocol, with environment and budget records; first establish whether submission uses files, containers, or interaction.
- **[Alibaba Cloud Tianchi · Competitions](https://tianchi.aliyun.com/competition)** — **Language: mainly Chinese; prerequisites: Python, data processing, and relevant modeling skills.** Hosts introductory and industry-oriented competitions. **Suggested output:** a solution with clear validation, feature provenance, ablations, and a reproduction report.

<a id="sec-6"></a>
<h2 id="practice-engineering">Engineering and project-based learning</h2>

**Suggested workflow:** manage a project with Missing Semester and GitHub Skills, then select one relevant model tutorial. Pair with [engineering practice](engineering.md). Check that you can install the project in a clean environment, run a test, and diagnose a failure; for training jobs, also check recovery from a checkpoint.

- **[GitHub Learn · Skills](https://learn.github.com/skills)** — **Language: mainly English; prerequisites: basic file and code operations.** Interactive exercises use real repositories, Issues, Pull Requests, and Actions; the [official Skills repositories](https://github.com/skills) provide another entry point. **Suggested output:** a small project with branches, review history, automated checks, and a clear README.
- **[MIT · The Missing Semester of Your CS Education](https://missing.csail.mit.edu/)** — **Language: English, with translation links; prerequisites: simple programming.** Shells, editors, version control, debugging, and performance exercises build engineering foundations. **Suggested output:** turn scattered commands into a repeatable data or training workflow.
- **[PyTorch Tutorials · Labs and Recipes](https://docs.pytorch.org/tutorials/)** — **Language: English; prerequisites: Python and basic DL.** Supports hands-on experiments in training, saving and loading models, deployment, and performance. **Suggested output:** resume training from a checkpoint, verify results, and analyze a bottleneck; fix the device, dependencies, and workload when comparing performance.
- **[Hugging Face Learn](https://huggingface.co/learn)** — **Language: mainly English, with some translated courses; prerequisites: Python and ML according to course.** Provides courses on LLMs, agents, audio, vision, and RL. **Suggested output:** a small pipeline or agent with evaluation, data documentation, and reproduction steps.
- **[NVIDIA Deep Learning Institute](https://www.nvidia.com/en-us/training/)** — **Language: mainly English, with course-specific languages; prerequisites: course-specific.** Offers courses and labs in GPUs, DL, and accelerated computing. **Access:** [self-paced options](https://www.nvidia.com/en-us/training/self-paced-courses/) include free courses and labs with provided cloud GPUs; check the individual course. **Suggested output:** compare correctness, throughput, and resources before and after optimizing the same task.
- **[freeCodeCamp · Learn](https://www.freecodecamp.org/learn)** — **Language: mainly English, with localized content; prerequisites: introductory courses are available.** Interactive lessons and projects develop programming, data, and application skills; the [official curriculum repository](https://github.com/freeCodeCamp/freeCodeCamp) documents the source. **Suggested output:** an independent runnable project with tests and documentation.

<a id="sec-7"></a>
<h2 id="practice-chinese">Chinese-language data and training practice</h2>

**Suggested workflow:** use Joyful-Pandas to turn raw tables into training data with a data dictionary, then build a configurable training workflow with MMEngine. Check join row counts and key uniqueness, missing-data policies, separation of training and validation data, configurations, and checkpoints. Use a smaller model when necessary to control resources.

- **[Datawhale · Joyful-Pandas](https://github.com/datawhalechina/joyful-pandas)** — **Language: Chinese; prerequisites: Python, NumPy, and basic table concepts.** The project provides pandas tutorials, datasets, notebooks, and exercises in indexing, grouping, joins, reshaping, missing values, and temporal data. **Suggested output:** independently clean and aggregate several tables, test duplicate keys, categories, and dates, then convert the notebook to a repeatable script. Use the repository to check which content belongs to the web or print edition.
- **[OpenMMLab · MMEngine Training Workflow](https://mmengine.readthedocs.io/zh-cn/latest/get_started/15_minutes.html)** — **Language: Chinese, with an [English version](https://mmengine.readthedocs.io/en/latest/get_started/15_minutes.html); prerequisites: Python, PyTorch, and a basic training loop.** Official code combines models, dataloaders, metrics, and a Runner. **Suggested output:** run a reduced configuration, add a custom metric and a recovery check, and explain how the configuration controls training.

<a id="sec-8"></a>
<h2 id="practice-specialist">Graphs, recommendation, and time series</h2>

**Suggested workflow:** pair one task with [CS224W](https://web.stanford.edu/class/cs224w/), [Google's recommendation course](https://developers.google.com/machine-learning/recommendation), or [FPP3](https://otexts.com/fpp3/). Check which graph structure is available at prediction time, candidates and negative sampling for recommendation, and forecast time for temporal tasks. Retain simple baselines, splits, budgets, and task-level results.

- **[DGL · A Blitz Introduction](https://www.dgl.ai/dgl_docs/tutorials/blitz/index.html)** — **Language: English; prerequisites: Python, PyTorch, graphs, and basic DL.** Official coding examples cover graph representations, custom GNNs, node classification, link prediction, and graph classification. **Suggested output:** reproduce a small task, change aggregation, and compare the result with a baseline that does not use graph structure. Specify when labels and test-node information are available.
- **[RecBole · Official Repository Quick-Start](https://github.com/RUCAIBox/RecBole)** — **Language: mainly English; prerequisites: Python, PyTorch, and recommendation basics.** The repository provides configurable experiments and a BPR/MovieLens quick start across recommendation tasks. **Suggested output:** compare a model with popular-item recommendations, documenting candidates, splits, negative sampling, Recall/nDCG, and cold-start performance. Choose temporal splits when the deployment question requires them; the example's random split is not appropriate for every task.
- **[sktime · Notebook Examples](https://www.sktime.net/docs/examples/)** — **Language: English; prerequisites: Python, pandas, statistics, and basic ML.** Official notebooks demonstrate forecasting, classification, transformations, and combining time-series models, with examples you can run locally. **Suggested output:** rolling backtests against a naive baseline, horizon-specific errors, and checks that feature construction excludes future information.

<a id="sec-9"></a>
<h2 id="practice-probability">Probability, causal inference, and speech</h2>

**Suggested workflow:** pair probabilistic models with [Murphy's textbooks](https://probml.github.io/pml-book/) or [Bayesian Modeling and Computation in Python](https://bayesiancomputationbook.com/welcome.html), causal inference with [Brady Neal's course](https://www.bradyneal.com/causal-inference-course), and speech with [Aalto's textbook](https://speechprocessingbook.aalto.fi/) or [CS224S](https://web.stanford.edu/class/cs224s/). Check your implementation against known answers on small or synthetic datasets before moving to real observations. Check probability normalization, identification assumptions, or audio/text processing.

- **[pgmpy · Example Notebooks](https://pgmpy.org/examples.html)** — **Language: English; prerequisites: Python, conditional probability, and graphical-model basics.** Official notebooks cover Bayesian networks, parameter/structure learning, exact or approximate inference, and simulation. **Suggested output:** calculate a small network's conditional probabilities manually, compare your answers with library calculations and simulation results, and explain conditional independence and structural assumptions.
- **[PyWhy DoWhy · Getting Started](https://www.pywhy.org/dowhy/main/getting_started/index.html)** — **Language: English; prerequisites: Python, statistics, and causal graphs/potential outcomes.** Runnable official examples organize modeling, identification, estimation, and refutation, and introduce graphical causal models. **Suggested output:** compare appropriate and inappropriate adjustment on synthetic data with a known mechanism, recording identification assumptions and sensitivity. Passing refutation tests does not prove the absence of unobserved confounding.
- **[SpeechBrain · Speech Recognition from Scratch](https://speechbrain.readthedocs.io/en/stable/tutorials/tasks/speech-recognition-from-scratch.html)** — **Language: English; prerequisites: Python, PyTorch, DL, and basic speech processing.** The lab covers manifests, tokenization, training configuration, recognition, and decoding. **Runtime:** its mini-LibriSpeech example recommends a GPU. **Suggested output:** train or evaluate on a small speech dataset, retaining speaker splits, normalization, WER/CER, error clips, and compute budgets. Scale data and models to your available resources.

Find more task definitions in [additional research topics](advanced-topics.md).

<a id="sec-10"></a>
<h2 id="practice-access">Access and versions</h2>

Before starting, check package versions, data/model licenses, hardware, storage, and account or cloud requirements. Follow the course or competition's AI-tool rules, upload only authorized data, and save environment specifications and compute-cost records.

<details class="practice-note">
<summary>Resource checks and access notes · 2026-10-16</summary>
<p>The 34 entries cover platforms, project tutorials, and community courses. Learning and competition modes on the same platform are listed separately; the Chinese and English pages use the same resources and order.</p>
<p>Official entry points and public descriptions were checked on 2026-10-16, using official landing pages, help pages, or indexed official descriptions for dynamic sites. Not every experiment was executed. Local tutorials require their own environments and downloads; readable materials do not necessarily include hosted compute or certification.</p>
</details>

<a id="sec-11"></a>
<h2 id="practice-evidence">Evidence to retain</h2>

When using AI assistance, record its role. Before requesting a complete solution, write down your attempted approach and the point where you are stuck; a hint, counterexample, or explanation of feedback is often enough. Afterward, close your references and explain and check the key reasoning yourself.

Keep records that fit the task. An algorithm exercise needs a specification, correctness argument, complexity, and diagnostic inputs; a SQL exercise needs table definitions, row-level checks, and metric denominators. A modeling project additionally needs data provenance, splits, baselines, settings, errors, and limitations. Add related work and controlled comparisons when making a research claim; an ordinary learning exercise does not need a full research report. Choose materials through [courses and textbooks](courses.md), apply them in [your first AI project](start.md), plan experiments with [research methods](research-methods.md), and organize your studies with the [learning path](learning-path.md).
