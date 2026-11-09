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
function render(category = 'All') {
  if (!grid || !projects.length) return;
  grid.replaceChildren();
  const cards = element('div', null, 'project-cards');
  projects.filter(p => category === 'All' || p.category === category).forEach(p => {
    const card = element('article', null, 'project-card');
    if (p.image && safeURL(p.image)) {
      const img = element('img');
      img.src = p.image;
      img.alt = p.imageAlt || p.title;
      img.loading = 'lazy';
      card.append(img);
    }
    card.append(
      element('span', `${p.category || 'Project'} / ${p.status || 'Completed'}`, 'project-status'),
      element('h3', p.title),
      element('p', p.description)
    );
    if (p.result) card.append(element('p', p.result));
    const tags = element('div', null, 'tags');
    (p.tags || []).forEach(t => tags.append(element('span', t)));
    card.append(tags);
    const links = element('div', null, 'links');
    [['repo', 'Source code ↗'], ['demo', 'Live demo ↗'], ['writeup', 'Case study ↗']].forEach(([key, label]) => {
      const url = p[key] && safeURL(p[key]);
      if (url) {
        const a = element('a', label);
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        links.append(a);
      }
    });
    card.append(links);
    cards.append(card);
  });
  grid.append(cards);
}
if (projects.length && filters) {
  filters.hidden = false;
  const preferred = ['Java & Spring Boot', 'Microservices', 'Banking & Fintech', 'Cloud & DevOps', 'Full Stack', 'Other Projects'];
  const available = [...new Set(projects.map(p => p.category).filter(Boolean))];
  const categories = ['All', ...preferred.filter(c => available.includes(c)), ...available.filter(c => !preferred.includes(c))];
  categories.forEach(category => {
    const button = element('button', category);
    button.type = 'button';
    button.setAttribute('aria-pressed', String(category === 'All'));
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
