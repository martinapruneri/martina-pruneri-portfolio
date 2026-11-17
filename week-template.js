/* Shared rendering for the public design sample and authenticated week pages. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.WeekTemplate = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
  const list = value => Array.isArray(value) ? value : [];
  function imageUrl(value) {
    // Private uploaded media must be served through the authenticated media endpoint.
    return typeof value === 'string' && /^\/?(?:assets|media)\/[a-zA-Z0-9_ /().-]+$/.test(value) && !value.includes('..') ? value : '';
  }
  function render(post, options = {}) {
    const number = Number(options.week || 1);
    const weekPath = options.weekPath || 'week.html';
    const navigation = `<nav class="week-pagination" aria-label="Week navigation">${number > 1 ? `<a href="${escape(weekPath)}?week=${number - 1}" rel="prev">Previous week</a>` : '<span></span>'}${number < 10 ? `<a href="${escape(weekPath)}?week=${number + 1}" rel="next">Next week</a>` : '<span></span>'}</nav>`;
    const rows = list(post.logs).map(row => `<tr><th scope="row">${escape(row.date)}</th><td>${escape(row.experience)}</td><td>${escape(row.reflection)}</td></tr>`).join('');
    const gallery = list(post.gallery).map(item => {
      const src = imageUrl(item.image);
      return `<figure class="week-gallery__card${src ? '' : ' week-gallery__card--placeholder'}">${src ? `<img src="${escape(src)}" alt="${escape(item.alt || item.title)}" loading="lazy"><button class="week-gallery__open" type="button" aria-label="Enlarge ${escape(item.title || item.alt || 'image')}"></button>` : ''}<figcaption><h3>${escape(item.title)}</h3><p>${escape(item.description)}</p></figcaption></figure>`;
    }).join('');
    const objectives = list(post.objectives).map(item => `<article class="week-objective"><h3>${escape(item.title)}</h3><p>${escape(item.description)}</p>${item.improve ? `<p class="week-objective__improve"><strong>Improve:</strong> <em>${escape(item.improve)}</em></p>` : ''}</article>`).join('');
    return `<div class="week-topbar">${navigation}</div><main class="week-layout"><aside class="week-intro" aria-labelledby="week-title"><div class="week-intro__inner"><p class="week-intro__dates">${escape(post.date_range || post.date)}</p><h1 id="week-title">${escape(post.title)}</h1><p class="week-intro__summary">${escape(post.summary)}</p></div></aside><div class="week-content"><section id="weekly-log" aria-labelledby="weekly-log-heading"><h2 id="weekly-log-heading">Weekly Log</h2>${rows ? `<div class="week-log__wrap" tabindex="0" role="region" aria-label="Weekly log table; scroll horizontally on small screens"><table class="week-log"><caption>Daily experiences and reflections</caption><colgroup><col><col><col></colgroup><thead><tr><th scope="col">Date</th><th scope="col">Spontaneous Log</th><th scope="col">Reflection Log</th></tr></thead><tbody>${rows}</tbody></table></div>` : '<p class="week-empty">coming soon</p>'}</section><section id="gallery" aria-labelledby="gallery-heading"><h2 id="gallery-heading">Gallery</h2>${gallery ? `<div class="week-gallery__track" tabindex="0" role="region" aria-label="Weekly gallery; scroll to see more images">${gallery}</div>` : '<p class="week-empty">No images yet.</p>'}</section><section id="learning-objectives" aria-labelledby="objectives-heading"><h2 id="objectives-heading">Learning Objectives</h2><div class="week-objectives">${objectives || '<p class="week-empty">coming soon</p>'}</div></section><section id="takeaways" aria-labelledby="takeaways-heading"><h2 id="takeaways-heading">Takeaways &amp; Looking Ahead</h2><p class="week-takeaways">${escape(post.takeaways || post.next_steps || 'coming soon')}</p></section></div></main>`;
  }
  return { render, escape };
});
