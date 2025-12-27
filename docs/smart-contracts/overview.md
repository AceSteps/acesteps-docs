---
sidebar_position: 1
title: Overview
description: Smart contract architecture for AceSteps
---

# Smart Contracts Overview

AceSteps is powered by four core smart contracts deployed on Base Network.

## System Architecture

```
╔═══════════════════════════════════════════════════════════════════════════════════════╗
║                                    USERS                                               ║
╠═══════════════════════════════════╦═══════════════════════════════════════════════════╣
║           CREATOR                  ║                 INVESTOR                          ║
║  • Creates AI music                ║  • Discovers songs                                ║
║  • Mints NFTs                      ║  • Buys/sells tokens                              ║
║  • Enables trading                 ║  • Benefits from price appreciation              ║
║  • Earns from token sales          ║                                                   ║
╚═══════════════════════════════════╩═══════════════════════════════════════════════════╝
         │                                              │
         │ 1. Generate Music                            │ 5. Swap ETH ↔ TOKEN
         ▼                                              │
╔═══════════════════════════════════════════════════════╪═══════════════════════════════╗
║                              PLATFORM BACKEND         │                                ║
║  ┌─────────────────────┐    ┌─────────────────────┐  │   ┌─────────────────────┐      ║
║  │   AI Music Engine   │    │  Signature Service  │  │   │   Revenue Tracker   │      ║
║  │                     │    │                     │  │   │                     │      ║
║  │ • ACE-Step model    │───▶│ • Private key       │  │   │ • Play counts       │      ║
║  │ • Prompt → Audio    │    │ • ECDSA signing     │  │   │ • Ad revenue calc   │      ║
║  │ • Preview/Edit      │    │ • Hash generation   │  │   │ • Distribution      │      ║
║  └─────────────────────┘    └──────────┬──────────┘  │   └──────────┬──────────┘      ║
║                                        │             │              │                  ║
╚════════════════════════════════════════╪═════════════╪══════════════╪══════════════════╝
                                         │             │              │
         2. Return signature             │             │              │ 6. Revenue
         ┌───────────────────────────────┘             │              │
         ▼                                             │              │
╔════════════════════════════════════════════════════════════════════════════════════════╗
║                                 BASE NETWORK (Chain ID: 8453)                           ║
║                                                                                         ║
║  ┌─────────────────────────────────────────────────────────────────────────────────┐   ║
║  │                              SMART CONTRACTS                                     │   ║
║  │                                                                                  │   ║
║  │   ┌─────────────────────────────────────────────────────────────────────────┐   │   ║
║  │   │                           SongNFT (ERC-721)                              │   │   ║
║  │   │                     0x4b86a687bBbf7348911cc88195e89AdA54cF5Ba7           │   │   ║
║  │   │                                                                          │   │   ║
║  │   │  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐       │   │   ║
║  │   │  │ mint(signature)  │  │    publish()     │  │  setTradeable()  │       │   │   ║
║  │   │  │                  │  │                  │  │                  │       │   │   ║
║  │   │  │ • Verify ECDSA   │  │ • isPublished    │  │ • isTradeable    │       │   │   ║
║  │   │  │ • Check replay   │  │ • Enable plays   │  │ • Link token     │       │   │   ║
║  │   │  │ • Store metadata │  │ • Start revenue  │  │ • linkedToken    │       │   │   ║
║  │   │  └──────────────────┘  └──────────────────┘  └──────────────────┘       │   │   ║
║  │   │                                                                          │   │   ║
║  │   │  Storage:                                                                │   │   ║
║  │   │  • platformSigner: address (for signature verification)                  │   │   ║
║  │   │  • usedSignatures: mapping(bytes => bool) (prevent replay)               │   │   ║
║  │   │  • tokenMetadata: mapping(uint256 => SongMetadata)                       │   │   ║
║  │   └──────────────────────────────────────────────────────────────────────────┘   │   ║
║  │                                       │                                          │   ║
║  │                                       │ 3. transferFrom(creator, vault, tokenId) │   ║
║  │                                       ▼                                          │   ║
║  │   ┌──────────────────────────────────────────────────────────────────────────┐   │   ║
║  │   │                        SongVault (Permanent Lock)                         │   │   ║
║  │   │                  0xdcfDc1cd433Cdc0Da24Ce1b979cdeb2563598566               │   │   ║
║  │   │                                                                           │   │   ║
║  │   │  ┌────────────────────────────────────────────────────────────────┐      │   │   ║
║  │   │  │                    enableTrading(tokenId)                       │      │   │   ║
║  │   │  │                                                                 │      │   │   ║
║  │   │  │  Step 1: Lock NFT permanently (no unlock function exists)       │      │   │   ║
║  │   │  │  Step 2: Deploy new SongToken contract                          │      │   │   ║
║  │   │  │  Step 3: Mint 100,000 tokens                                    │      │   │   ║
║  │   │  │  Step 4: Send 80,000 (80%) → Creator wallet                     │      │   │   ║
║  │   │  │  Step 5: Send 20,000 (20%) → Uniswap V4 Pool                    │      │   │   ║
║  │   │  │  Step 6: Initialize pool with SongRevenueHook                   │      │   │   ║
║  │   │  └────────────────────────────────────────────────────────────────┘      │   │   ║
║  │   │                                                                           │   │   ║
║  │   │  Mappings (Bidirectional):                                                │   │   ║
║  │   │  • lockedNFTs[nftId] → tokenAddress (find token from NFT)                 │   │   ║
║  │   │  • tokenToNFT[tokenAddress] → nftId (find NFT from token)                 │   │   ║
║  │   └────────────────────┬─────────────────────────────────────────────────────┘   │   ║
║  │                        │                                                         │   ║
║  │                        │ 4. Deploy & Distribute                                  │   ║
║  │                        ▼                                                         │   ║
║  │   ┌──────────────────────────────────────────────────────────────────────────┐   │   ║
║  │   │                         SongToken (ERC-20)                                │   │   ║
║  │   │                    [Deployed per song - unique address]                   │   │   ║
║  │   │                                                                           │   │   ║
║  │   │  Parameters:                        Distribution:                         │   │   ║
║  │   │  • Fixed Supply: 100,000 tokens     ┌─────────────────────────────────┐  │   │   ║
║  │   │  • Decimals: 18                     │  Creator:  80,000 (80%)         │  │   │   ║
║  │   │  • No mint after deploy             │  LP Pool:  20,000 (20%)         │  │   │   ║
║  │   │  • Linked NFT reference             └─────────────────────────────────┘  │   │   ║
║  │   └──────────────────────────────────────────────────────────────────────────┘   │   ║
║  │                                                                                  │   ║
║  └──────────────────────────────────────────────────────────────────────────────────┘   ║
║                                                                                         ║
║  ┌──────────────────────────────────────────────────────────────────────────────────┐   ║
║  │                              UNISWAP V4 INTEGRATION                               │   ║
║  │                                                                                   │   ║
║  │   ┌────────────────────────────┐         ┌────────────────────────────────────┐  │   ║
║  │   │      PoolManager           │◀───────▶│        SongRevenueHook             │  │   ║
║  │   │                            │         │   0xd18424e29c61fc1adeb0538c135d.. │  │   ║
║  │   │  Pool: SONG_TOKEN / ETH    │         │                                    │  │   ║
║  │   │                            │         │  Hooks:                            │  │   ║
║  │   │  • Fee: 1% (10000 bps)     │         │  • beforeSwap()                    │  │   ║
║  │   │  • Tick Spacing: 60        │         │  • afterSwap() - fee tracking      │  │   ║
║  │   │  • Single-sided init       │         │  • donate() - add revenue          │  │   ║
║  │   │    (0 ETH + 20k TOKEN)     │         │                                    │  │   ║
║  │   │                            │         │  Revenue Flow:                     │  │   ║
║  │   │  Price Discovery:          │         │  Platform calls donate(ETH)        │  │   ║
║  │   │  • Starts near 0           │         │  → ETH added to pool               │  │   ║
║  │   │  • First buy sets price    │         │  → Token price increases           │  │   ║
║  │   │  • AMM curve (x*y=k)       │         │  → All holders benefit             │  │   ║
║  │   └────────────────────────────┘         └────────────────────────────────────┘  │   ║
║  │                                                                                   │   ║
║  │   Why 100% Token Buyback is Impossible:                                           │   ║
║  │   ┌───────────────────────────────────────────────────────────────────────────┐  │   ║
║  │   │  AMM Formula: x * y = k (constant product)                                 │  │   ║
║  │   │                                                                            │  │   ║
║  │   │  As tokens decrease → Price increases exponentially                        │  │   ║
║  │   │  • 90% buyback = 10x price increase                                        │  │   ║
║  │   │  • 99% buyback = 100x price increase                                       │  │   ║
║  │   │  • 100% buyback = ∞ ETH required (mathematically impossible)               │  │   ║
║  │   │                                                                            │  │   ║
║  │   │  Therefore: No unlock() function needed - NFT stays locked forever         │  │   ║
║  │   └───────────────────────────────────────────────────────────────────────────┘  │   ║
║  │                                                                                   │   ║
║  └───────────────────────────────────────────────────────────────────────────────────┘   ║
║                                                                                          ║
╚══════════════════════════════════════════════════════════════════════════════════════════╝
```

## Revenue Distribution Model

```
╔══════════════════════════════════════════════════════════════════════════════════════╗
║                              REVENUE DISTRIBUTION                                     ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                       ║
║  ┌─────────────────────────────────────────────────────────────────────────────────┐ ║
║  │                         AD REVENUE SOURCE                                        │ ║
║  │                    (Platform tracks plays & calculates)                          │ ║
║  └─────────────────────────────────────────────────────────────────────────────────┘ ║
║                                      │                                                ║
║                                      │ 100% Ad Revenue                                ║
║                    ┌─────────────────┴─────────────────┐                             ║
║                    │                                   │                              ║
║                    ▼                                   ▼                              ║
║  ┌─────────────────────────────────┐ ┌─────────────────────────────────┐             ║
║  │         80% TO SONG             │ │        20% TO PLATFORM          │             ║
║  └─────────────────────────────────┘ └─────────────────────────────────┘             ║
║                    │                                                                  ║
║     ┌──────────────┴──────────────┐                                                  ║
║     │                             │                                                   ║
║     ▼                             ▼                                                   ║
║  ┌─────────────────────┐  ┌─────────────────────────────────────────────────────┐   ║
║  │   NOT TOKENIZED     │  │                    TOKENIZED                         │   ║
║  │   (NFT held by      │  │              (NFT locked in Vault)                   │   ║
║  │    creator)         │  │                                                      │   ║
║  │                     │  │  ┌────────────────────────────────────────────────┐ │   ║
║  │  Payment Method:    │  │  │            donate() to Uniswap Pool            │ │   ║
║  │  • Off-chain        │  │  │                                                │ │   ║
║  │  • ETH/USDC direct  │  │  │  1. Platform sends ETH to RevenueHook          │ │   ║
║  │  • Weekly/Monthly   │  │  │  2. Hook calls donate(poolKey, ethAmount)      │ │   ║
║  │                     │  │  │  3. ETH added to pool liquidity                │ │   ║
║  │  Recipient:         │  │  │  4. Token price automatically increases        │ │   ║
║  │  • NFT Owner        │  │  │  5. All token holders benefit                  │ │   ║
║  │    (ownerOf)        │  │  │                                                │ │   ║
║  └─────────────────────┘  │  └────────────────────────────────────────────────┘ │   ║
║                           └─────────────────────────────────────────────────────────┘   ║
║                                                                                       ║
║  ┌─────────────────────────────────────────────────────────────────────────────────┐ ║
║  │                      PLATFORM REVENUE SOURCES                                    │ ║
║  │                                                                                  │ ║
║  │  1. Ad Revenue Share: 20% of all ad revenue                                      │ ║
║  │  2. LP Swap Fees: 1% on every swap (platform owns 100% of LP position)           │ ║
║  │  3. Future: Premium features, subscriptions                                      │ ║
║  └─────────────────────────────────────────────────────────────────────────────────┘ ║
║                                                                                       ║
╚═══════════════════════════════════════════════════════════════════════════════════════╝
```

## Complete User Flows

```
╔══════════════════════════════════════════════════════════════════════════════════════╗
║                                CREATOR FLOW                                           ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                       ║
║   ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐            ║
║   │ CREATE  │───▶│  SAVE   │───▶│ PUBLISH │───▶│ ENABLE  │───▶│  SELL   │            ║
║   │ MUSIC   │    │  (MINT) │    │         │    │ TRADING │    │ TOKENS  │            ║
║   └─────────┘    └─────────┘    └─────────┘    └─────────┘    └─────────┘            ║
║        │              │              │              │              │                  ║
║        ▼              ▼              ▼              ▼              ▼                  ║
║   ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐            ║
║   │ AI      │    │ NFT     │    │ Song    │    │ NFT     │    │ Swap    │            ║
║   │ prompt  │    │ minted  │    │ visible │    │ locked  │    │ TOKEN   │            ║
║   │ →audio  │    │ to      │    │ on      │    │ 80k     │    │ → ETH   │            ║
║   │         │    │ library │    │ platform│    │ tokens  │    │         │            ║
║   └─────────┘    └─────────┘    └─────────┘    └─────────┘    └─────────┘            ║
║                                                                                       ║
║   State Changes:                                                                      ║
║   • After Save:    isPublished = false, isTradeable = false                          ║
║   • After Publish: isPublished = true,  isTradeable = false                          ║
║   • After Enable:  isPublished = true,  isTradeable = true, linkedToken = address    ║
║                                                                                       ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║                               INVESTOR FLOW                                           ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                       ║
║   ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐            ║
║   │DISCOVER │───▶│  BUY    │───▶│  HOLD   │───▶│ BENEFIT │───▶│  SELL   │            ║
║   │  SONGS  │    │ TOKENS  │    │         │    │  FROM   │    │         │            ║
║   │         │    │         │    │         │    │ REVENUE │    │         │            ║
║   └─────────┘    └─────────┘    └─────────┘    └─────────┘    └─────────┘            ║
║        │              │              │              │              │                  ║
║        ▼              ▼              ▼              ▼              ▼                  ║
║   ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐            ║
║   │ Browse  │    │ Swap    │    │ Token   │    │ donate()│    │ Swap    │            ║
║   │ trading │    │ ETH →   │    │ balance │    │ adds    │    │ TOKEN   │            ║
║   │ enabled │    │ TOKEN   │    │ in      │    │ ETH to  │    │ → ETH   │            ║
║   │ songs   │    │         │    │ wallet  │    │ pool    │    │ profit! │            ║
║   └─────────┘    └─────────┘    └─────────┘    └─────────┘    └─────────┘            ║
║                                                                                       ║
╚═══════════════════════════════════════════════════════════════════════════════════════╝
```

## Signature-Based Minting Flow

```
╔══════════════════════════════════════════════════════════════════════════════════════╗
║                         SIGNATURE VERIFICATION FLOW                                   ║
║                    (Ensures only AI-generated music can be minted)                    ║
╠══════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                       ║
║   CREATOR                    BACKEND                         SONGNFT CONTRACT        ║
║      │                          │                                   │                 ║
║      │  1. Create AI music      │                                   │                 ║
║      │─────────────────────────▶│                                   │                 ║
║      │                          │                                   │                 ║
║      │                    2. Generate hash:                         │                 ║
║      │                    keccak256(userAddress +                   │                 ║
║      │                             metadataURI +                    │                 ║
║      │                             audioHash)                       │                 ║
║      │                          │                                   │                 ║
║      │                    3. Sign with private key                  │                 ║
║      │                    signature = sign(hash)                    │                 ║
║      │                          │                                   │                 ║
║      │  4. Return signature     │                                   │                 ║
║      │◀─────────────────────────│                                   │                 ║
║      │                          │                                   │                 ║
║      │  5. mint(metadataURI, audioHash, signature)                  │                 ║
║      │─────────────────────────────────────────────────────────────▶│                 ║
║      │                                                              │                 ║
║      │                                              6. Recreate hash│                 ║
║      │                                              7. ECDSA.recover│                 ║
║      │                                              8. Check signer │                 ║
║      │                                                 == platform  │                 ║
║      │                                              9. Check !used  │                 ║
║      │                                             10. Mark used    │                 ║
║      │                                             11. Mint NFT     │                 ║
║      │                                                              │                 ║
║      │  12. NFT minted to creator                                   │                 ║
║      │◀─────────────────────────────────────────────────────────────│                 ║
║      │                                                              │                 ║
║                                                                                       ║
║   Security Guarantees:                                                                ║
║   ✓ Without private key, no one can forge signature                                  ║
║   ✓ usedSignatures prevents replay attacks                                           ║
║   ✓ msg.sender in hash prevents front-running                                        ║
║   ✓ Signing is off-chain (free, no gas cost)                                         ║
║                                                                                       ║
╚═══════════════════════════════════════════════════════════════════════════════════════╝
```

## Contract Summary

| Contract | Standard | Purpose | Key Functions |
|----------|----------|---------|---------------|
| [SongNFT](/smart-contracts/song-nft) | ERC-721 | Song ownership | `mint()`, `publish()` |
| [SongVault](/smart-contracts/song-vault) | Custom | NFT locking, token deployment | `enableTrading()` |
| [SongToken](/smart-contracts/song-token) | ERC-20 | Fractional ownership | Standard ERC-20 |
| [RevenueHook](/smart-contracts/revenue-hook) | Uniswap V4 | Revenue distribution | `donate()`, `afterSwap()` |

## Network Details

| Property | Value |
|----------|-------|
| Network | Base (Ethereum L2) |
| Chain ID | 8453 (mainnet), 84532 (sepolia) |
| DEX | Uniswap V4 |
| Framework | Foundry |

## Security Features

### Signature-Based Minting

Only AI-generated music can be minted:

```solidity
// Backend signs: hash(userAddress + metadataURI + audioHash)
// Contract verifies via ECDSA.recover()
require(ECDSA.recover(hash, signature) == platformSigner);
```

### Replay Attack Prevention

```solidity
mapping(bytes => bool) public usedSignatures;

require(!usedSignatures[signature], "Signature already used");
usedSignatures[signature] = true;
```

### Permanent Locking

NFTs cannot be unlocked once trading is enabled:

- No `unlock()` function exists
- 100% token buyback is mathematically impossible (AMM curve)
- Prevents rug pulls

### Access Control

```solidity
modifier onlyPlatform() {
    require(msg.sender == platformAddress, "Not authorized");
    _;
}
```

### Emergency Controls

```solidity
function pause() external onlyOwner {
    _pause();
}
```

## Token Parameters

| Parameter | Value |
|-----------|-------|
| Token Standard | ERC-20 |
| Fixed Supply | 100,000 tokens per song |
| Decimals | 18 |
| Creator Allocation | 80% (80,000 tokens) |
| LP Allocation | 20% (20,000 tokens) |

## Uniswap V4 Pool Parameters

| Parameter | Value |
|-----------|-------|
| Token Pair | SONG_TOKEN / ETH (native) |
| Fee Tier | 1% (10000 bps) |
| Tick Spacing | 60 |
| Initial Liquidity | Single-sided (0 ETH + 20,000 TOKEN) |
| Hook | SongRevenueHook |

## Development

### Local Setup

```bash
cd blockchain
forge install
forge build
forge test
```

### Deployment

```bash
forge script script/Deploy.s.sol:DeployScript \
  --rpc-url $BASE_RPC_URL \
  --broadcast \
  --verify
```

## Vault Mapping Structure

Bidirectional mappings for metadata access:

| Mapping | Usage |
|---------|-------|
| `lockedNFTs[nftId] → tokenAddress` | Find token from NFT |
| `tokenToNFT[tokenAddress] → nftId` | Find NFT from token |

## Related

- [SongNFT Contract](/smart-contracts/song-nft)
- [Architecture](/smart-contracts/architecture)
- [Deployment](/smart-contracts/deployment)
