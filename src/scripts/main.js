import '../styles/base/tokens.css';
import '../styles/base/animations.css';
import '../styles/base/reset.css';
import '../styles/base/typography.css';
import '../styles/base/layout.css';
import '../styles/components/header.css';
import '../styles/components/nav.css';
import '../styles/components/footer.css';
import '../styles/components/button.css';
import '../styles/components/card.css';
import '../styles/components/badge.css';
import '../styles/components/form.css';
import '../styles/components/divider.css';
import '../styles/components/tooltip.css';
import '../styles/components/modal.css';
import '../styles/components/accordion.css';
import '../styles/components/tabs.css';
import '../styles/components/breadcrumb.css';
import '../styles/components/pagination.css';
import '../styles/components/code-block.css';
import '../styles/components/alert.css';
import '../styles/components/empty-state.css';
import '../styles/components/feedback.css';
import '../styles/components/diagram.css';
import '../styles/components/visual-engine.css';
import '../styles/components/pattern-icon.css';
import '../styles/components/page-home.css';
import '../styles/components/page-catalog.css';
import '../styles/components/page-patterns.css';
import '../styles/components/page-pattern-detail.css';
import '../styles/components/page-about.css';
import '../styles/components/page-search.css';
import '../styles/components/page-errors.css';

import { AppLayout }              from '../layouts/AppLayout.js';
import { mountInteractives }      from './interactives.js';
import { initUI }                 from './ui.js';
import { initI18n }               from '../config/i18n.js';
import { applyTranslations, onLangChange, updateLangButtons } from '../utils/i18n.js';
import { initRouter, defineRoute, reloadRoute }  from './router.js';
import { initAnimations, themeTransition } from './animations.js';
import { getLang, setLanguage }    from '../config/i18n.js';
import { ROUTES }                  from '../config/routes.js';
import { restoreTheme, applyTheme, nextTheme } from '../config/theme.js';

restoreTheme();

document.getElementById('app').innerHTML = AppLayout();
initUI();
initAnimations();

ROUTES.forEach(({ pattern, load }) => defineRoute(pattern, load));

initI18n().then(() => {
  applyTranslations();
  updateLangButtons();
  initRouter(document.getElementById('router-outlet'));
});

onLangChange(() => {
  applyTranslations();
  updateLangButtons();
});

document.addEventListener('dpa:theme-toggle', () => {
  themeTransition();
  applyTheme(nextTheme());
});

document.addEventListener('dpa:lang-toggle', async () => {
  const activeTab = document.querySelector('.tabs__tab[aria-selected="true"]');
  const tablist   = activeTab?.closest('[role="tablist"]');
  const tabIndex  = tablist
    ? [...tablist.querySelectorAll('[role="tab"]')].indexOf(activeTab)
    : -1;

  const next = getLang() === 'en' ? 'ru' : 'en';
  document.documentElement.setAttribute('data-lang-transitioning', '');
  await setLanguage(next);
  document.documentElement.removeAttribute('data-lang-transitioning');
  applyTranslations();
  updateLangButtons();
  await reloadRoute();

  if (tabIndex > 0) {
    const newTablist = document.querySelector('[role="tablist"]');
    newTablist?.querySelectorAll('[role="tab"]')[tabIndex]?.click();
  }
});

const burger    = document.querySelector('.header__burger');
const mobileNav = document.getElementById('mobile-nav');
const backdrop  = mobileNav?.querySelector('.mobile-nav__backdrop');
const closeBtn  = mobileNav?.querySelector('.mobile-nav__close');

function openNav() {
  mobileNav.classList.add('is-open');
  mobileNav.setAttribute('aria-hidden', 'false');
  burger.setAttribute('aria-expanded', 'true');
  document.body.classList.add('nav-open');
  closeBtn?.focus();
}

function closeNav() {
  mobileNav.classList.remove('is-open');
  mobileNav.setAttribute('aria-hidden', 'true');
  burger.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('nav-open');
  burger?.focus();
}

burger?.addEventListener('click', openNav);
closeBtn?.addEventListener('click', closeNav);
backdrop?.addEventListener('click', closeNav);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileNav?.classList.contains('is-open')) closeNav();
});

const _vizOutlet = document.getElementById('router-outlet');
if (_vizOutlet) {
  new MutationObserver(() => {
    requestAnimationFrame(() => mountInteractives(_vizOutlet));
  }).observe(_vizOutlet, { childList: true });
}

const header = document.querySelector('.header');
const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 0);
window.addEventListener('scroll', onScroll, { passive: true });
