---
sidebar_position: 2
title: How It Works
description: Understanding the AceSteps platform mechanics
---

# How It Works

A comprehensive guide to understanding the AceSteps platform.

## The Journey

```
┌─────────────────────────────────────────────────────────────────┐
│                     THE ACESTEPS JOURNEY                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   CREATE         OWN           SHARE          EARN              │
│     ↓             ↓              ↓              ↓               │
│  ┌─────┐      ┌─────┐       ┌─────┐       ┌─────┐              │
│  │ AI  │  →   │ NFT │   →   │Token│   →   │ $$$│              │
│  │Music│      │Mint │       │Trade│       │Revenue│            │
│  └─────┘      └─────┘       └─────┘       └─────┘              │
│                                                                  │
│  Text prompt   Blockchain    Uniswap V4    Ad revenue           │
│  to audio      ownership     trading       + appreciation       │
└─────────────────────────────────────────────────────────────────┘
```

## Stage 1: CREATE

### AI Music Generation

Anyone can create professional music using text prompts:

```
"chill lofi beat with rain sounds and soft piano"
```

**What Happens:**

1. Your prompt is sent to ACE-Step AI (3.5B parameter model)
2. AI generates unique audio in ~4.5 seconds
3. You preview and refine until satisfied
4. No musical training required

### Why This Matters

- **Democratized Creation** - No expensive equipment or training needed
- **Copyright-Free** - 100% original, AI-generated content
- **Apache 2.0 Licensed** - Full commercial rights

## Stage 2: OWN

### NFT Minting

When you save a song, it becomes an ERC-721 NFT:

```
Your Song → IPFS Storage → Metadata URI → NFT Mint
               ↓                ↓             ↓
           Audio file     JSON metadata   Token ID
```

**What's Stored:**

| On-Chain | Off-Chain (IPFS) |
|----------|------------------|
| Token ID | Audio file |
| Owner address | Cover image |
| Metadata URI | Song metadata |
| Audio hash | Prompt used |

### Signature Verification

Only platform-generated AI music can be minted:

```
Backend signs: hash(userAddress + metadataURI + audioHash)
Contract verifies: ECDSA.recover() == platformSigner
```

This prevents:
- Uploading copyrighted music
- Piracy and infringement
- Fraudulent minting

## Stage 3: SHARE

### Publishing

Making your song discoverable:

1. Select song from Library
2. Click "Publish"
3. Song appears on platform
4. Play tracking begins

### Tokenization (Enable Trading)

Convert your NFT into tradeable tokens:

```
┌─────────────────────────────────────────────────────────────┐
│                    TOKENIZATION FLOW                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   NFT                    SongVault                          │
│    │                         │                               │
│    └──── Transfer ───────────▶│                              │
│                               │                               │
│                               ▼                               │
│                     Deploy SongToken                          │
│                     (100,000 tokens)                          │
│                               │                               │
│              ┌────────────────┼────────────────┐              │
│              │                │                │              │
│              ▼                ▼                ▼              │
│         Creator          Uniswap V4      Trading             │
│         80,000             20,000         Begins!            │
│         tokens             tokens                            │
└─────────────────────────────────────────────────────────────┘
```

### Why Permanent Lock?

Due to AMM mathematics (x * y = k):

- Price increases exponentially as tokens decrease
- Acquiring 100% requires infinite ETH
- This is a **feature**, not a bug

Benefits:
- Permanent liquidity
- Continuous trading
- No rug pulls possible

## Stage 4: EARN

### Revenue Sources

**For Non-Tokenized Songs:**

| Source | Creator | Platform |
|--------|---------|----------|
| Ad Revenue | 80% | 20% |

Payment: Direct to wallet (ETH/USDC)

**For Tokenized Songs:**

| Source | Distribution | Platform |
|--------|--------------|----------|
| Ad Revenue | 80% → Pool | 20% |
| Swap Fees | LP Position | 1% per swap |

### The Revenue Hook

Uniswap V4's `donate()` function adds revenue to pools:

```
Ad Revenue Collected
        ↓
   80% to Pool via donate()
        ↓
   ETH added to reserves
        ↓
   Token price increases
        ↓
   All holders benefit
```

### Value Appreciation Example

```
Initial State:
  Pool: 1 ETH + 20,000 tokens
  Price: 0.00005 ETH/token

Revenue Distribution (0.5 ETH):
  Pool share: 0.4 ETH (80%)

After donate():
  Pool: 1.4 ETH + 20,000 tokens
  Price: 0.00007 ETH/token (+40%)
```

## Revenue Flow Visualization

```
                    ┌────────────────────┐
                    │   Ad Revenue       │
                    │   from Streaming   │
                    └─────────┬──────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               ▼               ▼
         80% Share       20% Share       1% Swap Fee
              │               │               │
              ▼               ▼               ▼
    ┌─────────────────┐ ┌─────────────┐ ┌─────────────┐
    │ Uniswap Pool    │ │  Platform   │ │   Platform  │
    │ (Token Holders) │ │  Treasury   │ │   Revenue   │
    └─────────────────┘ └─────────────┘ └─────────────┘
              │
              ▼
    Token Price Increases
    (All holders benefit)
```

## The Complete Picture

### For Creators

1. **Create** - Generate AI music with prompts
2. **Save** - Mint as NFT (owned in wallet)
3. **Publish** - Make visible, start earning
4. **Tokenize** - Enable trading, get 80% of tokens
5. **Earn** - Revenue flows continuously

### For Fans/Investors

1. **Discover** - Browse trending songs
2. **Listen** - Stream like any platform
3. **Invest** - Buy tokens of songs you believe in
4. **Earn** - Song popularity → revenue → price rise
5. **Trade** - Sell anytime on Uniswap

## Why AceSteps is Different

### vs Traditional Music Industry

| Aspect | Traditional | AceSteps |
|--------|-------------|----------|
| Revenue Share | Label: 80%+ | Creator: 80% |
| Entry Barrier | High ($$, skills) | Zero |
| Ownership | Label owns | Creator owns |
| Fan Investment | None | Direct |

### vs Other Web3 Music Platforms

| Feature | Others | AceSteps |
|---------|--------|----------|
| Copyright Risk | High | Zero |
| Content Moderation | Required | None needed |
| Decentralization | Partial | True |
| Revenue Model | Manual | Automatic |

## Related

- [Tokenomics](/learn/tokenomics)
- [FAQ](/learn/faq)
- [Architecture](/get-started/architecture)
