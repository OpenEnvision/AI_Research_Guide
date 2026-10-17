# Embodied AI: from seeing to acting

Putting a cup on a shelf requires locating both objects, choosing actions, controlling a body, and responding to slips, changes in viewpoint, and unfamiliar environments. A short video of this task brings together questions about data, learning, control, and systems.

Manipulation, navigation, and locomotion all connect perception to physical interaction. Models must handle vision and language alongside continuous actions, contact, and dynamics. Changing the robot or environment can also change the available data and action interfaces.

<a id="embodied-learning"></a>

## Read the complete perception–action loop

Begin with [visual representations](vision.md), basic coordinate transforms, and feedback control; then study imitation learning before comparing large VLA models. You do not need hardware for this first pass: diagrams, recorded trajectories, and dataset specifications reveal much of the problem setup.

Trace one task through observation, instruction, action prediction, controller execution, and the next observation. At each boundary, check the interface:

- **Observation:** camera views, calibration, timestamps, and robot state. A wrist camera and an external camera provide different information.
- **Action:** joint targets or end-effector pose; absolute values or changes; coordinate frame, units, gripper convention, and control rate. Action vectors with the same dimensions can encode different physical commands.
- **Feedback:** how many predicted actions are executed before the next observation, and how a controller responds to contact or tracking error.

Action chunks can reduce repeated prediction and represent temporally coherent motion, but executing a long chunk without fresh observations can delay correction. Good agreement with demonstration actions on recorded inputs does not establish closed-loop success: the robot's own errors change what it observes next.

## Demonstrations and action models

Imitation learning trains action models from demonstrations by people or existing policies. [ACT / ALOHA](https://tonyzhaozh.github.io/aloha/) collects demonstrations through bimanual teleoperation, and ACT predicts a sequence of continuous actions from observations. [Diffusion Policy](https://diffusion-policy.cs.columbia.edu/) uses a diffusion model to generate action sequences, connecting visual information with a distribution of possible actions.

Manipulation performance depends on which tasks the demonstrations cover, how actions are represented—for example, as joint positions or end-effector poses—and how observations are used over time. [LeRobot](https://github.com/huggingface/lerobot) provides robot data, models, and training tools. [Open X-Embodiment](https://robotics-transformer-x.github.io/) brings together robot data from different sources to study learning across tasks and robot platforms.

## Vision, language, and action

Vision–language–action (VLA) models connect visual observations, language instructions, and actions. Instructions specify a goal, vision describes the current environment, and the predicted actions must be compatible with the robot. Transferring pretrained knowledge to manipulation and generalizing to new instructions, objects, or environments are central research questions.

VLA models can learn from demonstrations and use reward feedback to improve a policy. Their architecture connects with [multimodal learning](multimodal.md), while policy optimization connects with [reinforcement learning](rl.md); a robot system can combine both.

## Simulation, control, and physical environments

Simulation provides repeatable scenes and interactions for data generation, policy training, and evaluation. [RoboTwin](https://robotwin-platform.github.io/) includes simulated manipulation tasks, data, and evaluation tools. Friction, contact, latency, and sensor errors in physical systems affect whether a policy transfers from simulation to hardware.

[MIT Robotic Manipulation](https://manipulation.csail.mit.edu/) covers geometry, contact, planning, and control; [Underactuated Robotics](https://underactuated.mit.edu/) develops dynamics and control. Beyond manipulation, navigation studies localization and movement through space. Humanoid systems also require balance, gait, and whole-body coordination.

## Courses, papers, and research groups

[Lumina's Embodied AI Guide](https://github.com/TianxingChen/Embodied-AI-Guide) organizes tasks, methods, and resources. More specialized paper lists cover [RL-VLA](https://github.com/Denghaoyuan123/Awesome-RL-VLA), [humanoid robot learning](https://github.com/YanjieZe/awesome-humanoid-robot-learning), and [efficient VLA](https://github.com/guanweifan/awesome-efficient-vla).

The guide also has [courses and projects](catalog-directions.md#topic-19), [specialized paper collections](catalog-directions.md#topic-20), and [research groups](labs.md). For data and scaling, see the [research notes](blogs.md#zou); for comparisons and result analysis, see the [research handbook](research.md#q44).

## Design a testable embodied-AI study

- **Question and controls:** specify the robot, sensors, action space, control frequency, tasks, and demonstrations. Compare simple control or behavioral-cloning baselines with matched data and budgets; distinguish simulation from physical systems.
- **Evaluation:** report initial states, repetitions, manual resets, interventions, success criteria, and failure types. Evaluate changes in objects, scenes, robots, and tasks as distinct tests of generalization.
- **Limits:** offline prediction error differs from closed-loop success, and gains in simulation do not establish that a policy will transfer to physical hardware. Physical experiments must follow the institution's operating and safety procedures.

[Research design](research-methods.md) · [Data and evaluation](datasets.md)

Use [3D vision](advanced-topics.md#geometry) for coordinates, cameras, and point clouds and [engineering](engineering.md) for recording and managing data and models. Record offline checks, simulation, and physical-system validation separately, including human resets and interventions.
