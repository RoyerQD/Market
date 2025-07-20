import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Layouts/Navbar';
import { useForm } from '@inertiajs/react';

export default function LibroReclamaciones({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        tipoDocumento: '',
        numeroDocumento: '',
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        direccion: '',
        tipoReclamo: 'Reclamo', // Puede ser 'Reclamo' o 'Queja'
        descripcion: '',
        pedido: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('libro-reclamaciones.store'));
    };

    return (
        <>
            <Head title="Libro de Reclamaciones" />
            <Navbar auth={auth} />
            
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Libro de Reclamaciones</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Tipo de Documento */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Tipo de Documento
                                </label>
                                <select
                                    value={data.tipoDocumento}
                                    onChange={e => setData('tipoDocumento', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#59bcb1] focus:ring-[#59bcb1]"
                                >
                                    <option value="">Seleccione...</option>
                                    <option value="DNI">DNI</option>
                                    <option value="CE">Carnet de Extranjería</option>
                                    <option value="Pasaporte">Pasaporte</option>
                                </select>
                                {errors.tipoDocumento && <p className="mt-1 text-sm text-red-600">{errors.tipoDocumento}</p>}
                            </div>

                            {/* Número de Documento */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Número de Documento
                                </label>
                                <input
                                    type="text"
                                    value={data.numeroDocumento}
                                    onChange={e => setData('numeroDocumento', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#59bcb1] focus:ring-[#59bcb1]"
                                />
                                {errors.numeroDocumento && <p className="mt-1 text-sm text-red-600">{errors.numeroDocumento}</p>}
                            </div>

                            {/* Nombre */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    value={data.nombre}
                                    onChange={e => setData('nombre', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#59bcb1] focus:ring-[#59bcb1]"
                                />
                                {errors.nombre && <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>}
                            </div>

                            {/* Apellido */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Apellido
                                </label>
                                <input
                                    type="text"
                                    value={data.apellido}
                                    onChange={e => setData('apellido', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#59bcb1] focus:ring-[#59bcb1]"
                                />
                                {errors.apellido && <p className="mt-1 text-sm text-red-600">{errors.apellido}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Correo Electrónico
                                </label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#59bcb1] focus:ring-[#59bcb1]"
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            {/* Teléfono */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Teléfono
                                </label>
                                <input
                                    type="tel"
                                    value={data.telefono}
                                    onChange={e => setData('telefono', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#59bcb1] focus:ring-[#59bcb1]"
                                />
                                {errors.telefono && <p className="mt-1 text-sm text-red-600">{errors.telefono}</p>}
                            </div>
                        </div>

                        {/* Dirección */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Dirección
                            </label>
                            <input
                                type="text"
                                value={data.direccion}
                                onChange={e => setData('direccion', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#59bcb1] focus:ring-[#59bcb1]"
                            />
                            {errors.direccion && <p className="mt-1 text-sm text-red-600">{errors.direccion}</p>}
                        </div>

                        {/* Tipo de Reclamo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Tipo
                            </label>
                            <select
                                value={data.tipoReclamo}
                                onChange={e => setData('tipoReclamo', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#59bcb1] focus:ring-[#59bcb1]"
                            >
                                <option value="Reclamo">Reclamo</option>
                                <option value="Queja">Queja</option>
                            </select>
                            {errors.tipoReclamo && <p className="mt-1 text-sm text-red-600">{errors.tipoReclamo}</p>}
                        </div>

                        {/* Descripción */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Detalle de la {data.tipoReclamo}
                            </label>
                            <textarea
                                value={data.descripcion}
                                onChange={e => setData('descripcion', e.target.value)}
                                rows={4}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#59bcb1] focus:ring-[#59bcb1]"
                            />
                            {errors.descripcion && <p className="mt-1 text-sm text-red-600">{errors.descripcion}</p>}
                        </div>

                        {/* Pedido */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Pedido
                            </label>
                            <textarea
                                value={data.pedido}
                                onChange={e => setData('pedido', e.target.value)}
                                rows={4}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#59bcb1] focus:ring-[#59bcb1]"
                                placeholder="¿Qué solución espera obtener?"
                            />
                            {errors.pedido && <p className="mt-1 text-sm text-red-600">{errors.pedido}</p>}
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#59bcb1] hover:bg-[#e47b5e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#59bcb1]"
                            >
                                {processing ? 'Enviando...' : 'Enviar Reclamo'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
