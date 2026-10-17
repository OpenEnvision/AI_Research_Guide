# Research engineering: reliable code and reusable results

Research engineering makes the path from data to a reported result understandable and repeatable. Begin with a small project whose code and results you can examine closely. Add infrastructure when you encounter a real bottleneck or need to coordinate with collaborators.

You should be comfortable with Python, files, and a basic training/evaluation loop. This chapter explains the engineering decisions to look for in a repository; detailed implementations belong in the linked documentation. For research questions and fair comparisons, use [research methods](research-methods.md); for data and metrics, use [datasets and evaluation](datasets.md).

| If you need to… | Start with… |
| --- | --- |
| Understand someone else's repository | Inputs, processing, model, evaluation, and outputs |
| Make your own results traceable | Code/data versions, resolved configuration, and saved predictions |
| Diagnose a failed or slow run | Correctness checks before profiling or scaling |
| Share or hand over work | A clear README and one result another person can check |

<a id="engineering-contract"></a>

## Connect a result to its inputs

For any reported number, be able to find the data version and split, preprocessing, model or weight revision, configuration, evaluator, and raw outputs. A commit identifies the code saved in Git; record uncommitted changes too if they affected the run.

Keep code, small configuration files, tests, and documentation in Git. Keep large datasets, caches, and generated models outside ordinary source history, with a manifest or suitable versioning tool. A small project may need only a README, an environment specification, a training/evaluation entry point, and a results directory. A complicated directory tree is not evidence of good engineering.

Distinguish three checks: **did the program run, did it compute the intended quantity, and does that quantity support the research claim?** A successful exit code answers only the first. Use [GitHub Skills](https://github.com/skills/introduction-to-github) to learn branches and review; use [DVC](https://doc.dvc.org/start) when large-file versions become difficult to manage.

<a id="engineering-environment"></a>

## Environments, versions, and resource budgets

Use a project-specific environment and record the Python and package versions, operating system, hardware, and relevant drivers. Dependency declarations describe allowed versions; a lockfile records a resolved set. Neither captures every system dependency or guarantees identical numerical results across devices.

[PyPA's project guide](https://packaging.python.org/en/latest/guides/writing-pyproject-toml/) explains project metadata and dependencies. [uv's locking and syncing guide](https://docs.astral.sh/uv/concepts/projects/sync/) explains one environment workflow. Learn one workflow that suits the project before adopting several tools.

Budget for storage, preprocessing, training, evaluation, and saved models. GPU memory includes more than weights: activations, gradients, optimizer state, temporary buffers, and, for many generative models, inference caches also matter. Measure a representative workload before estimating the total cost. CPU methods, smaller inputs, or a narrower question can provide a useful starting point.

Record exact data and model revisions. A filename, a branch that keeps changing, or a cache directory is not enough to reconstruct an earlier experiment. See [versioned dataset loading](https://huggingface.co/docs/datasets/en/loading) and [Hub snapshots](https://huggingface.co/docs/huggingface_hub/en/guides/download). Checksums identify files; they do not establish that the data or labels are correct.

<a id="engineering-correctness"></a>

## Check correctness before increasing scale

Trace one example from raw input through preprocessing, model output, and the metric. Check shapes, units, label order, missing values, and which examples belong to the training and evaluation sets. With learned preprocessing, fit on the training subset only; a [scikit-learn Pipeline](https://scikit-learn.org/stable/modules/compose.html#pipeline-chaining-estimators) helps keep the steps together.

| Symptom | Useful first checks |
| --- | --- |
| Implausibly high evaluation score | Split overlap, duplicates, label leakage, and evaluator inputs |
| Loss is unchanged or non-finite | Data ranges, loss definition, gradients, parameter updates, and numerical precision |
| Saved model gives different predictions | Same preprocessing, class order, weights, and evaluation mode |
| Results vary between runs | Data order, randomness, nondeterministic operations, and changed versions |

Fitting a tiny batch can help diagnose problems in a neural network's training loop, but success does not show that the model generalizes. Test code that guards important assumptions: disjoint splits, correct metric direction, label/prediction alignment, or reload behavior. A useful test should fail for a realistic mistake. [pytest](https://docs.pytest.org/en/stable/getting-started.html) provides a starting point.

In PyTorch, `model.eval()` changes the behavior of modules such as Dropout and BatchNorm. `no_grad()` and `inference_mode()` control gradient recording; they do not replace evaluation mode. See the [autograd notes](https://docs.pytorch.org/docs/stable/notes/autograd.html#locally-disabling-gradient-computation). Seeds help control randomness, while [deterministic settings](https://docs.pytorch.org/docs/stable/generated/torch.use_deterministic_algorithms.html) have a defined scope and may cost performance. Record tolerances and remaining differences rather than promising identical results on every platform.

<a id="engineering-state"></a>

## Understand configurations, logs, and checkpoints

Save the configuration actually used, including defaults and overrides. Give each run an identifier that connects its data, code, outputs, and interpretation. Logs should distinguish training, validation, and test measurements and state whether a step means an example, batch, optimizer update, or episode.

| Saved object | What it is for |
| --- | --- |
| Inference artifact | Model parameters plus the preprocessing, tokenizer, label mapping, and configuration needed for prediction |
| Validation-selected model | A model chosen by a declared development criterion |
| Resume checkpoint | Model and training state needed to continue an interrupted run |

Resuming may require optimizer and scheduler state, mixed-precision state, update count, random states, and sampler progress. Saving the final weights alone does not guarantee that training can be resumed. Check recovery on a small run before relying on it for expensive work; the [PyTorch persistence tutorial](https://docs.pytorch.org/tutorials/beginner/saving_loading_models.html) explains the main distinctions.

Plain JSON/CSV logs are often enough initially. [MLflow Tracking](https://mlflow.org/docs/latest/ml/tracking/) becomes useful when many runs need comparison. Keep records of failed runs and why they failed; an attractive dashboard cannot recover missing configurations or raw predictions.

<a id="engineering-performance"></a>

## Measure performance under stated conditions

A profiler helps locate where time and memory go. A benchmark measures a defined workload repeatedly. Establish correctness first, then distinguish data loading, preprocessing, transfer, model computation, and complete request time.

Report input sizes, precision, batch size, device, concurrency, software, warm-up, repetitions, and output-quality requirements. Accelerators often execute asynchronously, so wall-clock timing around a function call can omit unfinished work. Use appropriate timing and synchronization; see [PyTorch Profiler](https://docs.pytorch.org/tutorials/recipes/recipes/profiler_recipe.html) and [benchmarking tools](https://docs.pytorch.org/tutorials/recipes/recipes/benchmark.html).

**Latency** is time per request; **throughput** is completed work per unit time. Larger batches can improve throughput while increasing waiting time. Include failures and retries, and recheck quality when precision, caching, compilation, or decoding changes outputs. A speedup at one batch size on one device does not mean the system will be faster in every setting.

<a id="engineering-scaling"></a>

## Recognize when scaling changes the experiment

First understand a single-process run. Data parallelism usually copies the model, distributes examples, and combines gradients. It does not automatically split an oversized model across devices; parameter sharding and model parallelism address different constraints.

With equal-sized batches, effective batch size is typically per-device batch × processes × accumulation steps. Unequal batches or variable-length sequences require more careful accounting. Changing batch size, valid-token weighting, or update counts changes optimization as well as speed. Metrics must be aggregated with the correct denominators across processes.

The [DDP tutorial](https://docs.pytorch.org/tutorials/intermediate/ddp_tutorial.html) is a next step once single-device training and process communication make sense. You can study the data flow without owning several GPUs; leave hardware-dependent speed claims to measurements on the stated equipment.

<a id="engineering-serving"></a>

## Understand what changes when you deploy a service

Serving introduces input validation, queues, timeouts, access boundaries, and maintenance. Define accepted inputs and explicit failure responses, load the intended model version, and record which preprocessing and fallback path produced each output. [FastAPI's request-body guide](https://fastapi.tiangolo.com/tutorial/body/) introduces typed interfaces.

A client timeout does not prove that background work stopped. Cancellation and cleanup depend on the execution model; consult [Python's task and timeout documentation](https://docs.python.org/3/library/asyncio-task.html). Before optimizing a service, ask whether deployment is needed for the research question at all. An offline evaluation can be the appropriate scope for a student project.

<a id="engineering-handoff"></a>

## Make one result understandable to another person

A concise README should explain the question, setup, data access, main entry point, expected outputs, and known limitations. Connect the reported table or figure to its configuration, evaluator, and underlying results. State which parts were actually checked and which depend on unavailable hardware, restricted data, or external services.

When redistribution is restricted, explain how others can obtain the material through authorized channels and enough metadata to identify the inputs. Describe code, data, and model terms separately. Ask a peer to trace one result using the documentation; their questions often reveal the most valuable improvements.

**Learning check:** choose a repository you have already explored. Explain where its data, selection rule, saved state, and main metric come from, then identify one engineering assumption you would verify. No new training run is required to begin this review.

[First projects](start.md) · [Research methods](research-methods.md) · [Datasets and evaluation](datasets.md) · [Writing and figures](writing.md)
