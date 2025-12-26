---
sidebar_position: 7
title: Wagmi Integration
description: Integrating AceSteps contracts with wagmi
---

# Wagmi Integration

How to interact with AceSteps contracts using wagmi.

## Setup

```typescript
import { createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';

const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http()
  }
});
```

## Contract Config

```typescript
export const songNFTConfig = {
  address: '0x...' as const,
  abi: songNFTAbi
} as const;

export const songVaultConfig = {
  address: '0x...' as const,
  abi: songVaultAbi
} as const;
```

## Reading Data

### Check if Published

```typescript
import { useReadContract } from 'wagmi';

function useIsPublished(tokenId: bigint) {
  return useReadContract({
    ...songNFTConfig,
    functionName: 'isPublished',
    args: [tokenId]
  });
}
```

### Get Token Address

```typescript
function useSongToken(tokenId: bigint) {
  return useReadContract({
    ...songVaultConfig,
    functionName: 'getSongToken',
    args: [tokenId]
  });
}
```

## Writing Data

### Mint Song

```typescript
import { useWriteContract } from 'wagmi';

function useMintSong() {
  const { writeContract } = useWriteContract();

  const mint = async (
    metadataURI: string,
    audioHash: `0x${string}`,
    signature: `0x${string}`
  ) => {
    return writeContract({
      ...songNFTConfig,
      functionName: 'mint',
      args: [metadataURI, audioHash, signature]
    });
  };

  return { mint };
}
```

### Enable Trading

```typescript
function useEnableTrading() {
  const { writeContract } = useWriteContract();

  const enableTrading = async (tokenId: bigint) => {
    return writeContract({
      ...songVaultConfig,
      functionName: 'enableTrading',
      args: [tokenId]
    });
  };

  return { enableTrading };
}
```

## Watching Events

```typescript
import { useWatchContractEvent } from 'wagmi';

function useSongMintedEvents() {
  useWatchContractEvent({
    ...songNFTConfig,
    eventName: 'SongMinted',
    onLogs(logs) {
      console.log('New song minted:', logs);
    }
  });
}
```

## Full Example

```typescript
function MintButton({ metadataURI, audioHash, signature }) {
  const { writeContract, isPending, isSuccess } = useWriteContract();

  const handleMint = () => {
    writeContract({
      ...songNFTConfig,
      functionName: 'mint',
      args: [metadataURI, audioHash, signature]
    });
  };

  return (
    <button onClick={handleMint} disabled={isPending}>
      {isPending ? 'Minting...' : 'Mint Song'}
    </button>
  );
}
```

## Related

- [Contract ABIs](/smart-contracts/contract-abis)
- [Events](/smart-contracts/events)
