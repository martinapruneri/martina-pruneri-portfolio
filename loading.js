(() => {
  const root = document.documentElement;
  let finished = false;
  let shown = false;
  let showTimer;
  let fallback;
  const blockedElements = new Map();

  function prepare() {
    if (finished || document.querySelector('.page-loader')) return;
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.setAttribute('role', 'status');
    loader.setAttribute('aria-label', 'Loading page');
    loader.innerHTML = `<div class="page-loader__content">
      <svg class="page-loader__star" viewBox="0 0 216 176" aria-hidden="true" focusable="false">
        <path fill="#EA2F47" d="M42 0 98 43 136 4 134 56 216 50 143 103 182 176 98 129 30 174 62 107 0 79 66 65Z"/>
        <path fill="#FC8A2D" d="m78 49 22 17 18-18-1 25 41-2-38 27 18 33-40-22-27 18 14-29-31-14 34-7Z"/>
      </svg>
      <p class="page-loader__text">just a second...</p>
    </div>`;
    document.body.prepend(loader);
  }

  function blockContent() {
    if (!document.body) return;
    for (const element of document.body.children) {
      if (element.matches('.page-loader, script, style, link') || blockedElements.has(element)) continue;
      blockedElements.set(element, element.inert);
      element.inert = true;
    }
  }

  function show() {
    if (finished) return;
    if (!document.body) {
      showTimer = setTimeout(show, 50);
      return;
    }
    prepare();
    shown = true;
    root.classList.add('is-loading');
    blockContent();
  }

  function dismiss(immediate = false) {
    if (finished) return;
    finished = true;
    clearTimeout(showTimer);
    clearTimeout(fallback);
    const loader = document.querySelector('.page-loader');
    for (const [element, wasInert] of blockedElements) element.inert = wasInert;
    blockedElements.clear();
    if (loader) loader.classList.add('is-leaving');
    const cleanup = () => {
      root.classList.remove('is-loading');
      if (loader) loader.remove();
    };
    if (!shown || immediate || matchMedia('(prefers-reduced-motion: reduce)').matches) cleanup();
    else setTimeout(cleanup, 300);
  }

  document.addEventListener('DOMContentLoaded', () => {
    prepare();
    if (shown && !finished) blockContent();
  }, { once: true });

  // Fast and cached visits skip the loader entirely. Slower visits show it
  // only until the page's assets finish loading, with no minimum wait.
  showTimer = setTimeout(show, 350);
  window.addEventListener('load', () => dismiss(), { once: true });

  // A failed or stalled asset must never leave the portfolio inaccessible.
  fallback = setTimeout(dismiss, 6000);
  window.addEventListener('pagehide', () => dismiss(true), { once: true });
})();
