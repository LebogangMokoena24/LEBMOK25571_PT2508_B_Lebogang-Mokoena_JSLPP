LEBMOK25571_PT2508_B_Lebogang-Mokoena_JSLPP

# Kanban Task Management App

**Live App:**  
**Presentation:**  

---

## Overview

This is a Kanban Task Management App where users can create, edit, delete, and organise tasks across three columns: **To Do, Doing, and Done**.

The app loads initial tasks from a remote API and stores them in local storage so data is saved even after refreshing the page.

---

## Features

### Task Management
- Add new tasks with a title, description, status, and priority
- Edit existing tasks by clicking on a task card
- Delete tasks with a confirmation prompt

### Data Handling
- Fetches initial tasks from a remote API on first load
- Stores tasks in **localStorage** for persistence after refresh

### Task Organisation
- Tasks are displayed in three columns (To Do, Doing, Done)
- Tasks are automatically sorted by priority (High → Medium → Low)

### Sidebar (Desktop)
- Sidebar can be hidden or shown using the toggle button

### Mobile Menu
- On mobile, tap the logo or chevron to open and close the menu
- The menu includes board navigation and theme toggle

### Dark / Light Mode
- Users can switch between dark and light mode
- Theme preference is saved in localStorage

### Responsive Design
- Fully responsive and works on desktop, tablet, and mobile devices

---

## How to Use

1. Open the app — tasks load automatically from the API or localStorage
2. Click **+ Add New Task** to create a task
3. Click a task card to edit or delete it
4. Use the sidebar toggle to hide/show the sidebar on desktop
5. On mobile, open the menu using the logo or arrow
6. Switch between dark and light mode using the toggle switch

---

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES Modules)
- LocalStorage (data persistence)
- REST API (initial data fetching)
- Netlify (deployment)

---
