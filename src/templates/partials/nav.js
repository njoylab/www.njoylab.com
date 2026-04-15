import { esc } from '../../lib/util.js';

export function renderNav({ site, currentPath }) {
  const items = site.nav
    .map((item) => {
      const active = currentPath.startsWith(item.url) && item.url !== '/';
      return `<li><a href="${esc(item.url)}"${active ? ' aria-current="page"' : ''}>${esc(item.label)}</a></li>`;
    })
    .join('');

  return `<header class="site-header">
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="container site-header__inner">
    <a class="site-logo" href="/" aria-label="${esc(site.title)} — home">${esc(site.title)}</a>
    <nav aria-label="Main">
      <ul class="site-nav">${items}</ul>
    </nav>
  </div>
</header>`;
}
