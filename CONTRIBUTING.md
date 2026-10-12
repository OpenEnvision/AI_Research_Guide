# 更新指南

这个仓库保存指南的正文、论文卡片、图片和页面代码。`main` 分支更新后，GitHub Actions 会重新生成中英文 HTML，并发布到[在线指南](https://takamatsu-hikaru.github.io/AI-Research-Guide/zh/)。

## 直接在 GitHub 修改

1. 在下表找到对应文件，打开后点铅笔按钮。网站每篇文章底部也有“编辑本页”入口。
2. 修改文字或链接，用 Preview 看排版。正文使用 Markdown，也可以嵌入视频等 HTML。
3. 提交修改。有仓库写入权限可以提交到 `main`；其他贡献者通过 PR 提交。
4. 在 [Actions](https://github.com/Takamatsu-Hikaru/AI-Research-Guide/actions/workflows/pages.yml) 查看发布结果。发布成功后，网站就会显示新内容。

## 改什么，去哪里

| 内容 | 文件 |
| --- | --- |
| 中文文章、首页、学习路线、课程与资源链接 | [content/guide/zh](content/guide/zh) |
| 英文文章 | [content/guide/en](content/guide/en)，文件名与中文对应 |
| Wiki 术语解释、别名、相关概念与原文链接 | [content/wiki](content/wiki)，每个分类一个 JSON；修改后随指南自动构建。`categories.json` 管理分类与方向页入口 |
| Wiki 搜索和排版 | [public/blog/guide/wiki](public/blog/guide/wiki)，`search.js` 为检索逻辑，`wiki.js` 为页面交互，`wiki.css` 为样式；`data.js` 由源词库生成 |
| 科研 60 问 | [中文](content/guide/zh/research.md) · [英文](content/guide/en/research.md) |
| 方向简介、发展路线、术语、论文卡片、入门练习 | [content/guide/fieldnotes](content/guide/fieldnotes)，每个方向一个 JSON，含 `zh`、`en` 文案；例如 [agent.json](content/guide/fieldnotes/agent.json) |
| AI 与机器人公司、模型技术报告 | [scripts/guide-directory.mjs](scripts/guide-directory.mjs) 中的 `companies`、`roboticsCompanies`、`reports` |
| OE、Lumina、AgentHub 等社区介绍 | 两种语言的 [home.md](content/guide/zh/home.md) 和 [lookout.md](content/guide/zh/lookout.md) |
| 论文插图及来源 | [public/blog/guide/figures](public/blog/guide/figures) · [paper-figures.json](content/guide/paper-figures.json) |
| 公司、社区图标及来源 | [public/blog/guide/brands](public/blog/guide/brands)；社区图标由 [guide-directory.mjs](scripts/guide-directory.mjs) 选择 |
| 站点图标与社徽 | `favicon.png`（64px，用于 `<link rel="icon">`）· `logo-mark.png`（384px，用于页面上的小尺寸社徽）。`logo.png` 是 2048px 原图，不要直接放进页面——每页会多下载 3MB |
| 编年史视频、封面和字幕 | [public/blog/guide/chronicle](public/blog/guide/chronicle)；视频位置写在 `home.md` 和 `directions.md` |
| 导航里的页面与顺序 | [content/guide/manifest.json](content/guide/manifest.json) |
| 全站 HTML 布局 | [scripts/build-guide.mjs](scripts/build-guide.mjs) |
| 论文小卡与方向页布局 | [scripts/fieldnotes.mjs](scripts/fieldnotes.mjs) |
| 颜色、间距和移动端排版 | [guide.css](public/blog/guide/guide.css) · [fieldnotes.css](public/blog/guide/fieldnotes.css) · [guide-motion.css](public/blog/guide/guide-motion.css) |
| 两套版式共用的内容管线与校验 | [guide-model.mjs](scripts/guide-model.mjs) · [guide-verify.mjs](scripts/guide-verify.mjs) |
| uestc 版的外壳与样式 | [guide-shell-uestc.mjs](scripts/guide-shell-uestc.mjs) · [guide-uestc.css](public/blog/guide/guide-uestc.css) |
| AI4X 各细分方向正文与论文卡位置 | [中文](content/guide/zh/ai4x.md) · [英文](content/guide/en/ai4x.md)；`data-ai4x-papers` 引用 `fieldnotes/ai4x.json` 中的小卡 ID |
| AI4X 循环示意图与英文标签 | [ai4x](public/blog/guide/ai4x)：`motion-physical.js`、`motion-bio.js`、`motion-research.js` 定义画面，`motion-en.js` 提供英文标签 |
| 方向演示动画 | [scripts/guide-motion.mjs](scripts/guide-motion.mjs) · [guide-motion.js](public/blog/guide/guide-motion.js) |
| 仓库首页介绍与导航 | [README.md](README.md) · [README_EN.md](README_EN.md) |

网站的方向页会把 Markdown 正文与 JSON 中的简介、论文卡片拼在一起；Lookout 的公司目录由共享模块插入。查看这些页的全部内容时，可以同时看对应的在线页面和上表中的源文件。

## 版本同步

社团版使用 content/guide/uestc 的正文，个人版与 GitHub Pages 使用 content/guide 下的正文。共同文章保持一致，个人版另保留大学开篇、相关个人经历与 LessWrong 的成长和生活文章。两版共用 guide-shell-uestc.mjs、guide-uestc.css、guide-intro.css、方向数据和图片。

- 修改共同文章时，同步两处 Markdown；npm test 会比较实际渲染内容。
- 方向页的已审读中文文案共用 content/guide/uestc/fieldnotes.json；论文卡片仍在 content/guide/fieldnotes。
- Lookout 共用 content/guide/uestc/lookout-directory.json。
- npm run build 构建个人版与 GitHub Pages；npm run build:uestc 构建社团版。
- 用 node scripts/sync-personal-site.mjs <个人主页仓库路径> 同步指南文件，再在个人主页仓库运行 npm run build:guide。

## 本地预览

安装 Node.js 22 或更新版本，在仓库目录运行：

```bash
npm ci
npm run build          # 或 npm run build:uestc
npm test               # 两套版式的回归检查（node --test，无额外依赖）
```

构建会检查页面链接、论文配图、科研问答数量，以及（uestc 版）全部本地资源引用能否解析。然后打开 `public/blog/guide/zh/index.html` 或 `public/blog/guide/guide-uestc/zh/index.html`。需要播放视频字幕时，可以通过本地 HTTP 服务预览。

`public/blog/guide/{zh,en}/` 和 `public/blog/guide/guide-uestc/{zh,en}/` 是生成的 HTML，构建时会重建。文章改 Markdown；布局改生成模板；图片、视频、CSS 和浏览器脚本直接改 `public/blog/guide/` 内对应文件。

## 补充内容

欢迎补链接、纠正错误、分享亲自做过的项目和失败经验。介绍一份资料时，交代它在讲什么、适合解决什么问题，并附原文或项目地址。论文卡片沿用相邻条目的结构，配上原图和来源。

两种语言能一起更新最好；只方便写一种语言也可以提交，在 PR 中说明即可。

## Editing in English

Articles live in [content/guide/en](content/guide/en), paired by filename with [Chinese articles](content/guide/zh). Edit a file on GitHub and submit your change or a pull request. Each website article also has an **Edit this page** link. Updates to `main` automatically build and publish both languages through [GitHub Actions](https://github.com/Takamatsu-Hikaru/AI-Research-Guide/actions/workflows/pages.yml).

- **Field introductions, milestones, terminology, paper cards and exercises:** [content/guide/fieldnotes](content/guide/fieldnotes). Each JSON contains both languages.
- **Company directory and technical reports:** [scripts/guide-directory.mjs](scripts/guide-directory.mjs).
- **Community introductions:** `home.md` and `lookout.md` in each language.
- **Figures and attribution:** [figures](public/blog/guide/figures) and [paper-figures.json](content/guide/paper-figures.json).
- **Video and subtitles:** [chronicle](public/blog/guide/chronicle), embedded in `home.md` and `directions.md`.
- **HTML layout:** [build-guide.mjs](scripts/build-guide.mjs) and [fieldnotes.mjs](scripts/fieldnotes.mjs). Styling and browser scripts are in [public/blog/guide](public/blog/guide).
- **Shared content pipeline:** [guide-model.mjs](scripts/guide-model.mjs) feeds both editions; [guide-verify.mjs](scripts/guide-verify.mjs) resolves every asset reference at build time.
- **Second edition (uestc_ai skin):** [guide-shell-uestc.mjs](scripts/guide-shell-uestc.mjs) and [guide-uestc.css](public/blog/guide/guide-uestc.css).

Use Node.js 22+, run `npm ci` and `npm run build` (or `npm run build:uestc` for the second edition), then open the generated guide. `npm test` runs the regression checks over both editions. Generated language folders are rebuilt from source; edit Markdown for articles and templates for layout. Keep resource descriptions concrete and link to original sources. Contributions in either language are welcome.
