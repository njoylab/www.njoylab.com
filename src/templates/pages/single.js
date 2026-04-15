import { esc, isoDate } from '../../lib/util.js';

export function renderSingle({ item, section, parentPath }) {
  const tags = item.tags
    ? `<ul class="tags">${item.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`
    : '';

  return `<article class="container single">
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <ol>
      <li><a href="/">Home</a></li>
      <li><a href="${esc(parentPath)}">${esc(section)}</a></li>
      <li aria-current="page">${esc(item.title)}</li>
    </ol>
  </nav>
  <header class="single__header">
    <h1 class="single__title">${esc(item.title)}</h1>
    <p class="single__description">${esc(item.description)}</p>
    <p class="single__meta">
      <time datetime="${esc(isoDate(item.publishdate))}">${esc(isoDate(item.publishdate))}</time>
    </p>
  </header>
  ${item.image ? `<img class="single__image" src="${esc(item.image)}" alt="${esc(item.title)}" width="1200" height="630" fetchpriority="high">` : ''}
  ${item.link && item.link !== '#' ? `<p class="single__cta"><a class="button" href="${esc(item.link)}" target="_blank" rel="noopener">Visit ${esc(item.title)} →</a></p>` : ''}
  ${tags ? `<footer class="single__footer">${tags}</footer>` : ''}
</article>`;
}
