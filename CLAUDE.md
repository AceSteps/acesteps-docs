# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Music-Fi (ACE-Step) is an AI-powered music creation and tokenization platform built as a Farcaster Mini App on Base Network (chainId: 8453). Users can:
- Create music via AI prompts
- Mint songs as NFTs (ERC-721)
- Enable fractional ownership via ERC-20 tokens
- Trade song shares on Uniswap V4
- Earn from ad revenue distributed on-chain

## Commands

All frontend commands run from `acestep/frontend/`:

```bash
npm run dev      # Start Vite dev server (http://localhost:5173)
npm run build    # TypeScript compilation + Vite production build
npm run lint     # Biome linting on src/
npm run preview  # Preview production build
```

ACE-Step music generation tests (Python) from `acestep/test-acestep/`:
```bash
pip install -r requirements.txt
python test_acestep.py
```

## Architecture

### Frontend Structure (`acestep/frontend/src/`)

**Entry Point:** `main.tsx` sets up providers (WagmiProvider → QueryClientProvider → App)

**App.tsx** is the orchestrator managing:
- Active tab state (home, search, library, nfts)
- Playback state (isPlaying, progress, currentTrackIndex)
- Screen navigation and overlay visibility (NowPlayingScreen, NFTAssetDetailScreen)

**Screen Components** (`screens/`):
- `HomeScreen` - Discovery feed with NFT charts and music carousel
- `SearchScreen` - Music search and marketplace
- `LibraryScreen` - User's saved songs/playlists
- `NFTPortfolioScreen` - NFT investments with portfolio value display
- `NFTAssetDetailScreen` - Individual NFT asset view (overlay)
- `NowPlayingScreen` - Full-screen player with NFT buy button (overlay)

**Shared Components** (`components/`):
- `Header` - Profile, notifications, search trigger
- `BottomNav` - 4-tab navigation
- `MiniPlayer` - Compact player bar above bottom nav
- `AlbumCard`, `CardCarousel`, `NftChartCard` - Display components

### Blockchain Integration

**Network:** Base Chain (Ethereum L2)
**DEX:** Uniswap V4
**Token Standard:** ERC-20 (song shares)
**NFT Standard:** ERC-721 (original songs)

**wagmi.ts** configures:
- Chains: Base (primary) + Mainnet
- Connector: farcasterMiniApp connector from `@farcaster/miniapp-wagmi-connector`
- Wallet connection ready but not yet integrated into UI

**Farcaster SDK:** `sdk.actions.ready()` called on mount to signal app readiness

### Smart Contract Architecture (`acestep/blockchain/`)

| Contract | Standard | Purpose |
|----------|----------|---------|
| **SongNFT.sol** | ERC-721 | Main NFT contract for songs. Signature-based minting (only AI-generated music). Stores metadata, isPublished, isTradeable, linkedToken address |
| **SongVault.sol** | - | Permanently locks NFTs when trading is enabled. No unlock mechanism (AMM math makes 100% buyback impossible). Manages token minting |
| **SongToken.sol** | ERC-20 | Fractional ownership tokens. Fixed supply: 100,000 tokens per song (18 decimals) |
| **SongRevenueHook.sol** | Uniswap V4 Hook | Adds ad revenue to pool via donate(). Handles afterSwap for fee tracking |

**Signature-Based Minting Flow:**
1. Backend holds private key (secret)
2. When user creates AI music, backend creates hash: (userAddress + metadataURI + audioHash)
3. Backend signs hash → produces signature
4. User calls mint() with metadataURI, audioHash, signature
5. Contract verifies via ECDSA.recover() against platformSigner
6. usedSignatures mapping prevents replay attacks

**Token Distribution (per song):**
| Recipient | Amount | Percentage |
|-----------|--------|------------|
| Creator | 80,000 tokens | 80% |
| Uniswap V4 Pool | 20,000 tokens | 20% |

**Uniswap V4 Pool Parameters:**
- Token Pair: SONG_TOKEN / ETH (native)
- Fee Tier: 1% (10000 bps)
- Tick Spacing: 60
- Initial Liquidity: Single-sided (0 ETH + 20,000 TOKEN)

### User Flows

**Music Creation:**
1. User enters prompt (e.g., "chill lofi beat with rain sounds")
2. AI generates music with preview
3. User clicks "Save" → NFT minted (isPublished: false)
4. Song added to user's library

**Publishing:**
1. User selects song from library
2. Clicks "Publish" → isPublished: true
3. Song visible on platform, listens tracked, ad revenue starts

**Enable Trading:**
1. Creator clicks "Enable Trading"
2. NFT permanently locked in SongVault
3. 100,000 ERC-20 tokens minted
4. 80,000 → Creator wallet
5. 20,000 → Uniswap V4 pool (single-sided, 0 ETH)
6. Trading begins

### Revenue Model

**Non-Tokenized Songs (NFT held directly):**
- 80% ad revenue → NFT owner (off-chain ETH/USDC payment)
- 20% → Platform

**Tokenized Songs (NFT locked, tokens exist):**
- 80% ad revenue → Uniswap pool via on-chain donate()
- 20% → Platform
- Token price increases as ETH added to pool
- All token holders benefit from price appreciation

**Platform Revenue:**
- 20% of all ad revenue
- 1% swap fee (platform owns LP position)

### Project Directories

```
acestep/
├── frontend/        # React/TypeScript app (Vite)
├── backend/         # Backend API (placeholder)
├── blockchain/      # Smart contracts
│   └── docs/        # PRD and blockchain documentation
└── test-acestep/    # Python tests for ACE-Step music generation
drafts/
├── docs/            # UI/UX documentation and specs
└── design/          # Design reference images
```

## Key Technologies

- **Framework:** React 18 + TypeScript 5.9 + Vite 5.4
- **Blockchain:** Wagmi 2.14 + Viem 2.21 (Base Network)
- **Smart Contracts:** Solidity, OpenZeppelin (ERC-721, ERC-20), Uniswap V4 Hooks
- **DEX:** Uniswap V4 (concentrated liquidity, hooks, donate())
- **Mini App:** @farcaster/miniapp-sdk, @farcaster/miniapp-wagmi-connector
- **State:** React Query (installed, not yet utilized)
- **Linting:** Biome (strict mode, 120 char line width, space indentation)

## Git Conventions

- Do NOT add Co-Authored-By lines in commit messages
- Do NOT add "Generated with Claude Code" footer in commits
- Keep commit messages clean and focused on the changes only

## Development Notes

- Environment variable `VITE_WC_PROJECT_ID` in `.env.local` for WalletConnect
- Farcaster manifest at `public/.well-known/farcaster.json` (needs configuration)
- CSS files are co-located with components and imported in App.tsx
- Mock data is inline (playlist in App.tsx, assets in screens)

## Documentation References

- `acestep/blockchain/docs/PRD.md` - Full PRD with smart contract specs, tokenomics, and user flows
- `AI-PROMPTS-PREPARATION.md` - Claude Code prompt templates for Base/OnchainKit
- `drafts/docs/TECH_STACK.md` - Detailed tech stack breakdown
- `drafts/docs/USER_FLOW_DIAGRAM.md` - Comprehensive user flows
- LLMs.txt: `@https://docs.base.org/onchainkit/llms.txt`

## Development Phases

1. **Core Infrastructure:** SongNFT.sol, AI music integration, IPFS metadata, basic UI
2. **Tokenization:** SongVault.sol, SongToken factory, Uniswap V4 pool creation, Trading UI
3. **Revenue System:** SongRevenueHook.sol, ad system integration, donate() mechanism, analytics
4. **Launch:** Security audit, testnet → mainnet deployment
