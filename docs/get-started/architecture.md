---
sidebar_position: 4
title: Architecture
description: Technical architecture of the AceSteps platform
---

# Architecture

Understanding the technical architecture of AceSteps.

## System Overview

```
┌────────────────────────────────────────────────────────────┐
│                      FRONTEND                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   React     │  │   Wagmi     │  │  Farcaster SDK      │ │
│  │   + Vite    │  │   + Viem    │  │  Mini App Connector │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────────┐
│                      BACKEND                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │  API Server │  │  ACE-Step   │  │   IPFS Gateway      │ │
│  │             │  │  AI Model   │  │                     │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────────┐
│                   BASE NETWORK                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐ │
│  │ SongNFT  │  │SongVault │  │SongToken │  │RevenueHook │ │
│  └──────────┘  └──────────┘  └──────────┘  └────────────┘ │
│                                                            │
│  ┌────────────────────────────────────────────────────┐   │
│  │                   UNISWAP V4                        │   │
│  └────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────┘
```

## Frontend Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool |
| Wagmi | Wallet connections |
| Viem | Ethereum interactions |
| Farcaster SDK | Mini app integration |

## Backend Services

### API Server

- RESTful endpoints
- Signature generation
- User authentication

### ACE-Step AI

- Music generation model
- Prompt processing
- Audio encoding

### IPFS

- Metadata storage
- Audio file storage
- Decentralized hosting

## Smart Contract Layer

Four core contracts on Base:

1. **SongNFT** - ERC-721 song ownership
2. **SongVault** - NFT locking for trading
3. **SongToken** - ERC-20 fractional tokens
4. **RevenueHook** - Uniswap V4 revenue distribution

## Data Flow

### Music Creation Flow

```
User → Prompt → Backend → ACE-Step → Audio → IPFS → Metadata URI
```

### Minting Flow

```
User → Sign Message → Backend → Signature → Contract → NFT Minted
```

### Trading Flow

```
User → Enable Trading → Vault Lock → Token Mint → Pool Creation
```

## Related

- [Smart Contracts Overview](/smart-contracts/overview)
- [Installation](/get-started/installation)
