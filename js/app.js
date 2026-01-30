/**
 * app.js - Lógica principal de la aplicación
 * Maneja la renderización de productos y la interacción general
 */

// Variable para rastrear si hay búsqueda activa
let isSearchActive = false;

/**
 * Inicializa el menú móvil (hamburguesa)
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    
    if (!menuToggle || !mobileNav) return;

    menuToggle.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', isOpen);
        
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

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            mobileNav.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
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
 * Muestra el estado vacío de búsqueda
 * @param {string} query - Término buscado
 */
function showEmptySearchState(query) {
    const productsGrid = document.getElementById('productsGrid');
    const emptyState = document.getElementById('searchEmptyState');
    
    if (productsGrid) {
        productsGrid.innerHTML = '';
        productsGrid.style.display = 'none';
    }
    
    if (emptyState) {
        emptyState.style.display = 'flex';
        const querySpan = emptyState.querySelector('.search-query');
        if (querySpan) {
            querySpan.textContent = query;
        }
    }
}

/**
 * Oculta el estado vacío y muestra el grid
 */
function hideEmptySearchState() {
    const productsGrid = document.getElementById('productsGrid');
    const emptyState = document.getElementById('searchEmptyState');
    
    if (emptyState) {
        emptyState.style.display = 'none';
    }
    
    if (productsGrid) {
        productsGrid.style.display = 'grid';
    }
}

/**
 * Limpia la búsqueda y muestra todos los productos
 */
function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    const mobileSearchInput = document.getElementById('mobileSearchInput');
    
    if (searchInput) searchInput.value = '';
    if (mobileSearchInput) mobileSearchInput.value = '';
    
    isSearchActive = false;
    hideEmptySearchState();
    
    // Muestra todos los productos
    const allProducts = getAllProducts();
    renderProducts(allProducts, 'productsGrid');
}

/**
 * Ejecuta la búsqueda en tiempo real
 * @param {string} query - Término de búsqueda
 */
function performSearch(query) {
    const trimmedQuery = query.trim();
    
    // Si el campo está vacío, muestra todos los productos
    if (trimmedQuery === '') {
        isSearchActive = false;
        hideEmptySearchState();
        const allProducts = getAllProducts();
        renderProducts(allProducts, 'productsGrid');
        return;
    }
    
    isSearchActive = true;
    const results = searchProducts(trimmedQuery);
    
    if (results.length === 0) {
        showEmptySearchState(trimmedQuery);
    } else {
        hideEmptySearchState();
        renderProducts(results, 'productsGrid');
    }
    
    // Scroll suave al grid de productos
    const productosSection = document.getElementById('productos');
    if (productosSection && trimmedQuery.length >= 2) {
        productosSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Agrega producto al carrito rápidamente (sin seleccionar talla)
 * @param {number} productId - ID del producto
 * @param {Event} event - Evento del click
 */
function quickAddToCart(productId, event) {
    event.preventDefault();
    event.stopPropagation();
    
    addToCart(productId, '25', 1);
    
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
 * Inicializa la búsqueda en tiempo real
 */
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const mobileSearchInput = document.getElementById('mobileSearchInput');
    
    // Búsqueda en tiempo real - input desktop
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            performSearch(e.target.value);
        });
        
        // También con Enter para UX esperada
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(e.target.value);
            }
        });
    }
    
    // Búsqueda en tiempo real - input móvil
    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('input', (e) => {
            performSearch(e.target.value);
            // Sincroniza con input desktop
            if (searchInput) searchInput.value = e.target.value;
        });
        
        mobileSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(e.target.value);
                // Cierra menú móvil
                document.getElementById('mobileNav')?.classList.remove('open');
                document.getElementById('menuToggle')?.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Botón "Ver todo" en el estado vacío
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            clearSearch();
        });
    }
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

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

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

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Inicialización principal cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', () => {
    const newProductsGrid = document.getElementById('newProductsGrid');
    const productsGrid = document.getElementById('productsGrid');

    if (newProductsGrid) {
        const newProducts = getNewProducts(4);
        renderProducts(newProducts, 'newProductsGrid');
    }

    if (productsGrid) {
        const allProducts = getAllProducts();
        renderProducts(allProducts, 'productsGrid');
    }

    // Inicializa funcionalidades
    initMobileMenu();
    initSearch();
    initSmoothScroll();
    initHeaderScroll();

    setTimeout(initScrollAnimations, 100);

    console.log('🏪 Converse Oaxaca - Tienda cargada');
});
