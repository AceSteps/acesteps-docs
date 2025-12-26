---
sidebar_position: 2
title: Batch Generation
description: Generate multiple songs at once
---

# Batch Generation

:::info Coming Soon
Batch generation is planned for a future release.
:::

## Overview

Batch generation will allow creating multiple songs from a single request.

## Planned Features

### Batch Options

- Generate variations of a prompt
- Multiple prompts in one request
- Automated prompt expansion

### Use Cases

- A/B testing different prompts
- Creating album collections
- Exploring variations

## API Preview

```typescript
// Future API
const response = await fetch('/api/generate/batch', {
  method: 'POST',
  body: JSON.stringify({
    prompts: [
      'chill lofi beat',
      'upbeat electronic',
      'dark trap instrumental'
    ],
    variations: 3
  })
});
```

## Current Approach

For now, generate songs one at a time:

1. Create with prompt
2. Regenerate if needed
3. Save when satisfied

## Related

- [API Integration](/music-creation/advanced/api-integration)
- [Custom Models](/music-creation/advanced/custom-models)
