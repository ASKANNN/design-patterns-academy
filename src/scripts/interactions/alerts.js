export function dismissAlert(alert) {
  if (!alert) return;
  alert.classList.add('is-dismissed');
  alert.addEventListener('animationend', () => alert.remove(), { once: true });
}
