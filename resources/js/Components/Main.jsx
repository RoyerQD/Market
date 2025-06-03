import React from 'react';
import { Link } from '@inertiajs/react';

export default function Main({ categorias }) {
  // Filtrar categorías que tienen al menos un producto
  const categoriasConProductos = categorias.filter(
    categoria => categoria.productos && categoria.productos.length > 0
  );

  return (
    <div className="p-6">
      {categoriasConProductos.map((categoria) => (
        <div key={categoria.id_categoria}>
          <h2 className="text-xl font-bold">{categoria.nombre}</h2>
          {categoria.productos.map((producto) => (
            <div key={producto.id_producto} className="border p-2 my-2">
              <h3>{producto.nombre_producto}</h3>
              <p>Precio: S/ {producto.precio}</p>

              <Link
                href={route('producto.show', producto.id_producto)}
                className="text-blue-600 hover:underline"
              >
                Ver detalles
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
