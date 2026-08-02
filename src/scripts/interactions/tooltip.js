const TOOLTIP_CARD_HEIGHT = 132;
const TOOLTIP_EDGE_MARGIN = 12;

let _tip       = null;
let _tipReason = null;

function positionTip(wrap) {
  const anchor     = wrap.closest('.principle-item') ?? wrap;
  const rect       = anchor.getBoundingClientRect();
  const spaceBelow = window.innerHeight - rect.bottom;
  const spaceAbove = rect.top;
  const flipUp     = spaceBelow < TOOLTIP_CARD_HEIGHT && spaceAbove > spaceBelow;
  wrap.setAttribute('data-tooltip-pos', flipUp ? 'top' : 'bottom');

  const popoverWidth = parseFloat(getComputedStyle(wrap, '::after').width) || 0;
  if (!popoverWidth) { wrap.style.removeProperty('--tt-shift-x'); return; }

  const center = rect.left + rect.width / 2;
  const halfW  = popoverWidth / 2;
  let shift = 0;
  if (center - halfW < TOOLTIP_EDGE_MARGIN) {
    shift = TOOLTIP_EDGE_MARGIN - (center - halfW);
  } else if (center + halfW > window.innerWidth - TOOLTIP_EDGE_MARGIN) {
    shift = (window.innerWidth - TOOLTIP_EDGE_MARGIN) - (center + halfW);
  }
  wrap.style.setProperty('--tt-shift-x', `${shift}px`);
}

function openTip(wrap, reason) {
  if (_tip === wrap) return;
  if (_tip) closeAllTips();
  positionTip(wrap);
  wrap.classList.add('is-open');
  _tip = wrap;
  _tipReason = reason;
}

export function closeAllTips() {
  document.querySelectorAll('.tooltip-wrap.is-open')
    .forEach(el => el.classList.remove('is-open'));
  _tip = null;
  _tipReason = null;
}

function _resolveWrap(el) {
  if (!el || !el.closest) return null;
  return el.closest('.tooltip-wrap[data-tooltip-info]')
    ?? el.closest('.principle-item')?.querySelector('.tooltip-wrap[data-tooltip-info]')
    ?? null;
}

function onTipOver(e) {
  const wrap = e.target.closest('.tooltip-wrap[data-tooltip-info]');
  if (wrap) { openTip(wrap, 'hover'); return; }
  if (_tipReason === 'hover') closeAllTips();
}

function onTipOut(e) {
  if (_tipReason === 'hover' && !e.relatedTarget) closeAllTips();
}

function onTipFocusIn(e) {
  const wrap = _resolveWrap(e.target);
  if (wrap && e.target.matches(':focus-visible')) { openTip(wrap, 'key'); return; }
  if (_tipReason === 'key') closeAllTips();
}

function onTipFocusOut(e) {
  if (_tipReason !== 'key') return;
  if (!_resolveWrap(e.relatedTarget)) closeAllTips();
}

export function initTooltips() {
  document.addEventListener('mouseover', onTipOver);
  document.addEventListener('mouseout',  onTipOut);
  document.addEventListener('focusin',   onTipFocusIn);
  document.addEventListener('focusout',  onTipFocusOut);

  window.addEventListener('app:navigated',      closeAllTips);
  document.addEventListener('dpa:theme-toggle', closeAllTips);
  document.addEventListener('dpa:lang-toggle',  closeAllTips);
}
