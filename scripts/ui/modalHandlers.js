/**
 * @module modalHandlers
 * @description Manages open, close, and interaction logic for both modals.
 */

import {
  addNewTask,
  updateTask,
  deleteTask,
} from "../tasks/taskManager.js";

/** @type {number|null} */
let currentTaskId = null;

/**
 * Safe helper to get element by ID.
 *
 * @param {string} id
 * @returns {HTMLElement|null}
 */
function getEl(id) {
  return document.getElementById(id);
}

/**
 * Sets up the close button on the edit task modal.
 */
export function setupModalCloseHandler() {
  const modal = getEl("task-modal");
  const closeBtn = getEl("close-modal-btn");

  if (!modal || !closeBtn) return;

  closeBtn.addEventListener("click", () => modal.close());
}

/**
 * Sets up the Add New Task modal handlers.
 */
export function setupNewTaskModalHandler() {
  const dialog = getEl("new-task-dialog");
  const form = getEl("new-task-modal-window");
  const cancelBtn = getEl("cancel-add-btn");
  const addBtn = getEl("add-new-task-btn");

  if (!dialog || !form || !cancelBtn || !addBtn) return;

  addBtn.addEventListener("click", () => dialog.showModal());

  cancelBtn.addEventListener("click", () => {
    dialog.close();
    form.reset();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (form.checkValidity()) {
      addNewTask();
      dialog.close();
      form.reset();
    } else {
      form.reportValidity();
    }
  });
}

/**
 * Sets up Save Changes and Delete Task handlers.
 */
export function setupTaskModalActions() {
  const saveBtn = getEl("save-task-btn");
  const deleteBtn = getEl("delete-task-btn");
  const modal = getEl("task-modal");

  if (!saveBtn || !deleteBtn || !modal) return;

  saveBtn.addEventListener("click", () => {
    if (currentTaskId === null) return;

    const title = getEl("task-title")?.value?.trim();
    const description = getEl("task-desc")?.value?.trim();
    const status = getEl("task-status")?.value;
    const priority = getEl("task-priority")?.value;

    if (!title) {
      alert("Task title cannot be empty.");
      return;
    }

    updateTask(currentTaskId, {
      title,
      description,
      status,
      priority,
    });

    currentTaskId = null;
    modal.close();
  });

  deleteBtn.addEventListener("click", () => {
    if (currentTaskId === null) return;

    const confirmed = window.confirm(
      "Delete this task? This cannot be undone."
    );

    if (!confirmed) return;

    deleteTask(currentTaskId);

    currentTaskId = null;
    modal.close();
  });
}

/**
 * Opens the edit modal pre-filled with task data.
 */
export function openTaskModal(task) {
  if (!task) return;

  currentTaskId = task.id ?? null;

  const titleEl = getEl("task-title");
  const descEl = getEl("task-desc");
  const statusEl = getEl("task-status");
  const priorityEl = getEl("task-priority");
  const modal = getEl("task-modal");

  if (!titleEl || !descEl || !statusEl || !priorityEl || !modal) return;

  titleEl.value = task.title || "";
  descEl.value = task.description || "";
  statusEl.value = task.status || "todo";
  priorityEl.value = task.priority || "low";

  modal.showModal();
}
