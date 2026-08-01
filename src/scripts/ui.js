
import { loadPatternIndex }        from '../utils/data-loader.js';
import { PatternCard }             from '../components/patterns/PatternCard.js';
import { EmptyState }              from '../components/ui/EmptyState.js';
import { BreadcrumbItems }         from '../components/ui/Breadcrumb.js';
import { patternsBreadcrumbItems } from '../config/pattern-categories.js';
import { setPageMeta, navigate }   from './router.js';
import { animateFilterIn }         from './animations.js';
import { t }                       from '../utils/i18n.js';
import { stripTypes }              from '../utils/strip-types.js';
import { searchPatterns }          from '../utils/search.js';
import { toggleFavorite }          from '../utils/favorites.js';
import { toggleCompleted }         from '../utils/progress.js';

export function initUI() {
  document.addEventListener('click', handleClick);
  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('input', handleInput);
  window.addEventListener('message', handlePlaygroundMessage);

  document.addEventListener('mouseover', onTipOver);
  document.addEventListener('mouseout',  onTipOut);
  document.addEventListener('focusin',   onTipFocusIn);
  document.addEventListener('focusout',  onTipFocusOut);

  window.addEventListener('app:navigated',      closeAllTips);
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
  const trigger = e.target.closest('.accordion__trigger');
  if (trigger) { toggleAccordion(trigger); return; }

  const tab = e.target.closest('.tabs__tab');
  if (tab) { switchTab(tab); return; }

  const alertClose = e.target.closest('.alert__close');
  if (alertClose) { dismissAlert(alertClose.closest('.alert')); return; }

  const copyBtn = e.target.closest('.copy-btn');
  if (copyBtn) { handleCopy(copyBtn); return; }

  const filterChip = e.target.closest('.filter-chip[data-filter]');
  if (filterChip) { handleFilter(filterChip); return; }

  const langBtn = e.target.closest('[data-lang-btn]');
  if (langBtn) { handleLangSelect(langBtn); return; }

  const quizOption = e.target.closest('[data-quiz-option]');
  if (quizOption) { handleQuizOption(quizOption); return; }

  const quizNext = e.target.closest('[data-quiz-next]');
  if (quizNext) { handleQuizNext(quizNext); return; }

  const quizRetry = e.target.closest('[data-quiz-retry]');
  if (quizRetry) { handleQuizRetry(quizRetry); return; }

  const quizHintBtn = e.target.closest('[data-quiz-hint-btn]');
  if (quizHintBtn) { handleQuizHint(quizHintBtn); return; }

  const walkthroughNav = e.target.closest('[data-walkthrough-prev], [data-walkthrough-next]');
  if (walkthroughNav) { handleWalkthroughNav(walkthroughNav); return; }

  const playgroundRun = e.target.closest('[data-playground-run]');
  if (playgroundRun) { handlePlaygroundRun(playgroundRun); return; }

  const playgroundReset = e.target.closest('[data-playground-reset]');
  if (playgroundReset) { handlePlaygroundReset(playgroundReset); return; }

  const playgroundClear = e.target.closest('[data-playground-clear]');
  if (playgroundClear) { handlePlaygroundClear(playgroundClear); return; }

  const searchBtn = e.target.closest('[data-action="search"]');
  if (searchBtn) { _triggerSearch(); return; }

  const favoriteBtn = e.target.closest('[data-favorite-toggle]');
  if (favoriteBtn) { e.preventDefault(); handleFavoriteToggle(favoriteBtn); return; }

  const progressBtn = e.target.closest('[data-progress-toggle]');
  if (progressBtn) { e.preventDefault(); handleProgressToggle(progressBtn); return; }

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

  const reloadBtn = e.target.closest('[data-action="reload"]');
  if (reloadBtn) { window.location.reload(); return; }
}

function handleKeydown(e) {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    const tab = e.target.closest('.tabs__tab');
    if (tab) { navigateTabs(tab, e.key); e.preventDefault(); }
  }

  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    const t = e.target.closest('.accordion__trigger');
    if (t) { navigateAccordion(t, e.key); e.preventDefault(); }
  }
}

function toggleAccordion(trigger) {
  const item    = trigger.closest('.accordion__item');
  const panel   = item?.querySelector('.accordion__panel');
  if (!item || !panel) return;

  const isOpen  = item.classList.contains('is-open');
  trigger.setAttribute('aria-expanded', String(!isOpen));

  panel.removeEventListener('transitionend', panel._onAccordionTransitionEnd || (() => {}));

  if (isOpen) {
    panel.style.maxHeight = `${panel.scrollHeight}px`;
    requestAnimationFrame(() => {
      item.classList.remove('is-open');
      panel.style.maxHeight = '0px';
    });
    panel._onAccordionTransitionEnd = (e) => {
      if (e.propertyName === 'max-height' && !item.classList.contains('is-open')) {
        panel.setAttribute('hidden', '');
      }
    };
    panel.addEventListener('transitionend', panel._onAccordionTransitionEnd, { once: true });
  } else {
    panel.removeAttribute('hidden');
    panel.style.maxHeight = '0px';
    requestAnimationFrame(() => {
      item.classList.add('is-open');
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    });
    panel._onAccordionTransitionEnd = (e) => {
      if (e.propertyName === 'max-height' && item.classList.contains('is-open')) {
        panel.style.maxHeight = 'none';
      }
    };
    panel.addEventListener('transitionend', panel._onAccordionTransitionEnd, { once: true });
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
  const target = btn.closest('.code-block')?.querySelector('.code-block__code')?.textContent;

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

function handleFavoriteToggle(btn) {
  const slug      = btn.dataset.favoriteToggle;
  const favorited = toggleFavorite(slug);

  document.querySelectorAll(`[data-favorite-toggle="${slug}"]`).forEach(el => {
    el.classList.toggle('is-active', favorited);
    el.setAttribute('aria-pressed', String(favorited));
  });

  if (favorited) return;

  const resultsEl = document.querySelector('[data-favorites-results]');
  if (!resultsEl) return;

  const card = resultsEl.querySelector(`[data-favorite-toggle="${slug}"]`)?.closest('[data-filter-item]');
  card?.remove();

  if (!resultsEl.querySelector('[data-filter-item]')) {
    resultsEl.innerHTML = EmptyState({
      title:       t('favorites.empty_title'),
      description: t('favorites.empty_desc'),
      actions:     `<a href="/patterns" class="btn btn--primary btn--md">${t('search.browse_all')}</a>`,
    });
  }
}

function handleProgressToggle(btn) {
  const slug      = btn.dataset.progressToggle;
  const completed = toggleCompleted(slug);

  btn.classList.toggle('is-active', completed);
  btn.setAttribute('aria-pressed', String(completed));
  btn.querySelector('.progress-toggle-btn__label').textContent = completed
    ? t('progress.completed')
    : t('progress.mark_completed');
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
  history.replaceState(null, '', path);
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

function handleQuizOption(btn) {
  const question = btn.closest('[data-quiz-question]');
  if (!question || question.classList.contains('is-answered')) return;
  question.classList.add('is-answered');

  const isCorrect = btn.dataset.quizCorrect === 'true';
  question.querySelectorAll('[data-quiz-option]').forEach(opt => {
    opt.disabled = true;
    if (opt.dataset.quizCorrect === 'true') opt.classList.add('is-correct');
  });
  if (!isCorrect) btn.classList.add('is-incorrect');

  const quiz = question.closest('[data-quiz]');
  if (quiz && isCorrect) {
    quiz.dataset.quizScore = String(Number(quiz.dataset.quizScore || 0) + 1);
  }

  const feedback = question.querySelector('[data-quiz-feedback]');
  if (feedback) {
    feedback.hidden = false;
    feedback.querySelector('[data-quiz-feedback-correct]').hidden = !isCorrect;
    feedback.querySelector('[data-quiz-feedback-incorrect]').hidden = isCorrect;
  }

  const next = question.querySelector('[data-quiz-next]');
  if (next) next.hidden = false;
}

function handleQuizNext(btn) {
  const question = btn.closest('[data-quiz-question]');
  const quiz      = question?.closest('[data-quiz]');
  if (!question || !quiz) return;

  const questions = [...quiz.querySelectorAll('[data-quiz-question]')];
  const idx       = questions.indexOf(question);
  const next      = questions[idx + 1];

  question.hidden = true;
  if (next) {
    next.hidden = false;
  } else {
    const results  = quiz.querySelector('[data-quiz-results]');
    const scoreEl  = quiz.querySelector('[data-quiz-score-text]');
    const score    = Number(quiz.dataset.quizScore || 0);
    if (scoreEl) scoreEl.textContent = t('patterns.quiz.score', { correct: score, total: questions.length });
    if (results) results.hidden = false;
  }
}

function handleQuizRetry(btn) {
  const quiz = btn.closest('[data-quiz]');
  if (!quiz) return;

  quiz.dataset.quizScore = '0';
  quiz.querySelectorAll('[data-quiz-question]').forEach((question, i) => {
    question.hidden = i !== 0;
    question.classList.remove('is-answered');
    question.querySelectorAll('[data-quiz-option]').forEach(opt => {
      opt.disabled = false;
      opt.classList.remove('is-correct', 'is-incorrect');
    });
    const feedback = question.querySelector('[data-quiz-feedback]');
    if (feedback) feedback.hidden = true;
    const next = question.querySelector('[data-quiz-next]');
    if (next) next.hidden = true;
    const hintWrap = question.querySelector('[data-quiz-hint]');
    const hintBtn = question.querySelector('[data-quiz-hint-btn]');
    if (hintWrap) { hintWrap.classList.remove('is-open'); hintWrap.setAttribute('aria-hidden', 'true'); }
    if (hintBtn) hintBtn.setAttribute('aria-expanded', 'false');
  });

  const results = quiz.querySelector('[data-quiz-results]');
  if (results) results.hidden = true;
}

function handleQuizHint(btn) {
  const question = btn.closest('[data-quiz-question]');
  const hintWrap = question?.querySelector('[data-quiz-hint]');
  if (!hintWrap) return;

  const show = hintWrap.getAttribute('aria-hidden') === 'true';
  hintWrap.classList.toggle('is-open', show);
  hintWrap.setAttribute('aria-hidden', String(!show));
  btn.setAttribute('aria-expanded', String(show));
  btn.setAttribute('aria-label', t(show ? 'patterns.quiz.hint_hide' : 'patterns.quiz.hint_show'));
}

const WALKTHROUGH_RESTART_ICON = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 9-9 9.4 9.4 0 0 0-4.5 1.15"/><polyline points="3 3 3 8 8 8"/></svg>`;

function handleWalkthroughNav(btn) {
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

function handlePlaygroundRun(btn) {
  const root      = btn.closest('[data-playground]');
  const textarea  = root?.querySelector('[data-playground-textarea]');
  const consoleEl = root?.querySelector('[data-playground-console]');
  const iframe    = root?.querySelector('[data-playground-sandbox]');
  if (!root || !textarea || !consoleEl || !iframe) return;

  const lang = root.dataset.playgroundLang;
  const code = lang === 'typescript' ? stripTypes(textarea.value) : textarea.value;

  consoleEl.innerHTML = '';
  iframe.srcdoc = _playgroundSandboxDoc(code);
}

function handlePlaygroundReset(btn) {
  const root     = btn.closest('[data-playground]');
  const textarea = root?.querySelector('[data-playground-textarea]');
  if (!textarea) return;
  textarea.value = JSON.parse(textarea.dataset.playgroundOriginal);
}

function handlePlaygroundClear(btn) {
  const root      = btn.closest('[data-playground]');
  const consoleEl = root?.querySelector('[data-playground-console]');
  if (!consoleEl) return;
  consoleEl.innerHTML = `<p class="playground__console-hint">${t('patterns.playground.run_hint')}</p>`;
}

function handlePlaygroundMessage(e) {
  if (!e.data || e.data.__playground !== true) return;

  const iframe = [...document.querySelectorAll('[data-playground-sandbox]')]
    .find(f => f.contentWindow === e.source);
  const consoleEl = iframe?.closest('[data-playground]')?.querySelector('[data-playground-console]');
  if (!consoleEl) return;

  const hint = consoleEl.querySelector('[data-playground-hint]');
  if (hint) hint.remove();

  const line = document.createElement('p');
  line.className = `playground__console-line${e.data.type !== 'log' && e.data.type !== 'info' ? ` playground__console-line--${e.data.type}` : ''}`;
  line.textContent = e.data.text;
  consoleEl.appendChild(line);
  line.scrollIntoView({ block: 'nearest' });
}

function _playgroundSandboxDoc(code) {
  const escaped = code.replace(/<\/script>/g, '<\\/script>');
  const disabledMsgs = ['print', 'alert', 'confirm', 'prompt', 'open'].reduce((acc, fn) => {
    acc[fn] = t('patterns.playground.sandbox_disabled', { fn: `window.${fn}()` });
    return acc;
  }, {});
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body><script>
(function () {
  function send(type, args) {
    try {
      parent.postMessage({ __playground: true, type, text: args.map(stringify).join(' ') }, '*');
    } catch (_) {}
  }
  function stringify(v) {
    if (typeof v === 'string') return v;
    if (v instanceof Error) return v.message;
    try { return JSON.stringify(v); } catch (_) { return String(v); }
  }
  ['log', 'info', 'warn', 'error'].forEach(function (m) {
    console[m] = function () { send(m, Array.prototype.slice.call(arguments)); };
  });
  var disabledMsgs = ${JSON.stringify(disabledMsgs)};
  Object.keys(disabledMsgs).forEach(function (m) {
    window[m] = function () { send('warn', [disabledMsgs[m]]); };
  });
  window.onerror = function (msg) { send('error', [String(msg)]); return true; };
  try {
    ${escaped}
  } catch (err) {
    send('error', [err && err.message ? err.message : String(err)]);
  }
})();
</script></body></html>`;
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

    history.replaceState(null, '', lower ? `/search?q=${encodeURIComponent(raw.trim())}` : '/search');

    const { patterns } = await loadPatternIndex();
    const results = searchPatterns(patterns, raw);

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
        actions:     `<a href="/patterns" class="btn btn--primary btn--md">${t('search.browse_all')}</a>`,
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
  navigate('/search');
  setTimeout(() => document.getElementById('search-page-input')?.focus(), 100);
}
