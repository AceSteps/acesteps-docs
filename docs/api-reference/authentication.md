---
sidebar_position: 4
title: Authentication
description: API authentication guide
---

# Authentication

Learn how to authenticate with AceSteps APIs.

## Overview

AceSteps uses different authentication methods for backend API and smart contract interactions.

## Backend API Authentication

### Farcaster Auth

The primary authentication method uses Farcaster:

```typescript
import { sdk } from '@farcaster/miniapp-sdk';

// 1. Get Farcaster context
const context = await sdk.context;

// 2. Request auth token
const authResponse = await fetch('/api/auth', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    fid: context.user.fid,
    // Include signature for verification
  })
});

const { token } = await authResponse.json();

// 3. Use token in subsequent requests
const response = await fetch('/api/music/generate', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  // ...
});
```

### JWT Token Format

The authentication token is a JWT containing:

```json
{
  "sub": "12345",           // Farcaster FID
  "address": "0x...",       // Connected wallet address
  "iat": 1704067200,        // Issued at
  "exp": 1704153600         // Expiration (24 hours)
}
```

### Token Refresh

Tokens expire after 24 hours. Refresh before expiration:

```typescript
// Check if token is about to expire
const tokenData = JSON.parse(atob(token.split('.')[1]));
const expiresIn = tokenData.exp * 1000 - Date.now();

if (expiresIn < 3600000) { // Less than 1 hour
  const refreshResponse = await fetch('/api/auth/refresh', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const { token: newToken } = await refreshResponse.json();
}
```

## Smart Contract Authentication

### Wallet Connection

Smart contract interactions require wallet connection:

```typescript
import { useAccount, useConnect } from 'wagmi';

function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  if (isConnected) {
    return <div>Connected: {address}</div>;
  }

  return (
    <button onClick={() => connect({ connector: connectors[0] })}>
      Connect Wallet
    </button>
  );
}
```

### Signature-Based Minting

NFT minting requires a platform signature:

```typescript
// 1. Generate music and get signature from backend
const { metadataUri, audioHash, signature } = await fetch('/api/nft/prepare', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ generationId })
}).then(r => r.json());

// 2. Call contract with signature
const tx = await songNFTContract.mint(
  metadataUri,
  audioHash,
  signature
);

await tx.wait();
```

### Signature Verification

The contract verifies signatures:

```solidity
// Contract-side verification
function mint(
    string calldata metadataURI,
    bytes32 audioHash,
    bytes calldata signature
) external {
    bytes32 hash = keccak256(abi.encodePacked(
        msg.sender,
        metadataURI,
        audioHash
    ));

    address signer = ECDSA.recover(
        hash.toEthSignedMessageHash(),
        signature
    );

    require(signer == platformSigner, "Invalid signature");
    require(!usedSignatures[signature], "Signature used");

    usedSignatures[signature] = true;
    // ... mint NFT
}
```

## Error Handling

### Authentication Errors

| Error Code | Description | Solution |
|------------|-------------|----------|
| `AUTH_REQUIRED` | No token provided | Include Authorization header |
| `TOKEN_EXPIRED` | JWT has expired | Refresh or re-authenticate |
| `TOKEN_INVALID` | Malformed or tampered token | Re-authenticate |
| `SIGNATURE_INVALID` | Contract signature invalid | Request new signature from backend |
| `SIGNATURE_USED` | Replay attack detected | Request new signature |

### Example Error Response

```json
{
  "error": "TOKEN_EXPIRED",
  "message": "Authentication token has expired",
  "details": {
    "expiredAt": "2024-01-01T12:00:00Z"
  }
}
```

## Security Best Practices

1. **Never expose private keys** - Keep platform signing key secure
2. **Use HTTPS only** - All API calls over TLS
3. **Validate signatures** - Always verify on-chain
4. **Short token lifetimes** - 24 hour JWT expiration
5. **Prevent replay attacks** - Track used signatures

## Related

- [Backend API](/api-reference/backend-api)
- [Contract ABI](/api-reference/contract-abi)
- [Smart Contracts Overview](/smart-contracts/overview)
