// Authentication Modal functionality
let authModalsInitialized = false;

export function initAuthModals() {
    if (authModalsInitialized) {
        console.log('Auth modals already initialized, skipping...');
        return;
    }
    
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
    function initPasswordToggle() {
        const passwordToggle = document.getElementById('passwordToggle');
        const loginPasswordInput = document.getElementById('login-password');
        
        console.log('Attempting to initialize password toggle:', {
            passwordToggle: !!passwordToggle,
            loginPasswordInput: !!loginPasswordInput,
            iconPath: iconPath
        });
        
        if (passwordToggle && loginPasswordInput) {
            // Remove any existing event listeners
            const newPasswordToggle = passwordToggle.cloneNode(true);
            passwordToggle.parentNode.replaceChild(newPasswordToggle, passwordToggle);
            
            newPasswordToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('Password toggle clicked!');
                
                const eyeIcon = this.querySelector('.eye-icon');
                
                if (!eyeIcon) {
                    console.error('Eye icon not found in password toggle');
                    return;
                }
                
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
            
            console.log('Password toggle initialized successfully');
        } else {
            console.error('Password toggle elements not found');
        }
    }
    
    // Initialize password toggle immediately
    initPasswordToggle();
    
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
    
    // Mark as initialized
    authModalsInitialized = true;
    
    console.log('Auth modals initialized successfully');
}

// Function to reset initialization flag (useful for dynamic content)
export function resetAuthModals() {
    authModalsInitialized = false;
    console.log('Auth modals reset - can be reinitialized');
}
