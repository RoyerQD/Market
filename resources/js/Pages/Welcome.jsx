import Navbar from '@/Layouts/Navbar';
import { Head, Link } from '@inertiajs/react';
import Main from '@/Components/Main';
import Promos from '@/Components/Promos';

export default function Welcome({ auth, categorias = [], destacados = [] }) {
  return (
    <>
      <Head title="Welcome" />
      <Navbar auth={auth} />

      {/* Hero */}
      <Promos destacados={destacados} />



      {/* Main con filtros */}
      <Main categorias={categorias} />

      {/* Footer */}
      <footer className="bg-black border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-white">
            <div>
                © 2025 GoodBuy Market. Todos los derechos reservados.
            </div>
          <div>libro de reclamos...</div>
        </div>
        
      </footer>
    </>
  );
}
