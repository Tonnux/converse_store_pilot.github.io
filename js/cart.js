/**
 * cart.js - Lógica del carrito de compras
 * Maneja agregar, eliminar, actualizar cantidades
 * Persiste datos en localStorage
 */

// Clave para localStorage
const CART_STORAGE_KEY = 'converse_cart';

/**
 * Obtiene el carrito del localStorage
 * @returns {Array} Items del carrito
 */
function getCart() {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
}

/**
 * Guarda el carrito en localStorage
 * @param {Array} cart - Items del carrito
 */
function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartUI();
}

/**
 * Agrega un producto al carrito
 * @param {number} productId - ID del producto
 * @param {string} size - Talla seleccionada
 * @param {number} quantity - Cantidad a agregar
 */
function addToCart(productId, size = '25', quantity = 1) {
    const product = getProductById(productId);
    if (!product) return;

    const cart = getCart();
    
    // Busca si el producto ya está en el carrito con la misma talla
    const existingItemIndex = cart.findIndex(
        item => item.productId === productId && item.size === size
    );

    if (existingItemIndex !== -1) {
        // Si existe, incrementa la cantidad
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Si no existe, agrega nuevo item
        cart.push({
            productId: product.id,
            name: product.name,
            shortName: product.shortName,
            price: product.price,
            image: product.image,
            size: size,
            quantity: quantity,
            color: product.color
        });
    }

    saveCart(cart);
    showAddedToCartFeedback();
    openCart(); // Abre el panel del carrito al agregar
}

/**
 * Elimina un item del carrito
 * @param {number} productId - ID del producto
 * @param {string} size - Talla del producto
 */
function removeFromCart(productId, size) {
    let cart = getCart();
    cart = cart.filter(item => !(item.productId === productId && item.size === size));
    saveCart(cart);
}

/**
 * Actualiza la cantidad de un item en el carrito
 * @param {number} productId - ID del producto
 * @param {string} size - Talla del producto
 * @param {number} quantity - Nueva cantidad
 */
function updateCartItemQuantity(productId, size, quantity) {
    const cart = getCart();
    const itemIndex = cart.findIndex(
        item => item.productId === productId && item.size === size
    );

    if (itemIndex !== -1) {
        if (quantity <= 0) {
            // Si la cantidad es 0 o menos, elimina el item
            removeFromCart(productId, size);
        } else {
            cart[itemIndex].quantity = quantity;
            saveCart(cart);
        }
    }
}

/**
 * Calcula el total del carrito
 * @returns {number} Total en pesos
 */
function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/**
 * Obtiene la cantidad total de items en el carrito
 * @returns {number} Cantidad total de items
 */
function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
}

/**
 * Vacía el carrito completamente
 */
function clearCart() {
    localStorage.removeItem(CART_STORAGE_KEY);
    updateCartUI();
}

/**
 * Actualiza la UI del carrito (contador y panel)
 */
function updateCartUI() {
    const cart = getCart();
    const itemCount = getCartItemCount();
    const total = getCartTotal();

    // Actualiza el contador en el header
    const cartCountElements = document.querySelectorAll('#cartCount');
    cartCountElements.forEach(el => {
        el.textContent = itemCount;
        el.style.display = itemCount > 0 ? 'flex' : 'none';
    });

    // Actualiza el total en el panel
    const cartTotalElements = document.querySelectorAll('#cartTotal');
    cartTotalElements.forEach(el => {
        el.textContent = formatPrice(total);
    });

    // Actualiza la lista de items en el panel
    renderCartItems();
}

/**
 * Renderiza los items del carrito en el panel
 */
function renderCartItems() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartFooter = document.getElementById('cartFooter');

    if (!cartItemsContainer) return;

    // Limpia el contenedor (excepto el mensaje de vacío)
    const existingItems = cartItemsContainer.querySelectorAll('.cart-item');
    existingItems.forEach(item => item.remove());

    if (cart.length === 0) {
        // Muestra mensaje de carrito vacío
        if (cartEmpty) cartEmpty.style.display = 'flex';
        if (cartFooter) cartFooter.style.display = 'none';
        return;
    }

    // Oculta mensaje de vacío y muestra footer
    if (cartEmpty) cartEmpty.style.display = 'none';
    if (cartFooter) cartFooter.style.display = 'block';

    // Renderiza cada item
    cart.forEach(item => {
        const itemElement = createCartItemElement(item);
        cartItemsContainer.insertBefore(itemElement, cartEmpty);
    });
}

/**
 * Crea el elemento HTML para un item del carrito
 * @param {Object} item - Item del carrito
 * @returns {HTMLElement} Elemento del item
 */
function createCartItemElement(item) {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
        <div class="cart-item-image">
            <img src="${item.image}" alt="${item.shortName}">
        </div>
        <div class="cart-item-details">
            <h4 class="cart-item-name">${item.shortName}</h4>
            <p class="cart-item-variant">Talla: ${item.size} | ${item.color}</p>
            <p class="cart-item-price">${formatPrice(item.price)}</p>
            <div class="cart-item-quantity">
                <button class="qty-btn qty-minus" data-id="${item.productId}" data-size="${item.size}">−</button>
                <span class="qty-value">${item.quantity}</span>
                <button class="qty-btn qty-plus" data-id="${item.productId}" data-size="${item.size}">+</button>
            </div>
        </div>
        <button class="cart-item-remove" data-id="${item.productId}" data-size="${item.size}" aria-label="Eliminar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
        </button>
    `;

    // Event listeners para los botones de cantidad
    const minusBtn = div.querySelector('.qty-minus');
    const plusBtn = div.querySelector('.qty-plus');
    const removeBtn = div.querySelector('.cart-item-remove');

    minusBtn.addEventListener('click', () => {
        updateCartItemQuantity(item.productId, item.size, item.quantity - 1);
    });

    plusBtn.addEventListener('click', () => {
        updateCartItemQuantity(item.productId, item.size, item.quantity + 1);
    });

    removeBtn.addEventListener('click', () => {
        removeFromCart(item.productId, item.size);
    });

    return div;
}

/**
 * Abre el panel del carrito
 */
function openCart() {
    const cartPanel = document.getElementById('cartPanel');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (cartPanel) cartPanel.classList.add('open');
    if (cartOverlay) cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden'; // Previene scroll
}

/**
 * Cierra el panel del carrito
 */
function closeCart() {
    const cartPanel = document.getElementById('cartPanel');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (cartPanel) cartPanel.classList.remove('open');
    if (cartOverlay) cartOverlay.classList.remove('open');
    document.body.style.overflow = ''; // Restaura scroll
}

/**
 * Muestra feedback visual al agregar al carrito
 */
function showAddedToCartFeedback() {
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.classList.add('cart-added');
        setTimeout(() => {
            cartBtn.classList.remove('cart-added');
        }, 600);
    }
}

/**
 * Inicializa los event listeners del carrito
 */
function initCartEvents() {
    // Botón del carrito en el header
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', openCart);
    }

    // Botón cerrar carrito
    const cartClose = document.getElementById('cartClose');
    if (cartClose) {
        cartClose.addEventListener('click', closeCart);
    }

    // Overlay para cerrar
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }

    // Botón continuar comprando (cierra el carrito)
    const continueShopping = document.getElementById('continueShopping');
    if (continueShopping) {
        continueShopping.addEventListener('click', closeCart);
    }

    // Botón checkout (demo - solo muestra alerta)
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            alert('¡Gracias por tu interés!\n\nEsta es una demostración. En la versión final podrás completar tu compra de manera segura.\n\nTotal: ' + formatPrice(getCartTotal()));
        });
    }

    // Tecla Escape para cerrar
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCart();
        }
    });
}

// Inicializa el carrito cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    initCartEvents();
    updateCartUI();
});
