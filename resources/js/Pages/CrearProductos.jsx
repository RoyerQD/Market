import { useState } from "react";
import PagoPaypal from "@/Components/PagoPaypal";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Navbar from "@/Layouts/Navbar";

export default function CrearProductos({ categorias, auth }) {
  const [producto, setProducto] = useState({
    nombre_producto: "",
    descripcion: "",
    precio: "2.00",
    condicion: "nuevo",
    id_categoria: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto(prev => ({ ...prev, [name]: value }));
  };

  // Validar precio válido para el pago
  const precioValido = parseFloat(producto.precio) > 0;

  return (
    <>
      <Navbar auth={auth} />
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Agregar nuevo producto</h1>
        <form>
          <div className="mb-3">
            <label className="block font-semibold">Nombre</label>
            <input
              type="text"
              name="nombre_producto"
              value={producto.nombre_producto}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block font-semibold">Descripción</label>
            <textarea
              name="descripcion"
              value={producto.descripcion}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-3">
            <label className="block font-semibold">Precio</label>
            <input
              type="number"
              name="precio"
              value={producto.precio}
              onChange={handleChange}  
              className="border p-2 w-full bg-gray-100"
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block font-semibold">Condición</label>
            <select
              name="condicion"
              value={producto.condicion}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            >
              <option value="nuevo">Nuevo</option>
              <option value="usado">Usado</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="block font-semibold">Categoría</label>
            <select
              name="id_categoria"
              value={producto.id_categoria}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            >
              {categorias.map(cat => (
                <option key={cat.id_categoria} value={cat.id_categoria}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>
        </form>

        <PayPalScriptProvider options={{ "client-id": "AXoa7GuKdVGCbxn7n9Guq_x9_ttX_bb_5UfbMoY56X5psng454DFfFHsxxhSNkGbZyS_ZuvcrSqONJq1" }}>
          <div className="p-6 max-w-md mx-auto">
            {/* Solo mostrar el botón si el precio es válido */}
            {precioValido ? (
              <PagoPaypal user={auth.user} producto={producto} />
            ) : (
              <p className="text-red-500 font-semibold">Ingrese un precio válido para habilitar el pago.</p>
            )}
          </div>
        </PayPalScriptProvider>
      </div>
    </>
  );
}
