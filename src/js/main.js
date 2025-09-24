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

// Initialize when ready
ready(function() {
    console.log('DOM ready, initializing hamburger menu...');
    initHamburgerMenu();
});