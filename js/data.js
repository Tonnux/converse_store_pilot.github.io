/**
 * data.js - Base de datos de productos (mock)
 * Contiene todos los productos de la tienda Converse Oaxaca
 * Imágenes: sneakers tipo canvas sin logos de otras marcas
 */

const PRODUCTS = [
    {
        id: 1,
        name: "Chuck Taylor All Star High Top Negro",
        shortName: "Chuck Taylor High Negro",
        price: 1499,
        description: "El icónico Chuck Taylor All Star que ha definido el estilo urbano por generaciones. Confeccionado en lona de alta calidad con la clásica puntera de caucho y suela vulcanizada. Un clásico que nunca pasa de moda.",
        image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600&q=80",
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80"
        ],
        category: "clasicos",
        isNew: false,
        isBestseller: true,
        color: "Negro"
    },
    {
        id: 2,
        name: "Chuck Taylor All Star Low Top Blanco",
        shortName: "Chuck Taylor Low Blanco",
        price: 1399,
        description: "Versión low top del legendario Chuck Taylor en blanco óptico. Perfecto para combinar con cualquier outfit. Lona premium, plantilla OrthoLite para mayor comodidad durante todo el día.",
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80",
            "https://images.unsplash.com/photo-1465453869711-7e174808ace9?w=600&q=80"
        ],
        category: "clasicos",
        isNew: false,
        isBestseller: true,
        color: "Blanco"
    },
    {
        id: 3,
        name: "Chuck 70 High Top Vintage Canvas",
        shortName: "Chuck 70 Vintage",
        price: 1899,
        description: "La versión premium del Chuck Taylor inspirada en el modelo de los años 70. Lona más gruesa, mejor amortiguación y detalles vintage como el parche de talón brillante. Para los que aprecian la calidad.",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80",
            "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600&q=80"
        ],
        category: "premium",
        isNew: true,
        isBestseller: false,
        color: "Negro"
    },
    {
        id: 4,
        name: "Chuck Taylor All Star Platform Blanco",
        shortName: "Chuck Taylor Platform",
        price: 1699,
        description: "El clásico Chuck Taylor elevado con una plataforma de 4cm. Mantiene la esencia original con un toque moderno que estiliza cualquier look. Comodidad y estilo en cada paso.",
        image: "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=600&q=80",
            "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80"
        ],
        category: "plataforma",
        isNew: true,
        isBestseller: true,
        color: "Blanco"
    },
    {
        id: 5,
        name: "Run Star Hike Platform Negro",
        shortName: "Run Star Hike",
        price: 2199,
        description: "Diseño vanguardista con plataforma escalonada y suela dentada. Una reinterpretación audaz del Chuck Taylor para quienes buscan destacar. Altura de plataforma: 5cm.",
        image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=600&q=80",
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80"
        ],
        category: "plataforma",
        isNew: true,
        isBestseller: false,
        color: "Negro"
    },
    {
        id: 6,
        name: "Chuck Taylor All Star High Top Rojo",
        shortName: "Chuck Taylor Rojo",
        price: 1499,
        description: "El clásico Chuck Taylor en rojo vibrante. Un statement piece que añade personalidad a cualquier outfit. Lona duradera y la comodidad característica de Converse.",
        image: "https://images.unsplash.com/photo-1465453869711-7e174808ace9?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1465453869711-7e174808ace9?w=600&q=80",
            "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80"
        ],
        category: "clasicos",
        isNew: false,
        isBestseller: true,
        color: "Rojo"
    },
    {
        id: 7,
        name: "Chuck 70 Low Top Parchment",
        shortName: "Chuck 70 Parchment",
        price: 1799,
        description: "Versión low top del premium Chuck 70 en tono parchment (crema). Lona de algodón orgánico, plantilla de espuma con memoria y construcción reforzada. Elegancia vintage.",
        image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&q=80",
            "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80"
        ],
        category: "premium",
        isNew: true,
        isBestseller: false,
        color: "Crema"
    },
    {
        id: 8,
        name: "Chuck Taylor All Star Leather Negro",
        shortName: "Chuck Taylor Leather",
        price: 1899,
        description: "Versión en piel genuina del icónico Chuck Taylor. Acabado premium que mejora con el uso. Ideal para un look más sofisticado sin perder la esencia Converse.",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80"
        ],
        category: "premium",
        isNew: false,
        isBestseller: true,
        color: "Negro"
    }
];

/**
 * Obtiene todos los productos
 * @returns {Array} Lista completa de productos
 */
function getAllProducts() {
    return PRODUCTS;
}

/**
 * Obtiene un producto por su ID
 * @param {number} id - ID del producto
 * @returns {Object|null} Producto encontrado o null
 */
function getProductById(id) {
    return PRODUCTS.find(product => product.id === parseInt(id)) || null;
}

/**
 * Obtiene productos nuevos (isNew: true)
 * @param {number} limit - Límite de productos a devolver
 * @returns {Array} Lista de productos nuevos
 */
function getNewProducts(limit = 4) {
    return PRODUCTS.filter(product => product.isNew).slice(0, limit);
}

/**
 * Obtiene productos más vendidos (isBestseller: true)
 * @param {number} limit - Límite de productos a devolver
 * @returns {Array} Lista de productos más vendidos
 */
function getBestsellerProducts(limit = 8) {
    return PRODUCTS.filter(product => product.isBestseller).slice(0, limit);
}

/**
 * Obtiene productos por categoría
 * @param {string} category - Categoría del producto
 * @returns {Array} Lista de productos de esa categoría
 */
function getProductsByCategory(category) {
    return PRODUCTS.filter(product => product.category === category);
}

/**
 * Obtiene productos relacionados (excluyendo el producto actual)
 * @param {number} currentId - ID del producto actual
 * @param {number} limit - Límite de productos a devolver
 * @returns {Array} Lista de productos relacionados
 */
function getRelatedProducts(currentId, limit = 4) {
    return PRODUCTS
        .filter(product => product.id !== parseInt(currentId))
        .sort(() => Math.random() - 0.5)
        .slice(0, limit);
}

/**
 * Busca productos por nombre o color
 * @param {string} query - Término de búsqueda
 * @returns {Array} Lista de productos que coinciden
 */
function searchProducts(query) {
    if (!query || query.trim() === '') {
        return PRODUCTS;
    }
    const searchTerm = query.toLowerCase().trim();
    return PRODUCTS.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.shortName.toLowerCase().includes(searchTerm) ||
        product.color.toLowerCase().includes(searchTerm)
    );
}

/**
 * Formatea precio a moneda mexicana
 * @param {number} price - Precio numérico
 * @returns {string} Precio formateado
 */
function formatPrice(price) {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}
