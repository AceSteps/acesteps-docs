---
sidebar_position: 4
title: SongToken
description: ERC-20 contract for fractional song ownership
---

# SongToken

The `SongToken` contract is an ERC-20 token representing fractional ownership of a song.

## Token Details

| Property | Value |
|----------|-------|
| Standard | ERC-20 |
| Decimals | 18 |
| Total Supply | 100,000 |
| Fixed Supply | Yes (no minting after creation) |

## Distribution

```
Creator:     80,000 tokens (80%)
Uniswap V4:  20,000 tokens (20%)
─────────────────────────────────
Total:      100,000 tokens (100%)
```

## Interface

```solidity
interface ISongToken is IERC20 {
    function songId() external view returns (uint256);

    function songNFT() external view returns (address);

    function vault() external view returns (address);
}
```

## Factory Pattern

Each song gets a unique token contract deployed:

```solidity
function deploySongToken(
    uint256 tokenId,
    string memory name,
    string memory symbol
) internal returns (address) {
    SongToken token = new SongToken(
        name,
        symbol,
        tokenId,
        address(songNFT)
    );
    return address(token);
}
```

## Token Naming

- **Name**: "Song #123 Token"
- **Symbol**: "SONG123"

## Related

- [SongVault](/smart-contracts/song-vault)
- [Song Tokens](/tokenization/song-tokens)
