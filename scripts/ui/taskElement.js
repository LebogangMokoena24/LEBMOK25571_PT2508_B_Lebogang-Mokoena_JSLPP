/**
 * @module taskElement
 * Creates individual task card DOM elements with title and priority badge.
 */

import { openTaskModal } from "./modalHandlers.js";

/**
 * Returns the display label for a priority value.
 * @param {string} priority
 * @returns {string}
 */
function getPriorityLabel(priority) {
  const map = { high: "High", medium: "Medium", low: "Low" };
  return map[priority] || "Low";
}

/**
 * Creates and returns a task card element.
 * @param {Object} task
 * @returns {HTMLDivElement}
 */
export function createTaskElement(task) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task-div";
  taskDiv.dataset.taskId = task.id;

  const titleSpan = document.createElement("span");
  titleSpan.className = "task-title";
  titleSpan.textContent = task.title;

  const priority = task.priority || "low";
  const badge = document.createElement("span");
  badge.className = `priority-badge ${priority}`;
  badge.textContent = getPriorityLabel(priority);

  taskDiv.appendChild(titleSpan);
  taskDiv.appendChild(badge);

  taskDiv.addEventListener("click", () => openTaskModal(task));

  return taskDiv;
}
