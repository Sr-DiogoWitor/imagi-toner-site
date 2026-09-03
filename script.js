document.documentElement.classList.add("has-js");

const equipmentSolutions = [
  {
    type: "Imagem conceitual",
    category: "Multifuncional",
    title: "Para a rotina de escritório",
    description: "Placeholder para apresentar equipamento, categoria e descrição aprovados.",
    visual: "office",
  },
  {
    type: "Imagem conceitual",
    category: "Impressão colorida",
    title: "Para ideias que pedem cor",
    description: "Placeholder para receber foto e especificações do catálogo real.",
    visual: "color",
  },
  {
    type: "Imagem conceitual",
    category: "Equipamento profissional",
    title: "Para volumes maiores",
    description: "Placeholder para solução, disponibilidade e CTA definidos pela empresa.",
    visual: "pro",
  },
];

const equipmentList = document.querySelector("[data-equipment-list]");

function equipmentVisual(kind) {
  const colors = kind === "color" ? ["#ef5b68", "#dfeeff", "#09253f"] : kind === "pro" ? ["#09253f", "#77b3d8", "#ef5b68"] : ["#77b3d8", "#f7f8f5", "#09253f"];
  return `
    <div class="equipment-visual equipment-visual-${kind}" aria-hidden="true">
      <span class="equipment-sheet equipment-sheet-one" style="--sheet-color:${colors[1]}"></span>
      <span class="equipment-sheet equipment-sheet-two" style="--sheet-color:${colors[0]}"></span>
      <div class="equipment-machine" style="--machine-color:${colors[2]}">
        <span class="machine-top"></span><span class="machine-display"></span><span class="machine-slot"></span><span class="machine-tray"></span>
      </div>
      <span class="equipment-visual-code">${kind === "office" ? "A / 01" : kind === "color" ? "B / 02" : "C / 03"}</span>
    </div>`;
}

if (equipmentList) {
  equipmentList.innerHTML = equipmentSolutions
    .map(
      (item, index) => `
        <article class="equipment-item" data-reveal="${index === 1 ? "scale" : "rise"}">
          ${equipmentVisual(item.visual)}
          <div class="equipment-meta"><span>${item.type}</span><span>0${index + 1}</span></div>
          <p class="equipment-category">${item.category}</p>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <a class="text-link text-link-dark" href="#contato">Quero saber mais <svg class="icon-arrow" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 13 13 3M5 3h8v8" /></svg></a>
        </article>`,
    )
    .join("");
}

const header = document.querySelector("[data-header]");
const progress = document.querySelector(".scroll-progress span");

function updateScrollState() {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
  if (progress) {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${total > 0 ? window.scrollY / total : 0})`;
  }
}

window.addEventListener("scroll", updateScrollState, { passive: true });
updateScrollState();

const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
let menuWasOpen = false;

function closeMenu({ restoreFocus = true } = {}) {
  mobileMenu?.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Abrir menu");
  document.body.classList.remove("menu-open");
  if (restoreFocus && menuWasOpen) menuToggle?.focus();
  menuWasOpen = false;
}

menuToggle?.addEventListener("click", () => {
  const isOpen = mobileMenu?.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  document.body.classList.toggle("menu-open", Boolean(isOpen));
  menuWasOpen = Boolean(isOpen);
  if (isOpen) mobileMenu?.querySelector("a")?.focus();
});

mobileMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => closeMenu({ restoreFocus: false })));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const revealItems = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8%" },
  );
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const form = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");

function setError(field, message) {
  const error = document.querySelector(`[data-error-for="${field.name}"]`);
  field.classList.toggle("has-error", Boolean(message));
  field.setAttribute("aria-invalid", String(Boolean(message)));
  if (error) error.textContent = message || "";
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const requiredFields = [...form.querySelectorAll("[required]")];
  let isValid = true;

  requiredFields.forEach((field) => {
    let message = "";
    if (!field.value.trim()) message = "Preencha este campo para continuar.";
    else if (field.type === "email" && !field.validity.valid) message = "Confira o formato do e-mail.";
    else if (field.name === "phone" && field.value.replace(/\D/g, "").length < 10) message = "Informe um telefone válido.";
    setError(field, message);
    if (message && isValid) field.focus();
    if (message) isValid = false;
  });

  if (!formStatus) return;
  if (!isValid) {
    formStatus.textContent = "Confira os campos destacados e tente novamente.";
    formStatus.className = "form-status is-error";
    return;
  }

  formStatus.textContent = "Solicitação registrada no protótipo. Em uma versão publicada, ela seguirá para o atendimento da MASI TONER.";
  formStatus.className = "form-status is-success";
  form.reset();
});

form?.querySelectorAll("input, textarea, select").forEach((field) => {
  field.addEventListener("input", () => {
    if (field.hasAttribute("required")) setError(field, "");
    if (formStatus?.classList.contains("is-error") || formStatus?.classList.contains("is-success")) {
      formStatus.textContent = "";
      formStatus.className = "form-status";
    }
  });
});

const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();
