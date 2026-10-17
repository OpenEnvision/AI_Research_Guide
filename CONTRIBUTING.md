# 更新指南

这个仓库保存指南的正文、论文卡片、图片和页面代码。仓库包含 GitHub Pages 构建工作流，是否自动发布取决于目标仓库的 Actions 与 Pages 配置。本地构建只更新本地文件；当前部署地址应以目标仓库的 Pages 设置为准。

## 直接在 GitHub 修改

1. 在下表找到对应文件，打开后点铅笔按钮。网站每篇文章底部也有“编辑本页”入口。
2. 修改文字或链接，用 Preview 看排版。正文使用 Markdown，也可以嵌入视频等 HTML。
3. 提交修改。有仓库写入权限可以提交到 `main`；其他贡献者通过 PR 提交。提交前核对中英文语义、引用和本地构建。
4. 如目标仓库已启用发布，在其 Actions 与 Pages 中查看结果。不要将本地预览视为已更新的线上版本。

## 改什么，去哪里

| 内容 | 文件 |
| --- | --- |
| 学习路线、MOOC、练习、数据、实验方法 | `content/guide/{zh,en}/{learning-path,courses,practice,datasets,research-methods}.md`；两版共用这些源文件 |
| 中文文章、首页、学习路线、课程与资源链接 | [content/guide/zh](content/guide/zh) |
| 英文文章 | [content/guide/en](content/guide/en)，文件名与中文对应 |
| Wiki 术语解释、别名、相关概念与原文链接 | [content/wiki](content/wiki)，每个分类一个 JSON；修改后随指南自动构建。`categories.json` 管理分类与方向页入口，`en/` 保存对应 ID 的英文释义，`locales.en.json` 管理英文分类、主题名称和说明，`grouping.json` 管理各分类的主题顺序、用途说明与旧主题链接迁移 |
| Wiki 搜索和排版 | [public/blog/guide/wiki](public/blog/guide/wiki)，`search.js` 为检索逻辑，`wiki.js` 为页面交互，`wiki.css` 为样式；`data.js`、`data-en.js` 和中英文 HTML 由源词库及 `scripts/wiki-shell.mjs` 生成 |
| 科研 60 问 | [中文](content/guide/zh/research.md) · [英文](content/guide/en/research.md) |
| 方向简介、发展路线、术语、论文卡片、入门练习 | [content/guide/fieldnotes](content/guide/fieldnotes)，每个方向一个 JSON，含 `zh`、`en` 文案；例如 [agent.json](content/guide/fieldnotes/agent.json) |
| AI 与机器人公司、模型技术报告 | [scripts/guide-directory.mjs](scripts/guide-directory.mjs) 中的 `companies`、`roboticsCompanies`、`reports` |
| OE、Lumina、AgentHub 等社区介绍 | 两种语言的 [home.md](content/guide/zh/home.md) 和 [lookout.md](content/guide/zh/lookout.md) |
| 论文插图及来源 | [public/blog/guide/figures](public/blog/guide/figures) · [paper-figures.json](content/guide/paper-figures.json) |
| 公司、社区图标及来源 | [public/blog/guide/brands](public/blog/guide/brands)；社区图标由 [guide-directory.mjs](scripts/guide-directory.mjs) 选择 |
| 站点图标与品牌标志 | `favicon-openenvision.png`（64px，用于 `<link rel="icon">`）· `logo-openenvision.png`（官方 GitHub 品牌图片）。`logo.png` 是 2048px 原图，不要直接放进页面——每页会多下载 3MB |
| 编年史视频、封面和字幕 | [public/blog/guide/chronicle](public/blog/guide/chronicle)；视频位置写在 `home.md` 和 `directions.md` |
| 各版包含的页面 | 主版 [manifest.json](content/guide/manifest.json) · 副版 [uestc/manifest.json](content/guide/uestc/manifest.json)，分别限定内容范围 |
| 阅读导航分组与显示标题 | [guide-shell-uestc.mjs](scripts/guide-shell-uestc.mjs) |
| 阅读页面 HTML 布局 | [guide-shell-uestc.mjs](scripts/guide-shell-uestc.mjs)；[build-guide.mjs](scripts/build-guide.mjs) 负责主站构建 |
| 独立展示主页 | [guide-landing.mjs](scripts/guide-landing.mjs) · [landing.css](public/blog/guide/landing.css) · [landing.js](public/blog/guide/landing.js) |
| 论文小卡与方向页布局 | [scripts/fieldnotes.mjs](scripts/fieldnotes.mjs) |
| 阅读页颜色、间距和移动端排版 | [guide-academic.css](public/blog/guide/guide-academic.css) 统一中英文阅读样式，随后加载 `language-switch.css`；基础与方向组件样式仍在 [guide.css](public/blog/guide/guide.css)、[fieldnotes.css](public/blog/guide/fieldnotes.css) 和 [guide-motion.css](public/blog/guide/guide-motion.css) |
| 两套版式共用的内容管线与校验 | [guide-model.mjs](scripts/guide-model.mjs) · [guide-verify.mjs](scripts/guide-verify.mjs) |
| 两版共用的阅读外壳与基础皮肤 | [guide-shell-uestc.mjs](scripts/guide-shell-uestc.mjs) · [guide-uestc.css](public/blog/guide/guide-uestc.css)；最终阅读样式由 [guide-academic.css](public/blog/guide/guide-academic.css) 统一 |
| AI4X 各细分方向正文与论文卡位置 | [中文](content/guide/zh/ai4x.md) · [英文](content/guide/en/ai4x.md)；`data-ai4x-papers` 引用 `fieldnotes/ai4x.json` 中的小卡 ID |
| AI4X 循环示意图与英文标签 | [ai4x](public/blog/guide/ai4x)：`motion-physical.js`、`motion-bio.js`、`motion-research.js` 定义画面，`motion-en.js` 提供英文标签 |
| 方向演示动画 | [scripts/guide-motion.mjs](scripts/guide-motion.mjs) · [guide-motion.js](public/blog/guide/guide-motion.js) |
| 仓库首页介绍与导航 | [README.md](README.md) · [README_EN.md](README_EN.md) · [README_ZH.md](README_ZH.md) |

网站的方向页会把 Markdown 正文与 JSON 中的简介、论文卡片拼在一起；Lookout 的公司目录由共享模块插入。查看这些页的全部内容时，可以同时看对应的在线页面和上表中的源文件。

语言切换由 `scripts/guide-language.mjs` 与 `public/blog/guide/language-switch.css` 共用；界面显示 EN / CN，HTML 语言属性仍使用 `en` 与 `zh-CN`。

Wiki 右侧 Useful links 由 `content/wiki/useful-links.json` 管理：`resources` 保存资源 URL 与中英文名称、用途说明，`collections` 按分类排列 4–5 个资源 ID，`all` 是未选分类时的通用入口。`topics` 以分类 ID 和 `grouping.json` 中的精确主题 ID 保存各主题的 2–4 个资源及双语说明，必须覆盖每个主题；选择“全部主题”时使用分类推荐。共用资源复用同一 ID；两种语言使用相同 URL 与顺序，修改后随 Wiki 一起构建。

Wiki 中一个概念只保留一个稳定 ID 和一份主词条。`category` 指定主分类，`categories` 可提供跨分类入口；确需在目标分类使用不同主题时，通过 `categoryGroups` 指定目标分类的分组，避免把原分类的组名直接带过去。调整主题后同步 `grouping.json` 与 `locales.en.json` 中按分类保存的说明；已移除的旧主题可以映射到新主题，拆分后无法唯一对应时用空字符串返回该分类全部主题。不要为仍在使用的主题配置旧名迁移。

## 版本同步

两版核心正文统一来自 `content/guide/en` 与 `content/guide/zh`，共同文章只需修改一处源文件，再检查对应语言。`content/guide/uestc/{en,zh}` 中的旧 Markdown 作为历史来源保留，不参与当前正文渲染。

- 主版与副版分别由 `content/guide/manifest.json`、`content/guide/uestc/manifest.json` 限定范围。目前主版每语言 45 页；副版为 42 页，不含 `welcome`、`experience`、`life` 三页社区视角文章。`timeline` 年度回顾已退出发布范围，原始 Markdown 保留存档。新增页面按所需范围加入相应 manifest。
- 两版共用 `guide-shell-uestc.mjs` 阅读布局、方向数据与图片；`guide-academic.css` 提供阅读样式，`language-switch.css` 在其后加载，统一中英文阅读样式。展示主页由 `guide-landing.mjs`、`landing.css` 和 `landing.js` 独立管理。
- 方向页的已审读文案共用 `content/guide/uestc/fieldnotes.json`（中文）与 `fieldnotes.en.json`（英文）；两个文件的方向、概念、里程碑及引用应一一对应。论文卡片仍在 `content/guide/fieldnotes`。Lookout 对应使用 `content/guide/uestc/lookout-directory.json` 与 `lookout-directory.en.json`。
- `npm run build` 构建主站与展示主页；`npm run build:uestc` 构建副版；`npm run build:uestc:standalone` 生成副版独立包。`npm test` 检查两版构建与共享内容。
- 需要同步到其他站点时，先核对其构建与部署配置。本地构建不会自动更新公开站点。

## 本地预览

安装 Node.js 22 或更新版本，以及用于本地服务器的 Python 3，在仓库目录运行：

```bash
npm ci
npm run build
npm test               # 两版构建与行为回归检查
npm run dev            # 通过本地 HTTP 服务预览
```

打开 [http://127.0.0.1:8000/blog/guide/](http://127.0.0.1:8000/blog/guide/)，默认是英文展示主页；中文展示主页为 `/blog/guide/zh.html`。指南概览分别位于 `/blog/guide/en/index.html` 和 `/blog/guide/zh/index.html`。副版先运行 `npm run build:uestc`，再访问 `/blog/guide/guide-uestc/en/index.html` 或对应中文入口。

构建会检查内部页面链接、论文配图、科研问答数量及本地资源引用；这些检查不代表所有外部链接已逐项复核。仓库根目录的 `index.html`、`public/index.html`、`public/blog/guide/index.html`、`public/blog/guide/zh.html`、两版语言目录中的 HTML 及搜索数据都由构建生成。文章改 Markdown，阅读布局改 `guide-shell-uestc.mjs`，展示主页改 `guide-landing.mjs`；图片、视频、CSS 和浏览器脚本改 `public/blog/guide/` 内对应文件。使用 GitHub Pages 分支根目录发布时，先运行 `npm run build`，再提交根目录的 `index.html`、`.nojekyll` 和完整的 `public/blog/guide/`；不要只提交入口页。使用 GitHub Actions 发布时，工作流执行 `npm run build:pages` 并上传 `dist/github-pages/`，其中包含根入口和主版本资源。

## 补充内容

欢迎补链接、纠正错误、分享亲自做过的项目和失败经验。介绍一份资料时，交代它在讲什么、适合解决什么问题，并附原文或项目地址。论文卡片沿用相邻条目的结构，配上原图和来源。

两种语言能一起更新最好；只方便写一种语言也可以提交，在 PR 中说明即可。

## Editing in English

Articles live in [content/guide/en](content/guide/en), paired by filename with [Chinese articles](content/guide/zh). Edit a file on GitHub and submit your change or a pull request. Each website article also has an **Edit this page** link. The repository includes a GitHub Pages workflow; automatic publication depends on the destination repository's Actions and Pages configuration. A local build does not update an online deployment.

- **Field introductions, milestones, terminology and paper cards:** [content/guide/fieldnotes](content/guide/fieldnotes). Each JSON contains both languages. Reviewed direction copy is shared by both editions through [fieldnotes.json](content/guide/uestc/fieldnotes.json) and its [English counterpart](content/guide/uestc/fieldnotes.en.json); update the corresponding concepts, milestones and references together.
- **Company directory and technical reports:** [scripts/guide-directory.mjs](scripts/guide-directory.mjs).
- **Reviewed company descriptions:** [lookout-directory.json](content/guide/uestc/lookout-directory.json) and [lookout-directory.en.json](content/guide/uestc/lookout-directory.en.json), with matching team IDs and destinations.
- **Community introductions:** `home.md` and `lookout.md` in each language.
- **Figures and attribution:** [figures](public/blog/guide/figures) and [paper-figures.json](content/guide/paper-figures.json).
- **Video and subtitles:** [chronicle](public/blog/guide/chronicle), embedded in `home.md` and `directions.md`.
- **Reader layout:** [guide-shell-uestc.mjs](scripts/guide-shell-uestc.mjs), shared by both editions. [fieldnotes.mjs](scripts/fieldnotes.mjs) renders field components. [guide-academic.css](public/blog/guide/guide-academic.css) supplies the reading styles for both languages; `language-switch.css` loads after it for the shared EN / CN control.
- **Presentation homepage:** [guide-landing.mjs](scripts/guide-landing.mjs), with independent [landing.css](public/blog/guide/landing.css) and [landing.js](public/blog/guide/landing.js).
- **Shared content pipeline:** [guide-model.mjs](scripts/guide-model.mjs) feeds both editions; [guide-verify.mjs](scripts/guide-verify.mjs) resolves every asset reference at build time.
- **Edition scope:** the [main manifest](content/guide/manifest.json) and [secondary manifest](content/guide/uestc/manifest.json) independently select pages. Both use articles from `content/guide/{en,zh}`. The secondary edition currently includes 42 pages per language and omits the three community perspective pages still published in the main edition; the annual review (`timeline`) is retained only as Markdown source. Historical Markdown overrides under `content/guide/uestc/{en,zh}` are retained but no longer rendered.

Use Node.js 22+ and Python 3. Run `npm ci`, `npm run build`, and `npm run dev`, then open [http://127.0.0.1:8000/blog/guide/](http://127.0.0.1:8000/blog/guide/) for the default English presentation homepage; `/blog/guide/zh.html` is the Chinese homepage. The guide overviews are at `/blog/guide/en/index.html` and `/blog/guide/zh/index.html`. Run `npm run build:uestc` for the secondary edition or `npm run build:uestc:standalone` for its standalone package. `npm test` checks both editions. Local preview does not publish changes, and local build checks do not verify every external link.

Wiki Useful links are maintained in `content/wiki/useful-links.json`. Keep one shared resource ID and URL with paired Chinese/English titles and descriptions, then order 4–5 resource IDs per category in `collections`; `all` supplies the general selection. The `topics` map uses category IDs and exact topic IDs from `grouping.json`; cover every topic with 2–4 resource IDs and bilingual descriptions. Selecting All topics restores the category selection. Both languages use the same destinations and order.

Generated homepages, language folders, and search data are rebuilt from source, including the repository-root `index.html`. For GitHub Pages publishing from a branch at **/(root)**, run `npm run build` and commit the root `index.html`, `.nojekyll`, and the complete `public/blog/guide/` directory. The entry file alone is not sufficient. With **GitHub Actions** as the publishing source, the included workflow runs `npm run build:pages` and uploads `dist/github-pages/`, which contains the root entry and main-edition assets. Edit shared Markdown once, update the corresponding language, and add new pages to whichever manifests should include them. Keep resource descriptions concrete and link to original sources. Contributions in either language are welcome.


## 课程与研究资料的编辑规范

指南面向全球大学生与初级研究者。正文不默认读者属于某所学校、社团、国家或固定学制；升学、实习与科研机会按目标、先修能力和实际要求描述。保留课程、论文、实验室及原始文章的真实来源信息，改编社区经历时明确署名，不将个人或机构的成绩转写为本项目的经历。

- 两种语言使用相同的主资源和对应结构，保留专业术语、条件、否定和限制的含义。语言顺畅不能替代事实准确。
- 新推荐优先查阅课程方、作者、官方文档与原始论文，记录实际核验日期与范围。区分完整访问、仅入口/摘要可核验和未验证，不宣称完成过未运行的作业。
- 每条课程至少说明资源类型、语言、先修能力、覆盖主题与建议学习产出。标明存档学期；不把平台入口视为统一免费、颁证或课程权限承诺。
- 练习页说明训练目标和可审阅产出，避免把题量、排名或证书当作研究能力。共通访问规则集中说明，条目优先保留具体学习差异。
- 研究内容写清问题、假设、控制变量、数据划分、指标定义、分析单位与结论边界。区分论文接收、预印本、索引和独立复现。
- 新正文统一放在 `content/guide/{zh,en}`，按各版需要分别加入对应 manifest；不要新增或同步旧 uestc Markdown overrides。共同文章只保留一套源文件，修改后运行 `npm test` 检查两版。
- 保留来源署名、图像出处与可用的显式锚点。调整页面结构后运行构建、检查跨页锚点与搜索，并在桌面和移动端验证可读性。
- 先解释概念、前置知识与阅读方法，再提供按需练习。避免把每章都写成完整实验作业、重复长表单或统一周数计划。重要限制与常见误解应写具体；工具名称与资源数量不能替代学习路径。论文库的选读指导放在卡片之前，保留 `<!-- paper-library -->` 定位标记。

Write for university students and junior researchers worldwide without assuming a home institution, national education system, fixed degree length, or club membership. Keep factual affiliations and source credit, and identify adaptations of personal accounts.

English editors should follow the same standards: pair resource lists and meanings across languages, identify prerequisites and outcomes, verify primary sources, record the actual scope of checks, distinguish empirical evidence from experience, and preserve attribution and stable anchors. New pages live once under `content/guide/{zh,en}` and are included through the relevant edition manifests; do not create or synchronize historical uestc Markdown overrides.

Explain concepts, prerequisites, and reading choices before optional exercises. Avoid turning every chapter into a full experiment assignment, duplicating long forms, or prescribing one completion timetable. Keep limitations specific. Place paper-selection guidance before the cards and preserve the `<!-- paper-library -->` marker.

Language switches preserve verified semantic anchors shared by both translations. Generated `sec-N` and `resource-N` IDs are not correspondence markers. English interface text includes accessible labels, image descriptions, loading messages and empty states. The participation page links to this guide's issue tracker; it does not embed another community's live discussion feed. `npm test` checks bilingual data structure, English fallbacks, language destinations and AI4X canvas labels in addition to the builds.

