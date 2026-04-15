import { esc } from '../../lib/util.js';

export function renderHome({ site, projects }) {
  const { profile } = site;

  const buttons = profile.buttons
    .map(
      (b) =>
        `<a class="button" href="${esc(b.url)}" target="_blank" rel="noopener">${esc(b.label)}</a>`
    )
    .join('');

  const previewCards = projects
    .slice(0, 3)
    .map(
      (p) => `<a class="card" href="/projects/${esc(p.slug)}/">
    <img class="card__image" src="${esc(p.image)}" alt="${esc(p.title)} cover" loading="lazy" width="640" height="360">
    <div class="card__body">
      <h3 class="card__title">${esc(p.title)}</h3>
      <p class="card__desc">${esc(truncate(p.description, 140))}</p>
    </div>
  </a>`
    )
    .join('\n');

  return `<section class="profile container" aria-labelledby="profile-title">
  <img class="profile__image" src="${esc(profile.image)}" alt="${esc(profile.imageAlt)}" width="160" height="160" fetchpriority="high">
  <h1 id="profile-title" class="profile__title">${esc(profile.title)}</h1>
  <p class="profile__tagline">${esc(profile.tagline)}</p>
  <p class="profile__bio">${esc(profile.bio)}</p>
  <div class="profile__buttons">${buttons}</div>
</section>

<section class="container section" aria-labelledby="featured-projects">
  <div class="section__head">
    <h2 id="featured-projects">Featured projects</h2>
    <a class="section__more" href="/projects/">See all projects →</a>
  </div>
  <div class="grid">
${previewCards}
  </div>
</section>`;
}

function truncate(s, n) {
  if (!s || s.length <= n) return s;
  return s.slice(0, n).replace(/\s+\S*$/, '') + '…';
}
