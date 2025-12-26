---
sidebar_position: 3
title: Contract ABI
description: Smart contract ABIs and addresses
---

# Contract ABI

Smart contract ABIs and deployment addresses.

## Deployed Addresses (Base)

| Contract | Address |
|----------|---------|
| SongNFT | `0x...` |
| SongVault | `0x...` |
| SongRevenueHook | `0x...` |

*Note: Addresses will be updated after deployment.*

## SongNFT ABI

```json
[
  {
    "name": "mint",
    "type": "function",
    "inputs": [
      {"name": "metadataURI", "type": "string"},
      {"name": "audioHash", "type": "bytes32"},
      {"name": "signature", "type": "bytes"}
    ],
    "outputs": [{"name": "tokenId", "type": "uint256"}]
  },
  {
    "name": "publish",
    "type": "function",
    "inputs": [{"name": "tokenId", "type": "uint256"}],
    "outputs": []
  },
  {
    "name": "isPublished",
    "type": "function",
    "inputs": [{"name": "tokenId", "type": "uint256"}],
    "outputs": [{"type": "bool"}]
  }
]
```

## SongVault ABI

```json
[
  {
    "name": "enableTrading",
    "type": "function",
    "inputs": [{"name": "tokenId", "type": "uint256"}],
    "outputs": []
  },
  {
    "name": "getSongToken",
    "type": "function",
    "inputs": [{"name": "tokenId", "type": "uint256"}],
    "outputs": [{"type": "address"}]
  }
]
```

## SongToken ABI

Standard ERC-20 ABI plus:

```json
[
  {
    "name": "songId",
    "type": "function",
    "inputs": [],
    "outputs": [{"type": "uint256"}]
  }
]
```

## Using with wagmi

```typescript
import { useReadContract } from 'wagmi';
import { songNFTAbi } from './abis';

const { data: isPublished } = useReadContract({
  address: SONG_NFT_ADDRESS,
  abi: songNFTAbi,
  functionName: 'isPublished',
  args: [tokenId]
});
```

## Related

- [Backend API](/api-reference/backend-api)
- [Smart Contracts](/smart-contracts/overview)
