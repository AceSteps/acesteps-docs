# Phase 1: Project Setup & Infrastructure

## Overview
Set up the documentation framework using Docusaurus (same as Base docs) with proper configuration for AceSteps documentation.

---

## 1.1 Documentation Framework Selection

### Recommended: Docusaurus 3.x
Base docs uses Docusaurus - we will replicate this for consistency.

**Why Docusaurus:**
- Same framework as Base docs (easy to copy design patterns)
- Built-in MDX support
- Excellent sidebar navigation
- Dark/light theme support
- Search integration (Algolia)
- Versioning support
- i18n ready

### Installation
```bash
npx create-docusaurus@latest acesteps-docs classic --typescript
```

---

## 1.2 Project Structure

```
acesteps-docs/
├── docs/                          # Main documentation
│   ├── get-started/               # Getting Started section
│   │   ├── overview.md
│   │   ├── quickstart.md
│   │   └── installation.md
│   ├── music-creation/            # AI Music Creation
│   │   ├── overview.md
│   │   ├── ace-step-ai.md
│   │   └── prompts-guide.md
│   ├── tokenization/              # NFT & Token System
│   │   ├── overview.md
│   │   ├── minting-nfts.md
│   │   └── song-tokens.md
│   ├── smart-contracts/           # Blockchain Integration
│   │   ├── overview.md
│   │   ├── song-nft.md
│   │   ├── song-vault.md
│   │   ├── song-token.md
│   │   └── revenue-hook.md
│   ├── trading/                   # DEX & Trading
│   │   ├── overview.md
│   │   ├── uniswap-v4.md
│   │   └── liquidity.md
│   ├── farcaster/                 # Farcaster Integration
│   │   ├── overview.md
│   │   ├── mini-app.md
│   │   └── frames.md
│   ├── api-reference/             # API Documentation
│   │   ├── overview.md
│   │   ├── backend-api.md
│   │   └── contract-abi.md
│   ├── cookbook/                  # Tutorials & Recipes
│   │   ├── create-first-song.md
│   │   ├── mint-and-trade.md
│   │   └── earn-revenue.md
│   └── learn/                     # Educational Content
│       ├── welcome.md
│       ├── how-it-works.md
│       └── faq.md
├── src/
│   ├── components/                # Custom React components
│   ├── css/                       # Custom styles
│   └── pages/                     # Custom pages
├── static/
│   ├── img/                       # Images & icons
│   └── assets/                    # Other static assets
├── docusaurus.config.ts           # Main config
├── sidebars.ts                    # Sidebar configuration
└── package.json
```

---

## 1.3 Configuration Tasks

### docusaurus.config.ts
```typescript
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';

const config: Config = {
  title: 'AceSteps Documentation',
  tagline: 'AI-Powered Music Creation & Tokenization Platform',
  favicon: 'img/favicon.ico',
  url: 'https://docs.acesteps.xyz',
  baseUrl: '/',
  organizationName: 'acesteps',
  projectName: 'acesteps-docs',

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl: 'https://github.com/Batuhan4/base-mini-docs/edit/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'AceSteps',
      logo: {
        alt: 'AceSteps Logo',
        src: 'img/logo.svg',
      },
      items: [
        {to: '/get-started/overview', label: 'Get Started', position: 'left'},
        {to: '/music-creation/overview', label: 'Music Creation', position: 'left'},
        {to: '/tokenization/overview', label: 'Tokenization', position: 'left'},
        {to: '/smart-contracts/overview', label: 'Contracts', position: 'left'},
        {to: '/cookbook/create-first-song', label: 'Cookbook', position: 'left'},
        {to: '/learn/welcome', label: 'Learn', position: 'left'},
        {
          href: 'https://github.com/Batuhan4/base-mini-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Get Started', to: '/get-started/overview'},
            {label: 'Cookbook', to: '/cookbook/create-first-song'},
          ],
        },
        {
          title: 'Community',
          items: [
            {label: 'Farcaster', href: 'https://warpcast.com/acesteps'},
            {label: 'Discord', href: 'https://discord.gg/acesteps'},
          ],
        },
        {
          title: 'More',
          items: [
            {label: 'GitHub', href: 'https://github.com/Batuhan4/base-mini-docs'},
            {label: 'Base Network', href: 'https://base.org'},
          ],
        },
      ],
      copyright: `Copyright ${new Date().getFullYear()} AceSteps. Built on Base.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['solidity', 'bash', 'json'],
    },
  },
};

export default config;
```

---

## 1.4 Deliverables Checklist

- [ ] Initialize Docusaurus project
- [ ] Configure TypeScript
- [ ] Set up project structure (folders)
- [ ] Configure docusaurus.config.ts
- [ ] Set up sidebars.ts
- [ ] Add basic styling (custom.css)
- [ ] Configure dark theme as default
- [ ] Set up GitHub repository connection
- [ ] Add placeholder pages for each section
- [ ] Test local development server

---

## 1.5 Dependencies

```json
{
  "dependencies": {
    "@docusaurus/core": "^3.6.0",
    "@docusaurus/preset-classic": "^3.6.0",
    "@mdx-js/react": "^3.0.0",
    "clsx": "^2.0.0",
    "prism-react-renderer": "^2.3.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "@docusaurus/module-type-aliases": "^3.6.0",
    "@docusaurus/tsconfig": "^3.6.0",
    "@docusaurus/types": "^3.6.0",
    "typescript": "~5.6.2"
  }
}
```

---

## 1.6 Success Criteria

1. Documentation site runs locally at `localhost:3000`
2. Dark theme enabled by default
3. Navigation structure matches Base docs pattern
4. All placeholder pages accessible
5. Sidebar properly configured
6. Build completes without errors
