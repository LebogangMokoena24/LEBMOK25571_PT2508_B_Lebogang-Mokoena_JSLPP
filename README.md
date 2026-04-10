# LEBMOK25571_PT2508_B_Lebogang-Mokoena_JSLPP
# Kanban Task Management App

**Live App:**   
**Presentation:** 

---

## Features

- **API Data Fetching** — Tasks are fetched from the live API on first load. A loading message displays while fetching, and an error message appears if it fails.
- **Local Storage Persistence** — All tasks are saved to localStorage so data survives page refreshes.
- **Add Tasks** — Click "+ Add New Task" to create a task with a title, description, status, and priority.
- **Edit Tasks** — Click any task card to open an edit modal. Update the title, description, status, or priority and save.
- **Delete Tasks** — Delete a task from the edit modal. A confirmation prompt prevents accidental deletions.
- **Priority System** — Tasks have High, Medium, or Low priority. The badge is visible on each card, and tasks are automatically sorted High → Medium → Low within each column.
- **Dark / Light Mode** — Toggle between dark and light mode using the switch in the sidebar or mobile menu. Your preference is saved.
- **Sidebar Toggle** — Hide or show the sidebar on desktop using the Hide Sidebar / Show Sidebar buttons.
- **Mobile Menu** — On mobile, tap the logo or chevron in the header to open the slide-down menu with board links and the theme toggle.
- **Fully Responsive** — Works on desktop, tablet, and mobile screen sizes.

---

## How to Use

1. Open the app — tasks load automatically from the API (or localStorage if previously loaded).
2. Click **+ Add New Task** to add a new task and choose its priority.
3. Click any task card to edit or delete it.
4. Use the theme toggle (☀️ / 🌙) to switch between light and dark mode.
5. On desktop, click **Hide Sidebar** to collapse the sidebar, and the purple button at the bottom-left to show it again.
6. On mobile, tap the logo at the top to open the menu.

---

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript (ES Modules)
- localStorage for persistence
- Netlify for deployment
