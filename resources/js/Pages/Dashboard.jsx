import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ pagos = [], auth }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Mis Pagos
        </h2>
      }
    >
      <Head title="Pagos" />

      <div className="py-12 max-w-6xl mx-auto px-4">
        {pagos.length === 0 ? (
          <p className="text-gray-600">No tienes pagos registrados.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID Pago</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Método</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pago Por</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pagos.map((pago) => (
                  <tr key={pago.id_pago}>
                    <td className="px-6 py-4 whitespace-nowrap">{pago.id_pago}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{pago.nombre_producto}</td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">{pago.metodo_pago}</td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">{pago.pago_por}</td>
                    <td className="px-6 py-4 whitespace-nowrap">S/ {Number(pago.monto).toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">{pago.estado_pago}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {pago.fecha_pago ? new Date(pago.fecha_pago).toLocaleString() : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
