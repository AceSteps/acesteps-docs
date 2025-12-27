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

Chain ID: `84532`

| Contract | Address | Verified |
|----------|---------|----------|
| SongNFT | [`0x4b86a687bBbf7348911cc88195e89AdA54cF5Ba7`](https://sepolia.basescan.org/address/0x4b86a687bBbf7348911cc88195e89AdA54cF5Ba7) | ✅ |
| SongVault | [`0xdcfDc1cd433Cdc0Da24Ce1b979cdeb2563598566`](https://sepolia.basescan.org/address/0xdcfDc1cd433Cdc0Da24Ce1b979cdeb2563598566) | ✅ |
| SongRevenueHook | [`0xd18424e29c61fc1adeb0538c135d61f3fa524050`](https://sepolia.basescan.org/address/0xd18424e29c61fc1adeb0538c135d61f3fa524050) | ✅ |

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
