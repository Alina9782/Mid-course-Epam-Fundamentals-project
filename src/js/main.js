// Hamburger Menu Functionality
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
    
    // Add to Cart button functionality for product details page
    const addToCartBtn = document.querySelector('.product-add-to-cart-item .btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get current product data from the page
            const productName = document.querySelector('.product-description-header h2')?.textContent;
            const productPrice = document.querySelector('.product-description-header h3')?.textContent;
            const productImage = document.querySelector('.product-images > img')?.src;
            
            if (!productName || !productPrice) {
                console.error('Product data not found on page');
                return;
            }
            
            // Get quantity
            const quantityInput = document.getElementById('quantity');
            const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
            
            // Extract price number from text (remove $ sign)
            const price = parseFloat(productPrice.replace('$', ''));
            
            // Create product object
            const product = {
                id: 'PD_' + Date.now(), // Generate unique ID for product details
                name: productName,
                price: price,
                imageUrl: productImage ? productImage.split('/').pop() : 'img/images/products/suitcase-red.png', // Extract filename
                quantity: quantity
            };
            
            // Add to cart with button feedback
            addToCart(product, quantity, addToCartBtn);
            
            console.log('Product added to cart from details page:', product.name);
        });
        
        console.log('Add to Cart button initialized for product details');
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
            
            console.log('Review submitted successfully');
        });
        
        console.log('Submit button initialized for product review form');
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

// Authentication Modal functionality
function initAuthModals() {
    console.log('Initializing auth modals...');
    
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    const successModal = document.getElementById('successModal');
    const successLogInModal = document.getElementById('successLogInModal');
    const resetPasswordModal = document.getElementById('resetPasswordModal');
    const userIconLinks = document.querySelectorAll('a[href="#"] img[alt="Account icon"]');
    const signupLinks = document.querySelectorAll('.signup-link');
    const loginLinks = document.querySelectorAll('.login-link');
    const forgotPasswordLinks = document.querySelectorAll('.forgot-password');
    
    if (!loginModal || !signupModal || !forgotPasswordModal || !successModal || !successLogInModal || !resetPasswordModal) {
        console.log('Auth modals not found, skipping initialization');
        return;
    }
    
    // Determine icon path based on current page
    const isSubPage = window.location.pathname.includes('/pages/');
    const iconPath = isSubPage ? '../assets/img/icons/' : 'assets/img/icons/';
    
    // Function to close all modals
    function closeAllModals() {
        loginModal.classList.remove('active');
        signupModal.classList.remove('active');
        forgotPasswordModal.classList.remove('active');
        successModal.classList.remove('active');
        successLogInModal.classList.remove('active');
        resetPasswordModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Function to open login modal
    function openLoginModal() {
        closeAllModals();
        loginModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('Login modal opened');
    }
    
    // Function to open signup modal
    function openSignupModal() {
        closeAllModals();
        signupModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('Signup modal opened');
    }
    
    // Function to open forgot password modal
    function openForgotPasswordModal() {
        closeAllModals();
        forgotPasswordModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('Forgot password modal opened');
    }
    
    // Function to open success modal
    function openSuccessModal() {
        closeAllModals();
        successModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('Success modal opened');
    }
    
    // Function to open success login modal
    function openSuccessLogInModal() {
        closeAllModals();
        successLogInModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('Success login modal opened');
    }
    
    // Function to open reset password modal
    function openResetPasswordModal() {
        closeAllModals();
        resetPasswordModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('Reset password modal opened');
    }
    
    // Add click event listeners to user icons (opens login)
    userIconLinks.forEach(userIcon => {
        const userLink = userIcon.closest('a');
        if (userLink) {
            userLink.addEventListener('click', function(e) {
                e.preventDefault();
                openLoginModal();
            });
        }
    });
    
    // Add click event listeners to signup links
    signupLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openSignupModal();
        });
    });
    
    // Add click event listeners to login links
    loginLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openLoginModal();
        });
    });
    
    // Add click event listeners to forgot password links
    forgotPasswordLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openForgotPasswordModal();
        });
    });
    
    // Password visibility toggle (login modal only)
    const passwordToggle = document.getElementById('passwordToggle');
    const loginPasswordInput = document.getElementById('login-password');
    
    if (passwordToggle && loginPasswordInput) {
        passwordToggle.addEventListener('click', function() {
            const eyeIcon = this.querySelector('.eye-icon');
            
            if (loginPasswordInput.type === 'password') {
                // Store the original pattern
                loginPasswordInput.setAttribute('data-original-pattern', loginPasswordInput.getAttribute('pattern'));
                loginPasswordInput.removeAttribute('pattern');
                loginPasswordInput.type = 'text';
                eyeIcon.src = iconPath + 'eye-closed-icon.svg';
                eyeIcon.alt = 'Hide password';
                console.log('Password shown');
            } else {
                // Restore the original pattern
                const originalPattern = loginPasswordInput.getAttribute('data-original-pattern');
                if (originalPattern) {
                    loginPasswordInput.setAttribute('pattern', originalPattern);
                }
                loginPasswordInput.type = 'password';
                eyeIcon.src = iconPath + 'eye-opened-icon.svg';
                eyeIcon.alt = 'Show password';
                console.log('Password hidden');
            }
        });
    }
    
    // Signup form validation
    function validateSignupForm() {
        const email = document.getElementById('signup-email');
        const password = document.getElementById('signup-password');
        const confirmPassword = document.getElementById('confirm-password');
        const terms = document.getElementById('terms');
        const signupBtn = document.getElementById('signupBtn');
        
        if (!email || !password || !confirmPassword || !terms || !signupBtn) {
            console.log('Missing elements:', { email: !!email, password: !!password, confirmPassword: !!confirmPassword, terms: !!terms, signupBtn: !!signupBtn });
            return;
        }
        
        const isEmailValid = email.checkValidity();
        const isPasswordValid = password.checkValidity();
        const isPasswordMatch = password.value === confirmPassword.value && confirmPassword.value.length > 0;
        const isTermsChecked = terms.checked;
        
        console.log('Validation status:', {
            isEmailValid,
            isPasswordValid,
            isPasswordMatch,
            isTermsChecked,
            emailValue: email.value,
            passwordValue: password.value,
            confirmPasswordValue: confirmPassword.value
        });
        
        // Visual feedback for password match/mismatch
        if (confirmPassword.value.length > 0) {
            if (password.value === confirmPassword.value) {
                confirmPassword.classList.remove('mismatch');
                confirmPassword.classList.add('match');
            } else {
                confirmPassword.classList.remove('match');
                confirmPassword.classList.add('mismatch');
            }
        } else {
            confirmPassword.classList.remove('match', 'mismatch');
        }
        
        if (isEmailValid && isPasswordValid && isPasswordMatch && isTermsChecked) {
            console.log('All validations passed - enabling button');
            signupBtn.classList.remove('disabled');
            signupBtn.style.backgroundColor = '';
            signupBtn.style.cursor = 'pointer';
        } else {
            console.log('Validation failed - disabling button');
            signupBtn.classList.add('disabled');
            signupBtn.style.backgroundColor = '#727174';
            signupBtn.style.cursor = 'not-allowed';
        }
    }
    
    // Add event listeners for signup form validation
    const signupInputs = ['signup-email', 'signup-password', 'confirm-password'];
    const termsCheckbox = document.getElementById('terms');
    
    signupInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', validateSignupForm);
        }
    });
    
    if (termsCheckbox) {
        termsCheckbox.addEventListener('change', validateSignupForm);
    }
    
    // Signup form submission handler
    const signupForm = document.querySelector('.signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check if form is valid
            const email = document.getElementById('signup-email');
            const password = document.getElementById('signup-password');
            const confirmPassword = document.getElementById('confirm-password');
            const terms = document.getElementById('terms');
            
            if (email.checkValidity() && password.checkValidity() && 
                password.value === confirmPassword.value && terms.checked) {
                
                // Simulate successful signup
                console.log('Signup successful');
                openSuccessModal();
                
                // Reset form
                signupForm.reset();
                validateSignupForm();
            }
        });
    }
    
    // Login form submission handler
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check if form is valid
            const email = document.getElementById('login-email');
            const password = document.getElementById('login-password');
            
            if (email.checkValidity() && password.checkValidity()) {
                
                // Simulate successful login
                console.log('Login successful');
                openSuccessLogInModal();
                
                // Reset form
                loginForm.reset();
            }
        });
    }
    
    // Success signup modal OK button handler
    const successSignupOkBtn = document.getElementById('successSignupOkBtn');
    if (successSignupOkBtn) {
        successSignupOkBtn.addEventListener('click', function() {
            closeAllModals();
            console.log('Success signup modal closed');
        });
    }
    
    // Success login modal OK button handler
    const successLoginOkBtn = document.getElementById('successLoginOkBtn');
    if (successLoginOkBtn) {
        successLoginOkBtn.addEventListener('click', function() {
            closeAllModals();
            console.log('Success login modal closed');
        });
    }
    
    // Forgot password form submission handler
    const forgotPasswordForm = document.querySelector('.forgot-password-form');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check if form is valid
            const email = document.getElementById('forgot-password-email');
            
            if (email.checkValidity()) {
                
                // Simulate successful password reset request
                console.log('Password reset request successful');
                openResetPasswordModal();
                
                // Reset form
                forgotPasswordForm.reset();
            }
        });
    }
    
    // Reset password modal OK button handler
    const resetPasswordOkBtn = document.getElementById('resetPasswordOkBtn');
    if (resetPasswordOkBtn) {
        resetPasswordOkBtn.addEventListener('click', function() {
            closeAllModals();
            console.log('Reset password modal closed');
        });
    }
    
    // Close modals when clicking overlay
    const authOverlays = document.querySelectorAll('.auth-overlay');
    authOverlays.forEach(overlay => {
        overlay.addEventListener('click', closeAllModals);
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && (loginModal.classList.contains('active') || signupModal.classList.contains('active') || forgotPasswordModal.classList.contains('active') || successModal.classList.contains('active') || successLogInModal.classList.contains('active') || resetPasswordModal.classList.contains('active'))) {
            closeAllModals();
            console.log('Auth modal closed by Escape key');
        }
    });
    
    // Initialize signup button state
    validateSignupForm();
    
    console.log('Auth modals initialized successfully');
}

// Contact Form functionality
function initContactForm() {
    console.log('Initializing contact form...');
    
    const contactForm = document.querySelector('.contact-us-form-content form');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const successSendMessageModal = document.getElementById('successSendMessageModal');
    const successSendMessageOkBtn = document.getElementById('successSendMessageOkBtn');
    
    console.log('Found elements:', {
        contactForm: !!contactForm,
        sendMessageBtn: !!sendMessageBtn,
        successSendMessageModal: !!successSendMessageModal,
        successSendMessageOkBtn: !!successSendMessageOkBtn
    });
    
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
        console.log('Success send message modal closed');
    }
    
    // Function to open success modal
    function openSuccessModal() {
        successSendMessageModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('Success send message modal opened');
    }
    
    // Contact form submission handler
    contactForm.addEventListener('submit', function(e) {
        console.log('Form submission event triggered!');
        e.preventDefault();
        console.log('Default form submission prevented');
        
        // Get form inputs
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        console.log('Form inputs found:', {
            nameInput: !!nameInput,
            emailInput: !!emailInput,
            subjectInput: !!subjectInput,
            messageInput: !!messageInput
        });
        
        // Check if all required fields are valid
        const isNameValid = nameInput.checkValidity();
        const isEmailValid = emailInput.checkValidity();
        const isSubjectValid = subjectInput.checkValidity();
        const isMessageValid = messageInput.checkValidity();
        
        console.log('Form validation status:', {
            isNameValid,
            isEmailValid,
            isSubjectValid,
            isMessageValid
        });
        
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            // Simulate successful message sending
            console.log('Message sent successfully');
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
        console.log('Send button clicked directly!');
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
        
        console.log('Button click validation status:', {
            isNameValid,
            isEmailValid,
            isSubjectValid,
            isMessageValid
        });
        
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            console.log('Message sent successfully via button click');
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
    
    console.log('Contact form initialized successfully');
}

// Catalog pagination functionality
function initCatalogPagination() {
    console.log('Initializing catalog pagination...');
    
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const paginationNumbers = document.querySelectorAll('.pagination-number');
    const catalogProducts = document.querySelectorAll('.catalog-product');
    
    if (!prevBtn || !nextBtn || paginationNumbers.length === 0) {
        console.log('Catalog pagination elements not found, skipping initialization');
        return;
    }
    
    if (catalogProducts.length === 0) {
        console.log('No catalog products found, skipping pagination initialization');
        return;
    }
    
    let currentPage = 1;
    const totalProducts = catalogProducts.length;
    const productsPerPage = 12; // Always 12 products per page
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    
    // Function to show/hide products based on current page
    function showProductsForPage(page) {
        const startIndex = (page - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        
        catalogProducts.forEach((product, index) => {
            if (index >= startIndex && index < endIndex) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }
    
    // Function to update pagination UI
    function updatePaginationUI() {
        // Update page numbers
        paginationNumbers.forEach((btn, index) => {
            const pageNum = index + 1;
            btn.classList.toggle('active', pageNum === currentPage);
            btn.style.display = pageNum <= totalPages ? 'block' : 'none';
        });
        
        // Update prev/next buttons
        prevBtn.style.display = currentPage === 1 ? 'none' : 'block';
        nextBtn.style.display = currentPage === totalPages ? 'none' : 'block';
        
        // Update results text
        const resultsText = document.querySelector('.catalog-header p');
        if (resultsText) {
            const startResult = (currentPage - 1) * productsPerPage + 1;
            const endResult = Math.min(currentPage * productsPerPage, totalProducts);
            resultsText.textContent = `Showing ${startResult}-${endResult} Of ${totalProducts} Results`;
        }
    }
    
    // Event listeners for pagination numbers
    paginationNumbers.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const pageNum = index + 1;
            if (pageNum <= totalPages) {
                currentPage = pageNum;
                showProductsForPage(currentPage);
                updatePaginationUI();
                console.log('Switched to page:', currentPage);
            }
        });
    });
    
    // Event listener for previous button
    prevBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            showProductsForPage(currentPage);
            updatePaginationUI();
            console.log('Previous page:', currentPage);
        }
    });
    
    // Event listener for next button
    nextBtn.addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            showProductsForPage(currentPage);
            updatePaginationUI();
            console.log('Next page:', currentPage);
        }
    });
    
    // Initialize
    showProductsForPage(currentPage);
    updatePaginationUI();
    
    console.log('Catalog pagination initialized successfully');
}

// Catalog filters functionality
function initCatalogFilters() {
    console.log('Initializing catalog filters...');
    
    const filtersBtn = document.querySelector('.catalog-filters .btn');
    const filtersContainer = document.querySelector('.catalog-filters-container');
    const hideFiltersBtn = document.querySelector('.filter-controls .btn:last-child');
    const clearFiltersBtn = document.querySelector('.filter-controls .btn:first-child');
    
    if (!filtersBtn || !filtersContainer) {
        console.log('Catalog filters elements not found, skipping initialization');
        return;
    }
    
    // Function to toggle filters visibility
    function toggleFilters() {
        filtersContainer.classList.toggle('hidden');
        const isVisible = !filtersContainer.classList.contains('hidden');
        console.log('Filters container is now:', isVisible ? 'VISIBLE' : 'HIDDEN');
    }
    
    // Function to hide filters
    function hideFilters() {
        filtersContainer.classList.add('hidden');
        console.log('Filters container hidden');
    }
    
    // Function to clear all filters
    function clearAllFilters() {
        // Clear size filter
        const sizeSelect = document.getElementById('size');
        if (sizeSelect) {
            sizeSelect.value = 'all';
            console.log('Size filter cleared');
        }
        
        // Clear color filter
        const colorSelect = document.getElementById('color');
        if (colorSelect) {
            colorSelect.value = 'all';
            console.log('Color filter cleared');
        }
        
        // Clear category filter
        const categorySelect = document.getElementById('category');
        if (categorySelect) {
            categorySelect.value = 'all';
            console.log('Category filter cleared');
        }
        
        // Clear sales radio button
        const salesRadio = document.getElementById('sales');
        if (salesRadio) {
            salesRadio.checked = false;
            console.log('Sales filter cleared');
        }
        
        // Clear sort dropdown
        const sortSelect = document.getElementById('sort');
        if (sortSelect) {
            sortSelect.value = 'default';
            console.log('Sort filter cleared');
        }
        
        console.log('All filters cleared successfully');
        
        // Re-apply filters (which will show all products)
        applyFilters();
    }
    
    // Function to apply filters to products
    function applyFilters() {
        if (!allProducts || allProducts.length === 0) {
            console.log('No products loaded yet, skipping filter application');
            return;
        }
        
        // Get current filter values
        const sizeFilter = document.getElementById('size')?.value || 'all';
        const colorFilter = document.getElementById('color')?.value || 'all';
        const categoryFilter = document.getElementById('category')?.value || 'all';
        const salesFilter = document.getElementById('sales')?.checked || false;
        const sortValue = document.getElementById('sort')?.value || 'default';
        
        console.log('Applying filters:', { sizeFilter, colorFilter, categoryFilter, salesFilter, sortValue });
        
        // Filter products based on selected criteria
        let filteredProducts = allProducts.filter(product => {
            // Size filter
            if (sizeFilter !== 'all' && product.size.toLowerCase() !== sizeFilter.toLowerCase()) {
                return false;
            }
            
            // Color filter
            if (colorFilter !== 'all' && product.color.toLowerCase() !== colorFilter.toLowerCase()) {
                return false;
            }
            
            // Category filter
            if (categoryFilter !== 'all' && product.category !== categoryFilter) {
                return false;
            }
            
            // Sales filter
            if (salesFilter && !product.salesStatus) {
                return false;
            }
            
            return true;
        });
        
        console.log(`Filtered ${allProducts.length} products to ${filteredProducts.length} products`);
        
        // Sort the filtered products
        const sortedProducts = sortProducts(filteredProducts, sortValue);
        console.log(`Sorted ${sortedProducts.length} products by ${sortValue}`);
        
        // Update the displayed products
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
        
        console.log(`Updated display with ${filteredProducts.length} filtered and sorted products`);
    }
    
    // Function to sort products based on selected criteria
    function sortProducts(products, sortValue) {
        if (!products || products.length === 0) {
            return products;
        }
        
        let sortedProducts = [...products]; // Create a copy to avoid mutating original array
        
        switch (sortValue) {
            case 'popularity':
                sortedProducts.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
                console.log('Sorted by popularity (high to low)');
                break;
                
            case 'price-asc':
                sortedProducts.sort((a, b) => (a.price || 0) - (b.price || 0));
                console.log('Sorted by price (low to high)');
                break;
                
            case 'price-desc':
                sortedProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
                console.log('Sorted by price (high to low)');
                break;
                
            case 'default':
            default:
                // Keep original order (as they appear in JSON)
                console.log('Using default sorting (original order)');
                break;
        }
        
        return sortedProducts;
    }
    
    // Add click event listener to FILTERS button
    filtersBtn.addEventListener('click', function(e) {
        e.preventDefault();
        toggleFilters();
    });
    
    // Add click event listener to HIDE FILTERS button (if it exists)
    if (hideFiltersBtn) {
        hideFiltersBtn.addEventListener('click', function(e) {
            e.preventDefault();
            hideFilters();
        });
    }
    
    // Add click event listener to CLEAR FILTERS button (if it exists)
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function(e) {
            e.preventDefault();
            clearAllFilters();
        });
    }
    
    // Add event listeners to filter controls for real-time filtering
    const sizeSelect = document.getElementById('size');
    const colorSelect = document.getElementById('color');
    const categorySelect = document.getElementById('category');
    const salesRadio = document.getElementById('sales');
    const sortSelect = document.getElementById('sort');
    
    if (sizeSelect) {
        sizeSelect.addEventListener('change', applyFilters);
    }
    if (colorSelect) {
        colorSelect.addEventListener('change', applyFilters);
    }
    if (categorySelect) {
        categorySelect.addEventListener('change', applyFilters);
    }
    if (salesRadio) {
        salesRadio.addEventListener('change', applyFilters);
    }
    if (sortSelect) {
        sortSelect.addEventListener('change', applyFilters);
    }
    
    console.log('Catalog filters initialized successfully');
}

// Set active navigation state based on current page
function setActiveNavigation(currentPath) {
    console.log('Setting active navigation for path:', currentPath);
    
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
        console.log('Cart page - no active navigation item set');
    }
    
    // Set the active class on the determined navigation item
    if (activeNavItem) {
        activeNavItem.classList.add('active');
        console.log('Active navigation set to:', activeNavItem.querySelector('a').textContent.trim());
    } else {
        console.log('No matching navigation item found for current path');
    }
}

// Fetch and inject partial header.html and footer.html
async function initHeaderAndFooter() {
    console.log('Initializing header and footer...');
    
    const header = document.getElementById('header');
    const footer = document.getElementById('footer');
    
    if (!header || !footer) {
        console.warn('Header or footer elements not found');
        return;
    }
    
    // Determine the correct path based on current page location
    const currentPath = window.location.pathname;
    const isInPagesDir = currentPath.includes('/pages/');
    const componentsPath = isInPagesDir ? '../components/' : 'components/';
    
    console.log(`Current path: ${currentPath}, Components path: ${componentsPath}`);
    
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
        console.log('Header loaded successfully');
        
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
        console.log('Footer loaded successfully');
        
        // Re-initialize interactive elements after content injection
        initHamburgerMenu();
        initAuthModals();
        
    } catch (error) {
        console.error('Error loading header/footer:', error);
    }
}

// Global variable to store loaded products
let allProducts = [];

// Load and populate catalog products from data.json
async function initCatalogProducts() {
    console.log('Loading catalog products...');
    
    const catalogProductsContainer = document.querySelector('.catalog-products');
    
    if (!catalogProductsContainer) {
        console.warn('Catalog products container not found');
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
        allProducts = data.data; // Store products globally
        
        // Clear existing products
        catalogProductsContainer.innerHTML = '';
        
        // Generate product cards
        allProducts.forEach(product => {
            const productCard = createProductCard(product, isInPagesDir);
            catalogProductsContainer.appendChild(productCard);
        });
        
        console.log(`Loaded ${allProducts.length} products successfully`);
        
        // Re-initialize pagination after products are loaded
        setTimeout(() => {
            initCatalogPagination();
        }, 100);
        
    } catch (error) {
        console.error('Error loading catalog products:', error);
    }
}

// Create individual product card element
function createProductCard(product, isInPagesDir) {
    const productDiv = document.createElement('div');
    productDiv.className = 'catalog-product';
    productDiv.dataset.productId = product.id; // Store product ID for future use
    
    // Add 'sale' class if salesStatus is true
    if (product.salesStatus) {
        productDiv.classList.add('sale');
    }
    
    // Set correct asset path
    const assetPath = isInPagesDir ? '../assets/' : 'assets/';
    
    productDiv.innerHTML = `
        <img src="${assetPath}${product.imageUrl}" alt="${product.name}" class="product-image" style="cursor: pointer;">
        <h4 class="product-name" style="cursor: pointer;">${product.name}</h4>
        <p>$${product.price}</p>
        <button class="btn add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
    `;
    
    // Add click event listener for Add to Cart button
    const addToCartBtn = productDiv.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent event bubbling
        addToCart(product, 1, addToCartBtn);
    });
    
    // Add click event listeners for product name and image
    const productImage = productDiv.querySelector('.product-image');
    const productName = productDiv.querySelector('.product-name');
    
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
    
    return productDiv;
}

// Navigate to product details page
function navigateToProductDetails(productId, isInPagesDir) {
    console.log('Navigating to product details for ID:', productId);
    
    // Determine the correct path to product details page
    const productDetailsPath = isInPagesDir ? 
        `product-details-template.html?id=${productId}` : 
        `pages/product-details-template.html?id=${productId}`;
    
    // Navigate to product details page
    window.location.href = productDetailsPath;
}

// Add product to cart function
function addToCart(product, quantity = 1, button = null) {
    console.log('Adding to cart:', product.name, 'Quantity:', quantity);
    
    // Get existing cart from localStorage or create new one
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: quantity
        });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart counter in header
    updateCartCounter();
    
    // Show success feedback on button if provided
    if (button) {
        showAddToCartFeedback(button);
    }
    
    // Show success message (optional)
    console.log(`${product.name} added to cart!`);
}

// Show success feedback on add to cart button
function showAddToCartFeedback(button) {
    if (!button) return;
    
    const originalText = button.textContent;
    const originalBgColor = button.style.backgroundColor;
    
    // Update button appearance
    button.textContent = 'Added to Cart!';
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

// Update cart counter in header
function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartCounters = document.querySelectorAll('.cart-counter');
    cartCounters.forEach(counter => {
        counter.textContent = totalItems;
    });
}

// Initialize cart counter on page load
function initCartCounter() {
    // Wait for header to be loaded before updating counter
    setTimeout(() => {
        updateCartCounter();
    }, 100);
}

// Initialize cart page functionality
function initCartPage() {
    console.log('Initializing cart page...');
    
    const cartTableBody = document.querySelector('.cart-items-section tbody');
    const cartTable = document.querySelector('.cart-items-section table');
    const checkoutSection = document.querySelector('.cart-checkout-section');
    
    if (!cartTableBody || !cartTable) {
        console.log('Cart elements not found, skipping cart initialization');
        return;
    }
    
    // Load cart items
    loadCartItems();
    
    // Add event listeners for cart actions
    initCartEventListeners();
    
    console.log('Cart page initialized successfully');
}

// Load and display cart items
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTableBody = document.querySelector('.cart-items-section tbody');
    const cartTable = document.querySelector('.cart-items-section table');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    
    if (!cartTableBody || !cartTable) {
        return;
    }
    
    // Clear existing content
    cartTableBody.innerHTML = '';
    
    if (cart.length === 0) {
        // Show empty cart message
        showEmptyCart(cartTable, emptyCartMessage);
        return;
    }
    
    // Hide empty cart message if it exists
    if (emptyCartMessage) {
        emptyCartMessage.style.display = 'none';
    }
    
    // Show the table
    cartTable.style.display = 'table';
    
    // Determine asset path
    const currentPath = window.location.pathname;
    const isInPagesDir = currentPath.includes('/pages/');
    const assetPath = isInPagesDir ? '../assets/' : 'assets/';
    
    // Create cart items
    cart.forEach((item, index) => {
        const row = createCartItemRow(item, index, assetPath);
        cartTableBody.appendChild(row);
    });
    
    // Update totals
    updateCartTotals();
    
    console.log(`Loaded ${cart.length} cart items`);
}

// Create individual cart item row
function createCartItemRow(item, index, assetPath) {
    const row = document.createElement('tr');
    row.dataset.productId = item.id;
    row.dataset.index = index;
    
    const total = item.price * item.quantity;
    
    row.innerHTML = `
        <td><img src="${assetPath}${item.imageUrl}" alt="${item.name}"></td>
        <td>${item.name}</td>
        <td>$${item.price}</td>
        <td>
            <div class="quantity-controls">
                <button class="quantity-btn minus" data-index="${index}">-</button>
                <input type="number" class="cart-quantity-input" value="${item.quantity}" min="1" data-index="${index}">
                <button class="quantity-btn plus" data-index="${index}">+</button>
            </div>
        </td>
        <td class="item-total">$${total}</td>
        <td><button class="remove-item-btn" data-index="${index}"><img src="${assetPath}img/icons/bin-icon.svg" alt="Delete icon"></button></td>
    `;
    
    return row;
}

// Show empty cart message
function showEmptyCart(cartTable, emptyCartMessage) {
    // Hide the table
    cartTable.style.display = 'none';
    
    // Create or show empty cart message
    let emptyMessage = emptyCartMessage;
    if (!emptyMessage) {
        emptyMessage = document.createElement('div');
        emptyMessage.className = 'empty-cart-message';
        emptyMessage.innerHTML = `
            <div style="text-align: center; padding: 60px 20px;">
                <h3>Your cart is empty</h3>
                <p>There aren't any products in your cart. Use our catalog to choose your first product!</p>
                <a href="catalog.html" class="btn" style="margin-top: 20px;">Browse Products</a>
            </div>
        `;
        
        // Insert after the table
        cartTable.parentNode.insertBefore(emptyMessage, cartTable.nextSibling);
    }
    
    emptyMessage.style.display = 'block';
    
    // Update totals to zero
    updateCartTotals();
}

// Update cart totals
function updateCartTotals() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Calculate discount (10% if subtotal >= $3000)
    const discountThreshold = 3000;
    const discountRate = 0.10; // 10%
    const discount = subtotal >= discountThreshold ? subtotal * discountRate : 0;
    
    // Calculate shipping (assuming $100 flat rate)
    const shipping = 100;
    
    // Calculate final total
    const finalTotal = subtotal - discount + shipping;
    
    // Update subtotal
    const subtotalElement = document.getElementById('subTotal');
    if (subtotalElement) {
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    }
    
    // Update discount
    const discountElement = document.getElementById('discount');
    if (discountElement) {
        discountElement.textContent = `-$${discount.toFixed(2)}`;
        
        // Show/hide discount row based on whether discount applies
        const discountRow = document.querySelector('.discount-row');
        const discountHr = document.querySelector('.discount-hr');
        
        if (discount > 0) {
            discountRow.style.display = 'flex';
            if (discountHr) discountHr.style.display = 'block';
            console.log(`Discount applied: $${discount.toFixed(2)} (10% off)`);
        } else {
            discountRow.style.display = 'none';
            if (discountHr) discountHr.style.display = 'none';
        }
    }
    
    // Update shipping
    const shippingElement = document.getElementById('shipping');
    if (shippingElement) {
        shippingElement.textContent = `$${shipping.toFixed(2)}`;
    }
    
    // Update final total
    const totalElement = document.getElementById('total');
    if (totalElement) {
        totalElement.textContent = `$${finalTotal.toFixed(2)}`;
    }
    
    console.log(`Cart totals updated - Subtotal: $${subtotal.toFixed(2)}, Discount: $${discount.toFixed(2)}, Shipping: $${shipping.toFixed(2)}, Total: $${finalTotal.toFixed(2)}`);
}

// Initialize cart event listeners
function initCartEventListeners() {
    // Quantity controls
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('quantity-btn')) {
            e.preventDefault();
            const index = parseInt(e.target.dataset.index);
            const isPlus = e.target.classList.contains('plus');
            
            updateCartItemQuantity(index, isPlus ? 1 : -1);
        }
        
        if (e.target.classList.contains('remove-item-btn')) {
            e.preventDefault();
            const index = parseInt(e.target.dataset.index);
            removeCartItem(index);
        }
    });
    
    // Quantity input changes
    document.addEventListener('input', function(e) {
        if (e.target.classList.contains('cart-quantity-input')) {
            const index = parseInt(e.target.dataset.index);
            const newQuantity = parseInt(e.target.value) || 1;
            
            if (newQuantity < 1) {
                e.target.value = 1;
                return;
            }
            
            setCartItemQuantity(index, newQuantity);
        }
    });
    
    // Clear cart button
    const buttons = document.querySelectorAll('.cart-items-section .btn');
    buttons.forEach(btn => {
        if (btn.textContent.includes('CLEAR SHOPPING CART')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                clearCart();
            });
        } else if (btn.textContent.includes('CONTINUE SHOPPING')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'catalog.html';
            });
        }
    });
}

// Update cart item quantity
function updateCartItemQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (index >= 0 && index < cart.length) {
        cart[index].quantity += change;
        
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
        updateCartCounter();
        
        console.log('Cart item quantity updated');
    }
}

// Set cart item quantity
function setCartItemQuantity(index, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (index >= 0 && index < cart.length) {
        if (quantity <= 0) {
            cart.splice(index, 1);
        } else {
            cart[index].quantity = quantity;
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
        updateCartCounter();
        
        console.log('Cart item quantity set to:', quantity);
    }
}

// Remove cart item
function removeCartItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (index >= 0 && index < cart.length) {
        const removedItem = cart[index];
        cart.splice(index, 1);
        
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
        updateCartCounter();
        
        console.log('Removed item from cart:', removedItem.name);
    }
}

// Clear entire cart
function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        localStorage.removeItem('cart');
        loadCartItems();
        updateCartCounter();
        
        console.log('Cart cleared');
    }
}

// Load and populate luggage sets from data.json
async function initLuggageSets() {
    console.log('Loading luggage sets...');
    
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
        
        console.log(`Loaded ${luggageSets.length} luggage sets successfully`);
        
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
    console.log('Loading selected products...');
    
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
        
        console.log(`Loaded ${limitedSelectedProducts.length} selected products successfully (showing max 4)`);
        
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
    console.log('Loading new arrivals...');
    
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
        
        console.log(`Loaded ${limitedNewArrivals.length} new arrivals successfully (showing max 4)`);
        
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
    console.log('Loading You May Also Like products...');
    
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
        
        console.log(`Loaded ${limitedAlsoLikeProducts.length} You May Also Like products successfully (showing max 4)`);
        
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

// Fetch and inject partial product-card.html
async function initProductCard() {
    console.log('Initializing product card...');
    
    const productCard = document.getElementById('product-card');
    
    if (!productCard) {
        console.warn('Product card element not found');
        return;
    }
    
    // Determine the correct path based on current page location
    const currentPath = window.location.pathname;
    const isInPagesDir = currentPath.includes('/pages/');
    const componentsPath = isInPagesDir ? '../components/' : 'components/';
    
    console.log(`Current path: ${currentPath}, Components path: ${componentsPath}`);
    
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
        console.log('Product card loaded successfully');
        
        // Re-initialize interactive elements after content injection
        initProductFeatures();
        initProductTabs();
        initRatingStars();
        
    } catch (error) {
        console.error('Error loading product card:', error);
    }
}



// Load specific product data for product details page
async function initProductDetails() {
    console.log('Initializing product details...');
    
    // Get product ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        console.warn('No product ID found in URL parameters');
        return;
    }
    
    console.log('Loading product details for ID:', productId);
    
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
        
        console.log('Found product:', product.name);
        
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
    console.log('Updating product details page for:', product.name);
    
    // Set correct asset path
    const assetPath = isInPagesDir ? '../assets/' : 'assets/';
    
    // Update product name in header (if exists)
    const productNameSubheader = document.querySelector('.product-name-subheader h2');
    if (productNameSubheader) {
        productNameSubheader.textContent = product.name;
    }
    
    // Update product name in description header
    const productDescriptionHeader = document.querySelector('.product-description-header h2');
    if (productDescriptionHeader) {
        productDescriptionHeader.textContent = product.name;
    }
    
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
    
    // Update price
    const priceElement = document.querySelector('.product-description-header h3');
    if (priceElement) {
        priceElement.textContent = `$${product.price}`;
    }
    
    // Update rating and reviews
    const reviewsCount = document.querySelector('.reviews-count');
    if (reviewsCount) {
        // Generate a random review count for demo purposes
        const reviewCount = Math.floor(Math.random() * 50) + 10;
        reviewsCount.textContent = `(${reviewCount} reviews)`;
    }
    
    // Update stars based on product rating
    const stars = document.querySelectorAll('.product-stars .star');
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
    
    console.log('Product details page updated successfully');
}

// Initialize catalog navigation buttons functionality
function initCatalogNavigationButtons() {
    console.log('Initializing catalog navigation buttons...');
    
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
        console.log('Navigating to catalog page');
    }
    
    // Add event listeners to found buttons
    if (heroButton) {
        heroButton.addEventListener('click', navigateToCatalog);
        console.log('Hero button initialized');
    }
    
    if (aboutButton) {
        aboutButton.addEventListener('click', navigateToCatalog);
        console.log('About page button initialized');
    }
    
    if (!heroButton && !aboutButton) {
        console.log('No catalog navigation buttons found');
    }
    
    console.log('Catalog navigation buttons initialized successfully');
}

// Initialize when ready
ready(function() {
    console.log('DOM ready, initializing features...');
    initHamburgerMenu();
    initProductFeatures();
    initProductTabs();
    initRatingStars();
    initStyledPlaceholders();
    initAuthModals();
    initContactForm();
    initCatalogFilters();
    initHeaderAndFooter();
    initProductCard();
    initCatalogProducts();
    initLuggageSets();
    initSelectedProducts();
    initNewArrivals();
    initAlsoLikeProducts();
    initProductDetails(); // Add this for product details page
    initCartPage(); // Add cart page initialization
    initCatalogNavigationButtons(); // Add catalog navigation buttons initialization
    initCartCounter();
});