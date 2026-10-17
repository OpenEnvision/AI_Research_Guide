# An AI learning path: from foundations to research

Learning AI is easier when you understand how its ideas connect. Programming turns a method into code; mathematics explains the operations; machine learning connects them to data; research asks what conclusions the evidence supports. These skills develop together, though not always at the same pace.

Whether you are studying at university, changing fields, or beginning a research role, use this page to choose what to learn next. Start from your current understanding rather than a particular year of a degree. [Foundations](basics.md) explains the concepts; [research methods](research-methods.md) explains how to assess a study. Return to missing prerequisites as needed, while exploring topics that interest you.

<a id="route-start"></a>

## Find your starting point

Begin with something you have tried to understand. Can you follow how a short program turns data into a prediction? If the difficulty is indexing, start with programming. If you follow the code but cannot explain a matrix product or derivative, study the relevant mathematics alongside introductory ML. If the computation is clear but you cannot tell whether a result is convincing, begin with evaluation and research methods.

The following connections can help you decide what to learn next:

| Learn this first | It helps you understand |
| --- | --- |
| Functions and arrays | How data and model computations are represented |
| Vectors and matrices | Linear prediction, embeddings, and neural-network layers |
| Derivatives and the chain rule | How gradient-based learning changes parameters |
| Probability and sampling | Prediction uncertainty, data splits, and statistical evidence |
| A simple supervised model and evaluation | What deep learning adds and what a comparison establishes |

You can study programming and introductory mathematics in parallel. Add more advanced mathematics as your questions require it: proofs need precise assumptions and proof techniques; sequential decision making needs additional probability and optimization. Check the prerequisites of the particular [course](courses.md) you choose.

<a id="route-programming"></a>

## Programming: follow the data before the model

Learn enough Python to read and modify a small program: variables, collections, functions, loops, files, and exceptions. Then learn [arrays, shapes, and indexing](basics.md#basics-arrays). Track what each array dimension represents, such as examples or features, so you understand what an operation does, beyond checking that the sizes match.

For example, imagine classifying short documents by topic. A table might have one row per document and one column per word feature. Before studying a classifier, you should be able to explain how a document becomes a row, where its label is stored, and whether the rows and labels remain aligned after filtering. This makes later model code much less mysterious.

Use the terminal, isolated environments, and basic Git as practical needs arise. Start with focused exercises from a [practice platform](practice.md); extensive competitive programming is not required. When a program fails, trace one input through it and inspect the intermediate values before adding more tools or complexity.

<a id="route-math"></a>

## Mathematics: connect each tool to a question

Start [linear algebra](basics.md#basics-linear-algebra) with vectors, dot products, matrix multiplication, and linear transformations. In the document example, a dot product combines features with learned weights to produce a score. This gives the symbols a purpose; later, rank and eigenvalues help explain representations and transformations in more depth.

Learn [derivatives and the chain rule](basics.md#basics-calculus) before trying to derive backpropagation. A derivative describes local sensitivity: how does changing a parameter change the loss? The chain rule connects that sensitivity through a sequence of operations. You can first reason about one parameter and a small function before handling a whole network.

Study [probability and statistics](basics.md#basics-probability) alongside these topics. Conditional probability describes relationships given observed information; sampling explains why a result on available data may differ from performance on future data. This prepares you to interpret estimates and uncertainty. You can begin introductory ML while strengthening these foundations, returning to a derivation when you need a clearer understanding of its notation or assumptions.

<a id="route-ml"></a>

## Machine learning: separate fitting from evaluation

Start with [supervised learning](basics.md#basics-learning) and a simple model such as linear or logistic regression. Distinguish the model's parameters, the loss used to fit them, and the metric used to judge predictions. A lower training loss indicates a better fit to the training data; performance on unseen examples requires separate evidence.

For document classification, documents from the same author or source may share shortcuts. A random split can therefore answer a different question from a split that holds out sources. Learn [training, validation, and testing](basics.md#basics-evaluation) together with the task: what future use should the evaluation represent? Keep preprocessing and model selection within the appropriate training and validation stages.

Compare a complex model with a simple baseline before interpreting its score. Examine which examples fail and how the metric weights different errors. [A first project](start.md) can make these relationships concrete; [datasets and evaluation](datasets.md) explains the choices in more depth. You are ready to move on when you can explain what the comparison shows and what it leaves unresolved. Once you understand a fitted model, loss, metric, and data split, you can begin [research methods](research-methods.md#methods-start) without waiting to complete deep learning.

<a id="route-deep-learning"></a>

## Deep learning: understand what changes and what stays

Deep learning adds learned representations and more complex parameterized functions. It still needs a clear task, appropriate data, an objective, and an evaluation protocol. Classical models remain useful comparators, and many questions can be investigated without a large neural network.

Connect tensors to arrays, network layers to transformations, and automatic differentiation to the chain rule. Follow how a forward computation produces a loss and how gradients lead to a parameter update. Then study architectures through the structure they address: CNNs use local spatial structure; attention lets representations combine information from other positions.

If training is hard to understand, return to one batch, one layer, or one update. If training improves while validation worsens, revisit generalization and model selection. Learning curves are evidence to interpret, not a diagnosis by themselves. Add implementation depth through [research engineering](engineering.md) when your work requires it.

<a id="route-research"></a>

## Research: let a question guide your next steps

Use the [research map](directions.md) to find a question you care about. Read a small cluster of related papers using the [reading guide](reading.md) and [selected papers](papers.md). Compare the questions, assumptions, and evidence before comparing model names.

Empirical research needs data, credible comparisons, and an understanding of variability. Theoretical research needs explicit definitions, assumptions, and arguments that support the claimed result. Many projects combine both. A reproduction or worked derivation can reveal gaps in understanding. To develop your own contribution, identify what remains unanswered and explain how your analysis addresses it.

For example, “Does the document classifier improve?” becomes more informative as “Does the improvement persist on unseen sources, and which kinds of documents benefit?” See [framing research questions](research-methods.md#question-hypothesis) for how to connect a question to evidence. Add [specialist topics](advanced-topics.md), [responsible AI](responsible-ai.md), and [writing](writing.md) as your question requires.

## Keep your learning plan manageable

Choose one main resource for the next concept. After studying it, explain an example without notes, then try a slightly different example. When you get stuck, identify whether the missing step is a definition, a mathematical operation, a programming detail, or an unsupported inference. Revisit that step and ask a precise question when seeking feedback.

Learn in a language you understand well, keeping original technical terms beside your notes for searching. Use translations as support and check the original for assumptions, negation, and limitations. A sustainable learning plan leaves time to revisit ideas; neither a fixed deadline nor a long list of completed courses substitutes for understanding.
