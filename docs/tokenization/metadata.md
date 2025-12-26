---
sidebar_position: 3
title: Metadata
description: NFT metadata structure and IPFS storage
---

# Metadata

Understanding NFT metadata structure on AceSteps.

## Metadata Standard

AceSteps follows the ERC-721 metadata standard with extensions for audio.

## Structure

```json
{
  "name": "Song Title",
  "description": "AI-generated music on AceSteps",
  "image": "ipfs://Qm.../cover.png",
  "animation_url": "ipfs://Qm.../audio.mp3",
  "external_url": "https://acesteps.xyz/song/123",
  "attributes": [
    {
      "trait_type": "Genre",
      "value": "Lo-fi"
    },
    {
      "trait_type": "Duration",
      "value": "30"
    },
    {
      "trait_type": "Creator",
      "value": "0x..."
    },
    {
      "trait_type": "Prompt",
      "value": "chill lofi beat..."
    },
    {
      "trait_type": "Audio Hash",
      "value": "0x..."
    }
  ]
}
```

## Fields

| Field | Description | Required |
|-------|-------------|----------|
| name | Song title | Yes |
| description | Song description | Yes |
| image | Cover art IPFS URI | Yes |
| animation_url | Audio file IPFS URI | Yes |
| external_url | Link to AceSteps page | No |
| attributes | Array of traits | Yes |

## IPFS Storage

All metadata is stored on IPFS:

### Advantages

- **Permanent** - Content-addressed storage
- **Decentralized** - No single point of failure
- **Verifiable** - Hash ensures integrity

### URIs

```
Metadata: ipfs://QmXyz.../metadata.json
Audio: ipfs://QmAbc.../audio.mp3
Image: ipfs://QmDef.../cover.png
```

## Audio Hash

The `audioHash` attribute contains a keccak256 hash of the audio file:

```solidity
bytes32 audioHash = keccak256(audioFileBytes);
```

This ensures:

- Audio authenticity
- Tamper detection
- Unique identification

## Related

- [Minting NFTs](/tokenization/minting-nfts)
- [Contract ABI](/api-reference/contract-abi)
