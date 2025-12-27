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

## Contract Addresses

```typescript
// Base Sepolia (Testnet)
export const SONG_NFT_ADDRESS = '0x4b86a687bBbf7348911cc88195e89AdA54cF5Ba7' as const;
export const SONG_VAULT_ADDRESS = '0xdcfDc1cd433Cdc0Da24Ce1b979cdeb2563598566' as const;
export const REVENUE_HOOK_ADDRESS = '0xd18424e29c61fc1adeb0538c135d61f3fa524050' as const;
```

## Contract Config

```typescript
export const songNFTConfig = {
  address: SONG_NFT_ADDRESS,
  abi: songNFTAbi
} as const;

export const songVaultConfig = {
  address: SONG_VAULT_ADDRESS,
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
