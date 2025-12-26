---
sidebar_position: 3
title: Revenue Sharing
description: How revenue is distributed on AceSteps
---

# Revenue Sharing

AceSteps distributes ad revenue to song owners and token holders.

## Revenue Sources

### Ad Revenue

- Songs generate listens
- Listens earn ad impressions
- Impressions convert to ETH

### Trading Fees

- 1% fee on Uniswap swaps
- Collected by platform LP position

## Distribution Model

### Non-Tokenized Songs

When you hold the NFT directly:

| Recipient | Share |
|-----------|-------|
| NFT Owner | 80% |
| Platform | 20% |

Revenue paid periodically in ETH/USDC.

### Tokenized Songs

When trading is enabled:

| Recipient | Share |
|-----------|-------|
| Token Pool | 80% |
| Platform | 20% |

Revenue added to Uniswap pool via `donate()`.

## How Pool Revenue Works

```
1. Platform collects ad revenue (ETH)
2. 80% sent to song's Uniswap pool
3. donate() adds ETH to reserves
4. Token price increases
5. All holders benefit proportionally
```

### Example

```
Before donation:
  Pool: 1 ETH + 20,000 tokens
  Token price: 0.00005 ETH

Revenue: 0.1 ETH donated (80% of 0.125 ETH)

After donation:
  Pool: 1.1 ETH + 20,000 tokens
  Token price: 0.000055 ETH (+10%)
```

## Why This Model?

### Aligned Incentives

- Creators benefit from popularity
- Fans benefit from supporting good music
- Platform earns sustainable revenue

### No Dilution

- Fixed 100,000 token supply
- Revenue adds value, not tokens
- All holders benefit equally

## Related

- [Revenue Distribution](/trading/revenue-distribution)
- [Song Tokens](/get-started/concepts/song-tokens)
