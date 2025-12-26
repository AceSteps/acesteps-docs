---
sidebar_position: 3
title: FAQ
description: Frequently asked questions about AceSteps
---

# Frequently Asked Questions

Everything you need to know about AceSteps - from creating your first AI-generated song to understanding tokenomics and revenue sharing.

---

## General Questions

### What is AceSteps?

AceSteps is an AI-powered music creation and tokenization platform built on Base Network. It combines three powerful capabilities:

1. **AI Music Generation** - Create original music by simply describing what you want
2. **NFT Ownership** - Mint your creations as ERC-721 NFTs with verifiable on-chain ownership
3. **Fractional Trading** - Enable trading to let fans invest in your music through ERC-20 tokens on Uniswap V4

Think of it as "create music like prompting ChatGPT, own it like NFTs, trade it like stocks."

### How is this different from Spotify or other streaming platforms?

| Feature | Traditional Streaming | AceSteps |
|---------|----------------------|----------|
| **Ownership** | Platform owns distribution rights | You own 100% via NFT |
| **Revenue** | Fractions of a cent per stream | 80% of ad revenue to creators |
| **Fan Participation** | Listen only | Invest and share in success |
| **Transparency** | Black box royalty calculations | All revenue on-chain |
| **Trading** | Not possible | Trade song tokens 24/7 |

On Spotify, artists average $0.003-0.005 per stream with opaque calculations. On AceSteps, you own your music outright, earn 80% of revenue, and can let fans invest alongside you.

### Is it free to use?

**Creating music is completely free** - you can generate unlimited songs using AI.

You only pay:
- **Gas fees** when minting NFTs (~$0.01-0.10 on Base)
- **Gas fees** when enabling trading
- **1% swap fee** when trading tokens

There are no subscription fees, platform fees for creation, or hidden costs.

### What network is AceSteps on?

AceSteps is built on **Base Network** (chainId: 8453), an Ethereum Layer 2 developed by Coinbase.

**Why Base?**
- **Low fees**: Gas costs pennies instead of dollars
- **Fast transactions**: ~2 second block times
- **Ethereum security**: Inherits Ethereum's security guarantees
- **Easy onboarding**: Coinbase users can bridge ETH seamlessly

### Do I need crypto to use AceSteps?

Yes, you need a small amount of ETH on Base for gas fees. Here's the breakdown:

| Action | Cost |
|--------|------|
| Generate music | Free |
| Listen to music | Free |
| Mint as NFT | ~$0.01-0.10 gas |
| Enable trading | ~$0.05-0.20 gas |
| Trade tokens | ~$0.01-0.05 gas + 1% fee |

You can bridge ETH from Ethereum mainnet using the [Base Bridge](https://bridge.base.org) or buy directly through Coinbase.

---

## Copyright & Legal

### Who owns the music I create?

**You own 100% of the music you create**, verified by blockchain-based NFT ownership.

When you mint a song:
- An ERC-721 NFT is created representing full ownership
- The NFT contains metadata linking to your audio
- Ownership is cryptographically proven on-chain
- No platform, label, or third party has any claim

This is true ownership - not a license, not distribution rights, but actual ownership recorded immutably on the blockchain.

### Is there any copyright risk with AI-generated music?

**No copyright risk** - here's why:

1. **Original Generation**: ACE-Step creates genuinely new audio, not remixes or samples
2. **No Training on Copyrighted Works**: The model architecture generates novel patterns
3. **Apache 2.0 Licensed Model**: The AI model itself is open-source with permissive licensing
4. **No Copyright Claims**: AI-generated content doesn't infringe on existing copyrights

You can commercially use, sell, and trade your AI-generated music without worrying about takedown notices or legal issues.

### Can I upload my own music or recordings?

**No** - AceSteps only supports AI-generated music. You cannot upload:
- Your own recordings
- Cover songs
- Remixes of existing tracks
- Any external audio files

This is an intentional design choice, not a limitation.

### Why can't I upload external music?

**This restriction is what makes AceSteps truly decentralized.**

Traditional music platforms face a fundamental problem:
- Users upload copyrighted content
- Platform must moderate and remove infringing content
- This requires centralized control and moderation teams
- Platforms become liable for user uploads

**By only allowing AI-generated music:**
- No copyright infringement is possible
- No moderation is needed
- No centralized control required
- Platform can be fully decentralized
- Smart contracts can operate autonomously

This isn't a bug - it's the core innovation that enables trustless music ownership and trading.

---

## For Creators

### Do I need musical training to create music?

**Absolutely not.** AceSteps is designed for everyone.

You don't need to:
- Read music or understand music theory
- Play any instruments
- Have production experience
- Own expensive software or equipment

Just describe what you want in plain language:
- *"Upbeat electronic dance track with heavy bass drops"*
- *"Calm acoustic guitar melody for studying"*
- *"Epic orchestral piece like a movie soundtrack"*

The AI handles all the musical complexity. Your creativity and vision are what matter.

### How long does music generation take?

**Approximately 4.5 seconds for 30 seconds of audio.**

The ACE-Step model is optimized for speed:
- Text prompt processing: ~0.5 seconds
- Audio generation: ~4 seconds
- Total time: ~4.5 seconds for 30s of music

This is significantly faster than traditional production (hours/days) and most other AI music tools.

### How long are generated songs?

Songs are typically **30-60 seconds**. This is optimized for:
- Quick iteration and experimentation
- Social media sharing
- Initial creative exploration

Longer duration options may be added in future updates.

### What happens when I enable trading on my song?

When you enable trading, the following happens automatically:

1. **NFT Locked Forever** - Your NFT is transferred to the SongVault contract
2. **100,000 Tokens Created** - ERC-20 tokens representing fractional ownership
3. **You Receive 80,000 Tokens** (80%) - Sent directly to your wallet
4. **20,000 Tokens to Pool** (20%) - Added to Uniswap V4 liquidity pool
5. **Trading Begins** - Anyone can buy/sell tokens immediately

After this:
- Ad revenue flows to the Uniswap pool via `donate()`
- Token price rises as ETH accumulates in the pool
- All token holders benefit from the song's success

### Can I get my NFT back after tokenizing?

**No - and this is intentional.**

The NFT is **permanently locked** in the SongVault contract. Here's why this is a feature, not a limitation:

**The Math Problem:**
- 20,000 tokens start in the Uniswap pool
- As people buy tokens, they leave the pool
- To withdraw the NFT, you'd need 100% of tokens
- But tokens are distributed across many wallets
- Collecting all 100,000 tokens is mathematically impractical

**Why This Matters:**
- **Prevents rug pulls**: Creators can't drain liquidity and disappear
- **Protects investors**: Token value is backed by the locked NFT
- **Enables trust**: No centralized party can reverse the tokenization
- **True decentralization**: No admin keys, no special permissions

This permanent lock is what gives investors confidence to participate.

### Can I sell tokens I receive as a creator?

Yes, you can sell your 80,000 tokens at any time on Uniswap. However, consider:

- Selling large amounts will move the price
- Your remaining tokens' value depends on continued success
- Building a loyal fanbase often means holding some tokens
- Token sales are transparent - investors can see creator behavior

---

## For Investors

### How do I make money from song tokens?

Token value increases through a simple mechanism:

1. **Song Gets Popular** - More listeners = more ad impressions
2. **Revenue Generated** - Ads generate ETH revenue
3. **Revenue Added to Pool** - 80% flows to Uniswap via `donate()`
4. **Token Price Rises** - More ETH in pool = higher token price
5. **Sell for Profit** - Trade tokens back to ETH at higher price

**Example:**
- You buy 1,000 tokens for 0.01 ETH
- Song goes viral, ad revenue adds 1 ETH to pool
- Token price increases 10x
- Your 1,000 tokens are now worth 0.1 ETH

### What are the trading fees?

| Fee | Amount | Goes To |
|-----|--------|---------|
| Swap Fee | 1% | Platform (LP position owner) |
| Gas | ~$0.01-0.05 | Network validators |

There are no:
- Hidden fees
- Withdrawal fees
- Deposit fees
- Maintenance fees

### Is it liquid? Can I sell anytime?

**Yes** - tokens trade on Uniswap V4 with 24/7 liquidity.

- **Buy anytime**: Swap ETH for song tokens
- **Sell anytime**: Swap song tokens for ETH
- **No lockups**: No vesting or time restrictions
- **Instant settlement**: Trades execute in ~2 seconds

Liquidity depth depends on pool size - more popular songs have deeper liquidity.

### What's the minimum investment?

There's no minimum. You can buy fractions of tokens worth just a few cents. However, consider:
- Gas fees (~$0.01-0.05) make very small trades inefficient
- Practical minimum: ~$1-5 worth to offset gas costs

### How do I know which songs will be successful?

Look for:
- **Creator reputation**: Established artists with followings
- **Early engagement**: Social shares, playlist additions
- **Quality**: Does the music actually sound good?
- **Genre trends**: What's currently popular?

Remember: This is speculative. Only invest what you can afford to lose.

---

## Technical Questions

### What AI model powers music generation?

AceSteps uses **ACE-Step**, a 3.5 billion parameter music generation model.

**Key specs:**
- **Parameters**: 3.5B
- **License**: Apache 2.0 (open source, commercial use allowed)
- **Speed**: ~4.5 seconds for 30 seconds of audio
- **Quality**: Studio-quality 44.1kHz audio

The Apache 2.0 license ensures the model can be used commercially without restrictions.

### What wallet should I use?

Any Ethereum-compatible wallet works. AceSteps connects through Farcaster's built-in wallet connector.

**Recommended options:**
- **Farcaster Wallet** - Built into Warpcast, seamless experience
- **Coinbase Wallet** - Easy Base integration
- **MetaMask** - Most popular, well-supported
- **Rainbow** - Great mobile experience

### Why Uniswap V4 specifically?

Uniswap V4's **hooks** are essential for our revenue model:

```
Traditional AMM: Swap happens → That's it
Uniswap V4:     Swap happens → Hook triggers → Custom logic executes
```

Our `SongRevenueHook` enables:
- **Automatic revenue distribution** via `donate()` function
- **Fee tracking** through `afterSwap` hooks
- **No manual intervention** - fully automated on-chain

Without V4 hooks, we'd need centralized infrastructure to distribute revenue.

### Are the smart contracts audited?

Audit status will be updated before mainnet launch.

Current security measures:
- **OpenZeppelin contracts** for ERC-721/ERC-20 standards
- **ECDSA signature verification** for minting
- **Replay attack prevention** via used signature tracking
- **No admin keys** for critical functions post-deployment

### Is the code open source?

Yes. All code is available on GitHub:
- **Smart Contracts**: Solidity contracts for NFTs, tokens, vault, and hooks
- **Frontend**: React/TypeScript application
- **Documentation**: This documentation site

Check our [GitHub repository](https://github.com/Batuhan4/acesteps-docs).

### What happens if AceSteps shuts down?

Because AceSteps is built on decentralized infrastructure:

- **Your NFTs remain yours** - Stored on Base blockchain forever
- **Tokens keep trading** - Uniswap pools operate independently
- **Revenue continues** - If ad system integrations remain, revenue flows
- **No platform dependency** - Core functionality lives on-chain

The worst case: no new music generation, but existing assets remain fully functional.

---

## Troubleshooting

### My transaction failed. What do I do?

Common causes:
1. **Insufficient gas** - Add more ETH to your wallet
2. **Slippage too low** - Increase slippage tolerance for swaps
3. **Network congestion** - Wait and retry
4. **Signature expired** - Generate new music and try again

### I don't see my NFT in my wallet

NFTs may not display in all wallets immediately:
1. **Wait a few minutes** - Indexers need time to update
2. **Add manually** - Import the NFT contract address
3. **Check on Base Explorer** - Verify the transaction succeeded
4. **Use OpenSea** - Often indexes NFTs faster

### Music generation keeps failing

Try:
1. **Simplify your prompt** - Complex prompts may timeout
2. **Check your connection** - Ensure stable internet
3. **Clear cache** - Refresh the app
4. **Try different wording** - Some phrases work better than others

---

## Support

### How do I get help?

- **Farcaster**: Follow [@acesteps](https://warpcast.com/acesteps) for updates and community support
- **Twitter/X**: Follow [@acesteps](https://x.com/acesteps) for announcements
- **GitHub**: Open an [issue](https://github.com/Batuhan4/acesteps-docs/issues) for bugs or feature requests

### I found a bug. How do I report it?

1. **Check existing issues** on GitHub first
2. **Create a detailed report** including:
   - What you expected to happen
   - What actually happened
   - Steps to reproduce
   - Wallet address (if relevant)
   - Transaction hash (if applicable)

### Can I contribute to the project?

Yes! AceSteps is open source. You can:
- Submit pull requests
- Report bugs
- Suggest features
- Improve documentation
- Help other users on Farcaster

---

## Related Resources

- [How It Works](/learn/how-it-works) - Deep dive into the platform mechanics
- [Get Started](/get-started/overview) - Step-by-step guide to using AceSteps
- [Smart Contracts](/smart-contracts/overview) - Technical contract documentation
