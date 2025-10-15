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

loadSections();