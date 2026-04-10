/**
 * @module mobileMenu
 * Handles opening and closing the mobile menu overlay via the header logo.
 */

/**
 * Sets up the mobile logo and chevron to toggle the mobile menu overlay.
 */
export function setupMobileMenu() {
  const overlay = document.getElementById("mobile-menu-overlay");
  const mobileLogo = document.getElementById("mobile-logo");
  const chevron = document.getElementById("mobile-chevron");

  function openMenu() {
    overlay.classList.add("open");
    chevron.classList.add("open");
  }

  function closeMenu() {
    overlay.classList.remove("open");
    chevron.classList.remove("open");
  }

  mobileLogo.addEventListener("click", () => {
    overlay.classList.contains("open") ? closeMenu() : openMenu();
  });

  chevron.addEventListener("click", () => {
    overlay.classList.contains("open") ? closeMenu() : openMenu();
  });

  // Close when tapping the dark backdrop (outside the menu card)
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeMenu();
  });
}
