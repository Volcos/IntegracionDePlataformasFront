// autoparts/client/src/pages/Cart/CartPage.jsx
import React, { useState, useEffect } from 'react';
import styles from './CartPage.module.css';

function CartPage() {
  // Datos de ejemplo para el carrito (en el futuro, esto vendría de un estado global o backend)
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

  // Calcular el subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const taxRate = 0.19; // Ejemplo de 19% de impuesto (IVA en Chile)
  const taxes = subtotal * taxRate;
  const total = subtotal + taxes;

  const handleQuantityChange = (id, newQuantity) => {
    // Lógica para actualizar la cantidad de un ítem en el carrito
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    );
    setCartItems(updatedCart);
  };

  const handleRemoveItem = (id) => {
    // Lógica para eliminar un ítem del carrito
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
              <span>IVA (19%):</span> {/* O el impuesto que aplique */}
              <span>${taxes.toFixed(2)}</span>
            </div>
            <div className={styles.summaryTotalRow}>
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className={styles.checkoutButton}>Proceder al Pago</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;