---
sidebar_position: 2
title: Backend API
description: REST API reference for AceSteps backend
---

# Backend API

REST API for AceSteps backend services.

## Base URL

```
https://api.acesteps.xyz
```

## Authentication

Include Farcaster session in headers:

```bash
Authorization: Bearer <farcaster_token>
```

## Endpoints

### Generate Music

**POST** `/api/generate`

Generate AI music from prompt.

```bash
curl -X POST https://api.acesteps.xyz/api/generate \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "chill lofi beat", "duration": 30}'
```

**Response**:

```json
{
  "audioUrl": "https://...",
  "audioHash": "0x...",
  "duration": 30
}
```

### Get Mint Signature

**POST** `/api/signature`

Get platform signature for minting.

```bash
curl -X POST https://api.acesteps.xyz/api/signature \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"metadataURI": "ipfs://...", "audioHash": "0x..."}'
```

**Response**:

```json
{
  "signature": "0x...",
  "expiresAt": 1234567890
}
```

### Upload Metadata

**POST** `/api/metadata`

Upload song metadata to IPFS.

```bash
curl -X POST https://api.acesteps.xyz/api/metadata \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name": "My Song", "description": "...", "audioUrl": "..."}'
```

**Response**:

```json
{
  "metadataURI": "ipfs://...",
  "ipfsHash": "Qm..."
}
```

## Error Codes

| Code | Description |
|------|-------------|
| 400 | Bad request |
| 401 | Unauthorized |
| 429 | Rate limited |
| 500 | Server error |

## Related

- [Contract ABI](/api-reference/contract-abi)
