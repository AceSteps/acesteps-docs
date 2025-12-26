---
sidebar_position: 3
title: Frames
description: Interactive Farcaster Frames for song sharing
---

# Frames

Share AceSteps songs as interactive Farcaster Frames.

## What are Frames?

Frames are interactive elements embedded in Farcaster posts:

- Display rich content
- Enable actions (like, buy, trade)
- Track engagement

## Song Frame

Share any published song as a Frame:

```
┌─────────────────────────────┐
│  🎵 Song Title              │
│  by @creator                │
│                             │
│  [▶️ Play] [💰 Buy] [📊 Trade] │
└─────────────────────────────┘
```

## Frame URL Structure

```
https://acesteps.xyz/frame/song/{tokenId}
```

## Frame Meta Tags

```html
<meta property="fc:frame" content="vNext" />
<meta property="fc:frame:image" content="https://acesteps.xyz/api/song/{id}/image" />
<meta property="fc:frame:button:1" content="Play" />
<meta property="fc:frame:button:1:action" content="link" />
<meta property="fc:frame:button:2" content="Buy" />
<meta property="fc:frame:button:2:action" content="tx" />
```

## Actions

### Play

Opens audio player or mini app.

### Buy

Initiates token purchase transaction.

### Trade

Opens trading interface.

## Analytics

Track Frame engagement:

- Views
- Button clicks
- Conversions

## Related

- [Farcaster Overview](/farcaster/overview)
- [Mini App](/farcaster/mini-app)
