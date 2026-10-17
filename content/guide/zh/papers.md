# 论文选读

本页按研究问题选取经典与代表性工作，帮助读者理解研究任务、方法和证据。清单用于起步，不是完整综述或重要性排名。阅读方法与记录模板见[文献检索与论文阅读](reading.md)。

<a id="paper-selection"></a>

## 带着一个问题选第一篇论文

选择一篇你能说清研究任务、初步理解主要图示的论文。如果每句话都需要补背景，可以先读教材的一节或图解，再带着更具体的问题返回原文。

| 起始问题 | 可以先读 | 重点检查 |
| --- | --- | --- |
| 为什么更深的网络反而更难拟合训练数据？ | [ResNet](https://arxiv.org/abs/1512.03385) | 退化问题、残差块，以及与普通网络的比较 |
| 注意力怎样处理一个序列？ | [Attention Is All You Need](https://arxiv.org/abs/1706.03762) | 输入输出、掩码与机器翻译实验设置 |
| 语言模型怎样利用外部反馈采取行动？ | [ReAct](https://react-lm.github.io/) | 一条完整轨迹、比较方法与失败案例 |

下面的导读说明每篇工作的研究问题、核心思路、阅读顺序与结论边界。年份可能对应会议、期刊或首个预印本；引用时应核对所用版本的记录。历史结果描述的是当时的数据与评测设置，不是当前排行榜名次。

<!-- paper-library -->

<a id="paper-reading"></a>

## 对照讲解，检查自己的理解

先用几句话写清研究问题、方法、证据与一处疑问，再看精读讲解。之后补记哪张图或哪个假设改变了你的理解，用讲解核对理解，而不以讲解代替阅读原文。

[李沐论文精读](limu.md)提供中文讲解，涵盖研究背景、方法、实验与写作。

<figure class="resource-figure medium"><a href="https://www.bilibili.com/video/BV1pu411o7BE/"><img src="../../../public/blog/guide/figures/uestc/reading/limu-transformer.jpg" alt="李沐：Transformer 论文精读" loading="lazy" width="800" height="450"></a><figcaption><a href="https://www.bilibili.com/video/BV1pu411o7BE/">Transformer 论文精读</a><span class="caption-dot">·</span>跟李沐学 AI<span class="caption-dot">·</span><a href="https://www.zhihu.com/zvideo/1437034536677404672">知乎</a></figcaption></figure>

<div class="resource-pair"><figure class="resource-figure "><a href="https://www.bilibili.com/video/BV15P4y137jb/"><img src="../../../public/blog/guide/figures/uestc/reading/limu-vit.jpg" alt="李沐：ViT 论文精读" loading="lazy" width="800" height="450"></a><figcaption><a href="https://www.bilibili.com/video/BV15P4y137jb/">ViT 论文精读</a><span class="caption-dot">·</span>跟李沐学 AI<span class="caption-dot">·</span><a href="https://www.zhihu.com/zvideo/1449195245754380288">知乎</a></figcaption></figure><figure class="resource-figure "><a href="https://www.bilibili.com/video/BV1SL4y1s7LQ/"><img src="../../../public/blog/guide/figures/uestc/reading/limu-clip.jpg" alt="李沐：CLIP 论文精读" loading="lazy" width="800" height="450"></a><figcaption><a href="https://www.bilibili.com/video/BV1SL4y1s7LQ/">CLIP 论文精读</a><span class="caption-dot">·</span>跟李沐学 AI<span class="caption-dot">·</span><a href="https://www.zhihu.com/zvideo/1475706654562299904">知乎</a></figcaption></figure></div>

论文的配套讲解还有很多，知乎、技术博客和 B 站上都能找到。比如 Transformer 的[图解文章](https://jalammar.github.io/illustrated-transformer/)和[带注释的代码实现](https://github.com/harvardnlp/annotated-transformer)。

## 更多论文

语言模型的迁移与适配还可以看 [BERT](https://arxiv.org/abs/1810.04805) 和 [LoRA](https://arxiv.org/abs/2106.09685)。先看训练目标与适配设置，再与后来的系统比较。机器人模仿学习可从上方导读中的 [ACT / ALOHA](https://tonyzhaozh.github.io/aloha/) 继续。

下面这些清单整理了各个方向的论文和相关项目：

- [Agent 论文](https://github.com/WooooDyy/LLM-Agent-Paper-List)
- [多模态大语言模型](https://github.com/BradyFU/Awesome-Multimodal-Large-Language-Models)
- [世界模型](https://github.com/JiahuaDong/Awesome-World-Models)
- [具身智能](https://github.com/TianxingChen/Embodied-AI-Guide)
- [AI for Science](https://github.com/ai4s-research/awesome-ai-for-science)

[Hugging Face Papers](https://huggingface.co/papers)用于发现近期工作。一篇论文被清单收录或受到广泛关注，乃至读者积累了很长的阅读清单，都不能替代对证据强度的判断；仍应阅读原文，与直接相关的工作比较。

## 相关资料

[研究方向总览](directions.md) · [找资料和读论文](reading.md) · [各方向课程、论文与项目](catalog-directions.md)
