# Ledger — Expense Tracker

A simple, clean web app for tracking personal expenses, built with vanilla HTML, CSS, and JavaScript.

**[Live Demo](your-github-pages-link-here)**

## Features

- Add expenses with description, amount, date, and category
- Filter expenses by category
- Sort by date or amount (ascending/descending)
- Visual breakdown of spending by category (doughnut chart via Chart.js)
- Light/dark theme toggle
- Data persists locally in the browser (no backend required)
- Responsive layout for mobile and desktop

## Tech Stack

- HTML5 / CSS3 (custom properties for theming)
- Vanilla JavaScript (DOM manipulation, event handling)
- [Chart.js](https://www.chartjs.org/) for data visualization
- Browser `localStorage` for data persistence

## How It Works

Expenses are stored as objects with an id, description, amount, date, and category. All data is saved to `localStorage`, so it persists between sessions without needing a server or database. The category chart and totals recalculate live as you add, delete, filter, or sort expenses.

## Running Locally

Clone the repo and open `index.html` in your browser — no build step or dependencies to install.

\`\`\`bash
git clone https://github.com/yourusername/ledger-expense-tracker.git
cd ledger-expense-tracker
open index.html
\`\`\`

## Possible Future Improvements

- Export expenses to CSV
- Monthly/weekly spending trends over time
- Budget limits with alerts
- Multi-currency support
