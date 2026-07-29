export function Header() {
  return `
    <header class="header" role="banner">
      <div class="header__inner container">

        <!-- Logo -->
        <a href="#/" class="header__logo" aria-label="Design Patterns Academy — Home" data-i18n-aria-label="a11y.logo_home">
          <svg class="header__logo-mark" width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <polygon points="14 2 26 8 26 20 14 26 2 20 2 8"/>
            <line x1="14" y1="2" x2="14" y2="26"/>
            <line x1="2" y1="8" x2="26" y2="8"/>
            <line x1="2" y1="20" x2="26" y2="20"/>
          </svg>
          <span class="header__logo-text">
            <span class="header__logo-name">Design Patterns</span>
            <span class="header__logo-suffix">Academy</span>
          </span>
        </a>

        <!-- Desktop Navigation -->
        <nav class="header__nav" aria-label="Main navigation" data-i18n-aria-label="a11y.primary_nav">
          <ul class="header__nav-list" role="list">
            <li>
              <a href="#/" class="header__nav-link" data-nav-link="/" data-i18n="nav.home">Home</a>
            </li>
            <li>
              <a href="#/patterns" class="header__nav-link" data-nav-link="/patterns" data-i18n="nav.patterns">Patterns</a>
            </li>
            <li class="header__nav-item--dropdown">
              <button class="header__nav-link header__nav-link--trigger" type="button" aria-haspopup="true" aria-expanded="false">
                <span data-i18n="nav.categories">Categories</span>
                <svg class="header__nav-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <polyline points="4 6 8 10 12 6"/>
                </svg>
              </button>
              <ul class="header__dropdown" role="list">
                <li>
                  <a href="#/patterns/creational" class="header__dropdown-link">
                    <span class="header__dropdown-dot header__dropdown-dot--creational" aria-hidden="true"></span>
                    <span data-i18n="patterns.categories.creational">Creational</span>
                  </a>
                </li>
                <li>
                  <a href="#/patterns/structural" class="header__dropdown-link">
                    <span class="header__dropdown-dot header__dropdown-dot--structural" aria-hidden="true"></span>
                    <span data-i18n="patterns.categories.structural">Structural</span>
                  </a>
                </li>
                <li>
                  <a href="#/patterns/behavioral" class="header__dropdown-link">
                    <span class="header__dropdown-dot header__dropdown-dot--behavioral" aria-hidden="true"></span>
                    <span data-i18n="patterns.categories.behavioral">Behavioral</span>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#/about" class="header__nav-link" data-nav-link="/about" data-i18n="nav.about">About</a>
            </li>
          </ul>
        </nav>

        <!-- Utility Controls -->
        <div class="header__utils" role="group" aria-label="Site utilities" data-i18n-aria-label="a11y.site_utilities">

          <!-- Search -->
          <button class="header__btn" type="button" aria-label="Open search" data-i18n-aria-label="actions.open_search" data-action="search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>

          <!-- Language Switch -->
          <button class="header__btn header__btn--lang" type="button" aria-label="Switch language" data-i18n-aria-label="lang.switch" data-action="lang">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span class="header__lang-code" aria-hidden="true">EN</span>
          </button>

          <!-- Theme Toggle -->
          <button class="header__btn header__btn--theme" type="button" aria-label="Toggle color theme" data-i18n-aria-label="theme.toggle" data-action="theme">
            <svg class="header__theme-icon--sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
            <svg class="header__theme-icon--moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          </button>

          <!-- Mobile Burger -->
          <button class="header__burger" type="button" aria-label="Open navigation menu" data-i18n-aria-label="actions.open_menu" aria-expanded="false" aria-controls="mobile-nav" data-action="burger">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <line x1="3" y1="6"  x2="19" y2="6"/>
              <line x1="3" y1="11" x2="19" y2="11"/>
              <line x1="3" y1="16" x2="19" y2="16"/>
            </svg>
          </button>

        </div>
      </div>
    </header>
  `;
}
