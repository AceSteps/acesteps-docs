---
sidebar_position: 5
title: Notifications
description: Implementing notifications in Farcaster Mini Apps
---

# Notifications

:::info Coming Soon
Push notifications for Mini Apps are in development.
:::

## Overview

Notifications keep users engaged with updates about:

- New songs from followed creators
- Token price movements
- Revenue distributions
- Social interactions

## Planned Features

### Notification Types

| Type | Description |
|------|-------------|
| New Song | Creator you follow published |
| Price Alert | Token moved +/- threshold |
| Revenue | Earnings distributed |
| Social | Likes, comments, shares |

### User Preferences

Users will be able to:

- Enable/disable by type
- Set price thresholds
- Choose quiet hours
- Mute specific creators

## Current Approach

While native notifications are pending:

### In-App Notifications

```typescript
function NotificationBell() {
  const { data: notifications } = useNotifications();

  return (
    <div className="notification-bell">
      {notifications.length > 0 && (
        <span className="badge">{notifications.length}</span>
      )}
    </div>
  );
}
```

### Email Notifications

Optional email alerts for important events.

## Future API

```typescript
// Request permission
const permission = await sdk.notifications.requestPermission();

// Send notification
await sdk.notifications.send({
  title: 'New Song!',
  body: '@creator just published "Midnight Vibes"',
  data: { songId: '123' }
});
```

## Related

- [Mini App](/farcaster/mini-app)
- [Social Sharing](/farcaster/social-sharing)
