---
sidebar_position: 3
title: SongVault
description: Contract for locking NFTs and enabling trading
---

# SongVault

The `SongVault` contract permanently locks NFTs when trading is enabled.

## Purpose

When a creator enables trading:

1. NFT transferred to vault (permanent)
2. ERC-20 tokens minted
3. Uniswap pool created

## Why Permanent?

The vault has **no unlock mechanism** because:

- AMM math makes 100% buyback impossible
- Prevents rug pulls
- Ensures token value is backed

## Interface

```solidity
interface ISongVault {
    function enableTrading(uint256 tokenId) external;

    function getLockedNFT(uint256 tokenId) external view returns (bool isLocked);

    function getSongToken(uint256 tokenId) external view returns (address);
}
```

## Enable Trading Flow

```solidity
function enableTrading(uint256 tokenId) external {
    // 1. Verify ownership
    require(songNFT.ownerOf(tokenId) == msg.sender, "Not owner");

    // 2. Transfer NFT to vault
    songNFT.transferFrom(msg.sender, address(this), tokenId);

    // 3. Deploy token
    address token = _deploySongToken(tokenId);

    // 4. Create Uniswap pool
    _createPool(token);

    // 5. Distribute tokens
    _distributeTokens(token, msg.sender);
}
```

## Events

```solidity
event NFTLocked(uint256 indexed tokenId, address indexed previousOwner);
event TokenDeployed(uint256 indexed tokenId, address tokenAddress);
event PoolCreated(uint256 indexed tokenId, address poolAddress);
```

## Related

- [SongNFT](/smart-contracts/song-nft)
- [SongToken](/smart-contracts/song-token)
