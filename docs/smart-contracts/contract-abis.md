---
sidebar_position: 8
title: Contract ABIs
description: ABI definitions for AceSteps contracts
---

# Contract ABIs

ABI definitions for integrating with AceSteps contracts.

## SongNFT ABI

```typescript
export const songNFTAbi = [
  {
    name: 'mint',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'metadataURI', type: 'string' },
      { name: 'audioHash', type: 'bytes32' },
      { name: 'signature', type: 'bytes' }
    ],
    outputs: [{ name: 'tokenId', type: 'uint256' }]
  },
  {
    name: 'publish',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: []
  },
  {
    name: 'isPublished',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [{ type: 'bool' }]
  },
  {
    name: 'isTradeable',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [{ type: 'bool' }]
  },
  {
    name: 'linkedToken',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [{ type: 'address' }]
  },
  {
    name: 'SongMinted',
    type: 'event',
    inputs: [
      { name: 'tokenId', type: 'uint256', indexed: true },
      { name: 'creator', type: 'address', indexed: true },
      { name: 'metadataURI', type: 'string', indexed: false }
    ]
  }
] as const;
```

## SongVault ABI

```typescript
export const songVaultAbi = [
  {
    name: 'enableTrading',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: []
  },
  {
    name: 'getSongToken',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [{ type: 'address' }]
  },
  {
    name: 'isLocked',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'tokenId', type: 'uint256' }],
    outputs: [{ type: 'bool' }]
  },
  {
    name: 'TradingEnabled',
    type: 'event',
    inputs: [
      { name: 'tokenId', type: 'uint256', indexed: true },
      { name: 'tokenAddress', type: 'address', indexed: true }
    ]
  }
] as const;
```

## SongToken ABI

Standard ERC-20 plus:

```typescript
export const songTokenAbi = [
  // Standard ERC-20 functions...
  {
    name: 'songId',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }]
  },
  {
    name: 'vault',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'address' }]
  }
] as const;
```

## TypeScript Types

```typescript
import { Abi } from 'viem';

export type SongNFTAbi = typeof songNFTAbi;
export type SongVaultAbi = typeof songVaultAbi;
export type SongTokenAbi = typeof songTokenAbi;
```

## Related

- [Wagmi Integration](/smart-contracts/wagmi-integration)
- [Events](/smart-contracts/events)
