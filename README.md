# Project Template

## Description

This project is a mid-course web development project using **JavaScript** and
**Sass**.  
It provides a clean and scalable structure for building maintainable web
applications for selling products.

The demo project is a **suitcase shop**, where users can:

- Browse products and read descriptions or reviews
- Add or remove items from the cart
- Contact the shop team
- Learn more about the store

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

All other tools (Sass, lite-server, concurrently) are installed automatically
via npm.

---

## Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd project-template
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm start
   ```

   This command will:

   * Automatically compile your Sass files to CSS
   * Watch for changes in your Sass files
   * Start a local development server using **lite-server**

4. **Open the app:**
   Once the server starts, it will automatically open your project in the browser.
   If it doesn’t, go to [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

| Command              | Description                                                             |
| -------------------- | ----------------------------------------------------------------------- |
| `npm run sass`       | Compiles Sass files once (`src/scss/main.scss` → `src/scss/style.css`). |
| `npm run sass:watch` | Watches Sass files and recompiles automatically on changes.             |
| `npm run serve`      | Starts the local development server using **lite-server**.              |
| `npm start`          | Runs both `sass:watch` and `serve` concurrently.                        |

---

## Folder Structure

```
project-template/
├── node_modules/          # Installed dependencies
├── src/
│   ├── assets/            # Fonts, images, and data files
│   ├── components/        # Reusable HTML components (header, footer, cards, etc.)
│   ├── js/                # JavaScript source files
│   ├── pages/             # HTML pages of the application
│   ├── scss/              # Sass source files (abstracts, base, layouts, components, pages)
│   └── index.html         # Main entry point
├── .gitignore             # Files ignored by Git
├── bs-config.json         # Lite-server configuration
├── compile-catalog.bat    # Batch script for catalog compilation
├── compile-scss.bat       # Batch script for Sass compilation
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation

```

---

## Notes

* All dependencies are managed through **npm**, no global installations required.
* The project uses **lite-server** for live reloading during development.
* To build CSS manually, run `npm run sass`.
* To automatically recompile Sass while developing, use `npm run sass:watch`.

```
````
