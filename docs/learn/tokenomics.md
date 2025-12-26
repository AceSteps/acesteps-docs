---
sidebar_position: 3
title: Tokenomics
description: Understanding AceSteps token economics
---

# Tokenomics

A deep dive into AceSteps token economics.

## Overview

AceSteps uses a **per-song tokenization model** - each song can have its own ERC-20 token for fractional ownership.

:::info No Platform Token
AceSteps does not have a platform-wide token. Each song has its own independent token economy.
:::

## Per-Song Token Distribution

When a creator enables trading:

| Recipient | Tokens | Percentage | Purpose |
|-----------|--------|------------|---------|
| Creator | 80,000 | 80% | Retain majority ownership |
| Uniswap V4 Pool | 20,000 | 20% | Enable trading liquidity |
| **Total** | **100,000** | **100%** | Fixed, immutable supply |

### Token Properties

| Property | Value |
|----------|-------|
| Standard | ERC-20 |
| Supply | 100,000 (fixed) |
| Decimals | 18 |
| Mintable | No |
| Burnable | No |

## Initial Pool State

When trading is enabled, the Uniswap V4 pool starts with:

```
┌─────────────────────────────────────┐
│         INITIAL POOL STATE          │
├─────────────────────────────────────┤
│                                     │
│   ETH:     0                        │
│   Tokens:  20,000                   │
│                                     │
│   Price:   Undefined                │
│            (waiting for first buy)  │
│                                     │
└─────────────────────────────────────┘
```

This is **single-sided liquidity** - the pool starts with tokens only.

## Price Discovery

### First Trade Sets the Price

The first buyer determines the initial market price:

```
First Buyer: Sends 0.1 ETH
Receives: ~15,000 tokens (depends on AMM curve)

Pool After:
  ETH: 0.1
  Tokens: 5,000
  Implied Price: ~0.00002 ETH/token
```

### AMM Price Dynamics

Using Uniswap's constant product formula (x × y = k):

```
Buy Pressure  → ETH increases, Tokens decrease → Price UP
Sell Pressure → Tokens increase, ETH decreases → Price DOWN
Revenue Added → ETH increases, Tokens same → Price UP
```

## Why 80/20 Split?

### Creator Benefits (80%)

- **Majority Ownership** - Retain controlling stake
- **Flexibility** - Sell some, hold some
- **Aligned Incentives** - Success benefits creator most

### Pool Benefits (20%)

- **Immediate Liquidity** - Trading starts instantly
- **Price Discovery** - Market determines value
- **No ETH Required** - Single-sided initialization

## Why No Unlock Mechanism?

### Mathematical Impossibility

Due to AMM (x × y = k) mechanics:

```
To buy back 99% of tokens:
  Cost: Extremely high (exponential)

To buy back 100% of tokens:
  Cost: INFINITE ETH
```

### This Creates:

| Benefit | Description |
|---------|-------------|
| **Permanent Liquidity** | Trading always available |
| **No Rug Pulls** | Creator can't withdraw NFT |
| **Long-term Value** | Continuous appreciation potential |

## Revenue Distribution Model

### Non-Tokenized Songs

Creator holds NFT directly:

| Recipient | Share | Method |
|-----------|-------|--------|
| NFT Owner | 80% | Off-chain payment |
| Platform | 20% | Off-chain |

### Tokenized Songs

NFT locked, tokens exist:

| Recipient | Share | Method |
|-----------|-------|--------|
| Token Pool | 80% | On-chain `donate()` |
| Platform | 20% | Off-chain |

## Value Appreciation Mechanism

### How donate() Works

```solidity
// Revenue Hook adds ETH to pool
poolManager.donate(poolKey, ethAmount, 0, "");
```

This:

1. Adds ETH to pool reserves
2. Does NOT add tokens
3. Result: Token price increases
4. All holders benefit proportionally

### Example Calculation

```
Before Revenue:
  Pool: 2 ETH + 20,000 tokens
  Price: 0.0001 ETH/token
  Total Value: 2 ETH

Monthly Revenue: 0.5 ETH
Platform Share: 0.1 ETH (20%)
Pool Share: 0.4 ETH (80%)

After donate():
  Pool: 2.4 ETH + 20,000 tokens
  Price: 0.00012 ETH/token (+20%)
  Total Value: 2.4 ETH
```

## Platform Economics

### Revenue Sources

| Source | Amount |
|--------|--------|
| Ad Revenue | 20% of all streaming revenue |
| Swap Fees | 1% per trade (platform owns LP) |
| Future | Premium features, subscriptions |

### Sustainability

- No token emissions
- Revenue-based model
- Aligned with user success

## Token Holder Benefits

### For Creators

1. **Immediate Liquidity** - Convert to ETH anytime
2. **Revenue Share** - Benefit from song's success
3. **Majority Control** - 80% ownership
4. **Flexibility** - Hold or sell at will

### For Investors

1. **Early Access** - Buy at low prices
2. **Upside Potential** - Price appreciates with popularity
3. **Liquid Market** - Trade 24/7 on Uniswap
4. **Transparent** - All activity on-chain

## Comparison with Traditional Music

| Aspect | Traditional | AceSteps |
|--------|-------------|----------|
| Creator Share | 10-20% | 80% |
| Fan Investment | Not possible | Direct token ownership |
| Revenue Timing | Months/years | Real-time |
| Transparency | Opaque | On-chain |
| Liquidity | None | Instant |

## Key Metrics

| Metric | Value |
|--------|-------|
| Tokens per Song | 100,000 |
| Creator Allocation | 80,000 (80%) |
| Pool Allocation | 20,000 (20%) |
| Swap Fee | 1% |
| Ad Revenue to Pool | 80% |
| Ad Revenue to Platform | 20% |

## Related

- [Song Tokens](/tokenization/song-tokens)
- [Revenue Distribution](/trading/revenue-distribution)
- [How It Works](/learn/how-it-works)
