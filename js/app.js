/**
 * app.js - Lógica principal de la aplicación
 * Maneja la renderización de productos y la interacción general
 */

/**
 * Inicializa el menú móvil (hamburguesa)
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    
    if (!menuToggle || !mobileNav) return;

    // Toggle del menú
    menuToggle.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', isOpen);
        
        // Cambia el icono
        if (isOpen) {
            menuToggle.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            `;
        } else {
            menuToggle.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <line x1="3" y1="12" x2="21" y2="12"/>
                    <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
            `;
        }
    });

    // Cierra el menú al hacer click en enlaces con ancla (scroll interno)
    mobileNav.querySelectorAll('a[data-close-menu], a[href^="#"]').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <line x1="3" y1="12" x2="21" y2="12"/>
                    <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
            `;
        });
    });

    // Cierra el menú en resize a desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            mobileNav.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

/**
 * Inicializa la búsqueda móvil
 */
function initMobileSearch() {
    const mobileSearchInput = document.getElementById('mobileSearchInput');
    if (!mobileSearchInput) return;

    mobileSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = mobileSearchInput.value.trim();
            if (query) {
                const results = searchProducts(query);
                if (results.length > 0) {
                    renderProducts(results, 'productsGrid');
                    // Cierra menú móvil
                    document.getElementById('mobileNav')?.classList.remove('open');
                    document.getElementById('menuToggle')?.setAttribute('aria-expanded', 'false');
                    // Scroll al grid
                    document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                    alert('No se encontraron productos con: ' + query);
                }
            }
        }
    });
}

/**
 * Crea el HTML de una card de producto
 * @param {Object} product - Datos del producto
 * @returns {string} HTML de la card
 */
function createProductCard(product) {
    const tagHTML = product.isNew 
        ? '<span class="product-card-tag">Nuevo</span>' 
        : product.isBestseller 
            ? '<span class="product-card-tag bestseller">Popular</span>' 
            : '';

    return `
        <article class="product-card" data-id="${product.id}">
            <a href="product.html?id=${product.id}" class="product-card-link">
                <div class="product-card-image">
                    ${tagHTML}
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-card-info">
                    <h3 class="product-card-name">${product.name}</h3>
                    <p class="product-card-color">${product.color}</p>
                    <p class="product-card-price">${formatPrice(product.price)}</p>
                </div>
            </a>
            <button class="product-card-btn" onclick="quickAddToCart(${product.id}, event)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                Agregar
            </button>
        </article>
    `;
}

/**
 * Renderiza productos en un contenedor
 * @param {Array} products - Lista de productos
 * @param {string} containerId - ID del contenedor
 */
function renderProducts(products, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = products.map(product => createProductCard(product)).join('');
}

/**
 * Agrega producto al carrito rápidamente (sin seleccionar talla)
 * @param {number} productId - ID del producto
 * @param {Event} event - Evento del click
 */
function quickAddToCart(productId, event) {
    event.preventDefault();
    event.stopPropagation();
    
    // Talla por defecto para quick add
    addToCart(productId, '25', 1);
    
    // Feedback visual en el botón
    const btn = event.currentTarget;
    const originalText = btn.innerHTML;
    btn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
        </svg>
        Agregado
    `;
    btn.classList.add('added');
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.classList.remove('added');
    }, 1500);
}

/**
 * Inicializa la búsqueda de productos
 */
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                // En el piloto, simplemente filtra los productos visibles
                const results = searchProducts(query);
                if (results.length > 0) {
                    renderProducts(results, 'productsGrid');
                    // Scroll al grid de productos
                    document.getElementById('productos').scrollIntoView({ 
                        behavior: 'smooth' 
                    });
                } else {
                    alert('No se encontraron productos con: ' + query);
                }
            }
        }
    });
}

/**
 * Inicializa animaciones de scroll
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observa elementos con la clase 'fade-in'
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Observa las cards de producto
    document.querySelectorAll('.product-card').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Inicializa el smooth scroll para links internos
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Cierra el carrito si está abierto
                closeCart();
                
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Inicializa el efecto del header al hacer scroll
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

/**
 * Inicialización principal cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', () => {
    // Renderiza productos en la página principal
    const newProductsGrid = document.getElementById('newProductsGrid');
    const productsGrid = document.getElementById('productsGrid');

    if (newProductsGrid) {
        // Productos nuevos (4 productos)
        const newProducts = getNewProducts(4);
        renderProducts(newProducts, 'newProductsGrid');
    }

    if (productsGrid) {
        // Productos más vendidos (8 productos)
        const bestsellers = getBestsellerProducts(8);
        // Si no hay suficientes bestsellers, completa con todos los productos
        const allProducts = bestsellers.length >= 8 ? bestsellers : getAllProducts();
        renderProducts(allProducts, 'productsGrid');
    }

    // Inicializa funcionalidades
    initMobileMenu();
    initMobileSearch();
    initSearch();
    initSmoothScroll();
    initHeaderScroll();

    // Inicializa animaciones después de un pequeño delay
    setTimeout(initScrollAnimations, 100);

    console.log('🏪 Converse Oaxaca - Tienda Demo cargada correctamente');
});
