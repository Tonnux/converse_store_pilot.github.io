# Converse Oaxaca - Tienda Online

> Tienda online moderna de calzado Converse para el mercado mexicano. Proyecto piloto con diseño elegante y funcionalidades de e-commerce.

---

## Vista Previa

| Página Principal | Detalle de Producto |
|------------------|---------------------|
| Hero section con nueva colección | Galería de imágenes |
| Catálogo de productos | Selector de tallas |
| Carrito lateral deslizante | Productos relacionados |

---

## Características Principales

- **Catálogo dinámico** - Productos cargados desde JavaScript con categorías y filtros
- **Carrito de compras** - Panel lateral con persistencia en localStorage
- **Búsqueda en tiempo real** - Filtrado instantáneo de productos
- **Diseño responsive** - Optimizado para móvil, tablet y escritorio
- **UI/UX moderno** - Animaciones suaves y transiciones elegantes
- **Precios en MXN** - Formato de moneda mexicana
- **SEO friendly** - Estructura semántica HTML5

---

## Tecnologías Utilizadas

| Tecnología | Uso |
|------------|-----|
| HTML5 | Estructura semántica |
| CSS3 | Estilos, Flexbox, Grid, animaciones |
| JavaScript (ES6+) | Lógica de negocio, DOM manipulation |
| Google Fonts | Tipografía Inter |
| Unsplash | Imágenes de productos |

> **Nota:** Proyecto 100% vanilla (sin frameworks ni dependencias externas)

---

## Estructura del Proyecto

```
converse_store/
├── index.html          # Página principal con catálogo
├── product.html        # Página de detalle de producto
├── css/
│   └── styles.css      # Estilos globales
├── js/
│   ├── data.js         # Base de datos de productos (mock)
│   ├── app.js          # Lógica principal de la aplicación
│   ├── cart.js         # Gestión del carrito de compras
│   └── product.js      # Lógica de la página de producto
└── README.md           # Documentación
```

---

## Instalación y Uso

### Opción 1: Abrir directamente

1. Descarga o clona el repositorio
2. Abre `index.html` en tu navegador

### Opción 2: Servidor local (recomendado)

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (npx)
npx serve .

# Con PHP
php -S localhost:8000
```

Luego visita: `http://localhost:8000`

---

## Funcionalidades

### Catálogo de Productos
- Vista de productos nuevos y más vendidos
- Tarjetas con imagen, nombre, precio y botón de compra rápida
- Hover effects y animaciones

### Carrito de Compras
- Panel lateral deslizante
- Agregar/eliminar productos
- Modificar cantidades
- Cálculo automático del subtotal
- Persistencia con localStorage

### Página de Producto
- Galería de imágenes con miniaturas
- Descripción detallada
- Selector de tallas
- Productos relacionados

### Búsqueda
- Búsqueda por nombre, color o categoría
- Resultados en tiempo real

---

## Personalización

### Modificar Productos

Edita el archivo `js/data.js` para agregar, modificar o eliminar productos:

```javascript
{
    id: 9,
    name: "Nuevo Producto",
    shortName: "Producto Corto",
    price: 1599,
    description: "Descripción del producto...",
    image: "url_de_imagen.jpg",
    images: ["imagen1.jpg", "imagen2.jpg"],
    category: "clasicos",
    isNew: true,
    isBestseller: false,
    color: "Azul"
}
```

### Modificar Estilos

Los colores principales están en `css/styles.css`:

```css
:root {
    --color-primary: #000000;
    --color-accent: #f5f5f5;
    /* ... más variables */
}
```

---

## Categorías de Productos

| Categoría | Descripción |
|-----------|-------------|
| `clasicos` | Chuck Taylor tradicionales |
| `premium` | Línea Chuck 70 y piel |
| `plataforma` | Run Star Hike y Platform |
| `mujer` | Diseños específicos para mujer |

---

## Próximas Mejoras

- [ ] Integración con pasarela de pago
- [ ] Sistema de autenticación de usuarios
- [ ] Panel de administración
- [ ] Gestión de inventario
- [ ] Notificaciones por email
- [ ] Wishlist / Lista de deseos

---

## Información de la Tienda

**Converse Oaxaca**  
Centro Histórico, Oaxaca de Juárez  
Horario: Lunes a Sábado 10:00 - 20:00  
Teléfono: +52 951 123 4567  
Email: contacto@converseoaxaca.mx

> Envío gratis en compras mayores a $1,499 MXN

---

## Licencia

Este proyecto es una demostración con fines educativos. Las imágenes son de [Unsplash](https://unsplash.com) y la marca Converse pertenece a sus respectivos propietarios.

---

Desarrollado con pasión en Oaxaca, México
