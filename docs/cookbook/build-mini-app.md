---
sidebar_position: 4
title: Build a Mini App
description: Tutorial for building your own Farcaster Mini App
---

# Build a Mini App

Learn how to build a Farcaster Mini App that integrates with AceSteps.

## Prerequisites

- Node.js 18+
- Basic React knowledge
- Farcaster account

## Step 1: Create Project

```bash
npm create vite@latest my-mini-app -- --template react-ts
cd my-mini-app
```

## Step 2: Install Dependencies

```bash
npm install @farcaster/miniapp-sdk @farcaster/miniapp-wagmi-connector
npm install wagmi viem @tanstack/react-query
```

## Step 3: Configure Wagmi

Create `src/config.ts`:

```typescript
import { createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { farcasterMiniApp } from '@farcaster/miniapp-wagmi-connector';

export const config = createConfig({
  chains: [base],
  connectors: [farcasterMiniApp()],
  transports: {
    [base.id]: http()
  }
});
```

## Step 4: Set Up Providers

Update `src/main.tsx`:

```tsx
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from './config';
import App from './App';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </WagmiProvider>
);
```

## Step 5: Initialize SDK

Update `src/App.tsx`:

```tsx
import { useEffect } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { useAccount, useConnect } from 'wagmi';

function App() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return (
    <div>
      {isConnected ? (
        <p>Connected: {address}</p>
      ) : (
        <button onClick={() => connect({ connector: connectors[0] })}>
          Connect Wallet
        </button>
      )}
    </div>
  );
}
```

## Step 6: Create Manifest

Create `public/.well-known/farcaster.json`:

```json
{
  "accountAssociation": {
    "header": "...",
    "payload": "...",
    "signature": "..."
  },
  "frame": {
    "version": "1",
    "name": "My Mini App",
    "iconUrl": "https://your-app.xyz/icon.png",
    "homeUrl": "https://your-app.xyz"
  }
}
```

## Step 7: Add AceSteps Integration

```typescript
import { useReadContract, useWriteContract } from 'wagmi';
import { songNFTAbi, SONG_NFT_ADDRESS } from './contracts';

function SongList() {
  // Read song data
  const { data: isPublished } = useReadContract({
    address: SONG_NFT_ADDRESS,
    abi: songNFTAbi,
    functionName: 'isPublished',
    args: [1n]
  });

  return (
    <div>
      <p>Song 1 Published: {isPublished ? 'Yes' : 'No'}</p>
    </div>
  );
}
```

## Step 8: Deploy

```bash
npm run build
# Deploy to Vercel, Netlify, or your preferred host
```

## Next Steps

- Add more contract interactions
- Implement music player
- Build trading interface
- Add social features

## Related

- [SDK Setup](/farcaster/sdk-setup)
- [Wagmi Integration](/smart-contracts/wagmi-integration)
