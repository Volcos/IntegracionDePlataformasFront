// autoparts/client/src/pages/Checkout/CheckoutPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redireccionar después de la confirmación
import styles from './CheckoutPage.module.css';

function CheckoutPage() {
  const navigate = useNavigate();

  // Datos de ejemplo del carrito (en una aplicación real, se pasarían desde el contexto del carrito o se obtendrían de una API)
  const [orderItems] = useState([
    {
      id: 1,
      name: 'Faro Delantero LED',
      price: 85.99,
      quantity: 2,
    },
    {
      id: 2,
      name: 'Kit de Frenos Cerámicos',
      price: 249.50,
      quantity: 1,
    },
    {
      id: 3,
      name: 'Filtro de Aire Deportivo',
      price: 45.00,
      quantity: 3,
    },
  ]);

  // Estado para la dirección de despacho
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    number: '',
    apartment: '',
    commune: '',
    city: '',
    region: '',
    postalCode: '',
    notes: '',
  });

  // Calcular totales
  const subtotal = orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const taxRate = 0.19;
  const taxes = subtotal * taxRate;
  const shippingCost = 5.00; // Costo de envío de ejemplo
  const total = subtotal + taxes + shippingCost;

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prevAddress => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleConfirmAndPay = (e) => {
    e.preventDefault();
    // Aquí es donde en el futuro:
    // 1. Enviarías los datos del pedido y la dirección de despacho a tu web service.
    // 2. Esperarías la confirmación del servidor.
    // 3. Redireccionarías al usuario a la pasarela de pago del banco.

    console.log('Confirmación de pedido y dirección de despacho:', {
      orderItems,
      shippingAddress,
      total,
    });

    alert('Redireccionando al banco para el pago... (Simulación)');
    // Simular redirección a una página de éxito o al home
    navigate('/'); // Por ahora, vuelve al home
  };

  return (
    <div className={styles.checkoutContainer}>
      <h1 className={styles.checkoutTitle}>Confirmar Pedido y Despacho</h1>

      <div className={styles.checkoutContent}>
        {/* Resumen de Productos */}
        <div className={styles.orderSummaryCard}>
          <h2 className={styles.summarySectionTitle}>Productos en tu Pedido</h2>
          <div className={styles.orderItemsList}>
            {orderItems.map(item => (
              <div key={item.id} className={styles.orderItem}>
                <span>{item.name} (x{item.quantity})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Formulario de Dirección de Despacho */}
        <div className={styles.shippingAddressCard}>
          <h2 className={styles.summarySectionTitle}>Dirección de Despacho</h2>
          <form className={styles.shippingForm} onSubmit={handleConfirmAndPay}>
            <div className={styles.formGroup}>
              <label htmlFor="street" className={styles.formLabel}>Calle</label>
              <input
                type="text"
                id="street"
                name="street"
                className={styles.formInput}
                placeholder="Ej: Av. Siempreviva"
                value={shippingAddress.street}
                onChange={handleAddressChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="number" className={styles.formLabel}>Número</label>
              <input
                type="text"
                id="number"
                name="number"
                className={styles.formInput}
                placeholder="Ej: 742"
                value={shippingAddress.number}
                onChange={handleAddressChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="apartment" className={styles.formLabel}>Depto/Oficina (Opcional)</label>
              <input
                type="text"
                id="apartment"
                name="apartment"
                className={styles.formInput}
                placeholder="Ej: Depto. 302"
                value={shippingAddress.apartment}
                onChange={handleAddressChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="commune" className={styles.formLabel}>Comuna</label>
              <input
                type="text"
                id="commune"
                name="commune"
                className={styles.formInput}
                placeholder="Ej: Las Condes"
                value={shippingAddress.commune}
                onChange={handleAddressChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="city" className={styles.formLabel}>Ciudad</label>
              <input
                type="text"
                id="city"
                name="city"
                className={styles.formInput}
                placeholder="Ej: Santiago"
                value={shippingAddress.city}
                onChange={handleAddressChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="region" className={styles.formLabel}>Región</label>
              <input
                type="text"
                id="region"
                name="region"
                className={styles.formInput}
                placeholder="Ej: Metropolitana"
                value={shippingAddress.region}
                onChange={handleAddressChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="postalCode" className={styles.formLabel}>Código Postal</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                className={styles.formInput}
                placeholder="Ej: 7550000"
                value={shippingAddress.postalCode}
                onChange={handleAddressChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="notes" className={styles.formLabel}>Notas de Despacho (Opcional)</label>
              <textarea
                id="notes"
                name="notes"
                className={styles.formInput}
                placeholder="Ej: Dejar con conserje, llamar antes de llegar..."
                value={shippingAddress.notes}
                onChange={handleAddressChange}
                rows="3"
              ></textarea>
            </div>
          </form> {/* El formulario se cierra aquí, pero el botón de submit estará al final */}
        </div>

        {/* Resumen Final y Botón de Pago */}
        <div className={styles.paymentSummaryCard}>
          <h2 className={styles.summarySectionTitle}>Resumen del Pago</h2>
          <div className={styles.summaryRow}>
            <span>Subtotal de productos:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>IVA (19%):</span>
            <span>${taxes.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Costo de envío:</span>
            <span>${shippingCost.toFixed(2)}</span>
          </div>
          <div className={styles.summaryTotalRow}>
            <span>Total a pagar:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button type="submit" form="shippingForm" className={styles.confirmPayButton} onClick={handleConfirmAndPay}>
            Confirmar Pedido y Pagar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;