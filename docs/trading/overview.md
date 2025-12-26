---
sidebar_position: 1
title: Overview
description: Trading song tokens on AceSteps
---

# Trading Overview

Trade song tokens on Uniswap V4 within the AceSteps platform.

## How Trading Works

When a song is tokenized:

1. **Pool Created** - Uniswap V4 pool with SONG/ETH pair
2. **Initial Liquidity** - 20,000 tokens (single-sided, 0 ETH)
3. **Price Discovery** - First buyer sets initial price
4. **Continuous Trading** - Buy/sell anytime

## Trading Flow

```
User wants to BUY song tokens:
  └── Send ETH to pool
       └── Receive SONG tokens
            └── Price increases

User wants to SELL song tokens:
  └── Send SONG tokens to pool
       └── Receive ETH
            └── Price decreases
```

## Revenue Benefits

Ad revenue adds ETH to the pool via `donate()`:

- Token price increases
- All holders benefit
- No dilution

## Fees

| Fee Type | Amount | Recipient |
|----------|--------|-----------|
| Swap Fee | 1% | LP (platform) |
| Gas | Variable | Network |

## Related

- [Uniswap V4](/trading/uniswap-v4)
- [Liquidity](/trading/liquidity)
