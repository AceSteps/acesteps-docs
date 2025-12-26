---
sidebar_position: 1
title: Overview
description: AceSteps API reference
---

# API Reference Overview

AceSteps provides both backend APIs and smart contract interfaces for building on the platform.

## API Types

```
┌─────────────────────────────────────────────────────────────┐
│                    ACESTEPS APIs                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   REST API                      Smart Contracts             │
│   ─────────                     ───────────────             │
│   • Music Generation            • SongNFT (ERC-721)         │
│   • NFT Metadata                • SongVault                 │
│   • User Profiles               • SongToken (ERC-20)        │
│   • Trading Data                • RevenueHook               │
│                                                              │
│   Base URL:                     Network:                     │
│   api.acesteps.xyz/v1           Base (chainId: 8453)        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Backend API

RESTful API for off-chain operations:

| Category | Endpoints | Description |
|----------|-----------|-------------|
| Music Generation | `POST /music/generate` | Generate AI music from prompts |
| NFT | `POST /nft/mint`, `GET /nft/{id}` | NFT minting and metadata |
| Trading | `GET /trading/pools` | Pool data and analytics |
| User | `GET /user/profile` | User profiles and stats |

**Base URL**: `https://api.acesteps.xyz/v1`

**OpenAPI Spec**: [Download OpenAPI YAML](/openapi.yaml)

## Smart Contract ABIs

On-chain interfaces deployed on Base Network:

| Contract | Standard | Address |
|----------|----------|---------|
| SongNFT | ERC-721 | `0x...` (TBD) |
| SongVault | Custom | `0x...` (TBD) |
| SongToken | ERC-20 | Per-song deployment |
| RevenueHook | Uniswap V4 | `0x...` (TBD) |

**Network**: Base Mainnet (chainId: 8453)

## Authentication

### Backend API

```
Authorization: Bearer <farcaster_jwt>
```

Authentication flow:
1. User authenticates with Farcaster
2. Backend issues JWT token
3. Include token in Authorization header

### Smart Contracts

Wallet-based authentication:
- Connect wallet (e.g., via WalletConnect)
- Sign transactions with private key
- Platform signature required for minting

## Rate Limits

| Endpoint Category | Limit | Window |
|-------------------|-------|--------|
| Music Generation | 10 requests | Per hour |
| Metadata/NFT | 100 requests | Per hour |
| Trading Data | 500 requests | Per hour |
| General | 1000 requests | Per hour |

:::info Rate Limit Headers
Response headers include:
- `X-RateLimit-Limit`: Max requests allowed
- `X-RateLimit-Remaining`: Requests remaining
- `X-RateLimit-Reset`: Unix timestamp when limit resets
:::

## Error Handling

All API errors follow a consistent format:

```json
{
  "error": "ERROR_CODE",
  "message": "Human-readable description",
  "details": {}
}
```

| Status Code | Description |
|-------------|-------------|
| 400 | Bad Request - Invalid parameters |
| 401 | Unauthorized - Invalid or missing auth |
| 404 | Not Found - Resource doesn't exist |
| 429 | Too Many Requests - Rate limited |
| 500 | Server Error - Internal error |

## SDKs & Libraries

Coming soon:
- JavaScript/TypeScript SDK
- React hooks library
- Python SDK

## Related

- [Backend API](/api-reference/backend-api) - Detailed endpoint documentation
- [Contract ABI](/api-reference/contract-abi) - Smart contract interfaces
- [Authentication](/api-reference/authentication) - Auth guide
