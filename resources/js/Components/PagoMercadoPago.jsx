import { useEffect, useRef } from "react";
import axios from "axios";

export default function PagoMercadoPago({ producto, user }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    if (parseFloat(producto.precio) > 0) {
      axios
        .post("/api/mercadopago/preferencia", {
          precio: producto.precio,
          descripcion: producto.nombre_producto || "Pago por publicación",
        })
        .then((res) => {
          const mp = new window.MercadoPago("TEST-48effc57-361c-4951-8d0c-6ac1c0a8223c", {
            locale: "es-PE",
          });

          mp.checkout({
            preference: {
              id: res.data.preference_id,
            },
            render: {
              container: buttonRef.current,
              label: "Pagar con Mercado Pago",
            },
          });
        })
        .catch((error) => {
          console.error("Error al crear preferencia:", error);
        });
    }
  }, [producto]);

  return <div ref={buttonRef}></div>;
}
