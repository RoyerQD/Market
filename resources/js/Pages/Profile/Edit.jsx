import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold leading-tight text-slate-800">
                    Mi Perfil
                </h2>
            }
        >
            <Head title="Perfil" />

            <div className="py-12 bg-slate-50">
                <div className="mx-auto max-w-7xl space-y-12 sm:px-6 lg:px-8">

                    {/* Información de perfil */}
                    <div className="bg-white overflow-hidden shadow-md rounded-2xl border border-slate-200">
                        <div className="px-6 py-6 sm:px-8">
                            <h3 className="text-xl font-semibold text-slate-800">
                                Información personal
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">
                                Actualiza tu nombre, apellidos, DNI, correo y otros datos básicos.
                            </p>

                            <div className="mt-6">
                                <UpdateProfileInformationForm
                                    mustVerifyEmail={mustVerifyEmail}
                                    status={status}
                                    className="max-w-2xl"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Cambiar contraseña */}
                    {/* <div className="bg-white overflow-hidden shadow-md rounded-2xl border border-slate-200">
                        <div className="px-6 py-6 sm:px-8">
                            <h3 className="text-xl font-semibold text-slate-800">
                                Cambiar contraseña
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">
                                Mantén tu cuenta segura usando una contraseña fuerte y única.
                            </p>

                            <div className="mt-6">
                                <UpdatePasswordForm className="max-w-xl" />
                            </div>
                        </div>
                    </div> */}

                    {/* Eliminar cuenta */}
                    {/* <div className="bg-white overflow-hidden shadow-md rounded-2xl border border-slate-200">
                        <div className="px-6 py-6 sm:px-8">
                            <h3 className="text-xl font-semibold text-red-600">
                                Eliminar cuenta
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">
                                Esta acción es permanente y eliminará todos tus datos.
                            </p>

                            <div className="mt-6">
                                <DeleteUserForm className="max-w-xl" />
                            </div>
                        </div>
                    </div> */}

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
