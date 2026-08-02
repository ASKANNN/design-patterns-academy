import { initTooltips }            from './interactions/tooltip.js';
import { toggleAccordion, navigateAccordion } from './interactions/accordion.js';
import { switchTab, navigateTabs } from './interactions/tabs.js';
import { dismissAlert }            from './interactions/alerts.js';
import { handleCopy }              from './interactions/clipboard.js';
import { handleFavoriteToggle, handleProgressToggle } from './interactions/favorites-progress.js';
import { handleFilter }            from './interactions/filters.js';
import { handleLangSelect }        from './interactions/code-lang-tabs.js';
import { handleQuizOption, handleQuizNext, handleQuizRetry, handleQuizHint } from './interactions/quiz.js';
import { handleWalkthroughNav }    from './interactions/walkthrough.js';
import { handlePlaygroundRun, handlePlaygroundReset, handlePlaygroundClear, handlePlaygroundMessage } from './interactions/playground.js';
import { handleSearchInput, triggerSearch } from './interactions/search-page.js';

export function initUI() {
  document.addEventListener('click', handleClick);
  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('input', handleInput);
  window.addEventListener('message', handlePlaygroundMessage);

  initTooltips();
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
  if (searchBtn) { triggerSearch(); return; }

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

function handleInput(e) {
  handleSearchInput(e);
}
