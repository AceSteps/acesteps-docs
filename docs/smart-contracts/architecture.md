---
sidebar_position: 2
title: Architecture
description: Smart contract architecture and interactions
---

# Contract Architecture

Understanding how AceSteps smart contracts interact.

## Contract Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        USER                                  │
└─────────────────────────────────────────────────────────────┘
              │                           │
              │ mint()                    │ enableTrading()
              ▼                           ▼
┌─────────────────────┐        ┌─────────────────────┐
│      SongNFT        │───────▶│     SongVault       │
│     (ERC-721)       │        │   (NFT Locking)     │
└─────────────────────┘        └─────────────────────┘
                                          │
                                          │ deploys
                                          ▼
                               ┌─────────────────────┐
                               │     SongToken       │
                               │     (ERC-20)        │
                               └─────────────────────┘
                                          │
                                          │ creates pool
                                          ▼
┌─────────────────────────────────────────────────────────────┐
│                      UNISWAP V4                              │
│  ┌─────────────────────┐        ┌─────────────────────┐    │
│  │    PoolManager      │◀──────▶│   RevenueHook       │    │
│  │                     │        │                     │    │
│  └─────────────────────┘        └─────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Contract Responsibilities

### SongNFT

- Mint new songs with signature verification
- Track publishing status
- Store metadata URI and audio hash
- Link to deployed token address

### SongVault

- Lock NFTs permanently
- Deploy ERC-20 tokens
- Create Uniswap pools
- Distribute tokens

### SongToken

- Standard ERC-20 implementation
- Fixed 100,000 supply
- Reference to parent NFT

### RevenueHook

- Uniswap V4 hook
- Revenue distribution via donate()
- Swap event tracking

## Interaction Flows

### Minting

```solidity
User → SongNFT.mint(metadataURI, audioHash, signature)
  → Verify signature
  → Mint NFT to user
  → Emit SongMinted event
```

### Enable Trading

```solidity
User → SongVault.enableTrading(tokenId)
  → Transfer NFT to vault
  → Deploy SongToken
  → Create Uniswap pool
  → Distribute tokens (80/20)
  → Emit TradingEnabled event
```

### Revenue Distribution

```solidity
Platform → RevenueHook.distributeRevenue(tokenId)
  → Calculate shares (80/20)
  → Call donate() on pool
  → Transfer platform share
  → Emit RevenueDistributed event
```

## Related

- [SongNFT](/smart-contracts/song-nft)
- [SongVault](/smart-contracts/song-vault)
