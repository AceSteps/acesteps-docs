---
sidebar_position: 3
title: Tokenomics
description: Understanding AceSteps token economics
---

# Tokenomics

Understanding the token economics of AceSteps.

## Song Token Economics

Each tokenized song has its own ERC-20 token.

### Supply

| Property | Value |
|----------|-------|
| Total Supply | 100,000 tokens |
| Decimals | 18 |
| Mintable | No (fixed supply) |
| Burnable | No |

### Initial Distribution

| Recipient | Tokens | Percentage |
|-----------|--------|------------|
| Creator | 80,000 | 80% |
| Uniswap Pool | 20,000 | 20% |

## Value Drivers

### 1. Ad Revenue

- Listens generate ad impressions
- Revenue converted to ETH
- 80% donated to Uniswap pool
- Token price increases

### 2. Trading Activity

- Buy pressure increases price
- Sell pressure decreases price
- Market determines fair value

### 3. Song Popularity

- More listens = more revenue
- More revenue = higher price
- Viral songs benefit holders

## Price Mechanics

### Initial State

```
Pool: 0 ETH + 20,000 tokens
Price: Undefined (no trades yet)
```

### First Trade

```
Buyer sends: 0.1 ETH
Receives: ~15,000 tokens
Pool: 0.1 ETH + 5,000 tokens
Initial price: ~0.00001 ETH/token
```

### Revenue Donation

```
Revenue: 0.05 ETH donated
Pool: 0.15 ETH + 5,000 tokens
New price: ~0.00003 ETH/token (+200%)
```

## Platform Economics

### Revenue Streams

| Source | Platform Share |
|--------|----------------|
| Ad Revenue | 20% |
| Swap Fees | 1% of volume |

### Sustainability

- No platform token
- Revenue-based model
- Aligned with user success

## Comparison

### vs Traditional Music

| Aspect | Traditional | AceSteps |
|--------|-------------|----------|
| Ownership | Label owns 80%+ | Creator owns 80% |
| Revenue | Delayed payments | Real-time on-chain |
| Liquidity | None | Instant via DEX |
| Fan upside | None | Token appreciation |

### vs Other Music NFTs

| Aspect | Other NFTs | AceSteps |
|--------|------------|----------|
| Ownership | All or nothing | Fractional |
| Trading | NFT marketplaces | DEX (higher liquidity) |
| Revenue | Manual distribution | Automatic via hook |

## Related

- [Song Tokens](/tokenization/song-tokens)
- [Revenue Sharing](/get-started/concepts/revenue-sharing)
