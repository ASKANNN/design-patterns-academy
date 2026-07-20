
const _reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let _observer = null;

export function initAnimations() {
  _initObserver();

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.classList.add('is-loaded');
    });
  });
}

export function refreshAnimations(root) {
  if (!root) return;

  if (_reducedMotion) {
    root.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    return;
  }

  _autoReveal(root);
  _initObserver();
  _animateHero(root);
}

export function pageLeave(outlet) {
  if (_reducedMotion) return Promise.resolve();
  outlet.classList.add('is-transitioning');
  _footer()?.classList.add('is-transitioning');
  return new Promise(resolve => setTimeout(resolve, 140));
}

export function pageEnter(outlet) {
  if (_reducedMotion) return;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      outlet.classList.remove('is-transitioning');
      _footer()?.classList.remove('is-transitioning');
    });
  });
}

let _footerEl;
function _footer() {
  return _footerEl ??= document.querySelector('.footer');
}

export function themeTransition() {
  if (_reducedMotion) return;
  const html = document.documentElement;
  html.setAttribute('data-theme-transitioning', '');
  setTimeout(() => html.removeAttribute('data-theme-transitioning'), 380);
}

function _initObserver() {
  if (!_observer) {
    _observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          el.classList.add('is-visible');
          _observer.unobserve(el);

          if (el.classList.contains('stats')) {
            _animateCounters(el);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -24px 0px',
      }
    );
  }

  document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => {
    _observer.observe(el);
  });
}

function _autoReveal(root) {
  const singleTargets = [
    '.patterns-page__header',
    '.filter-bar',
    '.about-section',
    '.related-patterns',
    '.about-cta',
    '.section__header',
    '.stats',
  ];

  singleTargets.forEach(sel => {
    root.querySelectorAll(sel).forEach(el => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
      }
    });
  });

  const cardSelectors = ['.category-card', '.pattern-card', '.module-card'];

  cardSelectors.forEach(sel => {
    root.querySelectorAll(sel).forEach((el, i) => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
        el.style.transitionDelay = `${(i % 6) * 55}ms`;

        el.addEventListener('transitionend', () => {
          el.style.transitionDelay = '';
        }, { once: true });
      }
    });
  });
}

function _animateHero(root) {
  const hero = root.querySelector('.hero');
  if (!hero) return;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      hero.classList.add('hero-ready');
    });
  });
}

function _animateCounters(statsEl) {
  if (_reducedMotion) return;

  statsEl.querySelectorAll('.stat__number').forEach(el => {
    const target = parseInt(el.textContent, 10);
    if (isNaN(target) || target === 0) return;

    const duration = 800;
    const startTime = performance.now();
    const originalText = el.textContent;

    const tick = (now) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = originalText;
      }
    };

    requestAnimationFrame(tick);
  });
}

export function animateFilterIn(items) {
  if (_reducedMotion) return;

  items.forEach((item, i) => {
    item.classList.remove('filter-entering');
    void item.offsetWidth;
    item.classList.add('filter-entering');
    item.style.animationDelay = `${i * 28}ms`;

    item.addEventListener('animationend', () => {
      item.classList.remove('filter-entering');
      item.style.animationDelay = '';
    }, { once: true });
  });
}
