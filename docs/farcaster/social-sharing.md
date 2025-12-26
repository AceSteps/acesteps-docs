---
sidebar_position: 6
title: Social Sharing
description: Sharing songs and achievements on Farcaster
---

# Social Sharing

Share your music and achievements on Farcaster.

## Share a Song

### Using SDK

```typescript
import { sdk } from '@farcaster/miniapp-sdk';

async function shareSong(songId: string, title: string) {
  await sdk.actions.composeCast({
    text: `🎵 Check out "${title}" on AceSteps!`,
    embeds: [`https://acesteps.xyz/song/${songId}`]
  });
}
```

### Share Button Component

```tsx
function ShareButton({ song }) {
  const handleShare = async () => {
    await sdk.actions.composeCast({
      text: `🎵 "${song.title}" - Created with AI on @acesteps`,
      embeds: [`https://acesteps.xyz/song/${song.id}`]
    });
  };

  return (
    <button onClick={handleShare}>
      Share on Farcaster
    </button>
  );
}
```

## Share Types

### New Creation

```
🎵 Just created "Midnight Vibes" using AI!

Listen and invest: acesteps.xyz/song/123

@acesteps
```

### Investment

```
📈 Just invested in "Summer Dreams" on @acesteps

Join me: acesteps.xyz/song/456
```

### Milestone

```
🎉 My song "Chill Beats" just hit 10,000 plays!

Thanks to all my supporters 💙

@acesteps
```

## Frame Embeds

When you share a song URL, it renders as an interactive Frame:

```
┌─────────────────────────────────┐
│  🎵 Midnight Vibes              │
│  by @creator                    │
│                                 │
│  ▶️ 2.5K plays  💰 0.05 ETH     │
│                                 │
│  [Play] [Buy] [Share]           │
└─────────────────────────────────┘
```

## Best Practices

### Do

- Share genuine creations
- Engage with comments
- Credit collaborators
- Use relevant hashtags

### Don't

- Spam promotions
- Mislead about returns
- Fake engagement
- Over-post

## Analytics

Track share performance:

- Views from shares
- Conversion to listens
- New investors from shares

## Related

- [Frames](/farcaster/frames)
- [Notifications](/farcaster/notifications)
