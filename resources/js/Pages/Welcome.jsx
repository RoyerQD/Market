import Navbar from '@/Layouts/Navbar';
import { Head, Link } from '@inertiajs/react';
import Main from '@/Components/Main';

export default function Welcome({ auth, categorias = [] }) {
  return (
    <>
      <Head title="Welcome" />
      <Navbar auth={auth} />

      {/* Hero */}
      <section className="bg-[#335350] py-12">
        <div className="container  mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-4 text-white">
            Compra y vende productos de segunda mano en tu ciudad
          </h2>
          <p className="text-white mb-6">
            Publica artículos que ya no uses o encuentra grandes ofertas cerca de ti.
          </p>
          <Link
            href="/SubirProducto"
            className="bg-[#e47b5e] text-white px-6 py-2 rounded-full hover:bg-[#c45f48] transition"
          >
            Comienza ahora
          </Link>
        </div>
      </section>



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
