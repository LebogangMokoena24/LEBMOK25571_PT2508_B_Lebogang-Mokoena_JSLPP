/**
 * @module taskManager
 * @description Handles all task CRUD operations with localStorage sync.
 */

import {
  loadTasksFromStorage,
  saveTasksToStorage,
} from "../utils/localStorage.js";

import { clearExistingTasks, renderTasks } from "../ui/render.js";

/**
 * Generates a unique incremental task ID.
 *
 * @param {Array<Object>} tasks
 * @returns {number}
 */
function generateId(tasks) {
  return Array.isArray(tasks) && tasks.length > 0
    ? Math.max(...tasks.map((t) => Number(t.id) || 0)) + 1
    : 1;
}

/**
 * Safely loads tasks from storage with fallback protection.
 *
 * @returns {Array<Object>}
 */
function getSafeTasks() {
  const tasks = loadTasksFromStorage();
  return Array.isArray(tasks) ? tasks : [];
}

/**
 * Reads the Add New Task form, creates a task, saves, and re-renders.
 *
 * @returns {void}
 */
export function addNewTask() {
  const titleInput = document.getElementById("title-input");
  const descInput = document.getElementById("desc-input");
  const statusSelect = document.getElementById("select-status");
  const prioritySelect = document.getElementById("select-priority");

  if (!titleInput || !statusSelect || !prioritySelect) return;

  const title = titleInput.value.trim();
  const description = descInput?.value.trim() || "";
  const status = statusSelect.value?.toLowerCase?.() || "todo";
  const priority = prioritySelect.value?.toLowerCase?.() || "low";

  if (!title) return;

  const tasks = getSafeTasks();

  const newTask = {
    id: generateId(tasks),
    title,
    description,
    status,
    priority,
    board: "Launch Career",
  };

  const updatedTasks = [...tasks, newTask];

  saveTasksToStorage(updatedTasks);
  clearExistingTasks();
  renderTasks(updatedTasks);

  // Reset form
  titleInput.value = "";
  if (descInput) descInput.value = "";
  statusSelect.value = "todo";
  prioritySelect.value = "high";
}

/**
 * Merges changes into the matching task, saves, and re-renders.
 *
 * @param {number} id
 * @param {Object} changes
 * @returns {void}
 */
export function updateTask(id, changes) {
  const tasks = getSafeTasks();

  const updatedTasks = tasks.map((task) =>
    task.id === id ? { ...task, ...changes } : task
  );

  saveTasksToStorage(updatedTasks);
  clearExistingTasks();
  renderTasks(updatedTasks);
}

/**
 * Removes the task with the given ID, saves, and re-renders.
 *
 * @param {number} id
 * @returns {void}
 */
export function deleteTask(id) {
  const tasks = getSafeTasks();

  const updatedTasks = tasks.filter((task) => task.id !== id);

  saveTasksToStorage(updatedTasks);
  clearExistingTasks();
  renderTasks(updatedTasks);
}
