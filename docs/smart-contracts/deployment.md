---
sidebar_position: 3
title: Deployment
description: Contract deployment addresses and verification
---

# Deployment

Contract addresses and deployment information.

## Base Mainnet

:::info Coming Soon
Mainnet deployment pending audit completion.
:::

| Contract | Address | Verified |
|----------|---------|----------|
| SongNFT | `TBD` | - |
| SongVault | `TBD` | - |
| RevenueHook | `TBD` | - |

## Base Sepolia (Testnet)

| Contract | Address | Verified |
|----------|---------|----------|
| SongNFT | `0x...` | Yes |
| SongVault | `0x...` | Yes |
| RevenueHook | `0x...` | Yes |

## Deployment Scripts

### Using Foundry

```bash
# Deploy all contracts
forge script script/Deploy.s.sol:DeployScript \
  --rpc-url $BASE_RPC_URL \
  --broadcast \
  --verify

# Verify contracts
forge verify-contract \
  --chain base \
  $CONTRACT_ADDRESS \
  src/SongNFT.sol:SongNFT
```

### Using Hardhat

```bash
# Deploy
npx hardhat run scripts/deploy.ts --network base

# Verify
npx hardhat verify --network base $CONTRACT_ADDRESS
```

## Environment Variables

```bash
# .env
BASE_RPC_URL=https://mainnet.base.org
PRIVATE_KEY=your_private_key
BASESCAN_API_KEY=your_api_key
PLATFORM_SIGNER=0x...
```

## Post-Deployment

After deployment:

1. Verify all contracts on Basescan
2. Update frontend with new addresses
3. Configure platform signer
4. Test minting flow
5. Initialize hook with PoolManager

## Related

- [Contract ABIs](/smart-contracts/contract-abis)
- [Wagmi Integration](/smart-contracts/wagmi-integration)
