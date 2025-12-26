---
sidebar_position: 3
title: Liquidity
description: Understanding liquidity in AceSteps pools
---

# Liquidity

Understanding how liquidity works in AceSteps song token pools.

## Initial Liquidity

When trading is enabled:

```
Initial Pool State:
├── ETH: 0
└── Tokens: 20,000
```

This is **single-sided liquidity** - the pool starts with tokens only.

## Price Discovery

The first buyer determines the initial price:

```
First Buy: 0.1 ETH for tokens
Pool State After:
├── ETH: 0.1
└── Tokens: ~18,000 (depends on curve)
```

## Liquidity Growth

Two sources add ETH to pools:

### 1. Trading Activity

Each buy adds ETH to the pool:

```
Buy: ETH → Pool → Tokens out
Sell: Tokens → Pool → ETH out
```

### 2. Revenue Distribution

Ad revenue adds ETH without removing tokens:

```solidity
poolManager.donate(poolKey, ethAmount, 0, "");
```

## Platform LP Position

The platform holds the initial LP position:

- Earns 1% swap fees
- Position grows with trading volume
- Cannot withdraw underlying tokens

## Slippage

For low-liquidity pools:

- Large trades may have high slippage
- Use slippage protection
- Consider trade size vs pool depth

## Related

- [Uniswap V4](/trading/uniswap-v4)
- [Trading Overview](/trading/overview)
