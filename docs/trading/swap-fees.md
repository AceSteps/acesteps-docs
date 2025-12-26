---
sidebar_position: 4
title: Swap Fees
description: Understanding trading fees on AceSteps
---

# Swap Fees

Understanding the fee structure for trading song tokens.

## Fee Structure

| Fee Type | Amount | Recipient |
|----------|--------|-----------|
| Swap Fee | 1% | LP Position |
| Gas | Variable | Network |

## How Fees Work

### Swap Fee (1%)

Every trade on Uniswap V4 incurs a 1% fee:

```
User buys 1,000 tokens for 0.1 ETH
Swap fee: 0.001 ETH (1%)
User receives: 1,000 tokens
Pool receives: 0.099 ETH + 0.001 ETH fee
```

### Fee Collection

The platform owns the initial LP position:

- Fees accumulate in the position
- Platform can claim fees periodically
- Fees fund platform operations

## Fee Calculation

```solidity
// Uniswap V4 pool configuration
uint24 fee = 10000; // 1% = 10000 bps

// Fee calculation
uint256 feeAmount = (swapAmount * fee) / 1_000_000;
```

## Gas Costs

Gas costs vary by network conditions:

| Operation | Typical Gas | Cost (@ 0.01 gwei) |
|-----------|-------------|---------------------|
| Swap | ~150,000 | ~$0.01 |
| Add Liquidity | ~200,000 | ~$0.02 |

## Why 1% Fee?

- **Sustainable revenue** for platform
- **Competitive** with other DEXs
- **Low enough** for active trading
- **High enough** to discourage manipulation

## Related

- [Revenue Distribution](/trading/revenue-distribution)
- [Uniswap V4](/trading/uniswap-v4)
