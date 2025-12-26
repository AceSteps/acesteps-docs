# Phase 4: UI Components & Styling

## Overview
Create custom UI components and apply styling to match Base docs design system.

---

## 4.1 Design System Analysis (Base Docs)

### Color Palette
```css
/* Dark Theme (Default) */
--bg-primary: #0a0a0a;          /* Main background */
--bg-secondary: #141414;         /* Card/sidebar background */
--bg-tertiary: #1a1a1a;          /* Hover states */
--text-primary: #ffffff;         /* Main text */
--text-secondary: #a1a1aa;       /* Secondary text */
--text-muted: #71717a;           /* Muted text */
--accent-blue: #3b82f6;          /* Links, active states */
--accent-green: #22c55e;         /* Success */
--accent-yellow: #eab308;        /* Warning */
--accent-red: #ef4444;           /* Error */
--border-color: #27272a;         /* Borders */

/* Light Theme */
--bg-primary: #ffffff;
--bg-secondary: #f4f4f5;
--text-primary: #18181b;
--text-secondary: #52525b;
```

### Typography
```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
```

### Spacing
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
```

---

## 4.2 Custom CSS (src/css/custom.css)

```css
/**
 * AceSteps Documentation - Custom Styles
 * Matching Base Docs design system
 */

/* Import fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  /* Primary colors - matching Base */
  --ifm-color-primary: #3b82f6;
  --ifm-color-primary-dark: #2563eb;
  --ifm-color-primary-darker: #1d4ed8;
  --ifm-color-primary-darkest: #1e40af;
  --ifm-color-primary-light: #60a5fa;
  --ifm-color-primary-lighter: #93c5fd;
  --ifm-color-primary-lightest: #bfdbfe;

  /* Fonts */
  --ifm-font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --ifm-font-family-monospace: 'JetBrains Mono', 'Fira Code', monospace;

  /* Code blocks */
  --ifm-code-font-size: 0.875rem;
  --ifm-code-border-radius: 0.5rem;
  --ifm-code-padding-vertical: 0.1rem;
  --ifm-code-padding-horizontal: 0.3rem;

  /* Sidebar */
  --doc-sidebar-width: 280px;
  --ifm-sidebar-background: transparent;
}

/* Dark theme */
[data-theme='dark'] {
  --ifm-background-color: #0a0a0a;
  --ifm-background-surface-color: #141414;
  --ifm-navbar-background-color: #0a0a0a;
  --ifm-footer-background-color: #0a0a0a;
  --ifm-toc-border-color: #27272a;
  --ifm-color-emphasis-300: #27272a;
}

/* Light theme */
[data-theme='light'] {
  --ifm-background-color: #ffffff;
  --ifm-background-surface-color: #f4f4f5;
  --ifm-navbar-background-color: #ffffff;
}

/* Navbar styling */
.navbar {
  border-bottom: 1px solid var(--ifm-toc-border-color);
  backdrop-filter: blur(8px);
  background: rgba(10, 10, 10, 0.8);
}

.navbar__title {
  font-weight: 700;
  font-size: 1.125rem;
}

.navbar__link {
  font-weight: 500;
  font-size: 0.875rem;
}

/* Sidebar styling */
.theme-doc-sidebar-container {
  border-right: 1px solid var(--ifm-toc-border-color);
}

.menu__link {
  font-size: 0.875rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  transition: background-color 0.15s ease;
}

.menu__link:hover {
  background-color: var(--ifm-background-surface-color);
}

.menu__link--active {
  background-color: rgba(59, 130, 246, 0.1);
  color: var(--ifm-color-primary);
}

/* Category labels */
.menu__list-item-collapsible > .menu__link {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  color: var(--ifm-color-emphasis-600);
}

/* TOC (On this page) */
.table-of-contents {
  font-size: 0.8125rem;
}

.table-of-contents__link {
  color: var(--ifm-color-emphasis-600);
}

.table-of-contents__link--active {
  color: var(--ifm-color-primary);
  font-weight: 500;
}

/* Main content area */
.markdown {
  --ifm-heading-font-weight: 600;
}

.markdown h1 {
  font-size: 2.25rem;
  margin-bottom: 1.5rem;
}

.markdown h2 {
  font-size: 1.5rem;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--ifm-toc-border-color);
}

.markdown h3 {
  font-size: 1.25rem;
  margin-top: 2rem;
}

/* Code blocks */
.prism-code {
  background-color: #1a1a1a !important;
  border-radius: 0.5rem;
  font-size: 0.875rem;
}

code {
  background-color: rgba(59, 130, 246, 0.1);
  color: var(--ifm-color-primary);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

/* Admonitions / Callouts */
.alert {
  border-radius: 0.5rem;
  border-left-width: 4px;
}

.alert--info {
  --ifm-alert-background-color: rgba(59, 130, 246, 0.1);
  --ifm-alert-border-color: #3b82f6;
}

.alert--warning {
  --ifm-alert-background-color: rgba(234, 179, 8, 0.1);
  --ifm-alert-border-color: #eab308;
}

.alert--danger {
  --ifm-alert-background-color: rgba(239, 68, 68, 0.1);
  --ifm-alert-border-color: #ef4444;
}

.alert--success {
  --ifm-alert-background-color: rgba(34, 197, 94, 0.1);
  --ifm-alert-border-color: #22c55e;
}

/* Tables */
table {
  display: table;
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid var(--ifm-toc-border-color);
  padding: 0.75rem 1rem;
}

th {
  background-color: var(--ifm-background-surface-color);
  font-weight: 600;
  text-align: left;
}

/* Breadcrumbs */
.breadcrumbs__link {
  font-size: 0.875rem;
  color: var(--ifm-color-emphasis-600);
}

/* Search */
.DocSearch-Button {
  border-radius: 0.5rem !important;
  background-color: var(--ifm-background-surface-color) !important;
}

/* Footer */
.footer {
  border-top: 1px solid var(--ifm-toc-border-color);
  padding: 3rem 0;
}

.footer__title {
  font-weight: 600;
  font-size: 0.875rem;
}

.footer__link-item {
  font-size: 0.875rem;
  color: var(--ifm-color-emphasis-600);
}

/* Copy button */
.copyButton {
  border-radius: 0.375rem;
  background-color: transparent;
}

/* Pagination */
.pagination-nav__link {
  border-radius: 0.5rem;
  border: 1px solid var(--ifm-toc-border-color);
}

/* Mobile responsive */
@media (max-width: 996px) {
  .navbar__items {
    gap: 0.5rem;
  }

  .markdown h1 {
    font-size: 1.75rem;
  }
}
```

---

## 4.3 Custom Components

### 4.3.1 FeatureCard Component

```tsx
// src/components/FeatureCard/index.tsx
import React from 'react';
import styles from './styles.module.css';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
  link,
}: FeatureCardProps): JSX.Element {
  const Card = link ? 'a' : 'div';
  return (
    <Card className={styles.card} href={link}>
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </Card>
  );
}
```

```css
/* src/components/FeatureCard/styles.module.css */
.card {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background: var(--ifm-background-surface-color);
  border: 1px solid var(--ifm-toc-border-color);
  border-radius: 0.75rem;
  transition: all 0.2s ease;
  text-decoration: none;
  color: inherit;
}

.card:hover {
  border-color: var(--ifm-color-primary);
  transform: translateY(-2px);
}

.icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
}

.description {
  font-size: 0.875rem;
  color: var(--ifm-color-emphasis-600);
  margin: 0;
}
```

### 4.3.2 CodeTabs Component

```tsx
// src/components/CodeTabs/index.tsx
import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

interface CodeTabsProps {
  tabs: Array<{
    label: string;
    language: string;
    code: string;
  }>;
}

export default function CodeTabs({ tabs }: CodeTabsProps): JSX.Element {
  return (
    <Tabs>
      {tabs.map((tab, idx) => (
        <TabItem key={idx} value={tab.label.toLowerCase()} label={tab.label}>
          <CodeBlock language={tab.language}>{tab.code}</CodeBlock>
        </TabItem>
      ))}
    </Tabs>
  );
}
```

### 4.3.3 ContractCard Component

```tsx
// src/components/ContractCard/index.tsx
import React from 'react';
import styles from './styles.module.css';

interface ContractCardProps {
  name: string;
  description: string;
  address: string;
  network: string;
  docsLink: string;
}

export default function ContractCard({
  name,
  description,
  address,
  network,
  docsLink,
}: ContractCardProps): JSX.Element {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.name}>{name}</h3>
        <span className={styles.network}>{network}</span>
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.address}>
        <code>{address}</code>
        <button
          className={styles.copyBtn}
          onClick={() => navigator.clipboard.writeText(address)}
        >
          Copy
        </button>
      </div>
      <a href={docsLink} className={styles.link}>View Documentation →</a>
    </div>
  );
}
```

### 4.3.4 StepGuide Component

```tsx
// src/components/StepGuide/index.tsx
import React from 'react';
import styles from './styles.module.css';

interface Step {
  number: number;
  title: string;
  description: string;
  code?: string;
}

interface StepGuideProps {
  steps: Step[];
}

export default function StepGuide({ steps }: StepGuideProps): JSX.Element {
  return (
    <div className={styles.container}>
      {steps.map((step) => (
        <div key={step.number} className={styles.step}>
          <div className={styles.number}>{step.number}</div>
          <div className={styles.content}>
            <h4 className={styles.title}>{step.title}</h4>
            <p className={styles.description}>{step.description}</p>
            {step.code && (
              <pre className={styles.code}>
                <code>{step.code}</code>
              </pre>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
```

---

## 4.4 Icons & Assets

### Logo Files Required
```
static/
├── img/
│   ├── logo.svg              # Main logo (dark theme)
│   ├── logo-light.svg        # Logo for light theme
│   ├── favicon.ico           # Browser favicon
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   └── social-card.png       # Open Graph image
```

### Icon Set
Use Lucide React icons (same as Base docs):
```bash
npm install lucide-react
```

---

## 4.5 Deliverables Checklist

- [ ] Create custom.css with full styling
- [ ] Implement dark/light theme colors
- [ ] Style navbar and sidebar
- [ ] Style code blocks and syntax highlighting
- [ ] Style callouts/admonitions
- [ ] Create FeatureCard component
- [ ] Create CodeTabs component
- [ ] Create ContractCard component
- [ ] Create StepGuide component
- [ ] Add logo and favicon files
- [ ] Configure typography (Inter, JetBrains Mono)
- [ ] Implement responsive design
- [ ] Test across browsers (Chrome, Firefox, Safari)

---

## 4.6 Success Criteria

1. Visual appearance matches Base docs style
2. Dark theme is default and polished
3. Light theme works correctly
4. All custom components render properly
5. Code blocks have syntax highlighting
6. Mobile responsive on all screen sizes
7. Consistent spacing and typography
