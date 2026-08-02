const WALKTHROUGH_RESTART_ICON = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 9-9 9.4 9.4 0 0 0-4.5 1.15"/><polyline points="3 3 3 8 8 8"/></svg>`;

export function handleWalkthroughNav(btn) {
  const walkthrough = btn.closest('[data-walkthrough]');
  const wrap        = btn.closest('[data-walkthrough-wrap]');
  if (!walkthrough || !wrap) return;

  const steps   = [...walkthrough.querySelectorAll('[data-walkthrough-step]')];
  const dots    = [...walkthrough.querySelectorAll('[data-walkthrough-dot]')];
  const nextBtn = walkthrough.querySelector('[data-walkthrough-next]');
  const current  = steps.findIndex(s => !s.hidden);
  const isRestart = btn === nextBtn && current === steps.length - 1;
  const delta    = btn.matches('[data-walkthrough-prev]') ? -1 : 1;
  const next     = isRestart ? 0 : Math.max(0, Math.min(steps.length - 1, current + delta));
  if (next === current) return;

  steps[current].hidden = true;
  steps[next].hidden = false;
  dots.forEach((dot, i) => dot.classList.toggle('is-active', i === next));

  walkthrough.querySelector('[data-walkthrough-prev]').disabled = next === 0;

  const isLast = next === steps.length - 1;
  nextBtn.classList.toggle('walkthrough__next--restart', isLast);
  nextBtn.innerHTML = isLast
    ? `${WALKTHROUGH_RESTART_ICON}${nextBtn.dataset.labelRestart}`
    : nextBtn.dataset.labelNext;

  const [start, end] = steps[next].dataset.walkthroughLines.split('-').map(Number);
  wrap.querySelectorAll('[data-line]').forEach(line => {
    const n = Number(line.dataset.line);
    line.classList.toggle('is-active-line', n >= start && n <= end);
  });

  if (getComputedStyle(walkthrough).position !== 'sticky') {
    steps[next].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  const activeLines = wrap.querySelectorAll('.is-active-line');
  const codeBody     = wrap.querySelector('.code-block__body');
  if (activeLines.length && codeBody) {
    const bodyRect    = codeBody.getBoundingClientRect();
    const firstRect   = activeLines[0].getBoundingClientRect();
    const lastRect    = activeLines[activeLines.length - 1].getBoundingClientRect();
    const rangeTop    = firstRect.top - bodyRect.top + codeBody.scrollTop;
    const rangeBottom = lastRect.bottom - bodyRect.top + codeBody.scrollTop;
    const rangeCenter = (rangeTop + rangeBottom) / 2;
    const target      = rangeCenter - (codeBody.clientHeight / 2);
    codeBody.scrollTo({ top: Math.max(0, target), left: 0, behavior: 'smooth' });
  }
}
