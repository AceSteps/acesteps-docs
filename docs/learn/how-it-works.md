---
sidebar_position: 2
title: How It Works
description: Understanding the AceSteps platform architecture
---

# How It Works

A deep dive into how AceSteps works under the hood.

## Platform Overview

```
┌─────────────────────────────────────────────────────────┐
│                     FARCASTER                           │
│  ┌─────────────────────────────────────────────────┐   │
│  │              AceSteps Mini App                   │   │
│  │                                                  │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │   │
│  │  │  Create  │  │  Library │  │   Portfolio  │  │   │
│  │  │  Music   │  │  (NFTs)  │  │   (Tokens)   │  │   │
│  │  └──────────┘  └──────────┘  └──────────────┘  │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                    BASE NETWORK                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐  │
│  │ SongNFT  │  │SongVault │  │SongToken │  │Revenue │  │
│  │ (ERC721) │  │          │  │ (ERC20)  │  │  Hook  │  │
│  └──────────┘  └──────────┘  └──────────┘  └────────┘  │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │                  UNISWAP V4                      │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## User Journey

### 1. Music Creation

1. User enters text prompt
2. Backend sends to ACE-Step AI
3. AI generates audio
4. Audio uploaded to IPFS
5. User previews result

### 2. NFT Minting

1. Backend creates signature
2. User calls `mint()` with signature
3. Contract verifies signature
4. NFT minted to user wallet

### 3. Publishing

1. User calls `publish()` on NFT
2. Song visible on platform
3. Listens tracked for revenue

### 4. Tokenization

1. User enables trading
2. NFT transferred to vault
3. 100,000 tokens minted
4. Uniswap pool created
5. Tokens distributed

### 5. Revenue

1. Listens generate ad revenue
2. Revenue collected as ETH
3. 80% donated to pool
4. Token price increases
5. All holders benefit

## Security Model

### Signature-Based Minting

Only AI-generated music can be minted:

```
Hash = keccak256(user + metadata + audioHash)
Signature = sign(Hash, platformKey)
Contract verifies via ECDSA.recover
```

### Permanent Locking

NFTs locked in vault cannot be recovered:

- Prevents rug pulls
- Ensures token backing
- AMM math makes 100% buyback impossible

## Related

- [Smart Contracts](/smart-contracts/overview)
- [FAQ](/learn/faq)
