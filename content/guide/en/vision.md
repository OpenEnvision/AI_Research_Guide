# Computer vision: perception and visual representations

What is in a photo, where is it, which pixels belong to an object, and how can images reveal a 3D scene? Classification, detection, segmentation, and 3D vision require different outputs, leading to different datasets, models, and evaluation methods.

These tasks all involve learning useful representations from pixels. Convolutional networks use local structure to extract features. Vision Transformers split images into patches and use attention to exchange information among them. Learned representations support recognition and retrieval and also become components of image–text models and robot perception.

<a id="vision-learning"></a>

## Understand the output before choosing a model

Begin with tensors, supervised learning, convolution, and train/validation/test splits in [foundations](basics.md), then trace how one classification model computes its representations and loss. Before moving to a new task, identify what is annotated and what the model must output:

| Task | Typical output | A useful question when reading results |
| --- | --- | --- |
| Classification | One or more image-level labels | Which classes and kinds of errors are hidden by average accuracy? |
| Detection | Object boxes, classes, and confidence scores | How are predictions matched to objects, and at which IoU thresholds? |
| Semantic segmentation | A class for each pixel | How are background and rare classes included in the reported IoU? |
| Instance segmentation | A separate mask for each object | Can the model distinguish touching objects of the same class? |
| Depth or 3D estimation | Distances, poses, or geometry | What are the units, coordinate conventions, and scale assumptions? |

A strong classifier is not automatically a strong detector, and a pixel mask does not by itself recover physical geometry. Pretraining can improve representations, but transfer still depends on the new task and image distribution. Read the data and metric definitions alongside the network diagram.

## Visual representations and network architecture

Vision has moved from hand-designed features toward learning representations together with task objectives. As networks become deeper, optimization itself can become difficult. [ResNet](https://arxiv.org/abs/1512.03385) introduces residual connections so that a group of layers learns a change relative to its input, improving the training of deep networks.

Architecture also determines how much of an image can influence a feature. A convolutional network's receptive field changes with its layers and operations; [Distill's visual explanation](https://distill.pub/2019/computing-receptive-fields/) develops this relationship. ViT connects vision with sequence modeling through image patches and attention.

## Data, tasks, and generalization

Recognition can depend on shape or texture, but also on backgrounds that frequently appear with an object. These relationships can change with lighting, capture conditions, or data sources. Annotation quality, pretraining, and representation learning therefore matter alongside network architecture.

Video adds actions and temporal relationships to static images, while multiple views provide information about depth, geometry, and 3D structure. Visual representations connect with text in [multimodal models](multimodal.md), support image creation and editing in [generative models](generation.md), and provide environmental information for action in [embodied AI](embodied.md).

## Courses, projects, and resources

[CS231n](https://cs231n.stanford.edu/schedule) covers visual tasks, convolutional networks, model training, and deep learning methods. [Digit classification and object detection](start.md) provide project starting points: classification begins with scikit-learn's small, bundled digits dataset on a CPU, with MNIST as an optional extension; detection begins with a pretrained model on your own photos before considering fine-tuning.

More courses and projects are in the [vision catalog](catalog-directions.md#topic-13). [SVL, RAIL, and other research groups](labs.md) connect vision with scene understanding and robot learning. For runtime, memory, and deployment, see [efficiency and systems](systems.md).

## Design a testable vision study

- **Question and controls:** specify classification, detection, segmentation, 3D, or video tasks. Identify the factor under study and match the remaining conditions, including resolution, pretrained weights, augmentation, and training budget. Evaluate simple baselines and publicly available methods under the same protocol.
- **Evaluation:** account for related samples from patients, object identities, videos, or collection sources; keep near-duplicates in the same split. Inspect classes, object sizes, occlusion, domain changes, and annotation noise alongside aggregate results.
- **Limits:** average performance on one dataset does not establish robustness across real-world settings. Detection AP, classification accuracy, and segmentation IoU have different task definitions and aggregation rules.

[Research design](research-methods.md) · [Data and evaluation](datasets.md)

Follow [3D geometry](advanced-topics.md#geometry) for projection, coordinates, and registration, and [distribution-shift evaluation](responsible-ai.md#robustness-ood) for classifier and detector limits. Geometric accuracy, visual quality, and task success need separate evidence.
