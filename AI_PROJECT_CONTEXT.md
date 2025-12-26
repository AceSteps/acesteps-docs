# Music-Fi Project Context for AI Agents

## Project Overview
**Name:** Music-Fi (ACE-Step)
**Type:** Decentralized Music Streaming & Creation Platform (Spotify + Web3)
**Platform:** Farcaster Mini-app on Base Network
**Core Value Prop:** AI-powered music generation, fractional song ownership via NFTs, and on-chain revenue sharing.

## Tech Stack

### Frontend
- **Framework:** React + Vite
- **Integration:** Farcaster Miniapp SDK (`@farcaster/miniapp-sdk`)
- **Styling:** CSS Modules / Standard CSS
- **Web3:** Wagmi + Viem + TanStack Query
- **Path:** `acestep/frontend/`

### Backend
- **Framework:** Python (FastAPI)
- **Database:** Supabase (PostgreSQL) + Storage (for Audio)
- **AI Inference:** Modal (Serverless GPU) running ACE-Step 3.5B model
- **Path:** `acestep/backend/`

### Blockchain
- **Network:** Base (Sepolia Testnet / Mainnet)
- **Framework:** Foundry
- **Contracts:** Solidity (OpenZeppelin + Uniswap V4)
- **Path:** `acestep/blockchain/`

## Key Architecture Components

### 1. AI Music Generation (`acestep/backend`)
- **Entry Point:** `api/main.py`
- **Flow:**
    1.  User requests generation (`POST /api/generate`).
    2.  Job is queued in Supabase.
    3.  FastAPI triggers Modal webhook.
    4.  Modal function (`modal/ace_step_gpu.py`) generates audio on A10G GPU.
    5.  Audio uploaded to Supabase Storage.
    6.  Frontend polls status.
- **Features:** Text-to-Audio, Lyrics generation (Llama-Song-Stream-3B), Style presets.

### 2. Blockchain & Tokenomics (`acestep/blockchain`)
- **SongNFT (`SongNFT.sol`):** ERC-721 contract for songs. Artists mint these.
- **SongVault (`SongVault.sol`):** 
    -   Locks the `SongNFT` permanently.
    -   Deploys a `SongToken` (ERC-20) representing fractional ownership.
    -   Creates a Uniswap V4 Pool (SongToken/ETH).
    -   Adds initial liquidity (single-sided).
- **SongToken (`SongToken.sol`):** ERC-20 token for fractional shares.
- **SongRevenueHook (`SongRevenueHook.sol`):** Uniswap V4 Hook that distributes platform revenue to song pools via `donate()`.

### 3. Frontend Experience (`acestep/frontend`)
- **Entry Point:** `src/App.tsx` & `src/main.tsx`
- **Navigation:**
    -   **Home:** Discovery & Trending.
    -   **Search:** Find songs/artists.
    -   **Library:** User's playlists & liked songs.
    -   **Creator Studio:** AI music generation interface.
    -   **NFT Portfolio:** Manage owned song shares.
- **Player:** Global `MiniPlayer` and full-screen `NowPlayingScreen`.

## Critical Files & Directories

| Path | Description |
| :--- | :--- |
| `acestep/backend/api/main.py` | Main backend API application. |
| `acestep/backend/modal/ace_step_gpu.py` | GPU inference code for music generation. |
| `acestep/blockchain/src/SongVault.sol` | Core logic for NFT locking and tokenization. |
| `acestep/blockchain/src/SongRevenueHook.sol` | Revenue distribution logic. |
| `acestep/frontend/src/App.tsx` | Main frontend component and routing. |
| `acestep/frontend/src/screens/` | UI Screens (CreatorStudio, NFTPortfolio, etc.). |
| `drafts/project-overview.md` | High-level project vision (in Turkish). |

## Current Status
- **Backend:** Fully implemented generation flow (API + Modal).
- **Blockchain:** Contracts implemented (Vault, NFT, Hook) and deployed to Base Sepolia.
- **Frontend:** UI structure exists (Screens, Components), Wagmi setup is present.

## Instructions for AI Agents
1.  **Context First:** Always check `AI_PROJECT_CONTEXT.md` (this file) to understand the system map.
2.  **Conventions:** Follow the existing project structure.
    -   Python: PEP 8, Pydantic for models.
    -   Solidity: Foundry tests, OpenZeppelin standards.
    -   React: Functional components, Hooks, CSS modules.
3.  **Deployment:**
    -   Backend: `python run.py` (Local), Modal deploy for GPU.
    -   Blockchain: `forge script script/Deploy.s.sol`.
    -   Frontend: `npm run dev`.
