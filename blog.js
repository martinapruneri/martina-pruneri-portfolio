(() => {
  if (!window.BLOG_ORIGIN) return;
  let target;
  try { target = new URL(window.BLOG_ORIGIN); } catch { return; }
  if (target.protocol !== 'https:') return;
  document.querySelectorAll('.week-card').forEach(card => {
    const link = card.querySelector('.week-card__link');
    const url = new URL('/week', target);
    url.searchParams.set('week', card.id.replace('week-', ''));
    link.href = url.href;
  });
})();
