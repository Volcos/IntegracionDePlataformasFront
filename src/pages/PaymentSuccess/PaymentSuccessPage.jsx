import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './PaymentSuccess.module.css';
import axios from 'axios';

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.get(`/api/pedido-exito`, { params: { token } })
        .then(res => setOrderData(res.data))
        .catch(err => console.error('Error al obtener datos del pedido:', err))
        .finally(() => setLoading(false));
    }
  }, [token]);

  if (loading) return <p className={styles.message}>Cargando información del pedido...</p>;
  if (!orderData) return <p className={styles.message}>No se pudo recuperar la información del pedido.</p>;

  return (
    <div className={styles.successContainer}>
      <h1 className={styles.title}>✅ ¡Pago realizado con éxito!</h1>
      <p className={styles.subtitle}>Gracias por tu compra. Aquí están los detalles:</p>

      <section className={styles.section}>
        <h2>Dirección de envío</h2>
        <p>{orderData.direccion.street} #{orderData.direccion.number}, {orderData.direccion.apartment && `Depto. ${orderData.direccion.apartment}, `}
        {orderData.direccion.commune}, {orderData.direccion.city}, {orderData.direccion.region}, CP {orderData.direccion.postalCode}</p>
        {orderData.direccion.notes && <p>Notas: {orderData.direccion.notes}</p>}
      </section>

      <section className={styles.section}>
        <h2>Productos</h2>
        <ul className={styles.productList}>
          {orderData.productos.map((item, i) => (
            <li key={i} className={styles.productItem}>
              {item.name} (x{item.quantity}) — {Number(item.price * item.quantity).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Resumen del pago</h2>
        <p>Total pagado: <strong>{Number(orderData.total).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</strong></p>
        <p>ID del Pedido: {orderData.id_pedido}</p>
      </section>
    </div>
  );
}

export default PaymentSuccess;
