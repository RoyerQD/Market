import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import PagoPaypalDestacado from '@/Components/PagoPaypalDestacado';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

export default function MisDestacados({ productos, auth }) {
  const [showModal, setShowModal] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [semanas, setSemanas] = useState(1);

  const abrirModal = (producto) => {
    setProductoSeleccionado(producto);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setProductoSeleccionado(null);
    setSemanas(1);
    setShowModal(false);
  };

  // Calcula precio progresivo
  const calcularPrecio = (semanas) => {
    const base = 2; // base por semana
    const factor = semanas; // simple, puedes poner (semanas * semanas) / 2 por ejemplo
    return (base * factor).toFixed(2);
  };

  const precio = calcularPrecio(semanas);
  const precioValido = precio > 0;

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Mis Productos Destacados
        </h2>
      }
    >
      <Head title="MisDestacados" />

      <div className="py-12 max-w-6xl mx-auto px-4">
        {productos.length === 0 ? (
          <p className="text-gray-600">No tienes productos.</p>
        ) : (
          productos.map((producto) => (
            <div
              key={producto.id_producto}
              className="bg-white p-6 mb-4 rounded-lg shadow flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={producto.imagen_url}
                  alt={producto.nombre_producto}
                  className="w-24 h-24 object-cover rounded"
                />

                <div>
                  <h3 className="text-lg font-bold">{producto.nombre_producto}</h3>
                  <p className="text-green-600 font-semibold">S/ {producto.precio}</p>
                  {producto.es_destacado ? (
                    <>
                      <p className="text-sm text-gray-600">
                        Destacado desde: <b>{producto.fecha_inicio}</b>
                      </p>
                      <p className="text-sm text-gray-600">
                        Hasta: <b>{producto.fecha_fin}</b> ({producto.tiempo_restante} restante)
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-gray-500">Este producto no está destacado.</p>
                  )}
                </div>
              </div>

              <button
                onClick={() => abrirModal(producto)}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
              >
                {producto.es_destacado ? 'Editar Destacado' : 'Agregar Destacado'}
              </button>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {showModal && productoSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-4xl flex flex-col md:flex-row gap-6">
            {/* Columna Izquierda: Detalle Producto */}
            <div className="w-full md:w-1/2">
              <img
                src={productoSeleccionado.imagen_url}
                alt={productoSeleccionado.nombre_producto}
                className="w-full h-60 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-bold mb-2">{productoSeleccionado.nombre_producto}</h3>
              <p className="text-gray-700">{productoSeleccionado.descripcion || 'Sin descripción'}</p>
              <p className="mt-2 text-green-600 font-semibold">S/ {productoSeleccionado.precio}</p>
            </div>

            {/* Columna Derecha: Pago */}
            <div className="w-full md:w-1/2 flex flex-col">
              <h4 className="text-lg font-bold mb-4">Configurar Destacado</h4>

              <label className="mb-2 font-semibold">Semanas de destacado:</label>
              <input
                type="number"
                min="1"
                max="52"
                value={semanas}
                onChange={(e) => setSemanas(parseInt(e.target.value) || 1)}
                className="border rounded px-3 py-2 mb-4 w-32"
              />

              <p className="mb-4">Precio total: <b>S/ {precio}</b></p>

              <PayPalScriptProvider options={{ "client-id": "AXoa7GuKdVGCbxn7n9Guq_x9_ttX_bb_5UfbMoY56X5psng454DFfFHsxxhSNkGbZyS_ZuvcrSqONJq1" }}>
                <div className="p-4 border rounded">
                  {precioValido ? (
                    <PagoPaypalDestacado
                      producto={productoSeleccionado}
                      semanas={semanas}
                      user={auth.user}
                      precio={precio} // pásalo también al componente
                    />
                  ) : (
                    <p className="text-red-500 font-semibold">
                      Ingrese un número de semanas válido.
                    </p>
                  )}
                </div>
              </PayPalScriptProvider>

              <button
                onClick={cerrarModal}
                className="mt-4 text-gray-600 underline hover:text-gray-900"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthenticatedLayout>
  );
}
