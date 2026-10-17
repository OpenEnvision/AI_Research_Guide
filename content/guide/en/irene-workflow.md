# A workflow for reading papers and taking notes

A useful reading workflow connects the original source, bibliographic record, your interpretation, and related work. This chapter presents one approach using Zotero and Obsidian, with optional AI assistance. Choose tools that fit your access and working habits, while keeping links to the evidence and a record of open questions.

Later sections cover research briefs, reading depth, and follow-up questions from AI. Start with the part you need; setup instructions and prompts sit alongside the relevant steps.

<a id="notes"></a>

## Organize papers with Zotero and Obsidian

Use Zotero for papers and PDFs and Obsidian for linked notes, or keep using the reference manager and note-taking tool you already know. Add AI assistance only for a clear task. [Scholaread](https://www.scholaread.com/help) is one optional paper reader. A plain note linked to the source is enough to begin; you do not need to install every tool listed here.

Start with one paper:

1. Save its title, authors, year, DOI, source, and PDF in [Zotero](https://www.zotero.org/support/quick_start_guide).
2. Create an [Obsidian](https://obsidian.md/) vault and configure an import template with [Zotero Integration](https://github.com/community-archive/obsidian-zotero-integration). Its repository documents dependencies and setup.
3. Import the literature note and add your annotations, questions, and links to related papers.
4. If using AI, provide only the files needed for the task that you are allowed to share, and describe the result you want. Local file access does not by itself mean processing stays on your computer; check how the chosen service handles material before sharing it.

For example, you could use folders named Papers, Notes, Projects, Attachments, and Templates for literature notes, everyday thoughts, project material, images and other attachments, and reusable templates. One option is [apex-dashboard](https://github.com/PandoraReads/apex-dashboard) for bringing notes, tasks, and projects onto one page.

| Field | What to keep |
| --- | --- |
| Source | Title, authors, year, DOI, Zotero item, and PDF link |
| Question and method | The problem, method, and data |
| Evidence | Main conclusions and the figures, experiments, or passages supporting them |
| Your annotations | Questions, unclear points, and material you might cite |
| Connections | Related topics, papers, projects, and follow-up questions |

With those materials in place, you can make specific requests:

> Compare the methods, data, and conclusions in these three paper notes. Attach the paper and note location to each comparison, and list missing information.

> Reformat this literature note using the template, preserving my annotations and questions. Check that its equations display correctly in Obsidian.

> Use these notes to outline an article around my research question. Put the evidence and sources beside each proposed paragraph.

<a id="brief"></a>

## Prepare a research brief

A research brief brings together papers, code, and lab releases relevant to a question, with dates and links to the original sources.

Begin with a research question and the time available to read. You can assign priorities to topics, but those preferences do not establish their research value. A weekly brief can be more useful than a daily feed if it leaves time to read the selected work.

### A brief prompt to adapt

> Prepare a research brief in my preferred language. My current question is [fill in], my background is [fill in], and my available reading time is [fill in]. Use my research notes, the last seven days of briefs, and my reading log.
>
> Select at most five items that materially help this question. Include the original source, date, version, and publication status. Explain the problem, the evidence available, the limits, and why the item matters now. Separate a release announcement from an independently checked result.
>
> Merge repeated coverage. For a new version, code release, correction, or result, say what changed. Include older foundational or conflicting work when needed to understand the claim. If there is little useful new material, return fewer items and state the search window; do not fill a quota with loosely related news.
>
> End with one item to read closely, the question it may answer, and what remains unverified.

Review one issue and revise the criteria before considering a recurring schedule. Leave time to read the original papers; receiving a brief is not the same as reading its evidence.

To avoid repeating the same items, keep a list of dates, paper titles, project links, and reading status, and provide it for the next issue. This also helps catch the same material under a different description.

<a id="depth"></a>

## How deeply should you read this paper?

A brief gives you a shortlist. Assess each paper's question and evidence, then consider the time needed to read it, its connections to other work, and possible follow-up experiments.

Maintain a map of questions and sources:

- Current research threads and unresolved questions.
- Foundational work and prerequisites already covered.
- Models or experiments currently running or already reproduced.
- Threads to connect, such as AI and biology.
- Topics outside the current scope.

For a new paper, ask whether it directly addresses a question, connects two threads, supplies a useful tool, or simply shares keywords. “World models” and “AI4S” name fields; the question you want to investigate is usually more specific.

Consider whether the paper challenges an assumption or fills a gap in your methods. Use the [reading-depth table](reading.md#reading-depth) to choose between locating, understanding, evaluating, and reproducing. A central paper with incomplete evidence may deserve close reading; a rigorous but unrelated paper may need only a note.

> Propose a reading plan for my question. Identify the essential sections and figures, the prerequisites I need, and three questions I should be able to answer afterward. Attach source locations and keep unsupported interpretations marked as unverified.

<a id="grill"></a>

## Read with AI—and let it question you

[paper-tools-marketplace](https://github.com/tseirene6/paper-tools-marketplace) provides reading workflow tools. To use Grill Me: explain the paper yourself, let AI ask follow-up questions and identify gaps in the explanation, then return to the source.

> I will explain this method diagram. Ask one question at a time about the inputs and outputs, why a module is needed, key assumptions, and experimental evidence. Wait for my answer, then identify what I have not explained clearly and which part of the paper to revisit.

Start with one figure or equation, explain it without the assistant, and compare the follow-up questions with the original paper. Ask it to challenge your account rather than supply an explanation for you to repeat. Fluent answers and agreement do not show that you understand the paper.

Keep only useful corrections in the note: the earlier misunderstanding, the source location that resolved it, and the remaining question. The original PDF includes examples of this discussion and of organizing related work. The general [reading chapter](reading.md) gives the full method and evidence checklist.

<a id="search"></a>

## Follow questions into the literature

A deeper search becomes useful when several papers point to the same bottleneck, one connects two research threads, or a question becomes concrete enough to investigate. The same process can lead to teams, supervisors, labs, and follow-up projects.

Express a question as “subject + mechanism + task + phenomenon to investigate,” and use tools such as [Qiewen (Chinese interface)](https://qiewenpaper.com/zh/home) to find matching literature. Then look for foundational papers, direct predecessors, and contemporary work, and follow author and project pages to code, data, supplementary experiments, and later versions.

Update your research map to show what you now understand, which explanations have changed, and what remains worth investigating. Those questions also make useful starting points for conversations with researchers.

<a id="tools"></a>

## Tools, extensions, and reusable prompts

Optional reading and search tools include [Scholaread](https://www.scholaread.com/help) for reading and [Qiewen (Chinese interface)](https://qiewenpaper.com/zh/home) for search.

Alongside the note-taking tools above, the original notes discuss using Claude Code with DeepSeek in a terminal: [DeepSeek integration instructions](https://api-docs.deepseek.com/zh-cn/quick_start/agent_integrations/claude_code).

### Editor and browser tools

| Task | Tools mentioned in the original |
| --- | --- |
| Editor language and Markdown | Simplified Chinese language pack, markdownlint, Markdown Preview Enhanced with litvis |
| Spelling and formatting | [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker), [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) |
| Errors and version history | [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens), [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) |
| Data analysis | [Jupyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter), [Rainbow CSV](https://marketplace.visualstudio.com/items?itemName=mechatroner.rainbow-csv) |
| LaTeX | [LaTeX Workshop](https://marketplace.visualstudio.com/items?itemName=James-Yu.latex-workshop), with a local LaTeX installation |
| Browser reading | AnyDoc translator, LaTex Math Equations Viewer, Markdown Reader |
| Collecting references | [Zotero Connector](https://www.zotero.org/download/connectors) |

### Keep repeated steps as a workflow

A reusable workflow records the inputs, permitted actions, output format, source requirements, and checks. The original names tools such as Plan, Arxiv / Firecrawl, Jupyter, Research Paper Writing, Humanizer, and PowerPoint. These are examples from one setup; their names do not guarantee accuracy or replace checking the original material.

When describing a task, specify the inputs, intended result, format, length or time limit, material to preserve, and citation requirements. The first run can simply collect one paper, import a note, and ask AI to organize it. Repeated steps can then become reusable workflows.

[Finding and reading papers](reading.md) · [AI tools](ai.md) · [Lookout](lookout.md)


## Source

By [irene](https://github.com/tseirene6) · Adapted from the author's Chinese research notes · [Original Chinese PDF with screenshots](../../../public/blog/guide/sources/irene-research-workflow.pdf) · [Paper-reading toolkit](https://github.com/tseirene6/paper-tools-marketplace)
