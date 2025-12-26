---
sidebar_position: 1
title: Music NFTs
description: Understanding music NFTs on AceSteps
---

# Music NFTs

Every song on AceSteps is an ERC-721 NFT on Base Network.

## What is a Music NFT?

A Music NFT represents ownership of an AI-generated song:

- **Unique token** on the blockchain
- **Metadata** pointing to audio and artwork
- **Transferable** between wallets
- **Tradeable** on NFT marketplaces

## NFT Properties

| Property | Description |
|----------|-------------|
| tokenId | Unique identifier |
| metadataURI | IPFS link to metadata |
| audioHash | Hash of audio file |
| creator | Original minter |
| isPublished | Visible on platform |
| isTradeable | Trading enabled |

## NFT Metadata

```json
{
  "name": "Midnight Vibes",
  "description": "A chill lofi beat",
  "image": "ipfs://Qm.../cover.png",
  "animation_url": "ipfs://Qm.../audio.mp3",
  "attributes": [
    {"trait_type": "Genre", "value": "Lo-fi"},
    {"trait_type": "Duration", "value": "30s"},
    {"trait_type": "Prompt", "value": "chill lofi..."}
  ]
}
```

## Ownership Rights

As an NFT owner, you have:

- **Display rights** - Show as yours
- **Revenue rights** - Earn from plays (if not tokenized)
- **Transfer rights** - Sell or gift
- **Tokenization rights** - Enable fractional trading

## NFT States

```
Created → Minted → Published → Tokenized (optional)
```

1. **Created** - AI generated, not saved
2. **Minted** - Saved as NFT in wallet
3. **Published** - Visible on platform
4. **Tokenized** - Trading enabled, NFT locked

## Related

- [Minting NFTs](/tokenization/minting-nfts)
- [Song Tokens](/get-started/concepts/song-tokens)
