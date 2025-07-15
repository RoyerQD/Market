import React from 'react';
import ResumenVentas from '@/Pages/ComponentesDePerfil/ResumenVentas';
import ItemVenta from '@/Pages/ComponentesDePerfil/ItemVenta';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function MisVentas({ ventas, totalGanancias, productosActivos, productosVendidos }) {
  return (
    <AuthenticatedLayout
        header={
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Mis Ventas
            </h2>
        }
    >
    <Head title="Mis Ventas" />
    <div className="container mx-auto text-black p-6">
      <h1 className="text-2xl font-bold mb-2">Mis Ventas</h1>
      <p className="mb-8">Gestiona tus productos y revisa tu historial de ventas</p>

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <ResumenVentas titulo="Ganancias Totales" valor={`$${totalGanancias}`} icono="$" color="text-green-400" />
        <ResumenVentas titulo="Productos Activos" valor={productosActivos} icono="👁️" />
        <ResumenVentas titulo="Productos Vendidos" valor={productosVendidos} icono="💬" />
      </div> */}

      <div className="space-y-6">
        {ventas.map((venta) => (
          <ItemVenta key={venta.id_producto} venta={venta} />
        ))}
      </div>
    </div>
    </AuthenticatedLayout>
  );
}
