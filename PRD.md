**AI MUSIC PLATFORM**

Product Requirements Document (PRD)

|  |  |
| --- | --- |
| **Version:** | 1.1 |
| **Date:** | December 24, 2024 |
| **Blockchain:** | Base Chain |
| **DEX:** | Uniswap V4 |

# **1. Executive Summary**

This document defines the technical and business requirements for an AI-powered music creation and tokenization platform built on Base Chain.

The platform enables users to create AI-generated music through prompts, mint these creations as NFTs, and offer fractional ownership through Uniswap V4 integration. Ad revenues are automatically reflected in token prices, allowing all shareholders to benefit from value appreciation.

# **2. Problem & Solution**

## **2.1 Problem**

* High barriers to entry and lack of fair revenue distribution for music creators
* Lack of transparency in the traditional music industry
* Listeners cannot directly invest in their favorite artists

## **2.2 Solution**

* AI-powered music creation accessible to everyone
* Blockchain-based transparent revenue sharing
* Investment opportunities through fractional NFT ownership
* Liquid and efficient marketplace via Uniswap V4

# **3. User Journey**

## **3.1 Music Creation**

1. User logs into the platform
2. Enters a prompt in the AI music creation interface (e.g., "chill lofi beat with rain sounds")
3. AI generates the music and provides a preview
4. If satisfied, user clicks "Save"
5. NFT is minted (isPublished: false)
6. Music is added to user's library

## **3.2 Publishing**

1. User selects a song from their library
2. Clicks "Publish"
3. NFT status is updated (isPublished: true)
4. Song becomes visible on the platform
5. Play tracking begins
6. Ad revenue starts flowing to NFT owner

## **3.3 Enable Trading**

1. Creator activates "Enable Trading" option
2. NFT is permanently locked in vault contract
3. 100,000 ERC-20 tokens are minted
4. 80,000 tokens → Creator's wallet
5. 20,000 tokens → Uniswap V4 pool (single-sided, 0 ETH)
6. Trading begins

# **4. Technical Architecture**

## **4.1 Blockchain Infrastructure**

**Network:** Base Chain (Ethereum L2)

**DEX:** Uniswap V4

**Token Standard:** ERC-20 (for song shares)

**NFT Standard:** ERC-721 (for original songs)

## **4.2 Smart Contract Structure**

### **4.2.1 SongNFT.sol (ERC-721)**

Main NFT contract minted for each song. Only AI-generated music from the platform can be minted using signature verification.

* Metadata: song name, artist, audio IPFS hash, prompt, creation date
* isPublished: boolean flag
* isTradeable: boolean flag
* linkedToken: address (ERC-20 token address, if trading enabled)
* platformSigner: address (public address for signature verification)
* usedSignatures: mapping to prevent replay attacks

### **4.2.2 Signature-Based Minting (AI-Only Verification)**

Users cannot mint arbitrary music. Only platform-generated AI music can be minted through cryptographic signature verification.

**Backend Signing Process:**

* Platform backend holds a private key (kept secret)
* When user generates AI music, backend creates message hash from (userAddress + metadataURI + audioHash)
* Backend signs this hash with private key → produces signature
* Signature is returned to user along with metadata

**Contract Verification Process:**

* User calls mint() with metadataURI, audioHash, and signature
* Contract recreates the same message hash
* Contract uses ECDSA.recover() to extract signer address from signature
* If recovered address matches platformSigner → mint succeeds
* If not → transaction reverts

**Security Guarantees:**

* Without private key, no one can forge a valid signature
* usedSignatures mapping prevents replay attacks
* msg.sender in message prevents front-running
* Signing is off-chain (free, no gas)

### **4.2.3 SongVault.sol (Simple Lock - No Unlock)**

Contract that permanently locks NFTs and manages token minting. No unlock mechanism exists because 100% token ownership is mathematically impossible due to AMM mechanics.

* lockAndTokenize(): Lock NFT in vault + mint tokens
* lockedNFTs mapping: nftId → tokenAddress
* tokenToNFT mapping: tokenAddress → nftId
* NFT remains in vault, metadata easily accessible

### **4.2.4 SongToken.sol (ERC-20)**

Fractional ownership token deployed for each song.

* Fixed supply: 100,000 tokens
* 18 decimals (standard ERC-20)
* Linked NFT reference

### **4.2.5 SongRevenueHook.sol (Uniswap V4 Hook)**

Uniswap V4 hook contract - adds ad revenue to the pool.

* addRevenue(): Platform adds ad revenue to pool via donate()
* afterSwap(): Fee tracking and auto-compound

## **4.3 Vault Mapping Structure**

Platform uses bidirectional mappings for easy metadata access:

|  |  |
| --- | --- |
| **Mapping** | **Usage** |
| lockedNFTs[nftId] → tokenAddress | Find token address from NFT |
| tokenToNFT[tokenAddress] → nftId | Find NFT ID from token |

This structure allows the platform to always access song metadata (name, artist, audio URL, etc.) because the NFT remains in the vault.

## **4.4 Token Distribution**

|  |  |
| --- | --- |
| **Recipient** | **Amount** |
| Creator | 80,000 tokens (80%) |
| Uniswap V4 Pool (Platform LP) | 20,000 tokens (20%) |

# **5. Uniswap V4 Integration**

## **5.1 Pool Initialization**

A new Uniswap V4 pool is created when trading is enabled for each song.

### **Initial State:**

* Token: 20,000 SONG\_TOKEN
* ETH: 0 (single-sided liquidity)
* Starting price: Very low (near 0)

## **5.2 Single-Sided Liquidity**

Thanks to Uniswap V4's concentrated liquidity feature, pools can be initialized with only tokens:

* Platform deposits only tokens at specified price range
* ETH enters the pool when first buyer arrives
* Creator or platform doesn't need to deposit ETH initially

## **5.3 Why Unlock is Impossible**

Due to AMM (x \* y = k) mathematics, acquiring 100% of pool tokens is mathematically impossible:

* Price increases exponentially as remaining tokens decrease with each purchase
* Even acquiring 99% requires astronomical cost
* Acquiring 100% requires infinite ETH
* Therefore, unlock mechanism is unnecessary

## **5.4 Revenue Hook Mechanism**

Platform collects ad revenue and adds it to the pool via Uniswap V4's donate() function:

1. Platform calculates monthly/weekly ad revenue
2. Revenue is sent to hook contract as ETH/USDC
3. Hook adds ETH to pool via donate()
4. ETH in pool increases, token amount stays constant
5. Token price automatically increases

## **5.5 Platform Revenue Model**

Platform earns from swap fees as 100% owner of the LP position:

* 1% fee on each swap
* Fees automatically added to LP position
* Platform earnings increase with volume

# **6. Revenue Flow**

## **6.1 Revenue Distribution Overview**

Revenue distribution differs based on whether the song is tokenized or not:

### **Scenario A: Published but NOT Tokenized**

NFT owner holds the NFT directly and receives revenue via off-chain payment.

|  |  |  |
| --- | --- | --- |
| **Source** | **Destination** | **Method** |
| Ad Revenue (80%) | NFT Owner | Off-chain (ETH/USDC) |
| Ad Revenue (20%) | Platform | Off-chain |

### **Scenario B: Tokenized (Trading Enabled)**

NFT is locked in vault, tokens exist. Revenue is added to pool via on-chain donate().

|  |  |  |
| --- | --- | --- |
| **Source** | **Destination** | **Method** |
| Ad Revenue (80%) | Uniswap Pool | On-chain donate() |
| Ad Revenue (20%) | Platform | Off-chain |

## **6.2 Off-Chain Payment Process (Non-Tokenized)**

For non-tokenized songs, the platform handles revenue distribution off-chain:

1. Platform tracks plays and calculates ad revenue per song
2. Platform identifies NFT owner via ownerOf(tokenId)
3. Platform sends 80% to NFT owner's wallet (ETH/USDC)
4. Platform retains 20%
5. Payments processed weekly/monthly

## **6.3 On-Chain Revenue Hook (Tokenized)**

For tokenized songs, revenue is added to the Uniswap pool on-chain:

* Platform calculates 80% of ad revenue for the song
* Platform calls donate() on Uniswap V4 pool via hook
* ETH added to pool increases token price
* All token holders benefit from price appreciation

## **6.4 Platform Revenue Sources**

* Ad Revenue: 20% of all ad revenue
* LP Fees: 1% on each swap (platform is LP owner)
* Potential: Premium features, subscription model

## **6.5 Creator Earning Methods**

* Direct Revenue (Non-Tokenized): Hold NFT and receive 80% of ad revenue directly
* Token Sales (Tokenized): Can sell 80,000 tokens on the market
* Value Appreciation: Ad revenue increases price, token value rises
* Hold Strategy: Can benefit from long-term value appreciation by holding tokens

## **6.6 Investor (Holder) Earning Methods**

* Early Entry: Purchase tokens at low prices
* Value Appreciation: As song gains popularity, ad revenue increases, price rises
* Selling: Can swap to ETH anytime

# **7. Detailed User Flows**

## **7.1 Creator Flow**

Simplified flow for creators:

1. Create music with AI
2. Save → NFT mint (to library)
3. Publish → Make visible on platform
4. Enable Trading → Permanent NFT lock, create tokens, start pool
5. Sell tokens → Receive ETH (swap)

## **7.2 Investor Flow**

* Discover songs on platform
* Buy tokens of favorite songs (ETH → TOKEN swap)
* As song gets plays, ad revenue → price increase
* Sell anytime (TOKEN → ETH swap)

# **8. UI/UX Requirements**

## **8.1 Main Screens**

* Discover: Explore published songs
* Create: AI music creation interface
* Library: User's own songs
* Portfolio: Token holdings and values
* Song Detail: Song details, trading panel

## **8.2 Trading Panel**

Simple and intuitive trading interface:

* Current Price: ETH price per token
* Buy/Sell toggle
* Amount input
* Estimated cost/receive
* Swap button

## **8.3 UX Principles**

* Use "Share" terminology (instead of token)
* Hide complex blockchain details
* Complete transactions with single button
* Display price changes with charts

# **9. Technical Specifications**

## **9.1 Token Parameters**

|  |  |
| --- | --- |
| **Parameter** | **Value** |
| Token Standard | ERC-20 |
| Fixed Supply | 100,000 tokens / song |
| Decimals | 18 |
| Creator Allocation | 80% (80,000 tokens) |
| LP Allocation | 20% (20,000 tokens) |

## **9.2 Uniswap V4 Pool Parameters**

|  |  |
| --- | --- |
| **Parameter** | **Value** |
| Token Pair | SONG\_TOKEN / ETH (native) |
| Fee Tier | 1% (10000 bps) |
| Tick Spacing | 60 |
| Initial Liquidity | Single-sided (0 ETH + 20,000 TOKEN) |
| Hook | SongRevenueHook (afterSwap, donate) |

# **10. Security Requirements**

* Smart contract audit (including Uniswap V4 hook)
* Reentrancy protection
* Access control (onlyOwner, onlyPlatform)
* Pausable mechanism (for emergencies)
* IPFS/Arweave metadata immutability

# **11. Development Phases**

## **Phase 1: Core Infrastructure**

* Deploy SongNFT.sol
* AI music integration
* IPFS metadata management
* Basic UI (Create, Library)

## **Phase 2: Tokenization**

* Deploy SongVault.sol (simple lock, no unlock)
* SongToken factory
* Uniswap V4 pool creation
* Trading UI

## **Phase 3: Revenue System**

* Deploy SongRevenueHook.sol
* Ad system integration
* Automatic donate mechanism
* Analytics dashboard

## **Phase 4: Polish & Launch**

* Security audit
* Testnet deployment
* Mainnet launch
* Marketing & community building

*— End of Document —*