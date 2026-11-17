/* Design preview with empty content and prefilled weekday dates. */
(() => {
  const sample = {
    title: 'Week one',
    date_range: 'Jan 04 - 08 2027',
    summary: 'coming soon',
    logs: [],
    gallery: Array.from({ length: 5 }, () => ({ image: '', title: '', description: '' })),
    objectives: [
      { title: '', description: 'coming soon', improve: '' },
      { title: '', description: 'coming soon', improve: '' }
    ],
    takeaways: 'coming soon' 
  };
  const number = Number(new URLSearchParams(location.search).get('week') || '1');
  const words = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
  if (Number.isInteger(number) && number >= 1 && number <= 10 && number !== 1) {
    sample.title = `Week ${words[number - 1]}`;
    const start = new Date(Date.UTC(2027, 0, 4 + (number - 1) * 7));
    const end = new Date(Date.UTC(2027, 0, 8 + (number - 1) * 7));
    const format = date => date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', timeZone: 'UTC' });
    sample.date_range = `${format(start)} - ${format(end)} 2027`;
    sample.summary = 'coming soon';
    sample.takeaways = 'coming soon';
  }
  const week = Number.isInteger(number) && number >= 1 && number <= 10 ? number : 1;
  sample.logs = Array.from({ length: 5 }, (_, day) => {
    const date = new Date(Date.UTC(2027, 0, 4 + (week - 1) * 7 + day));
    return {
      date: `${String(date.getUTCDate()).padStart(2, '0')}/${String(date.getUTCMonth() + 1).padStart(2, '0')}`,
      experience: 'coming soon',
      reflection: 'coming soon'
    };
  });
  document.title = `${sample.title} — Martina Pruneri`;
  document.getElementById('week-preview').outerHTML = window.WeekTemplate.render(sample, { week });
})();
