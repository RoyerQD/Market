import Navbar from '@/Layouts/Navbar';
import { Head, Link } from '@inertiajs/react';
import Main from '@/Components/Main';
export default function Welcome({ auth, categorias = [] }) {


    return (
        <>

            <Head title="Welcome" />
            <Navbar auth={auth} />
        <section class="bg-blue-50 py-12">
            <div class="container mx-auto px-4 text-center">
            <h2 class="text-3xl font-semibold mb-4">Compra y vende productos de segunda mano en tu ciudad</h2>
            <p class="text-gray-700 mb-6">Publica artículos que ya no uses o encuentra grandes ofertas cerca de ti.</p>
            <a href="/SubirProducto" class="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">Comienza ahora</a>
            </div>
        </section>
  
            
            <Main categorias={categorias} />


        <footer class="bg-white border-t mt-12">
            <div class="container mx-auto px-4 py-6 text-center text-gray-600">
            © 2025 GoodBuy Market. Todos los derechos reservados.
            </div>
        </footer>
        </>
    );
}