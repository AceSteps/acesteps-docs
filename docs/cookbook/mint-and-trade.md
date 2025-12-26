---
sidebar_position: 2
title: Mint and Trade
description: Guide to minting NFTs and trading song tokens
---

# Mint and Trade

Learn how to mint songs as NFTs and trade song tokens on AceSteps.

## Minting Overview

Every song on AceSteps is an ERC-721 NFT:

1. Create music via AI prompt
2. Save to mint as NFT
3. NFT appears in your wallet

## Trading Overview

When trading is enabled:

1. NFT is locked permanently
2. 100,000 ERC-20 tokens created
3. 80,000 tokens sent to you
4. 20,000 tokens added to Uniswap pool

## Step-by-Step: Enable Trading

### 1. Select Your Song

Go to Library and select a published song.

### 2. Enable Trading

Click **Enable Trading** button.

### 3. Confirm Transaction

Your wallet will prompt for:

- NFT transfer to vault
- Gas fee (~$0.01-0.10 on Base)

### 4. Receive Tokens

After confirmation:

- 80,000 tokens in your wallet
- Song available for trading

## Buying Song Tokens

### From the App

1. Find a tokenized song
2. Click **Buy**
3. Enter ETH amount
4. Confirm swap

### Direct on Uniswap

```typescript
// Using wagmi
const { write } = useContractWrite({
  address: ROUTER_ADDRESS,
  abi: routerAbi,
  functionName: 'swap',
  args: [poolKey, swapParams]
});
```

## Selling Song Tokens

1. Go to your token holdings
2. Select the song token
3. Click **Sell**
4. Enter token amount
5. Confirm swap

## Price Dynamics

- **First Buy**: Sets initial price
- **More Buys**: Price increases
- **Sells**: Price decreases
- **Revenue**: Price increases (via donate)

## Related

- [Create Your First Song](/cookbook/create-first-song)
- [Earn Revenue](/cookbook/earn-revenue)
