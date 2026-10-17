# Efficiency and AI systems

Why does changing batch size speed up a model? Why can a program struggle before GPU memory is full? Why can throughput improve while users wait longer? These questions arise when models meet software and hardware.

Different implementations of the same model can run at very different speeds. Data movement, operator implementations, memory allocation, request scheduling, and communication between devices all affect hardware utilization. Model size, context length, and precision also connect systems questions to model design.

<a id="systems-learning"></a>

## Connect an optimization to its bottleneck

Start with tensor shapes, matrix multiplication, numerical precision, and the difference between memory capacity and memory bandwidth. [Research engineering](engineering.md) introduces profiling and measurement. Then follow one training step or one generation request from data movement to computation and output.

| Technique | Main resource problem | A common misconception |
| --- | --- | --- |
| FlashAttention | Data transfers between GPU memory levels and storage of intermediate attention results | It reorganizes exact attention; it does not make dense attention linear in sequence length. |
| Quantization | Numerical storage and supported low-precision computation | Fewer bits do not guarantee faster execution on every device or workload. |
| ZeRO | Replicated parameter, gradient, and optimizer state in distributed training | Sharding saves memory while adding communication and scheduling constraints. |
| PagedAttention | Allocation and sharing of a growing KV cache during serving | Cache management is distinct from reducing the network's parameter count. |

The [FlashAttention paper](https://arxiv.org/abs/2205.14135) is a useful example of changing data movement while preserving the mathematical operation. End-to-end gains depend on how much time the optimized component originally consumed; speeding up a small component cannot remove the rest of the workload.

## Compute, memory access, and execution overhead

GPUs can compute quickly, but an operation also requires moving data through memory and launching and scheduling kernels. Compute-bound, memory-bound, and overhead-bound workloads require different optimizations. [Horace He's Making Deep Learning go Brrrr](https://horace.io/brrr_intro.html) explains these bottlenecks.

FlashAttention uses tiling to reduce reads and writes to GPU memory. Quantization lowers the storage and computational requirements of numerical representations, while operator fusion can reduce intermediate results and scheduling overhead. Actual gains depend on tensor shapes, precision, and hardware implementation. The [PyTorch Performance Tuning Guide](https://docs.pytorch.org/tutorials/recipes/recipes/tuning_guide.html) covers common optimization approaches.

## Latency, throughput, memory, and quality

Interactive services may prioritize time to first token and tail latency; offline batches may prioritize throughput. Memory and cost also constrain deployment. Larger batches can improve hardware utilization while increasing an individual request's waiting time. Longer contexts increase computation and cache requirements, while lower precision can affect model quality.

A systems study therefore needs to describe both its workload and optimization goal. Comparisons under the same hardware and request conditions help establish where a design saves time or memory.

## Distributed training and inference

Large-model training distributes parameters, gradients, optimizer states, and computation. Communication between devices introduces synchronization and waiting. Inference services must also manage KV caches, batching, and request scheduling. Methods such as ZeRO and PagedAttention address different parts of these storage and execution problems.

[How To Scale Your Model](https://jax-ml.github.io/scaling-book/) connects model computation, memory, communication, and parallelism. [Machine Learning Systems](https://mlsysbook.ai/) covers the components and design of ML systems. [MIT 6.5940, 2024](https://hanlab.mit.edu/courses/2024-fall-65940) develops model compression, quantization, and efficient computation.

## Case studies and research resources

[Purshow's systems and architecture notes](blogs.md#purshow) analyze concrete designs. More courses and projects appear in the [systems catalog](catalog-directions.md#topic-22), with related work from [teams such as MIT HAN Lab](labs.md). [AI tools](ai.md) can also assist with reading code and writing performance-analysis scripts.

## Design a testable AI-systems study

- **Question and controls:** identify training, inference, storage, or serving objectives. Specify quality targets or thresholds. Apart from the system variable under study, match hardware, numerical precision, input/output lengths, and concurrency. Distinguish algorithmic compute reduction from execution efficiency.
- **Evaluation:** record warm-up, caching, batch size, peak memory, throughput, latency distributions, and failure rates. To estimate latency percentiles, use enough requests and define the measurement window. Distributed studies should report device count, communication, and scaling efficiency.
- **Limits:** lower precision or shorter outputs can affect quality and latency. Reporting only the fastest run is insufficient. Follow the version, scenario, and quality constraints of any official benchmark used.

[Research design](research-methods.md) · [Data and evaluation](datasets.md)

[Research engineering](engineering.md) connects environment records, profiling, benchmarking, DDP, and minimal services. Check correctness and identify bottlenecks before trying to speed up a system. When evaluating a service, examine failures, queues, timeouts, and recovery as well as kernel speed.
