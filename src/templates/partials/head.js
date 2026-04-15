// SEO <head> block shared by every page.
// Produces: charset, viewport, robots, title, description, canonical,
// Open Graph, Twitter Card, favicons, stylesheet, optional JSON-LD.

import { esc, abs } from '../../lib/util.js';

export function renderHead({ site, page }) {
  const title = page.title
    ? `${page.title} | ${site.title}`
    : 'Emiliano Saurin — Full-Stack Developer & Entrepreneur | njoylab.com';
  const description = page.description || site.description;
  const canonical = page.canonicalURL || abs(site.baseURL, page.path);
  const ogImage = abs(site.baseURL, page.ogImage || site.profile.image);
  const ogType = page.ogType || 'website';
  const lang = page.lang || site.lang;

  const jsonLd = page.jsonLd
    ? `<script type="application/ld+json">${JSON.stringify(page.jsonLd)}</script>`
    : '';

  return `<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="index, follow, max-image-preview:large">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="author" content="${esc(site.author.name)}">
<link rel="canonical" href="${esc(canonical)}">

<meta property="og:type" content="${esc(ogType)}">
<meta property="og:site_name" content="${esc(site.title)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:image" content="${esc(ogImage)}">
<meta property="og:locale" content="${lang === 'it' ? 'it_IT' : 'en_US'}">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@emln_">
<meta name="twitter:creator" content="@emln_">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(ogImage)}">

<link rel="icon" href="/images/favicon.ico">
<link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png">
<link rel="apple-touch-icon" href="/images/apple-touch-icon.png">
<meta name="theme-color" content="#1d1e20" media="(prefers-color-scheme: dark)">
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">

<link rel="stylesheet" href="/assets/css/style.css">
${page.preloadImage ? `<link rel="preload" as="image" href="${esc(page.preloadImage)}" fetchpriority="high">` : ''}
<link rel="alternate" type="application/rss+xml" title="${esc(site.title)} — Articles" href="/rss.xml">
${jsonLd}`;
}
