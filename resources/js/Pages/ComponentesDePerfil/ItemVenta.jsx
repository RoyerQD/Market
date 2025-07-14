import React from 'react';

export default function ItemVenta({ venta }) {
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
          {venta.estado_producto === 'vendido' && (
            <p className="text-sm text-gray-600">
              Comprado por: <b>{venta.comprador_nombre}</b>
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 md:mt-0 flex flex-col gap-2 text-sm">
        <p>
          Estado:{' '}
          <span
            className={`px-2 py-1 rounded font-semibold ${
              venta.estado_producto === 'vendido'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {venta.estado_producto}
          </span>
        </p>
        {venta.estado_producto === 'vendido' && (
          <p>Fecha de venta: {venta.fecha_venta}</p>
        )}
        <p>Visualizaciones: {venta.visualizaciones}</p>
        <p>Mensajes: {venta.mensajes}</p>

        {venta.estado_producto === 'vendido' ? (
          <button className="mt-2 px-3 py-1 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50">
            Ver Mensajes
          </button>
        ) : (
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700">
              Editar
            </button>
            <button className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
              Eliminar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
