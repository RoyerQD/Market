import { PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';

export default function PagoPaypal({ producto, user }) {
  const crearProductoDespuesDePago = async (detallePago) => {
    try {
      await axios.post('/productos/completar-pago', {
        id_usuario: user.id_usuario, // <-- CORREGIDO AQUÍ
        nombre_producto: producto.nombre_producto,
        descripcion: producto.descripcion,
        precio: producto.precio,
        condicion: producto.condicion,
        id_categoria: producto.id_categoria,
        metodo_pago: 'paypal',
        estado_pago: 'completado',
      });
      alert('Producto creado correctamente');
      window.location.href = '/'; 
    } catch (error) {
      console.error(error);
      alert('Error al guardar el producto');
    }
  };

  return (
    <PayPalButtons
      style={{ layout: 'vertical' }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: { value: '3.00' },
              description: 'Pago por publicación de producto',
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        const detalles = await actions.order.capture();
        await crearProductoDespuesDePago(detalles);
      }}
      onCancel={() => alert('Pago cancelado')}
      onError={(err) => alert('Error en el pago: ' + err)}
    />
  );
}
