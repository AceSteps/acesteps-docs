import React from 'react';
import Head from '@docusaurus/Head';

interface RootProps {
  children: React.ReactNode;
}

export default function Root({ children }: RootProps): JSX.Element {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AceSteps Documentation',
    url: 'https://docs.acesteps.xyz',
    description: 'AI-Powered Music Creation & Tokenization Platform on Base Network',
    publisher: {
      '@type': 'Organization',
      name: 'AceSteps',
      url: 'https://acesteps.xyz',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://docs.acesteps.xyz/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const softwareData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AceSteps',
    applicationCategory: 'MusicApplication',
    operatingSystem: 'Web',
    description: 'Create AI-generated music, mint as NFTs, and enable fractional ownership trading on Base Network',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(softwareData)}
        </script>
      </Head>
      {children}
    </>
  );
}
