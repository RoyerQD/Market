import { useState } from "react";
import PagoPaypal from "@/Components/PagoPaypal";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Navbar from "@/Layouts/Navbar";
import PagoMercadoPago from "@/Components/PagoMercadoPago";

export default function CrearProductos({ categorias, auth }) {
  const [producto, setProducto] = useState({
    nombre_producto: "",
    descripcion: "",
    precio: "3.00",
    condicion: "nuevo",
    id_categoria: "",
    imagenes: [null, null, null, null],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const nuevasImagenes = [...producto.imagenes];
    nuevasImagenes[index] = file;

    setProducto((prev) => ({ ...prev, imagenes: nuevasImagenes }));
  };

  const precioValido = parseFloat(producto.precio) > 0;

  return (
    <>
      <Navbar auth={auth} />
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Agregar nuevo producto</h1>

        {/* Slots de imágenes */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-2">Imágenes del Producto</h2>
          <p className="text-sm mb-4">Sube hasta 4 imágenes de tu producto</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {producto.imagenes.map((img, index) => (
              <div
                key={index}
                className="relative w-full aspect-square border-2 border-dashed border-gray-400 rounded flex items-center justify-center overflow-hidden"
              >
                {img ? (
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`Imagen ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <label className="flex flex-col items-center justify-center cursor-pointer text-gray-500">
                    <span className="text-4xl">+</span>
                    <span className="text-xs">Subir Imagen</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageChange(e, index)}
                    />
                  </label>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Formulario */}
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
              <option value="">Selecciona una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id_categoria} value={cat.id_categoria}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>
        </form>

        {/* Botones de pago */}
        <PayPalScriptProvider
          options={{
            "client-id":
              "AXoa7GuKdVGCbxn7n9Guq_x9_ttX_bb_5UfbMoY56X5psng454DFfFHsxxhSNkGbZyS_ZuvcrSqONJq1",
          }}
        >
          <div className="p-6 max-w-md mx-auto">
            {precioValido ? (
              <PagoPaypal user={auth.user} producto={producto} />
            ) : (
              <p className="text-red-500 font-semibold">
                Ingrese un precio válido para habilitar el pago.
              </p>
            )}
          </div>
        </PayPalScriptProvider>

        <div>
          {precioValido ? (
            <PagoMercadoPago user={auth.user} producto={producto} />
          ) : (
            <p className="text-red-500 font-semibold">
              Ingrese un precio válido para habilitar el pago.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
