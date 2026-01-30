/**
 * app.js - Lógica principal de la aplicación
 * Maneja la renderización de productos, filtros y navegación
 * 
 * ESTRUCTURA MODULAR para fácil migración a React:
 * - Funciones pequeñas y reutilizables
 * - Estado mínimo en variables globales
 * - Dependencia de data-attributes, no de estilos
 */

// Estado actual del filtro activo
let currentFilter = 'todos';

// ========================================
// MENÚ MÓVIL
// ========================================

/**
 * Inicializa el menú móvil (hamburguesa)
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    
    if (!menuToggle || !mobileNav) return;

    // Toggle del menú principal
    menuToggle.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', isOpen);
        updateMenuIcon(menuToggle, isOpen);
    });

    // Cierra el menú al hacer click en enlaces con data-close-menu
    mobileNav.querySelectorAll('[data-close-menu]').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Cierra el menú en resize a desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            closeMobileMenu();
        }
    });
}

/**
 * Cierra el menú móvil
 */
function closeMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    
    if (mobileNav) mobileNav.classList.remove('open');
    if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
        updateMenuIcon(menuToggle, false);
    }
}

/**
 * Actualiza el icono del menú hamburguesa
 */
function updateMenuIcon(button, isOpen) {
    if (isOpen) {
        button.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
        `;
    } else {
        button.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
        `;
    }
}

// ========================================
// RENDERIZADO DE PRODUCTOS
// ========================================

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
        <article class="product-card" data-id="${product.id}" data-category="${product.category}">
            <a href="product.html?id=${product.id}" class="product-card-link">
                <div class="product-card-image">
                    ${tagHTML}
                    <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.parentElement.classList.add('img-error')">
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

    if (products.length === 0) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = products.map(product => createProductCard(product)).join('');
}

// ========================================
// FILTROS DE CATEGORÍA
// ========================================

/**
 * Inicializa los filtros de productos
 */
function initFilters() {
    const filtersBar = document.getElementById('filtersBar');
    if (!filtersBar) return;
    
    const filterButtons = filtersBar.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            applyFilter(filter);
            
            // Actualiza estado visual de botones
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    // También escucha clicks en elementos con data-filter fuera de la barra
    document.querySelectorAll('[data-filter]').forEach(el => {
        if (el.closest('#filtersBar')) return; // Ya manejado arriba
        
        el.addEventListener('click', (e) => {
            const filter = el.dataset.filter;
            if (filter) {
                // Pequeño delay para permitir navegación smooth
                setTimeout(() => {
                    applyFilter(filter);
                    
                    // Actualiza botones de filtro
                    filterButtons.forEach(b => {
                        b.classList.toggle('active', b.dataset.filter === filter);
                    });
                }, 100);
            }
        });
    });
}

/**
 * Aplica un filtro de categoría
 * @param {string} filter - Categoría a filtrar (todos, calzado, accesorios, juvenil, infantil)
 */
function applyFilter(filter) {
    currentFilter = filter;
    
    const products = filter === 'todos' 
        ? getAllProducts() 
        : getProductsByCategory(filter);
    
    renderProducts(products, 'productsGrid');
    
    // Oculta/muestra estado vacío
    const emptyState = document.getElementById('searchEmptyState');
    const productsGrid = document.getElementById('productsGrid');
    
    if (products.length === 0) {
        if (emptyState) {
            emptyState.style.display = 'flex';
            const querySpan = emptyState.querySelector('.search-query');
            if (querySpan) querySpan.textContent = CATEGORY_LABELS[filter] || filter;
        }
        if (productsGrid) productsGrid.style.display = 'none';
    } else {
        if (emptyState) emptyState.style.display = 'none';
        if (productsGrid) productsGrid.style.display = 'grid';
    }
    
    // Limpia input de búsqueda
    const searchInput = document.getElementById('searchInput');
    const mobileSearchInput = document.getElementById('mobileSearchInput');
    if (searchInput) searchInput.value = '';
    if (mobileSearchInput) mobileSearchInput.value = '';
}

// ========================================
// BÚSQUEDA
// ========================================

/**
 * Muestra el estado vacío de búsqueda
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
        if (querySpan) querySpan.textContent = query;
    }
}

/**
 * Oculta el estado vacío
 */
function hideEmptySearchState() {
    const productsGrid = document.getElementById('productsGrid');
    const emptyState = document.getElementById('searchEmptyState');
    
    if (emptyState) emptyState.style.display = 'none';
    if (productsGrid) productsGrid.style.display = 'grid';
}

/**
 * Limpia la búsqueda y muestra todos los productos
 */
function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    const mobileSearchInput = document.getElementById('mobileSearchInput');
    
    if (searchInput) searchInput.value = '';
    if (mobileSearchInput) mobileSearchInput.value = '';
    
    currentFilter = 'todos';
    hideEmptySearchState();
    
    // Reset botones de filtro
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === 'todos');
    });
    
    renderProducts(getAllProducts(), 'productsGrid');
}

/**
 * Ejecuta la búsqueda en tiempo real
 */
function performSearch(query) {
    const trimmedQuery = query.trim();
    
    if (trimmedQuery === '') {
        hideEmptySearchState();
        applyFilter(currentFilter);
        return;
    }
    
    const results = searchProducts(trimmedQuery);
    
    // Reset filtro visual
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (results.length === 0) {
        showEmptySearchState(trimmedQuery);
    } else {
        hideEmptySearchState();
        renderProducts(results, 'productsGrid');
    }
    
    // Scroll suave al grid
    const productosSection = document.getElementById('productos');
    if (productosSection && trimmedQuery.length >= 2) {
        productosSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Inicializa la búsqueda en tiempo real
 */
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const mobileSearchInput = document.getElementById('mobileSearchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => performSearch(e.target.value));
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(e.target.value);
            }
        });
    }
    
    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('input', (e) => {
            performSearch(e.target.value);
            if (searchInput) searchInput.value = e.target.value;
        });
        mobileSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(e.target.value);
                closeMobileMenu();
            }
        });
    }
    
    // Botón "Ver todo" en estado vacío
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            clearSearch();
        });
    }
}

// ========================================
// CARRITO RÁPIDO
// ========================================

/**
 * Agrega producto al carrito rápidamente
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

// ========================================
// UTILIDADES
// ========================================

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

    document.querySelectorAll('.fade-in, .product-card, .category-card').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Inicializa smooth scroll para links internos
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                closeCart();
                closeMobileMenu();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Inicializa efecto del header al hacer scroll
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ========================================
// INICIALIZACIÓN
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Renderiza productos nuevos
    const newProductsGrid = document.getElementById('newProductsGrid');
    if (newProductsGrid) {
        const newProducts = getNewProducts(4);
        renderProducts(newProducts, 'newProductsGrid');
    }

    // Renderiza catálogo completo
    const productsGrid = document.getElementById('productsGrid');
    if (productsGrid) {
        renderProducts(getAllProducts(), 'productsGrid');
    }

    // Inicializa todas las funcionalidades
    initMobileMenu();
    initFilters();
    initSearch();
    initSmoothScroll();
    initHeaderScroll();

    setTimeout(initScrollAnimations, 100);

    console.log('🏪 Converse Oaxaca - Tienda cargada');
});
