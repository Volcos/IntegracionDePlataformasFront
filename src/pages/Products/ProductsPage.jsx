// autoparts/client/src/pages/Products/ProductsPage.jsx
import React from 'react';
import styles from './ProductsPage.module.css';

// Datos de productos de ejemplo (en el futuro, estos vendrían de tu web service)
const products = [
  {
    id: 1,
    name: 'Faro Delantero LED',
    description: 'Luces LED de alta intensidad para mayor visibilidad y seguridad.',
    price: 85.99,
    imageUrl: 'https://via.placeholder.com/200x200?text=Faro+LED' // Placeholder
  },
  {
    id: 2,
    name: 'Kit de Frenos Cerámicos',
    description: 'Rendimiento y durabilidad superiores para una frenada óptima.',
    price: 249.50,
    imageUrl: 'https://via.placeholder.com/200x200?text=Frenos'
  },
  {
    id: 3,
    name: 'Filtro de Aire Deportivo',
    description: 'Mejora el rendimiento del motor y la eficiencia del combustible.',
    price: 45.00,
    imageUrl: 'https://via.placeholder.com/200x200?text=Filtro+Aire'
  },
  {
    id: 4,
    name: 'Amortiguador Reforzado',
    description: 'Proporciona mayor estabilidad y confort en todo tipo de terrenos.',
    price: 120.75,
    imageUrl: 'https://via.placeholder.com/200x200?text=Amortiguador'
  },
  {
    id: 5,
    name: 'Batería de Alto Rendimiento',
    description: 'Garantiza un arranque fiable y potencia duradera para tu vehículo.',
    price: 99.99,
    imageUrl: 'https://via.placeholder.com/200x200?text=Bateria'
  },
  {
    id: 6,
    name: 'Neumático Todo Terreno',
    description: 'Diseñado para ofrecer tracción y durabilidad en cualquier condición.',
    price: 155.20,
    imageUrl: 'https://via.placeholder.com/200x200?text=Neumatico'
  },
  {
    id: 7,
    name: 'Bujía de Iridio (x4)',
    description: 'Mejora la ignición y la eficiencia del motor.',
    price: 30.00,
    imageUrl: 'https://via.placeholder.com/200x200?text=Bujia'
  },
  {
    id: 8,
    name: 'Aceite Sintético 5W-30',
    description: 'Protección superior del motor y mayor vida útil.',
    price: 60.00,
    imageUrl: 'https://via.placeholder.com/200x200?text=Aceite'
  },
];

function ProductsPage() {
  return (
    <div className={styles.productsContainer}>
      <h1 className={styles.productsTitle}>Nuestros Productos</h1>
      <p className={styles.productsSubtitle}>Explora nuestra amplia selección de autopartes de alta calidad.</p>

      <div className={styles.productGrid}>
        {products.map(product => (
          <div key={product.id} className={styles.productCard}>
            <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productDescription}>{product.description}</p>
            <p className={styles.productPrice}>${product.price.toFixed(2)}</p> {/* Formato de precio */}
            <div className={styles.productActions}>
              <button className={styles.detailsButton}>Ver Detalles</button>
              <button className={styles.addToCartButton}>Añadir al Carrito</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;