/**
 * data.js - Base de datos de productos (mock)
 * Contiene todos los productos de la tienda Converse Oaxaca
 * 
 * CATEGORÍAS:
 * - calzado: Calzado adulto (tallas normales)
 * - accesorios: Mochilas, Collares
 * - juvenil: Calzado juvenil (tallas más pequeñas)
 * - infantil: Calzado infantil (niños pequeños)
 */

// Constantes de categorías
const CATEGORIES = {
    ALL: 'todos',
    FOOTWEAR: 'calzado',
    ACCESSORIES: 'accesorios',
    YOUTH: 'juvenil',
    KIDS: 'infantil'
};

// Labels para UI
const CATEGORY_LABELS = {
    [CATEGORIES.ALL]: 'Todos',
    [CATEGORIES.FOOTWEAR]: 'Calzado',
    [CATEGORIES.ACCESSORIES]: 'Accesorios',
    [CATEGORIES.YOUTH]: 'Juvenil',
    [CATEGORIES.KIDS]: 'Infantil'
};

const PRODUCTS = [
    // ========================================
    // CALZADO ADULTO (8 productos)
    // ========================================
    {
        id: 1,
        name: "Chuck Taylor All Star High Top Negro",
        shortName: "Chuck Taylor High Negro",
        price: 1499,
        description: "El icónico Chuck Taylor All Star que ha definido el estilo urbano por generaciones. Confeccionado en lona de alta calidad con la clásica puntera de caucho y suela vulcanizada.",
        image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600&q=80",
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80"
        ],
        category: CATEGORIES.FOOTWEAR,
        isNew: false,
        isBestseller: true,
        color: "Negro"
    },
    {
        id: 2,
        name: "Chuck Taylor All Star Low Top Blanco",
        shortName: "Chuck Taylor Low Blanco",
        price: 1399,
        description: "Versión low top del legendario Chuck Taylor en blanco óptico. Perfecto para combinar con cualquier outfit. Lona premium, plantilla OrthoLite.",
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80",
            "https://images.unsplash.com/photo-1465453869711-7e174808ace9?w=600&q=80"
        ],
        category: CATEGORIES.FOOTWEAR,
        isNew: false,
        isBestseller: true,
        color: "Blanco"
    },
    {
        id: 3,
        name: "Chuck 70 High Top Vintage Canvas",
        shortName: "Chuck 70 Vintage",
        price: 1899,
        description: "La versión premium del Chuck Taylor inspirada en el modelo de los años 70. Lona más gruesa, mejor amortiguación y detalles vintage.",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80",
            "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600&q=80"
        ],
        category: CATEGORIES.FOOTWEAR,
        isNew: true,
        isBestseller: false,
        color: "Negro"
    },
    {
        id: 4,
        name: "Chuck Taylor All Star Platform Blanco",
        shortName: "Chuck Taylor Platform",
        price: 1699,
        description: "El clásico Chuck Taylor elevado con una plataforma de 4cm. Mantiene la esencia original con un toque moderno que estiliza cualquier look.",
        image: "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=600&q=80",
            "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80"
        ],
        category: CATEGORIES.FOOTWEAR,
        isNew: true,
        isBestseller: true,
        color: "Blanco"
    },
    {
        id: 5,
        name: "Run Star Hike Platform Negro",
        shortName: "Run Star Hike",
        price: 2199,
        description: "Diseño vanguardista con plataforma escalonada y suela dentada. Una reinterpretación audaz del Chuck Taylor para quienes buscan destacar.",
        image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=600&q=80",
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80"
        ],
        category: CATEGORIES.FOOTWEAR,
        isNew: true,
        isBestseller: false,
        color: "Negro"
    },
    {
        id: 6,
        name: "Chuck Taylor All Star High Top Rojo",
        shortName: "Chuck Taylor Rojo",
        price: 1499,
        description: "El clásico Chuck Taylor en rojo vibrante. Un statement piece que añade personalidad a cualquier outfit.",
        image: "https://images.unsplash.com/photo-1465453869711-7e174808ace9?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1465453869711-7e174808ace9?w=600&q=80",
            "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80"
        ],
        category: CATEGORIES.FOOTWEAR,
        isNew: false,
        isBestseller: true,
        color: "Rojo"
    },
    {
        id: 7,
        name: "Chuck 70 Low Top Parchment",
        shortName: "Chuck 70 Parchment",
        price: 1799,
        description: "Versión low top del premium Chuck 70 en tono parchment (crema). Lona de algodón orgánico, plantilla de espuma con memoria.",
        image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&q=80",
            "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&q=80"
        ],
        category: CATEGORIES.FOOTWEAR,
        isNew: true,
        isBestseller: false,
        color: "Crema"
    },
    {
        id: 8,
        name: "Chuck Taylor All Star Leather Negro",
        shortName: "Chuck Taylor Leather",
        price: 1899,
        description: "Versión en piel genuina del icónico Chuck Taylor. Acabado premium que mejora con el uso.",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80"
        ],
        category: CATEGORIES.FOOTWEAR,
        isNew: false,
        isBestseller: true,
        color: "Negro"
    },

    // ========================================
    // ACCESORIOS (2 productos)
    // ========================================
    {
        id: 9,
        name: "Mochila Converse Go 2",
        shortName: "Mochila Converse",
        price: 899,
        description: "Mochila Converse Go 2 con compartimento principal amplio, bolsillo frontal y tirantes acolchados. Logo Converse bordado.",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80"
        ],
        category: CATEGORIES.ACCESSORIES,
        isNew: true,
        isBestseller: false,
        color: "Negro"
    },
    {
        id: 10,
        name: "Collar Estrella All Star",
        shortName: "Collar Converse",
        price: 349,
        description: "Collar con dije de estrella All Star en acero inoxidable. Cadena ajustable, estilo urbano.",
        image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80"
        ],
        category: CATEGORIES.ACCESSORIES,
        isNew: true,
        isBestseller: false,
        color: "Plateado"
    },

    // ========================================
    // JUVENIL (2 productos)
    // ========================================
    {
        id: 11,
        name: "Chuck Taylor All Star Juvenil Negro",
        shortName: "Chuck Taylor Juvenil",
        price: 1199,
        description: "El clásico Chuck Taylor en tallas juveniles. Mismo estilo icónico adaptado para jóvenes. Lona duradera y suela de caucho.",
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80"
        ],
        category: CATEGORIES.YOUTH,
        isNew: false,
        isBestseller: true,
        color: "Negro"
    },
    {
        id: 12,
        name: "Chuck Taylor All Star Juvenil Blanco",
        shortName: "Chuck Taylor Juvenil Blanco",
        price: 1199,
        description: "Chuck Taylor en blanco para jóvenes. El estilo clásico que combina con todo, en tallas juveniles.",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&q=80"
        ],
        category: CATEGORIES.YOUTH,
        isNew: true,
        isBestseller: false,
        color: "Blanco"
    },

    // ========================================
    // INFANTIL (2 productos)
    // ========================================
    {
        id: 13,
        name: "Chuck Taylor All Star Infantil Rojo",
        shortName: "Chuck Taylor Infantil",
        price: 899,
        description: "El icónico Chuck Taylor para los más pequeños. Fácil de poner con velcro o agujetas elásticas.",
        image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=600&q=80"
        ],
        category: CATEGORIES.KIDS,
        isNew: false,
        isBestseller: true,
        color: "Rojo"
    },
    {
        id: 14,
        name: "Chuck Taylor All Star Infantil Azul",
        shortName: "Chuck Taylor Infantil Azul",
        price: 899,
        description: "Chuck Taylor en azul vibrante para niños. Diseño clásico con cierre fácil.",
        image: "https://images.unsplash.com/photo-1520256862855-398228c41684?w=600&q=80",
        images: [
            "https://images.unsplash.com/photo-1520256862855-398228c41684?w=600&q=80"
        ],
        category: CATEGORIES.KIDS,
        isNew: true,
        isBestseller: false,
        color: "Azul"
    }
];

// ========================================
// FUNCIONES DE ACCESO A DATOS
// ========================================

function getAllProducts() {
    return PRODUCTS;
}

function getProductById(id) {
    return PRODUCTS.find(product => product.id === parseInt(id)) || null;
}

function getProductsByCategory(category) {
    if (category === CATEGORIES.ALL) {
        return PRODUCTS;
    }
    return PRODUCTS.filter(product => product.category === category);
}

function getNewProducts(limit = 4) {
    return PRODUCTS.filter(product => product.isNew).slice(0, limit);
}

function getBestsellerProducts(limit = 8) {
    return PRODUCTS.filter(product => product.isBestseller).slice(0, limit);
}

function getRelatedProducts(currentId, limit = 4) {
    const currentProduct = getProductById(currentId);
    if (!currentProduct) {
        return PRODUCTS.slice(0, limit);
    }
    
    const sameCategory = PRODUCTS
        .filter(p => p.id !== parseInt(currentId) && p.category === currentProduct.category);
    
    const others = PRODUCTS
        .filter(p => p.id !== parseInt(currentId) && p.category !== currentProduct.category);
    
    return [...sameCategory, ...others].slice(0, limit);
}

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

function formatPrice(price) {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}
