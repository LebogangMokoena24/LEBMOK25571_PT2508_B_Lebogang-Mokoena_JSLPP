/**
 * @module localStorage
 * All localStorage read/write operations for tasks and theme preference.
 */

const TASKS_KEY = "kanban_tasks";

/**
 * Loads tasks from localStorage.
 * @returns {Array<Object>|null}
 */
export function loadTasksFromStorage() {
  const stored = localStorage.getItem(TASKS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (err) {
      console.error("Error parsing tasks from localStorage:", err);
    }
  }
  return null;
}

/**
 * Saves the given tasks array to localStorage.
 * @param {Array<Object>} tasks
 */
export function saveTasksToStorage(tasks) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

/**
 * Saves theme preference ("dark" or "light") to localStorage.
 * @param {string} theme
 */
export function saveThemeToStorage(theme) {
  localStorage.setItem("kanban_theme", theme);
}

/**
 * Loads saved theme preference from localStorage.
 * @returns {string} "dark" or "light"
 */
export function loadThemeFromStorage() {
  return localStorage.getItem("kanban_theme") || "light";
}
