import { Head, Link } from '@inertiajs/react';

export default function DetallesProducto({ producto=[] }) {
    return (
        <>
            <Head title={producto.nombre_producto} />
            <div className="container">
                <h1>{producto.nombre_producto}</h1>
                <p><strong>Descripción:</strong> {producto.descripcion}</p>
                <p><strong>Precio:</strong> S/ {producto.precio}</p>
                <p><strong>Condición:</strong> {producto.condicion}</p>
                <p><strong>Estado:</strong> {producto.estado_producto}</p>
                <p><strong>Vendedor:</strong> {producto.usuario.name}</p>
                <p><strong>Categoría:</strong> {producto.categoria?.nombre ?? 'Sin categoría'}</p>

                <Link href={route('home')} className="btn">Volver</Link>
            </div>
        </>
    );
}
