(() => {
  document.querySelectorAll('.week-gallery__track').forEach(track => {
    const cards = Array.from(track.querySelectorAll('.week-gallery__card'));
    function stackAround(card) {
      const selected = cards.indexOf(card);
      cards.forEach((item, index) => {
        if (selected < 0) item.style.removeProperty('z-index');
        else item.style.zIndex = String(cards.length - Math.abs(selected - index));
      });
    }
    track.addEventListener('pointerover', event => stackAround(event.target.closest('.week-gallery__card')));
    track.addEventListener('pointerleave', () => stackAround(document.activeElement.closest('.week-gallery__card')));
    track.addEventListener('focusin', event => stackAround(event.target.closest('.week-gallery__card')));
    track.addEventListener('focusout', event => {
      if (!track.contains(event.relatedTarget)) stackAround(null);
    });
  });

  const dialog = document.createElement('dialog');
  dialog.className = 'week-lightbox';
  dialog.setAttribute('aria-label', 'Enlarged gallery image');
  const image = document.createElement('img');
  image.className = 'week-lightbox__image';
  image.alt = '';
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'week-lightbox__close';
  close.setAttribute('aria-label', 'Close image');
  close.textContent = '×';
  dialog.append(image, close);
  document.body.append(dialog);
  let scale = 1;
  let bounds;
  let trigger;
  let previousOverflow;
  function zoom(value) {
    scale = Math.max(1, Math.min(4, value));
    image.style.transform = `scale(${scale})`;
    image.classList.toggle('is-zoomed', scale > 1);
    if (scale === 1) {
      bounds = null;
      image.style.transformOrigin = 'center';
    }
  }
  function origin(event) {
    bounds ||= image.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, (event.clientX - bounds.left) / bounds.width * 100));
    const y = Math.max(0, Math.min(100, (event.clientY - bounds.top) / bounds.height * 100));
    image.style.transformOrigin = `${x}% ${y}%`;
  }
  document.addEventListener('click', event => {
    const button = event.target.closest('.week-gallery__open');
    if (!button) return;
    const source = button.closest('figure').querySelector('img');
    if (!source) return;
    trigger = button;
    image.src = source.currentSrc || source.src;
    image.alt = source.alt;
    zoom(1);
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    close.focus();
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    image.removeAttribute('src');
    zoom(1);
    trigger?.focus({ preventScroll: true });
  });
  image.addEventListener('click', event => {
    if (scale === 1) origin(event);
    zoom(scale === 1 ? 2 : 1);
  });
  image.addEventListener('mousemove', event => {
    if (scale > 1) origin(event);
  });
  image.addEventListener('wheel', event => {
    event.preventDefault();
    if (scale === 1) origin(event);
    zoom(scale + (event.deltaY < 0 ? 0.2 : -0.2));
  }, { passive: false });
  dialog.addEventListener('keydown', event => {
    if (['+', '=', '-'].includes(event.key)) {
      event.preventDefault();
      zoom(scale + (event.key === '-' ? -0.2 : 0.2));
    }
  });
  window.addEventListener('resize', () => { if (dialog.open) zoom(1); });
})();
