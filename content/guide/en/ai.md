# AI-assisted learning and research

AI can help explain a concept, navigate code, compare notes, or revise a draft. Its most useful role depends on the task and on what you can verify. Start with a small, specific request, keep the original material, and decide what a satisfactory answer would look like.

## Match the task to a check

| Task | Useful assistance | What you still need to check |
| --- | --- | --- |
| Learn a concept | Alternative explanations, questions, small examples | Definitions, assumptions, and whether you can explain the concept without the generated answer |
| Read literature | Search terms, comparisons, source locations | Whether each work exists and the cited passage supports the statement |
| Understand or edit code | File navigation, proposed changes, error diagnosis | The actual diff, inputs/outputs, tests, and evaluation logic |
| Analyze results | Organize tables, plots, and possible explanations | Raw data, denominators, calculations, and competing explanations |
| Write or present | Structure, wording, diagrams, audience adaptation | Meaning, numbers, citations, and the connection between claims and evidence |

A useful request specifies the material, goal, scope, output format, and how you will check the result. For example: “Using these three notes, compare the data and evaluation conditions. Cite a source location for each item, and mark missing information as unknown.” Agreement or a fluent answer is not independent evidence.

## Understand code changes before accepting them

Ask the assistant to trace one example through the implementation before proposing a broad rewrite. Review what changed and why, including preprocessing, labels, metrics, and dependencies. An explanation of a run is different from evidence that it ran: retain the actual command, environment, output, and failures when execution matters.

The tools below are examples of coding assistants, not a required stack or a ranking. Access, cost, supported languages, permissions, and data handling differ. You do not need a paid subscription to work through this guide.

<div class="logo-strip">
<a class="logo-entry" href="https://www.trae.cn/"><img src="../../../public/blog/guide/figures/uestc/intro/trae-logo.png" alt=""><span>TRAE</span></a>
<a class="logo-entry" href="https://www.workbuddy.cn/"><img src="../../../public/blog/guide/figures/uestc/intro/workbuddy-logo.svg" alt=""><span>WorkBuddy</span></a>
<a class="logo-entry" href="https://claude.com/product/claude-code"><img src="../../../public/blog/guide/figures/uestc/intro/claude-logo.png" alt=""><span>Claude Code</span></a>
<a class="logo-entry" href="https://zcode.z.ai/"><img src="../../../public/blog/guide/figures/uestc/intro/zcode-logo.png" alt=""><span>ZCode</span></a>
<a class="logo-entry" href="https://openai.com/codex/"><img src="../../../public/blog/guide/figures/uestc/intro/openai-logo.png" alt=""><span>Codex</span></a>
</div>

Use a small reproducible case when diagnosing an error; return to [research engineering](engineering.md) for correctness checks. Give an assistant only the file and execution access needed for the task, and inspect consequential actions before allowing them.

## Keep literature work connected to the sources

Ask for passages, equation definitions, figure locations, or code references, then inspect them. A correct title does not guarantee a correct summary, and a generated reference may not exist. Separate what the author states from the assistant's interpretation and your own judgment.

Use the [reading note](reading.md#paper-notes) and [optional note workflow](irene-workflow.md#notes) to preserve those distinctions. [Markdown](https://www.markdownguide.org/basic-syntax/) is one simple format for notes, tables, figures, and open questions. A reference manager and ordinary text files are enough to start.

## Generate figures from evidence

Quantitative plots should come from saved data with inspectable calculations. AI can draft plotting code, labels, or layouts, but it should not invent missing observations, uncertainty bars, or a plausible-looking result. Mark conceptual diagrams as schematics and check every arrow, label, and equation.

For a talk, state the audience, available time, central question, and source material. Check whether a listener can explain the claim and find its evidence after the revision. See [writing and figures](writing.md).

<a id="grill-me"></a>

## Use questions to test understanding

Explain a method or equation yourself first. Then ask one question at a time about inputs, assumptions, the role of a component, and evidence. Answer before looking at a generated explanation; return to the paper when the discussion exposes a gap.

**Grill Me** in [paper-tools-marketplace](https://github.com/tseirene6/paper-tools-marketplace) is one optional implementation; the [reading workflow](irene-workflow.md#grill) explains the approach. You can also use this approach with a peer, without any special software.

<a id="ai-feedback"></a>

## Keep judgment and uncertainty visible

Ask for alternatives and observations that would weaken your preferred explanation. A model can reinforce a premise supplied in the question, and several generated answers may share the same error. Verify a disputed claim with a derivation, source, calculation, or appropriate experiment; discuss unresolved points with people who can assess them.

Keep proposed work separate from completed work. For research-relevant assistance, record the source material, important changes, and human checks. Before sharing restricted or unpublished material, check how you are allowed to use and share it; local file access does not imply that processing stays local. Venue-specific disclosure is covered in [writing](writing.md#ai-disclosure).

**Learning check:** can you now explain the important step, identify where the evidence comes from, and detect an incorrect alternative? If not, narrow the task and study the concept you are missing. Finishing an assisted task and understanding it are separate outcomes.

## Further reading

[Two AI-use reflections](lesswrong.md#ai) discuss belief reinforcement and student learning. For the systems behind assistants, see [Lilian Weng on agents](https://lilianweng.github.io/posts/2023-06-23-agent/) and [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents). These describe particular designs, not guarantees about every product.
