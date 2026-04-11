/**
 * @module sidebarManager
 * @description Manages sidebar hide/show and mobile menu toggle.
 */

/**
 * Sets up desktop sidebar hide and show button handlers.
 * @returns {void}
 */
export function setupSidebarToggle() {
  const sidebar = document.getElementById("side-bar-div");
  const hideBtn = document.getElementById("hide-sidebar-btn");
  const showBtn = document.getElementById("show-sidebar-btn");

  if (!sidebar || !hideBtn || !showBtn) return;

  hideBtn.addEventListener("click", () => {
    sidebar.classList.add("hidden");
    showBtn.classList.add("visible");
  });

  showBtn.addEventListener("click", () => {
    sidebar.classList.remove("hidden");
    showBtn.classList.remove("visible");
  });
}

/**
 * Sets up the mobile menu overlay toggle via the header logo and chevron.
 * @returns {void}
 */
export function setupMobileMenu() {
  const overlay = document.getElementById("mobile-menu-overlay");
  const mobileLogo = document.getElementById("mobile-logo");
  const chevron = document.getElementById("mobile-chevron");
  const closeBtn = document.getElementById("mobile-close-btn");

  if (!overlay || !mobileLogo || !chevron || !closeBtn) return;

  function openMobileMenu() {
    overlay.classList.add("open");
    chevron.classList.add("open");
  }

  function closeMobileMenu() {
    overlay.classList.remove("open");
    chevron.classList.remove("open");
  }

  function toggleMenu() {
    overlay.classList.contains("open") ? closeMobileMenu() : openMobileMenu();
  }

  mobileLogo.addEventListener("click", toggleMenu);
  chevron.addEventListener("click", toggleMenu);
  closeBtn.addEventListener("click", closeMobileMenu);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeMobileMenu();
  });
}
