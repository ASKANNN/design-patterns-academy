import { t } from '../../utils/i18n.js';
import { playSuccessChime, playErrorTone } from '../../utils/sound.js';

export function handleQuizOption(btn) {
  const question = btn.closest('[data-quiz-question]');
  if (!question || question.classList.contains('is-answered')) return;
  question.classList.add('is-answered');

  const isCorrect = btn.dataset.quizCorrect === 'true';
  isCorrect ? playSuccessChime() : playErrorTone();
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

export function handleQuizNext(btn) {
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

export function handleQuizRetry(btn) {
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

export function handleQuizHint(btn) {
  const question = btn.closest('[data-quiz-question]');
  const hintWrap = question?.querySelector('[data-quiz-hint]');
  if (!hintWrap) return;

  const show = hintWrap.getAttribute('aria-hidden') === 'true';
  hintWrap.classList.toggle('is-open', show);
  hintWrap.setAttribute('aria-hidden', String(!show));
  btn.setAttribute('aria-expanded', String(show));
  btn.setAttribute('aria-label', t(show ? 'patterns.quiz.hint_hide' : 'patterns.quiz.hint_show'));
}
