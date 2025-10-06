// Catalog functionality
import { addToCart } from './cart.js';

let catalogInitialized = false;
let filtersInitialized = false;
let searchInitialized = false;
let allProducts = [];

// Load and populate catalog products from data.json
export async function initCatalogProducts() {
    if (catalogInitialized) {
        return;
    }
    
    const catalogProductsContainer = document.querySelector('.catalog-products');
    
    if (!catalogProductsContainer) {
        console.warn('Catalog products container not found');
        return;
    }
    
    try {
        // Determine asset path
        const currentPath = window.location.pathname;
        const isInPagesDir = currentPath.includes('/pages/');
        
        // Load products from data.json
        const response = await fetch(isInPagesDir ? '../assets/data.json' : 'assets/data.json');
        const data = await response.json();
        allProducts = data.data || [];
        
        // Clear existing products
        catalogProductsContainer.innerHTML = '';
        
        // Generate product cards
        allProducts.forEach(product => {
            const productCard = createProductCard(product, isInPagesDir);
            catalogProductsContainer.appendChild(productCard);
        });
        
        // Re-initialize pagination after products are loaded
        setTimeout(() => {
            initCatalogPagination();
        }, 100);
        
        // Initialize search functionality after products are loaded
        setTimeout(() => {
            initSearchFunctionality();
        }, 200);
        
        catalogInitialized = true;
        
    } catch (error) {
        console.error('Error loading catalog products:', error);
    }
}

// Create product card element
function createProductCard(product, isInPagesDir) {
    const productDiv = document.createElement('div');
    productDiv.className = 'catalog-product';
    productDiv.dataset.productId = product.id; // Store product ID for future use
    
    const assetPath = isInPagesDir ? '../assets/' : 'assets/';
    
    productDiv.innerHTML = `
        <img src="${assetPath}${product.imageUrl}" alt="${product.name}" style="cursor: pointer;">
        <h4 class="product-name" style="cursor: pointer;">${product.name}</h4>
        <p>$${product.price}</p>
        <button class="btn add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
    `;
    
    // Add click event listener for product image (navigate to details)
    const productImage = productDiv.querySelector('img');
    productImage.addEventListener('click', () => {
        navigateToProductDetails(product);
    });
    
    // Add click event listener for product name (navigate to details)
    const productName = productDiv.querySelector('.product-name');
    productName.addEventListener('click', () => {
        navigateToProductDetails(product);
    });
    
    // Add click event listener for Add to Cart button
    const addToCartBtn = productDiv.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent event bubbling
        addToCart(product, 1, addToCartBtn);
    });
    
    return productDiv;
}

// Navigate to product details page
function navigateToProductDetails(product) {
    const currentPath = window.location.pathname;
    const isInPagesDir = currentPath.includes('/pages/');
    const productDetailsPath = isInPagesDir ? `product-details-template.html?id=${product.id}` : `pages/product-details-template.html?id=${product.id}`;
    
    // Navigate to product details page
    window.location.href = productDetailsPath;
}


// Catalog pagination functionality
function initCatalogPagination() {
    
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const paginationNumbers = document.querySelectorAll('.pagination-number');
    const catalogProducts = document.querySelectorAll('.catalog-product');
    
    if (!prevBtn || !nextBtn || paginationNumbers.length === 0) {
        return;
    }
    
    if (catalogProducts.length === 0) {
        return;
    }
    
    let currentPage = 1;
    const totalProducts = catalogProducts.length;
    const productsPerPage = 12; // Always 12 products per page
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    
    // Function to show products for a specific page
    function showPage(page) {
        const startIndex = (page - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        
        catalogProducts.forEach((product, index) => {
            if (index >= startIndex && index < endIndex) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
        
        currentPage = page;
        updatePaginationUI();
    }
    
    // Function to update pagination UI
    function updatePaginationUI() {
        // Update prev/next buttons
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
        
        // Update pagination numbers
        paginationNumbers.forEach((num, index) => {
            const pageNum = index + 1;
            if (pageNum === currentPage) {
                num.classList.add('active');
            } else {
                num.classList.remove('active');
            }
            
            // Hide numbers beyond total pages
            if (pageNum > totalPages) {
                num.style.display = 'none';
            } else {
                num.style.display = 'block';
            }
        });
        
        // Update results text
        const resultsText = document.querySelector('.catalog-header p');
        if (resultsText) {
            const startResult = (currentPage - 1) * productsPerPage + 1;
            const endResult = Math.min(currentPage * productsPerPage, totalProducts);
            resultsText.textContent = `Showing ${startResult}-${endResult} of ${totalProducts} results`;
        }
    }
    
    // Event listeners
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            showPage(currentPage - 1);
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            showPage(currentPage + 1);
        }
    });
    
    // Add click event listeners to pagination numbers
    paginationNumbers.forEach((num, index) => {
        num.addEventListener('click', () => {
            const pageNum = index + 1;
            if (pageNum <= totalPages) {
                showPage(pageNum);
            }
        });
    });
    
    // Show first page initially
    showPage(1);
    updatePaginationUI();
}

// Catalog filters functionality
export function initCatalogFilters() {
    if (filtersInitialized) {
        return;
    }
    
    const filtersBtn = document.querySelector('.catalog-filters .btn');
    const filtersContainer = document.querySelector('.catalog-filters-container');
    const hideFiltersBtn = document.querySelector('.filter-controls .btn:last-child');
    const clearFiltersBtn = document.querySelector('.filter-controls .btn:first-child');
    
    
    if (!filtersBtn || !filtersContainer) {
        return;
    }
    
    // Toggle filters visibility
    filtersBtn.addEventListener('click', () => {
        filtersContainer.classList.toggle('hidden');
    });
    
    // Hide filters
    if (hideFiltersBtn) {
        hideFiltersBtn.addEventListener('click', () => {
            filtersContainer.classList.add('hidden');
        });
    }
    
    // Clear all filters
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            // Reset all filter selects
            const filterSelects = filtersContainer.querySelectorAll('select');
            filterSelects.forEach(select => {
                select.value = 'all';
            });
            
            // Reset checkboxes
            const checkboxes = filtersContainer.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            
            // Reset radio buttons
            const radioButtons = filtersContainer.querySelectorAll('input[type="radio"]');
            radioButtons.forEach(radio => {
                radio.checked = false;
            });
            
            // Reset sort dropdown
            const sortSelect = document.getElementById('sort');
            if (sortSelect) {
                sortSelect.value = 'default';
            }
            
            // Reset price range
            const priceInputs = filtersContainer.querySelectorAll('input[type="range"]');
            priceInputs.forEach(input => {
                input.value = input.min;
            });
            
            // Show all products
            updateFilteredProducts(allProducts);
        });
    }
    
    // Filter event listeners
    const filterSelects = filtersContainer.querySelectorAll('select');
    const filterCheckboxes = filtersContainer.querySelectorAll('input[type="checkbox"]');
    const filterRadios = filtersContainer.querySelectorAll('input[type="radio"]');
    const sortSelect = document.getElementById('sort');
    
    filterSelects.forEach(select => {
        select.addEventListener('change', applyFilters);
    });
    
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    filterRadios.forEach(radio => {
        radio.addEventListener('change', applyFilters);
    });
    
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            applyFilters();
        });
    } else {
        console.warn('📦 Sort select element not found!');
    }
    
    filtersInitialized = true;
    
    // Function to apply all filters
    function applyFilters() {
        // Get all filter values
        const categorySelect = document.getElementById('category');
        const colorSelect = document.getElementById('color');
        const sizeSelect = document.getElementById('size');
        const salesRadio = document.getElementById('sales');
        const sortValue = sortSelect ? sortSelect.value : 'default';
        
        // Filter products
        let filteredProducts = allProducts.filter(product => {
            // Category filter
            if (categorySelect && categorySelect.value !== 'all' && categorySelect.value !== product.category) {
                return false;
            }
            
            // Color filter
            if (colorSelect && colorSelect.value !== 'all' && colorSelect.value !== product.color) {
                return false;
            }
            
            // Size filter
            if (sizeSelect && sizeSelect.value !== 'all' && sizeSelect.value !== product.size) {
                return false;
            }
            
            // Sales filter
            if (salesRadio && salesRadio.checked && !product.salesStatus) {
                return false;
            }
            
            return true;
        });
        
        // Sort the filtered products
        const sortedProducts = sortProducts(filteredProducts, sortValue);
        
        // Update displayed products
        updateFilteredProducts(sortedProducts);
    }
    
    // Function to update displayed products
    function updateFilteredProducts(filteredProducts) {
        const catalogProductsContainer = document.querySelector('.catalog-products');
        
        if (!catalogProductsContainer) {
            console.warn('Catalog products container not found');
            return;
        }
        
        // Clear existing products
        catalogProductsContainer.innerHTML = '';
        
        // Generate filtered product cards
        const currentPath = window.location.pathname;
        const isInPagesDir = currentPath.includes('/pages/');
        
        filteredProducts.forEach(product => {
            const productCard = createProductCard(product, isInPagesDir);
            catalogProductsContainer.appendChild(productCard);
        });
        
        // Re-initialize pagination with filtered products
        setTimeout(() => {
            initCatalogPagination();
        }, 100);
    }
    
    // Function to sort products based on selected criteria
    function sortProducts(products, sortValue) {
        if (!products || products.length === 0) {
            return products;
        }
        
        switch (sortValue) {
            case 'price-asc':
                return [...products].sort((a, b) => a.price - b.price);
            case 'price-desc':
                return [...products].sort((a, b) => b.price - a.price);
            case 'popularity':
                return [...products].sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
            case 'rating-desc':
                return [...products].sort((a, b) => (b.rating || 0) - (a.rating || 0));
            default:
                return products; // Default order
        }
    }
}

// Search functionality
function initSearchFunctionality() {
    if (searchInitialized) {
        return;
    }
    
    const searchInputs = document.querySelectorAll('#main-search-input, #aside-search-input');
    const searchDropdowns = document.querySelectorAll('#main-search-dropdown, #aside-search-dropdown');
    
    if (searchInputs.length === 0) {
        return;
    }
    
    searchInputs.forEach((searchInput, index) => {
        const searchDropdown = searchDropdowns[index];
        
        if (!searchDropdown) {
            console.warn(`Search dropdown not found for input ${index}`);
            return;
        }
        
        // Handle search input
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            
            if (query.length === 0) {
                searchDropdown.style.display = 'none';
                return;
            }
            
            // Filter products based on search query
            const filteredProducts = allProducts.filter(product => 
                product.name.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query) ||
                product.color.toLowerCase().includes(query) ||
                product.id.toLowerCase().includes(query)
            );
            
            // Display search results
            displaySearchResults(filteredProducts, searchDropdown, query);
        });
        
        // Hide dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
                searchDropdown.style.display = 'none';
            }
        });
        
        // Show dropdown when focusing on input
        searchInput.addEventListener('focus', () => {
            if (searchInput.value.trim().length > 0) {
                searchDropdown.style.display = 'block';
            }
        });
    });
    
    // Function to display search results
    function displaySearchResults(products, dropdown, query) {
        const resultsContainer = dropdown.querySelector('.search-results');
        
        if (!resultsContainer) {
            console.warn('Search results container not found');
            return;
        }
        
        if (products.length === 0) {
            resultsContainer.innerHTML = `
                <div class="search-result-item">
                    <p>No products found for "${query}"</p>
                </div>
            `;
        } else {
            const currentPath = window.location.pathname;
            const isInPagesDir = currentPath.includes('/pages/');
            const assetPath = isInPagesDir ? '../assets/' : 'assets/';
            
            resultsContainer.innerHTML = products.slice(0, 5).map(product => `
                <div class="search-result-item">
                    <a href="${isInPagesDir ? 'product-details-template.html' : 'pages/product-details-template.html'}?id=${product.id}" class="search-result-link">
                        <img src="${assetPath}${product.imageUrl}" alt="${product.name}" class="search-result-image">
                        <div class="search-result-info">
                            <h4>${product.name}</h4>
                            <p>$${product.price}</p>
                        </div>
                    </a>
                </div>
            `).join('');
        }
        
        dropdown.style.display = 'block';
    }
    
    searchInitialized = true;
}

// Initialize catalog navigation buttons functionality
export function initCatalogNavigationButtons() {
    
    // Find all buttons that should navigate to catalog
    const heroButton = document.querySelector('.hero-content .btn');
    const aboutButton = document.querySelector('.arrivals-content .btn');
    
    // Function to handle catalog navigation
    function navigateToCatalog(e) {
        e.preventDefault();
        
        // Navigate to catalog page
        const currentPath = window.location.pathname;
        const isInPagesDir = currentPath.includes('/pages/');
        const catalogPath = isInPagesDir ? 'catalog.html' : 'pages/catalog.html';
        
        window.location.href = catalogPath;
    }
    
    // Add event listeners to found buttons
    if (heroButton) {
        heroButton.addEventListener('click', navigateToCatalog);
    }
    
    if (aboutButton) {
        aboutButton.addEventListener('click', navigateToCatalog);
    }
    
    if (!heroButton && !aboutButton) {
        console.log('No catalog navigation buttons found');
    }
    
}

// Function to reset catalog initialization (useful for dynamic content)
export function resetCatalog() {
    catalogInitialized = false;
    filtersInitialized = false;
    searchInitialized = false;
    console.log('📦 Catalog reset - can be reinitialized');
}
