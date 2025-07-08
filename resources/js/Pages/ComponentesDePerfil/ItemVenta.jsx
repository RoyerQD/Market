import React from 'react';

export default function ItemVenta({ venta }) {
  return (
    <div className="bg-gradient-to-r from-[#203668] to-[#1a2a4f] p-4 rounded-md shadow flex flex-col md:flex-row md:justify-between">
      <div className="flex gap-4">
        <img
          src={venta.imagen_url || '/default.jpg'}
          alt={venta.nombre_producto}
          className="w-20 h-20 object-cover rounded"
        />
        <div>
          <h2 className="text-lg font-bold">{venta.nombre_producto}</h2>
          <p className="text-green-400 font-bold">${venta.precio}</p>
          {venta.estado_producto === 'vendido' && (
            <p className="text-sm">Comprado por: <b>{venta.comprador_nombre}</b></p>
          )}
        </div>
      </div>

      <div className="mt-4 md:mt-0 flex flex-col gap-2 text-sm">
        <p>Estado: <span className={`px-2 py-1 rounded ${venta.estado_producto === 'vendido' ? 'bg-blue-600' : 'bg-yellow-500'}`}>
          {venta.estado_producto}
        </span></p>
        {venta.estado_producto === 'vendido' && (
          <p>Fecha de venta: {venta.fecha_venta}</p>
        )}
        <p>Visualizaciones: {venta.visualizaciones}</p>
        <p>Mensajes: {venta.mensajes}</p>

        {venta.estado_producto === 'vendido' ? (
          <button className="mt-2 px-3 py-1 border rounded">Ver Mensajes</button>
        ) : (
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-blue-600 rounded">Editar</button>
            <button className="px-3 py-1 bg-pink-600 rounded">Eliminar</button>
          </div>
        )}
      </div>
    </div>
  );
}
