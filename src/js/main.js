import { initAuthModals, resetAuthModals } from './modals.js';
import { addToCart, updateCartCounter, initCartCounter, initCartPage, resetCart } from './cart.js';
import { initCatalogProducts, initCatalogFilters, initCatalogNavigationButtons, resetCatalog } from './catalog.js';
import { initHeaderAndFooter, initProductCard } from './dom.js';

// Global variable to store current product data for product details page
let currentProductData = null;

// Navigate to product details page
function navigateToProductDetails(productId, isInPagesDir) {
    const productDetailsPath = isInPagesDir ? `product-details-template.html?id=${productId}` : `pages/product-details-template.html?id=${productId}`;
    
    // Navigate to product details page
    window.location.href = productDetailsPath;
}

// Wait for DOM to be ready
function ready(fn) {
    if (document.readyState !== 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

// Initialize hamburger menu
function initHamburgerMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileNav = document.getElementById('mobile-nav');
    
    if (!hamburgerBtn || !mobileNav) {
        console.error('Required elements not found!');
        return;
    }
    
    const hamburgerIcon = hamburgerBtn.querySelector('img.hamburger-icon');
    
    if (!hamburgerIcon) {
        console.error('Hamburger icon not found!');
        return;
    }
    
    // Determine icon path based on current page
    const isSubPage = window.location.pathname.includes('/pages/');
    const iconPath = isSubPage ? '../assets/img/icons/' : 'assets/img/icons/';
    
    // Remove any existing event listeners
    const newBtn = hamburgerBtn.cloneNode(true);
    hamburgerBtn.parentNode.replaceChild(newBtn, hamburgerBtn);
    
    // Add click event listener
    newBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Toggle menu
        mobileNav.classList.toggle('open');
        const isOpen = mobileNav.classList.contains('open');
        
        // Change icon
        const icon = newBtn.querySelector('img.hamburger-icon');
        if (isOpen) {
            icon.src = iconPath + 'hamburger-icon-pink.svg';
        } else {
            icon.src = iconPath + 'hamburger-icon-black.svg';
        }
    });
    
    // Close menu when clicking on links
    const menuLinks = mobileNav.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('open');
            const icon = newBtn.querySelector('img.hamburger-icon');
            icon.src = iconPath + 'hamburger-icon-black.svg';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!newBtn.contains(e.target) && !mobileNav.contains(e.target)) {
            mobileNav.classList.remove('open');
            const icon = newBtn.querySelector('img.hamburger-icon');
            icon.src = iconPath + 'hamburger-icon-black.svg';
        }
    });
}

// Product functionality
function initProductFeatures() {
    // Quantity controls
    const quantityInput = document.getElementById('quantity');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const minusBtn = document.querySelector('.quantity-btn.minus');
    
    if (quantityInput && plusBtn && minusBtn) {
        plusBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value) || 1;
            quantityInput.value = currentValue + 1;
        });
        
        minusBtn.addEventListener('click', function() {
            const currentValue = parseInt(quantityInput.value) || 1;
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
        
        quantityInput.addEventListener('input', function() {
            const value = parseInt(this.value) || 1;
            if (value < 1) {
                this.value = 1;
            }
        });
    }
    
    // Thumbnail switching
    const mainImage = document.querySelector('.product-images > img');
    const thumbnails = document.querySelectorAll('.product-images-thumbnails img');
    
    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach((thumb) => {
            thumb.addEventListener('click', function() {
                // Update main image
                mainImage.src = this.src;
                
                // Update active thumbnail
                thumbnails.forEach(t => t.style.borderColor = 'transparent');
                this.style.borderColor = '#E91E63'; // brand color  
            });
        });
        
        // Set first thumbnail as active by default
        if (thumbnails[0]) {
            thumbnails[0].style.borderColor = '#E91E63';
        }
    }
    
    // Add to Cart button functionality for product details page
    const addToCartBtn = document.querySelector('.product-add-to-cart-item .btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check if we have current product data loaded
            if (!currentProductData) {
                console.error('Product data not loaded yet');
                return;
            }
            
            // Get quantity
            const quantityInput = document.getElementById('quantity');
            const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
            
            // Use the loaded product data with correct image path
            const product = {
                id: currentProductData.id, // Use actual product ID for proper merging
                name: currentProductData.name,
                price: currentProductData.price,
                imageUrl: currentProductData.imageUrl, // Use the correct relative path
                quantity: quantity
            };
            
            // Add to cart with button feedback
            addToCart(product, quantity, addToCartBtn);            
        });
    }
    
    // Submit button functionality for product review form
    const submitBtn = document.querySelector('.product-reviews-form .btn');
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get form elements
            const reviewTextarea = document.querySelector('#text');
            const nameInput = document.querySelector('.form-row input[type="text"]');
            const emailInput = document.querySelector('.form-row input[type="email"]');
            const saveInfoCheckbox = document.querySelector('#save-info');
            
            // Check if required fields are filled
            if (!reviewTextarea.value.trim()) {
                alert('Please enter your review');
                reviewTextarea.focus();
                return;
            }
            
            if (!nameInput.value.trim()) {
                alert('Please enter your name');
                nameInput.focus();
                return;
            }
            
            if (!emailInput.value.trim() || !emailInput.checkValidity()) {
                alert('Please enter a valid email address');
                emailInput.focus();
                return;
            }
            
            // Show success feedback
            showSubmitFeedback(submitBtn);
            
            // Clear form after successful submission
            setTimeout(() => {
                reviewTextarea.value = '';
                nameInput.value = '';
                emailInput.value = '';
                saveInfoCheckbox.checked = false;
            }, 2000);
        });
    }
}

// Product details tabs functionality
function initProductTabs() {
    const tabItems = document.querySelectorAll('.tab-item');
    const contentItems = document.querySelectorAll('.product-details-content-item');
    const tabIndicator = document.querySelector('.tab-indicator');
    
    if (tabItems.length === 0 || contentItems.length === 0) {
        return;
    }
    
    // Function to update tab indicator position
    function updateTabIndicator(activeTab) {
        if (tabIndicator && activeTab) {
            const tabRect = activeTab.getBoundingClientRect();
            const containerRect = activeTab.closest('ul').getBoundingClientRect();
            const leftOffset = tabRect.left - containerRect.left;
            const width = tabRect.width;
            
            tabIndicator.style.left = leftOffset + 'px';
            tabIndicator.style.width = width + 'px';
        }
    }
    
    // Function to show content
    function showContent(targetId) {
        contentItems.forEach(item => {
            item.classList.remove('active');
            if (item.id === targetId) {
                item.classList.add('active');
            }
        });
    }
    
    // Add click event listeners to tabs
    tabItems.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs
            tabItems.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding content
            showContent(targetTab);
            
            // Update tab indicator
            updateTabIndicator(this);
        });
    });
    
    // Initialize with first tab active
    if (tabItems.length > 0) {
        updateTabIndicator(tabItems[0]);
    }
}

// Rating stars functionality
function initRatingStars() {
    const ratingStars = document.querySelectorAll('.rating-star');
    
    if (ratingStars.length === 0) {
        return;
    }
    
    ratingStars.forEach((star) => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            
            // Update all stars up to the clicked rating
            ratingStars.forEach((s, i) => {
                if (i < rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
        
        // Hover effect
        star.addEventListener('mouseenter', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            
            ratingStars.forEach((s, i) => {
                if (i < rating) {
                    s.style.color = '#ffd700';
                } else {
                    s.style.color = '#ddd';
                }
            });
        });
    });
    
    // Reset on mouse leave
    const ratingContainer = document.querySelector('.rating-stars');
    if (ratingContainer) {
        ratingContainer.addEventListener('mouseleave', function() {
            ratingStars.forEach(star => {
                star.style.color = '';
                if (!star.classList.contains('active')) {
                    star.style.color = '#ddd';
                }
            });
        });
    }
}

// Replace placeholder text with styled elements
function initStyledPlaceholders() {
    const requiredInputs = document.querySelectorAll('input.required-field, textarea.required-field');
    
    if (requiredInputs.length === 0) {
        return;
    }
    
    requiredInputs.forEach(input => {
        const originalPlaceholder = input.getAttribute('placeholder');
        
        if (!originalPlaceholder) {
            return;
        }
        
        // Create a wrapper div
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.display = 'inline-block';
        wrapper.style.width = '100%';
        
        // Insert wrapper before input
        input.parentNode.insertBefore(wrapper, input);
        
        // Move input into wrapper
        wrapper.appendChild(input);
        
        // Create placeholder element
        const placeholderElement = document.createElement('div');
        placeholderElement.textContent = originalPlaceholder;
        placeholderElement.style.position = 'absolute';
        placeholderElement.style.left = '16px';
        placeholderElement.style.top = '50%';
        placeholderElement.style.transform = 'translateY(-50%)';
        placeholderElement.style.color = '#999';
        placeholderElement.style.fontSize = '16px';
        placeholderElement.style.fontFamily = 'inherit';
        placeholderElement.style.pointerEvents = 'none';
        placeholderElement.style.transition = 'opacity 0.2s ease';
        placeholderElement.style.zIndex = '1';
        
        // For textarea, adjust position
        if (input.tagName === 'TEXTAREA') {
            placeholderElement.style.top = '12px';
            placeholderElement.style.transform = 'none';
        }
        
        // Create asterisk element
        const asterisk = document.createElement('span');
        asterisk.textContent = ' *';
        asterisk.style.color = '#B92770'; // brand color
        asterisk.style.fontWeight = 'normal';
        
        // Add asterisk to placeholder
        placeholderElement.appendChild(asterisk);
        
        // Add placeholder to wrapper
        wrapper.appendChild(placeholderElement);
        
        // Remove original placeholder
        input.removeAttribute('placeholder');
        
        // Show/hide placeholder based on input content
        function updatePlaceholder() {
            if (input.value.trim() === '') {
                placeholderElement.style.opacity = '1';
            } else {
                placeholderElement.style.opacity = '0';
            }
        }
        
        // Initial state
        updatePlaceholder();
        
        // Add event listeners
        input.addEventListener('input', updatePlaceholder);
        input.addEventListener('focus', updatePlaceholder);
        input.addEventListener('blur', updatePlaceholder);
    });
}


// Contact Form functionality
function initContactForm() {
    const contactForm = document.querySelector('.contact-us-form-content form');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const successSendMessageModal = document.getElementById('successSendMessageModal');
    const successSendMessageOkBtn = document.getElementById('successSendMessageOkBtn');
    
    if (!contactForm || !sendMessageBtn || !successSendMessageModal || !successSendMessageOkBtn) {
        console.log('Contact form elements not found, skipping initialization');
        console.log('Missing elements:', {
            contactForm: !contactForm,
            sendMessageBtn: !sendMessageBtn,
            successSendMessageModal: !successSendMessageModal,
            successSendMessageOkBtn: !successSendMessageOkBtn
        });
        return;
    }
    
    // Function to close success modal
    function closeSuccessModal() {
        successSendMessageModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Function to open success modal
    function openSuccessModal() {
        successSendMessageModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Contact form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form inputs
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        // Check if all required fields are valid
        const isNameValid = nameInput.checkValidity();
        const isEmailValid = emailInput.checkValidity();
        const isSubjectValid = subjectInput.checkValidity();
        const isMessageValid = messageInput.checkValidity();
        
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            // Simulate successful message sending
            openSuccessModal();
            
            // Reset form
            contactForm.reset();
        } else {
            console.log('Form validation failed');
            // Focus on first invalid field
            if (!isNameValid) nameInput.focus();
            else if (!isEmailValid) emailInput.focus();
            else if (!isSubjectValid) subjectInput.focus();
            else if (!isMessageValid) messageInput.focus();
        }
    });
    
    // Success modal OK button handler
    successSendMessageOkBtn.addEventListener('click', function() {
        closeSuccessModal();
    });
    
    // Close modal when clicking overlay
    const modalOverlay = successSendMessageModal.querySelector('.auth-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeSuccessModal);
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && successSendMessageModal.classList.contains('active')) {
            closeSuccessModal();
        }
    });
    
    // Backup: Direct button click handler
    sendMessageBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Get form inputs
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        // Check if all required fields are valid
        const isNameValid = nameInput.checkValidity();
        const isEmailValid = emailInput.checkValidity();
        const isSubjectValid = subjectInput.checkValidity();
        const isMessageValid = messageInput.checkValidity();
        
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            openSuccessModal();
            contactForm.reset();
        } else {
            console.log('Form validation failed via button click');
            // Focus on first invalid field
            if (!isNameValid) nameInput.focus();
            else if (!isEmailValid) emailInput.focus();
            else if (!isSubjectValid) subjectInput.focus();
            else if (!isMessageValid) messageInput.focus();
        }
    });
}

// Set active navigation state based on current page


// Show success feedback on submit button
function showSubmitFeedback(button) {
    if (!button) return;
    
    const originalText = button.textContent;
    const originalBgColor = button.style.backgroundColor;
    
    // Update button appearance
    button.textContent = 'Review Submitted!';
    button.style.backgroundColor = '#4CAF50';
    button.style.color = 'white';
    button.disabled = true;
    
    // Reset after 2 seconds
    setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = originalBgColor;
        button.style.color = '';
        button.disabled = false;
    }, 2000);
}

// Load and populate luggage sets from data.json
async function initLuggageSets() {
    const topCategoriesContainer = document.querySelector('.top-categories ul');
    
    if (!topCategoriesContainer) {
        console.warn('Top categories container not found');
        return;
    }
    
    // Determine the correct path based on current page location
    const currentPath = window.location.pathname;
    const isInPagesDir = currentPath.includes('/pages/');
    const dataPath = isInPagesDir ? '../assets/data.json' : 'assets/data.json';
    
    try {
        // Load products data
        const response = await fetch(dataPath);
        if (!response.ok) {
            throw new Error(`Failed to load products data: ${response.status}`);
        }
        
        const data = await response.json();
        const allProducts = data.data;
        
        // Filter products by category "luggage sets"
        const luggageSets = allProducts.filter(product => product.category === 'luggage sets');
        
        // Clear existing items
        topCategoriesContainer.innerHTML = '';
        
        // Generate category items
        luggageSets.forEach(product => {
            const categoryItem = createCategoryItem(product, isInPagesDir);
            topCategoriesContainer.appendChild(categoryItem);
        });
    } catch (error) {
        console.error('Error loading luggage sets:', error);
    }
}

// Create individual category item element
function createCategoryItem(product, isInPagesDir) {
    const li = document.createElement('li');
    
    // Set correct asset path
    const assetPath = isInPagesDir ? '../assets/' : 'assets/';
    
    // Generate stars based on rating
    const stars = generateStars(product.rating);
    
    li.innerHTML = `
        <div class="category-item">
            <img src="${assetPath}${product.imageUrl}" alt="${product.name}" class="product-image" style="cursor: pointer;">
            <div class="category-info">
                <h4 class="product-name" style="cursor: pointer;">${product.name}</h4>
                <div class="product-stars">
                    ${stars}
                </div>
                <p>$${product.price}</p>
            </div>
        </div>
    `;
    
    // Add click event listeners for product name and image
    const productImage = li.querySelector('.product-image');
    const productName = li.querySelector('.product-name');
    
    if (productImage) {
        productImage.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            navigateToProductDetails(product.id, isInPagesDir);
        });
    }
    
    if (productName) {
        productName.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            navigateToProductDetails(product.id, isInPagesDir);
        });
    }
    
    return li;
}

// Generate star HTML based on rating
function generateStars(rating) {
    let starsHTML = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Add filled stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<span class="star filled">★</span>';
    }
    
    // Add half star if needed
    if (hasHalfStar) {
        starsHTML += '<span class="star half">★</span>';
    }
    
    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<span class="star">★</span>';
    }
    
    return starsHTML;
}

// Load and populate selected products from data.json
async function initSelectedProducts() {
    const selectedCardsContainer = document.querySelector('.selected-cards');
    
    if (!selectedCardsContainer) {
        console.warn('Selected cards container not found');
        return;
    }
    
    // Determine the correct path based on current page location
    const currentPath = window.location.pathname;
    const isInPagesDir = currentPath.includes('/pages/');
    const dataPath = isInPagesDir ? '../assets/data.json' : 'assets/data.json';
    
    try {
        // Load products data
        const response = await fetch(dataPath);
        if (!response.ok) {
            throw new Error(`Failed to load products data: ${response.status}`);
        }
        
        const data = await response.json();
        const allProducts = data.data;
        
        // Filter products that have "Selected Products" in their blocks
        const selectedProducts = allProducts.filter(product => 
            product.blocks && product.blocks.includes('Selected Products')
        );
        
        // Limit to maximum 4 products
        const limitedSelectedProducts = selectedProducts.slice(0, 4);
        
        // Clear existing items
        selectedCardsContainer.innerHTML = '';
        
        // Generate selected cards
        limitedSelectedProducts.forEach(product => {
            const selectedCard = createSelectedCard(product, isInPagesDir);
            selectedCardsContainer.appendChild(selectedCard);
        });
    } catch (error) {
        console.error('Error loading selected products:', error);
    }
}

// Create individual selected card element
function createSelectedCard(product, isInPagesDir) {
    const li = document.createElement('li');
    li.className = 'selected-card';
    
    // Add 'sale' class if salesStatus is true
    if (product.salesStatus) {
        li.classList.add('sale');
    }
    
    li.dataset.productId = product.id; // Store product ID for future use
    
    // Set correct asset path
    const assetPath = isInPagesDir ? '../assets/' : 'assets/';
    
    li.innerHTML = `
        <img src="${assetPath}${product.imageUrl}" alt="${product.name}" class="product-image" style="cursor: pointer;">
        <h4 class="product-name" style="cursor: pointer;">${product.name}</h4>
        <p>$${product.price}</p>
        <button class="btn add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
    `;
    
    // Add click event listener for Add to Cart button
    const addToCartBtn = li.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent event bubbling
        addToCart(product, 1, addToCartBtn);
    });
    
    // Add click event listeners for product name and image
    const productImage = li.querySelector('.product-image');
    const productName = li.querySelector('.product-name');
    
    productImage.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigateToProductDetails(product.id, isInPagesDir);
    });
    
    productName.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigateToProductDetails(product.id, isInPagesDir);
    });
    
    return li;
}

// Load and populate new arrivals from data.json
async function initNewArrivals() {
    const newArrivalsCardsContainer = document.querySelector('.new-arrivals-cards');
    
    if (!newArrivalsCardsContainer) {
        console.warn('New arrivals cards container not found');
        return;
    }
    
    // Determine the correct path based on current page location
    const currentPath = window.location.pathname;
    const isInPagesDir = currentPath.includes('/pages/');
    const dataPath = isInPagesDir ? '../assets/data.json' : 'assets/data.json';
    
    try {
        // Load products data
        const response = await fetch(dataPath);
        if (!response.ok) {
            throw new Error(`Failed to load products data: ${response.status}`);
        }
        
        const data = await response.json();
        const allProducts = data.data;
        
        // Filter products that have "New Products Arrival" in their blocks
        const newArrivalsProducts = allProducts.filter(product => 
            product.blocks && product.blocks.includes('New Products Arrival')
        );
        
        // Limit to maximum 4 products
        const limitedNewArrivals = newArrivalsProducts.slice(0, 4);
        
        // Clear existing items
        newArrivalsCardsContainer.innerHTML = '';
        
        // Generate new arrivals cards
        limitedNewArrivals.forEach(product => {
            const newArrivalsCard = createNewArrivalsCard(product, isInPagesDir);
            newArrivalsCardsContainer.appendChild(newArrivalsCard);
        });
    } catch (error) {
        console.error('Error loading new arrivals:', error);
    }
}

// Create individual new arrivals card element
function createNewArrivalsCard(product, isInPagesDir) {
    const li = document.createElement('li');
    li.className = 'new-arrivals-card';
    
    // Add 'sale' class if salesStatus is true
    if (product.salesStatus) {
        li.classList.add('sale');
    }
    
    li.dataset.productId = product.id; // Store product ID for future use
    
    // Set correct asset path
    const assetPath = isInPagesDir ? '../assets/' : 'assets/';
    
    li.innerHTML = `
        <img src="${assetPath}${product.imageUrl}" alt="${product.name}" class="product-image" style="cursor: pointer;">
        <h4 class="product-name" style="cursor: pointer;">${product.name}</h4>
        <p>$${product.price}</p>
        <button class="btn view-product-btn" data-product-id="${product.id}">View Product</button>
    `;
    
    // Add click event listener for View Product button
    const viewProductBtn = li.querySelector('.view-product-btn');
    viewProductBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent event bubbling
        navigateToProductDetails(product.id, isInPagesDir);
    });
    
    // Add click event listeners for product name and image
    const productImage = li.querySelector('.product-image');
    const productName = li.querySelector('.product-name');
    
    productImage.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigateToProductDetails(product.id, isInPagesDir);
    });
    
    productName.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigateToProductDetails(product.id, isInPagesDir);
    });
    
    return li;
}

// Load and populate "You May Also Like" products from data.json
async function initAlsoLikeProducts() {
    const alsoLikeCardsContainer = document.querySelector('.also-like-cards');
    
    if (!alsoLikeCardsContainer) {
        console.warn('Also like cards container not found');
        return;
    }
    
    // Determine the correct path based on current page location
    const currentPath = window.location.pathname;
    const isInPagesDir = currentPath.includes('/pages/');
    const dataPath = isInPagesDir ? '../assets/data.json' : 'assets/data.json';
    
    try {
        // Load products data
        const response = await fetch(dataPath);
        if (!response.ok) {
            throw new Error(`Failed to load products data: ${response.status}`);
        }
        
        const data = await response.json();
        const allProducts = data.data;
        
        // Filter products that have "You May Also Like" in their blocks
        const alsoLikeProducts = allProducts.filter(product => 
            product.blocks && product.blocks.includes('You May Also Like')
        );
        
        // Limit to maximum 4 products
        const limitedAlsoLikeProducts = alsoLikeProducts.slice(0, 4);
        
        // Clear existing items
        alsoLikeCardsContainer.innerHTML = '';
        
        // Generate also like cards
        limitedAlsoLikeProducts.forEach(product => {
            const alsoLikeCard = createAlsoLikeCard(product, isInPagesDir);
            alsoLikeCardsContainer.appendChild(alsoLikeCard);
        });
    } catch (error) {
        console.error('Error loading You May Also Like products:', error);
    }
}

// Create individual also like card element
function createAlsoLikeCard(product, isInPagesDir) {
    const li = document.createElement('li');
    li.className = 'also-like-card';
    
    // Add 'sale' class if salesStatus is true
    if (product.salesStatus) {
        li.classList.add('sale');
    }
    
    li.dataset.productId = product.id; // Store product ID for future use
    
    // Set correct asset path
    const assetPath = isInPagesDir ? '../assets/' : 'assets/';
    
    li.innerHTML = `
        <img src="${assetPath}${product.imageUrl}" alt="${product.name}" class="product-image" style="cursor: pointer;">
        <h4 class="product-name" style="cursor: pointer;">${product.name}</h4>
        <p>$${product.price}</p>
        <button class="btn add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
    `;
    
    // Add click event listener for Add to Cart button
    const addToCartBtn = li.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent event bubbling
        addToCart(product, 1, addToCartBtn);
    });
    
    // Add click event listeners for product name and image
    const productImage = li.querySelector('.product-image');
    const productName = li.querySelector('.product-name');
    
    productImage.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigateToProductDetails(product.id, isInPagesDir);
    });
    
    productName.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigateToProductDetails(product.id, isInPagesDir);
    });
    
    return li;
}


// Load specific product data for product details page
async function initProductDetails() {
    // Get product ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        console.warn('No product ID found in URL parameters');
        return;
    }
    
    // Determine the correct path based on current page location
    const currentPath = window.location.pathname;
    const isInPagesDir = currentPath.includes('/pages/');
    const dataPath = isInPagesDir ? '../assets/data.json' : 'assets/data.json';
    
    try {
        // Load products data
        const response = await fetch(dataPath);
        if (!response.ok) {
            throw new Error(`Failed to load products data: ${response.status}`);
        }
        
        const data = await response.json();
        const allProducts = data.data;
        
        // Find the specific product
        const product = allProducts.find(p => p.id === productId);
        
        if (!product) {
            console.error('Product not found with ID:', productId);
            return;
        }
        
        // Update product details page with specific product data
        updateProductDetailsPage(product, isInPagesDir);
        
        // Load also like products
        initAlsoLikeProducts();
        
    } catch (error) {
        console.error('Error loading product details:', error);
    }
}

// Update product details page with specific product data
function updateProductDetailsPage(product, isInPagesDir) {
    // Store current product data globally for addToCart function
    currentProductData = product;
    
    // Set correct asset path
    const assetPath = isInPagesDir ? '../assets/' : 'assets/';
    
    // Update product name in all description headers (both hidden and visible)
    const productDescriptionHeaders = document.querySelectorAll('.product-description-header h2');
    productDescriptionHeaders.forEach(header => {
        header.textContent = product.name;
    });
    
    // Update product images
    const mainImage = document.querySelector('.product-images > img');
    const thumbnails = document.querySelectorAll('.product-images-thumbnails img');
    
    if (mainImage) {
        mainImage.src = `${assetPath}${product.imageUrl}`;
        mainImage.alt = product.name;
    }
    
    // Update thumbnails (use same image for all thumbnails for simplicity)
    thumbnails.forEach(thumb => {
        thumb.src = `${assetPath}${product.imageUrl}`;
        thumb.alt = product.name;
    });
    
    // Update price in all description headers
    const priceElements = document.querySelectorAll('.product-description-header h3');
    priceElements.forEach(priceElement => {
        priceElement.textContent = `$${product.price}`;
    });
    
    // Update rating and reviews in all locations
    const reviewsCountElements = document.querySelectorAll('.reviews-count');
    reviewsCountElements.forEach(reviewsCount => {
        // Generate a random review count for demo purposes
        const reviewCount = Math.floor(Math.random() * 50) + 10;
        reviewsCount.textContent = `(${reviewCount} reviews)`;
    });
    
    // Update stars based on product rating in all locations
    const starContainers = document.querySelectorAll('.product-stars');
    starContainers.forEach(container => {
        const stars = container.querySelectorAll('.star');
        if (stars.length > 0) {
            const rating = Math.floor(product.rating);
            stars.forEach((star, index) => {
                if (index < rating) {
                    star.classList.add('filled');
                } else {
                    star.classList.remove('filled');
                }
            });
        }
    });
    
    // Update product description based on category
    const descriptionContent = document.querySelector('.product-description-content');
    if (descriptionContent) {
        let description = '';
        
        switch (product.category) {
            case 'suitcases':
                description = `
                    <p>Experience the perfect blend of style and functionality with our ${product.name}. 
                    Made with premium materials and designed for the modern traveler, this suitcase combines 
                    durability with elegant design to make every journey comfortable and stylish.</p>
                    <p>The ergonomic handle and smooth-rolling wheels ensure effortless mobility while the 
                    spacious interior with multiple compartments keeps your belongings organized and secure. 
                    Perfect for both business and leisure travel.</p>
                `;
                break;
            case 'kids\' luggage':
                description = `
                    <p>Make travel fun for your little ones with our ${product.name}. 
                    Designed specifically for children, this luggage features bright colors, 
                    fun patterns, and kid-friendly functionality.</p>
                    <p>Lightweight yet durable, it's perfect for family trips and helps teach 
                    kids responsibility for their belongings. The smooth wheels and comfortable 
                    handle make it easy for children to manage their own luggage.</p>
                `;
                break;
            case 'luggage sets':
                description = `
                    <p>Complete your travel collection with our ${product.name}. 
                    This comprehensive set includes multiple sizes to cover all your travel needs, 
                    from weekend getaways to extended trips.</p>
                    <p>Each piece is crafted with the same attention to detail and quality materials, 
                    ensuring consistency in style and durability across your entire luggage collection.</p>
                `;
                break;
            case 'carry-ons':
                description = `
                    <p>Travel light and smart with our ${product.name}. 
                    Perfect for short trips or as your personal item on flights, 
                    this carry-on maximizes space while meeting airline size requirements.</p>
                    <p>Features multiple compartments for organization and a durable construction 
                    that withstands the rigors of frequent travel.</p>
                `;
                break;
            default:
                description = `
                    <p>Discover the perfect travel companion with our ${product.name}. 
                    Carefully crafted with premium materials and innovative design features 
                    to enhance your travel experience.</p>
                    <p>Whether you're embarking on a business trip or a leisurely vacation, 
                    this luggage delivers the reliability and style you need for every journey.</p>
                `;
        }
        
        descriptionContent.innerHTML = description;
    }
    
    // Update size options based on product size
    const sizeSelect = document.querySelector('.product-choose-form-item select[name="size"]');
    if (sizeSelect && product.size) {
        // Clear existing options
        sizeSelect.innerHTML = '';
        
        // Add size options based on product category
        let sizes = [];
        if (product.category === 'luggage sets') {
            sizes = ['S', 'M', 'L', 'XL'];
        } else {
            sizes = ['S', 'M', 'L', 'XL'];
        }
        
        sizes.forEach(size => {
            const option = document.createElement('option');
            option.value = size;
            option.textContent = size;
            if (size === product.size) {
                option.selected = true;
            }
            sizeSelect.appendChild(option);
        });
    }
    
    // Update color options
    const colorSelect = document.querySelector('.product-choose-form-item select[name="color"]');
    if (colorSelect && product.color) {
        // Clear existing options
        colorSelect.innerHTML = '';
        
        const colors = ['red', 'blue', 'green', 'black', 'grey', 'yellow', 'pink', 'white'];
        colors.forEach(color => {
            const option = document.createElement('option');
            option.value = color;
            option.textContent = color.charAt(0).toUpperCase() + color.slice(1);
            if (color === product.color) {
                option.selected = true;
            }
            colorSelect.appendChild(option);
        });
    }
    
    // Update category options
    const categorySelect = document.querySelector('.product-choose-form-item select[name="category"]');
    if (categorySelect && product.category) {
        // Clear existing options
        categorySelect.innerHTML = '';
        
        const categories = ['suitcases', 'kids\' luggage', 'carry-ons', 'luggage sets'];
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            if (category === product.category) {
                option.selected = true;
            }
            categorySelect.appendChild(option);
        });
    }
}

// Initialize when ready
ready(async function() {
    console.log('DOM ready, initializing features...');
    initHamburgerMenu();
    initProductFeatures();
    initProductTabs();
    initRatingStars();
    initStyledPlaceholders();
    initAuthModals();
    initContactForm();
    // Initialize DOM components first
    await initHeaderAndFooter();
    await initProductCard();
    
    // Re-initialize interactive elements after DOM injection
    initHamburgerMenu();
    resetAuthModals(); // Reset auth modals to allow reinitialization
    initAuthModals();
    resetCart(); // Reset cart to allow reinitialization
    resetCatalog(); // Reset catalog to allow reinitialization
    
    // Update cart counter after header is loaded
    updateCartCounter();
    
    // Re-initialize product-specific functions after product card injection
    initProductFeatures();
    initProductTabs();
    initRatingStars();
    initCatalogProducts();
    initCatalogFilters();
    initLuggageSets();
    initSelectedProducts();
    initNewArrivals();
    initAlsoLikeProducts();
    initProductDetails(); // Add this for product details page
    // Initialize cart page only if we're on the cart page
    if (window.location.pathname.includes('/cart.html') || window.location.pathname.includes('cart.html')) {
        initCartPage();
    }
    initCatalogNavigationButtons(); // Add catalog navigation buttons initialization
    initCartCounter();
    
});