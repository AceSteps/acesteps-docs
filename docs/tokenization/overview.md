---
sidebar_position: 1
title: Overview
description: Understanding NFT and token systems in AceSteps
---

# Tokenization Overview

AceSteps uses a dual-token system for song ownership and trading.

## Token Types

### ERC-721 (Song NFT)

Every song minted on AceSteps is an ERC-721 NFT representing:

- Original ownership
- Metadata and audio hash
- Publishing status
- Revenue rights

### ERC-20 (Song Token)

When trading is enabled, an ERC-20 token is created:

- **100,000 tokens** per song (fixed supply)
- **80,000** to creator
- **20,000** to Uniswap pool

## Ownership States

| State | NFT Location | Tokens | Tradeable |
|-------|-------------|--------|-----------|
| Minted | User wallet | None | No |
| Published | User wallet | None | No |
| Tokenized | Locked in Vault | Active | Yes |

## Revenue Flow

- **Non-tokenized**: 80% to NFT owner, 20% to platform
- **Tokenized**: 80% to pool (all holders), 20% to platform

## Next Steps

- [Minting NFTs](/tokenization/minting-nfts)
- [Song Tokens](/tokenization/song-tokens)
