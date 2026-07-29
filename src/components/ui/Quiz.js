import { t } from '../../utils/i18n.js';

let _uid = 0;
const uid = (prefix = 'quiz') => `${prefix}-${++_uid}`;

function shuffled(array) {
  const result = array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function Quiz({ id = uid(), questions = [] } = {}) {
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
      <p class="quiz__prompt">${q.question}</p>
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
        <p class="quiz__score" data-quiz-score-text></p>
        <button type="button" class="btn btn--secondary btn--md quiz__retry" data-quiz-retry>${t('patterns.quiz.retry')}</button>
      </div>
    </div>
  `;
}
