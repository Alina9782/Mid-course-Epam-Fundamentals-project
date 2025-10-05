// Cart and Checkout functionality
let cartInitialized = false;

// Add product to cart function
export function addToCart(product, quantity = 1, button = null) {
    console.log('🛒 Cart module: Adding to cart:', product.name, 'Quantity:', quantity);
    
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
            imageUrl: product.imageUrl || product.image,
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
export function showAddToCartFeedback(button) {
    if (!button) return;
    
    const originalText = button.textContent;
    const originalBgColor = button.style.backgroundColor;
    const originalColor = button.style.color;
    
    // Update button appearance
    button.textContent = 'Added to Cart!';
    button.style.backgroundColor = '#4CAF50';
    button.style.color = 'white';
    
    // Disable button temporarily
    button.disabled = true;
    
    // Reset button after 2 seconds
    setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = originalBgColor;
        button.style.color = originalColor;
        button.disabled = false;
    }, 2000);
}

// Update cart counter in header
export function updateCartCounter() {
    console.log('🛒 Cart module: Updating cart counter...');
    try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
        
        const cartCounters = document.querySelectorAll('.cart-counter');
        cartCounters.forEach(counter => {
            counter.textContent = totalItems;
            
            // Show/hide counter based on items
            if (totalItems > 0) {
                counter.style.display = 'flex';
            } else {
                counter.style.display = 'none';
            }
        });
        
        console.log('Cart counter updated to:', totalItems, 'items');
    } catch (error) {
        console.error('Error updating cart counter:', error);
        // Fallback: set counter to 0 and hide it
        const cartCounters = document.querySelectorAll('.cart-counter');
        cartCounters.forEach(counter => {
            counter.textContent = '0';
            counter.style.display = 'none';
        });
    }
}

// Initialize cart counter on page load
export function initCartCounter() {
    console.log('🛒 Cart module: Initializing cart counter...');
    // Wait for header to be loaded before updating counter
    setTimeout(() => {
        updateCartCounter();
    }, 100);
    
    // Also update counter after header is loaded
    setTimeout(() => {
        updateCartCounter();
    }, 500);
}

// Initialize cart page functionality
export function initCartPage() {
    if (cartInitialized) {
        console.log('🛒 Cart page already initialized, skipping...');
        return;
    }
    
    console.log('🛒 Initializing cart page...');
    
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
    
    cartInitialized = true;
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
    const isInPagesDir = window.location.pathname.includes('/pages/');
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
        <td>
            <img src="${assetPath}${item.imageUrl}" alt="${item.name}" style="max-width: 116px; max-height: 116px; width: auto; height: auto; object-fit: contain;">
        </td>
        <td>${item.name}</td>
        <td>$${item.price}</td>
        <td>
            <div class="quantity-controls">
                <button class="quantity-btn minus" data-index="${index}">-</button>
                <input type="number" class="cart-quantity-input" value="${item.quantity}" min="1" data-index="${index}">
                <button class="quantity-btn plus" data-index="${index}">+</button>
            </div>
        </td>
        <td>$${total.toFixed(2)}</td>
        <td>
            <button class="remove-item-btn" data-index="${index}">
                <img src="${assetPath}img/icons/bin-icon.svg" alt="Delete icon">
            </button>
        </td>
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
    const discountRate = 0.1;
    const discount = subtotal >= discountThreshold ? subtotal * discountRate : 0;
    
    // Calculate shipping (always $100)
    const shipping = 100;
    
    // Calculate final total
    const finalTotal = subtotal - discount + shipping;
    
    // Update DOM elements using the correct IDs from cart.html
    const subtotalElement = document.getElementById('subTotal');
    const discountElement = document.getElementById('discount');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    
    if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    if (discountElement) discountElement.textContent = `$${discount.toFixed(2)}`;
    if (shippingElement) shippingElement.textContent = `$${shipping.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `$${finalTotal.toFixed(2)}`;
    
    // Show/hide discount row
    const discountRow = document.querySelector('.discount-row');
    const discountHr = document.querySelector('.discount-hr');
    if (discountRow) {
        discountRow.style.display = discount > 0 ? 'flex' : 'none';
        if (discountHr) discountHr.style.display = discount > 0 ? 'block' : 'none';
    }
    
    console.log(`🛒 Cart totals updated - Subtotal: $${subtotal.toFixed(2)}, Discount: $${discount.toFixed(2)}, Shipping: $${shipping.toFixed(2)}, Total: $${finalTotal.toFixed(2)}`);
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
            const newQuantity = parseInt(e.target.value);
            
            if (newQuantity >= 1) {
                setCartItemQuantity(index, newQuantity);
            }
        }
    });
    
    // Cart action buttons (they're in the tfoot of the table)
    const buttons = document.querySelectorAll('.cart-items-section tfoot .btn');
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
    
    // Checkout button
    const checkoutBtn = document.querySelector('.cart-checkout-section .btn');
    if (checkoutBtn && checkoutBtn.textContent.includes('CHECKOUT')) {
        checkoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            processCheckout();
        });
    }
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
        
        console.log(`Updated quantity for item at index ${index}`);
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
        
        console.log(`Set quantity to ${quantity} for item at index ${index}`);
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
        
        console.log(`Removed ${removedItem.name} from cart`);
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

// Process checkout
function processCheckout() {
    // Clear the cart
    localStorage.removeItem('cart');
    
    // Update cart display
    loadCartItems();
    updateCartCounter();
    
    // Show success message (you can customize this)
    alert('Thank you for your purchase! Your order has been processed.');
    
    console.log('Checkout processed successfully');
}

// Function to reset cart initialization (useful for dynamic content)
export function resetCart() {
    cartInitialized = false;
    console.log('Cart reset - can be reinitialized');
}
