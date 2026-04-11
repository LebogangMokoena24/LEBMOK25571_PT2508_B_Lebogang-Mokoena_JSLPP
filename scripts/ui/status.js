/**
 * @module status
 * @description Manages loading and error message visibility.
 */

/**
 * Shows or hides the loading message.
 * @param {boolean} isVisible
 * @returns {void}
 */
export function setLoadingVisible(isVisible) {
  const element = document.getElementById("loading-message");
  if (!element) return;

  element.style.display = isVisible ? "block" : "none";
}

/**
 * Shows or hides the error message.
 * @param {boolean} isVisible
 * @returns {void}
 */
export function setErrorVisible(isVisible) {
  const element = document.getElementById("error-message");
  if (!element) return;

  element.style.display = isVisible ? "block" : "none";
}
