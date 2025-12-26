---
sidebar_position: 4
title: Architecture
description: Technical architecture of the AceSteps platform
---

# Architecture

Understanding the technical architecture of AceSteps - a comprehensive look at how AI music generation, blockchain tokenization, and decentralized trading come together.

## System Overview

```
┌────────────────────────────────────────────────────────────────┐
│                        FRONTEND                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │   React     │  │   Wagmi     │  │  Farcaster SDK          │ │
│  │   + Vite    │  │   + Viem    │  │  Mini App Connector     │ │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────────┐
│                        BACKEND                                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │  API Server │  │  ACE-Step   │  │   IPFS Gateway          │ │
│  │  + Signing  │  │  3.5B Model │  │   Pinata/Lighthouse     │ │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────────┐
│                     BASE NETWORK (L2)                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────────┐ │
│  │ SongNFT  │  │SongVault │  │SongToken │  │SongRevenueHook │ │
│  │ ERC-721  │  │  Locker  │  │ ERC-20   │  │  Uniswap V4    │ │
│  └──────────┘  └──────────┘  └──────────┘  └────────────────┘ │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   UNISWAP V4 POOLS                        │  │
│  │     Concentrated Liquidity  |  Hooks  |  donate()         │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
```

---

## Tech Stack Overview

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Blockchain** | Base (Ethereum L2) | Low fees, fast transactions |
| **DEX** | Uniswap V4 | Trading, liquidity, revenue distribution |
| **NFT Standard** | ERC-721 | Song ownership |
| **Token Standard** | ERC-20 | Fractional shares |
| **AI Model** | ACE-Step 3.5B | Music generation |
| **Platform** | Farcaster Mini App | Social + Mobile native |
| **Frontend** | React 18 + TypeScript | User interface |
| **Wallet** | Wagmi + Viem | Blockchain interactions |
| **Storage** | IPFS | Decentralized metadata and audio |

---

## Why Base Network?

Base is the optimal choice for AceSteps due to its unique combination of low costs, speed, and distribution potential.

### Key Advantages

| Feature | Specification | Benefit |
|---------|--------------|---------|
| **Transaction Cost** | ~$0.01 per tx | Affordable for all users |
| **Block Time** | 2 seconds | Near-instant confirmations |
| **Security** | Ethereum L2 | Full Ethereum security model |
| **Distribution** | 100M+ Coinbase users | Massive potential audience |

### Technical Benefits

```
┌─────────────────────────────────────────────────────────┐
│                   BASE NETWORK                           │
│                                                          │
│   ┌─────────────┐    ┌─────────────┐    ┌────────────┐  │
│   │   LOW GAS   │    │    FAST     │    │   SECURE   │  │
│   │   ~$0.01    │    │  2s blocks  │    │  ETH L2    │  │
│   └─────────────┘    └─────────────┘    └────────────┘  │
│                                                          │
│         ┌──────────────────────────────────┐            │
│         │    COINBASE DISTRIBUTION         │            │
│         │    100M+ Users via Smart Wallet  │            │
│         └──────────────────────────────────┘            │
└─────────────────────────────────────────────────────────┘
```

### Why Not Other Chains?

| Chain | Issue for AceSteps |
|-------|-------------------|
| Ethereum Mainnet | Gas fees too high ($5-50+) |
| Polygon | Less institutional backing |
| Arbitrum | Smaller consumer ecosystem |
| Solana | Different security model |

**Base provides the perfect balance**: Ethereum security, Coinbase distribution, and sub-cent transaction costs.

---

## Why Uniswap V4 Hooks?

AceSteps leverages Uniswap V4's revolutionary hooks system for automatic, trustless revenue distribution - a novel application that sets us apart from traditional NFT platforms.

### The Innovation: Revenue Hooks

```
┌─────────────────────────────────────────────────────────────────┐
│                    TRADITIONAL PLATFORMS                         │
│                                                                  │
│   Ad Revenue → Platform → Manual Distribution → Token Holders    │
│                    ↓                                             │
│            Trust Required | Delays | Gas Costs                   │
└─────────────────────────────────────────────────────────────────┘

                              vs

┌─────────────────────────────────────────────────────────────────┐
│                    ACESTEPS + UNISWAP V4                         │
│                                                                  │
│   Ad Revenue → SongRevenueHook → donate() → Pool Liquidity      │
│                    ↓                                             │
│         Automatic | Trustless | Token Price Increases            │
└─────────────────────────────────────────────────────────────────┘
```

### How It Works

1. **Ad revenue generated** from song plays
2. **Revenue flows to hook** contract automatically
3. **Hook calls `donate()`** adding ETH to Uniswap pool
4. **Pool liquidity increases** instantly
5. **Token price rises** - all holders benefit

### Key Benefits

| Feature | Description |
|---------|-------------|
| **Automatic** | No manual claiming or distributions |
| **Trustless** | Smart contract enforced, no intermediaries |
| **Instant** | Price impact immediate upon revenue |
| **Gas Efficient** | Single transaction for all holders |
| **Transparent** | All flows visible on-chain |

### Technical Implementation

```solidity
// SongRevenueHook - Simplified concept
function depositRevenue(uint256 tokenId) external payable {
    // Revenue flows directly to pool via donate()
    poolManager.donate(poolKey, amount0, amount1, "");

    // Token price increases automatically
    // All token holders benefit proportionally
}
```

---

## Why Farcaster?

Farcaster provides the ideal distribution channel for AceSteps - a crypto-native social network with engaged users ready for Web3 applications.

### Platform Advantages

```
┌─────────────────────────────────────────────────────────────────┐
│                      FARCASTER ECOSYSTEM                         │
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │  DECENTRALIZED  │  │  CRYPTO-NATIVE  │  │   MINI APPS     │  │
│  │  User-owned     │  │  Wallet-first   │  │  Mobile-ready   │  │
│  │  data & identity│  │  users          │  │  distribution   │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              WARPCAST - Primary Client                    │   │
│  │         600K+ DAU  |  Growing Fast  |  High Engagement    │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### Why Farcaster Over Web2 Social?

| Aspect | Web2 Social | Farcaster |
|--------|-------------|-----------|
| **Users** | Need onboarding to crypto | Already crypto-native |
| **Wallets** | Friction to connect | Built-in wallet support |
| **Payments** | External integration | Native token transfers |
| **Data** | Platform-owned | User-owned |
| **Distribution** | Algorithm-controlled | Community-driven |

### Mini App Integration

```typescript
// Farcaster SDK integration
import { sdk } from '@farcaster/miniapp-sdk';

// Signal app readiness
sdk.actions.ready();

// Access user context
const context = await sdk.context;
const userAddress = context.user.verifiedAddresses[0];

// Native wallet connection via Mini App connector
import { farcasterMiniApp } from '@farcaster/miniapp-wagmi-connector';
```

### Growth Metrics

- **Daily Active Users**: 600K+ and growing
- **User Quality**: High-value crypto natives
- **Engagement**: Strong community interaction
- **Developer Ecosystem**: Active Mini App development

---

## Security Features

AceSteps implements multiple layers of security to protect users, creators, and the platform.

### Security Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     SECURITY LAYERS                              │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  LAYER 1: SIGNATURE-BASED MINTING                        │    │
│  │  Only AI-generated music can be minted                   │    │
│  │  ECDSA signatures from platform signer                   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                   │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  LAYER 2: REPLAY ATTACK PREVENTION                       │    │
│  │  usedSignatures mapping tracks all used signatures       │    │
│  │  Each signature can only be used once                    │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                   │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  LAYER 3: REENTRANCY PROTECTION                          │    │
│  │  OpenZeppelin ReentrancyGuard on all external calls      │    │
│  │  Checks-Effects-Interactions pattern                     │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                   │
│                              ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  LAYER 4: EMERGENCY CONTROLS                             │    │
│  │  Pausable contracts for emergency response               │    │
│  │  Owner-only administrative functions                     │    │
│  └─────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### Signature-Based Minting (ECDSA)

This mechanism ensures only AI-generated music can be minted as NFTs:

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  User    │    │ Backend  │    │  Hash    │    │ Contract │
│  Prompt  │───▶│ AI Gen   │───▶│ + Sign   │───▶│  Verify  │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
                                     │
                     ┌───────────────┴───────────────┐
                     │                               │
                     ▼                               ▼
              ┌─────────────┐              ┌─────────────┐
              │ userAddress │              │ Signature   │
              │ metadataURI │              │ (ECDSA)     │
              │ audioHash   │              │             │
              └─────────────┘              └─────────────┘
```

**Flow:**
1. User creates music via AI prompt
2. Backend generates hash: `keccak256(userAddress + metadataURI + audioHash)`
3. Backend signs hash with platform private key
4. User submits to contract with signature
5. Contract recovers signer via `ECDSA.recover()`
6. Verifies against stored `platformSigner` address

### Security Measures Summary

| Protection | Implementation | Threat Mitigated |
|------------|----------------|------------------|
| **ECDSA Signatures** | Platform-signed minting | Unauthorized minting |
| **Signature Tracking** | `usedSignatures` mapping | Replay attacks |
| **ReentrancyGuard** | OpenZeppelin modifier | Reentrancy exploits |
| **Pausable** | Owner-controlled pause | Emergency response |
| **Access Control** | Ownable pattern | Unauthorized admin |
| **Input Validation** | Require checks | Invalid parameters |

### Audit Status

| Phase | Status |
|-------|--------|
| Internal Review | Planned |
| External Audit | Pre-launch requirement |
| Bug Bounty | Post-launch |

---

## Frontend Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.x | UI framework with hooks |
| TypeScript | 5.9 | Type safety and DX |
| Vite | 5.4 | Fast build tooling |
| Wagmi | 2.14 | React hooks for Ethereum |
| Viem | 2.21 | TypeScript Ethereum library |
| Farcaster SDK | Latest | Mini App integration |
| React Query | Latest | Server state management |
| Biome | Latest | Linting and formatting |

---

## Backend Services

### API Server

- **RESTful Endpoints**: Music generation, user management
- **Signature Generation**: ECDSA signing for minting
- **Authentication**: Farcaster-based identity

### ACE-Step AI Model

- **Model Size**: 3.5B parameters
- **Capability**: Full-length song generation
- **Input**: Text prompts with style/genre tags
- **Output**: High-quality audio files

### IPFS Storage

- **Metadata**: JSON with song attributes
- **Audio Files**: Generated music storage
- **Providers**: Pinata, Lighthouse, or self-hosted

---

## Smart Contract Layer

Four core contracts deployed on Base:

| Contract | Standard | Purpose |
|----------|----------|---------|
| **SongNFT** | ERC-721 | Song ownership, signature minting |
| **SongVault** | Custom | Permanent NFT locking for trading |
| **SongToken** | ERC-20 | Fractional ownership tokens |
| **SongRevenueHook** | Uniswap V4 | Automatic revenue distribution |

See [Smart Contracts Overview](/smart-contracts/overview) for detailed documentation.

---

## Data Flow Diagrams

### Music Creation Flow

```
┌──────┐    ┌─────────┐    ┌──────────┐    ┌───────┐    ┌──────┐
│ User │───▶│ Prompt  │───▶│ ACE-Step │───▶│ Audio │───▶│ IPFS │
└──────┘    └─────────┘    └──────────┘    └───────┘    └──────┘
                                                            │
                                                            ▼
                                                     ┌────────────┐
                                                     │ MetadataURI│
                                                     └────────────┘
```

### Minting Flow

```
┌──────┐    ┌─────────┐    ┌───────────┐    ┌──────────┐    ┌─────────┐
│ User │───▶│ Request │───▶│  Backend  │───▶│ Signature│───▶│ SongNFT │
└──────┘    │  Mint   │    │  Signs    │    │  Verify  │    │ Minted  │
            └─────────┘    └───────────┘    └──────────┘    └─────────┘
```

### Trading Flow

```
┌──────────┐    ┌───────────┐    ┌───────────┐    ┌────────────┐
│  Enable  │───▶│   NFT     │───▶│  Tokens   │───▶│  Uniswap   │
│  Trading │    │  Locked   │    │  Minted   │    │  Pool Live │
└──────────┘    └───────────┘    └───────────┘    └────────────┘
                     │                │
                     ▼                ▼
              ┌───────────┐    ┌───────────┐
              │ SongVault │    │ 80K → Creator
              │ (Forever) │    │ 20K → Pool   │
              └───────────┘    └───────────┘
```

### Revenue Flow

```
┌───────────┐    ┌────────────┐    ┌───────────┐    ┌────────────┐
│    Ad     │───▶│  Revenue   │───▶│  donate() │───▶│   Token    │
│  Plays    │    │   Hook     │    │  to Pool  │    │  Price Up  │
└───────────┘    └────────────┘    └───────────┘    └────────────┘
```

---

## Related Documentation

- [Smart Contracts Overview](/smart-contracts/overview) - Detailed contract documentation
- [How It Works](/learn/how-it-works) - User-focused explanation
- [Token Economics](/learn/tokenomics) - Tokenization model
- [Installation](/get-started/installation) - Development setup
