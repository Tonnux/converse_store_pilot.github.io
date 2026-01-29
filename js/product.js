/**
 * product.js - Lógica de la página de detalle de producto
 * Maneja la carga del producto, selección de talla y agregar al carrito
 */

// Variables globales para el producto actual
let currentProduct = null;
let selectedSize = null;

/**
 * Inicializa el menú móvil (hamburguesa) - versión para product.html
 */
function initMobileMenuProduct() {
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

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
            mobileNav.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

/**
 * Obtiene el ID del producto desde la URL
 * @returns {string|null} ID del producto o null
 */
function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

/**
 * Carga y muestra el producto en la página
 */
function loadProduct() {
    const productId = getProductIdFromURL();
    
    if (!productId) {
        showProductError();
        return;
    }

    const product = getProductById(productId);
    
    if (!product) {
        showProductError();
        return;
    }

    currentProduct = product;
    renderProduct(product);
    loadRelatedProducts(productId);
}

/**
 * Muestra error cuando no se encuentra el producto
 */
function showProductError() {
    const container = document.querySelector('.product-detail-container');
    if (container) {
        container.innerHTML = `
            <div class="product-not-found">
                <h2>Producto no encontrado</h2>
                <p>Lo sentimos, el producto que buscas no está disponible.</p>
                <a href="index.html" class="btn btn-primary">Volver al inicio</a>
            </div>
        `;
    }
}

/**
 * Renderiza el producto en la página
 * @param {Object} product - Datos del producto
 */
function renderProduct(product) {
    // Actualiza el título de la página
    document.title = `${product.name} | Converse Oaxaca`;

    // Actualiza el breadcrumb
    const breadcrumb = document.getElementById('breadcrumbProduct');
    if (breadcrumb) {
        breadcrumb.textContent = product.shortName;
    }

    // Imagen principal
    const productImage = document.getElementById('productImage');
    if (productImage) {
        productImage.src = product.image;
        productImage.alt = product.name;
    }

    // Thumbnails (si hay múltiples imágenes)
    renderThumbnails(product.images);

    // Tag (nuevo/bestseller)
    const productTag = document.getElementById('productTag');
    if (productTag) {
        if (product.isNew) {
            productTag.textContent = 'Nuevo';
            productTag.style.display = 'inline-block';
        } else if (product.isBestseller) {
            productTag.textContent = 'Popular';
            productTag.className = 'product-tag bestseller';
            productTag.style.display = 'inline-block';
        } else {
            productTag.style.display = 'none';
        }
    }

    // Título
    const productTitle = document.getElementById('productTitle');
    if (productTitle) {
        productTitle.textContent = product.name;
    }

    // Precio
    const productPrice = document.getElementById('productPrice');
    if (productPrice) {
        productPrice.textContent = formatPrice(product.price);
    }

    // Descripción
    const productDescription = document.getElementById('productDescription');
    if (productDescription) {
        productDescription.textContent = product.description;
    }

    // Inicializa los selectores de talla
    initSizeSelector();
}

/**
 * Renderiza las miniaturas de imágenes
 * @param {Array} images - URLs de las imágenes
 */
function renderThumbnails(images) {
    const container = document.getElementById('productThumbnails');
    if (!container || !images || images.length <= 1) {
        if (container) container.style.display = 'none';
        return;
    }

    container.innerHTML = images.map((img, index) => `
        <button class="thumbnail ${index === 0 ? 'active' : ''}" data-image="${img}">
            <img src="${img}" alt="Vista ${index + 1}">
        </button>
    `).join('');

    // Event listeners para las miniaturas
    container.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.addEventListener('click', () => {
            // Actualiza imagen principal
            const mainImage = document.getElementById('productImage');
            if (mainImage) {
                mainImage.src = thumb.dataset.image;
            }

            // Actualiza estado activo
            container.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });
}

/**
 * Inicializa el selector de tallas
 */
function initSizeSelector() {
    const sizeButtons = document.querySelectorAll('.size-btn');
    
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Quita la selección anterior
            sizeButtons.forEach(b => b.classList.remove('selected'));
            
            // Selecciona la nueva talla
            btn.classList.add('selected');
            selectedSize = btn.dataset.size;
            
            // Actualiza el botón de agregar al carrito
            updateAddToCartButton(true);
        });
    });
}

/**
 * Actualiza el estado del botón de agregar al carrito
 * @param {boolean} sizeSelected - Si hay una talla seleccionada
 */
function updateAddToCartButton(sizeSelected) {
    const addBtn = document.getElementById('addToCartBtn');
    if (!addBtn) return;

    if (sizeSelected) {
        addBtn.disabled = false;
        addBtn.classList.remove('disabled');
    } else {
        addBtn.disabled = true;
        addBtn.classList.add('disabled');
    }
}

/**
 * Maneja el click en agregar al carrito
 */
function handleAddToCart() {
    if (!currentProduct) return;

    if (!selectedSize) {
        // Si no hay talla seleccionada, muestra mensaje
        alert('Por favor selecciona una talla');
        return;
    }

    // Agrega al carrito
    addToCart(currentProduct.id, selectedSize, 1);

    // Feedback visual en el botón
    const addBtn = document.getElementById('addToCartBtn');
    if (addBtn) {
        const originalHTML = addBtn.innerHTML;
        addBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
            </svg>
            ¡Agregado al carrito!
        `;
        addBtn.classList.add('added');

        setTimeout(() => {
            addBtn.innerHTML = originalHTML;
            addBtn.classList.remove('added');
        }, 2000);
    }
}

/**
 * Carga productos relacionados
 * @param {number} currentId - ID del producto actual
 */
function loadRelatedProducts(currentId) {
    const container = document.getElementById('relatedProducts');
    if (!container) return;

    const related = getRelatedProducts(currentId, 4);
    
    container.innerHTML = related.map(product => `
        <article class="product-card" data-id="${product.id}">
            <a href="product.html?id=${product.id}" class="product-card-link">
                <div class="product-card-image">
                    ${product.isNew ? '<span class="product-card-tag">Nuevo</span>' : ''}
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-card-info">
                    <h3 class="product-card-name">${product.name}</h3>
                    <p class="product-card-color">${product.color}</p>
                    <p class="product-card-price">${formatPrice(product.price)}</p>
                </div>
            </a>
        </article>
    `).join('');
}

/**
 * Inicialización cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa menú móvil
    initMobileMenuProduct();
    
    // Carga el producto
    loadProduct();

    // Event listener para el botón de agregar al carrito
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', handleAddToCart);
    }

    // Inicializa el header scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    console.log('📦 Página de producto cargada');
});
