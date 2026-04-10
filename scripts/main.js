/**
 * @module main
 * Entry point — initialises the task board, fetches from API,
 * and wires up all UI modules.
 */

import { loadTasksFromStorage, saveTasksToStorage } from "./utils/localStorage.js";
import { clearExistingTasks, renderTasks } from "./ui/render.js";
import {
  setupModalCloseHandler,
  setupNewTaskModalHandler,
  setupTaskModalActions,
} from "./ui/modalHandlers.js";
import { setupSidebarToggle, setupThemeToggle } from "./ui/sidebar.js";
import { setupMobileMenu } from "./ui/mobileMenu.js";

const API_URL = "https://jsl-kanban-api.vercel.app/";

/**
 * Fetches tasks from the remote API.
 * @returns {Promise<Array<Object>>}
 */
async function fetchTasksFromAPI() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  const data = await response.json();
  return Array.isArray(data) ? data : data.tasks || [];
}

/**
 * Shows or hides the loading message.
 * @param {boolean} visible
 */
function setLoadingVisible(visible) {
  document.getElementById("loading-message").style.display = visible ? "block" : "none";
}

/**
 * Shows or hides the error message.
 * @param {boolean} visible
 */
function setErrorVisible(visible) {
  document.getElementById("error-message").style.display = visible ? "block" : "none";
}

/**
 * Initialises the app: loads tasks, renders the board, and sets up all UI handlers.
 */
async function initTaskBoard() {
  setLoadingVisible(true);
  setErrorVisible(false);

  let tasks = null;
  const localTasks = loadTasksFromStorage();

  if (localTasks && localTasks.length > 0) {
    tasks = localTasks;
    setLoadingVisible(false);
  } else {
    try {
      const apiTasks = await fetchTasksFromAPI();
      tasks = apiTasks.map((t) => ({ priority: "low", ...t }));
      saveTasksToStorage(tasks);
      setLoadingVisible(false);
    } catch (err) {
      console.error("Failed to fetch tasks from API:", err);
      setLoadingVisible(false);
      setErrorVisible(true);
      tasks = [];
    }
  }

  clearExistingTasks();
  renderTasks(tasks);

  setupModalCloseHandler();
  setupNewTaskModalHandler();
  setupTaskModalActions();
  setupSidebarToggle();
  setupThemeToggle();
  setupMobileMenu();
}

document.addEventListener("DOMContentLoaded", initTaskBoard);
