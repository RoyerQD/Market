import React, { useRef, useState } from 'react';
import { Link } from '@inertiajs/react';

export default function Main({ productosPorCategoria=[], categorias=[] }) {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const scrollRefs = {};

    const scrollProducts = (ref, direction) => {
        if (ref.current) {
            ref.current.scrollBy({
                left: direction === 'left' ? -300 : 300,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className={`transition-all duration-300 ${sidebarVisible ? 'w-64' : 'w-0'} overflow-hidden bg-gray-100 h-screen p-4`}>
                <h2 className="text-lg font-bold mb-4">Categorías</h2>
                <ul>
                    {categorias.map(categoria => (
                        <li key={categoria} className="mb-2">{categoria}</li>
                    ))}
                </ul>
            </div>

            {/* Contenido principal */}
            <div className="flex-1 p-6">
                <button
                    onClick={() => setSidebarVisible(!sidebarVisible)}
                    className="mb-4 bg-gray-300 text-gray-700 px-4 py-2 rounded"
                >
                    {sidebarVisible ? 'Ocultar Categorías' : 'Mostrar Categorías'}
                </button>

                {/* Apartados de productos por categoría */}
                {Object.entries(productosPorCategoria).map(([categoria, productos], index) => {
                    if (productos.length === 0) return null;
                    scrollRefs[categoria] = useRef();

                    return (
                        <div key={categoria} className="mb-12">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-semibold">{categoria}</h3>
                                <Link
                                    href={route('ProductosCreate')}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600"
                                >
                                    Vender en {categoria}
                                </Link>
                            </div>

                            <div className="mt-4 relative">
                                <div
                                    ref={scrollRefs[categoria]}
                                    className="flex overflow-x-auto space-x-4 scrollbar-hide"
                                    style={{ scrollSnapType: 'x mandatory' }}
                                >
                                    {productos.map(producto => (
                                        <Link
                                            key={producto.id}
                                            href={route('ProductoDetalles', { id: producto.id })}
                                            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 min-w-[200px]"
                                        >
                                            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                                {producto.imagen ? (
                                                    <img
                                                        src={producto.imagen}
                                                        alt={producto.nombre}
                                                        className="object-cover w-full h-full"
                                                    />
                                                ) : (
                                                    <span className="text-gray-400">Sin imagen</span>
                                                )}
                                            </div>
                                            <div className="p-4">
                                                <p className="text-gray-600 truncate">{producto.nombre}</p>
                                                <p className="text-lg font-semibold">${producto.precio}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {/* Botones scroll */}
                                <button
                                    onClick={() => scrollProducts(scrollRefs[categoria], 'left')}
                                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
                                >
                                    ◀
                                </button>
                                <button
                                    onClick={() => scrollProducts(scrollRefs[categoria], 'right')}
                                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
                                >
                                    ▶
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}