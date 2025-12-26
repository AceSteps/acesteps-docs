---
sidebar_position: 1
title: Overview
description: Smart contract architecture for AceSteps
---

# Smart Contracts Overview

AceSteps is powered by four core smart contracts deployed on Base Network.

## Contract Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        USER                                  │
└─────────────────────────────────────────────────────────────┘
              │                           │
              │ mint(signature)           │ enableTrading()
              ▼                           ▼
┌─────────────────────┐        ┌─────────────────────┐
│      SongNFT        │───────▶│     SongVault       │
│     (ERC-721)       │        │   (Permanent Lock)  │
│                     │        │                     │
│ • Signature verify  │        │ • Lock NFT          │
│ • Metadata storage  │        │ • Deploy token      │
│ • Publish status    │        │ • Create pool       │
└─────────────────────┘        └─────────────────────┘
                                          │
                                          │ deploys
                                          ▼
                               ┌─────────────────────┐
                               │     SongToken       │
                               │     (ERC-20)        │
                               │                     │
                               │ • 100,000 supply    │
                               │ • 18 decimals       │
                               │ • Fixed, no mint    │
                               └─────────────────────┘
                                          │
                                          │ creates pool
                                          ▼
┌─────────────────────────────────────────────────────────────┐
│                      UNISWAP V4                              │
│  ┌─────────────────────┐        ┌─────────────────────┐    │
│  │    PoolManager      │◀──────▶│   RevenueHook       │    │
│  │                     │        │                     │    │
│  │ • SONG/ETH pools    │        │ • donate() revenue  │    │
│  │ • 1% swap fee       │        │ • afterSwap events  │    │
│  └─────────────────────┘        └─────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Contract Summary

| Contract | Standard | Purpose | Key Functions |
|----------|----------|---------|---------------|
| [SongNFT](/smart-contracts/song-nft) | ERC-721 | Song ownership | `mint()`, `publish()` |
| [SongVault](/smart-contracts/song-vault) | Custom | NFT locking, token deployment | `enableTrading()` |
| [SongToken](/smart-contracts/song-token) | ERC-20 | Fractional ownership | Standard ERC-20 |
| [RevenueHook](/smart-contracts/revenue-hook) | Uniswap V4 | Revenue distribution | `donate()`, `afterSwap()` |

## Network Details

| Property | Value |
|----------|-------|
| Network | Base (Ethereum L2) |
| Chain ID | 8453 (mainnet), 84532 (sepolia) |
| DEX | Uniswap V4 |
| Framework | Foundry |

## Security Features

### Signature-Based Minting

Only AI-generated music can be minted:

```solidity
// Backend signs: hash(userAddress + metadataURI + audioHash)
// Contract verifies via ECDSA.recover()
require(ECDSA.recover(hash, signature) == platformSigner);
```

### Replay Attack Prevention

```solidity
mapping(bytes => bool) public usedSignatures;

require(!usedSignatures[signature], "Signature already used");
usedSignatures[signature] = true;
```

### Permanent Locking

NFTs cannot be unlocked once trading is enabled:

- No `unlock()` function exists
- 100% token buyback is mathematically impossible (AMM curve)
- Prevents rug pulls

### Access Control

```solidity
modifier onlyPlatform() {
    require(msg.sender == platformAddress, "Not authorized");
    _;
}
```

### Emergency Controls

```solidity
function pause() external onlyOwner {
    _pause();
}
```

## Token Parameters

| Parameter | Value |
|-----------|-------|
| Token Standard | ERC-20 |
| Fixed Supply | 100,000 tokens per song |
| Decimals | 18 |
| Creator Allocation | 80% (80,000 tokens) |
| LP Allocation | 20% (20,000 tokens) |

## Uniswap V4 Pool Parameters

| Parameter | Value |
|-----------|-------|
| Token Pair | SONG_TOKEN / ETH (native) |
| Fee Tier | 1% (10000 bps) |
| Tick Spacing | 60 |
| Initial Liquidity | Single-sided (0 ETH + 20,000 TOKEN) |
| Hook | SongRevenueHook |

## Development

### Local Setup

```bash
cd blockchain
forge install
forge build
forge test
```

### Deployment

```bash
forge script script/Deploy.s.sol:DeployScript \
  --rpc-url $BASE_RPC_URL \
  --broadcast \
  --verify
```

## Vault Mapping Structure

Bidirectional mappings for metadata access:

| Mapping | Usage |
|---------|-------|
| `lockedNFTs[nftId] → tokenAddress` | Find token from NFT |
| `tokenToNFT[tokenAddress] → nftId` | Find NFT from token |

## Related

- [SongNFT Contract](/smart-contracts/song-nft)
- [Architecture](/smart-contracts/architecture)
- [Deployment](/smart-contracts/deployment)
