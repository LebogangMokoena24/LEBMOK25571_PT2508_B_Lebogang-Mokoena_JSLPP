/**
 * @module fetchTasks
 * @description Handles fetching tasks from the remote Kanban API.
 */

const API_URL = "https://jsl-kanban-api.vercel.app/";

/**
 * Fetches the initial task list from the remote API.
 * Normalises the response to always return an array.
 *
 * @returns {Promise<Array<Object>>} Resolves with an array of task objects.
 * @throws {Error} If the network request fails or the response is not OK.
 */
export async function fetchTasksFromAPI() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`API request failed with status: ${response.status}`);
  }

  const data = await response.json();

  // Normalise: API may return an array directly or wrap tasks in a property
  return Array.isArray(data) ? data : data.tasks || [];
}
