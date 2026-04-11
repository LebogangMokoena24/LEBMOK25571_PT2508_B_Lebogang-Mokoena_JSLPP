/**
 * @module main
 * @description Application entry point for the Kanban Task Management app.
 */

import { fetchTasksFromAPI } from "./api/fetchTasks.js";
import { loadTasksFromStorage, saveTasksToStorage } from "./utils/localStorage.js";
import { clearExistingTasks, renderTasks } from "./ui/render.js";
import {
  setupModalCloseHandler,
  setupNewTaskModalHandler,
  setupTaskModalActions,
} from "./ui/modalHandlers.js";
import { setupSidebarToggle, setupMobileMenu } from "./ui/sidebarManager.js";
import { setupThemeToggle } from "./ui/theme.js";
import { setLoadingVisible, setErrorVisible } from "./ui/status.js";

/**
 * Initialises the Kanban board.
 * Loads tasks from localStorage or fetches from API, then renders the board
 * and wires up all UI event handlers.
 *
 * @async
 * @returns {Promise<void>}
 */
async function initTaskBoard() {
  setLoadingVisible(true);
  setErrorVisible(false);

  let tasks = [];
  const storedTasks = loadTasksFromStorage();

  if (Array.isArray(storedTasks) && storedTasks.length > 0) {
    tasks = storedTasks;
  } else {
    try {
      const apiTasks = await fetchTasksFromAPI();

      // Ensure every task has a priority
      tasks = apiTasks.map((task) => ({
        priority: task.priority || "low",
        ...task,
      }));

      saveTasksToStorage(tasks);
    } catch (error) {
      console.error("Could not fetch tasks from API:", error);
      setErrorVisible(true);
    }
  }

  setLoadingVisible(false);

  clearExistingTasks();
  renderTasks(tasks);

  // UI setup
  setupModalCloseHandler();
  setupNewTaskModalHandler();
  setupTaskModalActions();
  setupSidebarToggle();
  setupMobileMenu();
  setupThemeToggle();
}

document.addEventListener("DOMContentLoaded", initTaskBoard);
