import { esc } from '../../lib/util.js';

export function renderListing({ section, intro, items, basePath }) {
  const cards = items
    .map(
      (p) => `<a class="card" href="${esc(basePath)}${esc(p.slug)}/">
    <img class="card__image" src="${esc(p.image)}" alt="${esc(p.title)} cover" loading="lazy" width="640" height="360">
    <div class="card__body">
      <h3 class="card__title">${esc(p.title)}</h3>
      <p class="card__desc">${esc(p.description)}</p>
      ${p.tags ? `<ul class="tags">${p.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
    </div>
  </a>`
    )
    .join('\n');

  return `<section class="container section">
  <header class="section__head section__head--stacked">
    <h1>${esc(section)}</h1>
    ${intro ? `<p class="section__intro">${esc(intro)}</p>` : ''}
  </header>
  <div class="grid">
${cards}
  </div>
</section>`;
}
