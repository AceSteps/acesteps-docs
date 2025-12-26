---
sidebar_position: 5
title: Revenue Hook
description: Uniswap V4 hook for ad revenue distribution
---

# SongRevenueHook

The `SongRevenueHook` is a Uniswap V4 hook that distributes ad revenue to token holders.

## How It Works

1. Platform collects ad revenue (ETH)
2. Hook calls `donate()` on Uniswap pool
3. ETH added to pool reserves
4. Token price increases
5. All holders benefit proportionally

## Uniswap V4 Hooks

Uniswap V4 introduced hooks - custom contract logic that executes during pool operations.

### Implemented Hooks

```solidity
function afterSwap(
    address sender,
    PoolKey calldata key,
    IPoolManager.SwapParams calldata params,
    BalanceDelta delta,
    bytes calldata hookData
) external override returns (bytes4, int128)
```

## Revenue Distribution

```solidity
function distributeRevenue(uint256 tokenId) external payable {
    address pool = getPool(tokenId);

    // 80% to pool, 20% to platform
    uint256 poolShare = (msg.value * 80) / 100;
    uint256 platformShare = msg.value - poolShare;

    // Add ETH to pool via donate
    poolManager.donate(key, poolShare, 0, "");

    // Transfer platform share
    platformWallet.transfer(platformShare);
}
```

## Pool Parameters

| Parameter | Value |
|-----------|-------|
| Token Pair | SONG_TOKEN / ETH |
| Fee Tier | 1% (10000 bps) |
| Tick Spacing | 60 |

## Events

```solidity
event RevenueDistributed(uint256 indexed tokenId, uint256 amount);
event SwapExecuted(uint256 indexed tokenId, address indexed trader, uint256 amount);
```

## Related

- [Uniswap V4](/trading/uniswap-v4)
- [Song Tokens](/tokenization/song-tokens)
