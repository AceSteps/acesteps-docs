# Phase 5: Advanced Features & Integrations

## Overview
Implement advanced documentation features including interactive elements, API documentation, versioning, and integrations.

---

## 5.1 Search Implementation

### 5.1.1 Algolia DocSearch (Production)

1. **Apply for DocSearch**: https://docsearch.algolia.com/apply/
2. **Configuration**:

```typescript
// docusaurus.config.ts
themeConfig: {
  algolia: {
    appId: 'YOUR_APP_ID',
    apiKey: 'YOUR_SEARCH_ONLY_API_KEY',
    indexName: 'acesteps',
    contextualSearch: true,
    searchParameters: {},
    searchPagePath: 'search',
  },
}
```

### 5.1.2 Local Search (Development/Fallback)

```bash
npm install @easyops-cn/docusaurus-search-local
```

```typescript
// docusaurus.config.ts
themes: [
  [
    '@easyops-cn/docusaurus-search-local',
    {
      hashed: true,
      language: ['en'],
      highlightSearchTermsOnTargetPage: true,
      docsRouteBasePath: '/',
      indexBlog: false,
      searchBarShortcutHint: true,
    },
  ],
],
```

---

## 5.2 Interactive Code Playground

### 5.2.1 Live Code Blocks

```bash
npm install @docusaurus/theme-live-codeblock
```

```typescript
// docusaurus.config.ts
themes: ['@docusaurus/theme-live-codeblock'],
```

Usage in MDX:
```mdx
```tsx live
function Demo() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Clicks: {count}
    </button>
  );
}
```

### 5.2.2 Embedded Sandboxes

```tsx
// src/components/CodeSandbox/index.tsx
import React from 'react';

interface CodeSandboxProps {
  id: string;
  title?: string;
}

export default function CodeSandbox({ id, title }: CodeSandboxProps) {
  return (
    <iframe
      src={`https://codesandbox.io/embed/${id}?fontsize=14&hidenavigation=1&theme=dark`}
      style={{
        width: '100%',
        height: '500px',
        border: '1px solid var(--ifm-toc-border-color)',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
      title={title || 'CodeSandbox'}
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    />
  );
}
```

---

## 5.3 API Documentation

### 5.3.1 OpenAPI Integration

```bash
npm install docusaurus-plugin-openapi-docs
npm install @theme/docusaurus-theme-openapi-docs
```

```typescript
// docusaurus.config.ts
plugins: [
  [
    'docusaurus-plugin-openapi-docs',
    {
      id: 'api',
      docsPluginId: 'classic',
      config: {
        acesteps: {
          specPath: 'static/openapi.yaml',
          outputDir: 'docs/api-reference/generated',
          sidebarOptions: {
            groupPathsBy: 'tag',
          },
        },
      },
    },
  ],
],
themes: ['docusaurus-theme-openapi-docs'],
```

### 5.3.2 OpenAPI Spec Structure

```yaml
# static/openapi.yaml
openapi: 3.0.3
info:
  title: AceSteps API
  version: 1.0.0
  description: API for AceSteps music creation platform

servers:
  - url: https://api.acesteps.xyz/v1
    description: Production server

paths:
  /music/generate:
    post:
      summary: Generate music from prompt
      tags:
        - Music Generation
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                prompt:
                  type: string
                  description: Text description of the music
                duration:
                  type: integer
                  description: Duration in seconds
      responses:
        '200':
          description: Music generated successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: string
                  audio_url:
                    type: string
                  metadata:
                    type: object

  /nft/mint:
    post:
      summary: Mint a song as NFT
      tags:
        - NFT
      # ... more endpoints
```

---

## 5.4 Contract ABI Documentation

### 5.4.1 ABI Documentation Component

```tsx
// src/components/ContractABI/index.tsx
import React, { useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import styles from './styles.module.css';

interface ABIFunction {
  name: string;
  type: string;
  inputs: Array<{ name: string; type: string }>;
  outputs?: Array<{ name: string; type: string }>;
  stateMutability?: string;
}

interface ContractABIProps {
  name: string;
  address: string;
  abi: ABIFunction[];
}

export default function ContractABI({ name, address, abi }: ContractABIProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const functions = abi.filter(item => item.type === 'function');
  const events = abi.filter(item => item.type === 'event');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{name}</h3>
        <code className={styles.address}>{address}</code>
      </div>

      <h4>Functions</h4>
      {functions.map((fn) => (
        <div
          key={fn.name}
          className={styles.function}
          onClick={() => setExpanded(expanded === fn.name ? null : fn.name)}
        >
          <div className={styles.signature}>
            <span className={styles.fnName}>{fn.name}</span>
            <span className={styles.params}>
              ({fn.inputs.map(i => `${i.type} ${i.name}`).join(', ')})
            </span>
            {fn.stateMutability && (
              <span className={styles.mutability}>{fn.stateMutability}</span>
            )}
          </div>
          {expanded === fn.name && (
            <div className={styles.details}>
              <h5>Inputs</h5>
              <ul>
                {fn.inputs.map((input, idx) => (
                  <li key={idx}>
                    <code>{input.type}</code> {input.name}
                  </li>
                ))}
              </ul>
              {fn.outputs && (
                <>
                  <h5>Returns</h5>
                  <ul>
                    {fn.outputs.map((output, idx) => (
                      <li key={idx}>
                        <code>{output.type}</code> {output.name}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
        </div>
      ))}

      <h4>Events</h4>
      {events.map((event) => (
        <div key={event.name} className={styles.event}>
          <span className={styles.eventName}>{event.name}</span>
          <span className={styles.params}>
            ({event.inputs.map(i => `${i.type} ${i.name}`).join(', ')})
          </span>
        </div>
      ))}
    </div>
  );
}
```

---

## 5.5 Version Dropdown

### 5.5.1 Docs Versioning

```typescript
// docusaurus.config.ts
docs: {
  lastVersion: 'current',
  versions: {
    current: {
      label: 'v1.0 (Latest)',
      path: '',
    },
  },
},
```

Create a new version:
```bash
npm run docusaurus docs:version 1.0
```

### 5.5.2 Version Dropdown in Navbar

```typescript
navbar: {
  items: [
    {
      type: 'docsVersionDropdown',
      position: 'right',
      dropdownActiveClassDisabled: true,
    },
  ],
}
```

---

## 5.6 GitHub Integration

### 5.6.1 Edit on GitHub Link

```typescript
// docusaurus.config.ts
docs: {
  editUrl: 'https://github.com/Batuhan4/base-mini-docs/edit/main/',
  showLastUpdateTime: true,
  showLastUpdateAuthor: true,
}
```

### 5.6.2 Issue/Feedback Button

```tsx
// src/components/FeedbackButton/index.tsx
import React from 'react';
import { useDoc } from '@docusaurus/theme-common/internal';
import styles from './styles.module.css';

export default function FeedbackButton() {
  const { metadata } = useDoc();
  const issueUrl = `https://github.com/Batuhan4/base-mini-docs/issues/new?title=Feedback: ${metadata.title}&body=Page: ${metadata.permalink}`;

  return (
    <div className={styles.container}>
      <span>Was this page helpful?</span>
      <a href={issueUrl} target="_blank" rel="noopener noreferrer">
        Report an issue
      </a>
    </div>
  );
}
```

---

## 5.7 Analytics & Monitoring

### 5.7.1 Google Analytics

```bash
npm install @docusaurus/plugin-google-gtag
```

```typescript
// docusaurus.config.ts
plugins: [
  [
    '@docusaurus/plugin-google-gtag',
    {
      trackingID: 'G-XXXXXXXXXX',
      anonymizeIP: true,
    },
  ],
],
```

### 5.7.2 Posthog Analytics

```typescript
// src/theme/Root.tsx
import React from 'react';
import { PostHogProvider } from 'posthog-js/react';

export default function Root({ children }) {
  return (
    <PostHogProvider
      apiKey="YOUR_POSTHOG_KEY"
      options={{ api_host: 'https://app.posthog.com' }}
    >
      {children}
    </PostHogProvider>
  );
}
```

---

## 5.8 PWA Support

```bash
npm install @docusaurus/plugin-pwa
```

```typescript
// docusaurus.config.ts
plugins: [
  [
    '@docusaurus/plugin-pwa',
    {
      debug: true,
      offlineModeActivationStrategies: [
        'appInstalled',
        'standalone',
        'queryString',
      ],
      pwaHead: [
        {
          tagName: 'link',
          rel: 'icon',
          href: '/img/logo.png',
        },
        {
          tagName: 'link',
          rel: 'manifest',
          href: '/manifest.json',
        },
        {
          tagName: 'meta',
          name: 'theme-color',
          content: '#3b82f6',
        },
      ],
    },
  ],
],
```

---

## 5.9 Internationalization (i18n)

### 5.9.1 Configure i18n

```typescript
// docusaurus.config.ts
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'tr', 'es'],
  localeConfigs: {
    en: {
      label: 'English',
      direction: 'ltr',
    },
    tr: {
      label: 'Türkçe',
      direction: 'ltr',
    },
  },
},
```

### 5.9.2 Language Dropdown

```typescript
navbar: {
  items: [
    {
      type: 'localeDropdown',
      position: 'right',
    },
  ],
}
```

---

## 5.10 Deliverables Checklist

- [ ] Implement search (Algolia or local)
- [ ] Set up live code blocks
- [ ] Create API documentation from OpenAPI spec
- [ ] Build Contract ABI documentation component
- [ ] Configure version dropdown
- [ ] Add "Edit on GitHub" links
- [ ] Implement feedback/issue buttons
- [ ] Set up analytics (GA or PostHog)
- [ ] Configure PWA support (optional)
- [ ] Set up i18n structure (optional)
- [ ] Add keyboard shortcuts (Cmd+K for search)
- [ ] Test all interactive features

---

## 5.11 Success Criteria

1. Search returns accurate results
2. Live code blocks work in playground
3. API documentation renders correctly
4. Contract ABIs are interactive
5. Version switching works
6. GitHub integration functional
7. Analytics tracking events
8. All keyboard shortcuts work
