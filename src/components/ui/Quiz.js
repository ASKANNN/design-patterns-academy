import { t } from '../../utils/i18n.js';
import { IconButton } from './IconButton.js';

let _uid = 0;
const uid = (prefix = 'quiz') => `${prefix}-${++_uid}`;

const HINT_ICON = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2Z"/></svg>`;

const RESULT_ICON_PASS = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12"/><circle cx="12" cy="8" r="7"/></svg>`;
const RESULT_ICON_WARN = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.3 3.9 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`;
const RESULT_ICON_FAIL = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 9v4"/><path d="M12 17h.01"/><circle cx="12" cy="12" r="9"/></svg>`;

function shuffled(array) {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function Quiz({ id = uid(), questions = [], reportUrl = '' } = {}) {
  if (!questions.length) return '';

  const randomized = shuffled(questions).map(q => {
    const optionOrder = shuffled(q.options.map((_, i) => i));
    return {
      ...q,
      options: optionOrder.map(i => q.options[i]),
      correct: optionOrder.indexOf(q.correct),
    };
  });

  const total = randomized.length;

  const questionBlocks = randomized.map((q, qi) => `
    <div class="quiz__question" data-quiz-question ${qi === 0 ? '' : 'hidden'}>
      <p class="quiz__progress">${t('patterns.quiz.question_progress', { current: qi + 1, total })}</p>
      <div class="quiz__prompt-row">
        <p class="quiz__prompt">${q.question}</p>
        ${q.hint ? `
          ${IconButton({ icon: HINT_ICON, label: t('patterns.quiz.hint_show'), variant: 'ghost', size: 'sm', round: true, attrs: `data-quiz-hint-btn aria-expanded="false"` })}
        ` : ''}
      </div>
      ${q.hint ? `
        <div class="quiz__hint-wrap" data-quiz-hint aria-hidden="true">
          <p class="quiz__hint">${q.hint}</p>
        </div>
      ` : ''}
      <div class="quiz__options" role="radiogroup" aria-label="${t('patterns.quiz.options_aria')}">
        ${q.options.map((opt, oi) => `
          <button type="button" class="quiz__option" data-quiz-option data-quiz-correct="${oi === q.correct}">
            <span class="quiz__option-marker" aria-hidden="true"></span>
            <span class="quiz__option-text">${opt}</span>
          </button>
        `).join('')}
      </div>
      <div class="quiz__feedback" data-quiz-feedback hidden aria-live="polite">
        <p class="quiz__feedback-text quiz__feedback-text--correct" data-quiz-feedback-correct hidden>
          <svg class="quiz__feedback-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="2 8 6 12 14 4"/></svg>
          <span><strong class="quiz__feedback-label">${t('patterns.quiz.correct')}</strong> ${q.explanation}</span>
        </p>
        <p class="quiz__feedback-text quiz__feedback-text--incorrect" data-quiz-feedback-incorrect hidden>
          <svg class="quiz__feedback-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="3" y1="3" x2="13" y2="13"/><line x1="13" y1="3" x2="3" y2="13"/></svg>
          <span><strong class="quiz__feedback-label">${t('patterns.quiz.incorrect')}</strong> ${q.explanation}</span>
        </p>
      </div>
      <button type="button" class="btn btn--primary btn--md quiz__next" data-quiz-next hidden>${qi === total - 1 ? t('patterns.quiz.see_results') : t('patterns.quiz.next')}</button>
    </div>
  `).join('');

  return `
    <div class="quiz" data-quiz="${id}" id="${id}" data-quiz-score="0">
      ${questionBlocks}
      <div class="quiz__results" data-quiz-results hidden>
        <div class="quiz__result-icon" data-quiz-result-icon aria-hidden="true">
          <span class="quiz__result-icon-pass" data-quiz-result-icon-pass hidden>${RESULT_ICON_PASS}</span>
          <span class="quiz__result-icon-warn" data-quiz-result-icon-warn hidden>${RESULT_ICON_WARN}</span>
          <span class="quiz__result-icon-fail" data-quiz-result-icon-fail hidden>${RESULT_ICON_FAIL}</span>
        </div>
        <p class="quiz__result-title" data-quiz-result-title></p>
        <p class="quiz__score" data-quiz-score-text></p>
        <p class="quiz__result-message" data-quiz-result-message></p>
        <button type="button" class="btn btn--secondary btn--md quiz__retry" data-quiz-retry>${t('patterns.quiz.retry')}</button>
      </div>
      ${reportUrl ? `
        <a class="quiz__report" href="${reportUrl}" target="_blank" rel="noopener noreferrer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.3 3.9 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/></svg>
          ${t('patterns.quiz.report_issue')}
        </a>
      ` : ''}
    </div>
  `;
}
