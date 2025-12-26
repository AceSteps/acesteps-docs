---
sidebar_position: 1
title: Overview
description: Smart contract architecture for AceSteps
---

# Smart Contracts Overview

AceSteps is powered by four core smart contracts on Base Network.

## Contract Architecture

```
┌─────────────────┐     ┌─────────────────┐
│    SongNFT      │────▶│   SongVault     │
│   (ERC-721)     │     │  (NFT Locking)  │
└─────────────────┘     └────────┬────────┘
                                 │
                                 ▼
┌─────────────────┐     ┌─────────────────┐
│  SongToken      │◀────│  RevenueHook    │
│   (ERC-20)      │     │  (Uniswap V4)   │
└─────────────────┘     └─────────────────┘
```

## Contracts

| Contract | Standard | Purpose |
|----------|----------|---------|
| [SongNFT](/smart-contracts/song-nft) | ERC-721 | Song ownership |
| [SongVault](/smart-contracts/song-vault) | - | NFT locking & token mint |
| [SongToken](/smart-contracts/song-token) | ERC-20 | Fractional ownership |
| [RevenueHook](/smart-contracts/revenue-hook) | Uniswap V4 | Ad revenue distribution |

## Network

- **Chain**: Base (chainId: 8453)
- **DEX**: Uniswap V4

## Security

- Signature-based minting (prevents unauthorized NFTs)
- Permanent vault locking (no rug pulls)
- OpenZeppelin contracts base

## Deployment

See individual contract pages for deployment addresses and ABIs.
