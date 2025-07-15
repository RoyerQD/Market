import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import Navbar from '@/Layouts/Navbar';

export default function DetallesProducto({ producto = {},auth }) {
  const [imagenPrincipal, setImagenPrincipal] = useState(0);

  return (
    <>
      <Head title={producto.nombre_producto} />
        <Navbar auth={auth} />
      <div className="container mx-auto p-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Columna izquierda - Galería de imágenes */}
          <div>
            {/* Imagen principal grande */}
            {producto.fotos?.length > 0 ? (
              <div className="mb-4">
                <img
                  src={`/storage/${producto.fotos[imagenPrincipal].ruta}`}
                  alt={`Imagen principal`}
                  className="w-full h-96 object-contain rounded-lg border border-gray-200"
                />
              </div>
            ) : (
              <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center mb-4">
                <p className="text-gray-500">No hay imagen disponible</p>
              </div>
            )}

            {/* Miniaturas */}
            {producto.fotos?.length > 1 && (
              <div className="grid grid-cols-3 gap-2">
                {producto.fotos.map((foto, index) => (
                  <button
                    key={index}
                    onClick={() => setImagenPrincipal(index)}
                    className={`border rounded-lg overflow-hidden ${imagenPrincipal === index ? 'border-blue-500 border-2' : 'border-gray-200'}`}
                  >
                    <img
                      src={`/storage/${foto.ruta}`}
                      alt={`Miniatura ${index + 1}`}
                      className="w-full h-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Columna derecha - Información del producto */}
          <div>
            {/* Título y precio */}
            <div className="border-b pb-4 mb-4">
              <h1 className="text-2xl font-bold">{producto.nombre_producto}</h1>
              <p className="text-xl font-semibold text-gray-800">S/ {producto.precio}</p>
            </div>

            {/* Estado y ubicación */}
            <div className="flex flex-wrap gap-4 mb-4 text-sm">
              <span className={`px-2 py-1 rounded ${producto.estado_producto === 'Vendido' ? 'bg-gray-200' : 'bg-green-100'}`}>
                {producto.estado_producto}
              </span>
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {producto.usuario?.direccion || 'Ubicación no especificada'}
              </span>
              <span className="text-gray-500">Publicado hace 2 horas</span>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-2 mb-6">
             
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded font-medium hover:bg-blue-700 transition">
                Contactar
              </button>
            </div>

            {/* Separador */}
            <div className="border-t border-gray-200 my-4"></div>

            {/* Descripción */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Descripción y/o Caracteristicas</h2>
              <p className="text-gray-700 whitespace-pre-line">{producto.descripcion}</p>
            </div>


            {/* Información del vendedor */}
            <div className="border-t border-gray-200 pt-4">
              <h2 className="text-lg font-semibold mb-2">Información del vendedor</h2>
              <p><span className="font-medium">Nombre:</span> {producto.usuario?.nombre|| 'No especificado'} {producto.usuario?.apellido_paterno|| 'no especificado'} {producto.usuario?.apellido_materno|| 'no especificado'}</p>
              <p><span className="font-medium">Miembro desde:</span> {producto.usuario?.created_at || 'Fecha no disponible'}</p>
            </div>
          </div>
        </div>

        <Link 
          href={route('home')} 
          className="inline-block mt-6 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
        >
          ← Volver
        </Link>
      </div>
    </>
  );
}