/**
 * @module taskManager
 * Creates, updates, and deletes tasks — syncing localStorage and the board.
 */

import { loadTasksFromStorage, saveTasksToStorage } from "../utils/localStorage.js";
import { clearExistingTasks, renderTasks } from "../ui/render.js";

/**
 * Adds a new task from the Add New Task form to storage and re-renders.
 */
export function addNewTask() {
  const title = document.getElementById("title-input").value.trim();
  const description = document.getElementById("desc-input").value.trim();
  const status = document.getElementById("select-status").value;
  const priority = document.getElementById("select-priority").value;

  if (!title) return;

  const tasks = loadTasksFromStorage() || [];
  const newTask = {
    id: tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
    title,
    description,
    status,
    priority,
    board: "Launch Career",
  };

  const updated = [...tasks, newTask];
  saveTasksToStorage(updated);
  clearExistingTasks();
  renderTasks(updated);

  document.getElementById("title-input").value = "";
  document.getElementById("desc-input").value = "";
  document.getElementById("select-status").value = "todo";
  document.getElementById("select-priority").value = "high";
}

/**
 * Updates an existing task's fields, saves to storage, and re-renders.
 * @param {number} id - Task ID to update.
 * @param {Object} changes - Fields to update.
 */
export function updateTask(id, changes) {
  const tasks = loadTasksFromStorage() || [];
  const updated = tasks.map((t) => (t.id === id ? { ...t, ...changes } : t));
  saveTasksToStorage(updated);
  clearExistingTasks();
  renderTasks(updated);
}

/**
 * Deletes a task by ID, saves to storage, and re-renders.
 * @param {number} id - Task ID to delete.
 */
export function deleteTask(id) {
  const tasks = loadTasksFromStorage() || [];
  const updated = tasks.filter((t) => t.id !== id);
  saveTasksToStorage(updated);
  clearExistingTasks();
  renderTasks(updated);
}
