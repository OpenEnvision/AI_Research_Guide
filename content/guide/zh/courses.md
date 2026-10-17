# 课程、教材与 MOOC

课程有助于建立系统的知识结构；教材便于查定义、补推导；官方教程适合把概念落实为可运行代码。先确定需要解释或完成的任务，再选一条主线和一份补充资料。无需同时学习这里列出的所有资源。

本页提供 **69 个入口：5 个 MOOC 平台和 64 项课程、教材或官方教程** 。中英文资源对应；每项注明语言、先修、主题与建议学习产出。


自学时应区分材料访问与正式注册、作业评阅、证书和学分。核对授课语言、版本、先修与反馈渠道；决定系统学习一门课之前，先读一段样章、试做一道习题。材料能否提供适合你的解释与支持，比学校名称更有参考价值。

## 先确定学习任务

| 你需要完成的任务 | 优先选择 | 检验方式 |
| --- | --- | --- |
| 独立写数据处理程序 | CS50P 或 Python 教程，加一个工程练习 | 测试、异常处理、可重复运行 |
| 理解训练、泛化与评估 | 一门 ML 主课，加概率和线性代数 | 无数据泄漏的基线与误差分析 |
| 进入一个研究方向 | 一门专题课程，再读聚焦同一问题的原始论文 | 任务、假设、不同方法与未解问题的说明 |
| 提升训练或部署效率 | 系统课，加 profiling 实验 | 相同条件下的速度、显存与质量比较 |

用[学习路径](learning-path.md)安排顺序，用[基础知识](basics.md)补充先修知识，或通过[第一个 AI 项目](start.md)应用概念。导论短课帮助建立方向感，完整课程通过概念与习题逐步推进，研究研讨课则通常默认已有基础，讨论选定问题。根据需要补充的知识选择学习形式；两门课程共用模块时，共同内容学一遍即可，再用第二份材料解决具体疑问。

## MOOC 平台：先核对课程与访问方式

以下平台用于查找课程，各自收录的课程有不同的大纲。比较具体授课团队、课程轮次、作业设计与先修要求；“免费注册”“试学”“旁听”和“付费认证”可能对应不同权限。

- **[Coursera · Data Science](https://www.coursera.org/browse/data-science)** — **类型：MOOC 平台；语言：英语为主，部分课程有中文等字幕；先修：按具体课程。** 覆盖编程、统计、数据分析与 ML。适合希望按周安排任务、系统学习一组课程的读者。 **建议成果：** 选定一门课并保存大纲、作业样例与访问权限说明，再完成一个本地可运行项目；不要将目录页当作证书或完整内容免费开放的承诺。
- **[edX · Artificial Intelligence](https://www.edx.org/learn/artificial-intelligence)** — **类型：MOOC 平台；语言：英语为主，其他语言支持因课程而异；先修：按具体课程。** 可查大学与机构的 AI、CS 和数据科学课程。 **建议成果：** 比较两门课程的评估任务，选择一门并提交个人项目报告；旁听时长、考核、证书与学分项目分别核对。
- **[中国大学 MOOC](https://www.icourse163.org/)** — **类型：MOOC 平台；语言：中文为主；先修：按具体课程。** 可检索 Python、数据结构、高等数学、概率统计和机器学习等高校课程。 **建议成果：** 记录学校、教师和课程轮次，完成一份带推导或代码的专题作业；开课状态、登录、考核与认证条件以当期课程页为准。
- **[学堂在线](https://www.xuetangx.com/)** — **类型：MOOC 平台；语言：中文为主，亦有英语课程；先修：按具体课程。** 可按高校、主题和课程轮次查找 CS、数学与 AI 内容。 **建议成果：** 围绕一个能力目标完成课程实验并保留运行说明；试学、认证学习和课程回看范围可能不同。
- **[国家高等教育智慧教育平台](https://higher.smartedu.cn/h5)** — **类型：高等教育课程与教材聚合平台；语言：中文为主；先修：按链接到的课程。** 用于查找高校课程、教材和课程平台入口。 **建议成果：** 为当前学习任务整理一份含学校、授课者、来源平台和作业要求的学习计划；能够浏览聚合目录，不代表可以直接访问所链接平台的全部内容。

## Python、计算机科学与算法

**学习安排与自查：** 从零开始学习编程时，中文课程可选北理工 Python，英文课程可选 CS50P；学过一门语言后，可以用官方教程查阅细节，再选 CS61A 或 6.006 学习抽象与算法。配合[练习页](practice.md)完成一个文件处理程序，再换一份输入、加入异常数据进行检查，并独立解释测试设计与复杂度。

- **[Python 官方教程](https://docs.python.org/3/tutorial/)** — **类型：官方教程；语言：英语，提供[官方中文版本](https://docs.python.org/zh-cn/3/tutorial/)；先修：已有基本编程概念。** 覆盖控制流、数据结构、函数、模块、文件、异常和类；完全零基础可先选北理工 Python 课程或 CS50P。 **建议成果：** 编写一个读取 CSV、校验输入并输出统计结果的命令行程序，附测试与环境说明。
- **[北京理工大学 · Python 语言程序设计](https://www.icourse163.org/course/BIT-268001)** — **类型：大学 MOOC；语言：中文；先修：能使用计算机，不要求已有编程基础。** 由嵩天等授课，覆盖 Python 语法、数据类型、分支与循环、函数、文件处理及计算思维。 **建议成果：** 独立编写带输入校验和文件读写的小程序，说明函数划分与边界处理；课程轮次、作业权限和认证条件以当期页面为准。
- **[Harvard CS50P · Introduction to Programming with Python](https://cs50.harvard.edu/python/)** — **类型：大学公开课；语言：英语；先修：可从编程零基础开始。** 覆盖函数、条件、循环、异常、库、单元测试、文件、正则表达式和面向对象。 **建议成果：** 完成一个带测试的小型 Python 工具，并解释关键设计；提交反馈与认证的账户条件另查课程说明。
- **[Harvard CS50x · Introduction to Computer Science](https://cs50.harvard.edu/x/)** — **类型：大学公开课；语言：英语；先修：不要求计算机科学背景。** 通过 C、内存、算法、数据结构、Python、SQL 与 Web 建立计算机科学视角。 **建议成果：** 实现一个从数据存储到界面的完整小程序，并说明正确性、复杂度和主要故障处理。
- **[UC Berkeley CS 61A · Structure and Interpretation of Computer Programs](https://cs61a.org/fa26/syllabus/)** — **类型：大学公开课；语言：英语；先修：基础编程经验有帮助。** 关注抽象、函数式与面向对象编程、解释器和程序组织；不同学期使用的语言和项目会调整，应以所链接版本的教学大纲为准。 **建议成果：** 实现并测试一个小型解释器或工作量相当的项目，解释环境、求值与抽象边界。
- **[MIT 6.006 · Introduction to Algorithms](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/)** — **类型：大学公开课存档；语言：英语；先修：Python、离散数学与基本证明。** 覆盖数据结构、排序、图算法、最短路和动态规划。 **建议成果：** 对一个算法给出正确性证明、复杂度分析和针对边界输入的测试，而非只提交通过判题的代码。

## 数学、概率与统计

**学习安排与自查：** 用 18.06 配合 Stat 110 或 18.05 补充主要基础，再用 MML 理解这些概念如何用于模型；需要学习约束建模时，可以选 EE364a。配合小型数值实验，完成一份维度正确的推导，用有限差分检查结果，并解释估计中的不确定性，无需先通读全部教材。

- **[MIT 18.06 · Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)** — **类型：大学公开课存档；语言：英语；先修：高中代数。** 覆盖线性方程、向量空间、正交、最小二乘、特征值与奇异值分解。 **建议成果：** 用投影解释线性回归，并以 NumPy 验证低秩近似误差。
- **[MIT 18.01SC · Single Variable Calculus](https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/)** — **类型：大学公开课存档；语言：英语；先修：函数、代数与三角函数。** 覆盖极限、导数、积分与级数。 **建议成果：** 推导一个标量损失函数的导数，用有限差分检查结果，并说明近似误差。
- **[MIT 18.02SC · Multivariable Calculus](https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/)** — **类型：大学公开课存档；语言：英语；先修：单变量微积分与向量。** 覆盖偏导、梯度、多重积分和向量微积分。 **建议成果：** 推导多参数模型的梯度，绘制等高线并解释梯度下降轨迹。
- **[Harvard Stat 110 · Probability](https://stat110.hsites.harvard.edu/)** — **类型：大学公开课及配套教材入口；语言：英语；先修：代数与基础微积分。** 覆盖条件概率、随机变量、常见分布、期望和极限定理。 **建议成果：** 分别以解析推导与模拟解答一个条件概率问题，并解释二者的一致性与误差。
- **[MIT 18.05 · Introduction to Probability and Statistics](https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/)** — **类型：大学公开课存档；语言：英语；先修：微积分。** 连接概率、贝叶斯推断、估计、置信区间、假设检验与回归。 **建议成果：** 写一份区分效应大小、不确定性与显著性的实验分析，明确抽样假设。
- **[Mathematics for Machine Learning](https://mml-book.github.io/)** — **类型：作者教材；语言：英语；先修：高中数学，具备微积分基础更容易理解。** 结合 ML 介绍线性代数、解析几何、矩阵分解、向量微积分、概率与优化。 **建议成果：** 整理带维度标注的 PCA 或线性回归推导，并复现一个小型数值例子。
- **[Stanford EE364a · Convex Optimization I](https://web.stanford.edu/class/ee364a/)** — **类型：大学课程、讲义与教材入口；语言：英语；先修：良好的线性代数、概率与基础 Python，微积分有帮助。** 覆盖凸集、凸函数、凸优化建模、最优性条件、对偶与数值求解，并使用 CVXPY。 **建议成果：** 推导岭回归或约束最小二乘模型，用 CVXPY 求解并检查最优性条件与数值误差；公开教材与讲义不代表可以使用校内考核服务。
- **[An Introduction to Statistical Learning · ISL/ISLP](https://www.statlearning.com/)** — **类型：作者教材及课程；语言：英语，提供 R 与 Python 版本资源；先修：基础统计和对应语言。** 覆盖回归、分类、重采样、正则化、树方法与无监督学习。 **建议成果：** 在同一划分上比较线性模型和树模型，报告交叉验证、测试误差及适用条件。

## 机器学习与深度学习主线

**学习安排与自查：** 学习经典 ML 可选 Inria MOOC 配合 ISLP；中文 DL 材料可选《动手学深度学习》配合邱锡鹏教材，英文实践材料可选 fast.ai 配合 PyTorch。先选一组，在同一数据划分上运行简单基线、进行受控改动并分析错误，再决定是否继续学习 CS229、CS230 等更深入的材料。

- **[Stanford CS229 · Machine Learning](https://cs229.stanford.edu/)** — **类型：大学课程入口；语言：英语；先修：Python/NumPy、概率、线性代数和多元微积分。** 覆盖监督与无监督学习、学习理论及相关方法。 **建议成果：** 推导并实现一个基线，说明目标函数、优化和泛化误差；当期页面部分材料需 Stanford 身份，可查其历史开课入口。
- **[Stanford CS230 · Deep Learning](https://cs230.stanford.edu/)** — **类型：大学课程与项目资料；语言：英语；先修：编程、线性代数、概率和基础统计。** 覆盖网络训练、卷积与序列模型及 ML 项目组织，并使用 Deep Learning Specialization 的部分模块。 **建议成果：** 提交项目计划、实验里程碑和错误分析；课程网站、校内材料与 Coursera 模块的权限分别核对。
- **[Machine Learning Specialization · DeepLearning.AI / Stanford Online](https://www.coursera.org/specializations/machine-learning-introduction)** — **类型：MOOC 课程系列；语言：英语，字幕因平台而异；先修：基础编程与高中数学。** 覆盖回归、分类、神经网络、树模型、聚类、推荐与强化学习入门。 **建议成果：** 用两个基线解决一个表格任务，解释验证集选择和错误类型；报名、作业及证书条件见平台。
- **[Deep Learning Specialization · DeepLearning.AI](https://www.coursera.org/specializations/deep-learning)** — **类型：MOOC 课程系列；语言：英语，字幕因平台而异；先修：Python、基础线性代数与 ML 概念。** 覆盖神经网络、优化、项目策略、CNN 与序列模型。 **建议成果：** 建立可复现实验，对正则化或初始化做受控比较，报告验证结果；与 CS230 存在内容重合，无需重复完成全部模块。
- **[清华大学 · 机器学习概论](https://www.xuetangx.com/course/THU0809003188)** — **类型：大学 MOOC；语言：中文；先修：官方列有人工智能导论，建议具备编程、线性代数和概率基础。** 覆盖决策树、贝叶斯学习、马尔可夫模型、假设检验、近邻、SVM 与聚类。 **建议成果：** 在同一数据集上比较两类算法，写出假设与实验设计；当期试学和认证学习的开放单元可能不同。
- **[Dive into Deep Learning · 动手学深度学习](https://d2l.ai/)** — **类型：交互式教材；语言：英语及[中文](https://zh.d2l.ai/)；先修：Python 和基础数学。** 从数据、自动微分与线性模型推进到 CNN、序列、注意力、优化与计算性能。 **建议成果：** 先手写再用框架实现同一模型，比较梯度、训练曲线和结果，记录所用版本。
- **[fast.ai · Practical Deep Learning for Coders](https://course.fast.ai/)** — **类型：开放实践课程；语言：英语；先修：能编写程序，建议熟悉 Python。** 通过实际任务学习迁移学习、模型训练、数据处理与部署。 **建议成果：** 使用获许可的数据完成一个模型原型，加入错误样例、数据局限和使用说明；工具版本与课程年份需匹配。
- **[PyTorch Tutorials](https://docs.pytorch.org/tutorials/)** — **类型：框架官方教程；语言：英语；先修：Python、数组和基础 DL。** 覆盖张量、自动微分、数据加载、训练、模型保存及性能专题。 **建议成果：** 写出可恢复训练的脚本，验证 train/eval、梯度与检查点行为，并固定依赖版本。
- **[Inria · scikit-learn MOOC](https://inria.github.io/scikit-learn-mooc/)** — **类型：开放课程教材与 notebook；语言：英语；先修：Python、NumPy/pandas 基础。** 覆盖预测建模、预处理、pipeline、交叉验证、模型选择与解释。 **建议成果：** 构建无预处理泄漏的 pipeline，以交叉验证比较模型并说明测试集用途。
- **[Deep Learning · Goodfellow, Bengio & Courville](https://www.deeplearningbook.org/)** — **类型：作者教材；语言：英语；先修：线性代数、概率、微积分与 ML。** 系统整理数值计算、优化、网络结构和生成建模基础。 **建议成果：** 为一个训练现象写出数学解释，并设计小实验检验；结合较新的课程补充后续发展。
- **[CMU 11-785 · Introduction to Deep Learning](https://deeplearning.cs.cmu.edu/S26/)** — **类型：大学公开课存档；语言：英语；先修：Python、NumPy/PyTorch、微积分、线性代数和概率。** 覆盖 MLP、卷积、序列与注意力等模型，并强调编程作业。 **建议成果：** 完成与课程规模相称的训练实验，记录基线、模型选择和独立分析；部分考核服务仅向注册学生开放。
- **[MIT 6.S191 · Introduction to Deep Learning](https://introtodeeplearning.com/)** — **类型：大学公开课；语言：英语；先修：基本矩阵运算、求导与链式法则，Python 有帮助。** 以紧凑课程和实验介绍 DL、视觉、序列、生成与强化学习等主题。 **建议成果：** 完成一个实验及变体，说明改变一个设置后的结果；短课用于建立整体认识，深入推导需配合教材。
- **[Google · Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course)** — **类型：官方学习课程；语言：英语并提供中文等版本；先修：Python/NumPy/pandas、代数和基础统计。** 覆盖回归、分类、数据、泛化、神经网络、嵌入与生产系统。 **建议成果：** 写一份含数据划分、基线、阈值与错误分析的模型卡式报告，而非仅完成交互测验。
- **[神经网络与深度学习 · 邱锡鹏](https://nndl.ai/)** — **类型：作者中文教材与课程资源；语言：中文；先修：编程、线性代数、微积分和概率。** 覆盖神经网络、优化、卷积、序列、注意力及相关学习方法。 **建议成果：** 根据一章的公式实现核心模块，用单元测试与数值检查说明实现符合推导。
- **[李宏毅 · Machine Learning 2025](https://speech.ee.ntu.edu.tw/~hylee/ml/2025-spring.php)** — **类型：大学公开课存档；语言：中文授课、英文技术材料；先修：Python 与 ML/DL 基础，按单元补数学。** 以生成式 AI 等主题连接模型、训练和应用，并提供课程作业入口。 **建议成果：** 复现一个与课程难度和规模相当的实验，报告数据、评估与模型限制；不要将某一学期内容当作固定不变的完整 ML 大纲。
- **[Deep Learning: Foundations and Concepts · Bishop & Bishop](https://www.bishopbook.com/)** — **类型：作者教材；语言：英语；先修：微积分、线性代数和概率。** 从概率与优化出发介绍深度学习概念和模型。 **建议成果：** 将一个模型的假设、损失和推断过程写成连贯推导，再与代码对应。

## NLP、语言模型与视觉

**学习安排与自查：** NLP 可选 CS224N 配合 Hugging Face 小模型实验；视觉可选 CS231n 配合一个分类或分割复现项目；已有训练与系统基础后，再选 CS336。检查预处理过程、测试集独立性和任务指标，并按类别或现象分析错误。CS25 可帮助发现值得继续研究的问题，但不能替代基础训练。

- **[Hugging Face · LLM Course](https://huggingface.co/learn/llm-course/chapter1/1)** — **类型：官方教程课程；语言：英语，有社区翻译；先修：Python、基础深度学习。** 覆盖 Transformers、数据集、分词器、微调与模型分享等工作流。 **建议成果：** 用许可清晰的数据微调小模型，保存数据处理、评估与模型卡；Hub 权限和发布范围须单独确认。
- **[Stanford CS224N · NLP with Deep Learning](https://web.stanford.edu/class/cs224n/)** — **类型：大学公开课；语言：英语；先修：Python、微积分、线性代数、概率和 DL。** 覆盖语言表示、序列与注意力、Transformer 及现代 NLP。 **建议成果：** 做一个带基线和语言现象分析的 NLP 实验；当期视频与历史公开视频的权限可能不同。
- **[Stanford CS336 · Language Modeling from Scratch](https://cs336.stanford.edu/)** — **类型：大学公开课；语言：英语；先修：熟练 Python/PyTorch、DL、系统和数学基础。** 研究分词、语言模型实现、训练效率、数据与评估。 **建议成果：** 在明确算力预算内训练小语言模型，报告 token 数量、吞吐量、验证损失与消融结果；不要直接照搬大规模训练配置。
- **[Stanford CS25 · Transformers United](https://web.stanford.edu/class/cs25/)** — **类型：大学研讨课；语言：英语；先修：Transformer 与 DL 基础。** 通过研究者报告了解 Transformer 的方法、应用和研究问题。 **建议成果：** 围绕一次报告写出问题、证据与可复现实验提案；研讨报告适合拓展研究视野，需搭配基础课形成体系。
- **[Stanford CS231n · Deep Learning for Computer Vision](https://cs231n.stanford.edu/)** — **类型：大学公开课；语言：英语；先修：Python/NumPy、微积分、线性代数和基础概率统计。** 覆盖视觉识别、神经网络训练与现代视觉结构。 **建议成果：** 复现一个视觉基线，分析类别混淆与数据增强影响；当期录像可能限校内，官网提供历史课程入口。

## 生成模型与强化学习

**学习安排与自查：** 生成方向可选 CS236，并在小型数据集上实现模型；RL 可先通过 Sutton–Barto 的表格算法建立直觉，再用 Spinning Up 或 CS285 做实验。完成后，应能解释训练目标，在相同数据或交互预算下与基线比较，并报告多次运行的结果与失败案例。

- **[Stanford CS236 · Deep Generative Models](https://deepgenerativemodels.github.io/)** — **类型：大学公开课存档；语言：英语；先修：ML/DL、概率、微积分和 Python。** 覆盖 VAE、GAN、自回归、流、能量和 score-based 模型。 **建议成果：** 推导一个训练目标并在小数据上实现模型，区分样本质量、覆盖范围和计算成本。
- **[Spinning Up in Deep RL](https://spinningup.openai.com/en/latest/)** — **类型：官方研究教学教程；语言：英语；先修：Python、DL、概率与优化。** 介绍强化学习概念、策略梯度及代表性深度 RL 算法实现。 **建议成果：** 复现小环境中的学习曲线，记录随机种子、评估策略和超参数；旧代码的依赖兼容性需要自行核对。
- **[UC Berkeley CS285 · Deep Reinforcement Learning](https://rail.eecs.berkeley.edu/deeprlcourse/)** — **类型：大学公开课；语言：英语；先修：ML/DL、概率、优化和熟练编程。** 覆盖策略梯度、价值学习、模型学习及进阶决策方法。 **建议成果：** 以多个随机种子比较算法与基线，报告回报分布和训练预算，避免凭一条曲线判断优劣。
- **[Reinforcement Learning: An Introduction · Sutton & Barto](https://mitpress.mit.edu/9780262039246/reinforcement-learning/)** — **类型：教材出版社入口，第二版；语言：英语；先修：概率、微积分与基础编程。** 覆盖 MDP、动态规划、Monte Carlo、TD、函数逼近与策略梯度。 **建议成果：** 实现一个表格环境，对比 MC 与 TD，并解释偏差、方差和采样需求；版本与获取方式见出版社及作者授权入口。

## 机器人与控制

**学习安排与自查：** 从 Modern Robotics 的坐标系和运动学入手，再按任务选择 Underactuated 中的控制内容，或 Manipulation 中的感知与规划内容。先完成仿真中的控制或抓取实验，核对坐标约定、初始条件、扰动与失败记录，并明确区分仿真结论和实机证据。

- **[Modern Robotics · Lynch & Park](https://modernrobotics.northwestern.edu/nu-gm-book-resource/foundations-of-robot-motion/)** — **类型：大学教材与配套课程；语言：英语；先修：线性代数、微积分与编程。** 覆盖刚体运动、运动学、动力学、规划与控制。 **建议成果：** 实现机械臂正逆运动学并在仿真中验证；学会标注坐标系与误差度量。
- **[MIT · Underactuated Robotics](https://underactuated.mit.edu/)** — **类型：大学课程与在线讲义；语言：英语；先修：微分方程、线性代数、动力学与编程。** 覆盖非线性系统、最优控制、轨迹优化及学习相关方法。 **建议成果：** 在摆或其他低维系统上设计控制器，比较稳定性、约束和扰动响应。
- **[MIT · Robotic Manipulation](https://manipulation.mit.edu/)** — **类型：大学课程与在线教材；语言：英语；先修：Python、线性代数、几何、概率及机器人基础。** 连接感知、运动学、规划、控制与学习。 **建议成果：** 在仿真里完成抓取或操作流程，报告感知误差、失败情形和复现环境；仿真成功不能直接推断实机可靠性。

## 训练系统与工程交付

**学习安排与自查：** 想理解框架，可以选 DL Systems；想定位并行瓶颈，可以选 CS149；想部署服务，可以选 FSDL。用[工程实践](engineering.md)组织项目，在同一工作负载下重复检查正确性、吞吐量、延迟和显存占用，保留未优化的基线与环境记录。

- **[CMU 10-414/714 · Deep Learning Systems](https://dlsyscourse.org/)** — **类型：大学公开课；语言：英语；先修：Python、C/C++、线性代数与 DL。** 覆盖自动微分、算子、硬件执行与深度学习框架实现。 **建议成果：** 实现小型自动微分或算子模块，使用数值检查和 benchmark 比较正确性及性能。
- **[Stanford CS149 · Parallel Computing](https://cs149.stanford.edu/)** — **类型：大学公开课；语言：英语；先修：C/C++、体系结构和基本系统知识。** 覆盖并行程序、共享内存、GPU 与性能分析。 **建议成果：** 优化一个计算 kernel，给出一致工作量下的速度、资源消耗与瓶颈解释。
- **[Full Stack Deep Learning · 2022 Course](https://fullstackdeeplearning.com/course/2022/)** — **类型：开放工程课程存档；语言：英语；先修：Python、DL 训练与软件工程基础。** 覆盖数据、训练基础设施、测试、部署与监控。 **建议成果：** 把一个模型做成带版本、测试、输入校验和监控方案的最小服务；按当前工具文档更新旧课实现细节。

## 负责任 AI：把评估对象扩展到人和使用场景

**学习安排与自查：** 从 Google Fairness 中的具体指标入手，再用 Fairness and Machine Learning 或 CS181 审视假设与使用情境。结合[负责任 AI](responsible-ai.md)，完成一份讨论群体误差、受影响者、目标冲突及证据缺口的案例分析。

- **[Google ML Crash Course · Fairness](https://developers.google.com/machine-learning/crash-course/fairness)** — **类型：官方课程专题；语言：英语并提供中文等版本；先修：分类、数据划分与评估指标。** 介绍偏差、群体评估与公平性问题。 **建议成果：** 为一个分类器比较群体指标，说明样本量、标签来源及不同目标间的取舍。
- **[Fairness and Machine Learning · Barocas, Hardt & Narayanan](https://fairmlbook.org/)** — **类型：作者教材；语言：英语；先修：概率、统计和基础 ML。** 把公平性定义、统计限制与制度背景联系起来。 **建议成果：** 针对同一场景比较两种公平性定义，解释两种定义何时冲突、谁承担错误的后果，以及还缺少哪些证据。
- **[Stanford CS181/181W · Computers, Ethics, and Public Policy](https://stanfordcs181.github.io/)** — **类型：大学课程；语言：英语；先修：具备基本计算机知识与论证阅读能力。** 讨论计算技术的伦理、政策和社会影响。 **建议成果：** 完成一份有来源、利益相关者、可选方案和不确定性分析的案例备忘录，区分经验事实与价值判断。

## 信息检索与推荐

**学习安排与自查：** 检索可选 IIR 教材配合 CS276 编程材料；推荐可选 Google 课程配合[练习页](practice.md)的 RecBole。先复现词项检索或热门物品基线，再改变一种表示或排序方法。检查逐查询或逐用户的结果、候选集合、负采样与时间划分，并分别评估检索和生成。

- **[Introduction to Information Retrieval · Manning, Raghavan & Schütze](https://nlp.stanford.edu/IR-book/)** — **类型：作者教材与配套材料；语言：英语；先修：基础编程、数据结构、线性代数和概率。** 覆盖倒排索引、词项权重、概率检索、排序与评估。 **建议成果：** 为小型文档集实现检索索引，比较布尔检索、TF-IDF 或 BM25，解释相关性标注与 Recall/nDCG；用于建立检索基础，再结合现代稠密检索材料。
- **[Stanford CS276 · Information Retrieval and Web Search](https://web.stanford.edu/class/cs276/)** — **类型：大学课程存档；语言：英语；先修：熟练 Python、算法和基础概率统计。** 通过索引、压缩、检索、学习排序与 Web 搜索的讲义及作业连接理论与系统。 **建议成果：** 完成检索或排序实验，报告索引大小、查询延迟和排序质量；当前入口为历史学期，部分录像使用校内系统。
- **[Google · Recommendation Systems](https://developers.google.com/machine-learning/recommendation)** — **类型：官方专题课程；语言：英语并有其他语言版本；先修：基础 ML、向量与嵌入概念。** 覆盖候选生成、协同过滤、评分和重排。 **建议成果：** 比较热门物品与个性化推荐，报告冷启动、覆盖和离线排序指标，说明离线结果与真实用户效果的差别。

## 图表示与关系学习

**学习安排与自查：** 用 CS224W 了解主要任务，用 Hamilton 教材补充嵌入与消息传递知识，再完成 DGL 的节点或图分类实验。核查简单特征基线、测试节点结构的使用权限、负边采样与划分协议，避免把标签传播中的泄漏误认为模型改进。

- **[Stanford CS224W · Machine Learning with Graphs](https://web.stanford.edu/class/cs224w/)** — **类型：大学课程；语言：英语；先修：编程、概率和线性代数。** 覆盖图表示学习、GNN、知识图谱和网络分析，提供历史讲义与项目入口。 **建议成果：** 在指定节点、边或图级任务上比较简单特征与 GNN，区分传导式和归纳式设置。
- **[Graph Representation Learning · William L. Hamilton](https://www.cs.mcgill.ca/~wlh/grl_book/)** — **类型：作者教材，网页提供出版前稿；语言：英语；先修：图基础、线性代数、概率与 ML。** 讲解节点嵌入、关系与知识图谱、GNN 和图生成。 **建议成果：** 手写一个消息传递层，检查节点重排后的行为，并用一个小实验连接公式与图任务。

## 时间序列与预测

**学习安排与自查：** 用 FPP3 理解预测与回测，R 用户可以跟随书中代码，Python 用户可以配合 sktime。检查季节性或朴素基线、滚动预测起点、预测区间及不同预测步长；每次划分都只使用当时可获得的信息。

- **[Forecasting: Principles and Practice · 第三版](https://otexts.com/fpp3/)** — **类型：作者在线教材；语言：英语；先修：基础统计，运行代码需 R。** 覆盖时间序列可视化、分解、回归、指数平滑、ARIMA 与预测评价。 **建议成果：** 在一个有季节性的序列上比较朴素预测与统计模型，做滚动回测并解释预测区间。
- **[sktime · Tutorials](https://www.sktime.net/docs/tutorials/)** — **类型：官方教程与 notebook；语言：英语；先修：Python、pandas、统计和基础 ML。** 介绍时序数据、预测工作流、自定义估计器及概率或层级预测。 **建议成果：** 建立带预处理和时间切分的预测流程，比较基线并分别报告各预测步长的误差；教程快照与安装版本需对应。

## 因果推断与研究设计

**学习安排与自查：** 用 Brady Neal 的课程理解因果图与识别，再按任务阅读 Mixtape 中的随机实验、回归不连续或差分方法。配合 DoWhy 的合成数据练习，说明干预与目标量，检查识别假设、估计和敏感性分析；稳健性检查不能证明假设必然成立。

- **[Introduction to Causal Inference · Brady Neal](https://www.bradyneal.com/causal-inference-course)** — **类型：作者课程与讲义；语言：英语；先修：概率、统计与基础 ML。** 覆盖潜在结果、因果图、混杂、识别与估计。 **建议成果：** 为一个问题画出因果图，写出目标效应与调整假设，再用模拟数据比较有无混杂控制的估计。
- **[Causal Inference: The Mixtape · Scott Cunningham](https://mixtape-1ed.netlify.app/)** — **类型：作者授权在线教材，第一版；语言：英语，示例使用 R/Stata 等语言；先修：统计、回归与基本编程。** 覆盖因果图、潜在结果、匹配、回归不连续、工具变量、面板与差分方法。 **建议成果：** 复现一种研究设计，说明比较组、识别前提和可反驳的诊断；本入口固定第一版，作者主站另有修订中的 The Remix。

## 概率建模与贝叶斯工作流

**学习安排与自查：** 用 Murphy 教材补充概率模型与推断知识，再用 Python 贝叶斯教材建立从先验、数据、后验到预测检查的完整流程；pgmpy 适合练习小型图模型。应检查模型假设、先验敏感性、推断诊断与后验预测，而不只是输出一个可信区间。

- **[Probabilistic Machine Learning · Kevin P. Murphy](https://probml.github.io/pml-book/)** — **类型：作者教材系列与配套代码；语言：英语；先修：线性代数、微积分、概率和 ML。** 用概率视角组织监督学习、潜变量、图模型与近似推断；入门卷和进阶卷按问题选择。 **建议成果：** 为一个小模型写出生成假设、似然与推断方法，比较解析、采样或近似解。
- **[Bayesian Modeling and Computation in Python](https://bayesiancomputationbook.com/welcome.html)** — **类型：作者在线教材与代码；语言：英语；先修：Python、概率、统计与回归。** 覆盖贝叶斯推断、模型探索、线性及扩展模型、时序与端到端工作流。 **建议成果：** 完成带先验检查、推断诊断和后验预测检验的建模报告；运行时优先对照作者的 updated notebooks 与环境文件。

## 音频与语音

**学习安排与自查：** 先用 Aalto 教材理解采样、频谱和评价，再按兴趣选择 CS224S 的语音或对话任务，并配合 SpeechBrain 的小型实验。检查采样率、说话人划分、文本规范化、WER/CER 及噪声条件下的错误分析，不把朗读语音上的结果直接外推到对话。

- **[Aalto · Introduction to Speech Processing](https://speechprocessingbook.aalto.fi/)** — **类型：大学在线教材；语言：英语；先修：基础线性代数、微积分、概率与信号知识。** 覆盖语音表示、预处理、分析、识别、合成、增强和评价。 **建议成果：** 解释同一音频的波形与时频表示，改变噪声或预处理并测量一个明确任务的变化。
- **[Stanford CS224S · Spoken Language Processing](https://web.stanford.edu/class/cs224s/)** — **类型：大学课程与作业资料；语言：英语；先修：Python、基础 ML 与 NLP。** 连接音频分析、语音识别与合成、对话管理及交互系统。 **建议成果：** 完成小型识别或对话实验，报告说话人和语言差异、延迟及失败类型；当前存档的讲课录像仅向注册学生开放。

## 搜索、多智能体与数值优化

**学习安排与自查：** 需要学习规划与决策基础时，可以选 CS188；已有 RL 基础后，再选 MARL 教材，并明确多个学习主体与多次调用同一语言模型的区别。学习数值优化时，可以将 Algorithms for Optimization 与 EE364a 配合使用，检查搜索或更新规则、评价预算、约束处理和收敛诊断。

- **[UC Berkeley CS188 · Introduction to Artificial Intelligence](https://inst.eecs.berkeley.edu/~cs188/archive/sp25/)** — **类型：大学公开课存档；语言：英语；先修：Python、数据结构和基础概率。** 覆盖搜索、约束满足、博弈树、MDP、强化学习与概率推断，配有项目。 **建议成果：** 比较两种搜索或博弈策略，报告最优性条件、展开节点数与失败情形。
- **[Multi-Agent Reinforcement Learning: Foundations and Modern Approaches](https://marl-book.com/)** — **类型：作者教材、Python 代码与练习；语言：英语，作者页亦列中文出版版；先修：概率、优化、编程与单智能体 RL 基础。** 覆盖博弈、解概念、多智能体学习算法与环境。 **建议成果：** 在小型合作或竞争环境中比较策略，记录训练与执行信息、对手分布和跨种子结果，避免把非平稳环境中的回报变化归因于单个模块。
- **[Algorithms for Optimization · Kochenderfer & Wheeler](https://algorithmsbook.com/optimization/)** — **类型：作者教材与代码；语言：英语，代码主要为 Julia；先修：线性代数、微积分、概率和编程。** 从工程问题介绍局部搜索、一二阶方法、随机搜索、约束及代理模型。 **建议成果：** 在相同函数评价预算下比较梯度法与直接搜索，检查约束满足和终止条件；学习可从第一版开始，官网第二版仍标为预览。

这些主题的研究问题与实验误区见[拓展研究专题](advanced-topics.md)；实施与协作见[工程实践](engineering.md)。先用一个任务检验一组材料的学习效果，再考虑第二条学习路线。

## 把课程转化为研究准备

每个阶段保留一份可供审阅的成果：程序与测试、推导与数值检查、实验日志、图表和结论。先复现基线，再改变一个变量；记录失败和未解决的问题。看完视频、通过自动评分、取得证书和能够独立解决开放问题，分别反映不同层面的学习成果。

练习安排见[练习与竞赛平台](practice.md)；研究设计见[研究方法](research-methods.md)；继续找资料可用[基础课程索引](catalog-foundation.md)、[方向资料索引](catalog-directions.md)与[资料总索引](resources.md)。

## 资源版本与访问说明

**官方入口与公开说明核验日期：2026-10-16** ；核验不等于完成课程、运行全部作业或获得后台访问权限。部分动态页面仅能核验官方入口或官方检索摘要。学期、字幕、收费、旁听范围、作业权限与证书条件可能变化，请以报名页和授课方说明为准。大学公开材料不意味着可以注册在校课程、获得助教反馈或学分。

每条“先修”是选课准备建议；官方另有要求时以官网为准。“建议成果”是本指南提出的学习检验方式，并非课程方承诺的认证结果。公开仓库中不要发布课程禁止公开的作业答案。
