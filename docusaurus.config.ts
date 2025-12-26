import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'AceSteps Documentation',
  tagline: 'AI-Powered Music Creation & Tokenization Platform',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://docs.acesteps.xyz',
  baseUrl: '/',

  organizationName: 'acesteps',
  projectName: 'acesteps-docs',

  onBrokenLinks: 'warn',
  onBrokenAnchors: 'warn',
  staticDirectories: ['static'],

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        docsRouteBasePath: '/',
        indexBlog: false,
      },
    ],
    '@docusaurus/theme-live-codeblock',
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl: 'https://github.com/Batuhan4/acesteps-docs/edit/main/',
          breadcrumbs: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'keywords',
        content: 'music, nft, ai, blockchain, base, farcaster, web3, tokenization, streaming',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:type',
        content: 'website',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    },
  ],

  themeConfig: {
    image: 'img/acesteps-social-card.jpg',
    metadata: [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@acesteps' },
      { name: 'og:site_name', content: 'AceSteps Documentation' },
    ],
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    navbar: {
      title: 'AceSteps',
      logo: {
        alt: 'AceSteps Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/get-started/overview',
          label: 'Get Started',
          position: 'left',
          activeBaseRegex: '/get-started/',
        },
        {
          to: '/music-creation/overview',
          label: 'Music Creation',
          position: 'left',
          activeBaseRegex: '/music-creation/',
        },
        {
          to: '/tokenization/overview',
          label: 'Tokenization',
          position: 'left',
          activeBaseRegex: '/tokenization/',
        },
        {
          to: '/smart-contracts/overview',
          label: 'Contracts',
          position: 'left',
          activeBaseRegex: '/smart-contracts/',
        },
        {
          to: '/trading/overview',
          label: 'Trading',
          position: 'left',
          activeBaseRegex: '/trading/',
        },
        {
          to: '/cookbook/create-first-song',
          label: 'Cookbook',
          position: 'left',
          activeBaseRegex: '/cookbook/',
        },
        {
          href: '/pitch-deck.html',
          label: 'Pitch Deck',
          position: 'right',
          className: 'navbar-pitch-deck-link',
        },
        {
          href: 'https://github.com/Batuhan4/acesteps-docs',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Get Started', to: '/get-started/overview'},
            {label: 'Cookbook', to: '/cookbook/create-first-song'},
            {label: 'API Reference', to: '/api-reference/overview'},
          ],
        },
        {
          title: 'Community',
          items: [
            {label: 'Farcaster', href: 'https://warpcast.com/acesteps'},
            {label: 'Twitter/X', href: 'https://x.com/acesteps'},
          ],
        },
        {
          title: 'More',
          items: [
            {label: 'GitHub', href: 'https://github.com/Batuhan4/acesteps-docs'},
            {label: 'Base Network', href: 'https://base.org'},
          ],
        },
      ],
      copyright: `Copyright ${new Date().getFullYear()} AceSteps. Built on Base.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['solidity', 'bash', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
