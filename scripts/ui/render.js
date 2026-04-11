/**
 * @module render
 * @description Renders tasks to board columns, sorted by priority.
 */

import { createTaskElement } from "./taskElement.js";
import { sortTasksByPriority } from "./sortTasks.js";
import { updateTaskCounters } from "./taskCounter.js";

/**
 * Gets the correct column container based on task status.
 * Normalises status to prevent rendering bugs.
 *
 * @param {string} status
 * @returns {HTMLElement|null}
 */
function getContainerByStatus(status) {
  const normalisedStatus = String(status || "").toLowerCase().trim();

  const column = document.querySelector(
    `.column-div[data-status="${normalisedStatus}"]`
  );

  return column ? column.querySelector(".tasks-container") : null;
}

/**
 * Clears all task columns before re-rendering.
 * @returns {void}
 */
export function clearExistingTasks() {
  document.querySelectorAll(".tasks-container").forEach((container) => {
    container.innerHTML = "";
  });
}

/**
 * Renders tasks onto the board, sorted by priority.
 * Also updates task counters.
 *
 * @param {Array<Object>} tasks
 * @returns {void}
 */
export function renderTasks(tasks = []) {
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  let sortedTasks = [];

  try {
    sortedTasks = sortTasksByPriority(safeTasks) || [];
  } catch (error) {
    console.error("Sorting failed, rendering unsorted tasks:", error);
    sortedTasks = safeTasks;
  }

  sortedTasks.forEach((task) => {
    const container = getContainerByStatus(task.status);

    if (container) {
      container.appendChild(createTaskElement(task));
    } else {
      console.warn("Task skipped بسبب invalid status:", task);
    }
  });

  updateTaskCounters(sortedTasks);
}
