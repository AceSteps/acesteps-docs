---
sidebar_position: 3
title: SDK Setup
description: Setting up the Farcaster Mini App SDK
---

# SDK Setup

How to set up the Farcaster SDK for Mini App development.

## Installation

```bash
npm install @farcaster/miniapp-sdk @farcaster/miniapp-wagmi-connector
```

## Basic Setup

### Initialize SDK

```typescript
import { sdk } from '@farcaster/miniapp-sdk';

// In your app's entry point
useEffect(() => {
  sdk.actions.ready();
}, []);
```

### Wagmi Integration

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

## Provider Setup

```tsx
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <YourApp />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

## User Context

Access Farcaster user data:

```typescript
import { sdk } from '@farcaster/miniapp-sdk';

async function getUserInfo() {
  const context = await sdk.context;

  return {
    fid: context.user.fid,
    username: context.user.username,
    displayName: context.user.displayName,
    pfpUrl: context.user.pfpUrl
  };
}
```

## Manifest Configuration

Create `.well-known/farcaster.json`:

```json
{
  "accountAssociation": {
    "header": "eyJ...",
    "payload": "eyJ...",
    "signature": "MHg..."
  },
  "frame": {
    "version": "1",
    "name": "AceSteps",
    "iconUrl": "https://acesteps.xyz/icon.png",
    "homeUrl": "https://acesteps.xyz",
    "splashImageUrl": "https://acesteps.xyz/splash.png",
    "splashBackgroundColor": "#0D0D0D"
  }
}
```

## Actions

### Open URL

```typescript
await sdk.actions.openUrl('https://example.com');
```

### Share

```typescript
await sdk.actions.composeCast({
  text: 'Check out this song!',
  embeds: ['https://acesteps.xyz/song/123']
});
```

## Related

- [Mini App](/farcaster/mini-app)
- [Frames](/farcaster/frames)
