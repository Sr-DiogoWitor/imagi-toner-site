const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');
const form = document.querySelector('[data-contact-form]');
const formStatus = document.querySelector('[data-form-status]');

document.documentElement.classList.add('js-ready');

const setHeaderState = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 24);
};

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

const closeMenu = () => {
  if (!menuToggle || !primaryNav) return;
  menuToggle.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.querySelector('.sr-only').textContent = 'Abrir menu';
  primaryNav.classList.remove('is-open');
};

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.querySelector('.sr-only').textContent = isOpen ? 'Fechar menu' : 'Abrir menu';
  primaryNav?.classList.toggle('is-open', isOpen);
});

primaryNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const revealItems = document.querySelectorAll('[data-reveal]');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -36px' });

revealItems.forEach((item) => revealObserver.observe(item));

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  formStatus.removeAttribute('data-state');

  if (!form.checkValidity()) {
    form.reportValidity();
    formStatus.textContent = 'Confira os campos obrigatórios para enviar sua solicitação.';
    return;
  }

  formStatus.dataset.state = 'success';
  formStatus.textContent = 'Solicitação preparada neste protótipo. O próximo passo é conectar este formulário ao canal de atendimento.';
  form.reset();
});

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();
