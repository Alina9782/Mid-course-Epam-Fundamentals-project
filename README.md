# Project template
# Project template

## Description

This project is a mid-course project of web development using JavaScript and Sass. It provides a basic structure for building scalable and maintainable web applications for selling any products. This web-application provides the information about suitcases shop, where you have the basic functions as add or delete something from the cart, choose a product, read the description and reviews as well as contact with a team or read about the shop. 

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [sass](https://sass-lang.com/) (dart sass v1.86.3 or higher recommended)

## Setup

1. **Clone the repository:**
   git clone <repository-url>
   cd project-template-ua
   ```

2. **Install dependencies:**
   npm install
   ```

3. **Compile Sass:**
   - To compile Sass files to CSS, install:
     npm install sass
     ```
   - To check Sass version, run:
     sass --version
     ```
   - To compile Sass files to CSS, run:
     npm run sass

   - For automatic compilation on file changes, use:
     sass -w src/scss/main.scss:src/scss/style.css
     ```

4. **Start the project:**
   - If there is a development server, run:
     npm start
     ```
   - Otherwise, open `index.html` in your browser or use a live server of your IDE.

## Scripts

- `npm run sass` — Compiles Sass files once.
- `npm run sass:watch` — Watches Sass files and recompiles on changes.
- `npm start` — Starts the development server (if configured).

## Folder Structure

- `src/` — Source files (JavaScript, Sass, etc.)
- `dist/` — Compiled output (CSS, JS, etc.)

---
