---
sidebar_position: 2
title: Uniswap V4
description: Uniswap V4 integration for song token trading
---

# Uniswap V4

AceSteps uses Uniswap V4 for decentralized song token trading.

## Why Uniswap V4?

- **Hooks**: Custom logic during swaps
- **Singleton Design**: All pools in one contract
- **Native ETH**: Trade with ETH directly
- **donate()**: Add value to pools without swapping

## Pool Configuration

```typescript
const poolKey = {
  currency0: ETH_ADDRESS,
  currency1: songTokenAddress,
  fee: 10000, // 1%
  tickSpacing: 60,
  hooks: revenueHookAddress
};
```

## Hooks Used

### afterSwap

Tracks swap activity for analytics:

```solidity
function afterSwap(...) external {
    emit SwapExecuted(tokenId, sender, amount);
}
```

### donate()

Revenue distribution without swapping:

```solidity
poolManager.donate(poolKey, ethAmount, 0, "");
```

## Trading Interface

```typescript
// Buy tokens
await uniswapRouter.swap({
  poolKey,
  params: {
    zeroForOne: true, // ETH → Token
    amountSpecified: ethAmount
  }
});

// Sell tokens
await uniswapRouter.swap({
  poolKey,
  params: {
    zeroForOne: false, // Token → ETH
    amountSpecified: tokenAmount
  }
});
```

## Related

- [Revenue Hook](/smart-contracts/revenue-hook)
- [Liquidity](/trading/liquidity)
