import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingSidebar, setShowingSidebar] = useState(true);

    return (
        <div>
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div
                className={`
                    fixed inset-y-0 left-0 z-30 w-64 bg-white border-r transform 
                    ${showingSidebar ? 'translate-x-0' : '-translate-x-full'}
                    transition-transform duration-300 ease-in-out
                    lg:translate-x-0 lg:static lg:inset-0
                `}
            >
                <div className="h-full flex flex-col">
                    {/* Logo */}
                        <div className="p-4 flex items-center gap-2 hover:scale-105 transition-transform duration-300">
                            <img
                            src="/images/LogoGoodMarket.png"
                            alt="GoodBuy Market Logo"
                            className="h-10 w-auto lg:h-12"
                            />
                                    
                            <Link href="/"  className="text-2xl font-extrabold tracking-wide text-[#59bcb1]">
                                GoodBuy Market
                            </Link>
                        </div>

                    {/* User Info */}
                    <div className="px-4 py-6 border-b">
                        <div className="flex items-center space-x-4">
                            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-xl text-gray-600">
                                    {user.nombre ? user.nombre[0].toUpperCase() : '?'}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">{user.nombre || user.email}</p>
                                <p className="text-xs text-gray-500">{user.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                        <div>
                            <NavLink
                                href={route('profile.edit')}
                                active={route().current('profile.edit')}
                                className="flex items-center px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-50"
                            >
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Perfil
                            </NavLink>
                        </div>

                        <div>
                            <NavLink
                                href={route('productos.misVentas')}
                                active={route().current('productos.misVentas')}
                                className="flex items-center px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-50"
                            >
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Mis Ventas
                            </NavLink>
                        </div>

                        <div>
                            <NavLink
                                href={route('dashboard')}
                                active={route().current('dashboard')}
                                className="flex items-center px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-50"
                            >
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                </svg>
                                Mis Pagos
                            </NavLink>
                        </div>

                        <div>
                            <NavLink
                                href={route('productos.misDestacados')}
                                active={route().current('productos.misDestacados')}
                                className="flex items-center px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-50"
                            >
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                                Mis Destacados
                            </NavLink>
                        </div>

                        <div className='pt-24'>
                            <Link
                                href="/"
                                className="flex items-center px-4 py-2 text-[#59bcb1] hover:text-[#e47b5e] rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Inicio
                            </Link>
                        </div>

                        <div>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="w-full flex items-center px-4 py-2 text-red-600 rounded-lg hover:bg-red-50"
                            >
                                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Cerrar Sesión
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Mobile Toggle Button */}
            <button
                onClick={() => setShowingSidebar(!showingSidebar)}
                className={`
                    fixed bottom-4 right-4 z-40 lg:hidden
                    h-12 w-12 rounded-full bg-indigo-600 text-white
                    flex items-center justify-center shadow-lg
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                `}
            >
                <svg
                    className="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        className={!showingSidebar ? 'inline-flex' : 'hidden'}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                    <path
                        className={showingSidebar ? 'inline-flex' : 'hidden'}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {header && (
                    <header className="bg-white shadow">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main className="flex-1 relative overflow-y-auto focus:outline-none">
                    <div className="py-6">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            {children}
                        </div>
                        
                    </div>
                </main>
            </div>
        </div>
        
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
    </div>  
    );
}
