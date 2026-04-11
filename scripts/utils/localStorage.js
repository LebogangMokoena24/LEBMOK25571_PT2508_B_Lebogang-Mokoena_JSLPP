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
 * @returns {Array<Object>|null} Parsed tasks array, or null if none stored.
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
 * @param {Array<Object>} tasks - The array of task objects to persist.
 * @returns {void}
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
 * @param {string} theme - Either "dark" or "light".
 * @returns {void}
 */
export function saveThemeToStorage(theme) {
  localStorage.setItem(THEME_KEY, theme);
}

/**
 * Loads the saved theme preference from localStorage.
 *
 * @returns {string} The saved theme ("dark" or "light"). Defaults to "light".
 */
export function loadThemeFromStorage() {
  return localStorage.getItem(THEME_KEY) || "light";
}
