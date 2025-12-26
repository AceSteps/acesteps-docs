# Phase 2: Navigation & Information Architecture

## Overview
Design and implement the navigation structure, sidebar configuration, and information architecture matching Base docs patterns.

---

## 2.1 Top Navigation Structure

### Primary Navigation (Header)
Matching Base docs pattern with AceSteps sections:

| Position | Label | Route | Description |
|----------|-------|-------|-------------|
| 1 | Get Started | `/get-started/overview` | Introduction & quickstart |
| 2 | Music Creation | `/music-creation/overview` | AI music generation |
| 3 | Tokenization | `/tokenization/overview` | NFT & token system |
| 4 | Smart Contracts | `/smart-contracts/overview` | Blockchain contracts |
| 5 | Trading | `/trading/overview` | DEX & liquidity |
| 6 | Farcaster | `/farcaster/overview` | Mini app integration |
| 7 | Cookbook | `/cookbook/create-first-song` | Tutorials |
| 8 | Learn | `/learn/welcome` | Educational content |

### Secondary Navigation (Right side)
- GitHub link
- Discord/Support link
- Dark/Light mode toggle
- Search (Cmd+K)

---

## 2.2 Sidebar Configuration

### sidebars.ts
```typescript
import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {

  // GET STARTED SIDEBAR
  getStartedSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'get-started/overview',
        'get-started/quickstart',
        'get-started/installation',
        'get-started/architecture',
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      items: [
        'get-started/concepts/music-nfts',
        'get-started/concepts/song-tokens',
        'get-started/concepts/revenue-sharing',
      ],
    },
  ],

  // MUSIC CREATION SIDEBAR
  musicCreationSidebar: [
    {
      type: 'category',
      label: 'AI Music Creation',
      collapsed: false,
      items: [
        'music-creation/overview',
        'music-creation/ace-step-ai',
        'music-creation/prompts-guide',
        'music-creation/audio-formats',
      ],
    },
    {
      type: 'category',
      label: 'Advanced',
      items: [
        'music-creation/advanced/custom-models',
        'music-creation/advanced/batch-generation',
        'music-creation/advanced/api-integration',
      ],
    },
  ],

  // TOKENIZATION SIDEBAR
  tokenizationSidebar: [
    {
      type: 'category',
      label: 'NFT System',
      collapsed: false,
      items: [
        'tokenization/overview',
        'tokenization/minting-nfts',
        'tokenization/metadata',
      ],
    },
    {
      type: 'category',
      label: 'Song Tokens',
      items: [
        'tokenization/song-tokens',
        'tokenization/token-distribution',
        'tokenization/fractional-ownership',
      ],
    },
  ],

  // SMART CONTRACTS SIDEBAR
  contractsSidebar: [
    {
      type: 'category',
      label: 'Overview',
      collapsed: false,
      items: [
        'smart-contracts/overview',
        'smart-contracts/architecture',
        'smart-contracts/deployment',
      ],
    },
    {
      type: 'category',
      label: 'Contracts',
      items: [
        'smart-contracts/song-nft',
        'smart-contracts/song-vault',
        'smart-contracts/song-token',
        'smart-contracts/revenue-hook',
      ],
    },
    {
      type: 'category',
      label: 'Integration',
      items: [
        'smart-contracts/wagmi-integration',
        'smart-contracts/contract-abis',
        'smart-contracts/events',
      ],
    },
  ],

  // TRADING SIDEBAR
  tradingSidebar: [
    {
      type: 'category',
      label: 'Trading',
      collapsed: false,
      items: [
        'trading/overview',
        'trading/uniswap-v4',
        'trading/liquidity',
      ],
    },
    {
      type: 'category',
      label: 'Revenue',
      items: [
        'trading/swap-fees',
        'trading/revenue-distribution',
        'trading/claiming-earnings',
      ],
    },
  ],

  // FARCASTER SIDEBAR
  farcasterSidebar: [
    {
      type: 'category',
      label: 'Farcaster Integration',
      collapsed: false,
      items: [
        'farcaster/overview',
        'farcaster/mini-app',
        'farcaster/sdk-setup',
      ],
    },
    {
      type: 'category',
      label: 'Features',
      items: [
        'farcaster/frames',
        'farcaster/notifications',
        'farcaster/social-sharing',
      ],
    },
  ],

  // COOKBOOK SIDEBAR
  cookbookSidebar: [
    {
      type: 'category',
      label: 'Tutorials',
      collapsed: false,
      items: [
        'cookbook/create-first-song',
        'cookbook/mint-and-trade',
        'cookbook/earn-revenue',
        'cookbook/build-mini-app',
      ],
    },
  ],

  // LEARN SIDEBAR
  learnSidebar: [
    {
      type: 'category',
      label: 'Learn',
      collapsed: false,
      items: [
        'learn/welcome',
        'learn/how-it-works',
        'learn/tokenomics',
        'learn/faq',
      ],
    },
  ],

  // API REFERENCE SIDEBAR
  apiSidebar: [
    {
      type: 'category',
      label: 'API Reference',
      collapsed: false,
      items: [
        'api-reference/overview',
        'api-reference/backend-api',
        'api-reference/contract-abi',
      ],
    },
  ],
};

export default sidebars;
```

---

## 2.3 Breadcrumb Configuration

Enable breadcrumbs in docusaurus.config.ts:
```typescript
docs: {
  breadcrumbs: true,
  // ...
}
```

Breadcrumb pattern: `Section > Category > Page`
Example: `Smart Contracts > Contracts > SongNFT`

---

## 2.4 "On This Page" TOC (Right Sidebar)

Configure table of contents:
```typescript
themeConfig: {
  tableOfContents: {
    minHeadingLevel: 2,
    maxHeadingLevel: 4,
  },
}
```

---

## 2.5 Search Configuration

### Option A: Algolia DocSearch (Recommended for production)
```typescript
themeConfig: {
  algolia: {
    appId: 'YOUR_APP_ID',
    apiKey: 'YOUR_SEARCH_API_KEY',
    indexName: 'acesteps',
    contextualSearch: true,
  },
}
```

### Option B: Local Search (For development)
```bash
npm install @easyops-cn/docusaurus-search-local
```

```typescript
themes: [
  [
    '@easyops-cn/docusaurus-search-local',
    {
      hashed: true,
      language: ['en'],
      highlightSearchTermsOnTargetPage: true,
      docsRouteBasePath: '/',
    },
  ],
],
```

---

## 2.6 Deliverables Checklist

- [ ] Configure sidebars.ts with all sections
- [ ] Set up breadcrumb navigation
- [ ] Configure "On this page" TOC
- [ ] Implement search functionality
- [ ] Add keyboard shortcuts (Cmd+K for search)
- [ ] Configure collapsible sidebar sections
- [ ] Add external links (GitHub, Discord)
- [ ] Test navigation flow between sections
- [ ] Ensure mobile responsive navigation

---

## 2.7 Navigation Map

```
HOME (/)
├── Get Started
│   ├── Overview
│   ├── Quickstart
│   ├── Installation
│   └── Architecture
├── Music Creation
│   ├── Overview
│   ├── ACE-Step AI
│   ├── Prompts Guide
│   └── Advanced
├── Tokenization
│   ├── Overview
│   ├── Minting NFTs
│   ├── Song Tokens
│   └── Fractional Ownership
├── Smart Contracts
│   ├── Overview
│   ├── SongNFT
│   ├── SongVault
│   ├── SongToken
│   └── RevenueHook
├── Trading
│   ├── Overview
│   ├── Uniswap V4
│   └── Revenue Distribution
├── Farcaster
│   ├── Overview
│   ├── Mini App
│   └── Frames
├── Cookbook
│   ├── Create First Song
│   ├── Mint and Trade
│   └── Earn Revenue
└── Learn
    ├── Welcome
    ├── How It Works
    └── FAQ
```

---

## 2.8 Success Criteria

1. All navigation links work correctly
2. Sidebar reflects correct hierarchy
3. Breadcrumbs show correct path
4. Search returns relevant results
5. Mobile navigation works smoothly
6. Dark/light mode toggle works
7. External links open in new tab
