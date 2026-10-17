<p align="center"><img src="public/blog/guide/logo-openenvision.png" width="190" alt="OpenEnvision"></p>

<h1 align="center">AI Learning & Research Guide</h1>
<p align="center">An open guide for university students and junior researchers worldwide</p>
<p align="center"><b>English</b> · <a href="README_ZH.md">中文</a> · <a href="https://github.com/OpenEnvision/ai_research_guide">Project repository</a></p>

Build AI foundations, complete reproducible projects, and learn to turn a question into research that others can examine. The guide connects programming, mathematics, machine learning, research areas, literature review, experimental design, evaluation, engineering, and academic communication. English and Chinese editions share the core learning routes and resources.

## Start with your task

| Goal | Guide |
| --- | --- |
| Plan systematic study | [Learning path](content/guide/en/learning-path.md) · [Foundations](content/guide/en/basics.md) |
| Choose structured courses and exercises | [Courses](content/guide/en/courses.md) · [Practice](content/guide/en/practice.md) |
| Complete a first project | [Starter projects](content/guide/en/start.md) |
| Choose a research question | [Research map](content/guide/en/directions.md) · [Specialized topics](content/guide/en/advanced-topics.md) |
| Read, design, and evaluate research | [Reading papers](content/guide/en/reading.md) · [Experimental design](content/guide/en/research-methods.md) · [Datasets](content/guide/en/datasets.md) |
| Produce reliable research artifacts | [Research engineering](content/guide/en/engineering.md) · [Responsible AI](content/guide/en/responsible-ai.md) |
| Communicate and collaborate | [Writing](content/guide/en/writing.md) · [Academic contact](content/guide/en/contact.md) |

The [60-question research handbook](content/guide/en/research.md) answers common questions across these stages. The [resource index](content/guide/en/resources.md) provides the full directory. Attributed [personal experiences](content/guide/en/experience.md) remain supplementary reading.

## Preview locally

Use Node.js 22 or newer and Python 3 for the local server.

```bash
npm ci
npm run build
npm run dev
```

Open [the English presentation homepage](http://127.0.0.1:8000/blog/guide/) or [the Chinese homepage](http://127.0.0.1:8000/blog/guide/zh.html).

| Page | Generated file |
| --- | --- |
| Repository root for GitHub Pages | `index.html` |
| English presentation homepage, the default local entry | `public/blog/guide/index.html` |
| Chinese presentation homepage | `public/blog/guide/zh.html` |
| Site root, also showing the presentation homepage | `public/index.html` |
| English guide overview | `public/blog/guide/en/index.html` |
| Chinese guide overview | `public/blog/guide/zh/index.html` |

This revision is a **local preview**. Existing public deployments may show earlier content; publishing is a separate step. External links have not all been individually rechecked. Resource pages explain their verification scope and dates.

## Build the editions

```bash
npm run build                     # Main site, presentation homepages, and repository-root entry
npm run build:pages               # GitHub Pages package in dist/github-pages
npm run build:uestc               # Secondary edition
npm run build:uestc:standalone    # Standalone package of the secondary edition
npm test                          # Build and behavior regression checks
```

Both editions use the core Markdown in [content/guide/en](content/guide/en) and [content/guide/zh](content/guide/zh). The main edition contains 45 pages per language, including three community perspective pages. The annual review (`timeline`) is no longer published; its Markdown sources are retained as an archive. The secondary manifest selects 42 pages per language and excludes those community essays; its guide is generated at `public/blog/guide/guide-uestc/en/index.html` and the corresponding `zh/index.html`. Historical Markdown overrides in `content/guide/uestc` remain in the repository and are no longer used as separate core articles.

## Deploy to GitHub Pages

`npm run build` generates a complete English homepage as the repository-root `index.html`, together with `.nojekyll`. Its links and assets use relative paths under `public/blog/guide/`, so it also works when the site is hosted under a repository name.

Choose a publishing method in **Settings → Pages → Build and deployment**:

- **Deploy from a branch:** run `npm run build`, commit the root `index.html`, `.nojekyll`, and the complete `public/blog/guide/` directory, then select the publishing branch and **/(root)**. Rebuild and commit the generated output whenever the source content changes.
- **GitHub Actions:** select **GitHub Actions** as the source. The included Pages workflow runs `npm run build:pages` and publishes `dist/github-pages/`. This package contains its own root `index.html`, `.nojekyll`, and `public/blog/guide/` directory for the main edition.

Keep the full directory structure when uploading or copying a build; `index.html` alone is not a complete website. The local changes here have not been published to a remote repository. See GitHub's [publishing-source instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) for the repository settings.

## Sources and contributions

Maintained by [OpenEnvision](https://openenvision.org/), this project builds on [Takamatsu-Hikaru/AI-Research-Guide](https://github.com/Takamatsu-Hikaru/AI-Research-Guide), earlier [student-contributed AI learning materials](https://my.feishu.cn/docx/HQYodz7thohS1Nxo6KAcoeNtnbb). Original and adapted articles retain author credit and links to their sources. The [Lumina Embodied AI Guide](https://github.com/TianxingChen/Embodied-AI-Guide) informed embodied-AI resources; [irene](https://github.com/tseirene6) provided the source experience for the [paper-reading workflow](content/guide/en/irene-workflow.md).

See [About this guide](content/guide/en/about.md) for editorial standards and acknowledgments, and [CONTRIBUTING.md](CONTRIBUTING.md) for editing guidance. Propose corrections with the affected page, supporting original source, and corresponding language update. Field material is in [content/guide/fieldnotes](content/guide/fieldnotes); figure attribution is recorded in [paper-figures.json](content/guide/paper-figures.json).
