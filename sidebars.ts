import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {

  // GET STARTED SIDEBAR
  getStartedSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'get-started/overview',
        'get-started/quickstart',
        'get-started/installation',
        'get-started/architecture',
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      items: [
        'get-started/concepts/music-nfts',
        'get-started/concepts/song-tokens',
        'get-started/concepts/revenue-sharing',
      ],
    },
  ],

  // MUSIC CREATION SIDEBAR
  musicCreationSidebar: [
    {
      type: 'category',
      label: 'AI Music Creation',
      collapsed: false,
      items: [
        'music-creation/overview',
        'music-creation/ace-step-ai',
        'music-creation/prompts-guide',
        'music-creation/audio-formats',
      ],
    },
    {
      type: 'category',
      label: 'Advanced',
      items: [
        'music-creation/advanced/custom-models',
        'music-creation/advanced/batch-generation',
        'music-creation/advanced/api-integration',
      ],
    },
  ],

  // TOKENIZATION SIDEBAR
  tokenizationSidebar: [
    {
      type: 'category',
      label: 'NFT System',
      collapsed: false,
      items: [
        'tokenization/overview',
        'tokenization/minting-nfts',
        'tokenization/metadata',
      ],
    },
    {
      type: 'category',
      label: 'Song Tokens',
      items: [
        'tokenization/song-tokens',
        'tokenization/token-distribution',
        'tokenization/fractional-ownership',
      ],
    },
  ],

  // SMART CONTRACTS SIDEBAR
  contractsSidebar: [
    {
      type: 'category',
      label: 'Overview',
      collapsed: false,
      items: [
        'smart-contracts/overview',
        'smart-contracts/architecture',
        'smart-contracts/deployment',
      ],
    },
    {
      type: 'category',
      label: 'Contracts',
      items: [
        'smart-contracts/song-nft',
        'smart-contracts/song-vault',
        'smart-contracts/song-token',
        'smart-contracts/revenue-hook',
      ],
    },
    {
      type: 'category',
      label: 'Integration',
      items: [
        'smart-contracts/wagmi-integration',
        'smart-contracts/contract-abis',
        'smart-contracts/events',
      ],
    },
  ],

  // TRADING SIDEBAR
  tradingSidebar: [
    {
      type: 'category',
      label: 'Trading',
      collapsed: false,
      items: [
        'trading/overview',
        'trading/uniswap-v4',
        'trading/liquidity',
      ],
    },
    {
      type: 'category',
      label: 'Revenue',
      items: [
        'trading/swap-fees',
        'trading/revenue-distribution',
        'trading/claiming-earnings',
      ],
    },
  ],

  // FARCASTER SIDEBAR
  farcasterSidebar: [
    {
      type: 'category',
      label: 'Farcaster Integration',
      collapsed: false,
      items: [
        'farcaster/overview',
        'farcaster/mini-app',
        'farcaster/sdk-setup',
      ],
    },
    {
      type: 'category',
      label: 'Features',
      items: [
        'farcaster/frames',
        'farcaster/notifications',
        'farcaster/social-sharing',
      ],
    },
  ],

  // COOKBOOK SIDEBAR
  cookbookSidebar: [
    {
      type: 'category',
      label: 'Tutorials',
      collapsed: false,
      items: [
        'cookbook/create-first-song',
        'cookbook/mint-and-trade',
        'cookbook/earn-revenue',
        'cookbook/build-mini-app',
      ],
    },
  ],

  // LEARN SIDEBAR
  learnSidebar: [
    {
      type: 'category',
      label: 'Learn',
      collapsed: false,
      items: [
        'learn/welcome',
        'learn/how-it-works',
        'learn/tokenomics',
        'learn/faq',
      ],
    },
  ],

  // API REFERENCE SIDEBAR
  apiSidebar: [
    {
      type: 'category',
      label: 'API Reference',
      collapsed: false,
      items: [
        'api-reference/overview',
        'api-reference/backend-api',
        'api-reference/contract-abi',
      ],
    },
  ],
};

export default sidebars;
