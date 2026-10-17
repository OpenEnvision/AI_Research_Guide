# 研究工程：可靠的代码与可复用的结果

研究工程旨在让从数据到结果的过程清晰、可检查、可重新运行。可以从一个小而完整的项目开始，遇到实际瓶颈或协作需求后，再逐步完善基础设施。

阅读本章需要熟悉 Python、文件操作和基本的训练与评估流程。这里解释阅读代码仓库时应理解的工程决策，具体实现可查链接中的文档。研究问题与公平比较见[研究方法](research-methods.md)，数据与指标见[数据集和评测](datasets.md)。

| 当前需要 | 先看什么 |
| --- | --- |
| 理解别人的代码仓库 | 输入、处理、模型、评估与输出怎样连接 |
| 让自己的结果可以追溯 | 代码和数据版本、实际配置与保存的预测 |
| 排查失败或缓慢的运行 | 先检查正确性，再分析性能和扩大规模 |
| 分享或交接工作 | 清楚的 README 与一个他人能检查的结果 |

<a id="engineering-contract"></a>

## 让结果能够追溯到输入

看到一个报告中的数值，应能找到数据版本与划分、预处理、模型或权重版本、配置、评估程序和原始输出。commit 标识已提交的代码；如果运行受未提交修改影响，也要留下对应差异。

代码、小型配置、测试和文档放入 Git。大数据、缓存和生成的模型通常不直接进入普通源码历史，而通过清单或适合的版本工具管理。小项目可以只有 README、环境说明、训练与评估入口和结果目录。目录复杂不等于工程质量高。

区分三个问题：**程序是否运行成功，是否计算了预期的量，这个量是否支持研究主张？** 成功的退出码只回答了第一个问题。用 [GitHub Skills](https://github.com/skills/introduction-to-github) 学习分支与审阅；大文件版本难以管理时，再了解 [DVC](https://doc.dvc.org/start)。

<a id="engineering-environment"></a>

## 环境、版本与资源预算

为项目使用独立环境，记录 Python 与依赖版本、操作系统、硬件和相关驱动。依赖声明说明允许的版本范围，锁文件记录一次解析结果；它们都不能涵盖全部系统依赖，也不保证跨设备数值完全一致。

[PyPA 项目指南](https://packaging.python.org/en/latest/guides/writing-pyproject-toml/)解释项目元数据与依赖，[uv 锁定与同步指南](https://docs.astral.sh/uv/concepts/projects/sync/)介绍一种环境管理方式。先掌握适合项目的一套流程，再按需要增加工具。

资源预算包括存储、预处理、训练、评估和模型保存。GPU 显存除了权重，还可能包含激活、梯度、优化器状态、临时缓冲，以及许多生成模型推理时使用的缓存。先测代表性工作量，再估计完整成本。CPU 方法、较小输入或更窄的问题，都可以是有价值的起点。

记录准确的数据与模型版本。文件名、指向会变化的分支或缓存目录不足以恢复历史实验。可查[按版本加载数据](https://huggingface.co/docs/datasets/en/loading)和 [Hub 快照](https://huggingface.co/docs/huggingface_hub/en/guides/download)。校验值能识别文件，不能证明数据和标签本身正确。

<a id="engineering-correctness"></a>

## 扩大规模前先检查正确性

沿一个样本追踪原始输入、预处理、模型输出和指标。核对形状、单位、标签顺序、缺失值，以及样本所属的训练或评估集合。需要拟合的预处理只使用当前训练子集；[scikit-learn Pipeline](https://scikit-learn.org/stable/modules/compose.html#pipeline-chaining-estimators)有助于将这些步骤保持在同一流程中。

| 现象 | 值得先检查的地方 |
| --- | --- |
| 评估分数高得不合理 | 划分重叠、近重复、标签泄漏和评估输入 |
| 损失不变或出现非有限值 | 数据范围、损失定义、梯度、参数更新和数值精度 |
| 保存后重载的预测不同 | 预处理、类别顺序、权重和评估模式是否一致 |
| 多次运行结果变化 | 数据顺序、随机性、非确定性操作和版本变化 |

让神经网络拟合一个很小的 batch，有助于排查训练循环，但不能据此判断泛化。为重要假设写测试，例如划分互斥、指标方向、标签与预测对齐、模型重载。有效的测试应能发现真实可能发生的错误。[pytest](https://docs.pytest.org/en/stable/getting-started.html)可作为起点。

在 PyTorch 中，`model.eval()` 改变 Dropout、BatchNorm 等模块的行为；`no_grad()` 和 `inference_mode()` 控制梯度记录，不能代替评估模式，见[自动求导说明](https://docs.pytorch.org/docs/stable/notes/autograd.html#locally-disabling-gradient-computation)。种子用于控制随机性；[确定性设置](https://docs.pytorch.org/docs/stable/generated/torch.use_deterministic_algorithms.html)有明确的适用范围，也可能降低性能。说明容差与尚存差异，而不承诺所有平台逐位一致。

<a id="engineering-state"></a>

## 理解配置、日志与检查点

保存实际使用的配置，包括默认值和通过命令行覆盖的值。为每次运行分配标识，把数据、代码、输出与分析连接起来。日志应区分训练、验证和测试，并写清 step 指样本、batch、优化器更新还是 episode。

| 保存对象 | 用途 |
| --- | --- |
| 推理材料 | 用于预测的模型参数，以及必要的预处理、tokenizer、标签映射与配置 |
| 验证集选择的模型 | 按预先声明的开发指标选出的模型 |
| 恢复训练检查点 | 继续中断运行所需的模型与训练状态 |

恢复训练可能需要优化器与调度器状态、混合精度状态、更新次数、随机状态和采样器进度。只保存最终权重不等于能够续训。开始高成本运行前，先在小规模流程中检查能否恢复，主要区别见 [PyTorch 保存与加载教程](https://docs.pytorch.org/tutorials/beginner/saving_loading_models.html)。

简单的 JSON、CSV 日志通常足以起步。运行增多后，可用 [MLflow Tracking](https://mlflow.org/docs/latest/ml/tracking/)组织比较。失败运行和原因也应保留；仪表盘无法补回丢失的配置或原始预测。

<a id="engineering-performance"></a>

## 在明确条件下测量性能

性能分析器（profiler）帮助定位时间和内存开销，基准测试（benchmark）则对明确定义的工作负载进行重复测量。先确认正确性，再区分数据读取、预处理、传输、模型计算和完整请求时间。

报告输入大小、精度、batch、设备、并发、软件、预热、重复次数和输出质量要求。加速器常异步执行，在函数调用前后读时钟可能漏掉尚未完成的工作。使用合适的计时与同步方式，见 [PyTorch Profiler](https://docs.pytorch.org/tutorials/recipes/recipes/profiler_recipe.html)和[性能测量工具](https://docs.pytorch.org/tutorials/recipes/recipes/benchmark.html)。

**延迟**是单个请求花费的时间，**吞吐量**是单位时间完成的工作。较大的 batch 可能提高吞吐，同时增加等待。把失败与重试纳入记录；精度、缓存、编译或解码改变输出时，重新检查质量。在特定设备和 batch 大小下观察到加速，不能据此声称普遍有效。

<a id="engineering-scaling"></a>

## 理解扩大规模如何影响实验

先理解单进程流程。数据并行通常复制模型、分配样本并汇总梯度；它不会自动将过大的模型拆分到不同设备上。参数分片与模型并行处理的是不同约束。

各 batch 大小相同时，有效 batch 大小通常为每设备 batch 大小 × 进程数 × 梯度累积步数。batch 大小不等或序列长度变化时，需要更仔细地计算。改变 batch、有效 token 权重或更新次数，会同时改变优化过程；各进程指标也要按正确分母汇总。

理解单设备训练和进程通信后，可继续读 [DDP 教程](https://docs.pytorch.org/tutorials/intermediate/ddp_tutorial.html)。没有多张 GPU 也能学习数据流；涉及特定硬件的速度结论，则需要在相应设备上测量。

<a id="engineering-serving"></a>

## 区分研究结果与持续运行的服务

服务还涉及输入校验、队列、超时、访问边界和维护。定义允许的输入与明确的失败响应，加载指定模型版本，并记录输出使用的预处理与回退路径。[FastAPI 请求说明](https://fastapi.tiangolo.com/tutorial/body/)介绍类型化接口。

客户端超时不代表后台计算已停止。取消与清理取决于执行方式，可查 [Python 任务与超时文档](https://docs.python.org/3/library/asyncio-task.html)。优化服务前，先判断研究问题是否需要部署。对学生项目而言，将范围限定为离线评估也可以是合理的选择。

<a id="engineering-handoff"></a>

## 让另一个人读懂一个结果

简洁的 README 应说明问题、环境、数据获取、主要入口、预期输出和已知限制。让报告中的表格或图能够追溯到配置、评估程序和原始结果。说明实际检查过的部分，以及依赖不可用硬件、受限数据或外部服务的部分。

不能再分发的数据，应提供合规的获取步骤与足以识别输入的元数据。代码、数据和模型的使用条件分别说明。请未参与开发的同学沿文档追溯一个结果，他们的疑问常能暴露最值得改进的地方。

**理解检查：**选一个已经读过的仓库，解释数据、模型选择规则、保存状态和主要指标分别来自哪里，再指出一个需要核实的工程假设。进行这项检查不需要重新训练模型。

[入门项目](start.md) · [研究方法](research-methods.md) · [数据集和评测](datasets.md) · [写作与画图](writing.md)
