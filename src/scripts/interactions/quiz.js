import { t } from '../../utils/i18n.js';
import { playSuccessChime, playErrorTone } from '../../utils/sound.js';

const PASS_RATIO = 0.7;
const WARN_RATIO = 0.4;

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
    const total    = questions.length;
    if (scoreEl) scoreEl.textContent = t('patterns.quiz.score', { correct: score, total });
    if (results) {
      const ratio   = score / total;
      const perfect = score === total;
      const passed  = ratio >= PASS_RATIO;
      const warn    = !passed && ratio >= WARN_RATIO;
      const key     = perfect ? 'perfect' : passed ? 'pass' : warn ? 'warn' : 'fail';

      results.classList.toggle('is-pass', passed);
      results.classList.toggle('is-warn', warn);
      results.classList.toggle('is-fail', !passed && !warn);

      const titleEl   = results.querySelector('[data-quiz-result-title]');
      const messageEl = results.querySelector('[data-quiz-result-message]');
      if (titleEl) titleEl.textContent = t(`patterns.quiz.result_${key}_title`);
      if (messageEl) messageEl.textContent = t(`patterns.quiz.result_${key}_message`);

      const iconPass = results.querySelector('[data-quiz-result-icon-pass]');
      const iconWarn = results.querySelector('[data-quiz-result-icon-warn]');
      const iconFail = results.querySelector('[data-quiz-result-icon-fail]');
      if (iconPass) iconPass.hidden = !passed;
      if (iconWarn) iconWarn.hidden = !warn;
      if (iconFail) iconFail.hidden = passed || warn;

      passed ? playSuccessChime() : playErrorTone();
      results.hidden = false;
    }
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
  if (results) {
    results.hidden = true;
    results.classList.remove('is-pass', 'is-warn', 'is-fail');
  }
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
