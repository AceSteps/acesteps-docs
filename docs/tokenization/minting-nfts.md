---
sidebar_position: 2
title: Minting NFTs
description: How to mint songs as NFTs on AceSteps
---

# Minting NFTs

Learn how songs are minted as NFTs on AceSteps.

## Signature-Based Minting

AceSteps uses signature-based minting to ensure only AI-generated music is tokenized.

### Flow

1. User creates music via AI prompt
2. Backend generates signature (metadataURI + audioHash)
3. User calls `mint()` with signature
4. Contract verifies via ECDSA recovery
5. NFT minted to user's wallet

## Code Example

```solidity
function mint(
    string calldata metadataURI,
    bytes32 audioHash,
    bytes calldata signature
) external returns (uint256)
```

## Metadata Structure

```json
{
  "name": "Song Title",
  "description": "Created with AceSteps",
  "audio": "ipfs://...",
  "image": "ipfs://...",
  "attributes": {
    "prompt": "original prompt",
    "duration": 30,
    "creator": "0x..."
  }
}
```

## Gas Costs

Minting on Base is cost-effective:

- Typical mint: < $0.01

## Related

- [SongNFT Contract](/smart-contracts/song-nft)
- [Song Tokens](/tokenization/song-tokens)
