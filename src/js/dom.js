// DOM manipulation functionality
let domInitialized = false;

// Set active navigation state based on current page
function setActiveNavigation(currentPath) {
    console.log('🌐 Setting active navigation for path:', currentPath);
    
    // Remove active class from all navigation items
    const allNavItems = document.querySelectorAll('.navItem');
    allNavItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Determine which navigation item should be active based on current path
    let activeNavItem = null;
    
    if (currentPath.includes('/index.html') || currentPath.endsWith('/') || currentPath.endsWith('/src/')) {
        // Home page
        activeNavItem = document.querySelector('.navItem a[href*="index.html"]')?.closest('.navItem');
    } else if (currentPath.includes('/catalog.html')) {
        // Catalog page
        activeNavItem = document.querySelector('.navItem a[href*="catalog.html"]')?.closest('.navItem');
    } else if (currentPath.includes('/about.html')) {
        // About page
        activeNavItem = document.querySelector('.navItem a[href*="about.html"]')?.closest('.navItem');
    } else if (currentPath.includes('/contact.html')) {
        // Contact page
        activeNavItem = document.querySelector('.navItem a[href*="contact.html"]')?.closest('.navItem');
    } else if (currentPath.includes('/product-details-template.html')) {
        // Product details page - could be considered part of catalog
        activeNavItem = document.querySelector('.navItem a[href*="catalog.html"]')?.closest('.navItem');
    } else if (currentPath.includes('/cart.html')) {
        // Cart page - no specific nav item, could be considered part of catalog or stay unselected
        // For now, we'll leave it unselected
        console.log('🌐 Cart page - no active navigation item set');
    }
    
    // Set the active class on the determined navigation item
    if (activeNavItem) {
        activeNavItem.classList.add('active');
        console.log('🌐 Active navigation set to:', activeNavItem.querySelector('a').textContent.trim());
    } else {
        console.log('🌐 No matching navigation item found for current path');
    }
}

// Fetch and inject partial header.html and footer.html
export async function initHeaderAndFooter() {
    if (domInitialized) {
        console.log('🌐 Header and footer already initialized, skipping...');
        return;
    }
    
    console.log('🌐 Initializing header and footer...');
    
    const header = document.getElementById('header');
    const footer = document.getElementById('footer');
    
    if (!header || !footer) {
        console.warn('🌐 Header or footer elements not found');
        return;
    }
    
    // Determine the correct path based on current page location
    const currentPath = window.location.pathname;
    const isInPagesDir = currentPath.includes('/pages/');
    const componentsPath = isInPagesDir ? '../components/' : 'components/';
    
    console.log(`🌐 Current path: ${currentPath}, Components path: ${componentsPath}`);
    
    try {
        // Load header
        const headerResponse = await fetch(`${componentsPath}header.html`);
        if (!headerResponse.ok) {
            throw new Error(`Failed to load header: ${headerResponse.status}`);
        }
        let headerData = await headerResponse.text();
        
        // Fix paths in header content based on current page location
        if (isInPagesDir) {
            headerData = headerData.replace(/\.\.\/assets\//g, '../assets/')
                                 .replace(/\.\.\/pages\//g, '../pages/')
                                 .replace(/\.\.\/index\.html/g, '../index.html');
        } else {
            headerData = headerData.replace(/\.\.\/assets\//g, 'assets/')
                                 .replace(/\.\.\/pages\//g, 'pages/')
                                 .replace(/\.\.\/index\.html/g, 'index.html');
        }
        
        header.innerHTML = headerData;
        console.log('🌐 Header loaded successfully');
        
        // Set active navigation state after header is loaded
        setActiveNavigation(currentPath);
        
        // Load footer
        const footerResponse = await fetch(`${componentsPath}footer.html`);
        if (!footerResponse.ok) {
            throw new Error(`Failed to load footer: ${footerResponse.status}`);
        }
        let footerData = await footerResponse.text();
        
        // Fix paths in footer content based on current page location
        if (isInPagesDir) {
            footerData = footerData.replace(/\.\.\/assets\//g, '../assets/');
        } else {
            footerData = footerData.replace(/\.\.\/assets\//g, 'assets/');
        }
        
        footer.innerHTML = footerData;
        console.log('🌐 Footer loaded successfully');
        
        domInitialized = true;
        console.log('🌐 Header and footer initialized successfully');
        
    } catch (error) {
        console.error('🌐 Error loading header/footer:', error);
    }
}

// Fetch and inject partial product-card.html
export async function initProductCard() {
    console.log('🌐 Initializing product card...');
    
    const productCard = document.getElementById('product-card');
    
    if (!productCard) {
        console.warn('🌐 Product card element not found');
        return;
    }
    
    // Determine the correct path based on current page location
    const currentPath = window.location.pathname;
    const isInPagesDir = currentPath.includes('/pages/');
    const componentsPath = isInPagesDir ? '../components/' : 'components/';
    
    console.log(`🌐 Current path: ${currentPath}, Components path: ${componentsPath}`);
    
    try {
        // Load product card
        const productCardResponse = await fetch(`${componentsPath}product-card.html`);
        if (!productCardResponse.ok) {
            throw new Error(`Failed to load product card: ${productCardResponse.status}`);
        }
        let productCardData = await productCardResponse.text();
        
        // Fix paths in product card content based on current page location
        if (isInPagesDir) {
            productCardData = productCardData.replace(/\.\.\/assets\//g, '../assets/');
        } else {
            productCardData = productCardData.replace(/\.\.\/assets\//g, 'assets/');
        }
        
        productCard.innerHTML = productCardData;
        console.log('🌐 Product card loaded successfully');
        
        // Note: Re-initialization of product-specific functions will be handled by main.js
        
    } catch (error) {
        console.error('🌐 Error loading product card:', error);
    }
}

// Function to reset DOM initialization (useful for dynamic content)
export function resetDOM() {
    domInitialized = false;
    console.log('🌐 DOM reset - can be reinitialized');
}
