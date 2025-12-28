---
sidebar_position: 2
title: ACE-Step AI
description: Comprehensive guide to the ACE-Step AI music generation model powering AceSteps
---

# ACE-Step AI

ACE-Step is a state-of-the-art open-source AI music generation model that powers all music creation on AceSteps. This page provides a comprehensive overview of the model's capabilities, architecture, and integration.

## Why ACE-Step?

AceSteps chose ACE-Step as its AI backbone for several critical reasons:

### Zero Copyright Risk

| Aspect | ACE-Step | Proprietary Models |
|--------|----------|-------------------|
| License | Apache 2.0 | Restrictive/Proprietary |
| Commercial Use | Full rights | Often limited |
| Training Data | Disclosed | Opaque |
| Copyright Claims | None possible | Risk of infringement |
| NFT Minting | Fully legal | Legal gray area |

:::tip Why This Matters
Every song created on AceSteps is 100% copyright-free. Creators can mint, sell, and monetize their AI-generated music without any legal risk. This is foundational to our tokenization model.
:::

### Open Source Advantages

- **Transparency** - Model weights publicly available
- **Self-Hostable** - No vendor lock-in
- **Community** - Active development and improvements
- **Customizable** - LoRA fine-tuning support
- **Auditable** - Training methodology documented

## Model Specifications

### Core Parameters

| Specification | Value |
|---------------|-------|
| Model Name | ACE-Step-v1-3.5B |
| Parameters | 3.5 billion |
| Architecture | Diffusion + Linear Transformer |
| License | Apache 2.0 |
| Developers | ACE Studio & StepFun |
| Release | 2025 |

### Audio Output

| Property | Value |
|----------|-------|
| Format | MP3 (default), WAV |
| Bitrate | 320 kbps |
| Sample Rate | 44.1 kHz |
| Channels | Stereo |
| Max Duration | 240 seconds (4 minutes) |
| Quality | Professional-grade |

### Generation Speed

Real-Time Factor (RTF) measures how fast the model generates audio. Higher RTF = faster generation.

| GPU | RTF (27 steps) | Time for 1 min | RTF (60 steps) | Time for 1 min |
|-----|----------------|----------------|----------------|----------------|
| RTX 4090 | 34.48x | 1.74s | 15.63x | 3.84s |
| A100 | 27.27x | 2.20s | 12.27x | 4.89s |
| RTX 3090 | 12.76x | 4.70s | 6.48x | 9.26s |
| A10G (AceSteps) | ~20x | ~3.0s | ~10x | ~6.0s |
| M2 Max | 2.27x | 26.43s | 1.03x | 58.25s |

:::info AceSteps Performance
On our Modal A10G infrastructure, generating 30 seconds of music takes approximately **4-5 seconds**. This enables near-instant previews for creators.
:::

## Language Support

ACE-Step supports **19 languages** for lyrics and vocal generation:

### Tier 1 - Excellent Performance

| Language | Code | Vocal Quality | Lyric Alignment |
|----------|------|---------------|-----------------|
| English | en | Excellent | Excellent |
| Chinese | zh | Excellent | Excellent |
| Japanese | ja | Excellent | Very Good |
| Korean | ko | Very Good | Very Good |

### Tier 2 - Good Performance

| Language | Code | Vocal Quality | Lyric Alignment |
|----------|------|---------------|-----------------|
| Spanish | es | Very Good | Good |
| German | de | Very Good | Good |
| French | fr | Good | Good |
| Portuguese | pt | Good | Good |
| Italian | it | Good | Good |
| Russian | ru | Good | Good |

### Tier 3 - Experimental

Other supported languages may have reduced quality due to training data imbalance. Performance varies by genre and complexity.

## Generation Capabilities

### Text-to-Music

Generate complete songs from natural language descriptions:

```
Input: "upbeat electronic dance music with energetic synth leads
        and a driving four-on-the-floor beat, festival anthem style"

Output: 30-second EDM track with synthesizers, bass drops, and builds
```

### Style Control

#### Genres Supported

| Category | Genres |
|----------|--------|
| Electronic | EDM, House, Techno, Trance, Dubstep, Ambient |
| Hip-Hop | Trap, Boom Bap, Lo-fi Hip-hop, Drill |
| Rock | Alternative, Indie, Metal, Punk, Classic Rock |
| Pop | Synth-pop, K-pop, J-pop, Dance Pop |
| Classical | Orchestral, Piano, Chamber, Cinematic |
| World | Latin, Afrobeat, Reggae, Folk |
| Other | Jazz, R&B, Soul, Country, Blues |

#### Mood Control

```
Energetic / Calm / Happy / Sad / Dark / Uplifting / Mysterious / Aggressive
Romantic / Nostalgic / Triumphant / Melancholic / Peaceful / Intense
```

#### Instrument Specification

```
Piano, Guitar (acoustic/electric), Drums, Bass, Synthesizer, Strings,
Brass, Woodwinds, Percussion, Violin, Cello, Saxophone, Trumpet, Flute
```

### Lyrics Support

Generate songs with AI-generated vocals and lyrics:

```
Input: "love song with female vocals about summer nights by the ocean,
        indie folk style with acoustic guitar"

Output: Song with generated lyrics matching the theme, melody, and vocals
```

:::warning Lyric Quality
Vocal synthesis is still evolving. Results work best with:
- Clear genre specification
- Simple lyrical themes
- Tier 1 languages
:::

### Advanced Generation Modes

| Mode | Description | Use Case |
|------|-------------|----------|
| **Variations** | Generate alternatives from same prompt | Explore different interpretations |
| **Repainting** | Regenerate specific sections | Fix parts you don't like |
| **Lyric Editing** | Modify lyrics while keeping melody | Adjust words post-generation |
| **Extend** | Continue an existing generation | Create longer compositions |

## Architecture Overview

ACE-Step uses a novel architecture that combines the best of diffusion models and transformers:

```
┌────────────────────────────────────────────────────────────────────────┐
│                      ACE-STEP GENERATION PIPELINE                       │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   USER PROMPT                                                          │
│   "chill lofi beat with rain sounds and soft piano"                    │
│        │                                                                │
│        ▼                                                                │
│   ┌─────────────────────────────────────────────────────────────────┐  │
│   │                    TEXT ENCODER (T5)                             │  │
│   │    Converts natural language to semantic embeddings              │  │
│   └─────────────────────────────────────────────────────────────────┘  │
│        │                                                                │
│        │  Text Embeddings                                              │
│        ▼                                                                │
│   ┌─────────────────────────────────────────────────────────────────┐  │
│   │              LINEAR TRANSFORMER + DiT BLOCKS                     │  │
│   │                                                                  │  │
│   │   ┌───────────┐    ┌───────────┐    ┌───────────┐              │  │
│   │   │  DiT      │───▶│  DiT      │───▶│  DiT      │──▶ ...       │  │
│   │   │  Block 1  │    │  Block 2  │    │  Block 3  │              │  │
│   │   └───────────┘    └───────────┘    └───────────┘              │  │
│   │         ▲                ▲                ▲                      │  │
│   │         │                │                │                      │  │
│   │   ┌─────┴────────────────┴────────────────┴─────┐              │  │
│   │   │           TIMESTEP EMBEDDINGS                │              │  │
│   │   │        (Diffusion step conditioning)         │              │  │
│   │   └─────────────────────────────────────────────┘              │  │
│   └─────────────────────────────────────────────────────────────────┘  │
│        │                                                                │
│        │  Latent Representations                                       │
│        ▼                                                                │
│   ┌─────────────────────────────────────────────────────────────────┐  │
│   │                DCAE DECODER                                      │  │
│   │     Deep Compression AutoEncoder (from Sana)                     │  │
│   │     Converts latent space → high-fidelity audio waveform        │  │
│   └─────────────────────────────────────────────────────────────────┘  │
│        │                                                                │
│        ▼                                                                │
│   ┌─────────────────────────────────────────────────────────────────┐  │
│   │                    AUDIO OUTPUT                                  │  │
│   │              44.1kHz • Stereo • 320kbps MP3                      │  │
│   └─────────────────────────────────────────────────────────────────┘  │
│                                                                         │
└────────────────────────────────────────────────────────────────────────┘
```

### Key Components

| Component | Purpose | Innovation |
|-----------|---------|------------|
| **DCAE** | Audio encoding/decoding | Deep compression preserves acoustic details |
| **Linear Transformer** | Sequence modeling | Lightweight, efficient attention |
| **REPA** | Semantic alignment | MERT + m-hubert for faster convergence |
| **Flow-Matching** | Generation process | Faster than pure diffusion |

For detailed architecture information, see [AI Architecture Deep-Dive](/music-creation/ai-architecture).

## AceSteps Integration

### Generation Flow

```
┌──────────────────────────────────────────────────────────────────────┐
│                    ACESTEPS GENERATION FLOW                           │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   CREATOR                     ACESTEPS                    BLOCKCHAIN  │
│      │                           │                            │       │
│      │  1. Enter prompt          │                            │       │
│      │─────────────────────────▶│                            │       │
│      │                           │                            │       │
│      │                     2. Validate & queue                │       │
│      │                           │                            │       │
│      │                     3. GPU inference                   │       │
│      │                        (Modal A10G)                    │       │
│      │                           │                            │       │
│      │  4. Stream preview        │                            │       │
│      │◀─────────────────────────│                            │       │
│      │                           │                            │       │
│      │  5. Click "Save"          │                            │       │
│      │─────────────────────────▶│                            │       │
│      │                           │                            │       │
│      │                     6. Generate signature              │       │
│      │                        (ECDSA sign)                    │       │
│      │                           │                            │       │
│      │                           │  7. mint(signature)        │       │
│      │                           │───────────────────────────▶│       │
│      │                           │                            │       │
│      │                           │  8. Verify & mint NFT      │       │
│      │                           │◀───────────────────────────│       │
│      │                           │                            │       │
│      │  9. NFT in wallet!        │                            │       │
│      │◀─────────────────────────│                            │       │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
```

### Signature Verification

Only AI-generated music can be minted on AceSteps. This is enforced through cryptographic signatures:

1. **Generation** - Backend runs ACE-Step, stores `audioHash`
2. **Signing** - Backend signs `hash(userAddress + metadataURI + audioHash)`
3. **Minting** - Smart contract verifies signature via ECDSA
4. **Security** - Prevents uploading copyrighted or non-AI content

For more details, see [Backend Integration](/music-creation/backend-integration).

## Prompt Engineering Tips

### Effective Prompts

| Element | Good Example | Poor Example |
|---------|--------------|--------------|
| **Genre** | "lo-fi hip-hop beat" | "good music" |
| **Mood** | "melancholic, nostalgic" | "sad" |
| **Instruments** | "soft piano, vinyl crackle, muted drums" | "instruments" |
| **Tempo** | "slow, 70 BPM" | (not specified) |
| **Style Reference** | "Nujabes-inspired jazz hop" | "like that one song" |

### Prompt Structure

```
[genre] + [mood/atmosphere] + [instruments] + [additional details]

Example:
"ambient electronic music with ethereal pads, gentle arpeggios,
 and atmospheric textures, peaceful and meditative, space-themed"
```

For comprehensive prompt guidance, see [Prompts Guide](/music-creation/prompts-guide).

## Limitations

### Current Constraints

| Limitation | Details | Workaround |
|------------|---------|------------|
| **Duration** | Max 240 seconds | Use "extend" for longer pieces |
| **Seed Sensitivity** | Same prompt can yield different results | Save seeds you like |
| **Niche Genres** | Some genres underperform | Combine with well-supported genres |
| **Vocal Nuance** | Vocals can sound artificial | Focus on instrumental or simple vocals |
| **Long Coherence** | Structure may drift >3 min | Keep generations under 2 minutes |

### Not Supported

:::warning Intentionally Excluded
These features are **by design** not supported to ensure copyright compliance:
:::

| Feature | Reason |
|---------|--------|
| **Artist Imitation** | Copyright and likeness rights |
| **Song Recreation** | Direct copyright infringement |
| **Voice Cloning** | Privacy and consent concerns |
| **Cover Songs** | Requires licensing |

## Comparison with Other Models

| Feature | ACE-Step | Suno | Udio | MusicGen |
|---------|----------|------|------|----------|
| Open Source | Yes | No | No | Yes |
| Commercial License | Apache 2.0 | Proprietary | Proprietary | CC-BY-NC |
| NFT Minting Legal | Yes | Unclear | Unclear | No (NC) |
| Max Duration | 4 min | 4 min | 2 min | 30s |
| Speed (1 min) | ~3s | ~30s | ~60s | ~10s |
| Self-Hostable | Yes | No | No | Yes |
| Fine-tuning | LoRA | No | No | Limited |

## Resources

### Official Links

- [ACE-Step GitHub](https://github.com/ace-step/ACE-Step) - Source code and documentation
- [Hugging Face Model](https://huggingface.co/ACE-Step/ACE-Step-v1-3.5B) - Model weights
- [Project Page](https://ace-step.github.io/) - Demos and examples
- [Research Paper](https://huggingface.co/papers/2506.00045) - Technical details

### Citation

```bibtex
@misc{gong2025acestep,
  title={ACE-Step: A Step Towards Music Generation Foundation Model},
  author={Junmin Gong and Wenxiao Zhao and Sen Wang and Shengyuan Xu and Jing Guo},
  howpublished={\url{https://github.com/ace-step/ACE-Step}},
  year={2025}
}
```

## Related

- [AI Architecture Deep-Dive](/music-creation/ai-architecture) - Technical architecture details
- [Backend Integration](/music-creation/backend-integration) - Infrastructure and API
- [Custom Models & LoRA](/music-creation/advanced/custom-models) - Fine-tuning guide
- [Prompts Guide](/music-creation/prompts-guide) - Master prompt engineering
- [API Integration](/music-creation/advanced/api-integration) - Developer API reference
