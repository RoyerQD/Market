import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useState } from "react";

export default function PagoPaypalDestacado({ producto, semanas, user }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Calcular monto
  const base = 2; // 2 soles por semana base
  const monto = semanas * base; // O usa tu fórmula de descuento

  const pagarDestacado = async (detalles) => {
    setLoading(true);
    setError("");

    try {
      await axios.post(`http://localhost:8000/productos/agregar-destacado/${producto.id_producto}`, {
        semanas,
        monto: precio,
        metodo_pago: 'paypal',
        estado_pago: 'completado'
      });

      alert("Producto destacado correctamente");
      window.location.reload();
    } catch (error) {
      console.error(error);
      setError("Error al guardar destacado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <p className="text-red-500">{error}</p>}

      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: { value: monto.toFixed(2) },
                description: `Destacar producto por ${semanas} semanas`,
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const detalles = await actions.order.capture();
          await pagarDestacado(detalles);
        }}
        disabled={loading}
      />

      {loading && <p className="text-gray-700">Procesando pago...</p>}
    </>
  );
}
