// autoparts/client/src/pages/Cart/CartPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importa Link
import styles from './CartPage.module.css';

function CartPage() {
  // Datos de ejemplo para el carrito (mantenerlos aquí por ahora)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Faro Delantero LED',
      price: 85.99,
      quantity: 2,
      imageUrl: 'https://via.placeholder.com/100x100?text=Faro+LED'
    },
    {
      id: 2,
      name: 'Kit de Frenos Cerámicos',
      price: 249.50,
      quantity: 1,
      imageUrl: 'https://via.placeholder.com/100x100?text=Frenos'
    },
    {
      id: 3,
      name: 'Filtro de Aire Deportivo',
      price: 45.00,
      quantity: 3,
      imageUrl: 'https://via.placeholder.com/100x100?text=Filtro+Aire'
    },
  ]);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const taxRate = 0.19;
  const taxes = subtotal * taxRate;
  const total = subtotal + taxes;

  const handleQuantityChange = (id, newQuantity) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    );
    setCartItems(updatedCart);
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
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
                  <p className={styles.itemPriceUnit}>${item.price.toFixed(2)} c/u</p>
                </div>
                <div className={styles.itemQuantityControl}>
                  <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                    min="1"
                    className={styles.quantityInput}
                  />
                  <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                </div>
                <p className={styles.itemSubtotal}>${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => handleRemoveItem(item.id)} className={styles.removeItemButton}>X</button>
              </div>
            ))}
          </div>

          <div className={styles.cartSummary}>
            <h2 className={styles.summaryTitle}>Resumen del Pedido</h2>
            <div className={styles.summaryRow}>
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>IVA (19%):</span>
              <span>${taxes.toFixed(2)}</span>
            </div>
            <div className={styles.summaryTotalRow}>
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            {/* CAMBIO AQUÍ: Botón "Proceder al Pago" como Link */}
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