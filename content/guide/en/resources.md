# Resource index

This index organizes courses, books, exercises, data, and research tools by task. Choose one main resource and work toward something you can explain and review before adding supplementary material. Courses, official documentation, original papers, and personal experience offer different kinds of evidence and should be used accordingly.

## Choose resources by goal

| Current goal | Entry point | Suggested deliverable |
| --- | --- | --- |
| Plan systematic study | [AI learning path](learning-path.md) | Your current background, a main course, and goals for each stage |
| Choose MOOCs, university courses, and books | [MOOCs and structured courses](courses.md) | A course, any prerequisites to review, and a plan for the assignments |
| Practice programming, algorithms, SQL, mathematics, or ML | [Practice and learning platforms](practice.md) | Independent solutions, error analysis, and reusable code |
| Study computing, mathematics, ML, and DL | [Foundations](basics.md) · [Foundation catalog](catalog-foundation.md) | Conceptual explanations, worked derivations, and interpretation of examples |
| Build an end-to-end project | [Projects](start.md) | Data, baselines, evaluation, and reproduction instructions |
| Choose a research problem and specialist materials | [Research map](directions.md) · [Research-area catalog](catalog-directions.md) | A problem definition and a table comparing relevant studies |
| Select data, splits, and metrics | [Datasets and evaluation](datasets.md) | A data card and evaluation protocol |
| Design credible experiments | [Research methods](research-methods.md) | Baselines, ablations, run records, and limitations |
| Study retrieval, recommendation, graphs, time series, causality, probability, audio, 3D, and theory | [Specialized topics](advanced-topics.md) | Tasks, methods, controls, metrics, and failure conditions |
| Run, debug, document, and share experiments | [Research engineering](engineering.md) | Dependencies, settings, data versions, predictions, and verification records |
| Study trustworthiness and risks in use | [Trustworthy and responsible AI](responsible-ai.md) | Evaluation across groups, distribution shifts, threat models, and documentation |
| Find, read, and organize papers | [Paper reading](reading.md) · [Selected papers](papers.md) | Traceable notes and comparison tables |
| Write, visualize, submit, and present | [Writing and presentations](writing.md) | A report connecting claims to evidence |
| Find research workflows and software | [Research tool catalog](catalog-research.md) | A runnable, understandable, collaborative workflow |
| Follow teams, authors, and discussions | [Research developments](lookout.md) · [Information channels](catalog-channels.md) | Reading records connected to a research question |

## Courses and textbooks: build a connected foundation

The [course page](courses.md) distinguishes MOOC platforms, university courses, open books, and official practical tutorials. It identifies language, prerequisites, and suggested outcomes by topic. The [foundation catalog](catalog-foundation.md) and [research-area catalog](catalog-directions.md) remain available for locating material around a specific question.

Check the syllabus, readings, assignments, course edition, and which materials are publicly available. Videos, downloadable notes, graded assignments, and credentials may have different access conditions. An accessible landing page does not imply that all materials are free. Older courses can remain valuable for foundations; pair their implementation details with documentation for the version you use.

[Deep-learning courses and paper readings](limu.md) connects Dive into Deep Learning with detailed paper discussions. Work through the exercises and code alongside the videos; watching every lecture does not by itself demonstrate understanding.

## Practice and projects: know what you are working toward

The [practice page](practice.md) groups Python and algorithms, SQL, mathematics and ML, data competitions, and engineering exercises. Algorithm problems develop skills for solving well-defined problems; assignments connect concepts to implementation; competitions compare solutions under specified rules. Research also requires choosing a question, deciding what evidence would answer it, and understanding the limits of your conclusions.

For each exercise, record your approach, its complexity or compute budget, what went wrong, and how you checked the revised solution. Use reference solutions and AI assistance as feedback after attempting an independent explanation. Follow course and competition rules on collaboration, external data, and automated tools.

## Connect a course, exercises, and a project

Choose one combination below that fits your starting point. These are suggestions from this guide, and there is no need to follow them all. A main course provides structure, exercises reveal gaps, and a project with a written report tests whether you can apply what you learned.

| Starting point or goal | A useful combination | Output and review |
| --- | --- | --- |
| Python and programming | CS50P or BIT Python (Chinese) + one Exercism/LeetCode topic + a local data tool | Validation, tests, complexity, and run instructions |
| Classical ML | ISLP or scikit-learn MOOC + tabular classification/regression | Leakage-free pipelines, baselines, model selection on validation data, and independent testing |
| Deep learning | D2L or another main deep-learning course + a small training project | Gradient/state checks, curves, checkpoints, and failures |
| Specialist research | One topic course + directly relevant original papers + a controlled reproduction | Comparison of related studies, a hypothesis, matched conditions, and limitations |
| Engineering or trustworthiness | A documented baseline + an engineering or responsible-AI case analysis | Settings, condition-specific results, limitations, and maintenance decisions |

Find these resources on the [course](courses.md) and [practice](practice.md) pages, then develop your work with [specialized topics](advanced-topics.md), [research-design examples](research-methods.md#worked-prediction), [engineering](engineering.md), and [responsible AI](responsible-ai.md).

## Data, evaluation, and research materials

[Datasets and evaluation](datasets.md) links official resources across tabular data, vision, language, speech, graphs, retrieval, agents, robotics, and systems. Establish the target setting, permissions, sampling unit, splits, and primary metric before selecting an implementation.

Use [research methods](research-methods.md) and the [research tool catalog](catalog-research.md) to organize experiments, diagnose training, control comparisons, record variability, and prepare artifacts. Models, software, code, and data can have different versions and permissions; record them separately.

## Papers, perspectives, and communities

- **[Paper reading and note workflows](irene-workflow.md)** — Literature management, reading depth, and research records, with attribution to the original contributor.
- **[Technical blogs and research perspectives](blogs.md)** — Explanations of models, mathematics, engineering, and research methods. Trace specific claims to original papers or experiments.
- **[Research experience and communication](research-conversations.md)** — Research judgment, supervision, contact emails, and researcher accounts. Individual experiences are not universal laws.
- **[LessWrong: research judgment and AI use](lesswrong.md)** — Discussions of arguments, feedback, and working methods to consider against your own experience.
- **[Research groups and teams](labs.md)** — Starting points for exploring academic and industry research. Inspect actual projects and research interests to understand an area.
- **[BlogrXiv · OpenEnvision](https://openenvision.github.io/BlogrXiv/site/index.html)** — A discovery index for research blogs, technical writing, and laboratory articles.
- **[ScholarTube · OpenEnvision](https://openenvision.github.io/ScholarTube/)** — A discovery index for interviews, courses, and research talks.

## Decide whether a resource fits

Before adding another resource, ask three questions:

1. **What gap will it fill?** Name one concept, task, or research question. Choose a chapter or section that addresses it, rather than adding another complete course to your list.
2. **Can I use it now?** Check prerequisites, language, captions or text alternatives, available exercises, and compute or access requirements. A smaller example can teach the same principle before an expensive project.
3. **How will I know it helped?** Explain an idea without the source, solve a representative question, or identify what evidence supports a paper's claim. Return to your main resource once you have resolved that gap.

## Selection and revision standards

Official entry points for newly added courses, practice platforms, and data resources were checked during this revision on **2026-10-16**. This does not mean that every historical link, assignment, or paid resource was individually accessed. Suggested deliverables are editorial recommendations, not provider promises.

Check provenance, resource type, language, prerequisites, publication date, version, and access conditions. Distinguish established explanations, experiential advice, and claims with limited evidence. Report broken links, ambiguous terminology, or bilingual inconsistencies through the [guide repository](https://github.com/OpenEnvision/ai_research_guide), including the page, a description of the issue, and a suggested source.
