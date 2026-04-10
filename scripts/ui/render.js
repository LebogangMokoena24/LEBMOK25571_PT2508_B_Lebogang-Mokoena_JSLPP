/**
 * @module render
 * Renders tasks to board columns sorted by priority, and updates column counts.
 */

import { createTaskElement } from "./taskElement.js";

/** Priority sort order: lower number = higher priority */
const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

/**
 * Returns the tasks-container for a given status.
 * @param {string} status
 * @returns {HTMLElement|null}
 */
function getTaskContainerByStatus(status) {
  const column = document.querySelector(`.column-div[data-status="${status}"]`);
  return column ? column.querySelector(".tasks-container") : null;
}

/**
 * Clears all task elements from all columns.
 */
export function clearExistingTasks() {
  document.querySelectorAll(".tasks-container").forEach((c) => (c.innerHTML = ""));
}

/**
 * Updates the column header count labels.
 * @param {Array<Object>} tasks
 */
function updateColumnCounts(tasks) {
  const counts = { todo: 0, doing: 0, done: 0 };
  tasks.forEach((t) => {
    if (counts[t.status] !== undefined) counts[t.status]++;
  });
  document.getElementById("toDoText").textContent = `TODO (${counts.todo})`;
  document.getElementById("doingText").textContent = `DOING (${counts.doing})`;
  document.getElementById("doneText").textContent = `DONE (${counts.done})`;
}

/**
 * Sorts tasks by priority (High → Medium → Low).
 * @param {Array<Object>} tasks
 * @returns {Array<Object>}
 */
function sortByPriority(tasks) {
  return [...tasks].sort((a, b) => {
    const pa = PRIORITY_ORDER[a.priority || "low"];
    const pb = PRIORITY_ORDER[b.priority || "low"];
    return pa - pb;
  });
}

/**
 * Renders all tasks into their respective columns, sorted by priority.
 * @param {Array<Object>} tasks
 */
export function renderTasks(tasks) {
  const sorted = sortByPriority(tasks);
  sorted.forEach((task) => {
    const container = getTaskContainerByStatus(task.status);
    if (container) container.appendChild(createTaskElement(task));
  });
  updateColumnCounts(tasks);
}
