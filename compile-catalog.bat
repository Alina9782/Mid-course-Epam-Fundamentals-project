@echo off
echo Compiling SCSS for catalog page...
npx sass src/scss/main.scss src/scss/style.css
echo Catalog SCSS compilation complete!
echo.
echo The catalog page now includes:
echo - Main layout with 200px side padding, 100px top/bottom
echo - 70/30 split between catalog section and aside
echo - Catalog header with results count and filters/sort
echo - 3-column product grid (responsive: 2 cols at 1024px, 1 col at 768px)
echo - Pagination with previous/next buttons and page numbers
echo - Interactive pagination functionality
echo.
pause
