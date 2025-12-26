---
sidebar_position: 2
title: ACE-Step AI
description: Understanding the ACE-Step AI music generation model
---

# ACE-Step AI

ACE-Step is the AI model powering music generation in AceSteps.

## Model Architecture

ACE-Step uses advanced neural network architectures to generate music from text descriptions.

## Capabilities

- **Text-to-Music**: Generate music from natural language prompts
- **Style Control**: Specify genre, mood, and instrumentation
- **Quality Output**: High-fidelity audio generation

## Integration

The model is accessed through our backend API:

```typescript
const response = await fetch('/api/generate', {
  method: 'POST',
  body: JSON.stringify({
    prompt: 'upbeat electronic dance music',
    duration: 30
  })
});
```

## Limitations

- Generation time varies by complexity
- Some styles may produce better results than others
- Specific artist/song imitation is not supported

## Related

- [Prompts Guide](/music-creation/prompts-guide)
- [Backend API](/api-reference/backend-api)
