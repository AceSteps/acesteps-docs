---
sidebar_position: 1
title: Overview
description: AceSteps Farcaster integration
---

# Farcaster Overview

AceSteps is built as a **Farcaster Mini App**, bringing AI music creation to the Farcaster ecosystem.

## What is Farcaster?

Farcaster is a decentralized social protocol built on Ethereum/Base.

Key features:

- Decentralized identity
- Portable social graph
- Mini Apps (embedded apps)
- Frames (interactive posts)

## AceSteps on Farcaster

### Mini App

The main AceSteps experience is a Mini App:

- Full music creation interface
- Wallet connection via Farcaster
- NFT minting and trading
- Library management

### Frames

Share songs as interactive Frames:

- Preview audio directly in feed
- Quick buy/trade actions
- Engagement tracking

## SDK Integration

```typescript
import { sdk } from '@farcaster/miniapp-sdk';

// Signal app readiness
await sdk.actions.ready();

// Get user context
const context = await sdk.context;
```

## Related

- [Mini App](/farcaster/mini-app)
- [Frames](/farcaster/frames)
