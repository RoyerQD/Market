import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Layouts/Navbar';

export default function Soporte({ auth }) {
    const [activeTab, setActiveTab] = useState('faq');
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        asunto: '',
        mensaje: ''
    });

    const faqItems = [
        {
            pregunta: "¿Cómo puedo vender un producto?",
            respuesta: "Para vender un producto, debes iniciar sesión y hacer clic en 'Vender producto'. Rellena la información necesaria y sube fotos de calidad."
        },
        {
            pregunta: "¿Cómo funciona el sistema de pagos?",
            respuesta: "Utilizamos Mercado Pago como método de pago seguro. El dinero se mantiene en custodia hasta que el comprador confirme la recepción."
        },
        {
            pregunta: "¿Qué hacer si tengo problemas con una compra?",
            respuesta: "Si tienes problemas, contacta primero al vendedor. Si no hay solución, usa nuestro formulario de soporte y te ayudaremos."
        },
        {
            pregunta: "¿Cómo destaco mi producto?",
            respuesta: "Puedes destacar tu producto pagando una tarifa. Los productos destacados aparecen en la sección principal con mayor visibilidad."
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica para enviar el formulario
        console.log('Formulario enviado:', formData);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            <Head title="Soporte - GoodBuy Market" />
            <Navbar auth={auth} />

            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center text-[#59bcb1] mb-8">
                    Centro de Soporte
                </h1>

                {/* Tabs de navegación */}
                <div className="flex justify-center mb-8">
                    <button
                        onClick={() => setActiveTab('faq')}
                        className={`px-6 py-2 rounded-l-full ${
                            activeTab === 'faq'
                                ? 'bg-[#59bcb1] text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Preguntas Frecuentes
                    </button>
                    <button
                        onClick={() => setActiveTab('contact')}
                        className={`px-6 py-2 rounded-r-full ${
                            activeTab === 'contact'
                                ? 'bg-[#59bcb1] text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        Contacto
                    </button>
                </div>

                {/* Contenido principal */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    {activeTab === 'faq' ? (
                        <div className="space-y-6">
                            {faqItems.map((item, index) => (
                                <div key={index} className="border-b pb-4 last:border-0">
                                    <h3 className="text-lg font-semibold text-[#59bcb1] mb-2">
                                        {item.pregunta}
                                    </h3>
                                    <p className="text-gray-600">
                                        {item.respuesta}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#59bcb1] focus:outline-none focus:ring-[#59bcb1]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Correo electrónico
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#59bcb1] focus:outline-none focus:ring-[#59bcb1]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Asunto
                                </label>
                                <input
                                    type="text"
                                    name="asunto"
                                    value={formData.asunto}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#59bcb1] focus:outline-none focus:ring-[#59bcb1]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Mensaje
                                </label>
                                <textarea
                                    name="mensaje"
                                    value={formData.mensaje}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-[#59bcb1] focus:outline-none focus:ring-[#59bcb1]"
                                    required
                                ></textarea>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-[#e47b5e] text-white py-2 px-4 rounded-full hover:bg-[#c45f48] transition-colors duration-200"
                                >
                                    Enviar mensaje
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                {/* Información de contacto */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <div className="text-[#59bcb1] mb-2">
                            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Email</h3>
                        <p className="text-gray-600">soporte@goodbuymarket.com</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <div className="text-[#59bcb1] mb-2">
                            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Horario</h3>
                        <p className="text-gray-600">Lun - Vie: 9:00 - 18:00</p>
                        <p className="text-gray-600">Sáb: 9:00 - 13:00</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <div className="text-[#59bcb1] mb-2">
                            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Teléfono</h3>
                        <p className="text-gray-600">+51 123 456 789</p>
                    </div>
                </div>
            </div>
        </>
    );
}
