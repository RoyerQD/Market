import React, { useState } from 'react';
import axios from 'axios';
import { router } from '@inertiajs/react';

export default function ItemVenta({ venta }) {
  const [showOcultarModal, setShowOcultarModal] = useState(false);
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre_producto: venta.nombre_producto,
    precio: venta.precio,
  });

  const handleAccion = async (tipo) => {
    try {
      setIsLoading(true);
      
      if (tipo === 'ocultar') {
        await axios.post(`/productos/ocultar/${venta.id_producto}`);
      } else if (tipo === 'marcarVendido') {
        await axios.post(`/productos/marcar-vendido/${venta.id_producto}`);
      } else if (tipo === 'editar') {
        await axios.post(`/productos/editar/${venta.id_producto}`, nuevoProducto);
      } else if (tipo === 'despausar') {
        await axios.post(`/productos/despausar/${venta.id_producto}`);
      }
      
      // Recargar la página para mostrar los cambios
      router.reload();
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al procesar tu solicitud');
    } finally {
      setIsLoading(false);
      setShowOcultarModal(false);
      setShowEditarModal(false);
    }
  };

  return (
    <div className="p-4 rounded-md shadow flex flex-col md:flex-row md:justify-between bg-white text-gray-800">
      <div className="flex gap-4">
        <img
          src={venta.imagen_url || '/default.jpg'}
          alt={venta.nombre_producto}
          className="w-20 h-20 object-cover rounded"
        />
        <div>
          <h2 className="text-lg font-bold">{venta.nombre_producto}</h2>
          <p className="text-emerald-600 font-bold">${venta.precio}</p>
          {venta.estado_producto === 'Vendido' && (
            <p className="text-sm text-gray-600">
              {/* Comprado por: <b>{venta.comprador_nombre}</b> */}
              Este producto a sido comprado por ende ya no se mostrara en el catelogo de productos .Gracias por usar nuestra plataforma  <b></b>
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 md:mt-0 flex flex-col gap-2 text-sm">
        <p>
          Estado:{' '}
          <span
            className={`px-2 py-1 rounded font-semibold ${
              venta.estado_producto === 'Vendido'
                ? 'bg-green-100 text-green-800'
                : venta.estado_producto === 'Oculto'
                ? 'bg-gray-200 text-gray-600'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {venta.estado_producto}
          </span>
        </p>
        {venta.estado_producto === 'Vendido' && (
          <p>Fecha de venta: {venta.created_at}</p>
        )}
        {/* <p>Visualizaciones: {venta.visualizaciones}</p>
        <p>Mensajes: {venta.mensajes}</p> */}

        {venta.estado_producto === 'Vendido' ? (
          // <button className="mt-2 px-3 py-1 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50">
          //   Ver Mensajes
          // </button>
          <p>Producto vendido</p>
          
        ) : venta.estado_producto === 'Pausado' ? (
          <button
            onClick={() => handleAccion('despausar')}
            disabled={isLoading}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Procesando...' : 'Activar Producto'}
          </button>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <button
                onClick={() => setShowEditarModal(true)}
                className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Editar
              </button>

              <button
                onClick={() => setShowOcultarModal(true)}
                className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Ocultar producto
              </button>
            </div>

            <button
              onClick={() => handleAccion('marcarVendido')}
              disabled={isLoading}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              {isLoading ? 'Procesando...' : 'Marcar como vendido'}
            </button>
          </div>
        )}
      </div>

      {/* Modal Ocultar */}
      {showOcultarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-sm w-full">
            <h3 className="text-lg font-bold mb-2">¿Ocultar producto?</h3>
            <p className="mb-4 text-sm text-gray-700">
              Al ocultar este producto, ya no podrá ser visto por nadie excepto tú.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowOcultarModal(false)}
                className="px-3 py-1 border rounded"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleAccion('ocultar')}
                disabled={isLoading}
                className="px-3 py-1 bg-gray-800 text-white rounded disabled:opacity-50"
              >
                {isLoading ? 'Procesando...' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar */}
      {showEditarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Editar Producto</h3>
            <label className="block mb-2 text-sm">Nombre del producto</label>
            <input
              type="text"
              value={nuevoProducto.nombre_producto}
              onChange={(e) =>
                setNuevoProducto({
                  ...nuevoProducto,
                  nombre_producto: e.target.value,
                })
              }
              className="border p-2 w-full mb-4"
            />

            <label className="block mb-2 text-sm">Precio</label>
            <input
              type="number"
              value={nuevoProducto.precio}
              onChange={(e) =>
                setNuevoProducto({
                  ...nuevoProducto,
                  precio: e.target.value,
                })
              }
              className="border p-2 w-full mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowEditarModal(false)}
                className="px-3 py-1 border rounded"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleAccion('editar')}
                disabled={isLoading}
                className="px-3 py-1 bg-indigo-600 text-white rounded disabled:opacity-50"
              >
                {isLoading ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
