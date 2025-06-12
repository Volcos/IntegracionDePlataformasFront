import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CheckoutPage.module.css';
import axios from 'axios';

function PayButton({ idCompra, idUsuario, montoTotal, shippingAddress }) {
  const handlePay = async () => {
    try {
      localStorage.setItem('direccion', JSON.stringify(shippingAddress));
      localStorage.setItem('carritoId', idCompra);

      const resp = await axios.post('/api/generarPedido', {idCompra});

      const response = await axios.post('/api/pagar', {
        id_compra: resp.id_pedido,
        id_usuario: idUsuario,
        monto_total: montoTotal
      }, {
        responseType: 'text'
      });

      const win = window.open('', '_blank');
      win.document.open();
      win.document.write(response.data);
      win.document.close();
    } catch (error) {
      console.error('Error al redirigir a Webpay:', error);
      alert('No se pudo iniciar el pago. Intenta nuevamente.');
    }
  };

  return (
    <button className={styles.confirmPayButton} onClick={handlePay}>
      Confirmar Pedido y Pagar
    </button>
  );
}

function CheckoutPage() {
  const navigate = useNavigate();
  const [orderItems, setOrderItems] = useState([]);
  const [carritoId, setCarritoId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [shippingAddress, setShippingAddress] = useState({
    street: '', number: '', apartment: '', commune: '',
    city: '', region: '', postalCode: '', notes: ''
  });

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const token = localStorage.getItem('token');
  const decoded = token ? parseJwt(token) : null;
  const id_cliente = decoded?.id_cliente;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carritoRes = await axios.get('/api/mostrarCarritos', {
          params: { id_cliente }
        });

        const carritoID = carritoRes.data[0]?.ID_CARRITO;
        setCarritoId(carritoID);

        const productosRes = await axios.get('/api/devolverProductosCarrito', {
          params: { id_carrito: carritoID }
        });

        const items = productosRes.data.map(p => ({
          id: p.ID_PRODUCTO,
          name: p.NOMBRE,
          price: p.PRECIO_UNITARIO,
          quantity: p.CANTIDAD
        }));

        setOrderItems(items);
      } catch (error) {
        console.error("Error cargando productos del carrito:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id_cliente) fetchData();
  }, [id_cliente]);

  const subtotal = orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const taxRate = 0.19;
  const taxes = subtotal * taxRate;
  const shippingCost = 5000;
  const total = subtotal + taxes + shippingCost;

  const toCLP = (num) => num.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <p className={styles.checkoutTitle}>Cargando productos del carrito...</p>;

  return (
    <div className={styles.checkoutContainer}>
      <h1 className={styles.checkoutTitle}>Confirmar Pedido y Despacho</h1>

      <div className={styles.checkoutContent}>
        <div className={styles.orderSummaryCard}>
          <h2 className={styles.summarySectionTitle}>Productos en tu Pedido</h2>
          <div className={styles.orderItemsList}>
            {orderItems.map(item => (
              <div key={item.id} className={styles.orderItem}>
                <span>{item.name} (x{item.quantity})</span>
                <span>{toCLP(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.shippingAddressCard}>
          <h2 className={styles.summarySectionTitle}>Dirección de Despacho</h2>
          <form className={styles.shippingForm}>
            {['street', 'number', 'apartment', 'commune', 'city', 'region', 'postalCode'].map((field, i) => (
              <div key={i} className={styles.formGroup}>
                <label htmlFor={field} className={styles.formLabel}>
                  {field === 'postalCode' ? 'Código Postal' : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="text"
                  id={field}
                  name={field}
                  className={styles.formInput}
                  placeholder={`Ej: ${field === 'number' ? '742' : field === 'postalCode' ? '7550000' : 'Texto...'}`}
                  value={shippingAddress[field]}
                  onChange={handleAddressChange}
                  required={field !== 'apartment'}
                />
              </div>
            ))}
            <div className={styles.formGroup}>
              <label htmlFor="notes" className={styles.formLabel}>Notas de Despacho (Opcional)</label>
              <textarea
                id="notes"
                name="notes"
                className={styles.formInput}
                placeholder="Ej: Dejar con conserje..."
                value={shippingAddress.notes}
                onChange={handleAddressChange}
                rows="3"
              />
            </div>
          </form>
        </div>

        <div className={styles.paymentSummaryCard}>
          <h2 className={styles.summarySectionTitle}>Resumen del Pago</h2>
          <div className={styles.summaryRow}><span>Subtotal:</span><span>{toCLP(subtotal)}</span></div>
          <div className={styles.summaryRow}><span>IVA (19%):</span><span>{toCLP(taxes)}</span></div>
          <div className={styles.summaryRow}><span>Costo de envío:</span><span>{toCLP(shippingCost)}</span></div>
          <div className={styles.summaryTotalRow}><span>Total a pagar:</span><span>{toCLP(total)}</span></div>

          <PayButton idCompra={carritoId} idUsuario={id_cliente} montoTotal={total} shippingAddress={shippingAddress} />
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
