/**
 * @module taskElement
 * @description Creates individual task card DOM elements.
 */

import { openTaskModal } from "./modalHandlers.js";

/**
 * Returns a display label for a priority value.
 *
 * @param {string} priority
 * @returns {string}
 */
function getPriorityLabel(priority) {
  const labels = {
    high: "High",
    medium: "Medium",
    low: "Low",
  };

  return labels[priority] || "Low";
}

/**
 * Creates and returns a task card element.
 *
 * @param {Object} task
 * @returns {HTMLDivElement}
 */
export function createTaskElement(task) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task-div";
  taskDiv.dataset.taskId = task?.id ?? "";

  const titleSpan = document.createElement("span");
  titleSpan.className = "task-title";
  titleSpan.textContent = task?.title || "Untitled Task";

  const priority = (task?.priority || "low").toLowerCase();

  const safePriority =
    priority === "high" || priority === "medium" || priority === "low"
      ? priority
      : "low";

  const badge = document.createElement("span");
  badge.className = `priority-badge ${safePriority}`;
  badge.textContent = getPriorityLabel(safePriority);

  taskDiv.appendChild(titleSpan);
  taskDiv.appendChild(badge);

  taskDiv.addEventListener("click", () => {
    if (task && typeof task === "object") {
      openTaskModal(task);
    }
  });

  return taskDiv;
}
