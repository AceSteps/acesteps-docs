---
sidebar_position: 3
title: Song Tokens
description: ERC-20 fractional ownership tokens for songs
---

# Song Tokens

When trading is enabled, songs become fractionally ownable via ERC-20 tokens.

## Token Economics

| Allocation | Amount | Percentage |
|------------|--------|------------|
| Creator | 80,000 | 80% |
| Uniswap Pool | 20,000 | 20% |
| **Total** | **100,000** | **100%** |

## How It Works

### 1. Enable Trading

Creator clicks "Enable Trading" on their song.

### 2. NFT Locked

The NFT is permanently transferred to `SongVault`.

### 3. Tokens Minted

`SongToken` contract mints 100,000 tokens:

- 80,000 sent to creator
- 20,000 sent to Uniswap V4 pool

### 4. Trading Begins

Anyone can now buy/sell song tokens on Uniswap.

## Price Discovery

Initial pool is single-sided (0 ETH + 20,000 tokens).

- First buyer sets initial price
- Price increases as ETH enters pool
- Ad revenue adds ETH via `donate()`

## Benefits

- Creators retain 80% ownership
- Fans can invest in songs they believe in
- Ad revenue benefits all token holders

## Related

- [Uniswap V4](/trading/uniswap-v4)
- [SongToken Contract](/smart-contracts/song-token)
