---
sidebar_position: 3
title: AI Architecture
description: Deep technical dive into ACE-Step's architecture and how AceSteps integrates it
---

# AI Architecture

This page provides a deep technical dive into ACE-Step's architecture, its key components, and how AceSteps integrates it for music generation.

## System Architecture

```
╔═══════════════════════════════════════════════════════════════════════════════════╗
║                           ACE-STEP SYSTEM ARCHITECTURE                             ║
╠═══════════════════════════════════════════════════════════════════════════════════╣
║                                                                                    ║
║   ┌─────────────────────────────────────────────────────────────────────────────┐ ║
║   │                           INPUT PROCESSING                                   │ ║
║   │                                                                              │ ║
║   │   ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐        │ ║
║   │   │   Text Prompt   │    │    Lyrics       │    │   Control       │        │ ║
║   │   │                 │    │   (Optional)    │    │   Parameters    │        │ ║
║   │   │ "chill lofi..." │    │ "verse 1..."    │    │ duration, seed  │        │ ║
║   │   └────────┬────────┘    └────────┬────────┘    └────────┬────────┘        │ ║
║   │            │                      │                      │                  │ ║
║   │            └──────────────────────┼──────────────────────┘                  │ ║
║   │                                   ▼                                          │ ║
║   │                    ┌──────────────────────────────┐                         │ ║
║   │                    │      T5 TEXT ENCODER         │                         │ ║
║   │                    │   (Frozen, pre-trained)      │                         │ ║
║   │                    │                              │                         │ ║
║   │                    │  Text → Semantic Embeddings  │                         │ ║
║   │                    └──────────────┬───────────────┘                         │ ║
║   │                                   │                                          │ ║
║   └───────────────────────────────────┼──────────────────────────────────────────┘ ║
║                                       │                                            ║
║                                       ▼                                            ║
║   ┌─────────────────────────────────────────────────────────────────────────────┐ ║
║   │                         CORE GENERATION ENGINE                               │ ║
║   │                                                                              │ ║
║   │   ┌─────────────────────────────────────────────────────────────────────┐   │ ║
║   │   │                    FLOW-MATCHING DIFFUSION                           │   │ ║
║   │   │                                                                      │   │ ║
║   │   │    t=T (noise)  ──────────────────────────────▶  t=0 (audio)        │   │ ║
║   │   │         │                                              │             │   │ ║
║   │   │         ▼                                              ▼             │   │ ║
║   │   │    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐        │   │ ║
║   │   │    │  Step   │───▶│  Step   │───▶│  Step   │───▶│  Final  │        │   │ ║
║   │   │    │   T     │    │  T-1    │    │   ...   │    │  Step 0 │        │   │ ║
║   │   │    └─────────┘    └─────────┘    └─────────┘    └─────────┘        │   │ ║
║   │   │                                                                      │   │ ║
║   │   │    Configurable: 27 steps (fast) or 60 steps (quality)              │   │ ║
║   │   └─────────────────────────────────────────────────────────────────────┘   │ ║
║   │                                       │                                      │ ║
║   │                                       ▼                                      │ ║
║   │   ┌─────────────────────────────────────────────────────────────────────┐   │ ║
║   │   │                    LINEAR TRANSFORMER (DiT)                          │   │ ║
║   │   │                                                                      │   │ ║
║   │   │   ┌──────────────────────────────────────────────────────────────┐  │   │ ║
║   │   │   │  DiT Block                                                    │  │   │ ║
║   │   │   │  ┌────────────┐  ┌────────────┐  ┌────────────┐              │  │   │ ║
║   │   │   │  │  Linear    │  │  AdaLN     │  │   FFN      │              │  │   │ ║
║   │   │   │  │ Attention  │─▶│ Modulation │─▶│  Layer     │              │  │   │ ║
║   │   │   │  └────────────┘  └────────────┘  └────────────┘              │  │   │ ║
║   │   │   │        ▲              ▲                                       │  │   │ ║
║   │   │   │        │              │                                       │  │   │ ║
║   │   │   │   ┌────┴──────────────┴────┐                                 │  │   │ ║
║   │   │   │   │  Text Emb + Timestep   │                                 │  │   │ ║
║   │   │   │   └────────────────────────┘                                 │  │   │ ║
║   │   │   └──────────────────────────────────────────────────────────────┘  │   │ ║
║   │   │                              × N layers                              │   │ ║
║   │   └─────────────────────────────────────────────────────────────────────┘   │ ║
║   │                                       │                                      │ ║
║   └───────────────────────────────────────┼──────────────────────────────────────┘ ║
║                                           │                                        ║
║                                           ▼                                        ║
║   ┌─────────────────────────────────────────────────────────────────────────────┐ ║
║   │                          DCAE DECODER                                        │ ║
║   │              Deep Compression AutoEncoder (from Sana)                        │ ║
║   │                                                                              │ ║
║   │   ┌───────────────┐    ┌───────────────┐    ┌───────────────┐              │ ║
║   │   │    Latent     │    │   Upsampling  │    │   Waveform    │              │ ║
║   │   │    Space      │───▶│    Layers     │───▶│   Output      │              │ ║
║   │   │  (compressed) │    │               │    │  (44.1kHz)    │              │ ║
║   │   └───────────────┘    └───────────────┘    └───────────────┘              │ ║
║   │                                                                              │ ║
║   │   Features: 32x compression ratio, preserves acoustic fine details          │ ║
║   └─────────────────────────────────────────────────────────────────────────────┘ ║
║                                           │                                        ║
║                                           ▼                                        ║
║   ┌─────────────────────────────────────────────────────────────────────────────┐ ║
║   │                           OUTPUT                                             │ ║
║   │                                                                              │ ║
║   │                   44.1kHz • Stereo • 320kbps MP3/WAV                        │ ║
║   │                       Duration: up to 240 seconds                            │ ║
║   └─────────────────────────────────────────────────────────────────────────────┘ ║
║                                                                                    ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
```

## Component Deep-Dive

### 1. Deep Compression AutoEncoder (DCAE)

The DCAE is adapted from the Sana image generation framework and modified for audio:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        DCAE ARCHITECTURE                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ENCODER (Audio → Latent)                                                  │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                      │   │
│   │   Raw Audio    Conv     Residual    Downsample    Latent            │   │
│   │   (44.1kHz) ──▶ Layers ──▶ Blocks ──▶ ×4 ──────▶ Space             │   │
│   │                                                                      │   │
│   │   Compression: 32x (temporal), 4x (channels)                        │   │
│   │   Example: 30s audio @ 44.1kHz → ~41,000 latent tokens              │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   DECODER (Latent → Audio)                                                  │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                      │   │
│   │   Latent     Upsample    Residual    Conv      Waveform             │   │
│   │   Space ────▶ ×4 ───────▶ Blocks ───▶ Layers ──▶ Output             │   │
│   │                                                                      │   │
│   │   Reconstruction: Near-lossless audio quality                       │   │
│   │   Preserves: Transients, harmonics, stereo imaging                  │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   Key Properties:                                                            │
│   • 32× temporal compression (efficient latent space)                       │
│   • Preserves fine-grained acoustic details                                 │
│   • Enables efficient diffusion in compressed space                         │
│   • Pre-trained and frozen during ACE-Step training                         │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### DCAE Specifications

| Property | Value |
|----------|-------|
| Compression Ratio | 32x temporal |
| Latent Channels | 16 |
| Sample Rate | 44.1 kHz |
| Reconstruction Quality | Near-lossless |
| Training | Pre-trained, frozen |

### 2. Linear Transformer (DiT Blocks)

ACE-Step uses a modified Diffusion Transformer architecture optimized for efficiency:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      DiT BLOCK ARCHITECTURE                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                          Input Latent (x)                                   │
│                               │                                              │
│                               ▼                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                      Layer Normalization                             │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                               │                                              │
│                               ▼                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                    LINEAR ATTENTION                                  │   │
│   │                                                                      │   │
│   │   Standard:  O(n²) complexity  ←  Quadratic scaling                 │   │
│   │   Linear:    O(n) complexity   ←  ACE-Step uses this                │   │
│   │                                                                      │   │
│   │   Benefits:                                                          │   │
│   │   • Handles long sequences efficiently                               │   │
│   │   • 240 seconds = ~300k samples possible                            │   │
│   │   • Reduced memory footprint                                         │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                               │                                              │
│                               │  + Skip Connection                          │
│                               ▼                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                 AdaLN MODULATION                                     │   │
│   │                                                                      │   │
│   │   Inputs: Text Embeddings + Timestep Embedding                      │   │
│   │                                                                      │   │
│   │   γ, β = MLP(concat(text_emb, time_emb))                           │   │
│   │   output = γ * normalized_input + β                                 │   │
│   │                                                                      │   │
│   │   Purpose: Condition generation on text and diffusion step          │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                               │                                              │
│                               ▼                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                    FEED-FORWARD NETWORK                              │   │
│   │                                                                      │   │
│   │   Linear(d, 4d) → GELU → Linear(4d, d)                              │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                               │                                              │
│                               │  + Skip Connection                          │
│                               ▼                                              │
│                          Output Latent                                      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Transformer Specifications

| Property | Value |
|----------|-------|
| Attention Type | Linear (O(n) complexity) |
| Hidden Dimension | 1536 |
| Number of Layers | 24 |
| Attention Heads | 24 |
| FFN Expansion | 4x |
| Activation | GELU |

### 3. REPA (Representation Alignment)

REPA accelerates training by aligning with pre-trained audio understanding models:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        REPA TRAINING FRAMEWORK                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                    TRAINING DATA (Audio)                             │   │
│   └──────────────────────────────┬──────────────────────────────────────┘   │
│                                  │                                           │
│              ┌───────────────────┼───────────────────┐                      │
│              │                   │                   │                       │
│              ▼                   ▼                   ▼                       │
│   ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐           │
│   │      MERT        │ │    m-hubert      │ │   ACE-Step       │           │
│   │                  │ │                  │ │   (training)     │           │
│   │ Music            │ │ Multilingual     │ │                  │           │
│   │ Representation   │ │ Speech           │ │ Generates        │           │
│   │ (frozen)         │ │ (frozen)         │ │ latents          │           │
│   └────────┬─────────┘ └────────┬─────────┘ └────────┬─────────┘           │
│            │                    │                    │                       │
│            ▼                    ▼                    ▼                       │
│   ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐           │
│   │  Music Semantic  │ │  Speech Semantic │ │   Generated      │           │
│   │   Embeddings     │ │   Embeddings     │ │   Latents        │           │
│   └────────┬─────────┘ └────────┬─────────┘ └────────┬─────────┘           │
│            │                    │                    │                       │
│            └────────────────────┼────────────────────┘                      │
│                                 │                                            │
│                                 ▼                                            │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                    ALIGNMENT LOSS                                    │   │
│   │                                                                      │   │
│   │   L_repa = MSE(ACE_latents, MERT_emb) + MSE(ACE_latents, mhubert)   │   │
│   │                                                                      │   │
│   │   Forces ACE-Step to learn semantically meaningful representations  │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   Benefits:                                                                  │
│   • 3-5x faster convergence                                                 │
│   • Better music understanding                                              │
│   • Improved lyric alignment                                                │
│   • More coherent long-form generation                                      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Alignment Models

| Model | Purpose | Features |
|-------|---------|----------|
| **MERT** | Music understanding | Melody, harmony, rhythm extraction |
| **m-hubert** | Multilingual speech | 19 language support, phoneme alignment |

### 4. Flow-Matching Generation

ACE-Step uses flow-matching instead of standard DDPM for faster inference:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     FLOW-MATCHING vs DDPM                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   DDPM (Traditional Diffusion)                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                      │   │
│   │   Noise ──▶ Step 1000 ──▶ Step 999 ──▶ ... ──▶ Step 0 ──▶ Audio    │   │
│   │                                                                      │   │
│   │   • Requires 1000+ steps for quality                                │   │
│   │   • Slow inference                                                   │   │
│   │   • Stochastic sampling                                              │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   FLOW-MATCHING (ACE-Step)                                                  │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                      │   │
│   │   Noise ──▶ Step 27 ──▶ Step 26 ──▶ ... ──▶ Step 0 ──▶ Audio       │   │
│   │                                                                      │   │
│   │   • Only 27-60 steps needed                                         │   │
│   │   • 15x faster than LLM-based models                                │   │
│   │   • Deterministic ODE solving                                        │   │
│   │   • Better for editing/inpainting                                    │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   Step Configuration:                                                        │
│                                                                              │
│   ┌───────────────┬────────────────┬──────────────────────────────────┐    │
│   │ Steps         │ Speed          │ Quality                           │    │
│   ├───────────────┼────────────────┼──────────────────────────────────┤    │
│   │ 27 (default)  │ Fastest        │ Good for most use cases          │    │
│   │ 40            │ Balanced       │ Better coherence                  │    │
│   │ 60            │ Slower         │ Best quality, complex pieces     │    │
│   └───────────────┴────────────────┴──────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Hardware Requirements

### Memory Usage

| Configuration | VRAM Required | Speed | Recommended For |
|---------------|---------------|-------|-----------------|
| Default | 16 GB | Fast | Production |
| CPU Offload | 8 GB | Medium | Limited hardware |
| torch.compile | 16 GB | Fastest | Optimized production |
| bf16 Disabled | 24 GB | Slow | Debugging only |

### Optimization Flags

```python
# Default configuration (recommended)
acestep --bf16 True

# Low VRAM mode (8GB minimum)
acestep --cpu_offload True --torch_compile True

# Maximum quality
acestep --bf16 True --torch_compile True
```

### GPU Performance Matrix

| GPU | VRAM | RTF @ 27 steps | 30s Generation | Cost/hr (Cloud) |
|-----|------|----------------|----------------|-----------------|
| H100 | 80 GB | ~50x | ~0.6s | $4.00 |
| A100 | 80 GB | 27x | ~1.1s | $2.50 |
| RTX 4090 | 24 GB | 34x | ~0.9s | N/A |
| A10G | 24 GB | ~20x | ~1.5s | $1.00 |
| RTX 3090 | 24 GB | 13x | ~2.3s | N/A |
| RTX 3080 | 10 GB | ~8x | ~3.8s | N/A |

## Inference Pipeline

### Step-by-Step Process

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        INFERENCE PIPELINE                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   STEP 1: Text Encoding                                                     │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │   prompt = "lo-fi hip-hop, chill, rainy day vibes"                  │   │
│   │   text_emb = t5_encoder(tokenizer(prompt))  # Shape: [1, seq, 1024] │   │
│   │   Time: ~50ms                                                        │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   STEP 2: Latent Initialization                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │   duration = 30  # seconds                                          │   │
│   │   latent_length = duration * 44100 / 32  # DCAE compression        │   │
│   │   z_T = torch.randn(1, 16, latent_length)  # Pure noise            │   │
│   │   Time: ~10ms                                                        │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   STEP 3: Flow-Matching Denoising (Main Loop)                               │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │   for t in range(T, 0, -1):  # T=27 or 60                          │   │
│   │       time_emb = timestep_embedding(t)                              │   │
│   │       z_pred = dit_model(z_t, text_emb, time_emb)                  │   │
│   │       z_t = flow_step(z_t, z_pred, t)  # ODE solver step           │   │
│   │                                                                      │   │
│   │   Time: ~1-3s (GPU dependent)                                       │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   STEP 4: DCAE Decoding                                                     │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │   audio = dcae_decoder(z_0)  # Latent → Waveform                   │   │
│   │   audio = audio.squeeze()    # Shape: [1, 2, samples]              │   │
│   │   Time: ~200ms                                                       │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   STEP 5: Post-Processing                                                   │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │   audio = normalize(audio)                                          │   │
│   │   mp3_data = encode_mp3(audio, bitrate=320)                        │   │
│   │   Time: ~100ms                                                       │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   TOTAL TIME: ~2-4 seconds for 30 seconds of audio                         │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Code Example

```python
from acestep import ACEStepPipeline

# Initialize pipeline
pipe = ACEStepPipeline.from_pretrained(
    "ACE-Step/ACE-Step-v1-3.5B",
    torch_dtype=torch.bfloat16,
    device="cuda"
)

# Generate music
result = pipe(
    prompt="lo-fi hip-hop beat, chill vibes, soft piano, vinyl crackle",
    duration=30,              # seconds
    num_inference_steps=27,   # 27 (fast) or 60 (quality)
    seed=42,                  # for reproducibility
)

# Save output
result.save("output.mp3")
```

## Advanced Features

### Variations Generation

Generate multiple interpretations of the same prompt:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        VARIATIONS MODE                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   Original Generation (seed=42)                                             │
│            │                                                                 │
│            ▼                                                                 │
│   ┌────────────────┐                                                        │
│   │  z_0 (latent)  │  ← Saved latent from first generation                 │
│   └────────────────┘                                                        │
│            │                                                                 │
│            │  Mix with fresh noise                                          │
│            ▼                                                                 │
│   ┌────────────────────────────────────────────────────────────────┐       │
│   │                                                                 │       │
│   │   z_var = α * z_0 + (1-α) * z_noise                            │       │
│   │                                                                 │       │
│   │   α = 0.9 → Very similar (slight variations)                   │       │
│   │   α = 0.5 → Moderate changes (different arrangement)           │       │
│   │   α = 0.1 → Major changes (same style, different melody)       │       │
│   │                                                                 │       │
│   └────────────────────────────────────────────────────────────────┘       │
│            │                                                                 │
│            ▼                                                                 │
│   Continue denoising from mixed latent                                      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Repainting (Selective Regeneration)

Fix specific sections while keeping the rest:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        REPAINTING MODE                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   Original Audio Timeline                                                    │
│   ┌────────┬────────┬────────┬────────┬────────┐                           │
│   │  0-6s  │  6-12s │ 12-18s │ 18-24s │ 24-30s │                           │
│   │  Keep  │  Keep  │ REPAINT│  Keep  │  Keep  │                           │
│   └────────┴────────┴────────┴────────┴────────┘                           │
│                         │                                                    │
│                         ▼                                                    │
│   ┌─────────────────────────────────────────────────────────────────────┐   │
│   │                                                                      │   │
│   │   1. Encode original audio to latent space                          │   │
│   │   2. Create mask for repaint region (12-18s)                        │   │
│   │   3. Add noise only to masked region                                │   │
│   │   4. Denoise with new prompt conditioning                           │   │
│   │   5. Blend at boundaries for smooth transition                      │   │
│   │                                                                      │   │
│   └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│   Use Cases:                                                                 │
│   • Fix a section you don't like                                            │
│   • Change instrument in specific part                                      │
│   • Regenerate vocals while keeping instrumental                            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Comparison with Other Architectures

| Feature | ACE-Step | Suno (LLM-based) | MusicGen | DiffRhythm |
|---------|----------|------------------|----------|------------|
| Architecture | Diffusion + Linear Transformer | Autoregressive LLM | Autoregressive | Pure Diffusion |
| Speed (1 min) | ~3s | ~30s | ~10s | ~5s |
| Max Duration | 4 min | 4 min | 30s | 2 min |
| Long Coherence | Good | Best | Poor | Medium |
| Editing Support | Yes | No | No | Limited |
| Memory Efficiency | High | Low | Medium | Medium |
| Fine-tuning | LoRA | No | Limited | Limited |

## Related

- [ACE-Step AI](/music-creation/ace-step-ai) - Overview and capabilities
- [Backend Integration](/music-creation/backend-integration) - AceSteps infrastructure
- [Custom Models](/music-creation/advanced/custom-models) - LoRA fine-tuning
- [API Integration](/music-creation/advanced/api-integration) - Developer API
