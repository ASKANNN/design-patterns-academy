
import { loadPatternIndex }        from '../utils/data-loader.js';
import { PatternCard }             from '../components/patterns/PatternCard.js';
import { EmptyState }              from '../components/ui/EmptyState.js';
import { BreadcrumbItems }         from '../components/ui/Breadcrumb.js';
import { patternsBreadcrumbItems } from '../pages/PatternsCatalogPage.js';
import { setPageMeta }             from './router.js';
import { animateFilterIn }         from './animations.js';
import { t }                       from '../utils/i18n.js';

export function initUI() {
  document.addEventListener('click', handleClick);
  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('input', handleInput);

  document.addEventListener('mouseover', onTipOver);
  document.addEventListener('mouseout',  onTipOut);
  document.addEventListener('focusin',   onTipFocusIn);
  document.addEventListener('focusout',  onTipFocusOut);

  window.addEventListener('hashchange',        closeAllTips);
  document.addEventListener('dpa:theme-toggle', closeAllTips);
  document.addEventListener('dpa:lang-toggle',  closeAllTips);
}

const TOOLTIP_CARD_HEIGHT = 132;

let _tip       = null;
let _tipReason = null;

function positionTip(wrap) {
  const anchor     = wrap.closest('.principle-item') ?? wrap;
  const rect       = anchor.getBoundingClientRect();
  const spaceBelow = window.innerHeight - rect.bottom;
  const spaceAbove = rect.top;
  const flipUp     = spaceBelow < TOOLTIP_CARD_HEIGHT && spaceAbove > spaceBelow;
  wrap.setAttribute('data-tooltip-pos', flipUp ? 'top' : 'bottom');
}

function openTip(wrap, reason) {
  if (_tip === wrap) return;
  if (_tip) closeAllTips();
  positionTip(wrap);
  wrap.classList.add('is-open');
  _tip = wrap;
  _tipReason = reason;
}

function closeAllTips() {
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

function handleClick(e) {
  const openTrigger = e.target.closest('[data-modal-open]');
  if (openTrigger) { openModal(openTrigger.dataset.modalOpen); return; }

  const closeTrigger = e.target.closest('[data-modal-close]');
  if (closeTrigger) {
    const modal = e.target.closest('.modal') ?? document.querySelector('.modal.is-open');
    if (modal) closeModal(modal.id);
    return;
  }

  const trigger = e.target.closest('.accordion__trigger');
  if (trigger) { toggleAccordion(trigger); return; }

  const tab = e.target.closest('.tabs__tab');
  if (tab) { switchTab(tab); return; }

  const alertClose = e.target.closest('.alert__close');
  if (alertClose) { dismissAlert(alertClose.closest('.alert')); return; }

  const copyBtn = e.target.closest('.copy-btn');
  if (copyBtn) { handleCopy(copyBtn); return; }

  const tagRemove = e.target.closest('[data-tag-remove]');
  if (tagRemove) { tagRemove.closest('.tag')?.remove(); return; }

  const filterChip = e.target.closest('.filter-chip[data-filter]');
  if (filterChip) { handleFilter(filterChip); return; }

  const langBtn = e.target.closest('[data-lang-btn]');
  if (langBtn) { handleLangSelect(langBtn); return; }

  const searchBtn = e.target.closest('[data-action="search"]');
  if (searchBtn) { _triggerSearch(); return; }

  const themeBtn = e.target.closest('[data-action="theme"]');
  if (themeBtn) {
    document.dispatchEvent(new CustomEvent('dpa:theme-toggle'));
    return;
  }

  const langActionBtn = e.target.closest('[data-action="lang"]');
  if (langActionBtn) {
    document.dispatchEvent(new CustomEvent('dpa:lang-toggle'));
    return;
  }
}

function handleKeydown(e) {
  if (e.key === 'Escape') {
    const open = document.querySelector('.modal.is-open');
    if (open) { closeModal(open.id); return; }
  }

  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    const tab = e.target.closest('.tabs__tab');
    if (tab) { navigateTabs(tab, e.key); e.preventDefault(); }
  }

  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    const t = e.target.closest('.accordion__trigger');
    if (t) { navigateAccordion(t, e.key); e.preventDefault(); }
  }
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  trapFocus(modal);
  const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  firstFocusable?.focus();
}

function closeModal(id) {
  const modal = id ? document.getElementById(id) : document.querySelector('.modal.is-open');
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  document.querySelector(`[data-modal-open="${modal.id}"]`)?.focus();
}

function trapFocus(element) {
  const focusable = [...element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')];
  if (!focusable.length) return;
  const first = focusable[0];
  const last  = focusable[focusable.length - 1];

  element.addEventListener('keydown', function trap(e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) {
      if (document.activeElement === first) { last.focus(); e.preventDefault(); }
    } else {
      if (document.activeElement === last) { first.focus(); e.preventDefault(); }
    }
    if (!element.classList.contains('is-open')) element.removeEventListener('keydown', trap);
  });
}

function toggleAccordion(trigger) {
  const item    = trigger.closest('.accordion__item');
  const panel   = item?.querySelector('.accordion__panel');
  if (!item || !panel) return;

  const isOpen  = item.classList.contains('is-open');
  item.classList.toggle('is-open', !isOpen);
  trigger.setAttribute('aria-expanded', String(!isOpen));

  if (isOpen) {
    panel.setAttribute('hidden', '');
  } else {
    panel.removeAttribute('hidden');
  }
}

function navigateAccordion(trigger, key) {
  const accordion = trigger.closest('.accordion');
  const triggers  = [...accordion.querySelectorAll('.accordion__trigger')];
  const idx       = triggers.indexOf(trigger);
  const next      = key === 'ArrowDown' ? triggers[idx + 1] : triggers[idx - 1];
  next?.focus();
}

function switchTab(tab) {
  const tablist = tab.closest('[role="tablist"]');
  if (!tablist) return;

  const tabs    = [...tablist.querySelectorAll('[role="tab"]')];
  const panels  = tabs.map(t => document.getElementById(t.getAttribute('aria-controls')));

  tabs.forEach((t, i) => {
    const isActive = t === tab;
    t.setAttribute('aria-selected', String(isActive));
    t.setAttribute('tabindex', isActive ? '0' : '-1');
    if (panels[i]) panels[i].hidden = !isActive;
  });

  tab.focus();
}

function navigateTabs(tab, key) {
  const tablist = tab.closest('[role="tablist"]');
  const tabs    = [...tablist.querySelectorAll('[role="tab"]')];
  const idx     = tabs.indexOf(tab);
  const next    = key === 'ArrowRight'
    ? tabs[(idx + 1) % tabs.length]
    : tabs[(idx - 1 + tabs.length) % tabs.length];
  if (next) switchTab(next);
}

function dismissAlert(alert) {
  if (!alert) return;
  alert.classList.add('is-dismissed');
  alert.addEventListener('animationend', () => alert.remove(), { once: true });
}

async function handleCopy(btn) {
  const target = btn.dataset.copy
    ?? btn.closest('.code-block')?.querySelector('.code-block__code')?.textContent;

  if (!target) return;

  try {
    await navigator.clipboard.writeText(target);
    const label = btn.querySelector('.copy-btn__label');
    const icon  = btn.querySelector('.copy-btn__icon');

    btn.classList.add('is-copied');
    if (label) label.textContent = t('actions.copied');
    if (icon) icon.innerHTML = `
      <polyline points="20 6 9 17 4 12" stroke="currentColor" stroke-width="2" fill="none"/>
    `;

    setTimeout(() => {
      btn.classList.remove('is-copied');
      if (label) label.textContent = t('actions.copy');
      if (icon) icon.innerHTML = `
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
      `;
    }, 2000);
  } catch {
  }
}

function handleFilter(chip) {
  const filter    = chip.dataset.filter;
  const container = chip.closest('[data-filter-container]');
  const target    = document.getElementById(chip.dataset.filterTarget ?? '');
  if (!container || !target) return;

  container.querySelectorAll('.filter-chip').forEach(c => {
    const isActive = c === chip;
    c.classList.toggle('is-active', isActive);
    c.setAttribute('aria-pressed', String(isActive));
  });

  let visibleCount = 0;
  const enteringItems = [];
  target.querySelectorAll('[data-filter-item]').forEach(item => {
    const matches = filter === 'all' || item.dataset.filterCategory === filter;
    item.classList.toggle('is-filtered-out', !matches);
    item.toggleAttribute('aria-hidden', !matches);
    if (matches) {
      visibleCount++;
      enteringItems.push(item);
    }
  });
  animateFilterIn(enteringItems);

  const countEl = container.querySelector('[data-filter-count]');
  if (countEl) countEl.textContent = filter === 'all' ? '' : t('patterns.count', { count: visibleCount });

  const breadcrumbList = document.querySelector('[data-patterns-breadcrumb] .breadcrumb__list');
  if (breadcrumbList) breadcrumbList.innerHTML = BreadcrumbItems(patternsBreadcrumbItems(filter));

  const path = filter === 'all' ? '/patterns' : `/patterns/${filter}`;
  history.replaceState(null, '', `#${path}`);
  setPageMeta(path, filter === 'all' ? {} : { category: filter });
}

function handleLangSelect(btn) {
  const lang      = btn.dataset.langBtn;
  const container = btn.closest('.detail-section');
  if (!container) return;

  container.querySelectorAll('[data-lang-btn]').forEach(b => {
    b.classList.toggle('is-active', b === btn);
  });

  container.querySelectorAll('[data-lang-panel]').forEach(panel => {
    panel.classList.toggle('is-visible', panel.dataset.langPanel === lang);
  });
}

let _searchTimer = null;

function handleInput(e) {
  const input = e.target.closest('#search-page-input');
  if (!input) return;

  clearTimeout(_searchTimer);
  _searchTimer = setTimeout(async () => {
    const raw   = input.value;
    const lower = raw.trim().toLowerCase();

    const metaEl    = document.querySelector('[data-search-meta]');
    const resultsEl = document.querySelector('[data-search-results]');
    if (!metaEl || !resultsEl) return;

    history.replaceState(null, '', lower ? `#/search?q=${encodeURIComponent(raw.trim())}` : '#/search');

    const { patterns } = await loadPatternIndex();
    const results = lower
      ? patterns.filter(p => {
          const fields = [p.name, p.category, p.summary?.en ?? '', p.summary?.ru ?? '', ...(p.tags ?? [])];
          return fields.some(f => f.toLowerCase().includes(lower));
        })
      : [];

    if (!lower) {
      metaEl.textContent = t('search.enter_keyword');
    } else if (results.length > 0) {
      metaEl.innerHTML = t('search.result_count', {
        count: results.length,
        s:     results.length !== 1 ? 's' : '',
        query: _escHtml(raw.trim()),
      });
    } else {
      metaEl.innerHTML = t('search.no_match', { query: _escHtml(raw.trim()) });
    }

    if (results.length > 0) {
      resultsEl.innerHTML = `<div class="search-page__results" aria-label="${t('search.label')}">${results.map(p => PatternCard(p)).join('')}</div>`;
    } else if (lower) {
      resultsEl.innerHTML = EmptyState({
        title:       t('patterns.no_patterns_filter'),
        description: t('search.no_match_desc'),
        actions:     `<a href="#/patterns" class="btn btn--primary">${t('search.browse_all')}</a>`,
      });
    } else {
      resultsEl.innerHTML = '';
    }
  }, 150);
}

function _escHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function _triggerSearch() {
  const hash = '#/search';
  window.location.hash = hash;
  setTimeout(() => document.getElementById('search-page-input')?.focus(), 100);
}
