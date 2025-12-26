# Phase 6: Testing, Optimization & Deployment

## Overview
Final phase covering testing, performance optimization, SEO, accessibility, and production deployment.

---

## 6.1 Testing Strategy

### 6.1.1 Link Validation

```bash
npm install -D broken-link-checker
```

```json
// package.json
{
  "scripts": {
    "check-links": "blc http://localhost:3000 -ro --exclude-external"
  }
}
```

### 6.1.2 Build Testing

```bash
# Test production build locally
npm run build
npm run serve

# Check for build errors
npm run build 2>&1 | grep -i error
```

### 6.1.3 Content Linting

```bash
npm install -D markdownlint-cli
```

```json
// .markdownlint.json
{
  "default": true,
  "MD013": false,
  "MD033": false,
  "MD041": false
}
```

```json
// package.json
{
  "scripts": {
    "lint:md": "markdownlint 'docs/**/*.md' --fix"
  }
}
```

### 6.1.4 Visual Regression Testing (Optional)

```bash
npm install -D @playwright/test
```

```typescript
// tests/visual.spec.ts
import { test, expect } from '@playwright/test';

test('homepage visual', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveScreenshot('homepage.png');
});

test('docs page visual', async ({ page }) => {
  await page.goto('/get-started/overview');
  await expect(page).toHaveScreenshot('docs-overview.png');
});
```

---

## 6.2 Performance Optimization

### 6.2.1 Image Optimization

```bash
npm install @docusaurus/plugin-ideal-image
```

```typescript
// docusaurus.config.ts
plugins: [
  [
    '@docusaurus/plugin-ideal-image',
    {
      quality: 85,
      max: 1200,
      min: 640,
      steps: 4,
      disableInDev: false,
    },
  ],
],
```

Usage:
```tsx
import Image from '@theme/IdealImage';

<Image img={require('./screenshot.png')} />
```

### 6.2.2 Bundle Analysis

```bash
npm run build -- --bundle-analyzer
```

### 6.2.3 Lazy Loading

```typescript
// Lazy load heavy components
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function Page() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </React.Suspense>
  );
}
```

### 6.2.4 Performance Checklist

- [ ] Minimize JavaScript bundle size
- [ ] Optimize images (WebP format, proper sizing)
- [ ] Enable caching headers
- [ ] Use CDN for static assets
- [ ] Minimize CSS (purge unused)
- [ ] Defer non-critical scripts
- [ ] Preload critical fonts

---

## 6.3 SEO Optimization

### 6.3.1 Meta Tags Configuration

```typescript
// docusaurus.config.ts
themeConfig: {
  metadata: [
    { name: 'keywords', content: 'music, nft, ai, blockchain, base, farcaster' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'og:type', content: 'website' },
  ],
  image: 'img/social-card.png',
}
```

### 6.3.2 Sitemap Generation

```typescript
// docusaurus.config.ts
presets: [
  [
    'classic',
    {
      sitemap: {
        changefreq: 'weekly',
        priority: 0.5,
        ignorePatterns: ['/tags/**'],
        filename: 'sitemap.xml',
      },
    },
  ],
],
```

### 6.3.3 Robots.txt

```txt
// static/robots.txt
User-agent: *
Allow: /

Sitemap: https://docs.acesteps.xyz/sitemap.xml
```

### 6.3.4 Structured Data (JSON-LD)

```tsx
// src/theme/Root.tsx
import Head from '@docusaurus/Head';

export default function Root({ children }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AceSteps Documentation',
    url: 'https://docs.acesteps.xyz',
    description: 'AI-Powered Music Creation & Tokenization Platform',
  };

  return (
    <>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>
      {children}
    </>
  );
}
```

---

## 6.4 Accessibility (a11y)

### 6.4.1 Accessibility Testing

```bash
npm install -D @axe-core/cli
```

```json
// package.json
{
  "scripts": {
    "test:a11y": "axe http://localhost:3000 --exit"
  }
}
```

### 6.4.2 Accessibility Checklist

- [ ] All images have alt text
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Keyboard navigation works throughout
- [ ] Focus states are visible
- [ ] Skip to content link exists
- [ ] Headings are properly hierarchical
- [ ] Links have descriptive text
- [ ] Form inputs have labels
- [ ] ARIA labels where needed
- [ ] Screen reader tested

### 6.4.3 Focus Visible Styles

```css
/* src/css/custom.css */
:focus-visible {
  outline: 2px solid var(--ifm-color-primary);
  outline-offset: 2px;
}

.skipToContent_node {
  position: absolute;
  left: -9999px;
}

.skipToContent_node:focus {
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 9999;
  padding: 1rem;
  background: var(--ifm-color-primary);
  color: white;
  border-radius: 0.5rem;
}
```

---

## 6.5 Security

### 6.5.1 Content Security Policy

```typescript
// docusaurus.config.ts
headTags: [
  {
    tagName: 'meta',
    attributes: {
      'http-equiv': 'Content-Security-Policy',
      content: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
    },
  },
],
```

### 6.5.2 Security Headers (via hosting)

```
# Vercel vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

---

## 6.6 Deployment Options

### 6.6.1 Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "framework": "docusaurus-2",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### 6.6.2 GitHub Pages

```typescript
// docusaurus.config.ts
url: 'https://batuhan4.github.io',
baseUrl: '/base-mini-docs/',
organizationName: 'Batuhan4',
projectName: 'base-mini-docs',
deploymentBranch: 'gh-pages',
trailingSlash: false,
```

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: build
      - uses: actions/deploy-pages@v4
```

### 6.6.3 Netlify

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 6.6.4 Cloudflare Pages

```yaml
# Dashboard settings
Build command: npm run build
Build output directory: build
Root directory: /
```

---

## 6.7 CI/CD Pipeline

### 6.7.1 GitHub Actions Workflow

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint markdown
        run: npm run lint:md

      - name: Build
        run: npm run build

      - name: Check links
        run: |
          npm run serve &
          sleep 5
          npm run check-links

  deploy:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 6.8 Monitoring & Maintenance

### 6.8.1 Uptime Monitoring

- Use UptimeRobot or Pingdom
- Monitor: `https://docs.acesteps.xyz`
- Alert on downtime

### 6.8.2 Performance Monitoring

- Lighthouse CI
- Web Vitals tracking

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI

on: [push]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Lighthouse
        uses: treosh/lighthouse-ci-action@v11
        with:
          urls: |
            https://docs.acesteps.xyz/
            https://docs.acesteps.xyz/get-started/overview
          uploadArtifacts: true
```

### 6.8.3 Dependency Updates

```yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

---

## 6.9 Launch Checklist

### Pre-Launch
- [ ] All content reviewed and approved
- [ ] All links verified (no 404s)
- [ ] Mobile responsive tested
- [ ] Dark/light theme tested
- [ ] Search functionality working
- [ ] Analytics configured
- [ ] SEO meta tags in place
- [ ] Social card image created
- [ ] Favicon added
- [ ] robots.txt created
- [ ] sitemap.xml generated

### Launch Day
- [ ] Deploy to production
- [ ] Verify SSL certificate
- [ ] Test all pages load
- [ ] Test search works
- [ ] Submit sitemap to Google Search Console
- [ ] Announce launch on social media

### Post-Launch
- [ ] Monitor analytics
- [ ] Check for 404 errors
- [ ] Gather user feedback
- [ ] Plan content updates
- [ ] Set up regular maintenance schedule

---

## 6.10 Success Criteria

1. **Build**: Production build completes without errors
2. **Performance**: Lighthouse score > 90 on all metrics
3. **Accessibility**: No WCAG AA violations
4. **SEO**: All pages indexed by Google
5. **Uptime**: 99.9% availability
6. **Links**: Zero broken links
7. **Mobile**: Fully responsive on all devices
8. **Search**: Accurate search results

---

## 6.11 Post-Launch Roadmap

### Month 1
- Monitor user behavior
- Fix reported issues
- Add missing content based on feedback

### Month 2-3
- Add video tutorials
- Expand cookbook section
- Implement community contributions

### Month 4-6
- Add more languages (i18n)
- API versioning
- Interactive tutorials

---

## Summary

This documentation project follows the Base docs design system and implements:

| Phase | Focus | Key Deliverables |
|-------|-------|------------------|
| 1 | Setup | Docusaurus project, config, structure |
| 2 | Navigation | Sidebar, TOC, search, breadcrumbs |
| 3 | Content | All documentation pages written |
| 4 | Styling | Custom CSS, components, theming |
| 5 | Features | Search, API docs, versioning |
| 6 | Deploy | Testing, optimization, CI/CD, launch |

**Total estimated pages**: 30-40 documentation pages
**Framework**: Docusaurus 3.x with TypeScript
**Hosting**: Vercel (recommended)
**Design**: Matching Base docs dark theme
