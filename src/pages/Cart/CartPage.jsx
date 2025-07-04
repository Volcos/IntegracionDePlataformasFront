// autoparts/client/src/pages/Cart/CartPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importa Link
import styles from './CartPage.module.css';
import axios from 'axios';
import defaultImage from '../../assets/images/default.png';
function CartPage() {
  // Datos de ejemplo para el carrito (mantenerlos aquí por ahora)

  const formatoCLP = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  minimumFractionDigits: 0, 
  });

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const token = localStorage.getItem('token');
  let  id_cliente = 0
  if (token) {
    const decoded = parseJwt(token);
    id_cliente = decoded.id_cliente;
    //console.log(id_cliente);
  }
  const token_tipo_cliente = localStorage.getItem('token');
  let  id_tipo_cliente = 0
  if (token_tipo_cliente) {
    const decoded = parseJwt(token_tipo_cliente);
    id_tipo_cliente = decoded.id_tipo_cliente;
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

  //console.log(carrito);

  const [productos, setProductos] = useState(null);

  useEffect (() => {
    const fetchProductos= async () => {
    if (!carrito) return;

    try {
      const response = await axios.get('/api/devolverProductosCarrito', {
        params: {
          id_carrito: carrito
        }
      });
      console.log(carrito)
      setProductos(response.data); 
      //console.log(response.data); 
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  fetchProductos();
  }, [carrito]);
  
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (!productos || productos.length === 0) return;

    const lista_productos = productos.map(p => ({
      id: p.ID_PRODUCTO,
      name: p.NOMBRE,
      price: p.PRECIO_UNITARIO,
      quantity: p.CANTIDAD,
      imageUrl: defaultImage
  }));

  setCartItems(lista_productos);

}, [productos]);

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const taxRate = 0.19;
    const taxes = subtotal * taxRate;
    const total = subtotal + taxes;

    const handleQuantityChange = async (id_producto, nuevaCantidad) => {
    if (!carrito) return;

    const itemActual = cartItems.find(item => item.id === id_producto);
    const cantidadAnterior = itemActual?.quantity || 0;
    console.log("cantidad anterior: "+ itemActual?.quantity)
    console.log("Cantidad: "+nuevaCantidad);
    if (nuevaCantidad < 1) {
      try {
        await axios.delete('/api/rebajarCarrito', {
          data: {
            id_carrito: carrito,
            id_producto: id_producto,
            cantidad: 1
          }
        });

        const actualizado = cartItems.filter(item => item.id !== id_producto);
        setCartItems(actualizado);
      } catch (error) {
        console.error('Error al eliminar producto:', error);
      }
      return;
    }

    if (nuevaCantidad > cantidadAnterior) {
      try {
        const decoded = parseJwt(token_tipo_cliente);
        await axios.post('/api/agregarCarrito', {
          id_carrito: carrito,
          id_producto: id_producto,
          cantidad: 1,
          id_tipo_cliente: decoded?.tipo_cliente
        });

        const actualizado = cartItems.map(item =>
          item.id === id_producto ? { ...item, quantity: nuevaCantidad } : item
        );
        setCartItems(actualizado);
      } catch (error) {
        console.error('Error al agregar producto:', error);
      }
    } else {
      try {
        await axios.delete('/api/rebajarCarrito', {
          data: {
            id_carrito: carrito,
            id_producto: id_producto,
            cantidad: 1
          }
        });

        const actualizado = cartItems.map(item =>
          item.id === id_producto
            ? { ...item, quantity: nuevaCantidad }
            : item
        );
        setCartItems(actualizado);
      } catch (error) {
        console.error('Error al rebajar producto:', error);
      }
    }
  };

  const handleSetItem = async (id_producto, cantidad) => {
    console.log('id_producto: '+id_producto)
    console.log('cantidad: '+cantidad)
    console.log('id_carrito: '+carrito)
    try {
      if (cantidad>0){
        await axios.put('/api/setCantidad', 
          {
            id_carrito: carrito,
            id_producto: id_producto,
            cantidad: cantidad
          }
        );
      } else {
        await axios.delete('/api/borrarDelCarrito', {
          data: {
            id_carrito: carrito,
            id_producto: id_producto
          }
        });
      }
      
      
    } catch (e) {
      console.log('Error al actualizar el carrito')
    }
  }
  const actualization = (id_producto,cantidad)=>{
    const actualizado = cartItems.map(item =>
      item.id === id_producto ? { ...item, quantity: cantidad } : item
    );
    setCartItems(actualizado);
  };
  const handleRemoveItem = async (id_producto) => {
    if (!carrito) return;

    try {
      await axios.delete('/api/borrarDelCarrito', {
        data: {
          id_carrito: carrito,
          id_producto: id_producto
        }
      });

      const actualizado = cartItems.filter(item => item.id !== id_producto);
      setCartItems(actualizado);
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };


  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.cartTitle}>Tu Carrito de Compras</h1>

      {cartItems.length === 0 ? (
        <p className={styles.emptyCartMessage}>Tu carrito está vacío. ¡Añade algunos productos!</p>
      ) : (
        <div className={styles.cartContent}>
          <div className={styles.cartItemsList}>
            {cartItems.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <img src={item.imageUrl} alt={item.name} className={styles.itemImage} />
                <div className={styles.itemDetails}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.itemPriceUnit}>{formatoCLP.format(item.price)} c/u</p>
                </div>
                <div className={styles.itemQuantityControl}>
                  <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => actualization(item.id, e.target.value)}
                    onBlur={(e) => handleSetItem(item.id, parseInt(e.target.value) || 0)}
                    min="1"
                    className={styles.quantityInput}
                  />
                  <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                </div>
                <p className={styles.itemSubtotal}>{formatoCLP.format(item.price * item.quantity)}</p>
                <button onClick={() => handleRemoveItem(item.id)} className={styles.removeItemButton}>X</button>
              </div>
            ))}
          </div>

          <div className={styles.cartSummary}>
            <h2 className={styles.summaryTitle}>Resumen del Pedido</h2>
            <div className={styles.summaryRow}>
              <span>Subtotal:</span>
              <span>{formatoCLP.format(subtotal)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>IVA (19%):</span>
              <span>{formatoCLP.format(taxes)}</span>
            </div>
            <div className={styles.summaryTotalRow}>
              <span>Total:</span>
              <span>{formatoCLP.format(total)}</span>
            </div>
            
            <Link to="/checkout" className={styles.checkoutButton}>
              Proceder al Pago
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;