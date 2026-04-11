/**
 * @module localStorage
 * @description Utility functions for persisting and retrieving app data
 * from the browser's localStorage.
 */

/** @constant {string} Key used to store tasks in localStorage */
const TASKS_KEY = "kanban_tasks";

/** @constant {string} Key used to store the theme preference */
const THEME_KEY = "kanban_theme";

/**
 * Loads the saved tasks array from localStorage.
 *
 * @returns {Array<Object>|null}
 */
export function loadTasksFromStorage() {
  try {
    const stored = localStorage.getItem(TASKS_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Failed to load tasks from localStorage:", error);
    return null;
  }
}

/**
 * Saves the given tasks array to localStorage.
 *
 * @param {Array<Object>} tasks
 */
export function saveTasksToStorage(tasks) {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks to localStorage:", error);
  }
}

/**
 * Saves the user's theme preference to localStorage.
 *
 * @param {string} theme - Either "dark" or "light"
 */
export function saveThemeToStorage(theme) {
  const safeTheme = theme === "dark" ? "dark" : "light";
  localStorage.setItem(THEME_KEY, safeTheme);
}

/**
 * Loads the saved theme preference from localStorage.
 *
 * @returns {string} "dark" or "light"
 */
export function loadThemeFromStorage() {
  const theme = localStorage.getItem(THEME_KEY);
  return theme === "dark" ? "dark" : "light";
}
