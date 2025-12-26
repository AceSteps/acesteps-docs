---
sidebar_position: 5
title: Revenue Distribution
description: How ad revenue is distributed to token holders
---

# Revenue Distribution

How ad revenue flows to song token holders.

## Revenue Flow

```
Listens → Ad Impressions → ETH Revenue
                              │
                              ▼
                    ┌─────────────────┐
                    │   Platform      │
                    │   Collects      │
                    └─────────────────┘
                              │
              ┌───────────────┴───────────────┐
              │                               │
              ▼                               ▼
     ┌─────────────────┐            ┌─────────────────┐
     │   Pool (80%)    │            │  Platform (20%) │
     │   via donate()  │            │                 │
     └─────────────────┘            └─────────────────┘
              │
              ▼
     Token price increases
     All holders benefit
```

## Distribution Mechanics

### Tokenized Songs

1. Platform collects ad revenue
2. 80% sent to song's Uniswap pool
3. `donate()` adds ETH to reserves
4. Token price increases
5. All token holders benefit

### Non-Tokenized Songs

1. Platform collects ad revenue
2. 80% paid directly to NFT owner
3. Payment in ETH or USDC

## The donate() Function

Uniswap V4 introduces `donate()`:

```solidity
function donate(
    PoolKey calldata key,
    uint256 amount0,
    uint256 amount1,
    bytes calldata hookData
) external returns (BalanceDelta);
```

This adds value without:

- Creating swap slippage
- Changing token supply
- Requiring trades

## Example Distribution

```
Song "Midnight Vibes"
Monthly listens: 100,000
Ad revenue: 0.5 ETH

Distribution:
- Pool donation: 0.4 ETH (80%)
- Platform: 0.1 ETH (20%)

Pool before: 2 ETH + 20,000 tokens
Pool after: 2.4 ETH + 20,000 tokens

Price increase: +20%
```

## Frequency

Revenue is distributed:

- **Weekly** for high-volume songs
- **Monthly** for standard songs
- **On-demand** via admin function

## Related

- [Claiming Earnings](/trading/claiming-earnings)
- [Revenue Hook](/smart-contracts/revenue-hook)
