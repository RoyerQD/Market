import { Head, Link } from '@inertiajs/react';
import  Navbar  from '@/Layouts/Navbar';
export default function DetallesProducto({auth, producto }) {
    return (
        <>
            <Head title={producto.nombre_producto} />
 <Navbar auth={auth} />

        <div className="p-6">
            <h1 className="text-2xl font-bold">{producto.nombre_producto}</h1>
            <p>{producto.descripcion}</p>
            <p><strong>Precio:</strong> S/ {producto.precio}</p>
            <p><strong>Condición:</strong> {producto.condicion}</p>
            <p><strong>Estado:</strong> {producto.estado_producto}</p>
        </div>
        </>
    );
}
