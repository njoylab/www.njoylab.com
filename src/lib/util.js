// Small helpers shared across templates and build.

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function esc(value) {
  if (value == null) return '';
  return String(value).replace(/[&<>"']/g, (c) => ESCAPES[c]);
}

// Join a baseURL with a path, without doubling slashes.
export function abs(baseURL, path = '/') {
  const base = baseURL.replace(/\/+$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

// ISO date (YYYY-MM-DD). Accepts Date or string.
export function isoDate(v) {
  const d = v instanceof Date ? v : new Date(v);
  return d.toISOString().slice(0, 10);
}
