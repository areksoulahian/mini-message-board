# Mini Message Board

A full-stack CRUD message board built with Node.js, Express, and EJS.

## Features

- Create, read, update, and delete messages
- Dark-themed responsive UI with Bootstrap 5
- Messages stored as JSON, no database required
- Messages displayed newest-first

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Templating:** EJS
- **Styling:** Bootstrap 5 (dark mode) + Font Awesome 4
- **Storage:** JSON file (`messages.json`)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start with file watching and `.env` |
| `npm start` | Start for production |

## Project Structure

```
├── app.js                  # Express app setup
├── routes/index.js         # All route handlers
├── views/
│   ├── index.ejs           # Homepage (message list)
│   ├── new.ejs             # New message form
│   ├── edit.ejs            # Edit message form
│   ├── about.ejs           # About page
│   ├── error.ejs           # Error page
│   └── partials/
│       ├── header.ejs      # Meta tags + CDN links
│       ├── navbar.ejs      # Top navigation
│       └── footer.ejs      # Footer
├── public/
│   └── stylesheets/style.css
└── messages.json
```

## Live Demo

[https://arswebdev.com/mini-message-board/](https://arswebdev.com/mini-message-board/)
