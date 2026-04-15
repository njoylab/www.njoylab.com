/**
 * build.js — zero-dependency micro static site generator for njoylab.com
 *
 * Usage: node build.js
 * Output: ./public/
 *
 * What it does:
 *   - Renders homepage, project listing, individual project pages
 *   - Generates sitemap.xml, robots.txt, 404.html
 *   - Copies assets (images, CSS) to public/
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dir = path.dirname(fileURLToPath(import.meta.url));
const SRC   = path.join(__dir, 'src');
const OUT   = path.join(__dir, 'public');

// ── Load data ────────────────────────────────────────────────────────────────

const site     = JSON.parse(fs.readFileSync(path.join(SRC, 'data/site.json'),     'utf8'));
const projects = JSON.parse(fs.readFileSync(path.join(SRC, 'data/projects.json'), 'utf8'));
// Tools and articles use the same shape; add their data files when ready.
// const tools    = JSON.parse(fs.readFileSync(path.join(SRC, 'data/tools.json'),    'utf8'));
// const articles = JSON.parse(fs.readFileSync(path.join(SRC, 'data/articles.json'), 'utf8'));

// ── Import templates (ES modules) ────────────────────────────────────────────

const { renderPage }    = await import('./src/templates/base.js');
const { renderHome }    = await import('./src/templates/pages/home.js');
const { renderListing } = await import('./src/templates/pages/listing.js');
const { renderSingle }  = await import('./src/templates/pages/single.js');
const { abs, isoDate }  = await import('./src/lib/util.js');

// ── Helpers ───────────────────────────────────────────────────────────────────

function write(relPath, html) {
  const full = path.join(OUT, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, html, 'utf8');
  console.log('  wrote', relPath);
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

// ── JSON-LD helpers ───────────────────────────────────────────────────────────

function homeJsonLd(site, projects) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': abs(site.baseURL, '/#person'),
        name: site.author.name,
        url: site.baseURL,
        jobTitle: site.author.jobTitle,
        description: site.description,
        image: abs(site.baseURL, site.profile.image),
        sameAs: site.author.sameAs,
      },
      {
        '@type': 'WebSite',
        '@id': abs(site.baseURL, '/#website'),
        url: site.baseURL,
        name: site.title,
        description: site.description,
        author: { '@id': abs(site.baseURL, '/#person') },
      },
      {
        '@type': 'ItemList',
        '@id': abs(site.baseURL, '/#featured-projects'),
        name: 'Featured Projects',
        itemListElement: projects.slice(0, 3).map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: abs(site.baseURL, `/projects/${p.slug}/`),
          name: p.title,
        })),
      },
    ],
  };
}

function listingJsonLd(site, section, items, path_) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': abs(site.baseURL, `${path_}#collection`),
    url: abs(site.baseURL, path_),
    name: `${section} — ${site.title}`,
    author: { '@id': abs(site.baseURL, '/#person') },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: abs(site.baseURL, `/projects/${p.slug}/`),
        name: p.title,
      })),
    },
  };
}

function singleJsonLd(site, item, path_) {
  const type = item.schema || 'CreativeWork';
  const base = {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': abs(site.baseURL, `${path_}#item`),
    name: item.title,
    description: item.description,
    url: item.link && item.link !== '#' ? item.link : abs(site.baseURL, path_),
    image: abs(site.baseURL, item.image),
    datePublished: isoDate(item.publishdate),
    author: { '@id': abs(site.baseURL, '/#person') },
    creator: { '@id': abs(site.baseURL, '/#person') },
  };
  if (item.applicationCategory) base.applicationCategory = item.applicationCategory;
  return base;
}

// ── Sitemap ───────────────────────────────────────────────────────────────────

function buildSitemap(entries) {
  const rows = entries
    .map(
      ({ loc, lastmod, priority }) =>
        `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n  </url>`
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows}\n</urlset>\n`;
}

// ── Build ─────────────────────────────────────────────────────────────────────

console.log('Building njoylab.com...\n');

// Clean output dir
if (fs.existsSync(OUT)) fs.rmSync(OUT, { recursive: true });
fs.mkdirSync(OUT, { recursive: true });

// ---- Homepage ----------------------------------------------------------------
const homeBody = renderHome({ site, projects });
const homePage = {
  path: '/',
  title: null, // triggers the long SEO title in renderHead
  description: site.description,
  ogImage: site.profile.image,
  preloadImage: site.profile.image,
  jsonLd: homeJsonLd(site, projects),
};
write('index.html', renderPage({ site, page: homePage, body: homeBody }));

// ---- Projects listing --------------------------------------------------------
const projectsBody = renderListing({
  section: 'Projects',
  intro: "Browse a list of projects I've recently been involved with.",
  items: projects,
  basePath: '/projects/',
});
const projectsPage = {
  path: '/projects/',
  title: 'Projects',
  description: 'A selection of projects by Emiliano Saurin — SaaS, iOS apps, web apps, startups and more.',
  jsonLd: listingJsonLd(site, 'Projects', projects, '/projects/'),
};
write('projects/index.html', renderPage({ site, page: projectsPage, body: projectsBody }));

// ---- Project singles ---------------------------------------------------------
for (const project of projects) {
  const pagePath = `/projects/${project.slug}/`;
  const body = renderSingle({ item: project, section: 'Projects', parentPath: '/projects/' });
  const page = {
    path: pagePath,
    title: project.title,
    description: project.description,
    ogImage: project.image,
    preloadImage: project.image,
    canonicalURL: project.canonicalURL || abs(site.baseURL, pagePath),
    jsonLd: singleJsonLd(site, project, pagePath),
  };
  write(`projects/${project.slug}/index.html`, renderPage({ site, page, body }));
}

// ---- 404 ---------------------------------------------------------------------
const notFoundBody = `<section class="container single">
  <h1>404 — Page not found</h1>
  <p>The page you're looking for doesn't exist.</p>
  <p><a href="/">← Back to home</a></p>
</section>`;
write('404.html', renderPage({
  site,
  page: { path: '/404/', title: '404 — Page not found', description: 'Page not found.' },
  body: notFoundBody,
}));

// ---- robots.txt --------------------------------------------------------------
const robots = `User-agent: *\nAllow: /\nSitemap: ${abs(site.baseURL, '/sitemap.xml')}\n`;
write('robots.txt', robots);

// ---- sitemap.xml -------------------------------------------------------------
const today = isoDate(new Date());
const sitemapEntries = [
  { loc: abs(site.baseURL, '/'),            lastmod: today, priority: '1.0' },
  { loc: abs(site.baseURL, '/projects/'),   lastmod: today, priority: '0.8' },
  ...projects.map((p) => ({
    loc: abs(site.baseURL, `/projects/${p.slug}/`),
    lastmod: isoDate(p.publishdate),
    priority: '0.6',
  })),
];
write('sitemap.xml', buildSitemap(sitemapEntries));

// ---- Copy assets -------------------------------------------------------------
// CSS
copyDir(path.join(SRC, 'assets/css'), path.join(OUT, 'assets/css'));
// Images: read from existing static/images (Hugo legacy location)
// In the full migration these move to src/assets/images/
copyDir(path.join(__dir, 'static/images'), path.join(OUT, 'images'));

console.log('\nDone. Output → ./public/');
