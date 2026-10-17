# Interdisciplinary AI: starting with questions from other fields

AI contributes to molecular screening, protein design, weather forecasting, medical imaging, and mathematical proof. These fields ask different questions: predicting a property, proposing a design, approximating an equation solver, or verifying a construction. The domain determines what the data mean and what evidence is needed to support a conclusion.

<a id="ai4x-learning"></a>

## Choose one domain and one kind of question

You do not need to learn every field below. Start with one familiar domain and learn its units, measurement processes, and established methods alongside [machine-learning foundations](basics.md). Follow a single paper from its scientific question to its input representation, prediction target, and validation. Use the animations to understand the workflow; they illustrate concepts rather than reproduce a paper's results.

Distinguish **prediction** of a measured outcome, **design** of a candidate, **simulation** of a system, and **decision-making** about the next action or measurement. A stronger predictor may help one of these steps without validating the full scientific workflow. The sections below offer suggested reading, not an exhaustive history or a ranking of models.

<nav class="topic-map" aria-label="Fields">
<div><h3>Natural sciences and medicine</h3><a href="#molecule">Molecules, reactions, and materials</a><a href="#physics">Physical simulation and weather</a><a href="#protein">Proteins and enzymes</a><a href="#genome">Genomics and regulation</a><a href="#cell">Single cells and virtual cells</a><a href="#eeg">EEG and neural decoding</a><a href="#image">Medical imaging</a></div>
<div><h3>Mathematics, finance, and data</h3><a href="#math">Mathematics and algorithm discovery</a><a href="#finance">Finance and quantitative research</a><a href="#graphs">Graph learning and time series</a></div>
<div><h3>Automating the research process</h3><a href="#automl">AutoML</a><a href="#research">Automated research</a><a href="#rsi">RSI and self-improvement</a></div>
</nav>

<section id="process" class="process">
<div class="process-head"><h2 id="ai4x-process">How AI contributes to research</h2><button id="motion-toggle" type="button">Pause</button></div>
<div id="scene-groups" class="scene-groups" aria-label="Research areas"></div>
<div id="scene-tabs" class="scene-tabs" role="tablist" aria-label="Research topics"></div>
<div class="scene-select"><select id="topic-select" hidden aria-label="Research topic"><option value="molecule">Molecules, reactions, and materials</option><option value="physics">Physical simulation and weather</option><option value="protein">Proteins and enzymes</option><option value="genome">Genomics and regulation</option><option value="cell">Single cells and virtual cells</option><option value="eeg">EEG and neural decoding</option><option value="image">Medical imaging</option><option value="math">Mathematics and algorithm discovery</option><option value="finance">Finance and quantitative research</option><option value="graphs">Graph learning and time series</option><option value="automl">AutoML</option><option value="research">Automated research</option><option value="rsi">RSI and self-improvement</option></select><a id="read-topic" href="#molecule">Read about this field ↓</a></div>
<div id="process-labels" class="process-labels"></div><div id="scene-host"></div><div class="scene-progress" aria-hidden="true"><i></i></div>
</section>

<section class="ai4x-domain" data-topic="molecule" data-group="Natural sciences and medicine" data-short="Molecules, reactions, and materials">
<h2 id="molecule">Chemistry and materials: predicting properties, planning reactions, and discovering materials</h2>
<p>Will a molecule dissolve readily in water? Is a crystal stable? What will a set of reactants produce? AI can predict properties and screen candidates from structures and experimental records. It can also learn energies and forces to reduce the computational cost of molecular dynamics.</p>
<button type="button" class="see-process" data-scene="molecule">Watch the process ↗</button>
<div class="task-list">
<div><h3>Property prediction</h3><p>Represent a molecule as a graph of atoms and bonds, or as a structure with three-dimensional coordinates, to predict quantities such as solubility and energy. The MPNN paper is a classic introduction to graph learning for quantum chemistry.</p></div>
<div><h3>Reactions and synthesis</h3><p>Forward prediction infers products from reactants; retrosynthesis works backward from a target molecule to find precursors and synthesis routes. Molecular Transformer models the SMILES strings of reactants and products as sequences.</p></div>
<div><h3>Materials discovery and simulation</h3><p>GNoME combines graph networks with first-principles calculations to screen for stable crystals. Deep Potential learns potential energy to provide the energies and forces needed for molecular dynamics. Active learning uses existing results to select the next calculations or experiments.</p></div>
</div>
<ol class="route">
<li><span>2017</span><strong>MPNN</strong><p>Structure → properties</p></li>
<li><span>2018–2019</span><strong>Deep Potential / Molecular Transformer</strong><p>Simulation and reaction prediction</p></li>
<li><span>2023</span><strong>GNoME</strong><p>Model screening + DFT validation</p></li>
</ol>
<div data-ai4x-papers="ai4x-mpnn,ai4x-deep-potential"></div>
<h3>Papers and learning resources</h3>
<ul class="resources">
<li><a href="https://arxiv.org/abs/1811.02633">Molecular Transformer ↗</a><span>2019 · Reaction prediction</span></li>
<li><a href="https://www.nature.com/articles/s41586-023-06735-9">GNoME ↗</a><span>2023 · Crystal stability and materials discovery</span></li>
<li><a href="https://github.com/deepchem/deepchem">DeepChem ↗</a><span>Molecular tasks and tutorials</span></li>
<li><a href="https://tdcommons.ai/">Therapeutics Data Commons ↗</a><span>Drug discovery tasks and data</span></li>
<li><a href="https://github.com/deepmodeling/deepmd-kit">DeePMD-kit ↗</a><span>Learning potential energies for molecular dynamics</span></li>
</ul>
<dl class="terms">
<div><dt>SMILES</dt><dd>A string representation of molecular structure.</dd></div>
<div><dt>DFT</dt><dd>Density functional theory: a family of methods for calculating electronic structure, energy, and other properties.</dd></div>
</dl>
</section>

<section class="ai4x-domain" data-topic="physics" data-group="Natural sciences and medicine" data-short="Physical simulation and weather">
<h2 id="physics">Physics and weather: learning solutions and predicting how systems evolve</h2>
<p>Fluid flow, heat transfer, and weather forecasting involve physical quantities that vary across space and time. AI can approximate solutions to the equations that describe these processes, or use observations to predict how physical systems evolve.</p>
<button type="button" class="see-process" data-scene="physics">Watch the process ↗</button>
<div class="task-list">
<div><h3>Bringing equations into training</h3><p>Physics-informed neural networks (PINNs) incorporate equation residuals, boundary conditions, and observation errors into training. Research examines how these constraints help, and how models handle complex domains and changes across multiple scales.</p></div>
<div><h3>Learning solutions for a family of problems</h3><p>Neural operators learn mappings from functions to functions, such as predicting an entire flow field from initial conditions. FNO constructs operations in the frequency domain, trains on solutions to a set of problems, and then handles new input conditions.</p></div>
<div><h3>Forecasting weather and uncertainty</h3><p>GraphCast uses graph networks to predict global weather fields. Later probabilistic forecasting approaches describe uncertainty through multiple possible futures. Researchers compare forecast errors, performance on extreme weather, and computation time.</p></div>
</div>
<ol class="route">
<li><span>2019</span><strong>PINNs</strong><p>Equation constraints in training</p></li>
<li><span>2021</span><strong>FNO</strong><p>Learning mappings between functions</p></li>
<li><span>2023</span><strong>GraphCast</strong><p>Predicting global weather fields</p></li>
</ol>
<div data-ai4x-papers="fno"></div>
<h3>Papers and learning resources</h3>
<ul class="resources">
<li><a href="https://maziarraissi.github.io/PINNs/">PINNs ↗</a><span>The authors' introduction and examples</span></li>
<li><a href="https://arxiv.org/abs/2010.08895">Fourier Neural Operator ↗</a><span>2021 · ICLR</span></li>
<li><a href="https://arxiv.org/abs/2212.12794">GraphCast ↗</a><span>2023 · Science</span></li>
<li><a href="https://github.com/neuraloperator/neuraloperator">NeuralOperator ↗</a><span>Neural operator implementations and tutorials</span></li>
</ul>
<dl class="terms">
<div><dt>PDE</dt><dd>A partial differential equation describes how a quantity changes with variables such as space and time.</dd></div>
<div><dt>Neural operator</dt><dd>A model that learns a mapping from an input function to an output function, such as an initial field to a future flow field.</dd></div>
</dl>
</section>

<section class="ai4x-domain" data-topic="protein" data-group="Natural sciences and medicine" data-short="Proteins and enzymes">
<h2 id="protein">Proteins and enzymes: from sequence and structure to functional design</h2>
<p>Proteins consist of amino acid sequences, and their folded structures are closely linked to what they can do. AI can predict structures, find natural sequences with desired properties, or propose new designs.</p>
<button type="button" class="see-process" data-scene="protein">Watch the process ↗</button>
<div class="task-list">
<div><h3>Representation and structure prediction</h3><p>Protein language models learn transferable features from sequences. AlphaFold2 combines sequences, evolutionary information, and geometric relationships to predict three-dimensional structures. AlphaFold3 extends this to complexes containing proteins, nucleic acids, small molecules, and other components.</p></div>
<div><h3>Sequence and backbone design</h3><p>ProteinMPNN designs sequences for a given backbone; RFdiffusion generates backbones that satisfy constraints; ESM3 jointly uses sequence, structure, and function information. The design workflow then checks expression, stability, binding, or catalytic activity.</p></div>
<div><h3>Enzyme mining and engineering</h3><p>Enzyme mining finds candidates in natural sequence libraries; enzyme engineering modifies existing enzymes; de novo design builds new candidates around a target reaction. VenusMine retrieves candidates using structural and sequence clues, while VenusRXN matches enzymes starting from chemical reactions.</p></div>
</div>
<ol class="route">
<li><span>2021</span><strong>AlphaFold2</strong><p>Structure prediction</p></li>
<li><span>2022–2023</span><strong>ProteinMPNN / RFdiffusion</strong><p>Sequence and backbone design</p></li>
<li><span>2025–2026</span><strong>AMix-1 / AMix-2</strong><p>Conditional generation and protein–text modeling</p></li>
</ol>
<details class="deeper"><summary>Read further</summary>
<h3>The experimental loop in enzyme engineering</h3><p>Zero-shot scoring can first rank mutations. A small amount of measured data can be used to fit a model of a specific property, while active learning uses existing results and uncertainty to choose the next experiments. Each round adds newly measured activity or stability to the data and updates the candidate ranking.</p>
<h3>Constraints in de novo design</h3><p>One approach finds a backbone to support a catalytic core; another organizes local interactions within an existing backbone. Catalytic geometry, foldability, stability, and reaction conditions all determine which experiments are needed next.</p>
<h3>New approaches to foundation models</h3><p>AMix-1 models proteins with Bayesian flow networks and explores conditioning on multiple sequence alignments and inference-time search. AMix-2 unifies protein and text modeling, using causal generation between blocks and diffusion within each block. When reading, trace the roles of conditioning inputs, candidate generation, and verifiers separately.</p>
</details>
<div data-ai4x-papers="ai4x-alphafold2,amix"></div>
<h3>Papers and learning resources</h3>
<ul class="resources">
<li><a href="https://www.nature.com/articles/s41586-024-07487-w">AlphaFold3 ↗</a><span>Complex structure prediction</span></li>
<li><a href="https://github.com/dauparas/ProteinMPNN">ProteinMPNN ↗</a><span>Sequence design for a given backbone</span></li>
<li><a href="https://www.nature.com/articles/s41586-023-06415-8">RFdiffusion ↗</a><span>Generating protein backbones</span></li>
<li><a href="https://www.evolutionaryscale.ai/blog/esm3-release">ESM3 ↗</a><span>Sequence, structure, and function generation</span></li>
<li><a href="https://www.nature.com/articles/s41467-025-61599-z">VenusMine ↗</a><span>Structure-guided enzyme mining</span></li>
<li><a href="https://www.biorxiv.org/content/10.64898/2026.03.09.710689v1">VenusRXN ↗</a><span>Reaction-conditioned enzyme retrieval</span></li>
<li><a href="https://arxiv.org/abs/2507.08920">AMix-1 ↗</a><span>Bayesian flow networks and inference-time search</span></li>
<li><a href="https://arxiv.org/abs/2605.30963">AMix-2 ↗</a><span>Unified protein and text modeling</span></li>
</ul>
<dl class="terms">
<div><dt>MSA</dt><dd>Multiple sequence alignment aligns related protein sequences to reveal evolutionary conservation and variation.</dd></div>
<div><dt>Inverse folding</dt><dd>Finding an amino acid sequence that can adopt a given protein backbone structure.</dd></div>
</dl>
</section>

<section class="ai4x-domain" data-topic="genome" data-group="Natural sciences and medicine" data-short="Genomics and regulation">
<h2 id="genome">Genomics: how sequence changes affect gene regulation</h2>
<p>DNA variants can alter protein coding, but they can also affect regulatory elements, expression, or splicing. Genomic models learn relationships within long sequences to predict these signals, helping researchers investigate the possible effects of a variant.</p>
<button type="button" class="see-process" data-scene="genome">Watch the process ↗</button>
<div class="task-list">
<div><h3>From sequence to signals</h3><p>Models take a DNA sequence as input and predict experimental signals, such as expression, chromatin accessibility, transcription factor binding, or splicing.</p></div>
<div><h3>Comparing sequences before and after a variant</h3><p>Input the original and variant sequences separately and compare their predictions. AlphaGenome is a representative model combining long sequences with multiple prediction tasks.</p></div>
<div><h3>Connecting to cellular context</h3><p>The same variant can have different effects in different tissues or cell states. Connecting sequence models with cell models requires aligning tissues, conditions, and what is measured.</p></div>
</div>
<ol class="route">
<li><span>Sequence modeling</span><strong>DNA context</strong><p>Understanding coding and regulatory regions</p></li>
<li><span>Multitask prediction</span><strong>AlphaGenome</strong><p>Predicting multiple molecular signals together</p></li>
<li><span>Variant analysis</span><strong>Controls and interventions</strong><p>Comparing predicted and experimental changes</p></li>
</ol>
<h3>Papers and learning resources</h3>
<ul class="resources">
<li><a href="https://deepmind.google/blog/alphagenome-ai-for-better-understanding-the-genome/">AlphaGenome research introduction ↗</a><span>Questions, inputs, outputs, and examples</span></li>
<li><a href="https://github.com/google-deepmind/alphagenome">AlphaGenome ↗</a><span>Official tools and examples</span></li>
</ul>
<dl class="terms">
<div><dt>Noncoding region</dt><dd>A region of DNA that does not directly encode a protein; some of these regions help regulate genes.</dd></div>
<div><dt>Splicing</dt><dd>The RNA processing step that joins exons and removes introns. Different splicing patterns can produce different transcripts.</dd></div>
</dl>
</section>

<section class="ai4x-domain" data-topic="cell" data-group="Natural sciences and medicine" data-short="Single cells and virtual cells">
<h2 id="cell">Cells: understanding states and predicting responses to interventions</h2>
<p>Single-cell RNA sequencing measures noisy samples of gene expression from individual cells. Researchers study not only a cell's type and state, but also how it will respond to a genetic change or a drug. Spatial omics also preserves the locations of cells within tissue.</p>
<button type="button" class="see-process" data-scene="cell">Watch the process ↗</button>
<div class="task-list">
<div><h3>Cell representations</h3><p>Geneformer, scGPT, and UCE learn gene or cell representations from large amounts of single-cell data for tasks such as annotation and integration. Data processing needs to preserve biological differences while handling sequencing depth, noise, and batch effects.</p></div>
<div><h3>Perturbations and virtual cells</h3><p>Given a cellular context and a genetic or drug perturbation, predict changes in expression. Virtual cells aim to connect modalities, scales, and dynamic processes more broadly; perturbation response is one clearly defined research task within this goal.</p></div>
<div><h3>Spatial relationships and biomanufacturing</h3><p>FLAG predicts spatial gene expression from pathology images, focusing on relationships between genes and between tissue locations. Biomanufacturing also studies metabolic networks, expression burden, and resource allocation to help propose strain modifications.</p></div>
</div>
<ol class="route">
<li><span>Representation</span><strong>Geneformer / scGPT / UCE</strong><p>Learning cell and gene representations</p></li>
<li><span>Relationships</span><strong>scPRINT / FLAG</strong><p>Gene networks and spatial structure</p></li>
<li><span>Response</span><strong>Virtual cells</strong><p>Predicting states after intervention</p></li>
</ol>
<details class="deeper"><summary>Read further</summary>
<h3>States, dynamics, and dataset construction</h3><p>Many single-cell datasets are snapshots measured from different cells. Studying changes over time requires sampling times, lineage information, or perturbation experiments. Data should record tissue, donor, batch, and measurement modality; perturbation data should also record the target, dose, time, and control.</p>
<h3>Evaluating gene networks and spatial structure</h3><p>Gene association networks can be compared with known regulation and intervention data. Spatial expression prediction should compare errors at individual locations, relationships between genes, and spatial distributions. Depending on the intended use, hold out new donors, new tissues, or unseen perturbations.</p>
</details>
<div data-ai4x-papers="flag"></div>
<h3>Papers and learning resources</h3>
<ul class="resources">
<li><a href="https://www.nature.com/articles/s41586-023-06139-9">Geneformer ↗</a><span>2023 · Single-cell pretraining</span></li>
<li><a href="https://www.nature.com/articles/s41592-024-02201-0">scGPT ↗</a><span>2024 · Single-cell foundation model</span></li>
<li><a href="https://doi.org/10.1101/2023.11.28.568918">UCE ↗</a><span>Cell representations across datasets</span></li>
<li><a href="https://www.nature.com/articles/s41467-025-58699-1">scPRINT ↗</a><span>Gene network inference</span></li>
<li><a href="https://arxiv.org/abs/2605.18055">FLAG ↗</a><span>2026 · Spatial expression prediction</span></li>
<li><a href="https://scanpy.readthedocs.io/en/stable/tutorials/">Scanpy tutorials ↗</a><span>Single-cell processing, dimensionality reduction, and clustering</span></li>
</ul>
<dl class="terms">
<div><dt>Batch effect</dt><dd>Systematic variation in data caused by differences in experimental timing, equipment, or procedures.</dd></div>
<div><dt>Perturbation prediction</dt><dd>Predicting how a cell responds to an intervention, such as gene editing or a drug, given its cellular context.</dd></div>
</dl>
</section>

<section class="ai4x-domain" data-topic="eeg" data-group="Natural sciences and medicine" data-short="EEG and neural decoding">
<h2 id="eeg">EEG: from neural signals to state recognition and decoding</h2>
<p>Electroencephalography (EEG) records how electrical signals at scalp electrodes change over time. AI can help recognize states, detect events, learn representations across participants, and connect signals with stimuli such as images that participants see.</p>
<button type="button" class="see-process" data-scene="eeg">Watch the process ↗</button>
<div class="task-list">
<div><h3>Temporal and spatial representations</h3><p>Electrode locations, sampling rate, filtering, and artifact handling together define the input. Models use frequency bands, changes over time, and relationships between channels.</p></div>
<div><h3>Foundation models and transfer</h3><p>After pretraining, the encoder can be frozen for linear probing or fine-tuned. Testing within the same participant and on new participants answers different questions. EEG-FM-Compass organizes these types of evaluation.</p></div>
<div><h3>Visual decoding and generation</h3><p>DreamDiffusion connects EEG representations to a pretrained image generation model and uses CLIP visual supervision. EEG-CLIP offers another alignment approach; compare how the two connect signals with images.</p></div>
</div>
<ol class="route">
<li><span>Signal processing</span><strong>Time–frequency features</strong><p>Understanding data through channels and time</p></li>
<li><span>2023</span><strong>DreamDiffusion</strong><p>Signal alignment and conditional generation</p></li>
<li><span>2026</span><strong>EEG-FM-Compass</strong><p>Foundation models and transfer evaluation</p></li>
</ol>
<details class="deeper"><summary>Read further</summary>
<h3>Checking which information decoding uses</h3><p>First fix the stimulus and participant splits, then compare correctly paired data, shuffled pairs, and results with EEG conditioning removed. These comparisons help reveal how much the generated results depend on the input signals, and what changes with new participants, sessions, or devices.</p>
</details>
<div data-ai4x-papers="dreamdiffusion"></div>
<h3>Papers and learning resources</h3>
<ul class="resources">
<li><a href="https://arxiv.org/abs/2601.17883">EEG-FM-Compass ↗</a><span>2026 · Survey and evaluation</span></li>
<li><a href="https://arxiv.org/abs/2306.16934">DreamDiffusion ↗</a><span>EEG-guided image generation</span></li>
<li><a href="https://doi.org/10.1016/j.neunet.2025.108167">EEG-CLIP ↗</a><span>Aligning EEG and visual representations</span></li>
<li><a href="https://mne.tools/stable/auto_tutorials/index.html">MNE tutorials ↗</a><span>EEG data, preprocessing, and visualization</span></li>
</ul>
<dl class="terms">
<div><dt>Participant</dt><dd>A person who takes part in an experiment and provides neural signals.</dd></div>
<div><dt>Artifact</dt><dd>An unwanted signal introduced by sources such as eye movements, muscle activity, or equipment.</dd></div>
</dl>
</section>

<section class="ai4x-domain" data-topic="image" data-group="Natural sciences and medicine" data-short="Medical imaging">
<h2 id="image">Medical imaging: locating structures and measuring motion and function</h2>
<p>In CT, MRI, or pathology images, models can delineate organs and lesions, align different images, and calculate measurements such as volume from contours and motion. Imaging methods draw on computer vision, while their research questions come from specific clinical examination and measurement needs.</p>
<button type="button" class="see-process" data-scene="image">Watch the process ↗</button>
<div class="task-list">
<div><h3>Three-dimensional segmentation</h3><p>3D U-Net and V-Net process volumetric data; UNet++ changes how features at multiple scales are fused; Swin UNETR introduces Transformers for context modeling. Compare how they preserve detail and use spatial relationships.</p></div>
<div><h3>Registration and functional measurement</h3><p>Registration estimates correspondences between images or different time frames. CMRINet jointly analyzes registration and segmentation in cardiac cine MRI, linking the identification of structures to the measurement of cardiac function.</p></div>
<div><h3>Longitudinal changes</h3><p>Follow-up images help researchers study how disease changes over time. Record conditions such as sampling times, treatments, and missing follow-ups. Data from external centers and devices can test how broadly a method applies.</p></div>
</div>
<ol class="route">
<li><span>2016</span><strong>3D U-Net / V-Net</strong><p>Volumetric segmentation</p></li>
<li><span>2018–2022</span><strong>UNet++ / Swin UNETR</strong><p>Feature fusion and global context</p></li>
<li><span>2025</span><strong>CMRINet</strong><p>Temporal structure and function analysis</p></li>
</ol>
<div data-ai4x-papers="cmrinet"></div>
<h3>Papers and learning resources</h3>
<ul class="resources">
<li><a href="https://arxiv.org/abs/1606.06650">3D U-Net ↗</a><span>Three-dimensional segmentation</span></li>
<li><a href="https://arxiv.org/abs/1606.04797">V-Net ↗</a><span>Volumetric data and the Dice objective</span></li>
<li><a href="https://arxiv.org/abs/1807.10165">UNet++ ↗</a><span>Nested skip connections</span></li>
<li><a href="https://arxiv.org/abs/2201.01266">Swin UNETR ↗</a><span>Three-dimensional Transformer segmentation</span></li>
<li><a href="https://arxiv.org/abs/1904.10030">Boundary loss ↗</a><span>Class imbalance and contours</span></li>
<li><a href="https://arxiv.org/abs/2505.16452">CMRINet ↗</a><span>Joint registration and segmentation</span></li>
<li><a href="https://github.com/Project-MONAI/tutorials">MONAI Tutorials ↗</a><span>Data processing and training examples</span></li>
</ul>
<dl class="terms">
<div><dt>Voxel</dt><dd>A small volume element in a three-dimensional image, corresponding to a pixel in a two-dimensional image.</dd></div>
<div><dt>Dice / HD95</dt><dd>Dice measures region overlap; HD95 uses a 95th-percentile boundary-distance convention, with units and implementation specified. They capture different kinds of errors.</dd></div>
</dl>
</section>

<section class="ai4x-domain" data-topic="math" data-group="Mathematics, finance, and data" data-short="Mathematics and algorithm discovery">
<h2 id="math">Mathematics and algorithms: finding proofs and better constructions</h2>
<p>AI in mathematics can propose proof steps, add geometric constructions, or search for objects that satisfy constraints and for more efficient algorithms. A key advantage is that many candidates can be checked using formal proof systems, programs, or exact computation.</p>
<button type="button" class="see-process" data-scene="math">Watch the process ↗</button>
<div class="task-list">
<div><h3>Proof search</h3><p>AlphaGeometry combines auxiliary constructions proposed by a language model with symbolic reasoning. Formal proof approaches express propositions and steps in systems such as Lean, where a kernel checks the proof.</p></div>
<div><h3>Mathematical constructions</h3><p>FunSearch lets a language model propose programs, then runs an evaluation function to select useful candidates. The paper studies combinatorial problems including cap sets. The model searches for programs that produce constructions.</p></div>
<div><h3>Algorithm discovery</h3><p>AlphaEvolve combines code generation, evaluators, and evolutionary search to find better algorithms and mathematical constructions. Runtime, correctness, or objective values can provide feedback.</p></div>
</div>
<ol class="route">
<li><span>2023</span><strong>FunSearch</strong><p>Program generation + evaluation</p></li>
<li><span>2024</span><strong>AlphaGeometry / AlphaProof</strong><p>Construction search and proofs</p></li>
<li><span>2025</span><strong>AlphaEvolve</strong><p>Iterative algorithm optimization</p></li>
</ol>
<div data-ai4x-papers="alphageometry"></div>
<h3>Papers and learning resources</h3>
<ul class="resources">
<li><a href="https://www.nature.com/articles/s41586-023-06924-6">FunSearch ↗</a><span>2023 · Mathematical constructions and program search</span></li>
<li><a href="https://deepmind.google/blog/alphageometry-an-olympiad-level-ai-system-for-geometry/">AlphaGeometry ↗</a><span>2024 · Auxiliary constructions and symbolic reasoning</span></li>
<li><a href="https://deepmind.google/blog/ai-solves-imo-problems-at-silver-medal-level/">AlphaProof ↗</a><span>Formal mathematical reasoning</span></li>
<li><a href="https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/">AlphaEvolve ↗</a><span>2025 · Algorithm discovery</span></li>
<li><a href="https://leanprover-community.github.io/mathematics_in_lean/">Mathematics in Lean ↗</a><span>Introduction to formal proofs</span></li>
</ul>
<dl class="terms">
<div><dt>Formal proof</dt><dd>A proof written with precise definitions and inference rules and checked by a proof assistant.</dd></div>
<div><dt>Evaluator</dt><dd>A program that executes a candidate and returns its correctness or objective score.</dd></div>
</dl>
</section>

<section class="ai4x-domain" data-topic="finance" data-group="Mathematics, finance, and data" data-short="Finance and quantitative research">
<h2 id="finance">Finance: from text and time-series data to predictions and decisions</h2>
<p>Financial AI includes understanding financial reports and news, identifying risks, forecasting time series, constructing portfolios, and executing trades. Model inputs include structured data such as prices and trading volume, as well as text from announcements and reports.</p>
<button type="button" class="see-process" data-scene="finance">Watch the process ↗</button>
<div class="task-list">
<div><h3>Financial text</h3><p>FinGPT offers an entry point to financial language models, data, and fine-tuning. Tasks such as sentiment analysis, event extraction, and information extraction illustrate how language models can be used in this domain.</p></div>
<div><h3>Quantitative prediction and backtesting</h3><p>Qlib connects data processing, features, models, portfolios, and backtesting. A factor is a feature used to describe or predict market behavior; research needs to track when that information becomes available.</p></div>
<div><h3>Decision-making and automated research</h3><p>FinRL studies sequential decision-making; RD-Agent-Quant lets agents iterate on factors and models. Evaluation considers returns, risk, turnover, transaction costs, and performance across different market periods.</p></div>
</div>
<ol class="route">
<li><span>2020</span><strong>Qlib</strong><p>A complete quantitative research workflow</p></li>
<li><span>2021–2023</span><strong>FinRL / FinGPT</strong><p>Decisions and financial language models</p></li>
<li><span>2025</span><strong>RD-Agent-Quant</strong><p>Joint factor and model optimization</p></li>
</ol>
<div data-ai4x-papers="qlib"></div>
<h3>Papers and learning resources</h3>
<ul class="resources">
<li><a href="https://github.com/microsoft/qlib">Qlib ↗</a><span>Framework, paper, and research examples</span></li>
<li><a href="https://github.com/AI4Finance-Foundation/FinGPT">FinGPT ↗</a><span>Financial text and large language models</span></li>
<li><a href="https://arxiv.org/abs/2111.09395">FinRL ↗</a><span>A research framework for reinforcement learning in trading</span></li>
<li><a href="https://arxiv.org/abs/2505.15155">RD-Agent-Quant ↗</a><span>Automated factor and model optimization</span></li>
<li><a href="https://qlib.readthedocs.io/en/stable/">Qlib documentation ↗</a><span>Data and backtesting workflows</span></li>
</ul>
<dl class="terms">
<div><dt>Backtesting</dt><dd>Simulating decisions over historical data using the information available at each point, then evaluating their outcomes.</dd></div>
<div><dt>Look-ahead bias</dt><dd>Using information in a prediction or decision that would not yet have been available at that time.</dd></div>
</dl>
</section>

<section class="ai4x-domain" data-topic="graphs" data-group="Mathematics, finance, and data" data-short="Graph learning and time series">
<h2 id="graphs">Graph learning and time series: studying relationships and change</h2>
<p>Traffic, social interactions, transactions, and power grids all contain relationships and change over time. Graph learning models relationships and information on nodes, edges, or entire graphs; time-series modeling studies patterns over time and forecasts future values. The two can also be combined for spatiotemporal prediction.</p>
<button type="button" class="see-process" data-scene="graphs">Watch the process ↗</button>
<div class="task-list">
<div><h3>Nodes, edges, and overall structure</h3><p>Graph tasks can predict node classes, whether a relationship exists, or properties of an entire graph. Molecular graphs and social networks share methods such as message passing, but their labels and evaluation differ.</p></div>
<div><h3>Trends, cycles, and forecasting</h3><p>Time-series research distinguishes trends, cycles, and anomalies, and compares statistical methods with deep learning. Testing moves forward in time to match how forecasting is used in practice.</p></div>
<div><h3>Spatiotemporal systems</h3><p>Traffic conditions change over time across a connected road network. Models need to capture spatial dependencies while accounting for external events and different time scales.</p></div>
</div>
<ol class="route">
<li><span>Relationships</span><strong>Graphs and message passing</strong><p>Node, edge, and whole-graph tasks</p></li>
<li><span>Change</span><strong>Trends and cycles</strong><p>Forecasting in temporal order</p></li>
<li><span>Combination</span><strong>Spatiotemporal graphs</strong><p>Dynamic systems such as traffic</p></li>
</ol>
<h3>Papers and learning resources</h3>
<ul class="resources">
<li><a href="https://web.stanford.edu/class/cs224w/">Stanford CS224W ↗</a><span>Graph machine learning course</span></li>
<li><a href="https://otexts.com/fpp3/">Forecasting: Principles and Practice ↗</a><span>Statistical forecasting textbook · R</span></li>
<li><a href="https://github.com/timeseriesAI/tsai">tsai ↗</a><span>Python time-series tools</span></li>
</ul>
<dl class="terms">
<div><dt>Message passing</dt><dd>Nodes aggregate information from neighbors and edges, updating their representations layer by layer.</dd></div>
<div><dt>Rolling forecasting</dt><dd>Repeatedly predicting a subsequent interval using only the data available as time moves forward.</dd></div>
</dl>
</section>

<section class="ai4x-domain" data-topic="automl" data-group="Automating the research process" data-short="AutoML">
<h2 id="automl">AutoML: selecting models and training configurations automatically</h2>
<p>Learning rate, tree depth, feature processing, and network architecture all affect results. AutoML studies how to automatically find better models and training configurations for a given task and computational budget.</p>
<button type="button" class="see-process" data-scene="automl">Watch the process ↗</button>
<div class="task-list">
<div><h3>Hyperparameter optimization</h3><p>Methods such as grid search, random search, and Bayesian optimization choose the next configuration. Optuna supports dynamic search spaces and pruning, stopping poorly performing trials early.</p></div>
<div><h3>Model and pipeline selection</h3><p>Automatically select data preprocessing, feature processing, models, and ensembles. For comparisons, keep data splits and budgets fixed and record the search cost. Use validation data to select configurations and reserve the test set for final evaluation.</p></div>
<div><h3>Architecture search and meta-learning</h3><p>Neural architecture search (NAS) looks for network structures; meta-learning uses experience from past tasks to help with new ones. Research can explore how to reduce search costs and transfer across tasks.</p></div>
</div>
<ol class="route">
<li><span>Configuration</span><strong>HPO</strong><p>Hyperparameters such as learning rate</p></li>
<li><span>Pipeline</span><strong>Model and feature selection</strong><p>The complete learning pipeline</p></li>
<li><span>Architecture and experience</span><strong>NAS / Meta-learning</strong><p>Architecture search and knowledge across tasks</p></li>
</ol>
<div data-ai4x-papers="optuna"></div>
<h3>Papers and learning resources</h3>
<ul class="resources">
<li><a href="https://www.automl.org/book/">AutoML textbook ↗</a><span>Methods, systems, and open questions</span></li>
<li><a href="https://optuna.org/">Optuna ↗</a><span>Search, pruning, and visualization</span></li>
<li><a href="https://arxiv.org/abs/1907.10902">Optuna paper ↗</a><span>2019 · KDD</span></li>
</ul>
<dl class="terms">
<div><dt>Hyperparameter</dt><dd>A setting chosen before training, such as learning rate, regularization strength, or number of layers.</dd></div>
<div><dt>Pruning</dt><dd>Using intermediate results to stop less promising training runs and save the budget for other trials.</dd></div>
</dl>
</section>

<section class="ai4x-domain" data-topic="research" data-group="Automating the research process" data-short="Automated research">
<h2 id="research">Automated research: turning ideas into experiments and learning from the results</h2>
<p>Many steps in research can be carried out by software: searching for information, proposing candidates, changing code, running experiments, analyzing results, and writing reports. Automated research systems try to connect these steps so that each result informs the next experiment.</p>
<button type="button" class="see-process" data-scene="research">Watch the process ↗</button>
<div class="task-list">
<div><h3>The experimental loop</h3><p>autoresearch focuses on language model training experiments on a single GPU, letting an agent modify training code and compare results. Evaluation metrics determine whether changes are kept, and experiments have a fixed training budget.</p></div>
<div><h3>From ideas to papers</h3><p>AI Scientist brings experimental design, code execution, result analysis, and paper writing into one workflow. Version 2 also explores agentic tree search.</p></div>
<div><h3>Research evidence and records</h3><p>Each candidate is linked to its configuration, code version, run logs, and results. When reading about these systems, trace a conclusion back to the experiments that support it, and examine how failed candidates affect later choices.</p></div>
</div>
<ol class="route">
<li><span>2024</span><strong>AI Scientist</strong><p>Experiments, analysis, and writing</p></li>
<li><span>2025</span><strong>AI Scientist-v2</strong><p>Agentic tree search</p></li>
<li><span>Training experiments</span><strong>autoresearch</strong><p>Iteration within a fixed budget</p></li>
</ol>
<div data-ai4x-papers="ai-scientist"></div>
<h3>Papers and learning resources</h3>
<ul class="resources">
<li><a href="https://github.com/SakanaAI/AI-Scientist">AI Scientist ↗</a><span>Original system and experiment templates</span></li>
<li><a href="https://arxiv.org/abs/2504.08066">AI Scientist-v2 ↗</a><span>2025 · A research workflow using tree search</span></li>
<li><a href="https://github.com/karpathy/autoresearch">autoresearch ↗</a><span>Automatically iterating on training experiments</span></li>
</ul>
<dl class="terms">
<div><dt>Experiment budget</dt><dd>The resources allocated to an experiment, such as training time, computing power, or number of calls.</dd></div>
<div><dt>Agentic tree search</dt><dd>Organizing experimental plans and subsequent changes as a tree, then using existing results to guide further exploration.</dd></div>
</dl>
</section>

<section class="ai4x-domain" data-topic="rsi" data-group="Automating the research process" data-short="RSI and self-improvement">
<h2 id="rsi">RSI: Can a system improve its own ability to improve?</h2>
<p>Recursive self-improvement (RSI) asks a further question: after a system modifies itself, can it become better at making the next improvement? Research can target an agent&#x27;s code, tools, or search strategy, and can also involve learning algorithms.</p>
<button type="button" class="see-process" data-scene="rsi">Watch the process ↗</button>
<div class="task-list">
<div><h3>What is being modified?</h3><p>AutoML usually searches configurations within a predefined space; automated research systems work on external research questions; self-improving systems also modify how they themselves work. When reading, first identify the code, strategies, or parameters that actually change.</p></div>
<div><h3>Storing and selecting versions</h3><p>Darwin Gödel Machine (DGM) lets a coding agent modify its own code, saves multiple versions, and uses coding tasks to evaluate them before exploring further. Its central loop creates, tests, retains, and modifies versions again.</p></div>
<div><h3>Observing sustained improvement</h3><p>Alongside scores on individual tasks, compare improvement curves over multiple rounds, total computation cost, and performance on new tasks. Use controls to distinguish improvements in the next round that come from changes in system capability from those that come from spending more on search.</p></div>
</div>
<ol class="route">
<li><span>Propose changes</span><strong>Own code and tools</strong><p>Create a new version</p></li>
<li><span>Run tests</span><strong>Fixed tasks and budget</strong><p>Compare changes in capability</p></li>
<li><span>Continue improving</span><strong>Version archive and selection</strong><p>Track effects over multiple rounds</p></li>
</ol>
<div data-ai4x-papers="dgm"></div>
<h3>Papers and learning resources</h3>
<ul class="resources">
<li><a href="https://arxiv.org/abs/2505.22954">Darwin Gödel Machine ↗</a><span>2025 · A coding agent that improves itself</span></li>
<li><a href="https://sakana.ai/dgm/">DGM project introduction ↗</a><span>Methods, experiments, and code</span></li>
<li><a href="https://deepmind.google/blog/alphaevolve-a-gemini-powered-coding-agent-for-designing-advanced-algorithms/">AlphaEvolve ↗</a><span>Comparison: code search with an evaluator</span></li>
</ul>
<dl class="terms">
<div><dt>Self-modification</dt><dd>A system changes its own code, tools, or strategies. DGM mainly modifies agent code.</dd></div>
<div><dt>Recursive improvement</dt><dd>An improvement that also changes the system's ability to make further improvements in later iterations.</dd></div>
</dl>
</section>

<a id="ai4x-evidence"></a>

## Match the evidence to the scientific claim

Before comparing models, identify the sample: a molecular structure, a patient, a donor, a trial, or a market at a particular time. Related samples can share information. New molecular scaffolds, protein families, donors, centers, and future periods therefore represent different generalization questions.

| Area | A distinction to check when reading a paper |
| --- | --- |
| Molecules and proteins | A predicted structure, favorable score, or computed energy differs from measured activity, successful synthesis, or stability under the intended conditions. |
| Physical modeling | Small training residuals do not guarantee an exact solution. Inspect boundary conditions, units, discretization, and errors over the required time horizon. |
| Cells and genomics | Expression prediction or an association network does not alone establish a regulatory mechanism. Examine the controls, perturbations, and biological context. |
| EEG and imaging | Match evaluation to participants or patients, sessions, and acquisition sites. A plausible reconstructed image or accurate contour supports a narrower claim than clinical usefulness or unrestricted neural decoding. |
| Finance | Preserve temporal information availability and account for transaction costs and repeated strategy selection. A historical backtest is evidence about that historical protocol, not a guaranteed future outcome. |
| Mathematics | A proof checker verifies the formal statement under its definitions and assumptions. For program search, establish what the evaluator tests and whether it proves correctness or only checks examples. |
| Automated research and self-improvement | Separate proposing, selecting, and independently verifying a change. Repeated gains on a reused evaluator can reflect search and selection; inspect held-out tasks and total search cost. |

The [Qlib workflow documentation](https://qlib.readthedocs.io/en/stable/component/workflow.html) makes chronological splits and backtesting costs concrete; [Mathematics in Lean](https://leanprover-community.github.io/mathematics_in_lean/) explains formal statements and proofs. These examples show how definitions within a domain determine what counts as evidence.

For each paper, write a short reading note: **question → measured data → representation and assumptions → reference method → validation → supported conclusion**. Include units, sources of measurement error, and the population or conditions to which the result applies. Consult a knowledgeable domain collaborator when those definitions are unfamiliar. Writing such a note is useful preparation for a new interdisciplinary project.

[AI for Science resource index](https://github.com/ai4s-research/awesome-ai-for-science) · [AI4X resource directory](catalog-directions.md#topic-23) · [Research questions](research.md) · [Contact and collaboration](contact.md)

[Research design](research-methods.md) covers comparisons and uncertainty; [data and evaluation](datasets.md) covers split design. For deeper prerequisites, use [graphs](advanced-topics.md#graphs), [time series](advanced-topics.md#time-series), [causal inference](advanced-topics.md#causal), and [probabilistic modeling](advanced-topics.md#probabilistic). [Responsible AI](responsible-ai.md) discusses affected populations and use settings.
