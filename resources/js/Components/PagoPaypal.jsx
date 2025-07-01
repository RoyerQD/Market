import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useState } from "react";

export default function PagoPaypal({ producto, user }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const crearProductoDespuesDePago = async (detallePago) => {
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("id_usuario", user.id_usuario);
      formData.append("nombre_producto", producto.nombre_producto);
      formData.append("descripcion", producto.descripcion);
      formData.append("precio", producto.precio);
      formData.append("condicion", producto.condicion);
      formData.append("id_categoria", producto.id_categoria);
      formData.append("metodo_pago", "paypal");
      formData.append("estado_pago", "completado");

  
      producto.imagenes
        .filter((img) => img instanceof File)
        .forEach((img) => {
          formData.append("imagenes[]", img);
        });

      await axios.post("/productos/completar-pago", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Producto creado correctamente");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      setError("Error al guardar el producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <p className="text-red-500 font-semibold mb-2">{error}</p>
      )}

      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: { value: "3.00" },
                description: "Pago por publicación de producto",
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const detalles = await actions.order.capture();
          await crearProductoDespuesDePago(detalles);
        }}
        onCancel={() => alert("Pago cancelado")}
        onError={(err) => alert("Error en el pago: " + err)}
        disabled={loading}
      />

      {loading && <p className="mt-2 text-gray-700">Procesando pago...</p>}
    </>
  );
}
