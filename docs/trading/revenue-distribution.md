---
sidebar_position: 5
title: Revenue Distribution
description: How ad revenue is distributed to token holders
---

# Revenue Distribution

How ad revenue flows to song token holders and NFT owners on Music-Fi.

## Revenue Streams

Music-Fi has two distinct revenue models depending on whether a song has trading enabled.

### Non-Tokenized Songs (Creator Holds NFT)

When the creator keeps their NFT without enabling trading:

| Source | Creator | Platform |
|--------|---------|----------|
| Ad Revenue | 80% | 20% |

- Creator receives 80% of ad revenue directly
- Payment in ETH or USDC (off-chain)
- Full ownership retained
- No token price appreciation mechanism

### Tokenized Songs (Trading Enabled)

When the creator enables trading and locks their NFT:

| Source | Distribution | Platform |
|--------|--------------|----------|
| Ad Revenue | 80% to Pool | 20% |
| Swap Fees | LP Holders | 1% per swap |

- Ad revenue flows into the Uniswap V4 pool via `donate()`
- All token holders benefit from price appreciation
- Platform earns from both ad revenue and swap fees

:::tip Creator Advantage
Creators receive 80,000 tokens (80% of supply) when enabling trading. As ad revenue increases the pool value, creators benefit from the largest share of appreciation.
:::

## Revenue Flow Visualization

```
                    ┌────────────────────┐
                    │   Ad Revenue       │
                    │   from Streaming   │
                    └─────────┬──────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               ▼               ▼
         80% Share       20% Share       1% Swap Fee
              │               │               │
              ▼               ▼               ▼
    ┌─────────────────┐ ┌─────────────┐ ┌─────────────┐
    │ Uniswap Pool    │ │  Platform   │ │   Platform  │
    │ (Token Holders) │ │  Treasury   │ │   Revenue   │
    └─────────────────┘ └─────────────┘ └─────────────┘
              │
              ▼
    Token Price Increases
    (All holders benefit)
```

## Distribution Mechanics

### Tokenized Songs

1. Platform collects ad revenue from streaming
2. 80% sent to song's Uniswap pool
3. `donate()` adds ETH to reserves
4. Token price increases automatically
5. All token holders benefit proportionally

### Non-Tokenized Songs

1. Platform collects ad revenue from streaming
2. 80% paid directly to NFT owner
3. Payment in ETH or USDC
4. Weekly or monthly settlement

## How donate() Works

Uniswap V4 introduces a revolutionary feature called `donate()` that allows adding value directly to a liquidity pool without executing a swap.

### The donate() Function

```solidity
function donate(
    PoolKey calldata key,
    uint256 amount0,
    uint256 amount1,
    bytes calldata hookData
) external returns (BalanceDelta);
```

### Technical Explanation

The `donate()` function works by:

1. **Direct Reserve Addition** - ETH is added directly to the pool's reserves without changing the token supply in the pool
2. **No Slippage Impact** - Unlike swaps, donations don't move the price curve during execution
3. **Immediate Value Increase** - The added ETH increases the value backing each token instantly
4. **Hook Integration** - Our `SongRevenueHook` contract calls `donate()` to distribute ad revenue

:::info Why donate() is Revolutionary
Traditional DEXs require swapping to add value, which creates slippage and benefits arbitrageurs. With `donate()`, 100% of the ad revenue goes directly to increasing token value for holders.
:::

### Hook Implementation

The `SongRevenueHook` contract handles revenue distribution:

```solidity
function distributeRevenue(
    PoolKey calldata key,
    uint256 ethAmount
) external onlyPlatform {
    // Add ETH to pool reserves via donate()
    poolManager.donate(key, ethAmount, 0, "");

    emit RevenueDistributed(key.toId(), ethAmount);
}
```

## Value Appreciation Example

Here's a concrete example showing how token holders benefit from ad revenue:

### Before Revenue Distribution

```
Song: "Midnight Vibes"
Pool State:
  - ETH in pool: 2.0 ETH
  - Tokens in pool: 20,000 tokens
  - Token price: 0.0001 ETH per token

Your Holdings:
  - 1,000 tokens
  - Value: 0.1 ETH
```

### Monthly Revenue Generated

```
Monthly listens: 100,000
Ad revenue earned: 0.5 ETH

Distribution:
  - Pool donation: 0.4 ETH (80%)
  - Platform fee: 0.1 ETH (20%)
```

### After Revenue Distribution

```
Pool State:
  - ETH in pool: 2.4 ETH (+0.4 ETH)
  - Tokens in pool: 20,000 tokens (unchanged)
  - Token price: 0.00012 ETH per token

Your Holdings:
  - 1,000 tokens (unchanged)
  - Value: 0.12 ETH (+20%)
```

:::tip Compounding Growth
As songs accumulate more listens over time, revenue compounds. A consistently popular song can see significant token appreciation month over month.
:::

### Long-Term Projection

| Month | Pool ETH | Token Price | Your 1,000 Tokens Value |
|-------|----------|-------------|-------------------------|
| 0 | 2.0 ETH | 0.0001 ETH | 0.10 ETH |
| 1 | 2.4 ETH | 0.00012 ETH | 0.12 ETH |
| 3 | 3.2 ETH | 0.00016 ETH | 0.16 ETH |
| 6 | 4.4 ETH | 0.00022 ETH | 0.22 ETH |
| 12 | 6.8 ETH | 0.00034 ETH | 0.34 ETH |

*Assumes consistent 0.4 ETH monthly revenue*

## Distribution Frequency

Revenue is distributed based on song popularity:

| Category | Threshold | Distribution |
|----------|-----------|--------------|
| High-Volume | >500k monthly listens | Weekly |
| Standard | 10k-500k monthly listens | Monthly |
| Low-Volume | Under 10k monthly listens | Quarterly |

:::note On-Demand Distribution
Platform administrators can trigger distribution at any time for special circumstances or accumulated smaller amounts.
:::

## Related

- [Claiming Earnings](/trading/claiming-earnings)
- [Revenue Hook](/smart-contracts/revenue-hook)
- [Swap Fees](/trading/swap-fees)
