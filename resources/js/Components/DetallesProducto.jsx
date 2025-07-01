import { Head, Link } from '@inertiajs/react';
import { useEffect } from 'react';

export default function DetallesProducto({ producto = {} }) {

  useEffect(() => {
    console.log("🟢 DetallesProducto.jsx montado");
    console.log("👉 producto recibido:", producto);
    console.log("👉 fotos:", producto.fotos);
  }, [producto]);

  return (
    <>
      <Head title={producto.nombre_producto} />

      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">{producto.nombre_producto}</h1>

        {/* 📸 Galería de fotos */}
        {producto.fotos?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {producto.fotos.map((foto, index) => {
              console.log(`✅ Foto #${index + 1}:`, foto);

              return (
                <img
                  key={index}
                  src={`/storage/${foto.ruta}`}
                  alt={`Foto ${index + 1}`}
                  className="w-full rounded shadow object-cover"
                />
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 mb-6">No hay fotos para este producto.</p>
        )}

        <p><strong>Descripción:</strong> {producto.descripcion}</p>
        <p><strong>Precio:</strong> S/ {producto.precio}</p>
        <p><strong>Condición:</strong> {producto.condicion}</p>
        <p><strong>Estado:</strong> {producto.estado_producto}</p>
        <p><strong>Vendedor:</strong> {producto.usuario?.name}</p>
        <p><strong>Categoría:</strong> {producto.categoria?.nombre ?? 'Sin categoría'}</p>

        <Link href={route('home')} className="inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Volver
        </Link>
      </div>
    </>
  );
}
