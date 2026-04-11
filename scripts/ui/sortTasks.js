/**
 * @module sortTasks
 * @description Provides sorting utilities for task arrays.
 */

/**
 * Numeric sort order for priority levels.
 * @constant {Object.<string, number>}
 */
const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

/**
 * Sorts tasks by priority: High → Medium → Low.
 *
 * @param {Array<Object>} tasks - The array of task objects to sort.
 * @returns {Array<Object>} A new sorted array (original is not mutated).
 */
export function sortTasksByPriority(tasks) {
  return [...tasks].sort((taskA, taskB) => {
    const priorityA = PRIORITY_ORDER[taskA.priority] ?? PRIORITY_ORDER.low;
    const priorityB = PRIORITY_ORDER[taskB.priority] ?? PRIORITY_ORDER.low;
    return priorityA - priorityB;
  });
}
