---
sidebar_position: 5
title: Token Distribution
description: How song tokens are distributed
---

# Token Distribution

Understanding how tokens are distributed when trading is enabled.

## Distribution Breakdown

When a creator enables trading:

| Recipient | Tokens | Percentage | Purpose |
|-----------|--------|------------|---------|
| Creator | 80,000 | 80% | Retain majority ownership |
| Uniswap Pool | 20,000 | 20% | Initial liquidity |
| **Total** | **100,000** | **100%** | Fixed supply |

## Why 80/20 Split?

### Creator Benefits (80%)

- Maintain controlling stake
- Benefit from price appreciation
- Sell gradually over time

### Pool Benefits (20%)

- Enable immediate trading
- Provide liquidity depth
- Establish price discovery

## Distribution Flow

```
1. Creator clicks "Enable Trading"
2. NFT transferred to SongVault (permanent)
3. SongToken contract deployed
4. 100,000 tokens minted
5. 80,000 tokens → Creator wallet
6. 20,000 tokens → Uniswap V4 pool
```

## Smart Contract Code

```solidity
function enableTrading(uint256 tokenId) external {
    // Lock NFT
    songNFT.transferFrom(msg.sender, address(this), tokenId);

    // Deploy token
    SongToken token = new SongToken(tokenId);

    // Distribute
    token.transfer(msg.sender, 80_000 * 10**18);
    token.transfer(pool, 20_000 * 10**18);
}
```

## Initial Pool State

The Uniswap pool starts with:

```
ETH: 0
Tokens: 20,000

First buyer sets the initial price.
```

## Related

- [Song Tokens](/tokenization/song-tokens)
- [Fractional Ownership](/tokenization/fractional-ownership)
