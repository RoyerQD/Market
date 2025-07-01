import React from 'react';
import { Link } from '@inertiajs/react';

export default function Main({ categorias }) {
  const categoriasConProductos = categorias.filter(
    (categoria) => categoria.productos && categoria.productos.length > 0
  );

  return (
    <div className="container mx-auto px-4 py-8 flex gap-8">
      {/* Filtros avanzados */}
      <aside className="w-1/4 bg-white text-[#59bcb1] p-4 rounded-xl shadow-md sticky top-24 h-fit">
        <h3 className="text-lg font-bold mb-4">Filtros Avanzados</h3>
        
        <div className="mb-6">
          <label className="block mb-2 text-black">Rango de Precio</label>
          <input type="range" min="0" max="1000" className="w-full accent-[#e47b5e] " />
          <div className="flex justify-between text-sm mt-1  text-black" >
            <span>S/0</span>
            <span>S/1000</span>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold mb-2">Categorías</h4>
          <ul className="space-y-2">
            {categoriasConProductos.map((categoria) => (
              <li key={categoria.id_categoria} className="flex items-center gap-2  text-black">
                <input type="checkbox" className="accent-[#e47b5e]" />
                <span>{categoria.nombre}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Condición</h4>
          <div className="space-y-2  text-black">
            <label className="flex items-center gap-2 ">
              <input type="checkbox" className="accent-[#e47b5e]" />
              <span>Nuevo</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-[#e47b5e]" />
              <span>Usado</span>
            </label>
          </div>
        </div>
      </aside>

      {/* Grid de productos */}
      <main className="w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categoriasConProductos.map((categoria) =>
          categoria.productos.map((producto) => (
            <div
              key={producto.id_producto}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:scale-[1.02] transition"
            >
              <img
                src={producto.imagen || '/images/LogoGoodMarket.png'}
                alt={producto.nombre_producto}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex flex-col justify-between h-full">
                <Link
                  href={route('producto.show', producto.id_producto)}
                  className="transition"
                >
                <span className="text-white text-xs bg-[#e47b5e] rounded leading-tight inline-block px-2 mb-2">
                  {producto.estado}
                </span>
                <h3 className="text-lg font-bold mb-2 text-black">
                  {producto.nombre_producto}
                </h3>
                <p className="text-[#e47b5e] font-bold text-xl mb-2">
                  S/{producto.precio}
                </p>
                
                <p className='text-sm text-gray-600 mb-2'>
                  {producto.usuario.name}
                </p>
                </Link>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
