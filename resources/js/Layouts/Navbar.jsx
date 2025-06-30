import { Link } from "@inertiajs/react";
import Dropdown from "@/Components/Dropdown";

export default function Navbar({ header, children, auth }) {
    return (
        <header className="flex items-center justify-between py-4 px-6 bg-white shadow-md sticky top-0 z-50">
            {/* Logo y título */}
            <div className="flex items-center gap-2 hover:scale-105 transition-transform duration-300">
               <img
                src="/imagenes/LogoGoodMarket.png"
                alt="GoodBuy Market Logo"
                className="h-10 w-auto lg:h-12"
                />
                <h1 className="text-2xl font-extrabold tracking-wide text-[#59bcb1]">
                    GoodBuy Market
                </h1>
            </div>

            {/* Barra de búsqueda + redes + nav */}
            <div className="flex items-center gap-4">
                {/* Buscar */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        className="pl-10 pr-4 py-2 rounded-full border border-[#59bcb1]/50 bg-white text-[#59bcb1] placeholder-[#59bcb1]/60 focus:outline-none focus:ring-2 focus:ring-[#59bcb1] w-64 transition-shadow shadow-sm hover:shadow focus:shadow-md"
                    />
                    <svg
                        className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#59bcb1]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>

                {/* Redes */}
                <div className="flex gap-3">
                    <a href="https://twitter.com" className="text-[#59bcb1] hover:text-[#e47b5e] transition-colors">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.29 20.251c7.547 0 ..." />
                        </svg>
                    </a>
                    <a href="https://instagram.com" className="text-[#59bcb1] hover:text-[#e47b5e] transition-colors">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.315 2c2.43 0 ..." />
                        </svg>
                    </a>
                    <a href="https://youtube.com" className="text-[#59bcb1] hover:text-[#e47b5e] transition-colors">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19.615 3.184..." />
                        </svg>
                    </a>
                </div>

                {/* Links nav */}
                <nav className="flex items-center gap-4">
                    <Link href="/" className="text-[#59bcb1] hover:text-[#e47b5e] font-medium transition-colors">
                        Inicio
                    </Link>
                    <Link href="#" className="text-[#59bcb1] hover:text-[#e47b5e] font-medium transition-colors">
                        Soporte
                    </Link>

                    {auth.user ? (
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="inline-flex items-center px-3 py-2 text-sm text-[#59bcb1] hover:text-[#e47b5e] border rounded-full border-[#59bcb1] shadow-sm hover:shadow-md transition">
                                    {auth.user.name}
                                    <svg
                                        className="ml-2 h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10..."
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>
                                    Perfil
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                >
                                    Cerrar sesión
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="px-4 py-2 border border-[#59bcb1] rounded-full text-[#59bcb1] hover:bg-[#59bcb1] hover:text-white transition"
                            >
                                Iniciar sesión
                            </Link>
                            <Link
                                href={route('register')}
                                className="px-4 py-2 bg-[#e47b5e] rounded-full text-white hover:bg-[#c45f48] transition"
                            >
                                Registrarse
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}
