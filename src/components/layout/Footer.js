export function Footer() {
  const year = new Date().getFullYear();

  return `
    <footer class="footer" role="contentinfo">
      <div class="footer__inner container">

        <!-- Brand -->
        <div class="footer__brand">
          <a href="#/" class="footer__logo" aria-label="Design Patterns Academy — Home" data-i18n-aria-label="a11y.logo_home">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <polygon points="14 2 26 8 26 20 14 26 2 20 2 8"/>
              <line x1="14" y1="2" x2="14" y2="26"/>
              <line x1="2" y1="8" x2="26" y2="8"/>
              <line x1="2" y1="20" x2="26" y2="20"/>
            </svg>
            <span class="footer__logo-text">Design Patterns Academy</span>
          </a>
          <p class="footer__tagline" data-i18n="footer.tagline">
            A premium open-source educational platform for learning the 23 Gang of Four Design Patterns.
          </p>
        </div>

        <!-- Navigation columns -->
        <nav class="footer__nav" aria-label="Footer navigation" data-i18n-aria-label="a11y.footer_nav">

          <div class="footer__col">
            <h3 class="footer__col-title" data-i18n="footer.col_patterns">Patterns</h3>
            <ul class="footer__col-list" role="list">
              <li><a href="#/patterns/creational" class="footer__link" data-i18n="patterns.categories.creational">Creational</a></li>
              <li><a href="#/patterns/structural" class="footer__link" data-i18n="patterns.categories.structural">Structural</a></li>
              <li><a href="#/patterns/behavioral" class="footer__link" data-i18n="patterns.categories.behavioral">Behavioral</a></li>
              <li><a href="#/patterns" class="footer__link" data-i18n="footer.link_all">All 23 Patterns</a></li>
            </ul>
          </div>

          <div class="footer__col">
            <h3 class="footer__col-title" data-i18n="footer.col_resources">Resources</h3>
            <ul class="footer__col-list" role="list">
              <li><a href="#/about" class="footer__link" data-i18n="footer.link_about">About</a></li>
              <li><a href="https://github.com/ASKANNN/design-patterns-academy/blob/main/docs/community/CONTRIBUTING.md" class="footer__link" target="_blank" rel="noopener noreferrer" data-i18n="footer.link_contributing">Contributing</a></li>
              <li><a href="https://github.com/ASKANNN/design-patterns-academy/blob/main/docs/git-and-releases/CHANGELOG.md" class="footer__link" target="_blank" rel="noopener noreferrer" data-i18n="footer.link_changelog">Changelog</a></li>
            </ul>
          </div>

        </nav>

        <!-- Bottom bar -->
        <div class="footer__bottom">
          <p class="footer__copyright">
            © ${year} <span data-i18n="footer.copyright">Design Patterns Academy. Open source under MIT license.</span>
          </p>
          <a
            href="https://github.com/ASKANNN/design-patterns-academy"
            class="footer__github"
            aria-label="View source on GitHub"
            data-i18n-aria-label="footer.github"
            rel="noopener noreferrer"
            target="_blank"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            <span>GitHub</span>
          </a>
        </div>

      </div>
    </footer>
  `;
}
