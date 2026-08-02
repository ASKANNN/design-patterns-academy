export function announce(message) {
  const region = document.getElementById('live-region');
  if (region) region.textContent = message;
}
