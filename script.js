/*
  DADOS DO PORTFÓLIO
  Edite este objeto quando quiser atualizar os seus links ou adicionar projetos.
*/
const PORTFOLIO = {
  name: "Nelson Allein Neto",
  github: "https://github.com/neto750",
  linkedin: "https://www.linkedin.com/in/nelson-allein-neto-650403352/",
  email: "nelsonalleinneto@gmail.com",
  pokedexGithub: "https://github.com/neto750/Pok-dex",
  // Adicione aqui a URL pública quando hospedar a Pokédex. Por enquanto, deixe vazio.
  pokedexDemo: ""
};

// Aplica o nome configurado aos elementos da página.
document.querySelectorAll("[data-config='name']").forEach((el) => {
  el.textContent = PORTFOLIO.name;
});

// Configura os links a partir do objeto PORTFOLIO.
document.querySelectorAll("[data-link]").forEach((el) => {
  const key = el.dataset.link;
  let value = PORTFOLIO[key];

  if (key === "email") {
    value = value ? `mailto:${value}` : "";
  }

  // O link de demonstração é opcional enquanto a Pokédex não estiver hospedada.
  if (key === "pokedexDemo" && !value) {
    el.classList.add("link-placeholder");
    el.setAttribute("aria-disabled", "true");
    el.addEventListener("click", (event) => {
      event.preventDefault();
      alert("A Pokédex ainda não tem uma demonstração online. Você pode usar o link do GitHub para ver o código.");
    });
  } else if (!value || value.includes("SEU-USUARIO") || value.includes("SEU-PERFIL") || value.includes("seuemail@exemplo.com")) {
    el.classList.add("link-placeholder");
    el.setAttribute("aria-label", `${el.textContent.trim()} — configure este link no arquivo script.js`);
    el.addEventListener("click", (event) => {
      event.preventDefault();
      alert("Este link ainda é um exemplo. Abra o arquivo script.js e configure o endereço correto.");
    });
  } else {
    el.href = value;
  }
});

// Animação de entrada conforme as seções aparecem na tela.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -25px 0px" });

  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// Brilho acompanha o mouse em dispositivos com ponteiro preciso.
const glow = document.querySelector(".cursor-glow");
if (glow && window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.addEventListener("pointermove", (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }, { passive: true });
}

// Menu mobile acessível.
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    nav.classList.toggle("open", open);
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
  }));
}

// Atualiza o título da aba com o nome configurado.
document.title = `${PORTFOLIO.name} — Dev Portfolio`;
