---
sidebar_position: 1
title: Overview
description: AceSteps API reference
---

# API Reference Overview

AceSteps provides both backend APIs and smart contract interfaces.

## APIs

### Backend API

RESTful API for:

- Music generation
- Metadata management
- Signature generation
- User data

**Base URL**: `https://api.acesteps.xyz`

### Smart Contract ABIs

On-chain interfaces for:

- SongNFT (ERC-721)
- SongVault
- SongToken (ERC-20)
- SongRevenueHook

**Network**: Base (chainId: 8453)

## Authentication

Backend API uses:

- Farcaster authentication
- Wallet signature verification

## Rate Limits

| Endpoint | Limit |
|----------|-------|
| /generate | 10/hour |
| /metadata | 100/hour |
| General | 1000/hour |

## Related

- [Backend API](/api-reference/backend-api)
- [Contract ABI](/api-reference/contract-abi)
