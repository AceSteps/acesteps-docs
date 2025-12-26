---
sidebar_position: 2
title: SongNFT
description: ERC-721 contract for song ownership
---

# SongNFT

The `SongNFT` contract is an ERC-721 implementation for song ownership.

## Features

- Signature-based minting
- Metadata storage (IPFS URI + audio hash)
- Publishing status tracking
- Trading status tracking
- Linked token address

## Interface

```solidity
interface ISongNFT {
    function mint(
        string calldata metadataURI,
        bytes32 audioHash,
        bytes calldata signature
    ) external returns (uint256);

    function publish(uint256 tokenId) external;

    function isPublished(uint256 tokenId) external view returns (bool);

    function isTradeable(uint256 tokenId) external view returns (bool);

    function linkedToken(uint256 tokenId) external view returns (address);
}
```

## Signature Verification

```solidity
bytes32 hash = keccak256(abi.encodePacked(msg.sender, metadataURI, audioHash));
address signer = ECDSA.recover(hash, signature);
require(signer == platformSigner, "Invalid signature");
```

## Events

```solidity
event SongMinted(uint256 indexed tokenId, address indexed creator, string metadataURI);
event SongPublished(uint256 indexed tokenId);
event TradingEnabled(uint256 indexed tokenId, address tokenAddress);
```

## Storage

```solidity
mapping(uint256 => bool) public isPublished;
mapping(uint256 => bool) public isTradeable;
mapping(uint256 => address) public linkedToken;
mapping(bytes => bool) public usedSignatures;
```

## Related

- [SongVault](/smart-contracts/song-vault)
- [Minting NFTs](/tokenization/minting-nfts)
