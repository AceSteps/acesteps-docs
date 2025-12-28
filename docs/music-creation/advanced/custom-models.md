---
sidebar_position: 1
title: Custom Models & LoRA
description: Fine-tuning ACE-Step with LoRA for specialized music generation
---

# Custom Models & LoRA

ACE-Step supports LoRA (Low-Rank Adaptation) fine-tuning, enabling specialized music generation for specific genres, styles, or use cases. This page covers official LoRA models, training your own, and AceSteps' roadmap for custom model support.

## What is LoRA?

LoRA is an efficient fine-tuning technique that adds small trainable layers to a frozen base model:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        LoRA ARCHITECTURE                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   Traditional Fine-Tuning                                                   │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                      │   │
│   │   Base Model (3.5B params)  ──▶  Fine-tune ALL weights              │   │
│   │                                                                      │   │
│   │   Problems:                                                          │   │
│   │   • Requires 50+ GB VRAM                                            │   │
│   │   • Training takes days/weeks                                       │   │
│   │   • Creates full model copy (14+ GB)                                │   │
│   │   • Easy to overfit or catastrophic forgetting                      │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   LoRA Fine-Tuning                                                          │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                      │   │
│   │   Base Model (3.5B - FROZEN)                                        │   │
│   │         │                                                            │   │
│   │         ▼                                                            │   │
│   │   ┌───────────────────────────────────────────────────────────┐     │   │
│   │   │   Original Weight Matrix W (frozen)                       │     │   │
│   │   │              │                                            │     │   │
│   │   │              │  + LoRA Adaptation                         │     │   │
│   │   │              │                                            │     │   │
│   │   │   ┌─────┐   │   ┌─────┐                                  │     │   │
│   │   │   │  A  │ ──┼──▶│  B  │  (rank 8-64, trainable)         │     │   │
│   │   │   └─────┘   │   └─────┘                                  │     │   │
│   │   │    (d×r)    │    (r×d)                                   │     │   │
│   │   │              │                                            │     │   │
│   │   │   Output = W·x + (A·B)·x                                 │     │   │
│   │   └───────────────────────────────────────────────────────────┘     │   │
│   │                                                                      │   │
│   │   Benefits:                                                          │   │
│   │   • Only 16-24 GB VRAM needed                                       │   │
│   │   • Training takes hours                                            │   │
│   │   • LoRA weights are tiny (10-100 MB)                              │   │
│   │   • Easy to swap/combine multiple LoRAs                            │   │
│   │   • Base model knowledge preserved                                  │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### LoRA vs Full Fine-Tuning

| Aspect | Full Fine-Tuning | LoRA |
|--------|------------------|------|
| VRAM Required | 50+ GB | 16-24 GB |
| Training Time | Days/Weeks | Hours |
| Model Size | 14+ GB | 10-100 MB |
| Base Model | Modified | Preserved |
| Catastrophic Forgetting | High Risk | Low Risk |
| Combining Styles | Difficult | Easy (merge LoRAs) |

## Official ACE-Step LoRAs

The ACE-Step team has released several specialized LoRA models:

### Released Models

| LoRA | Purpose | Size | Performance | Best For |
|------|---------|------|-------------|----------|
| **Lyric2Vocal** | Pure vocal generation | 45 MB | Excellent vocals | A cappella, vocal-focused |
| **Text2Samples** | Instrumental samples | 38 MB | Clean loops | Producers, sample packs |
| **RapMachine** | Rap/Hip-hop | 52 MB | Chinese rap optimized | Rap vocals, flow |

### Planned Models

| LoRA | Purpose | Status | Expected |
|------|---------|--------|----------|
| **StemGen** | Individual instrument tracks | In Development | Q2 2025 |
| **Singing2Accompaniment** | Backing tracks from vocals | In Development | Q2 2025 |
| **EDMaster** | EDM/Electronic focus | Planned | Q3 2025 |
| **LoFiVibes** | Lo-fi aesthetic | Planned | Q3 2025 |

### Using Official LoRAs

```python
from acestep import ACEStepPipeline

# Load base model with Lyric2Vocal LoRA
pipe = ACEStepPipeline.from_pretrained(
    "ACE-Step/ACE-Step-v1-3.5B",
    lora_path="ACE-Step/ACE-Step-v1-Lyric2Vocal-LoRA",
    torch_dtype=torch.bfloat16
)

# Generate vocal-focused content
result = pipe(
    prompt="[vocals only] powerful female vocal, soul, emotional",
    duration=30
)
```

## Training Your Own LoRA

### Prerequisites

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| GPU VRAM | 16 GB | 24 GB |
| System RAM | 32 GB | 64 GB |
| Storage | 100 GB | 500 GB |
| Python | 3.10+ | 3.11 |
| CUDA | 11.8+ | 12.1 |

### Dataset Preparation

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        DATASET STRUCTURE                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   training_data/                                                            │
│   ├── audio/                                                                 │
│   │   ├── track_001.wav    (44.1kHz, stereo, 30s-240s)                     │
│   │   ├── track_002.wav                                                     │
│   │   ├── track_003.wav                                                     │
│   │   └── ...                                                                │
│   │                                                                          │
│   ├── annotations/                                                           │
│   │   ├── track_001.json                                                    │
│   │   │   {                                                                  │
│   │   │     "prompt": "energetic rock song with distorted guitars",        │
│   │   │     "lyrics": "verse 1 lyrics here...",                            │
│   │   │     "tags": ["rock", "energetic", "guitar"],                       │
│   │   │     "bpm": 140,                                                     │
│   │   │     "key": "E minor"                                                │
│   │   │   }                                                                  │
│   │   ├── track_002.json                                                    │
│   │   └── ...                                                                │
│   │                                                                          │
│   └── metadata.csv                                                           │
│       filename,prompt,duration,genre,mood                                   │
│       track_001.wav,"energetic rock...",180,rock,energetic                 │
│       track_002.wav,"chill ambient...",240,ambient,calm                    │
│                                                                              │
│   Dataset Requirements:                                                      │
│   • Minimum: 50 tracks (1+ hours total)                                     │
│   • Recommended: 200+ tracks (5+ hours total)                               │
│   • Audio: WAV format, 44.1kHz, stereo                                      │
│   • Annotations: Detailed prompts matching audio content                    │
│   • Quality: Clean recordings, consistent style                             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Training Configuration

```yaml
# train_config.yaml

# Model settings
base_model: "ACE-Step/ACE-Step-v1-3.5B"
output_dir: "./lora_output"

# LoRA hyperparameters
lora:
  rank: 32              # Higher = more capacity, more VRAM
  alpha: 64             # Scaling factor (usually 2x rank)
  dropout: 0.1          # Regularization
  target_modules:       # Which layers to adapt
    - "q_proj"
    - "k_proj"
    - "v_proj"
    - "out_proj"
    - "fc1"
    - "fc2"

# Training settings
training:
  epochs: 50
  batch_size: 1         # Limited by VRAM
  gradient_accumulation: 8
  learning_rate: 1e-4
  lr_scheduler: "cosine"
  warmup_steps: 100
  max_grad_norm: 1.0

# Data settings
data:
  train_dir: "./training_data"
  validation_split: 0.1
  max_duration: 60      # Crop longer tracks
  augmentation:
    pitch_shift: true   # ±2 semitones
    time_stretch: true  # ±10%
    add_noise: false

# Hardware
precision: "bf16"
gradient_checkpointing: true
```

### Training Script

```python
from acestep.training import LoRATrainer, TrainingConfig
import torch

# Load configuration
config = TrainingConfig.from_yaml("train_config.yaml")

# Initialize trainer
trainer = LoRATrainer(
    base_model="ACE-Step/ACE-Step-v1-3.5B",
    config=config,
    device="cuda"
)

# Prepare dataset
dataset = trainer.prepare_dataset("./training_data")

# Start training
trainer.train(
    dataset=dataset,
    epochs=config.training.epochs,
    callbacks=[
        # Save checkpoints every 10 epochs
        SaveCheckpointCallback(every=10),
        # Log to wandb
        WandbCallback(project="acestep-lora"),
        # Early stopping
        EarlyStoppingCallback(patience=5, metric="val_loss")
    ]
)

# Save final LoRA
trainer.save_lora("./my_custom_lora")
```

### Training Metrics

Monitor these metrics during training:

| Metric | Good Range | Indicates |
|--------|------------|-----------|
| `train_loss` | Decreasing | Model learning |
| `val_loss` | Stable/Decreasing | No overfitting |
| `grad_norm` | < 1.0 | Stable training |
| `learning_rate` | Following schedule | Optimizer working |
| `audio_quality` | Subjective | Listen to samples! |

### Evaluation

```python
# Generate samples with trained LoRA
pipe = ACEStepPipeline.from_pretrained(
    "ACE-Step/ACE-Step-v1-3.5B",
    lora_path="./my_custom_lora"
)

# Test prompts matching your training data style
test_prompts = [
    "your style prompt 1",
    "your style prompt 2",
    "edge case prompt",
]

for prompt in test_prompts:
    result = pipe(prompt=prompt, duration=30, seed=42)
    result.save(f"eval_{hash(prompt)}.mp3")
```

## Combining Multiple LoRAs

ACE-Step supports merging multiple LoRAs for hybrid styles:

```python
from acestep import ACEStepPipeline, merge_loras

# Merge two LoRAs with weights
merged_lora = merge_loras(
    loras=[
        ("./lora_vocal", 0.7),      # 70% vocal style
        ("./lora_ambient", 0.3),    # 30% ambient style
    ],
    output_path="./merged_lora"
)

# Use merged LoRA
pipe = ACEStepPipeline.from_pretrained(
    "ACE-Step/ACE-Step-v1-3.5B",
    lora_path="./merged_lora"
)
```

### Merge Strategies

| Strategy | Use Case | Example |
|----------|----------|---------|
| **Weighted Average** | Blend styles | 0.5 rock + 0.5 electronic |
| **Task Arithmetic** | Add capabilities | base + vocals + production |
| **TIES Merge** | Reduce conflicts | Multiple specialized LoRAs |

## AceSteps Custom Model Roadmap

### Phase 1: Official LoRA Selection (Current)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        PHASE 1: OFFICIAL LORAS                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   Creator Studio UI                                                          │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                      │   │
│   │   Model Selection:                                                   │   │
│   │   ┌─────────────────────────────────────────────────────────────┐   │   │
│   │   │  ○ Base ACE-Step (General Purpose)                          │   │   │
│   │   │  ○ Lyric2Vocal (Vocal Focus)                                │   │   │
│   │   │  ○ Text2Samples (Instrumental)                              │   │   │
│   │   │  ○ RapMachine (Rap/Hip-hop)                                 │   │   │
│   │   └─────────────────────────────────────────────────────────────┘   │   │
│   │                                                                      │   │
│   │   Status: ✓ Available now                                           │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Phase 2: Community Model Gallery (Q2 2025)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        PHASE 2: COMMUNITY GALLERY                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   Features:                                                                  │
│   • Upload trained LoRAs to AceSteps                                        │
│   • Community ratings and reviews                                           │
│   • Quality moderation by team                                              │
│   • Revenue sharing for popular models                                      │
│                                                                              │
│   Model Card Example:                                                        │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                      │   │
│   │   🎸 RetroSynth80s                                    ★★★★☆ (4.2)   │   │
│   │   by @synthmaster                                                    │   │
│   │                                                                      │   │
│   │   80s synthwave and retrowave style. Perfect for                    │   │
│   │   nostalgic, neon-lit soundscapes.                                  │   │
│   │                                                                      │   │
│   │   Downloads: 1,234  |  Size: 48 MB  |  Base: v1-3.5B               │   │
│   │                                                                      │   │
│   │   [Try Now] [Download] [View Samples]                               │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   Status: 🚧 In Development                                                  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Phase 3: In-Platform Training (Q4 2025)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        PHASE 3: IN-PLATFORM TRAINING                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   Features:                                                                  │
│   • Upload your audio dataset directly                                      │
│   • Automatic annotation assistance                                          │
│   • Cloud GPU training (no local hardware needed)                           │
│   • Training dashboard with metrics                                          │
│   • One-click deployment to your generations                                 │
│                                                                              │
│   Training Dashboard:                                                        │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                      │   │
│   │   My LoRA Training: "JazzFusion"                                    │   │
│   │                                                                      │   │
│   │   Progress: ████████████░░░░░░░░ 62%                                │   │
│   │   Epoch: 31/50                                                       │   │
│   │   Loss: 0.0234 ↓                                                    │   │
│   │   ETA: 2h 15m                                                        │   │
│   │                                                                      │   │
│   │   [Pause] [Cancel] [View Samples]                                   │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   Status: 📋 Planned                                                         │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Best Practices

### Dataset Quality

| Do | Don't |
|-----|-------|
| Use high-quality recordings | Include noisy/clipped audio |
| Keep consistent style | Mix unrelated genres |
| Write detailed prompts | Use vague descriptions |
| Include 50+ diverse tracks | Train on < 20 samples |
| Validate audio formats | Mix sample rates |

### Training Tips

1. **Start with lower rank** (16-32) and increase if underfitting
2. **Monitor validation loss** - stop if it increases while train loss decreases
3. **Listen to samples** every 10 epochs - metrics don't tell the full story
4. **Save checkpoints** - you can always go back to earlier versions
5. **Test edge cases** - prompts outside your training distribution

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Overfitting | Too many epochs | Early stopping, more data |
| Underfitting | Rank too low | Increase LoRA rank |
| Mode collapse | Learning rate too high | Reduce LR, add warmup |
| Quality degradation | Bad data | Clean dataset, filter outliers |
| CUDA OOM | Batch too large | Reduce batch, use gradient accumulation |

## Resources

### Official Documentation

- [ACE-Step Training Guide](https://github.com/ace-step/ACE-Step/blob/main/TRAIN_INSTRUCTION.md)
- [LoRA Paper](https://arxiv.org/abs/2106.09685) - Original LoRA research
- [Hugging Face PEFT](https://huggingface.co/docs/peft) - LoRA library documentation

### Community Resources

- [ACE-Step Discord](https://discord.gg/acestep) - Training help and model sharing
- [Hugging Face Hub](https://huggingface.co/models?search=ace-step-lora) - Community LoRAs

## Related

- [ACE-Step AI](/music-creation/ace-step-ai) - Base model overview
- [AI Architecture](/music-creation/ai-architecture) - Technical deep-dive
- [API Integration](/music-creation/advanced/api-integration) - Using LoRAs via API
- [Backend Integration](/music-creation/backend-integration) - Infrastructure
