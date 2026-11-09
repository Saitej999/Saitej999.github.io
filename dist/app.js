const projects = Array.isArray(window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS : [];
const grid = document.querySelector('#project-grid');
const filters = document.querySelector('#project-filters');
const element = (tag, text, cls) => {
  const el = document.createElement(tag);
  if (text != null) el.textContent = text;
  if (cls) el.className = cls;
  return el;
};
function safeURL(value) {
  try {
    const url = new URL(value, location.href);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}
function safeProjectImage(value) {
  if (typeof value === 'string' && /^assets\/[a-z0-9._/-]+$/i.test(value) && !value.includes('..')) return value;
  return safeURL(value);
}
function githubIcon() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('fill', 'currentColor');
  path.setAttribute('d', 'M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.08c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1.01 1.73 2.65 1.23 3.29.94.1-.73.39-1.23.71-1.51-2.5-.29-5.13-1.25-5.13-5.58 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.44.11-2.99 0 0 .95-.3 3.08 1.16a10.75 10.75 0 0 1 5.61 0c2.13-1.45 3.08-1.16 3.08-1.16.61 1.55.23 2.71.11 2.99.72.79 1.16 1.8 1.16 3.03 0 4.34-2.63 5.29-5.14 5.57.4.35.76 1.02.76 2.05v3.05c0 .3.2.65.78.54A11.2 11.2 0 0 0 12 .8Z');
  svg.append(path);
  return svg;
}
function render(category = 'All') {
  if (!grid || !projects.length) return;
  grid.replaceChildren();
  const cards = element('div', null, 'project-cards');
  projects.filter(p => category === 'All' || p.category === category).forEach(p => {
    const card = element('article', null, 'project-card');
    if (p.featured) card.classList.add('project-card--featured');

    const media = element('div', null, 'project-media');
    const image = p.image && safeProjectImage(p.image);
    if (image) {
      const img = element('img');
      img.src = image;
      img.alt = p.imageAlt || p.title;
      img.loading = 'lazy';
      media.append(img);
    } else {
      media.classList.add('project-media--abstract');
      media.append(element('span', '{ }', 'project-media-symbol'));
    }

    const content = element('div', null, 'project-content');
    const meta = element('div', null, 'project-meta');
    meta.append(
      element('span', p.category || 'Project', 'project-category'),
      element('span', p.status || 'Open Source', 'project-status')
    );
    content.append(meta, element('h3', p.title), element('p', p.description));

    if (Array.isArray(p.features) && p.features.length) {
      const list = element('ul', null, 'project-features');
      p.features.forEach(feature => list.append(element('li', feature)));
      content.append(list);
    }

    const tags = element('div', null, 'tags');
    (p.tags || []).forEach(tag => tags.append(element('span', tag)));
    content.append(tags);

    const links = element('div', null, 'links');
    [['repo', 'View on GitHub', 'project-repo'], ['demo', 'Live Demo ↗', 'project-demo'], ['writeup', 'Case Study ↗', 'project-demo']].forEach(([key, label, cls]) => {
      const url = p[key] && safeURL(p[key]);
      if (!url) return;
      const link = element('a', null, cls);
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      if (key === 'repo') link.append(githubIcon());
      link.append(element('span', label));
      links.append(link);
    });
    content.append(links);
    card.append(media, content);
    cards.append(card);
  });
  grid.append(cards);
}
if (projects.length && filters) {
  filters.hidden = false;
  const preferred = ['Java & Spring Boot', 'Banking & Fintech', 'Full Stack', 'Cloud & DevOps', 'Other'];
  const available = [...new Set(projects.map(p => p.category).filter(Boolean))];
  const categories = ['All', ...preferred.filter(c => available.includes(c)), ...available.filter(c => !preferred.includes(c))];
  categories.forEach(category => {
    const button = element('button', category === 'All' ? 'All Projects' : category);
    button.type = 'button';
    button.setAttribute('aria-pressed', String(category === 'All'));
    button.setAttribute('aria-controls', 'project-grid');
    button.addEventListener('click', () => {
      filters.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      render(category);
    });
    filters.append(button);
  });
  render();
}

const detailTitle = document.querySelector('#detail-title');
const detailCopy = document.querySelector('#detail-copy');
const nodes = [...document.querySelectorAll('.arch-node, .aws-info')];
function showArchitectureDetail(node) {
  if (!detailTitle || !detailCopy) return;
  nodes.forEach(item => item.classList.toggle('selected', item === node));
  detailTitle.textContent = node.classList.contains('aws-info')
    ? 'AWS EKS'
    : node.querySelector('strong')?.textContent || 'Component';
  detailCopy.textContent = node.dataset.detail || '';
}
nodes.forEach(node => {
  node.addEventListener('pointerenter', () => showArchitectureDetail(node));
  node.addEventListener('focus', () => showArchitectureDetail(node));
  node.addEventListener('click', () => showArchitectureDetail(node));
});

document.querySelectorAll('.mobile-menu nav a').forEach(link => {
  link.addEventListener('click', () => {
    const menu = link.closest('details');
    if (menu) menu.open = false;
  });
});

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.desktop-nav a, .mobile-menu nav a')];
let scrollQueued = false;
function updateActiveSection() {
  const position = window.scrollY + 130;
  let active = sections[0]?.id;
  for (const section of sections) {
    if (section.offsetTop <= position) active = section.id;
  }
  navLinks.forEach(link => {
    const selected = link.getAttribute('href') === `#${active}`;
    link.classList.toggle('active', selected);
    if (selected) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scrollQueued = false;
}
window.addEventListener('scroll', () => {
  if (!scrollQueued) {
    scrollQueued = true;
    requestAnimationFrame(updateActiveSection);
  }
}, { passive: true });
window.addEventListener('resize', updateActiveSection);
updateActiveSection();

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
