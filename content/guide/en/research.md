# Getting started in research: 60 questions

This handbook is for university students and junior researchers around the world who are preparing for or starting research. Its 60 questions cover preparation, topic choice, supervision, papers, experiments, collaboration, and publication. Start with a concrete question and a manageable study, then refine your methods and strengthen the evidence.

**Open the question closest to your current task.** For practical work, try [a starter project](start.md); for a systematic plan, use the [learning path](learning-path.md). Project eligibility, application requirements, and publication rules depend on the institution and venue.

## What research involves

<a id="q1"></a>

### 1. What is research? How is it different from classes, course projects, or competitions?

Research builds knowledge about an unresolved question through reasoning and evidence that others can examine. Evidence may be a proof, measurement, data analysis, experiment, or carefully designed study with people. A new dataset, reliable evaluation, replication, or explanation can be a contribution as well as a new method.

Courses and competitions often give you a defined task and a way to measure success. Research also needs to justify the question, its relationship to prior work, and the scope of the conclusion. A project can be a valuable learning experience even if it does not yet make a research contribution.


<a id="q2"></a>

### 2. What does an AI researcher actually do all day, beyond reading papers and coding?

Common tasks include searching the literature, reproducing baselines, designing experiments, debugging, analyzing results, recording configurations, discussing ideas, and writing. Keep **the code version, configuration, logs, metrics, and analysis of examples** from each experiment. See [experiments](research.md#q43).

<a id="q3"></a>

### 3. What skills can I develop through research, and what will I need for applications?

A research project provides practice in defining questions, reviewing literature, designing experiments, analyzing results, and writing about technical work. For applications, **check the program or role requirements** and assemble relevant work samples; requirements for papers, code, and experience vary.

<a id="q4"></a>

### 4. What makes research hard? What do beginners underestimate?

You may find that **the question is still vague, you cannot reproduce the baseline, or the experiments cannot be compared fairly**. Data or compute may be missing, or a result may not answer the original question. Before starting, discuss available resources, evaluation, when to meet, and what you hope to finish at this stage. After the experiment, review any discrepancies together.

AI and agents may accelerate search, coding, or recordkeeping, depending on the task and verification process. They can also introduce errors that need checking; faster execution does not by itself make a finding reliable.


<a id="q5"></a>

### 5. How can a small project help me explore research?

Choose a manageable question and one piece of evidence you can inspect. You might critique a paper's main comparison, analyze errors in released predictions, or work through a [starter project](start.md). Implementation is one route; it is not the only way to begin exploring.

If you run a project, first understand its inputs, baseline method, and evaluation. Change one factor only when you can explain what the comparison would reveal. Notice which uncertainties make you want to investigate further, and discuss them with a peer or supervisor.


## Preparation

<a id="q6"></a>

### 6. Can I explore research early in my degree, and how do I choose a suitable task?

Start by asking: **what do you want to do next?** To run a demo, learn to set up the environment and understand the inputs and outputs. To reproduce an experiment, also work through the data split, training, and evaluation. When you want to change the method, go deeper into its principles and controlled comparisons. Read the specific project prerequisites too.

You can explore research at any stage of your undergraduate degree, but particular projects still have prerequisite, safety, and data-access requirements. Starting to explore does not mean being ready for every task. The [learning path](learning-path.md) separates demonstration, reproduction, and method changes.


<a id="q7"></a>

### 7. How do I identify missing prerequisites?

“I lack the basics” is too broad to act on. Can you run a Python example, read a tensor shape, distinguish training from testing, or identify an abstract’s main claim with a dictionary? **Find the particular step that is blocking you**, then look up the relevant section in [foundations](basics.md). It will also be easier to explain what you need help with.

Learning through a project still requires focused study when a gap prevents you from implementing or evaluating the work correctly. Research opportunities also depend on openings, time, and resources; effort alone does not determine access.


<a id="q8"></a>

### 8. What should I prepare before contacting a supervisor?

For a paper question, include **the source location, your current interpretation, and the unresolved point**. To join a project, add relevant coursework, code or reproduction notes, the time you can commit, and the guidance you need. Prerequisites depend on the task and project requirements.

<a id="q9"></a>

### 9. What can I share if I have no papers or project experience?

Start with something small you have already tried: **runnable reproduction code, a one-page experiment record**, or an analysis of a paper. Explain what you did, how it runs, and where you are stuck, with source locations for paper references. This helps the recipient understand what you have tried; see the [email example](contact.md).


<a id="q10"></a>

### 10. How could I organize my first month on a project?

Choose a [starter project](start.md) and try this sequence: **select the task and data → run a baseline → change one setting and compare → organize code, results, and questions**. There is no need to assign exactly one week to each step; adjust to your time and progress. Keep code or notes from each step so you can pick up where you left off.

Use the [staged learning path](learning-path.md) and [practice projects](practice.md) to match the work to your equipment. Treat this as an example plan, not a deadline or a pace everyone must follow.


## Directions and sources

<a id="q11"></a>

### 11. Where can I find introductions to different research areas?

Start with the tasks, inputs, outputs, and representative papers in [research directions](directions.md). Media and demos can provide leads; **check methods, evaluation conditions, and limitations** against papers, code, and project pages. See [Lookout](lookout.md) for research sources.

Popularity and a compelling demo do not tell you how strong the evidence is. Check publication records and limitations through the [literature-search workflow](reading.md#search-protocol).


<a id="q12"></a>

### 12. How do I move beyond recognizing terms like LLMs, agents, embodied AI, RL, and world models?

Describe an area through its **task, inputs and outputs, and limitations**: what is the goal, what does the model receive and produce, and where does it fail?

Compare the paper's question, method, and results with prior work, recording what it adds.

<a id="q13"></a>

### 13. How do I find out how a demo works and where its limits are?

Inspect the code, data, and evaluation behind the demo: selected examples, failing inputs, manual intervention, and whether reported metrics match the demonstration. **Record reproducible behavior** and use it to formulate a testable question.

<a id="q14"></a>

### 14. What should I check when comparing research projects?

If you are comparing projects, put them in a table: what question does each address, what prior work and prerequisites are involved, where will data and compute come from, who will discuss the work with you, and what needs to be ready by when? **Write down what you do not know and ask the project lead.** If data or compute is not yet available, discuss a smaller question you can try with what you have.

List accessible data, the costs of running and tuning models, validation time, and useful outputs if the hypothesis fails. Limited compute can motivate smaller systems, evaluation, data studies, or failure analysis without guaranteeing easier publication. See [baselines and budgets](research-methods.md#baselines-budget).


<a id="q15"></a>

### 15. Why follow other universities, labs, and companies? What should I look for in their work?

Different teams provide baselines, data, implementations, and evaluation settings. Record the question, changes from prior work, the conditions in which it succeeds, and its failures. **Compare work around a shared question** rather than only by author or institution. Sources are in [Lookout](lookout.md).


## Contacting researchers

<a id="q16"></a>

### 16. What should I check when contacting researchers at other institutions or in other regions?

Use contact information on university, lab, or author pages and follow any stated contact instructions. Include **a specific paper or project, what you have tried, and what you are asking for**. For projects across institutions or regions, check whether there are openings and whether remote participation is possible. Clarify time zones, the working language, and access requirements.

<a id="q17"></a>

### 17. How do I find relevant projects and research openings?

Check author pages, lab project pages, and open calls. Verify topics, recent work, participation requirements, and contact channels. A group's list of current students or junior researchers does not mean it has openings; **ask whether supervision is available**.

Ask about the actual supervision arrangement and available time as well as the opening itself.


<a id="q18"></a>

### 18. What is a reasonable first request: an answer, a conversation, a lab meeting, or a project?

You might ask a specific question about a paper, inquire about project openings, or ask whether you can attend an open talk or try a short task. Focus the message on **a clear request**. For a meeting, state the topic, materials, and expected duration.

<a id="q19"></a>

### 19. What should I include in my first email?

State **your background, the relevant research, what you have tried, and what you are asking for**. Attach necessary code, notes, or a CV. Distinguish planned work from completed work. The [contact page](contact.md) provides an adaptable email example.

<a id="q20"></a>

### 20. How should I respond to the reply?

The reply may suggest a discussion, some reading, or a trial task, or explain that no opportunity is available. You may also receive no reply. Follow the stated requirements and consider one follow-up after an appropriate interval. Before a trial, confirm **scope, deadline, feedback, and use of the work**.


## Starting a collaboration

<a id="q21"></a>

### 21. A professor says, “Let's talk.” What should I prepare?

Prepare a short introduction, relevant work samples, and questions. Confirm **the task, main contact, supervision arrangements, resources, and schedule**. Identify what you still need to learn or prepare, then record what was agreed after the meeting.

<a id="q22"></a>

### 22. Someone sends a paper and says, “Have a look.” How much am I expected to do?

Confirm the **reading task and discussion date**: understanding the main argument, presenting it, or reproducing experiments.

- **First pass:** record the question, method, evidence, and unresolved points.
- **Further analysis:** locate predecessors and follow-up work, and identify implementation checks or possible modifications.
- **Cross-field comparison:** note similar questions elsewhere and whether the methods could apply under similar conditions.

See [paper reading](reading.md) for the steps.

<a id="q23"></a>

### 23. Can I observe or try a project before joining? What should I clarify?

Ask whether observation, a short trial, or a task broken into stages is available. Agree on its scope, time, feedback, resources, and how the outputs may be used before starting.

Clarify restrictions on data and materials, contribution records, and handoff if you leave. Revisit authorship using actual contributions and the applicable venue policy as work develops; an early discussion should make expectations clear, not conceal uncertainty about future roles.


<a id="q24"></a>

### 24. How do I find out who will supervise me, how often we meet, and what resources are available?

Confirm the **day-to-day contact, meeting frequency, and resources**: who handles questions and blockers, how to obtain data and compute, and the expected time for each stage.

Supervision may involve faculty or graduate researchers. Check the project's arrangements and explain how much time you can commit.

<a id="q25"></a>

### 25. How do I address problems with supervision or feedback, or arrange a handover?

List specific differences from the agreement in **feedback, scope, resources, or time**, then discuss adjustments with the project contact. If leaving, confirm the end date, completed and unfinished tasks, code and data locations, handoff recipient, and arrangements for outputs and access.


## Learning the foundations

<a id="q26"></a>

### 26. Which foundations are shared across AI research, and which depend on the area?

Shared foundations include **linear algebra, probability and statistics, calculus, optimization, programming, and computing fundamentals**. Information theory and infrastructure are also relevant to particular tasks.

- **Reinforcement learning:** policy gradients involve probability, expectations, and optimization.
- **CNNs / Transformers:** architectures and implementations involve linear algebra, tensors, and automatic differentiation.
- **Training and deployment:** data pipelines, memory, parallelism, and runtime environments matter.

For pretraining hyperparameters, post-training data mixtures, RL scaling, or DDPM, consult the relevant [foundation resources](basics.md), then relate them to the code and experiment.

Choose prerequisites and exercises around the current task using the [course map](courses.md). A course list points you to resources; it does not show whether you can understand and verify a method.


<a id="q27"></a>

### 27. How can I combine courses, books, and projects without putting off getting started?

**You do not need to read every paper in a field before opening the code.** When you find a project that interests you and that you have the resources to run, reading and running it can go together: try the authors' examples, look at the model's output, use the implementation to understand the paper, and try changing something. Concepts whose purpose once seemed unclear become concrete questions, giving you a reason to return to a course or textbook.

Connect courses, reading, and a project around one question using the [learning path](learning-path.md). Completion certificates can document participation but do not alone establish understanding or the ability to reproduce results. Check explicit application requirements; collecting certificates should not take the place of substantive practice.


<a id="q28"></a>

### 28. When should I stop to study a concept systematically, and when is a rough understanding enough?

Resolve a gap before proceeding if it affects **implementation correctness, central assumptions, or interpretation**. Keep a note of derivations you can set aside for now and when you will need to revisit them, and review them before modifying methods or interpreting results.

<a id="q29"></a>

### 29. How do I check my understanding after taking a course or running code?

Use three checks:

- **Explain the data flow, loss, and metric**, locating their implementation.
- Change a setting, predict its effect before running, and compare with observations.
- Propose explanations for a failure case and design checks that distinguish them.

Save results and open questions for further study and experiments.

For example, an overview of TRPO, PPO-Clip, or GRPO is not enough to verify an implementation. [PPO-Clip](https://arxiv.org/abs/1707.06347)'s clipped surrogate discourages large policy changes; it is not a universal hard bound on the actual KL change. Check the original method, assumptions, and implementation version before drawing a conclusion about stability.


<a id="q30"></a>

### 30. What foundations are needed to verify AI-assisted work?

Prioritize foundations needed for verification: tensors and autodiff, probability and statistics, data splits, optimization, runtime environments, and evaluation. For AI-generated implementations, check **key calculations, edge cases, and metric definitions** against documentation, small examples, or original sources.


## Finding and reading papers

<a id="q31"></a>

### 31. What should I read first: a classic, a survey, a new paper, or something my supervisor assigned?

Choose according to your purpose: a survey or course for terminology and an overview, a foundational paper for the original argument, a recent paper for work in a new setting, or an assigned paper to prepare for a project discussion. Follow important claims back to their original sources.

A small set of connected papers is often more useful than an enormous reading list: one central method, its closest predecessor or alternative, and a paper that tests an important limitation. This applies to vision, language, decision-making, theory, and interdisciplinary work. Use [selected papers](papers.md#paper-selection) and the [reading-depth guide](reading.md#reading-depth), then record versions and evidence locations in a [literature comparison](reading.md#literature-matrix).


<a id="q32"></a>

### 32. Where should I start when reading a paper? What should I be able to answer afterward?

Start with the **abstract, introduction, key figures, and conclusion**, then check experimental evidence. Record:

1. The question and the data or task.
2. What the method changes and which baseline it uses.
3. The results supporting the main claim, including conditions and limitations.

See [Mu Li's paper readings](https://github.com/mli/paper-reading) and [matching claims to figures](reading.md#claims-evidence).

<a id="q33"></a>

### 33. What if I cannot understand the English, equations, terminology, or background?

First identify **term definitions and the claims in key sentences**. Use dictionaries, AI, author explanations, or notes, then check against the source.

Read equations in layers: identify symbols, inputs and outputs, and the operation before examining the derivation. If an equation determines the implementation being reproduced or modified, check the derivation, assumptions, and code.

<a id="q34"></a>

### 34. Do I need to follow every derivation, read the code, and reproduce the results to understand a paper?

How closely you need to read depends on **the task**. A first pass can explain the question, method, and main evidence; reproduction or modification also requires data, implementation, derivations, and evaluation details.

Record key questions and how to verify them. See the [AI questioning example](ai.md#grill-me) for checking a method explanation.

<a id="q35"></a>

### 35. How do I keep useful notes and connect papers instead of collecting separate summaries?

Keep **the question, method, evidence locations, conditions, open questions, and related work** in literature notes. Compare papers under matched tasks and evaluation definitions, retaining sources for each item. The [Zotero and Obsidian workflow](irene-workflow.md#notes) provides setup and comparison prompts.

Separate what the authors state, how you interpret it, and what remains unclear. Do not rank incompatible scores across data, budgets, or evaluation protocols. See the [verifiable-note template](reading.md#paper-notes).


## Finding questions and ideas

<a id="q36"></a>

### 36. Must beginners come up with their own ideas? What can I learn on someone else's project?

Joining an existing project gives you practice in **experiments, writing, and collaboration**. Requirements for independent problem formulation vary by task; confirm them with the project contact.

Record unexplained observations from reading, running systems, and discussions as starting points for investigation.

<a id="q37"></a>

### 37. What is the difference between a direction, a research question, an idea, and a method?

- **Direction:** a broad area, such as vision, reinforcement learning, or language models.
- **Research question:** a specific uncertainty about a task, phenomenon, or assumption.
- **Idea:** a proposed explanation, design, or way to investigate it.
- **Method:** a defined procedure or argument for the investigation, such as an algorithm, experiment, proof, or analysis.

The method should answer the question; the evidence determines which conclusion is justified. Naming a new component is not itself a research question.


<a id="q38"></a>

### 38. How can reading help me find questions worth investigating?

Look for specific questions in **conditions, comparisons, and evidence gaps**:

1. Which data, assumptions, or resources does the conclusion depend on?
2. Do baselines use matched conditions, and which cases are not compared?
3. Are there unexplained results or failure examples?

Compare your observations with a reading partner or group, then choose one question to investigate through a literature search or a test.

<a id="q39"></a>

### 39. How do I know whether an idea is new, meaningful, and feasible?

Search relevant keywords, earlier work, and citation chains, then compare **settings, assumptions, data, methods, and evaluation**. Feasibility depends on data access, implementation, compute, time, and guidance. Use a small experiment to estimate cost and state which explanations it could rule out. See [targeted literature search](irene-workflow.md#search).

A small test can check implementation and cost without establishing novelty, mechanism, or general effectiveness. Draft a question, hypothesis, control, and an outcome that would count against the hypothesis using [experimental design](research-methods.md#question-hypothesis); consult the [dataset guide](datasets.md) for access and splitting.


<a id="q40"></a>

### 40. When is a question worth pursuing? Should I stop if someone has tried it or my first attempt fails?

Distinguish **implementation errors, statistical variation, and lack of effect** under the current conditions. Before another experiment, specify the uncertainty it resolves, resource cost, and stop or revision criteria. If prior work addresses the same question, check for a clear, testable remaining difference.

Do not treat hearsay that “everyone tried it” as evidence of universal failure. Verify the original conditions and consider what you would learn, what other work you would give up, and how much time or compute you can commit. See [negative results and research decisions](research-methods.md#negative-results).


## Doing experiments

<a id="q41"></a>

### 41. How do I turn a project into tasks I can do today or this week?

Break work down as **question → evidence → experiment → task**. State what is being tested, then list data, baselines, and evaluation methods.

An early stage may cover related work, a baseline run, evaluation checks, and one small test. Specify each task's inputs, actions, and expected outputs for daily or weekly progress checks.

<a id="q42"></a>

### 42. Why run baselines and reproduce work? What should I check after the code runs?

A baseline gives you a reference for understanding the effect of a change. [Reading the code alongside the paper](reading.md#paper-code) also makes the data, metrics, and implementation details more concrete.

After a run, compare the setup and results with the paper. Check data splits, evaluation, randomness, and possible leakage. Look at actual outputs too: some errors will not show up in an aggregate score.

Distinguish running the code successfully, reproducing a table, and finding evidence for the main conclusion. Preserve code, data, and checkpoint versions, check baselines under a shared protocol, and disclose unresolved differences. Use the [guide to tracing a result back to its design](research-methods.md#reproduction-checklist) and the [dataset guide](datasets.md).


<a id="q43"></a>

### 43. What should I decide before an experiment so I know what I am testing?

Write **the question, expected results**, and how different outcomes would change your understanding. Check the process on a small scale before investing in a larger run.

To study one factor, control the others as far as possible. To study interactions, design combinations around that purpose. Keep each change traceable.

Also record splits, configuration-selection rules, training/inference budgets, run IDs, and raw-output locations. Use validation for selection and keep held-out evidence out of repeated tuning. Use the [short decision record](research-methods.md#experiment-record) as an example for organizing the main choices, and keep detailed run records when conducting experiments.


<a id="q44"></a>

### 44. Does a higher score prove the idea works? How do I check bugs, unfair comparisons, and noise?

Check implementation, splits, and evaluation first. Then check whether the comparison is fair in terms of data and external information, resources, configurations, tuning opportunities, candidate selection, and retries. A higher aggregate score alone does not exclude these alternative explanations.

Report effect size and uncertainty matched to the question. Comparing a mean gain directly with an across-run standard deviation does not by itself establish an effect or its absence: sample counts, pairing, dependence, and assumptions matter. Multiple seeds characterize run variation on fixed data; they do not create new independent patients, users, or tasks. Define the statistical unit and error-bar calculation.

Use targeted ablations, failure analysis, and independent evaluation where needed. See [uncertainty and statistical units](research-methods.md#uncertainty).


<a id="q45"></a>

### 45. What if experiments fail, reproduction does not work, or progress stalls for weeks?

Check **data, implementation, environment, and evaluation** in turn, narrowing the issue to a reproducible case. Document what you tried, under which conditions, and what differed from the expected results before asking collaborators or original authors.

Use the remaining discrepancies to decide whether to investigate further or try a different baseline, while keeping enough detail for others to reproduce your attempts.


## Communicating and working together

<a id="q46"></a>

### 46. When should I ask for help with a blocker, and what information should I include?

Ask when a blocker affects correctness, access, another person's task, or significant resources. Include the goal, observed behavior, relevant environment or source, attempts, and the specific point you need help with. Say what other work you can continue in the meantime.

Use the agreed feedback process; there is no required number of hours to struggle alone and no obligation to exhaust AI tools first. Clear questions improve collaboration, but a beginner does not need to solve the problem before being allowed to ask.


<a id="q47"></a>

### 47. How do I explain a problem so someone can help?

A help request includes the **goal, attempts, observations, and question**, with the environment, key logs, or results.

Use a minimal reproduction to remove unrelated code and logs. See [contact and collaboration](contact.md) for an example.

<a id="q48"></a>

### 48. What do I report at meetings when I have no positive results?

Organize updates around **completed work, results and explanations, blockers, and next steps**.

Even without positive results, you can report explanations you have ruled out, failure cases, and the support you need. Attach key figures and locations of original records for discussion and review.

<a id="q49"></a>

### 49. What if I do not understand a discussion, or think someone more senior is wrong?

**Locate the disagreement in a specific concept or piece of evidence.** If a term is unclear, ask for an example in context; for a disputed conclusion, identify the difference between prediction and observation.

For example: “This explanation predicts A, but the experiment produced B. Should we check condition C?” Discuss it immediately or return to it after organizing your notes and results.

<a id="q50"></a>

### 50. When should we discuss tasks, contributions, authorship, and schedules? What about disagreements?

Discuss **responsibilities, time commitments, goals, and how authorship will reflect contributions** at the start. Update the discussion as work and contributions change.

Talk to the people involved first; a shared supervisor can help if necessary. Keep clear written agreements where possible.


## AI-assisted research and verification

<a id="q51"></a>

### 51. How can AI help with papers, code, experiments, ideas, and writing?

- **Reading:** explain terms, equations, and background, then check the source.
- **Code:** draft scripts and diagnose errors; verify core calculations and evaluation.
- **Experiments:** organize records, plots, and analysis while retaining raw output.
- **Questions:** find related work, alternative explanations, and testable hypotheses.
- **Writing:** revise structure and sentences, checking evidence for each claim.

See [AI tools](ai.md) for examples.

<a id="q52"></a>

### 52. How do I judge an AI explanation, plan, or result that sounds convincing?

**Check original material, not only the summary.** Experimental claims require configurations, logs, outputs, and statistics; literature claims require source passages, equations, or figures.

For a new proposal, design checks that distinguish explanations. Preserve unexpected observations and unresolved hypotheses before adding experiments.

<a id="q53"></a>

### 53. How does understanding methods and metrics help verify AI-assisted work?

Understanding the method and metric helps detect **task mismatch, leakage, implementation errors, and unfair comparisons**. Trace one example through the full pipeline and check which conclusions survive a configuration change.

<a id="q54"></a>

### 54. How do I review AI-assisted work and keep useful records?

Save **task inputs, key changes, configuration, outputs, and verification results**. Check whether you can locate the key computation, explain the metric, reproduce a result, and explain a failure. Turn unresolved points into checks for the next task.

Even with AI assistance, a first draft can be difficult; the experience varies by person and task. Review what actually changed in your understanding of experiments, scientific reasoning, and collaboration rather than treating task completion as proof of learning.


<a id="q55"></a>

### 55. What material can I share with an AI tool, and which rules apply?

Check what material the project permits you to share and how the chosen service handles it. Public access, personal notes, local file access, and permission to upload are different things. Limit shared files and tool permissions to the task.

For writing or reviewing, follow the venue's current rules on permitted assistance, confidentiality, and disclosure. The [ICML 2026 policy](https://icml.cc/Conferences/2026/LLM-Policy) is one year-specific example, not a universal rule. Authors and reviewers retain responsibility for their judgments.

Verify references and mark generated data, labels, or judgments that enter the method. See [AI use and disclosure](writing.md#ai-disclosure) and [research responsibilities](research-methods.md#ethics-license).


## Writing, publication, and project records

<a id="q56"></a>

### 56. When is my work ready for a paper, and how can writing help along the way?

**Claims need matching experiments or analysis.** A paper explains the question, method, evidence, and scope of the conclusion.

Write down your question, sketch the method, and record results as you conduct experiments. If a paragraph is unclear, check both its wording and whether the necessary explanation or evidence is missing. See [writing](writing.md).

Starting a draft does not mean the work is ready for submission. Readiness depends on contribution type and venue scope, not a universal experiment count or score. Use the [claim–evidence outline](writing.md#claim-evidence), then check current submission, anonymity, and artifact requirements.


<a id="q57"></a>

### 57. What makes good research or a good paper? What do novelty, scores, and prestigious venues tell us?

Check **the question, differences from prior work, comparison conditions, strength of evidence, limitations, and reproducibility**. New architectures or higher scores need experiments that explain what changed and why it matters. Publication venues provide review and dissemination context but do not replace evidence checks; review arrangements vary by track and submission type. Verify institutional recognition against the relevant published rules.

<a id="q58"></a>

### 58. How do journals, conferences, workshops, preprints, and regional publication lists differ?

Publication formats, citation indexes, and institutional ranking lists answer different questions. Choose relevant work by its question and evidence, and check formal recognition only when an application or role requires it.

SCI/SCIE refer to the science citation-index system; check SCIE in [Clarivate's Web of Science index documentation](https://webofscience.help.clarivate.com/Content/wos-core-collection/wos-core-collection.htm). Index inclusion, a JCR rank/quartile for a particular category and year, and another organization's classification convey different information. Specify the system and year rather than treating them as one grade.

As a regional example, the China Computer Federation's recommended publication directory categorizes conferences and journals, including a category called CCF A. The directory changes; consult [CCF's official notices](https://www.ccf.org.cn/Academic_Evaluation/By_category/2024-06-28/825349.shtml) and subsequent updates rather than only third-party lookups. Institutional or program recognition must be checked in its own formal rules.

“Top conference” is an informal field-specific description, not a universal certification. NeurIPS, ICML, ICLR, CVPR, and ACL cover different scopes. A conference name, a particular track's review process, and its category in a ranking directory are not interchangeable.

A workshop is a focused forum. Peer review, archival status, accepted work types, and later extended submissions depend on its rules. Do not assume all workshop work is a main-conference publication or all of it is nonarchival.

A preprint is a publicly shared paper version or status, not a quality grade. [arXiv's official guidance](https://info.arxiv.org/help/moderation/index.html) distinguishes moderation from peer review. A formally published paper can also have an arXiv version. Check the version read, publication record, and applicable policies; see [paper versions and status](reading.md#search-protocol).


<a id="q59"></a>

### 59. How do I archive and review unpublished or rejected work?

Archive the question, literature comparisons, runnable code, configurations, raw results, and failure analysis. For reviews, separate **implementation issues, evidence gaps, presentation issues, and disagreements over scope**. Identify revisions and required validation. See [publication](writing.md) for submission procedures.

Alongside technical skills, research can teach you to notice conditions you previously overlooked and test your judgments against evidence. Show a concrete example such as correcting leakage, helping a peer rerun a figure, or narrowing an unsupported claim. Research experience does not guarantee admission or employment, but work that others can examine helps show what you did and learned.


<a id="q60"></a>

### 60. How do I adjust and hand over a project when conditions change?

Look at the situation with your collaborators: **what have you done, what remains unclear, and what can you do with the time and resources now available?** If you need to reduce, pause, or end the project, agree on what remains to be finished, where code and data are stored, and who will follow up. The next person can then continue from the existing records.
