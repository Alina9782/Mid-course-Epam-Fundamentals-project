// Hamburger Menu Functionality - Bulletproof Version
console.log('JavaScript file loaded!');

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
    console.log('Initializing hamburger menu...');
    
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileNav = document.getElementById('mobile-nav');
    
    console.log('Hamburger button found:', !!hamburgerBtn);
    console.log('Mobile nav found:', !!mobileNav);
    
    if (!hamburgerBtn || !mobileNav) {
        console.error('Required elements not found!');
        return;
    }
    
    const hamburgerIcon = hamburgerBtn.querySelector('img.hamburger-icon');
    console.log('Hamburger icon found:', !!hamburgerIcon);
    
    if (!hamburgerIcon) {
        console.error('Hamburger icon not found!');
        return;
    }
    
    // Determine icon path based on current page
    const isSubPage = window.location.pathname.includes('/pages/');
    const iconPath = isSubPage ? '../assets/img/icons/' : 'assets/img/icons/';
    console.log('Icon path:', iconPath);
    
    // Remove any existing event listeners
    const newBtn = hamburgerBtn.cloneNode(true);
    hamburgerBtn.parentNode.replaceChild(newBtn, hamburgerBtn);
    
    // Add click event listener
    newBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Hamburger clicked!');
        
        // Toggle menu
        mobileNav.classList.toggle('open');
        const isOpen = mobileNav.classList.contains('open');
        console.log('Menu is now:', isOpen ? 'OPEN' : 'CLOSED');
        
        // Change icon
        const icon = newBtn.querySelector('img.hamburger-icon');
        if (isOpen) {
            icon.src = iconPath + 'hamburger-icon-pink.svg';
            console.log('Changed to pink icon');
        } else {
            icon.src = iconPath + 'hamburger-icon-black.svg';
            console.log('Changed to black icon');
        }
    });
    
    // Close menu when clicking on links
    const menuLinks = mobileNav.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('open');
            const icon = newBtn.querySelector('img.hamburger-icon');
            icon.src = iconPath + 'hamburger-icon-black.svg';
            console.log('Menu closed by link click');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!newBtn.contains(e.target) && !mobileNav.contains(e.target)) {
            mobileNav.classList.remove('open');
            const icon = newBtn.querySelector('img.hamburger-icon');
            icon.src = iconPath + 'hamburger-icon-black.svg';
            console.log('Menu closed by outside click');
        }
    });
    
    console.log('Hamburger menu initialized successfully!');
}

// Product functionality
function initProductFeatures() {
    console.log('Initializing product features...');
    
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
        
        console.log('Quantity controls initialized');
    }
    
    // Thumbnail switching
    const mainImage = document.querySelector('.product-images > img');
    const thumbnails = document.querySelectorAll('.product-images-thumbnails img');
    
    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', function() {
                // Update main image
                mainImage.src = this.src;
                
                // Update active thumbnail
                thumbnails.forEach(t => t.style.borderColor = 'transparent');
                this.style.borderColor = '#E91E63'; // brand color
                
                console.log('Main image updated to thumbnail', index + 1);
            });
        });
        
        // Set first thumbnail as active by default
        if (thumbnails[0]) {
            thumbnails[0].style.borderColor = '#E91E63';
        }
        
        console.log('Thumbnail switching initialized');
    }
}

// Product details tabs functionality
function initProductTabs() {
    console.log('Initializing product tabs...');
    
    const tabItems = document.querySelectorAll('.tab-item');
    const contentItems = document.querySelectorAll('.product-details-content-item');
    const tabIndicator = document.querySelector('.tab-indicator');
    
    if (tabItems.length === 0 || contentItems.length === 0) {
        console.log('No tabs found, skipping tab initialization');
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
            
            console.log('Switched to tab:', targetTab);
        });
    });
    
    // Initialize with first tab active
    if (tabItems.length > 0) {
        updateTabIndicator(tabItems[0]);
    }
    
    console.log('Product tabs initialized successfully');
}

// Rating stars functionality
function initRatingStars() {
    console.log('Initializing rating stars...');
    
    const ratingStars = document.querySelectorAll('.rating-star');
    
    if (ratingStars.length === 0) {
        console.log('No rating stars found, skipping initialization');
        return;
    }
    
    ratingStars.forEach((star, index) => {
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
            
            console.log('Rating set to:', rating);
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
    
    console.log('Rating stars initialized successfully');
}

// Replace placeholder text with styled elements
function initStyledPlaceholders() {
    console.log('Initializing styled placeholders...');
    
    const requiredInputs = document.querySelectorAll('input.required-field, textarea.required-field');
    
    if (requiredInputs.length === 0) {
        console.log('No required fields found, skipping placeholder styling');
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
    
    console.log('Styled placeholders initialized successfully');
}

// Initialize when ready
ready(function() {
    console.log('DOM ready, initializing features...');
    initHamburgerMenu();
    initProductFeatures();
    initProductTabs();
    initRatingStars();
    initStyledPlaceholders();
});