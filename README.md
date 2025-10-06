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

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```

   ```bash
   cd project-template
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Compile Sass:**
- To check Sass version, run:
   ```bash
   sass --version
   ```
- To compile Sass files to CSS, run:
   ```bash
   npm run sass
   ```

- For automatic compilation on file changes, use:
   ```bash
   sass -w src/scss/main.scss:src/scss/style.css
   ```

4. **Start the project:**
   Use a live server of your IDE.


## Available Scripts

| Command              | Description                                                             |
| -------------------- | ----------------------------------------------------------------------- |
| `npm run sass`       | Compiles Sass files once (`src/scss/main.scss` → `src/scss/style.css`). |
| `npm run sass:watch` | Watches Sass files and recompiles automatically on changes.             |

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
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation

```
## 🧹 Code Quality & Linters

This project uses **ESLint** and **Stylelint** to maintain clean and consistent code style for both JavaScript and Sass.

### ⚙️ Configuration
The linters are configured in the `package.json` file and can be run using npm scripts.

### Available Lint Commands

| Command | Description |
| -------- | ------------ |
| `npm run lint` | Runs both JavaScript and SCSS linters. |
| `npm run lint:js` | Checks JavaScript files in `src/js/` using **ESLint**. |
| `npm run lint:scss` | Checks SCSS files in `src/scss/` using **Stylelint**. |

### Dependencies Used
- **eslint** — for JavaScript code quality  
- **@eslint/js** — standard ESLint configuration  
- **globals** — defines common global variables  
- **stylelint** — for SCSS style checking  
- **stylelint-config-standard** — standard stylelint configuration  
- **stylelint-config-standard-scss** — SCSS-specific linting rules  

### Default Lint Targets
- `src/js/**/*.js`
- `src/scss/**/*.scss`

---

## Notes

* All dependencies are managed through **npm**, no global installations required.
* To build CSS manually, run `npm run sass`.
* To automatically recompile Sass while developing, use `npm run sass:watch`.
* According to ES6, to launch the project with js modules, don`t open index.js from the directory, use server method.

```
````
