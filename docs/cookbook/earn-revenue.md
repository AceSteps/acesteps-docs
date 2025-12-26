---
sidebar_position: 3
title: Earn Revenue
description: Understanding revenue earning on AceSteps
---

# Earn Revenue

Learn how to earn from your music on AceSteps.

## Revenue Sources

### Ad Revenue

Songs earn from platform advertising:

- Listens generate ad impressions
- Impressions convert to ETH
- Revenue distributed to owners

### Trading Fees

If your song is tokenized:

- 1% swap fee on each trade
- Fee goes to LP (platform)

## Revenue Distribution

### Non-Tokenized Songs

If you hold the NFT directly:

| Recipient | Share |
|-----------|-------|
| NFT Owner | 80% |
| Platform | 20% |

Revenue paid off-chain (ETH/USDC).

### Tokenized Songs

If your song is tokenized:

| Recipient | Share |
|-----------|-------|
| Token Pool | 80% |
| Platform | 20% |

Revenue added to pool via `donate()`.

## How Pool Revenue Works

When ad revenue is distributed:

1. Platform collects ETH
2. 80% sent to Uniswap pool
3. ETH added via `donate()`
4. Pool reserves increase
5. Token price increases
6. All holders benefit

### Example

```
Before: Pool has 1 ETH + 20,000 tokens
Revenue: 0.1 ETH donated
After: Pool has 1.1 ETH + 20,000 tokens
Result: Each token worth ~10% more
```

## Maximizing Revenue

### As a Creator

- Create engaging music
- Promote your songs
- Keep tokens for long-term gains
- Build a catalog

### As an Investor

- Find songs with growth potential
- Buy early at lower prices
- Hold through revenue distributions
- Diversify across songs

## Tracking Revenue

View your earnings:

1. Go to **Portfolio**
2. See token value changes
3. Track historical revenue

## Related

- [Mint and Trade](/cookbook/mint-and-trade)
- [Revenue Hook](/smart-contracts/revenue-hook)
