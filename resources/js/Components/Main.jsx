import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function Main({ categorias }) {
  const [precioMax, setPrecioMax] = useState(1000);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [condiciones, setCondiciones] = useState([]);
  const [busqueda, setBusqueda] = useState('');

  const categoriasConProductos = categorias
    .map(categoria => ({
      ...categoria,
      productos: categoria.productos?.filter(p => p.estado_producto === 'disponible') || []
    }))
    .filter(categoria => categoria.productos.length > 0);

  const handleCategoriaChange = (id) => {
    setCategoriasSeleccionadas((prev) =>
      prev.includes(id)
        ? prev.filter((cid) => cid !== id)
        : [...prev, id]
    );
  };

  const handleCondicionChange = (valor) => {
    setCondiciones((prev) =>
      prev.includes(valor)
        ? prev.filter((c) => c !== valor)
        : [...prev, valor]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 flex gap-8">
      {/* Filtros avanzados */}
      <aside className="w-1/4 bg-white text-[#59bcb1] p-4 rounded-xl shadow-md sticky top-24 h-fit">
        <h3 className="text-lg font-bold mb-4">Filtros Avanzados</h3>

        {/* Campo de búsqueda */}
        <div className="mb-6">
          <label className="block mb-2 text-black">Buscar</label>
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre, vendedor..."
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e47b5e] text-black"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-black">Rango de Precio</label>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={precioMax}
            onChange={(e) => setPrecioMax(Number(e.target.value))}
            className="w-full accent-[#e47b5e]"
          />
          <div className="flex justify-between text-sm mt-1 text-black">
            <span>S/0</span>
            <span>S/{precioMax}</span>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="font-semibold mb-2">Categorías</h4>
          <ul className="space-y-2">
            {categoriasConProductos.map((categoria) => (
              <li key={categoria.id_categoria} className="flex items-center gap-2 text-black">
                <input
                  type="checkbox"
                  checked={categoriasSeleccionadas.includes(categoria.id_categoria)}
                  onChange={() => handleCategoriaChange(categoria.id_categoria)}
                  className="accent-[#e47b5e]"
                />
                <span>{categoria.nombre}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Condición</h4>
          <div className="space-y-2 text-black">
            {['nuevo', 'usado'].map((c) => (
              <label key={c} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={condiciones.includes(c)}
                  onChange={() => handleCondicionChange(c)}
                  className="accent-[#e47b5e]"
                />
                <span>{c.charAt(0).toUpperCase() + c.slice(1)}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Grid de productos */}
      <main className="w-3/4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">Descubre productos</h2>
          <Link
            href="/SubirProducto"
            className="bg-[#e47b5e] text-white px-6 py-3 rounded-full hover:bg-[#c45f48] transition"
          >
            Vender producto
          </Link>
        </div>

        <div className="space-y-8">
          {categoriasConProductos.map((categoria) => {
            // Filtramos los productos de esta categoría según los filtros seleccionados
            const productosFiltradosCategoria = categoria.productos.filter(
              producto => {
                const searchTerm = busqueda.toLowerCase();
                const matchBusqueda = 
                  !busqueda || // Si no hay búsqueda, incluir el producto
                  producto.nombre_producto.toLowerCase().includes(searchTerm) ||
                  producto.descripcion?.toLowerCase().includes(searchTerm) ||
                  producto.usuario.nombre.toLowerCase().includes(searchTerm) ||
                  `${producto.usuario.nombre} ${producto.usuario.apellido_paterno}`.toLowerCase().includes(searchTerm);

                return matchBusqueda &&
                  producto.precio <= precioMax &&
                  (categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(categoria.id_categoria)) &&
                  (condiciones.length === 0 || condiciones.includes(producto.condicion));
              }
            );

            if (productosFiltradosCategoria.length === 0) return null;

            return (
              <section key={categoria.id_categoria} className="bg-white rounded-lg p-4">
                <h2 className="text-xl font-bold text-black mb-4 border-b pb-2">
                  {categoria.nombre}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {productosFiltradosCategoria.map((producto) => (
                    <div
                      key={producto.id_producto}
                      className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:scale-[1.02] transition h-[400px]"
                    >
                      <div className="aspect-w-16 aspect-h-9 w-full">
                        <img
                          src={
                            producto.fotos && producto.fotos.length > 0
                              ? `/storage/${producto.fotos[0].ruta}`
                              : '/images/LogoGoodMarket.png'
                          }
                          alt={producto.nombre_producto}
                          className="w-full h-48 object-cover object-center"
                        />
                      </div>
                      <div className="p-4 flex flex-col justify-between h-full">
                        <Link
                          href={route('producto.show', producto.id_producto)}
                          className="transition"
                        >
                          <span className="text-white text-xs bg-[#e47b5e] rounded leading-tight inline-block px-2 mb-2">
                            {producto.estado_producto}
                          </span>
                          <h3 className="text-lg font-bold mb-2 text-black">
                            {producto.nombre_producto}
                          </h3>
                          <p className="text-[#e47b5e] font-bold text-xl mb-2">
                            S/{producto.precio}
                          </p>
                          <p className="text-gray-600 text-sm mb-2">
                            {producto.descripcion?.substring(0, 100)}...
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            {producto.usuario.nombre} {producto.usuario.apellido_paterno}
                          </p>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
          {!categoriasConProductos.some(cat => 
            cat.productos.some(p => 
              p.precio <= precioMax && 
              (categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(cat.id_categoria)) &&
              (condiciones.length === 0 || condiciones.includes(p.condicion))
            )
          ) && (
            <p className="text-center text-gray-500">No hay productos que coincidan con los filtros.</p>
          )}
        </div>
      </main>
    </div>
  );
}
