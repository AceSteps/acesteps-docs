---
sidebar_position: 9
title: Events
description: Smart contract events for indexing and monitoring
---

# Events

Smart contract events emitted by AceSteps contracts.

## SongNFT Events

### SongMinted

Emitted when a new song is minted.

```solidity
event SongMinted(
    uint256 indexed tokenId,
    address indexed creator,
    string metadataURI
);
```

### SongPublished

Emitted when a song is published.

```solidity
event SongPublished(
    uint256 indexed tokenId
);
```

## SongVault Events

### NFTLocked

Emitted when an NFT is locked in the vault.

```solidity
event NFTLocked(
    uint256 indexed tokenId,
    address indexed previousOwner
);
```

### TradingEnabled

Emitted when trading is enabled for a song.

```solidity
event TradingEnabled(
    uint256 indexed tokenId,
    address indexed tokenAddress,
    address indexed poolAddress
);
```

## RevenueHook Events

### RevenueDistributed

Emitted when ad revenue is distributed.

```solidity
event RevenueDistributed(
    uint256 indexed tokenId,
    uint256 amount,
    uint256 poolShare,
    uint256 platformShare
);
```

### SwapExecuted

Emitted after a swap in a song pool.

```solidity
event SwapExecuted(
    uint256 indexed tokenId,
    address indexed trader,
    bool zeroForOne,
    int256 amount
);
```

## Listening to Events

### Using viem

```typescript
import { watchContractEvent } from 'viem';

const unwatch = watchContractEvent(client, {
  address: SONG_NFT_ADDRESS,
  abi: songNFTAbi,
  eventName: 'SongMinted',
  onLogs: (logs) => {
    for (const log of logs) {
      console.log('New song:', log.args.tokenId);
    }
  }
});
```

### Using wagmi

```typescript
import { useWatchContractEvent } from 'wagmi';

useWatchContractEvent({
  address: SONG_NFT_ADDRESS,
  abi: songNFTAbi,
  eventName: 'SongMinted',
  onLogs(logs) {
    // Handle new songs
  }
});
```

## Indexing

For indexing events, consider:

- **The Graph** - Decentralized indexing
- **Ponder** - Local indexing for development
- **Alchemy/Quicknode** - Webhook notifications

## Related

- [Contract ABIs](/smart-contracts/contract-abis)
- [Wagmi Integration](/smart-contracts/wagmi-integration)
