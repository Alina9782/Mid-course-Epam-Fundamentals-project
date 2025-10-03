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
        <img src="${assetPath}${product.imageUrl}" alt="${product.name}">
        <h4>${product.name}</h4>
        <p>$${product.price}</p>
        <button class="btn add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
    `;
    
    // Add click event listener for Add to Cart button
    const addToCartBtn = productDiv.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        addToCart(product);
    });
    
    return productDiv;
}

// Add product to cart function
function addToCart(product) {
    console.log('Adding to cart:', product.name);
    
    // Get existing cart from localStorage or create new one
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: 1
        });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart counter in header
    updateCartCounter();
    
    // Show success message (optional)
    console.log(`${product.name} added to cart!`);
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
            <img src="${assetPath}${product.imageUrl}" alt="${product.name}">
            <div class="category-info">
                <h4>${product.name}</h4>
                <div class="product-stars">
                    ${stars}
                </div>
                <p>$${product.price}</p>
            </div>
        </div>
    `;
    
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
        <img src="${assetPath}${product.imageUrl}" alt="${product.name}">
        <h4>${product.name}</h4>
        <p>$${product.price}</p>
        <button class="btn add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
    `;
    
    // Add click event listener for Add to Cart button
    const addToCartBtn = li.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        addToCart(product);
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
        <img src="${assetPath}${product.imageUrl}" alt="${product.name}">
        <h4>${product.name}</h4>
        <p>$${product.price}</p>
        <button class="btn view-product-btn" data-product-id="${product.id}">View Product</button>
    `;
    
    // Add click event listener for View Product button
    const viewProductBtn = li.querySelector('.view-product-btn');
    viewProductBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // You can add navigation to product details page here
        console.log('View product:', product.name);
        // For now, just log - you can implement navigation later
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
        <img src="${assetPath}${product.imageUrl}" alt="${product.name}">
        <h4>${product.name}</h4>
        <p>$${product.price}</p>
        <button class="btn add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
    `;
    
    // Add click event listener for Add to Cart button
    const addToCartBtn = li.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        addToCart(product);
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
    initCartCounter();
});