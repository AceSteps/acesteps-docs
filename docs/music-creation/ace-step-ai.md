---
sidebar_position: 2
title: ACE-Step AI
description: Understanding the ACE-Step AI music generation model
---

# ACE-Step AI

ACE-Step is the AI model powering music generation in AceSteps.

## Overview

ACE-Step is an open-source AI music generation model that creates professional-quality audio from text descriptions.

### Key Specifications

| Specification | Value |
|---------------|-------|
| Model Size | 3.5B parameters |
| License | Apache 2.0 (full commercial use) |
| Generation Speed | ~4.5 seconds for 30 seconds |
| Max Duration | 240 seconds |
| Output Quality | Professional-grade audio |

## Why ACE-Step?

### Open Source

- **Apache 2.0 License** - Full commercial use rights
- **Self-Hostable** - No vendor lock-in
- **Transparent** - Model weights are publicly available

### Quality

- Professional output quality
- Multiple genre support
- Natural instrument sounds
- Coherent song structure

### Speed

- ~4.5 seconds for 30 seconds of music
- Serverless GPU inference via Modal
- Scalable for high demand

## How It Works

### Generation Pipeline

```
User Prompt → Text Processing → ACE-Step Model → Audio Generation → Output
     ↓               ↓                ↓                ↓            ↓
"chill lofi"   Tokenization    Neural Network    Waveform       MP3/WAV
                              on A10G GPU        Synthesis
```

### Backend Architecture

```python
# Simplified generation flow
async def generate_music(prompt: str, duration: int):
    # 1. Queue job in database
    job = await create_job(prompt, duration)

    # 2. Trigger GPU inference on Modal
    audio = await modal_generate(prompt, duration)

    # 3. Upload to storage
    audio_url = await upload_to_storage(audio)

    return audio_url
```

## Capabilities

### Text-to-Music

Generate complete songs from natural language:

```
Input: "upbeat electronic dance music with synth leads"
Output: 30-second EDM track with synthesizers
```

### Style Control

Specify genre, mood, and instrumentation:

- **Genre**: Lo-fi, EDM, Hip-hop, Rock, Classical, Ambient
- **Mood**: Happy, Sad, Energetic, Calm, Dark, Uplifting
- **Instruments**: Piano, Guitar, Drums, Synth, Strings

### Lyrics Support (Optional)

Generate songs with AI-generated lyrics:

```
Input: "love song with vocals about summer nights"
Output: Song with AI-generated lyrics and melody
```

## Integration

### API Endpoint

```typescript
const response = await fetch('/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: 'chill lofi beat with rain sounds',
    duration: 30
  })
});

const { audioUrl, audioHash } = await response.json();
```

### Response Format

```json
{
  "id": "gen_abc123",
  "status": "completed",
  "audioUrl": "https://storage.acesteps.xyz/audio/gen_abc123.mp3",
  "audioHash": "0x1234...abcd",
  "duration": 30,
  "prompt": "chill lofi beat with rain sounds"
}
```

## Technical Details

### Model Architecture

ACE-Step uses a transformer-based architecture:

- Multi-modal text-to-audio generation
- Attention mechanisms for temporal coherence
- Diffusion-based audio synthesis

### GPU Requirements

| GPU | Generation Time (30s) |
|-----|----------------------|
| A10G | ~4.5 seconds |
| A100 | ~3 seconds |
| H100 | ~2 seconds |

### Output Format

| Property | Value |
|----------|-------|
| Format | MP3 (default), WAV |
| Bitrate | 320kbps |
| Sample Rate | 44.1kHz |
| Channels | Stereo |

## Limitations

### Current Constraints

- Generation time varies by prompt complexity
- Some niche genres may produce inconsistent results
- No direct artist/song imitation (by design)
- Maximum duration of 240 seconds

### Not Supported

- Copying existing songs
- Voice cloning
- Specific artist styles
- Copyrighted material reproduction

## References

- [ACE-Step on HuggingFace](https://huggingface.co/spaces/ACE-Step/ACE-Step)
- [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0)

## Related

- [Prompts Guide](/music-creation/prompts-guide)
- [API Integration](/music-creation/advanced/api-integration)
