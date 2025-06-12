// autoparts/client/src/pages/Products/ProductsPage.jsx
import styles from './ProductsPage.module.css';
import React, { useState, useEffect } from 'react';
import defaultImage from '../../assets/images/default.png';
import axios from 'axios';

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
    
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const token = localStorage.getItem('token');
  let  id_tipo_cliente = 0
  let id_cliente;
  if (token) {
    const decoded = parseJwt(token);
    id_tipo_cliente = decoded.id_tipo_cliente;
    id_cliente = decoded.id_cliente;
    console.log(decoded);
  } else {
    id_tipo_cliente = 1;
  }

   const [carrito, setCarrito] = useState(null);

  useEffect(() => {
    const fetchCarrito = async () => {
    try {
      const response = await axios.get('/api/mostrarCarritos', {
        params: {
          id_cliente: id_cliente
        }
      });
      setCarrito(response.data[0].ID_CARRITO); 
      //console.log(response.data[0].ID_CARRITO); 
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
    }
  };

  fetchCarrito();
  }, []);

  const handleAddToCart = async (id_producto) => {
    if (!id_cliente) {
      alert('Debes iniciar sesión para añadir productos al carrito.');
      return;
    }

    try {
      const response = await axios.post('/api/agregarCarrito', {
        id_carrito:carrito,
        id_producto: id_producto,
        cantidad: 1,
        id_tipo_cliente: id_tipo_cliente
      });

      alert('Producto añadido al carrito');
      console.log(response.data);
    } catch (error) {
      console.error('Error al añadir al carrito:', error);
      alert('No se pudo añadir el producto al carrito.');
    }
  };

  return (
    <div className={styles.productsContainer}>
      <h1 className={styles.productsTitle}>Nuestros Productos</h1>
      <p className={styles.productsSubtitle}>Explora nuestra amplia selección de productos de alta calidad.</p>

      <div className={styles.productGrid}>
        {productos.map(producto => (
          <div key={producto.id} className={styles.productCard}>
            <img src={defaultImage} alt={producto.nombre} className={styles.productImage} />
            <h3 className={styles.productName}>{producto.nombre}</h3>
            <p className={styles.productDescription}>{producto.descripcion}</p>
            
            <p className={styles.productPrice}>{formatoCLP.format(id_tipo_cliente === 3 ? producto.precio_empresa : producto.precio_cliente)}</p> 
            <div className={styles.productActions}>
              <button className={styles.detailsButton}>Ver Detalles</button>
              <button className={styles.addToCartButton} onClick={()=>handleAddToCart(producto.id)}>Añadir al Carrito</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;