export function ScrollTopButton() {
  return `
    <button
      type="button"
      class="scroll-top-btn"
      id="scroll-top-btn"
      aria-label="Back to top"
      data-i18n-aria-label="a11y.scroll_top"
      tabindex="-1"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 19V5"/>
        <path d="M5 12l7-7 7 7"/>
      </svg>
    </button>
  `;
}

export function initScrollTopButton() {
  const btn = document.getElementById('scroll-top-btn');
  const footer = document.querySelector('.footer');
  if (!btn || !footer) return;

  const observer = new IntersectionObserver(([entry]) => {
    const isVisible = entry.isIntersecting;
    btn.classList.toggle('is-visible', isVisible);
    btn.setAttribute('tabindex', isVisible ? '0' : '-1');
  });
  observer.observe(footer);

  btn.addEventListener('click', () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'instant' : 'smooth' });
  });
}
