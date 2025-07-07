import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

function RetornoWebpay() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id_carrito = localStorage.getItem('carritoId')
  const direccionObj = JSON.parse(localStorage.getItem('direccion'));

  const direccionStr = `
    ${direccionObj.street} ${direccionObj.number}, 
    ${direccionObj.apartment}, 
    ${direccionObj.commune}, 
    ${direccionObj.city}, 
    ${direccionObj.region}, 
    CP: ${direccionObj.postalCode}, 
    Notas: ${direccionObj.notes}
  `.replace(/\s+/g, ' ').trim();
  useEffect(() => {
    const handleRetorno = async () => {
      const token = searchParams.get('token_ws');
      if (token) {
        const valid = await axios.post('/api/retorno-webpay',{token_ws:token});
        console.log(valid.data);
        if(valid.data.success){
          try {
            const resp = await axios.post('/api/generarPedido', { id_carrito:id_carrito });
            if (resp.data.success) {
              console.log('id del pedido: '+resp.data.id_pedido);
              console.log('direccion: '+direccionStr);
              await axios.post('/api/ingresarDireccion', {
                id_pedido: resp.data.id_pedido,
                direccion: direccionStr
              });
              navigate(`/paymentSuccess?token=${resp.data.id_pedido}`);
            }  
          } catch (e) {
            console.error('Error al procesar Webpay:', e);
            alert('Hubo un error al procesar el pago.');
          }
        } else {
          console.log(valid.data.success);
          navigate(`/paymentFail`)
        }
        
      } else {
        alert('Token de pago no encontrado');
      }
    };

    handleRetorno();
  }, [searchParams, navigate]);


  return <p>Validando pago, redirigiendo...</p>;
}

export default RetornoWebpay;
