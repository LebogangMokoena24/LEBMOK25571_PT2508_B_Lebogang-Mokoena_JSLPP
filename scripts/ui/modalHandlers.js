/**
 * @module modalHandlers
 * Opens, closes, and handles interactions for both task modals.
 */

import { addNewTask, updateTask, deleteTask } from "../tasks/taskManager.js";

/** Tracks which task is currently open in the edit modal */
let currentTaskId = null;

/**
 * Sets up the close button for the edit task modal.
 */
export function setupModalCloseHandler() {
  const modal = document.getElementById("task-modal");
  document.getElementById("close-modal-btn").addEventListener("click", () => modal.close());
}

/**
 * Sets up the Add New Task modal open, close, and submit handlers.
 */
export function setupNewTaskModalHandler() {
  const dialog = document.getElementById("new-task-dialog");
  const form = document.getElementById("new-task-modal-window");
  const cancelBtn = document.getElementById("cancel-add-btn");

  document.getElementById("add-new-task-btn").addEventListener("click", () => dialog.showModal());

  cancelBtn.addEventListener("click", () => {
    dialog.close();
    form.reset();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (form.checkValidity()) {
      addNewTask();
      dialog.close();
    } else {
      form.reportValidity();
    }
  });
}

/**
 * Sets up Save Changes and Delete Task buttons in the edit modal.
 */
export function setupTaskModalActions() {
  document.getElementById("save-task-btn").addEventListener("click", () => {
    if (currentTaskId === null) return;
    const title = document.getElementById("task-title").value.trim();
    const description = document.getElementById("task-desc").value.trim();
    const status = document.getElementById("task-status").value;
    const priority = document.getElementById("task-priority").value;
    if (!title) return;
    updateTask(currentTaskId, { title, description, status, priority });
    document.getElementById("task-modal").close();
  });

  document.getElementById("delete-task-btn").addEventListener("click", () => {
    if (currentTaskId === null) return;
    const confirmed = confirm(
      "Are you sure you want to delete this task? This action cannot be undone."
    );
    if (confirmed) {
      deleteTask(currentTaskId);
      document.getElementById("task-modal").close();
    }
  });
}

/**
 * Opens the edit modal pre-filled with the given task's data.
 * @param {Object} task
 */
export function openTaskModal(task) {
  currentTaskId = task.id;
  document.getElementById("task-title").value = task.title;
  document.getElementById("task-desc").value = task.description || "";
  document.getElementById("task-status").value = task.status;
  document.getElementById("task-priority").value = task.priority || "low";
  document.getElementById("task-modal").showModal();
}
