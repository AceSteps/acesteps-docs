---
sidebar_position: 3
title: Installation
description: Set up your development environment for AceSteps
---

# Installation

Set up your development environment to build on AceSteps.

## Requirements

- Node.js 18+
- npm or yarn
- Git

## Clone the Repository

```bash
git clone https://github.com/Batuhan4/acesteps.git
cd acesteps
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The development server will start at `http://localhost:5173`.

## Environment Variables

Create a `.env.local` file:

```bash
VITE_WC_PROJECT_ID=your_walletconnect_project_id
```

## Smart Contract Development

For smart contract development, see the [Smart Contracts](/smart-contracts/overview) section.

## Next Steps

- [Create Your First Song](/cookbook/create-first-song)
- [API Reference](/api-reference/overview)
