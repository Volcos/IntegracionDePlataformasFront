import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styles from './PaymentFail.module.css';
import axios from 'axios';

function PaymentFail() {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate('/'); 
  };

  return (
    <div className={styles.failureContainer}>
      <h1 className={styles.title}>❌ El pago fue rechazado</h1>
      <p className={styles.message}>
        Tu transacción no fue aprobada. No se ha generado ningún pedido en el sistema.
      </p>

      <p className={styles.redirectMessage}>
        Puedes regresar al carrito y reintentar el proceso de compra.
      </p>

      <button className={styles.retryButton} onClick={handleReturn}>
        Volver al inicio
      </button>
    </div>
  );
}

export default PaymentFail;
