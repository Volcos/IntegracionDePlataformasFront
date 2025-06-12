import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

function RetornoWebpay() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token_ws');
    if (token) {
      navigate(`/paymentSuccess?token=${token}`);
    } else {
      alert('Token de pago no encontrado');
    }
  }, [searchParams, navigate]);

  return <p>Validando pago, redirigiendo...</p>;
}

export default RetornoWebpay;
