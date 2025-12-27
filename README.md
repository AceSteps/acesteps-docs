<div align="center">

# AceSteps Documentation

### AI-Powered Music Creation & Tokenization Platform

[![Built with Docusaurus](https://img.shields.io/badge/Built%20with-Docusaurus-3ECC5F?style=for-the-badge&logo=docusaurus&logoColor=white)](https://docusaurus.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Built on Base](https://img.shields.io/badge/Built%20on-Base-0052FF?style=for-the-badge&logo=coinbase&logoColor=white)](https://base.org)
[![Farcaster](https://img.shields.io/badge/Farcaster-8A63D2?style=for-the-badge&logo=farcaster&logoColor=white)](https://warpcast.com/acesteps)

[**Live Documentation**](https://acesteps-docs-b8j30poou-efes-projects-42ddc5f6.vercel.app) · [**Pitch Deck**](https://acesteps-docs-b8j30poou-efes-projects-42ddc5f6.vercel.app/pitch-deck.html) · [**Website**](https://acesteps.com) · [**Farcaster**](https://warpcast.com/acestep)

---

<img src="static/img/acesteps-banner.png" alt="AceSteps Banner" width="100%" />

</div>

## What is AceSteps?

**AceSteps** is a revolutionary platform that combines AI music generation with blockchain tokenization. Create music by simply describing what you want, mint it as an NFT, and let fans invest in your success through tradeable song tokens.

```
Create music like prompting ChatGPT → Own it like NFTs → Trade it like stocks
```

### The Innovation

- **Zero Copyright Risk** — All music is AI-generated using Apache 2.0 licensed models
- **True Decentralization** — No uploads = No moderation = No centralized control
- **Automatic Revenue** — Uniswap V4 hooks distribute ad revenue to all token holders

---

## Documentation Sections

| Section | Description |
|---------|-------------|
| [**Get Started**](https://docs.acesteps.xyz/get-started/overview) | Platform overview, quickstart guide, and core concepts |
| [**Music Creation**](https://docs.acesteps.xyz/music-creation/overview) | AI music generation with ACE-Step model |
| [**Tokenization**](https://docs.acesteps.xyz/tokenization/overview) | NFT minting and ERC-20 token creation |
| [**Smart Contracts**](https://docs.acesteps.xyz/smart-contracts/overview) | Contract architecture and integration guides |
| [**Trading**](https://docs.acesteps.xyz/trading/overview) | Uniswap V4 pools and revenue distribution |
| [**Farcaster**](https://docs.acesteps.xyz/farcaster/overview) | Mini App integration and social features |
| [**Cookbook**](https://docs.acesteps.xyz/cookbook/create-first-song) | Step-by-step tutorials |
| [**API Reference**](https://docs.acesteps.xyz/api-reference/overview) | Backend API and contract ABIs |

---

## Tech Stack

<table>
<tr>
<td align="center" width="96">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="48" height="48" alt="React" />
<br>React 19
</td>
<td align="center" width="96">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" width="48" height="48" alt="TypeScript" />
<br>TypeScript
</td>
<td align="center" width="96">
<img src="https://docusaurus.io/img/docusaurus.svg" width="48" height="48" alt="Docusaurus" />
<br>Docusaurus 3
</td>
<td align="center" width="96">
<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/solidity/solidity-original.svg" width="48" height="48" alt="Solidity" />
<br>Solidity
</td>
</tr>
</table>

### Platform Technologies

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Blockchain** | Base (Ethereum L2) | Low fees, fast transactions |
| **DEX** | Uniswap V4 | Trading & revenue distribution via hooks |
| **AI Model** | ACE-Step 3.5B | Music generation (Apache 2.0) |
| **Platform** | Farcaster Mini App | Social-native distribution |
| **Storage** | IPFS | Decentralized metadata & audio |

---

## Quick Start

### Prerequisites

- Node.js 20.0 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/AceSteps/acesteps-docs.git
cd acesteps-docs

# Install dependencies
npm install

# Start development server
npm start
```

The documentation will be available at `http://localhost:3000`.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run serve` | Preview production build locally |
| `npm run clear` | Clear Docusaurus cache |
| `npm run typecheck` | Run TypeScript type checking |

---

## Project Structure

```
acesteps-docs/
├── docs/                    # Documentation content (MDX)
│   ├── get-started/         # Getting started guides
│   ├── music-creation/      # AI music generation docs
│   ├── tokenization/        # NFT & token docs
│   ├── smart-contracts/     # Contract documentation
│   ├── trading/             # Trading & revenue docs
│   ├── farcaster/           # Farcaster integration
│   ├── cookbook/            # Step-by-step tutorials
│   ├── learn/               # Educational content
│   └── api-reference/       # API documentation
├── src/
│   ├── css/                 # Custom styles
│   └── components/          # React components
├── static/                  # Static assets (images, fonts)
├── docusaurus.config.ts     # Docusaurus configuration
└── sidebars.ts              # Sidebar navigation
```

---

## Features

### Documentation Features

- **Local Search** — Fast, offline-capable search with Cmd+K
- **Dark/Light Mode** — Automatic theme detection with manual toggle
- **Code Highlighting** — Syntax highlighting for Solidity, TypeScript, and more
- **Live Code Blocks** — Interactive code examples
- **Responsive Design** — Mobile-first, works on all devices

### Modern UI

- **Gradient Links** — Animated blue-to-purple gradient links
- **Glassmorphism** — Frosted glass effects on cards and alerts
- **Smooth Animations** — Page transitions, hover effects, micro-interactions
- **GitHub Icon** — Clean icon-based navigation

---

## Contributing

We welcome contributions! Here's how you can help:

### Reporting Issues

1. Check [existing issues](https://github.com/AceSteps/acesteps-docs/issues) first
2. Create a detailed bug report with:
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

### Making Changes

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test locally: `npm run build`
5. Commit: `git commit -m 'feat: Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation changes |
| `style` | Code style changes (formatting) |
| `refactor` | Code refactoring |
| `chore` | Maintenance tasks |

---

## Deployment

The documentation is automatically deployed to [docs.acesteps.xyz](https://docs.acesteps.xyz) via GitHub Actions on push to `main`.

### Manual Deployment

```bash
# Build the site
npm run build

# The build output is in the `build/` directory
# Deploy to any static hosting service
```

---

## Related Resources

- **[AceSteps Website](https://acesteps.xyz)** — Main platform
- **[Farcaster](https://warpcast.com/acesteps)** — Follow for updates
- **[Twitter/X](https://x.com/acesteps)** — Announcements
- **[Base Network](https://base.org)** — Blockchain network

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### Built with love on Base

[![Base](https://img.shields.io/badge/Base-0052FF?style=for-the-badge&logo=coinbase&logoColor=white)](https://base.org)
[![Uniswap](https://img.shields.io/badge/Uniswap_V4-FF007A?style=for-the-badge&logo=uniswap&logoColor=white)](https://uniswap.org)
[![Farcaster](https://img.shields.io/badge/Farcaster-8A63D2?style=for-the-badge&logo=farcaster&logoColor=white)](https://farcaster.xyz)

**[Live Docs](https://acesteps-docs-b8j30poou-efes-projects-42ddc5f6.vercel.app)** · **[Pitch Deck](https://acesteps-docs-b8j30poou-efes-projects-42ddc5f6.vercel.app/pitch-deck.html)**

</div>
