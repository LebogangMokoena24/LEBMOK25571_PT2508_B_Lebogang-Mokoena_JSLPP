/**
 * @module theme
 * @description Manages dark/light mode theme toggling.
 */

import { saveThemeToStorage, loadThemeFromStorage } from "../utils/localStorage.js";

/**
 * Applies the given theme to the document.
 * @param {string} theme - "dark" or "light".
 * @returns {void}
 */
export function applyTheme(theme) {
  const isDark = theme === "dark";

  document.body.classList.toggle("dark", isDark);

  const logo = document.getElementById("logo");
  if (logo) {
    logo.src = isDark ? "./assets/logo-dark.svg" : "./assets/logo-light.svg";
  }

  const desktopToggle = document.getElementById("theme-toggle");
  const mobileToggle = document.getElementById("theme-toggle-mobile");

  if (desktopToggle) desktopToggle.checked = isDark;
  if (mobileToggle) mobileToggle.checked = isDark;
}

/**
 * Loads the saved theme and wires up both toggle inputs.
 * @returns {void}
 */
export function setupThemeToggle() {
  const savedTheme = loadThemeFromStorage() || "light";
  applyTheme(savedTheme);

  function handleThemeChange(event) {
    const newTheme = event.target.checked ? "dark" : "light";
    applyTheme(newTheme);
    saveThemeToStorage(newTheme);
  }

  const desktopToggle = document.getElementById("theme-toggle");
  const mobileToggle = document.getElementById("theme-toggle-mobile");

  if (desktopToggle) {
    desktopToggle.addEventListener("change", handleThemeChange);
  }

  if (mobileToggle) {
    mobileToggle.addEventListener("change", handleThemeChange);
  }
}
