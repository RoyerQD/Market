import { Link } from "@inertiajs/react";
import Dropdown from '@/Components/Dropdown';
export default function Navbar({ header, children, auth }) {
  
    return (
        
 <header className="flex items-center justify-between py-4 animate-on-scroll ">
                            <div className="flex items-center">
                                <div className="flex items-center hover:scale-105 transition-transform duration-300">
                                    <svg
                                        className="h-12 w-auto text-[#4CAF50] lg:h-16 animate-pulse"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M19 5H22L20.595 7.903C20.2147 8.59417 19.6989 9.20329 19.076 9.693C18.4531 10.1827 17.7359 10.5434 16.966 10.753L16 11H13L16 22H18L22 9H19C18.7348 9 18.4804 8.89464 18.2929 8.70711C18.1054 8.51957 18 8.26522 18 8V6C18 5.73478 18.1054 5.48043 18.2929 5.29289C18.4804 5.10536 18.7348 5 19 5Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M15 5H2C1.73478 5 1.48043 5.10536 1.29289 5.29289C1.10536 5.48043 1 5.73478 1 6V18C1 18.2652 1.10536 18.5196 1.29289 18.7071C1.48043 18.8946 1.73478 19 2 19H4.586C4.85122 19 5.10557 19.1054 5.29311 19.2929C5.48064 19.4804 5.586 19.7348 5.586 20V22C5.586 22.2652 5.69136 22.5196 5.87889 22.7071C6.06643 22.8946 6.32078 23 6.586 23H8.586C8.85122 23 9.10557 22.8946 9.29311 22.7071C9.48064 22.5196 9.586 22.2652 9.586 22V20C9.586 19.7348 9.69136 19.4804 9.87889 19.2929C10.0664 19.1054 10.3208 19 10.586 19H15C15.2652 19 15.5196 18.8946 15.7071 18.7071C15.8946 18.5196 16 18.2652 16 18V6C16 5.73478 15.8946 5.48043 15.7071 5.29289C15.5196 5.10536 15.2652 5 15 5ZM14 17H3C2.73478 17 2.48043 16.8946 2.29289 16.7071C2.10536 16.5196 2 16.2652 2 16V8C2 7.73478 2.10536 7.48043 2.29289 7.29289C2.48043 7.10536 2.73478 7 3 7H14C14.2652 7 14.5196 7.10536 14.7071 7.29289C14.8946 7.48043 15 7.73478 15 8V16C15 16.2652 14.8946 16.5196 14.7071 16.7071C14.5196 16.8946 14 17 14 17Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    <h1 className="ml-2 text-2xl font-bold text-[#4CAF50] lg:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-[#4CAF50] to-[#8BC34A]">
                                        GoodBuy Market
                                    </h1>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Buscar"
                                        className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] w-64"
                                    />
                                    <svg
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
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
                                <div className="flex space-x-2">
                                    <a href="https://twitter.com" className="text-black hover:text-[#4CAF50] transition-colors duration-300">
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                        </svg>
                                    </a>
                                    <a href="https://instagram.com" className="text-black hover:text-[#4CAF50] transition-colors duration-300">
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    <a href="https://youtube.com" className="text-black hover:text-[#4CAF50] transition-colors duration-300">
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M19.615 3.184c-1.104-.474-2.34-.894-3.615-1.066C14.725 2.946 12.573 3 12 3s-2.725-.054-4-.226c-1.275.172-2.511.592-3.615 1.066C3.28 4.358 2.56 5.146 2.1 6.184 1.64 7.222 1.5 8.41 1.5 10s.14 2.778.64 3.816c.46 1.038 1.18 1.826 2.285 2.344 1.104.474 2.34.894 3.615 1.066 1.275-.172 2.427-.226 3-.226s1.725.054 3 .226c1.275-.172 2.511-.592 3.615-1.066 1.104-.518 1.825-1.306 2.285-2.344.5-1.038.64-2.226.64-3.816s-.14-2.778-.64-3.816c-.46-1.038-1.18-1.826-2.285-2.344zM10 15v-6l4 3-4 3z" />
                                        </svg>
                                    </a>
                                </div>
                                <nav className="flex space-x-4">
                                    <Link href="#" className="text-black hover:text-[#4CAF50] transition-colors duration-300">
                                        Inicio
                                    </Link>
                                    <Link href="#" className="text-black hover:text-[#4CAF50] transition-colors duration-300">
                                        Productos
                                    </Link>
                                    <Link href="#" className="text-black hover:text-[#4CAF50] transition-colors duration-300">
                                        Soporte
                                    </Link>
                                    {auth.user ? (
                                      <div className="hidden sm:ms-6 sm:flex sm:items-center">
        <div className="relative ms-3">
            <Dropdown>
                <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                        <button
                            type="button"
                            className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                        >
                            {auth.user.name}

                            <svg
                                className="-me-0.5 ms-2 h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </span>
                </Dropdown.Trigger>

                <Dropdown.Content>
                    <Dropdown.Link href={route('profile.edit')}>
                        Profile
                    </Dropdown.Link>
                    <Dropdown.Link
                        href={route('logout')}
                        method="post"
                        as="button"
                    >
                        Log Out
                    </Dropdown.Link>
                </Dropdown.Content>
            </Dropdown>
        </div>
    </div>
                                    ) : (
                                        <>
                                            <Link
                                                href={route('login')}
                                                className="rounded-md px-4 py-2 text-black ring-1 ring-transparent transition-all hover:text-black/70 hover:bg-[#4CAF50]/10 hover:ring-[#4CAF50]/50 focus:outline-none focus-visible:ring-[#4CAF50] transform hover:-translate-y-1 duration-300 shadow hover:shadow-md"
                                            >
                                                Sign in
                                            </Link>
                                            <Link
                                                href={route('register')}
                                                className="rounded-md px-4 py-2 bg-[#4CAF50] text-white ring-1 ring-[#4CAF50] transition-all hover:bg-[#43A047] hover:ring-[#43A047] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4CAF50] transform hover:-translate-y-1 duration-300 shadow-md hover:shadow-lg"
                                            >
                                                Register
                                            </Link>
                                        </>
                                    )}
                                </nav>
                            </div>
                        </header>
    );

}