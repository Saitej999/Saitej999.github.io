const projects = window.PORTFOLIO_PROJECTS || [];
const grid = document.querySelector('#project-grid');
const filters = document.querySelector('#project-filters');
const element = (tag, text, cls) => { const el = document.createElement(tag); if (text) el.textContent = text; if (cls) el.className = cls; return el; };
function safeURL(value) { try { const url = new URL(value, location.href); return ['https:', 'http:'].includes(url.protocol) ? url.href : null; } catch { return null; } }
function render(category = 'All') {
  grid.replaceChildren();
  if (!projects.length) {
    const empty = element('div', null, 'empty-projects');
    empty.append(element('span', '</>', 'empty-symbol'));
    const text = element('div'); text.append(element('h3', 'The next chapter is open source.'), element('p', 'Independent project case studies will appear here as they’re completed. In the meantime, explore my repositories and follow along on GitHub.')); empty.append(text);
    const link = element('a', 'Visit GitHub ↗', 'text-link'); link.href = 'https://github.com/Saitej999'; link.target = '_blank'; link.rel = 'noopener'; empty.append(link); grid.append(empty); return;
  }
  const cards = element('div', null, 'project-cards');
  projects.filter(p => category === 'All' || p.category === category).forEach(p => {
    const card = element('article', null, 'project-card');
    if (p.image && safeURL(p.image)) { const img = element('img'); img.src = p.image; img.alt = p.imageAlt || p.title; img.loading = 'lazy'; card.append(img); }
    card.append(element('span', `${p.category || 'Project'} / ${p.status || 'Completed'}`, 'project-status'), element('h3', p.title), element('p', p.description));
    if(p.result) card.append(element('p', p.result));
    const tags = element('div', null, 'tags'); (p.tags || []).forEach(t => tags.append(element('span', t))); card.append(tags);
    const links = element('div', null, 'links'); [['repo', 'Source code ↗'], ['demo', 'Live demo ↗'], ['writeup', 'Case study ↗']].forEach(([key,label]) => { const url = p[key] && safeURL(p[key]); if(url) {const a = element('a', label); a.href = url; a.target = '_blank'; a.rel = 'noopener'; links.append(a);} }); card.append(links); cards.append(card);
  }); grid.append(cards);
}
if(projects.length) { filters.hidden = false; ['All', ...new Set(projects.map(p => p.category).filter(Boolean))].forEach(category => { const button = element('button', category); button.type = 'button'; button.setAttribute('aria-pressed', String(category === 'All')); button.addEventListener('click', () => { filters.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === button))); render(category); }); filters.append(button); }); }
render(); document.querySelector('#year').textContent = new Date().getFullYear();
