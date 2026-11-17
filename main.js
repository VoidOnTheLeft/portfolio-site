/* ============================================================
   Сайт-визитка — main.js (подключён с defer)
   ============================================================ */

/* ===== Мобильное меню ===== */
const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
function setMenu(open) {
  nav.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
}
burger.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
document.addEventListener('click', e => {
  if (nav.classList.contains('open') && !nav.contains(e.target) && !burger.contains(e.target)) setMenu(false);
});

/* ===== Появление блоков при прокрутке ===== */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ===== Подсветка раздела в меню и кнопка «Наверх» ===== */
const topBtn = document.getElementById('topBtn');
const links = nav.querySelectorAll('a');
const sections = Array.from(links)
  .map(a => document.getElementById(a.getAttribute('href').slice(1)))
  .filter(Boolean);
function onScroll() {
  const pos = window.scrollY + 140;
  let current = '';
  sections.forEach(s => { if (s.offsetTop <= pos) current = s.id; });
  links.forEach(a => {
    const on = a.getAttribute('href') === '#' + current;
    a.classList.toggle('active', on);
    if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
  });
  topBtn.classList.toggle('show', window.scrollY > 600);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
