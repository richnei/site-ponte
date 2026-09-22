const menuButton = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");
const header = document.querySelector("[data-header]");
const year = document.querySelector("[data-year]");

function closeMenu() {
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", "Abrir menu");
  menu?.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
  menu?.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

menu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    menuButton?.focus();
  }
});

window.addEventListener(
  "scroll",
  () => header?.classList.toggle("is-scrolled", window.scrollY > 12),
  { passive: true }
);

window.addEventListener("resize", () => {
  if (window.innerWidth >= 900) closeMenu();
});

if (year) year.textContent = new Date().getFullYear();

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;

  const analyticsTarget = event.target.closest("[data-analytics-event]");

  if (!analyticsTarget || typeof window.gtag !== "function") return;

  const eventName = analyticsTarget.dataset.analyticsEvent;
  const eventParams = {
    link_text: analyticsTarget.textContent.trim().replace(/\s+/g, " "),
    link_url: analyticsTarget.href || analyticsTarget.getAttribute("href"),
    link_location: analyticsTarget.dataset.analyticsLocation,
  };

  if (analyticsTarget.dataset.analyticsPlatform) {
    eventParams.social_platform = analyticsTarget.dataset.analyticsPlatform;
  }

  window.gtag("event", eventName, eventParams);
});
