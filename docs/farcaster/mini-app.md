---
sidebar_position: 2
title: Mini App
description: AceSteps Mini App implementation
---

# Mini App

AceSteps runs as a Farcaster Mini App within Warpcast and other clients.

## Setup

### Manifest Configuration

```json
// public/.well-known/farcaster.json
{
  "accountAssociation": {
    "header": "...",
    "payload": "...",
    "signature": "..."
  },
  "frame": {
    "version": "1",
    "name": "AceSteps",
    "iconUrl": "https://acesteps.xyz/icon.png",
    "homeUrl": "https://acesteps.xyz"
  }
}
```

### SDK Initialization

```typescript
import { sdk } from '@farcaster/miniapp-sdk';
import { farcasterMiniApp } from '@farcaster/miniapp-wagmi-connector';

// Create wagmi connector
const connector = farcasterMiniApp();

// Signal ready on mount
useEffect(() => {
  sdk.actions.ready();
}, []);
```

## Wallet Connection

AceSteps uses the Farcaster Mini App connector:

```typescript
import { farcasterMiniApp } from '@farcaster/miniapp-wagmi-connector';
import { createConfig } from 'wagmi';

const config = createConfig({
  connectors: [farcasterMiniApp()],
  chains: [base],
  // ...
});
```

## User Context

Access user information:

```typescript
const context = await sdk.context;

// Available data
context.user.fid      // Farcaster ID
context.user.username // Username
context.user.pfp      // Profile picture URL
```

## Related

- [Farcaster Overview](/farcaster/overview)
- [Frames](/farcaster/frames)
