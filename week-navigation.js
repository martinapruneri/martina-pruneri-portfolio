(() => {
  const header = document.querySelector('.site-header');
  const topbar = document.querySelector('.week-topbar');
  if (!header || !topbar) return;
  function measure() {
    const headerHeight = header.getBoundingClientRect().height;
    const topbarHeight = topbar.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--week-header-height', `${headerHeight}px`);
    document.documentElement.style.setProperty('--week-topbar-height', `${topbarHeight}px`);
  }
  new ResizeObserver(measure).observe(header);
  new ResizeObserver(measure).observe(topbar);
  measure();
})();
