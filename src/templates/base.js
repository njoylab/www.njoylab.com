import { renderHead } from './partials/head.js';
import { renderNav } from './partials/nav.js';
import { renderFooter } from './partials/footer.js';

export function renderPage({ site, page, body }) {
  const lang = page.lang || site.lang;
  return `<!doctype html>
<html lang="${lang}">
<head>
${renderHead({ site, page })}
</head>
<body>
${renderNav({ site, currentPath: page.path })}
<main id="main" class="site-main">
${body}
</main>
${renderFooter({ site })}
</body>
</html>
`;
}
