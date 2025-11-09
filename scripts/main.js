// scripts/main.js
const sections = [
  "grillmeny",
  "maltider",
  "pizzor",
  "piroger",
  "rullar",
  "extra",
];

const container = document.getElementById("menu-content");

async function loadSections() {
  for (const section of sections) {
    const response = await fetch(`sections/${section}.html`);
    const html = await response.text();
    container.insertAdjacentHTML("beforeend", html);
  }
}

function setupNavHandlers() {
  const navLinks = document.querySelectorAll('.nav-gallery a.nav-item');
  const wood = document.querySelector('.wood-scroll');
  if (!navLinks.length || !wood) return;

  navLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href') || '';
      const hashIndex = href.indexOf('#');
      if (hashIndex === -1) return; // no fragment to handle
      const id = href.slice(hashIndex + 1);
      const target = document.getElementById(id);
      if (target) {
        // prevent the default navigation to menu.html and scroll inside the wood-scroll
        e.preventDefault();
        const top = target.getBoundingClientRect().top - wood.getBoundingClientRect().top + wood.scrollTop;
        wood.scrollTo({ top, behavior: 'smooth' });

        // accessibility: move focus to the section
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });

        // active visual state on nav
        navLinks.forEach(n => n.classList.remove('active'));
        a.classList.add('active');
      }
    });
  });
}

// Initialize: load sections then wire up nav clicks
async function init() {
  await loadSections();
  setupNavHandlers();
}

init();