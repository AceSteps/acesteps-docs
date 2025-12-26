---
sidebar_position: 1
title: Overview
description: Understanding NFT and token systems in AceSteps
---

# Tokenization Overview

AceSteps uses a dual-token system for song ownership and trading.

## Token Types

### ERC-721 (Song NFT)

Every song minted on AceSteps is an ERC-721 NFT representing:

- Original ownership
- Metadata and audio hash
- Publishing status
- Revenue rights

### ERC-20 (Song Token)

When trading is enabled, an ERC-20 token is created with a fixed supply of **100,000 tokens** per song.

#### Per-Song Token Distribution

| Recipient | Amount | Percentage |
|-----------|--------|------------|
| Creator | 80,000 tokens | 80% |
| Uniswap V4 Pool | 20,000 tokens | 20% |

## The Tokenization Flow

```
NFT → Permanently locked in SongVault
      ↓
100,000 tokens minted
      ↓
80,000 tokens → Your wallet
20,000 tokens → Uniswap V4 pool
      ↓
Trading begins!
```

:::warning Permanent Decision
Once you tokenize your song, the NFT is **permanently locked** in the SongVault. This action cannot be reversed. Make sure you understand the implications before enabling trading.
:::

## Initial Pool State

When trading is enabled, the Uniswap V4 pool is initialized with:

- **Token**: 20,000 SONG_TOKEN
- **ETH**: 0 (single-sided liquidity)
- **Starting Price**: Near zero (organic price discovery)

This single-sided liquidity approach allows the market to organically discover the song's value based on demand.

## Why No Unlock Mechanism?

The NFT cannot be unlocked once tokenized due to the **mathematical impossibility** created by Automated Market Makers (AMMs).

### The AMM Math (x * y = k)

In Uniswap's constant product formula:
- As tokens are bought, the price increases exponentially
- Acquiring the remaining tokens becomes progressively more expensive
- To buy back 100% of tokens would require **INFINITE ETH**

### This Creates Sustainable Value

| Benefit | Description |
|---------|-------------|
| Permanent Liquidity | Pool always has tokens available for trading |
| Continuous Trading | Fans can always buy or sell shares |
| Long-term Value Appreciation | Ad revenue continuously adds ETH to the pool |

The locked NFT ensures that trading remains active forever, and token holders benefit from ongoing ad revenue being donated to the pool.

## Ownership States

| State | NFT Location | Tokens | Tradeable |
|-------|-------------|--------|-----------|
| Minted | User wallet | None | No |
| Published | User wallet | None | No |
| Tokenized | Locked in Vault | Active | Yes |

## Revenue Flow

- **Non-tokenized**: 80% to NFT owner, 20% to platform
- **Tokenized**: 80% to pool (all holders), 20% to platform

## Next Steps

- [Minting NFTs](/tokenization/minting-nfts)
- [Song Tokens](/tokenization/song-tokens)
