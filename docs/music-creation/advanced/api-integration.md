---
sidebar_position: 3
title: API Integration
description: Integrate AceSteps music generation into your apps
---

# API Integration

Integrate AceSteps music generation into your own applications.

## Authentication

All API requests require authentication:

```bash
Authorization: Bearer <your_api_key>
```

## Generate Music

**POST** `/api/generate`

```bash
curl -X POST https://api.acesteps.xyz/api/generate \
  -H "Authorization: Bearer <api_key>" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "chill lofi beat with rain sounds",
    "duration": 30
  }'
```

### Response

```json
{
  "id": "gen_123abc",
  "status": "completed",
  "audioUrl": "https://cdn.acesteps.xyz/audio/gen_123abc.mp3",
  "audioHash": "0x...",
  "duration": 30,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

## Check Status

**GET** `/api/generate/{id}`

```bash
curl https://api.acesteps.xyz/api/generate/gen_123abc \
  -H "Authorization: Bearer <api_key>"
```

## Rate Limits

| Tier | Requests/Hour |
|------|---------------|
| Free | 10 |
| Pro | 100 |
| Enterprise | Unlimited |

## SDK (Coming Soon)

```typescript
import { AceSteps } from '@acesteps/sdk';

const client = new AceSteps({ apiKey: 'your_key' });

const song = await client.generate({
  prompt: 'upbeat electronic track',
  duration: 30
});

console.log(song.audioUrl);
```

## Webhooks

Configure webhooks for async notifications:

```json
{
  "event": "generation.completed",
  "data": {
    "id": "gen_123abc",
    "audioUrl": "..."
  }
}
```

## Related

- [Backend API](/api-reference/backend-api)
- [Batch Generation](/music-creation/advanced/batch-generation)
