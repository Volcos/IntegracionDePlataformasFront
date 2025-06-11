// autoparts/client/src/pages/Products/ProductsPage.jsx
import styles from './ProductsPage.module.css';
import React, { useState, useEffect } from 'react';
import defaultImage from '../../assets/images/default.png';

const formatoCLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  minimumFractionDigits: 0, 
});

function ProductsPage() {
  const [productos, setProductos] = useState([]); 
 
  useEffect(() => {
  fetch('/api/consultarProductos')
    .then(res => res.json())
    .then(data => setProductos(data)) 
    .catch(err => console.error(err));
  }, []);

  return (
    <div className={styles.productsContainer}>
      <h1 className={styles.productsTitle}>Nuestros Productos</h1>
      <p className={styles.productsSubtitle}>Explora nuestra amplia selección de autopartes de alta calidad.</p>

      <div className={styles.productGrid}>
        {productos.map(producto => (
          <div key={producto.id} className={styles.productCard}>
            <img src={defaultImage} alt={producto.nombre} className={styles.productImage} />
            <h3 className={styles.productName}>{producto.nombre}</h3>
            <p className={styles.productDescription}>{producto.descripcion}</p>
            <p className={styles.productPrice}>{formatoCLP.format(producto.precio_cliente)}</p> 
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