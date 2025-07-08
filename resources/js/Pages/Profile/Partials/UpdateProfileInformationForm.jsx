import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={`max-w-5xl mx-auto bg-gradient-to-br from-[#1a2a4f] to-[#203668] p-8 rounded-lg shadow-lg text-white ${className}`}>
            <div className="flex flex-col md:flex-row gap-8">
                {/* Columna izquierda: Avatar + info */}
                <div className="flex flex-col items-center md:w-1/3">
                    <img
                        src="/storage/avatars/default.png"
                        alt="Avatar"
                        className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-white"
                    />
                    <h2 className="text-xl font-semibold">{user.name}</h2>
                    <p className="text-gray-300">{user.email}</p>
                    <p className="text-sm text-gray-400 mt-1">Miembro desde {new Date(user.created_at).getFullYear()}</p>

                    <div className="bg-[#1a2a4f] mt-6 p-4 rounded w-full">
                        <h3 className="text-md mb-2">📊 Estadísticas</h3>
                        <p>Productos vendidos: <b>12</b></p>
                        <p>Productos comprados: <b>8</b></p>
                        <p>Calificación: ⭐ 4.8</p>
                    </div>
                </div>

                {/* Columna derecha: Formulario */}
                <div className="md:w-2/3">
                    <h1 className="text-2xl font-bold mb-4">Mi Perfil</h1>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="name" value="Nombre" />
                            <TextInput
                                id="name"
                                className="mt-1 block w-full text-black"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                isFocused
                                autoComplete="name"
                            />
                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                className="mt-1 block w-full text-black"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                            />
                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        {mustVerifyEmail && user.email_verified_at === null && (
                            <div>
                                <p className="mt-2 text-sm text-gray-200">
                                    Tu correo no está verificado.
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="rounded-md text-sm text-gray-200 underline hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ml-2"
                                    >
                                        Reenviar verificación.
                                    </Link>
                                </p>
                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-400">
                                        Se envió un nuevo enlace de verificación.
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <PrimaryButton disabled={processing}>Guardar</PrimaryButton>
                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-gray-300">
                                    Guardado.
                                </p>
                            </Transition>
                        </div>
                    </form>

                    {/* Seguridad */}
                    <div className="mt-8">
                        <h3 className="text-md mb-2">🔒 Seguridad</h3>
                        <div className="flex flex-col md:flex-row gap-4">
                            <Link
                                href="#"
                                className="px-4 py-2 border rounded border-gray-400 hover:bg-[#1a2a4f]"
                            >
                                Cambiar Contraseña
                            </Link>
                            <Link
                                href="#"
                                className="px-4 py-2 border rounded border-gray-400 hover:bg-[#1a2a4f]"
                            >
                                Configurar 2FA
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
