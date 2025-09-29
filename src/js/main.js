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
    
    let currentPage = 1;
    const productsPerPage = 12;
    const totalProducts = catalogProducts.length;
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
    initCatalogPagination();
});