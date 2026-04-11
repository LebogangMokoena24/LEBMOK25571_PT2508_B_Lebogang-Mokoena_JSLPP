/**
 * @module sidebar
 * Handles the desktop sidebar hide/show toggle and theme switching.
 */

import {
  saveThemeToStorage,
  loadThemeFromStorage,
} from "../utils/localStorage.js";

/**
 * Applies the given theme and syncs UI elements.
 *
 * @param {string} theme - "dark" or "light"
 */
function applyTheme(theme) {
  const safeTheme = theme === "dark" ? "dark" : "light";

  document.body.classList.toggle("dark", safeTheme === "dark");

  const logo = document.getElementById("logo");
  if (logo) {
    logo.src =
      safeTheme === "dark"
        ? "./assets/logo-dark.svg"
        : "./assets/logo-light.svg";
  }

  const desktopToggle = document.getElementById("theme-toggle");
  const mobileToggle = document.getElementById("theme-toggle-mobile");

  if (desktopToggle) desktopToggle.checked = safeTheme === "dark";
  if (mobileToggle) mobileToggle.checked = safeTheme === "dark";
}

/**
 * Sets up hide/show sidebar toggle (desktop only).
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
 * Sets up theme toggle listeners for desktop and mobile.
 */
export function setupThemeToggle() {
  const savedTheme = loadThemeFromStorage();
  applyTheme(savedTheme);

  const desktopToggle = document.getElementById("theme-toggle");
  const mobileToggle = document.getElementById("theme-toggle-mobile");

  function handleToggleChange(e) {
    const theme = e.target.checked ? "dark" : "light";
    applyTheme(theme);
    saveThemeToStorage(theme);
  }

  if (desktopToggle) {
    desktopToggle.addEventListener("change", handleToggleChange);
  }

  if (mobileToggle) {
    mobileToggle.addEventListener("change", handleToggleChange);
  }
}
