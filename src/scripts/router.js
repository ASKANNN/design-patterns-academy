
import { applyTranslations, t }                   from '../utils/i18n.js';
import { pageLeave, pageEnter, refreshAnimations } from './animations.js';

const _routes = [];
let   _outlet = null;

export function defineRoute(pattern, handler) {
  _routes.push({ pattern, handler });
}

export function navigate(path) {
  window.location.hash = path.startsWith('#') ? path : `#${path}`;
}

export function getCurrentPath() {
  const hash = window.location.hash.slice(1) || '/';
  return hash.split('?')[0] || '/';
}

export function getQueryParam(key) {
  const query = (window.location.hash.slice(1).split('?')[1]) ?? '';
  return new URLSearchParams(query).get(key) ?? '';
}

export function initRouter(outletEl) {
  _outlet = outletEl;

  const resolve = async () => {
    const path              = getCurrentPath();
    const { handler, params } = _match(path);

    window.scrollTo({ top: 0, behavior: 'instant' });

    await pageLeave(_outlet);
    _showLoading();

    try {
      const html = await handler(params);
      _outlet.innerHTML = html;
    } catch (err) {
      console.error('[router]', err);
      _outlet.innerHTML = `
        <div class="container section">
          <p style="color:var(--color-error)">${t('errors.load_failed')}</p>
        </div>`;
    }

    pageEnter(_outlet);
    applyTranslations(_outlet);
    _markActiveLinks(path);
    setPageMeta(path, params);
    refreshAnimations(_outlet);
  };

  window.addEventListener('hashchange', resolve);
  resolve();
}

export async function reloadRoute() {
  if (!_outlet) return;
  const path              = getCurrentPath();
  const { handler, params } = _match(path);
  try {
    const html = await handler(params);
    _outlet.innerHTML = html;
  } catch (err) {
    console.error('[router]', err);
  }
  applyTranslations(_outlet);
  _markActiveLinks(path);
  _setPageMeta(path, params);
  refreshAnimations(_outlet);
}

function _match(path) {
  for (const route of _routes) {
    if (route.pattern === '*') continue;
    const params = _matchPattern(route.pattern, path);
    if (params !== null) return { handler: route.handler, params };
  }
  const fallback = _routes.find(r => r.pattern === '*');
  return { handler: fallback?.handler ?? (() => ''), params: {} };
}

function _matchPattern(pattern, path) {
  const pp = pattern.split('/').filter(Boolean);
  const ap = path.split('/').filter(Boolean);
  if (pp.length !== ap.length) return null;

  const params = {};
  for (let i = 0; i < pp.length; i++) {
    if (pp[i].startsWith(':')) {
      params[pp[i].slice(1)] = decodeURIComponent(ap[i] ?? '');
    } else if (pp[i] !== ap[i]) {
      return null;
    }
  }
  return params;
}

function _showLoading() {
  _outlet.innerHTML = `
    <div class="page-loading" role="status" aria-live="polite" aria-label="${t('a11y.loading')}">
      <div class="spinner spinner--lg">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="100%" height="100%" aria-hidden="true">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.2"/>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"/>
        </svg>
      </div>
    </div>
  `;
}

function _markActiveLinks(path) {
  document.querySelectorAll('[data-nav-link]').forEach(link => {
    const lp       = link.dataset.navLink;
    const isActive = lp === '/'
      ? path === '/'
      : path.startsWith(lp) && lp !== '/';

    link.classList.toggle('is-active', isActive);
    isActive
      ? link.setAttribute('aria-current', 'page')
      : link.removeAttribute('aria-current');
  });
}

export function setPageMeta(path, params) {
  const base        = 'Design Patterns Academy';
  const defaultDesc = 'Learn the 23 Gang of Four design patterns with clear examples, diagrams, and real-world code.';
  let title = base;
  let desc  = defaultDesc;

  if (path === '/catalog') {
    title = `Knowledge Catalog — ${base}`;
    desc  = 'Browse all Software Engineering knowledge modules available on Design Patterns Academy.';
  } else if (path === '/patterns') {
    title = `Design Patterns — ${base}`;
    desc  = 'Explore all 23 Gang of Four design patterns organized by category: Creational, Structural, and Behavioral.';
  } else if (path.startsWith('/patterns/') && params.slug) {
    title = `${_titleCase(params.slug)} Pattern — ${base}`;
    desc  = `Learn the ${_titleCase(params.slug)} design pattern: intent, structure, implementation, and real-world examples.`;
  } else if (path.startsWith('/patterns/') && params.category) {
    title = `${_titleCase(params.category)} Patterns — ${base}`;
    desc  = `All ${_titleCase(params.category)} design patterns from the Gang of Four book.`;
  } else if (path === '/about') {
    title = `About — ${base}`;
    desc  = 'Learn about Design Patterns Academy — an open-source educational platform for Software Engineering.';
  } else if (path === '/search') {
    title = `Search — ${base}`;
    desc  = defaultDesc;
  }

  document.title = title;

  _upsertMeta('name',     'description',       desc);
  _upsertMeta('property', 'og:title',          title);
  _upsertMeta('property', 'og:description',    desc);
  _upsertMeta('name',     'twitter:title',     title);
  _upsertMeta('name',     'twitter:description', desc);
}

function _upsertMeta(attr, key, content) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.setAttribute('content', content);
}

function _titleCase(str) {
  return str.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}
