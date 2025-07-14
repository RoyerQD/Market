import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

// ... tus imports se quedan igual

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;
    const [isEditing, setIsEditing] = useState(false);

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            nombre: user.nombre || '',
            apellido_paterno: user.apellido_paterno || '',
            apellido_materno: user.apellido_materno || '',
            dni: user.dni || '',
            ruc: user.ruc || '',
            telefono: user.telefono || '',
            direccion: user.direccion || '',
            fecha_nacimiento: user.fecha_nacimiento || '',
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    const ReadOnlyField = ({ label, value }) => (
        <div className="mb-4">
            <p className="text-sm font-medium text-gray-600">{label}</p>
            <p className="mt-1 text-gray-800">{value || 'No especificado'}</p>
        </div>
    );

    return (
        <section className={`bg-white p-8 rounded-lg shadow-lg text-gray-800 ${className}`}>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Mi Perfil</h1>
                        {!isEditing && (
                            <button
                                type="button"
                                onClick={() => setIsEditing(true)}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                            >
                                Editar Perfil
                            </button>
                        )}
                    </div>

                    {isEditing ? (
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Campos con mejores colores */}
                                <div>
                                    <InputLabel htmlFor="nombre" value="Nombre" className="text-gray-600"/>
                                    <TextInput
                                        id="nombre"
                                        className="mt-1 block w-full text-gray-800 border-gray-300 focus:border-indigo-500"
                                        value={data.nombre}
                                        onChange={(e) => setData('nombre', e.target.value)}
                                        required
                                        autoComplete="nombre"
                                    />
                                    <InputError className="mt-2" message={errors.nombre} />
                                </div>

                                {/* Resto igual, mismo patrón */}
                                <div>
                                    <InputLabel htmlFor="apellido_paterno" value="Apellido Paterno" className="text-gray-600"/>
                                    <TextInput
                                        id="apellido_paterno"
                                        className="mt-1 block w-full text-gray-800 border-gray-300 focus:border-indigo-500"
                                        value={data.apellido_paterno}
                                        onChange={(e) => setData('apellido_paterno', e.target.value)}
                                        required
                                        autoComplete="apellido_paterno"
                                    />
                                    <InputError className="mt-2" message={errors.apellido_paterno} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="apellido_materno" value="Apellido Materno" className="text-gray-600"/>
                                    <TextInput
                                        id="apellido_materno"
                                        className="mt-1 block w-full text-gray-800 border-gray-300 focus:border-indigo-500"
                                        value={data.apellido_materno}
                                        onChange={(e) => setData('apellido_materno', e.target.value)}
                                        autoComplete="apellido_materno"
                                    />
                                    <InputError className="mt-2" message={errors.apellido_materno} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="telefono" value="Teléfono" className="text-gray-600"/>
                                    <TextInput
                                        id="telefono"
                                        type="tel"
                                        className="mt-1 block w-full text-gray-800 border-gray-300 focus:border-indigo-500"
                                        value={data.telefono}
                                        onChange={(e) => setData('telefono', e.target.value)}
                                        autoComplete="tel"
                                    />
                                    <InputError className="mt-2" message={errors.telefono} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="dni" value="DNI" className="text-gray-600"/>
                                    <TextInput
                                        id="dni"
                                        className="mt-1 block w-full text-gray-800 border-gray-300 focus:border-indigo-500"
                                        value={data.dni}
                                        onChange={(e) => setData('dni', e.target.value)}
                                        maxLength={8}
                                    />
                                    <InputError className="mt-2" message={errors.dni} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="ruc" value="RUC" className="text-gray-600"/>
                                    <TextInput
                                        id="ruc"
                                        className="mt-1 block w-full text-gray-800 border-gray-300 focus:border-indigo-500"
                                        value={data.ruc}
                                        onChange={(e) => setData('ruc', e.target.value)}
                                        maxLength={11}
                                    />
                                    <InputError className="mt-2" message={errors.ruc} />
                                </div>
                            </div>

                            <div className="col-span-2">
                                <InputLabel htmlFor="direccion" value="Dirección" className="text-gray-600"/>
                                <TextInput
                                    id="direccion"
                                    className="mt-1 block w-full text-gray-800 border-gray-300 focus:border-indigo-500"
                                    value={data.direccion}
                                    onChange={(e) => setData('direccion', e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.direccion} />
                            </div>

                            <div className="col-span-2">
                                <InputLabel htmlFor="email" value="Email" className="text-gray-600"/>
                                <TextInput
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full text-gray-800 border-gray-300 focus:border-indigo-500"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    autoComplete="username"
                                />
                                <InputError className="mt-2" message={errors.email} />
                            </div>

                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>Guardar</PrimaryButton>
                                <button
                                    type="button"
                                    className="text-indigo-600 underline hover:text-indigo-800"
                                    onClick={() => setIsEditing(false)}
                                >
                                    Cancelar
                                </button>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-green-600">Guardado.</p>
                                </Transition>
                            </div>
                        </form>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ReadOnlyField label="Nombre" value={data.nombre} />
                            <ReadOnlyField label="Apellido Paterno" value={data.apellido_paterno} />
                            <ReadOnlyField label="Apellido Materno" value={data.apellido_materno} />
                            <ReadOnlyField label="DNI" value={data.dni} />
                            <ReadOnlyField label="RUC" value={data.ruc} />
                            <ReadOnlyField label="Teléfono" value={data.telefono} />
                            <ReadOnlyField label="Dirección" value={data.direccion} />
                            <ReadOnlyField label="Email" value={data.email} />
                            
                            {mustVerifyEmail && user.email_verified_at === null && (
                                <div className="col-span-2">
                                    <p className="text-sm text-gray-600">
                                        Tu correo no está verificado.
                                        <Link
                                            href={route('verification.send')}
                                            method="post"
                                            as="button"
                                            className="rounded-md text-sm text-indigo-600 underline hover:text-indigo-800 ml-2"
                                        >
                                            Reenviar verificación.
                                        </Link>
                                    </p>
                                    {status === 'verification-link-sent' && (
                                        <div className="mt-2 text-sm font-medium text-green-600">
                                            Se envió un nuevo enlace de verificación.
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
