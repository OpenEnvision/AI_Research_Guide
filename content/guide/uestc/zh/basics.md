# 基础知识：前置、深度与验收

基础学习的目标是独立解释并检查一个实验：数据怎样进入程序，模型优化什么，指标能支持什么结论。可以按项目需要补缺，也要通过习题和实现建立系统理解。看完视频或运行现成 Notebook，只能证明接触过材料。

## 学习目标与前置地图

本页区分三个深度： **会用** 是能独立运行、调试和修改； **会解释** 是能推导关键步骤并说明假设； **研究所需** 是能比较替代方法、识别适用边界。开始小项目通常需要前两层；具体方向的更深内容可以后补。

| 模块 | 前置 | 入门掌握深度 | 可检测的目标 |
| --- | --- | --- | --- |
| Python 与数值计算 | 基本代数；无需编程经历 | 函数、容器、文件、异常、测试；NumPy 张量形状与广播 | 从 CSV 读取数据，检查缺失值，写一个有输入验证与测试的训练脚本 |
| 数据结构与算法 | Python 函数与循环 | 列表、哈希表、集合、栈/队列、排序、二分搜索；时间与空间复杂度 | 实现去重和词频统计，解释列表查找与哈希查找的成本；测量随样本量增长的时间 |
| Linux / Shell 与 Git | 会运行一个脚本 | 路径、管道、重定向、权限、进程、环境、依赖；提交、分支、差异、合并 | 在新环境重建依赖，用命令启动实验；定位报错，回退一次修改而保留结果 |
| 线性代数与微积分 | 高中代数与函数 | 向量、矩阵、秩、导数、偏导、链式法则 | 标注一个两层网络的所有张量维度；手推线性回归梯度并做数值检查 |
| 概率、统计与信息论 | 基本微积分；求和与积分 | 条件概率、期望/方差、估计、抽样误差；熵、交叉熵、KL | 算一个贝叶斯例子；用重复实验或 bootstrap 描述指标波动；说明数据划分的独立性假设 |
| 优化与经典 ML | 上述数学；基本 Python | 经验风险、正则化、梯度法；线性/逻辑回归、树模型、交叉验证 | 在固定划分上比较常数基线和至少两个模型，解释过拟合与数据泄漏 |
| 深度学习 | 经典 ML 与梯度；张量运算 | 前向、损失、反向、更新；MLP、CNN、Attention 的作用 | 不依赖完整框架模板写训练循环，让模型拟合一小批样本，再评估未见数据 |

先用[学习路径](learning-path.md)选择入口；[课程与教材](courses.md)提供主线与前置要求，[实践训练](practice.md)把每个目标变成可交付的练习。下面保留多种解释材料，按缺口选择一项主资源即可。

[Crash Course Artificial Intelligence](https://thecrashcourse.com/topic/ai/) 是一套科普入门课，介绍监督学习、神经网络、自然语言处理、强化学习、机器人和推荐系统，可以由此了解 AI 的主要问题和方法。

<figure class="resource-figure medium"><a href="https://thecrashcourse.com/topic/ai/" target="_blank" rel="noopener"><img src="../../../public/blog/guide/figures/uestc/intro/crash-ai.png" alt="Crash Course Artificial Intelligence" loading="eager"></a><figcaption><a href="https://thecrashcourse.com/topic/ai/" target="_blank" rel="noopener">Crash Course Artificial Intelligence</a> <span class="caption-dot">·</span> <a href="https://www.bilibili.com/video/BV1tp421m71F/" target="_blank" rel="noopener">B 站</a></figcaption></figure>

## Python 与计算机

Python 广泛用于数据处理、模型训练和实验。除了语言本身，运行项目还会涉及 **环境配置、依赖、终端和版本管理** 。

- [CS50P](https://cs50.harvard.edu/python/)：介绍变量、条件、循环、函数、异常处理、文件操作和测试。
- [MIT 6.100L](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/)：通过 Python 介绍编程与计算思维，配有视频、讲义和编程作业。
- [Missing Semester](https://missing.csail.mit.edu/)：介绍 Shell、Git、调试以及开发中常用的工具。

<figure class="resource-figure compact"><a href="https://cs50.harvard.edu/python/" target="_blank" rel="noopener"><img src="../../../public/blog/guide/figures/uestc/intro/cs50p.png" alt="CS50P" loading="eager"></a><figcaption><a href="https://cs50.harvard.edu/python/" target="_blank" rel="noopener">CS50P</a></figcaption></figure>

AI 项目里还会经常用到 **PyTorch** 和 **Hugging Face** 。PyTorch 用于张量计算、构建神经网络和训练模型；Hugging Face 提供模型、数据集和相关工具。

[PyTorch 基础教程](https://docs.pytorch.org/tutorials/beginner/basics/intro.html) 展示了数据加载、模型定义、自动求导和参数更新的完整过程；[Hugging Face Hub 文档](https://huggingface.co/docs/hub/index)介绍模型与数据集的查找、下载和分享。具体模型和数据有各自的许可与访问条件，使用前应阅读相应说明。

VS Code 等编辑器中的编程 AI，也可以参与代码阅读、功能实现、调试和测试。相关使用方法见[AI 工具](ai.md)。

### 程序、工具与计算成本

先完成一个小任务：读取一个文件夹里的文本，统计词频，按频率排序并保存结果。用函数隔离读取、处理与输出，给空文件和无效路径写测试。随后用 NumPy 检查数组的形状、数据类型、索引、广播和向量化；不要把 Python 列表与数值数组的内存和计算行为混为一谈。

数据结构不要求入门时完成整门算法课，但要能选择容器并说明成本：哈希查找通常是平均 O(1)，不等于任何实现和输入下都保证常数时间；排序通常需要考虑 O(n log n) 级别的工作量。批量数据处理还要检查内存、磁盘 I/O 和是否存在不必要的拷贝。

Linux 服务器的基本要求是会使用 Shell 管理路径、环境变量、文件权限和进程，能读日志并停止自己的进程。macOS/Linux 可直接练习，Windows 可在本地 Python 环境起步，按需要再使用 WSL。用 Git 保存代码和配置，数据与大权重另行记录来源、版本或校验值；提交记录本身不能代替数据版本和运行说明。

**验收：** 让另一个人在新的目录里按 README 建立环境，运行一次小实验并生成相同格式的结果；你能根据 traceback 定位失败位置，而不只复制一条安装命令。

计算机基础还包括数据结构、算法、操作系统、网络和体系结构。[Crash Course Computer Science](https://thecrashcourse.com/topic/computerscience/) 介绍这些领域的基本面貌；[MIT 6.006](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/) 系统讲解数据结构、算法设计与复杂度分析。[CS 自学指南](https://csdiy.wiki/)整理了各领域的课程、教材和学习经验。

## 机器学习

机器学习研究怎样从数据中学习规律，并将它用于预测和决策。模型在训练数据上表现很好，换一批数据却可能出错；模型变得复杂，也可能学到训练样本中的偶然特征。 **训练集与测试集、过拟合、泛化、正则化和模型选择** ，都与这些问题有关。

这些概念贯穿经典机器学习与深度学习。今天研究大模型的数据、训练和评测，仍然需要理解 **模型学到了什么，以及实验结果能够说明什么** 。

[An Introduction to Statistical Learning](https://www.statlearning.com/) 用回归、分类等问题介绍统计学习，配有图示、案例和代码实验。它对模型选择、重采样和正则化的讲解，也能帮助理解实际实验中的比较方法。

[李宏毅机器学习课程](https://speech.ee.ntu.edu.tw/~hylee/ml/2025-spring.php) 提供中文视频，结合模型和应用讲解机器学习与深度学习。[Stanford CS229](https://cs229.stanford.edu/) 更侧重方法的数学推导，涵盖监督学习、无监督学习和概率模型。

<figure class="resource-figure medium"><a href="https://speech.ee.ntu.edu.tw/~hylee/ml/2025-spring.php" target="_blank" rel="noopener"><img src="../../../public/blog/guide/figures/uestc/intro/hongyi-2025.jpg" alt="李宏毅机器学习课程" loading="eager"></a><figcaption><a href="https://speech.ee.ntu.edu.tw/~hylee/ml/2025-spring.php" target="_blank" rel="noopener">李宏毅机器学习课程</a> <span class="caption-dot">·</span> <a href="https://www.bilibili.com/video/BV1aiADewEBC/" target="_blank" rel="noopener">B 站</a></figcaption></figure>

### 怎样验证学会了机器学习

先明确观测单位、预测目标、误差代价和数据采集方式，再划分数据。预处理、特征选择和超参数调节只能使用训练/验证信息；测试集在最终协议确定后使用。普通随机划分适用于近似独立同分布样本；同一人、设备、文档的相关样本应按组划分，时间预测应按时间划分。

用多数类或均值预测建立基线，再比较逻辑回归/岭回归与树模型。分类查看 accuracy、macro-F1、各类 precision/recall 和混淆矩阵；回归至少查看 MAE 与残差。指标选择取决于任务，某一分数提高不能自动说明因果机制或现实效用提高。了解[scikit-learn 的预处理与数据泄漏示例](https://scikit-learn.org/stable/common_pitfalls.html)。

**验收：** 给出数据版本、划分方法、基线、模型选择规则和错误样本；解释为什么在测试集上反复调参会使最终估计偏乐观。更完整的实验论证见[研究方法](research-methods.md)。

## 深度学习

深度学习使用多层神经网络学习数据的表示。图像中的局部特征、文本中的上下文关系，都可以在训练中逐渐形成。

**网络结构** 决定信息怎样处理， **损失函数** 规定训练目标， **优化器** 根据梯度更新参数。

[动手学深度学习](https://zh.d2l.ai/)（D2L）把数学解释、模型实现和实验放在一起，内容包括线性模型、多层感知机、CNN、RNN、Attention 和 Transformer，也有[中文配套课程](https://courses.d2l.ai/zh-v2/)。

<figure class="resource-figure medium"><a href="https://courses.d2l.ai/zh-v2/" target="_blank" rel="noopener"><img src="../../../public/blog/guide/figures/uestc/intro/limu-d2l.jpg" alt="动手学深度学习 v2" loading="eager"></a><figcaption><a href="https://courses.d2l.ai/zh-v2/" target="_blank" rel="noopener">动手学深度学习 v2</a> <span class="caption-dot">·</span> <a href="https://www.bilibili.com/video/BV1if4y147hS/" target="_blank" rel="noopener">B 站</a></figcaption></figure>

[3Blue1Brown 神经网络系列](https://www.3blue1brown.com/lessons/neural-networks/) 用可视化解释神经网络、梯度下降和反向传播。[fast.ai](https://course.fast.ai/) 从实际应用出发，在训练模型的过程中逐步展开深度学习的方法。

<figure class="resource-figure medium"><a href="https://www.3blue1brown.com/lessons/neural-networks/" target="_blank" rel="noopener"><img src="../../../public/blog/guide/figures/uestc/intro/3b1b-neural.jpg" alt="3Blue1Brown · 神经网络" loading="eager"></a><figcaption><a href="https://www.3blue1brown.com/lessons/neural-networks/" target="_blank" rel="noopener">3Blue1Brown · 神经网络</a> <span class="caption-dot">·</span> <a href="https://www.bilibili.com/video/BV1bx411M7Zx/" target="_blank" rel="noopener">B 站</a></figcaption></figure>

[Neural Networks: Zero to Hero](https://karpathy.ai/zero-to-hero.html) 从 micrograd 的自动求导引擎开始，通过 makemore 字符语言模型介绍神经网络的训练，随后实现 GPT 和 tokenizer。课程中的代码规模逐渐增加，梯度、损失和参数更新这些基本概念也会不断出现在后面的模型里。

<figure class="resource-figure medium"><a href="https://karpathy.ai/zero-to-hero.html" target="_blank" rel="noopener"><img src="../../../public/blog/guide/figures/uestc/intro/micrograd.jpg" alt="Neural Networks: Zero to Hero" loading="eager"></a><figcaption><a href="https://karpathy.ai/zero-to-hero.html" target="_blank" rel="noopener">Neural Networks: Zero to Hero</a> <span class="caption-dot">·</span> <a href="https://www.bilibili.com/video/BV1mqrTBvEaf/" target="_blank" rel="noopener">B 站</a></figcaption></figure>

### 训练循环的最小检查

追踪一个 batch 的输入形状、前向输出、损失的标量值、反向梯度与参数更新。区分 `model.train()` / `model.eval()` 和梯度开关：评估模式会改变 Dropout、BatchNorm 等层的行为，但不会自动关闭梯度。保存模型时还要保存配置与预处理规则。

先尝试拟合很小的训练子集，再恢复独立验证集。小样本都拟合不了时，优先检查标签、损失、输出维度、梯度是否被清零或截断；训练好而验证差时，再检查过拟合、划分或分布差异。有限差分可以检查小型光滑计算的梯度，但要考虑步长与浮点误差，不能在非光滑点要求逐位一致。

**验收：** 独立写出 data → forward → loss → backward → step 的循环，画训练/验证曲线，并说明一次学习率或正则化对照的结果；不要求初学阶段从头训练大模型。

## 数学基础

线性代数、微积分、概率统计是模型训练中经常用到的数学基础。信息论中的 **熵、交叉熵和 KL 散度** 也很常见；随机过程与微分方程则更多出现在强化学习、Diffusion、Flow 等具体方法中。

### 线性代数

向量、矩阵、内积和线性变换，是表示数据和组织神经网络计算的基本工具。Transformer 中的 token 表示、 **Q/K/V 投影和注意力计算** ，都能对应到具体的矩阵运算。特征值、奇异值分解和低秩近似，则会出现在表示分析、模型压缩等问题中。

<figure class="resource-figure math-illustration"><img src="../../../public/blog/guide/figures/uestc/intro/math/linear.png" alt="矩阵变换前后的向量与坐标网格"></figure>

[3Blue1Brown 线性代数](https://www.3blue1brown.com/?topic=linear-algebra) 着重解释几何直觉；[MIT 18.06](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/) 系统讲解线性代数及其应用。

<div class="resource-pair"><figure class="resource-figure "><a href="https://www.3blue1brown.com/?topic=linear-algebra" target="_blank" rel="noopener"><img src="../../../public/blog/guide/figures/uestc/intro/3b1b-vectors.jpg" alt="线性代数的本质" loading="eager"></a><figcaption><a href="https://www.3blue1brown.com/?topic=linear-algebra" target="_blank" rel="noopener">线性代数的本质</a> <span class="caption-dot">·</span> <a href="https://www.bilibili.com/video/BV1ys411472E/" target="_blank" rel="noopener">B 站</a></figcaption></figure><figure class="resource-figure "><a href="https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/" target="_blank" rel="noopener"><img src="../../../public/blog/guide/figures/uestc/intro/mit-1806.jpg" alt="MIT 18.06 · Gilbert Strang" loading="eager"></a><figcaption><a href="https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/" target="_blank" rel="noopener">MIT 18.06 · Gilbert Strang</a> <span class="caption-dot">·</span> <a href="https://www.bilibili.com/video/BV1zx411g7gq/" target="_blank" rel="noopener">B 站</a></figcaption></figure></div>

### 微积分与优化

导数描述局部变化率；在欧氏内积下，梯度指向函数局部最陡上升方向，负梯度用于局部下降。 **链式法则** 将复合计算连接起来，反向传播高效计算损失对参数的梯度。SGD 用小批量估计梯度；Adam 结合梯度的一、二阶矩估计作自适应更新，它不是计算 Hessian 的牛顿法。

先掌握学习率、批量大小、正则化、梯度尺度与停止条件；区分凸问题的特定理论条件和神经网络非凸优化的实践行为，不能把训练损失下降当作找到全局最优或泛化改善的保证。 **验收：** 手推平方损失的梯度，在小数据上比较两个学习率，并记录损失、梯度范数和验证误差。

<figure class="resource-figure math-illustration"><img src="../../../public/blog/guide/figures/uestc/intro/math/gradient.png" alt="损失曲线上沿负梯度更新参数的过程"></figure>

[3Blue1Brown 微积分](https://www.3blue1brown.com/lessons/essence-of-calculus/) 介绍导数、积分和链式法则的直观含义；D2L 的优化章节结合代码讲解梯度下降及常用优化器。

<figure class="resource-figure medium"><a href="https://www.3blue1brown.com/lessons/essence-of-calculus/" target="_blank" rel="noopener"><img src="../../../public/blog/guide/figures/uestc/intro/3b1b-calculus.jpg" alt="微积分的本质" loading="eager"></a><figcaption><a href="https://www.3blue1brown.com/lessons/essence-of-calculus/" target="_blank" rel="noopener">微积分的本质</a> <span class="caption-dot">·</span> <a href="https://www.bilibili.com/video/BV1qW411N7FU/" target="_blank" rel="noopener">B 站</a></figcaption></figure>

### 概率论与统计

**条件概率、期望、方差和贝叶斯公式** 是模型定义与训练目标的基础。自回归语言模型估计给定上下文的下一个 token 分布；生成模型用有限样本和选定目标近似数据分布，不能保证恢复真实分布或对分布外输入可靠。强化学习通常优化给定环境与回报定义下的期望回报。

<figure class="resource-figure math-illustration"><img src="../../../public/blog/guide/figures/uestc/intro/math/probability.png" alt="给定上下文后，下一个 token 的条件概率"></figure>

统计估计讨论如何利用观测数据估计未知量。<strong>最大似然估计（MLE）</strong>在选定模型族中最大化观测数据的似然；<strong>最大后验估计（MAP）</strong>在给定先验后最大化参数后验密度。它们的效果依赖模型假设与数据，不能据此断言模型就是数据的真实产生机制。

还要理解样本均值、标准误、置信区间、bootstrap 和假设检验的用途与限制。随机种子间的波动反映部分训练随机性，不能代替对测试样本、群体或时间变化的不确定性分析。置信区间的解释依赖抽样与建模假设；p 值不是“假设为真的概率”。 **验收：** 对一个固定评估集报告点估计与适当的不确定性说明，并解释重复样本或同源样本怎样破坏独立性。

[Seeing Theory](https://seeing-theory.brown.edu/) 用交互演示介绍概率统计；[Harvard Stat 110](https://stat110.hsites.harvard.edu/) 系统讲解概率论。MLE、MAP 与机器学习模型的联系，也可以结合 [CS229 讲义](https://cs229.stanford.edu/notes2022fall/main_notes.pdf)阅读。

### 信息论

离散熵描述分布的不确定性，交叉熵衡量在数据分布下使用另一分布编码的平均代价。对相同支持条件下的离散分布，有 `H(p,q) = H(p) + KL(p || q)`；若 `p(x)>0` 而 `q(x)=0`，KL 可以为无穷大。 **KL 一般不对称，也不满足距离度量的全部性质，不能称为普通距离。** 连续分布的微分熵与离散熵还需区分。

这些量出现在分类/语言模型损失、蒸馏和变分推断中。模型输出概率要结合校准与任务误差分析，较低交叉熵不必然带来每一种下游指标的提高。 **验收：** 手算两个二元分布的交叉熵和两个方向的 KL，说明 one-hot 标签下交叉熵与负对数似然的关系。

<figure class="resource-figure math-illustration"><img src="../../../public/blog/guide/figures/uestc/intro/math/entropy.png" alt="均匀分布与集中分布的熵"></figure>

[MIT 6.441 信息论](https://ocw.mit.edu/courses/6-441-information-theory-spring-2010/) 提供系统讲义，其中熵、互信息和相对熵与机器学习联系密切。

### 随机过程与微分方程

随机过程描述状态随时间的变化。马尔科夫链通过当前状态和转移概率描述下一步，DDPM 的逐步加噪过程就采用了这样的建模方式。强化学习中的马尔科夫决策过程，还加入了行动和奖励。

[MIT 6.041SC](https://ocw.mit.edu/courses/6-041sc-probabilistic-systems-analysis-and-applied-probability-fall-2013/) 涵盖概率基础、随机过程、马尔科夫链和统计推断。

连续时间的生成模型还会用到微分方程。速度场描述样本怎样运动，数值积分把连续过程变成可以执行的采样步骤。这些知识与 Flow Matching、Rectified Flow 直接相连，相关讲解见下面的生成模型部分。

<figure class="resource-figure math-illustration"><img src="../../../public/blog/guide/figures/uestc/intro/math/dynamics.png" alt="逐步加噪的随机过程，以及样本沿速度场移动的轨迹"></figure>

[Mathematics for Machine Learning](https://mml-book.github.io/) 将线性代数、矩阵分解、微积分、概率和优化放在机器学习的背景下介绍，也适合把这些数学知识联系起来。

## 基础知识在具体模型中怎么用

Transformer、生成模型和强化学习是三个典型的例子。Attention 涉及向量表示和矩阵运算；VAE、Diffusion 和 Flow 将概率建模、优化与微分方程联系起来；Policy Gradient、PPO 和 GRPO 则涉及期望回报、概率比率、梯度与策略优化。

### Transformer 与语言模型

Transformer 把向量表示、注意力和神经网络训练结合起来：token 被映射成向量，不同位置通过 Attention 交换信息，模型根据训练目标调整参数。自回归语言模型进一步将一段文本的概率分解为 **逐个 token 的条件概率** ，并以训练语料中的下一 token 为目标最小化负对数似然。训练时使用真实前文（teacher forcing），生成时则把采样或解码出的 token 接回上下文；训练目标和解码策略是不同的选择。

[The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/) 用架构图解释各个模块；[Transformer Explainer](https://poloclub.github.io/transformer-explainer/) 展示可交互的计算过程；[Annotated Transformer](https://github.com/harvardnlp/annotated-transformer) 提供带讲解的实现。

[Super Study Guide: Transformers & Large Language Models](https://superstudy.guide/transformers-large-language-models/) 从神经网络与 Embedding 展开到 Transformer、语言模型及其训练方法。更具体的预训练、后训练与推理问题见[大语言模型](llm.md)。

### 表示学习与生成模型

**表示学习关心怎样从数据中提取和组织特征** ， **生成建模关心怎样学习数据分布并产生新样本** 。两者也会结合，例如 VAE 同时学习潜在表示与生成过程。

VAE 优化证据下界（ELBO），结合重构相关项与潜变量后验的 KL；GAN 使用对抗目标；DDPM 常以预测噪声或等价参数化学习反向去噪；Flow Matching 对选定概率路径的向量场进行回归。目标函数与采样过程各有假设，不能把所有生成训练都说成“直接最大化精确似然”。它们背后的概率、期望、KL 和微分方程来自前面的基础知识。

**进阶门槛：** 先能解释概率密度、期望和自动微分，再推导一个二维玩具生成模型的目标与采样步骤；不必先承担图像大模型训练的计算成本。

[Flow Matching Guide and Code](https://arxiv.org/abs/2412.06264) 将数学讲解与代码示例放在一起；[Rectified Flow 教程](https://rectifiedflow.github.io/)提供讲义、代码和 ICML tutorial 视频，讨论生成轨迹、采样及其与扩散模型的联系。

相关方法、论文与图像生成案例见[生成模型](generation.md)。

### 强化学习与模型后训练

强化学习研究怎样通过行动与反馈改进策略。策略给出行动的概率，回报描述行动带来的结果，策略梯度将 **提高期望回报** 的目标转化为参数更新。

[PPO 原论文](https://arxiv.org/abs/1707.06347) 提出包含裁剪替代目标等版本的方法。常见 PPO-Clip 根据新旧策略概率比与优势对目标作裁剪，减少某些过大更新的优化激励； **裁剪不是对实际参数步长或所有状态上的 KL 的硬性保证** ，仍需监控策略变化、奖励与训练稳定性；可对照 [Spinning Up 的 PPO 说明](https://spinningup.openai.com/en/latest/algorithms/ppo.html)。[GRPO 的原始来源 DeepSeekMath](https://arxiv.org/abs/2402.03300) 用同一问题一组回答的相对奖励构造优势估计；具体归一化、KL 项与实现细节应按论文和代码版本核对。

模型后训练也包括从偏好数据中学习。[DPO](https://arxiv.org/abs/2305.18290) 根据较好与较差回答之间的偏好构造训练目标，在其建模假设下把带 KL 正则的偏好优化转化为直接优化目标；它与常见 PPO 式 RLHF 的训练过程不同，也不表示偏好标签无噪声或能力必然提高。

基础概念、算法和课程见[强化学习](rl.md)。

**进阶门槛：** 先在小型离散环境里解释状态、动作、回报、折扣与价值函数，再检查策略梯度估计。语言模型后训练需要额外的数据、评估与算力规划，不是入门项目的前置。

## 常见卡点与补救

| 现象 | 先检查什么 | 下一步练习 |
| --- | --- | --- |
| 看懂视频却写不出代码 | 是否能脱离讲义写最小函数与输入输出 | 手写数据读取、均值基线与一个指标，补少量针对性习题 |
| 频繁张量维度错误 | batch/特征/序列维度、转置和广播 | 给每一步写形状表，用两个样本手算一次 |
| 环境换一台机器就坏 | Python/依赖版本、相对路径、遗漏文件 | 从空目录按 README 重建，保留原始 traceback |
| 训练不降或出现 NaN | 数据范围、标签、损失输入、梯度与学习率 | 先固定一小批样本和简单模型，逐项对照 |
| 高分但不能解释 | 数据泄漏、评价协议、样本量与对照是否可信 | 回到基线，检查错误案例，并写结论边界 |

## 技术文章与笔记

以下保留各作者的资料与观点归属，具体技术结论应继续核对其引用的论文与代码。

- [机器学习、生成模型与数学笔记](https://knightnemo.github.io/blog/)：涵盖 Diffusion、Diffusion RL、World Model 等主题。来源：[KnightNemo](https://knightnemo.github.io/blog/)。
- [Attention、MoE 与模型架构专题](https://purshow.github.io/#blog)：围绕具体结构、训练方法和研究问题整理的笔记。来源：[Purshow](https://purshow.github.io/#blog)。
- [Attention、位置编码与生成模型推导](https://kexue.fm/)：包含概率建模、模型结构和训练目标的数学分析。来源：[科学空间](https://kexue.fm/)。
- [如何搭建一个科学的 Scaling Ladder](https://jiaxuanzou0714.github.io/blog/2026/how-to-build-scientific-scaling-ladder/)：讨论如何组织不同规模的实验，研究模型、数据和计算之间的关系。来源：[jiaxuan](https://jiaxuanzou0714.github.io/blog/)。

## 下一步

[学习路径](learning-path.md) · [课程与教材](courses.md) · [实践训练](practice.md) · [研究方法](research-methods.md) · [第一个 AI 项目](start.md)

[课程、教材与基础学习](catalog-foundation.md) · [深度学习课程与论文精读](limu.md) · [第一个 AI 项目](start.md) · [研究方向总览](directions.md)
