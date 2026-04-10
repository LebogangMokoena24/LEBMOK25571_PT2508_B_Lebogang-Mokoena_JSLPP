/**
 * @module sidebar
 * Handles the desktop sidebar hide/show toggle and theme switching.
 */

import { saveThemeToStorage, loadThemeFromStorage } from "../utils/localStorage.js";

/**
 * Applies the given theme to the document and syncs both toggle inputs.
 * @param {string} theme - "dark" or "light"
 */
function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
  document.getElementById("logo").src =
    theme === "dark" ? "./assets/logo-dark.svg" : "./assets/logo-light.svg";
  const desktopToggle = document.getElementById("theme-toggle");
  const mobileToggle = document.getElementById("theme-toggle-mobile");
  if (desktopToggle) desktopToggle.checked = theme === "dark";
  if (mobileToggle) mobileToggle.checked = theme === "dark";
}

/**
 * Sets up hide and show sidebar button click handlers (desktop only).
 */
export function setupSidebarToggle() {
  const sidebar = document.getElementById("side-bar-div");
  const hideBtn = document.getElementById("hide-sidebar-btn");
  const showBtn = document.getElementById("show-sidebar-btn");

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
 * Loads the saved theme and sets up theme toggle change handlers
 * for both the desktop sidebar and mobile menu toggles.
 */
export function setupThemeToggle() {
  const savedTheme = loadThemeFromStorage();
  applyTheme(savedTheme);

  function handleToggleChange(e) {
    const theme = e.target.checked ? "dark" : "light";
    applyTheme(theme);
    saveThemeToStorage(theme);
  }

  document.getElementById("theme-toggle").addEventListener("change", handleToggleChange);
  document.getElementById("theme-toggle-mobile").addEventListener("change", handleToggleChange);
}
