import Navbar from '@/Layouts/Navbar';
import { Head, Link } from '@inertiajs/react';
import Main from '@/Components/Main';
import Promos from '@/Components/Promos';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Welcome({ auth, categorias = [], destacados = [] }) {
  return (
    <>
      <Head title="GoodByeMarket" />
      <Navbar auth={auth} />

      {/* Hero */}
      <Promos destacados={destacados} />



      {/* Main con filtros */}
      <Main categorias={categorias} />

      {/* Footer */}
     <footer className="bg-gray-900 text-white border-t mt-12">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Copyright */}
        <div>
          <h2 className="text-xl font-bold mb-4">GoodBuy Market</h2>
          <p className="text-sm">&copy; 2025 GoodBuy Market. Todos los derechos reservados.</p>
          <a href="#" className="text-sm underline hover:text-gray-300">Libro de Reclamaciones</a>
        </div>

        {/* Redes Sociales */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/share/1BZRQmpQQJ/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <i className="fab fa-facebook-f"></i> Facebook
            </a>
            <a href="https://www.tiktok.com/@goodbuy.markert?_t=ZM-8xsJPWeQGUH&_r=1" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <i className="fab fa-instagram"></i> Instagram
            </a>
            <a href="https://www.tiktok.com/@goodbuy.markert?_t=ZM-8xsJPWeQGUH&_r=1" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <i className="fab fa-tiktok"></i> Tiktok
            </a>
          </div>
        </div>

        {/* Normas y Políticas */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-gray-300">Términos y Condiciones</a></li>
            <li><a href="#" className="hover:text-gray-300">Política de Privacidad</a></li>
            <li><a href="#" className="hover:text-gray-300">Política de Cookies</a></li>
            <li><a href="#" className="hover:text-gray-300">Normas de la Comunidad</a></li>
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contacto</h3>
          <p className="text-sm">Correo: soporte@goodbuymarket.shop</p>
          <p className="text-sm">Tel: +51 123 456 789</p>
          <p className="text-sm">Dirección: Cusco, Perú</p>
        </div>
      </div>

      <div className="text-center py-4 text-gray-400 text-xs border-t border-gray-700">
        Hecho con ❤️ por el equipo de GoodBuy Market
      </div>
    </footer>

    </>
  );
}
