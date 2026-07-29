export function MobileNav() {
  return `
    <div class="mobile-nav" id="mobile-nav" role="dialog" aria-modal="true" aria-label="Navigation menu" data-i18n-aria-label="a11y.nav_dialog" aria-hidden="true">

      <div class="mobile-nav__backdrop" aria-hidden="true"></div>

      <nav class="mobile-nav__panel" aria-label="Mobile navigation" data-i18n-aria-label="a11y.mobile_nav">

        <div class="mobile-nav__header">
          <a href="#/" class="mobile-nav__logo" aria-label="Design Patterns Academy — Home" data-i18n-aria-label="a11y.logo_home">
            <svg width="22" height="22" viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <polygon points="14 2 26 8 26 20 14 26 2 20 2 8"/>
              <line x1="14" y1="2" x2="14" y2="26"/>
              <line x1="2" y1="8" x2="26" y2="8"/>
              <line x1="2" y1="20" x2="26" y2="20"/>
            </svg>
            <span>DPA</span>
          </a>
          <button class="mobile-nav__close" type="button" aria-label="Close navigation menu" data-i18n-aria-label="actions.close_menu">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <line x1="4" y1="4"  x2="18" y2="18"/>
              <line x1="18" y1="4" x2="4"  y2="18"/>
            </svg>
          </button>
        </div>

        <ul class="mobile-nav__list" role="list">
          <li class="mobile-nav__item">
            <a href="#/" class="mobile-nav__link" data-nav-link="/" data-i18n="nav.home">Home</a>
          </li>
          <li class="mobile-nav__item">
            <a href="#/patterns" class="mobile-nav__link" data-nav-link="/patterns" data-i18n="nav.patterns">Patterns</a>
          </li>
          <li class="mobile-nav__item mobile-nav__item--group">
            <span class="mobile-nav__group-label" data-i18n="nav.categories">Categories</span>
            <ul class="mobile-nav__sub" role="list">
              <li>
                <a href="#/patterns/creational" class="mobile-nav__link mobile-nav__link--sub">
                  <span class="mobile-nav__dot mobile-nav__dot--creational" aria-hidden="true"></span>
                  <span data-i18n="patterns.categories.creational">Creational</span>
                </a>
              </li>
              <li>
                <a href="#/patterns/structural" class="mobile-nav__link mobile-nav__link--sub">
                  <span class="mobile-nav__dot mobile-nav__dot--structural" aria-hidden="true"></span>
                  <span data-i18n="patterns.categories.structural">Structural</span>
                </a>
              </li>
              <li>
                <a href="#/patterns/behavioral" class="mobile-nav__link mobile-nav__link--sub">
                  <span class="mobile-nav__dot mobile-nav__dot--behavioral" aria-hidden="true"></span>
                  <span data-i18n="patterns.categories.behavioral">Behavioral</span>
                </a>
              </li>
            </ul>
          </li>
          <li class="mobile-nav__item">
            <a href="#/about" class="mobile-nav__link" data-nav-link="/about" data-i18n="nav.about">About</a>
          </li>
        </ul>

        <div class="mobile-nav__footer">
          <button class="mobile-nav__util-btn" type="button" aria-label="Switch language" data-i18n-aria-label="lang.switch" data-action="lang">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span class="header__lang-code" aria-hidden="true">EN</span>
          </button>
          <button class="mobile-nav__util-btn" type="button" aria-label="Toggle color theme" data-i18n-aria-label="theme.toggle" data-action="theme">
            <svg class="header__theme-icon--sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1"  x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22"   x2="5.64"  y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1"  y1="12" x2="3"  y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64"  y2="18.36"/>
              <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
            </svg>
            <svg class="header__theme-icon--moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </button>
        </div>

      </nav>
    </div>
  `;
}
