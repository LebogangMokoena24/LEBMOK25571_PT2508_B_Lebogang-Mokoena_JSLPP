/**
 * @module taskCounter
 * @description Updates the task count labels in each column header.
 */

/**
 * Counts tasks per status and updates all column header count labels.
 *
 * @param {Array<Object>} tasks - The full array of task objects.
 * @returns {void}
 */
export function updateTaskCounters(tasks) {
  const counts = { todo: 0, doing: 0, done: 0 };

  tasks.forEach((task) => {
    if (counts[task.status] !== undefined) {
      counts[task.status]++;
    }
  });

  const headers = {
    todo: document.getElementById("toDoText"),
    doing: document.getElementById("doingText"),
    done: document.getElementById("doneText"),
  };

  Object.entries(headers).forEach(([status, element]) => {
    if (!element) return;
    element.textContent = `${status.toUpperCase()} (${counts[status]})`;
  });
}
