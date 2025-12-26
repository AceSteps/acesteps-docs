---
sidebar_position: 2
title: Song Tokens
description: Understanding ERC-20 song tokens for fractional ownership
---

# Song Tokens

When trading is enabled, songs become fractionally ownable via ERC-20 tokens.

## What are Song Tokens?

Song tokens are ERC-20 tokens that represent fractional ownership of a song:

- **100,000 tokens** per song (fixed supply)
- **Tradeable** on Uniswap V4
- **Value backed** by locked NFT and revenue

## Token Distribution

| Recipient | Amount | Percentage |
|-----------|--------|------------|
| Creator | 80,000 | 80% |
| Uniswap Pool | 20,000 | 20% |
| **Total** | **100,000** | **100%** |

## How It Works

### 1. Enable Trading

Creator chooses to tokenize their song.

### 2. NFT Locked

The NFT is permanently transferred to the SongVault contract.

### 3. Tokens Minted

100,000 ERC-20 tokens are created.

### 4. Distribution

- 80,000 tokens → Creator wallet
- 20,000 tokens → Uniswap V4 liquidity pool

### 5. Trading Begins

Anyone can buy/sell tokens on Uniswap.

## Token Value

Token value is determined by:

- **Initial price** - Set by first buyer
- **Trading activity** - Supply and demand
- **Revenue** - Ad revenue adds ETH to pool

## Benefits

### For Creators

- Retain 80% ownership
- Immediate liquidity
- Revenue from trading fees

### For Fans

- Invest in music you love
- Share in success
- Liquid marketplace

## Related

- [Song Tokens Deep Dive](/tokenization/song-tokens)
- [Revenue Sharing](/get-started/concepts/revenue-sharing)
