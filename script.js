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
  // Demo web estática (ideal para GitHub Pages; a versão PHP original está no repositório).
  pokedexDemo: "pokedex-demo.html"
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

  // A demo é um arquivo estático ao lado do portfólio, então também funciona em GitHub Pages.
  if (key === "pokedexDemo" && value) {
    el.href = value;
    el.classList.remove("link-placeholder", "demo-link-pending");
    el.removeAttribute("aria-disabled");
  } else if (key === "pokedexDemo" && !value) {
    el.classList.add("link-placeholder");
    el.setAttribute("aria-disabled", "true");
    el.addEventListener("click", (event) => {
      event.preventDefault();
      alert("A demo web da Pokédex ainda não está configurada. Confira o arquivo script.js.");
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

// Contato: abre o Gmail no navegador para não depender de um aplicativo de e-mail instalado.
const emailLink = document.getElementById("emailLink");
const directEmailLink = document.getElementById("directEmailLink");
if (emailLink && PORTFOLIO.email) {
  // Link já fica definido no HTML como alternativa caso o JavaScript não carregue.
  emailLink.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PORTFOLIO.email)}`;
  emailLink.target = "_blank";
  emailLink.rel = "noopener noreferrer";
  emailLink.setAttribute("aria-label", `Enviar e-mail para ${PORTFOLIO.email} pelo Gmail`);
}
if (directEmailLink && PORTFOLIO.email) {
  directEmailLink.href = `mailto:${PORTFOLIO.email}?subject=${encodeURIComponent("Contato pelo portfólio")}`;
  directEmailLink.textContent = PORTFOLIO.email;
}

// Copia o e-mail para a área de transferência como alternativa ao botão de envio.
const copyEmailButton = document.getElementById("copyEmail");
const copyStatus = document.getElementById("copyStatus");
if (copyEmailButton && PORTFOLIO.email) {
  copyEmailButton.addEventListener("click", async () => {
    let copied = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(PORTFOLIO.email);
        copied = true;
      } else {
        const temporaryInput = document.createElement("textarea");
        temporaryInput.value = PORTFOLIO.email;
        temporaryInput.setAttribute("readonly", "");
        temporaryInput.style.position = "fixed";
        temporaryInput.style.opacity = "0";
        document.body.appendChild(temporaryInput);
        temporaryInput.select();
        copied = document.execCommand("copy");
        temporaryInput.remove();
      }
    } catch (error) {
      copied = false;
    }

    if (copyStatus) {
      copyStatus.textContent = copied
        ? "E-mail copiado para a área de transferência ✓"
        : `Copie este endereço: ${PORTFOLIO.email}`;
    }
    copyEmailButton.innerHTML = copied
      ? 'Copiado! <span aria-hidden="true">✓</span>'
      : 'Tente novamente <span aria-hidden="true">↻</span>';
  });
}

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
