import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';
import Checkbox from '@/Components/Checkbox';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        dni: '',
        ruc: '',
        telefono: '',
        direccion: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [consultandoRuc, setConsultandoRuc] = useState(false);
    const [datosRuc, setDatosRuc] = useState(null);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const handleRucConsulta = async () => {
        if (data.ruc.length !== 11) {
            alert('El RUC debe tener 11 dígitos');
            return;
        }

        setConsultandoRuc(true);
        try {
            const response = await axios.get(`/sunat/${data.ruc}`);
            const info = response.data;

            if (info.estado !== 'ACTIVO') {
                alert('El RUC no se encuentra activo en SUNAT');
                setData('ruc', '');
                setDatosRuc(null);
                return;
            }

            setDatosRuc(info);
            setData(data => ({
                ...data,
                direccion: info.direccion || data.direccion
            }));

        } catch (error) {
            console.error(error);
            alert('No se pudo consultar SUNAT. Por favor, intente nuevamente.');
        } finally {
            setConsultandoRuc(false);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        if (!datosRuc) {
            alert('Por favor, consulta y valida el RUC antes de continuar.');
            return;
        }
        if (!acceptedTerms) {
            alert('Debe aceptar los términos y condiciones.');
            return;
        }

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1a2a4f] to-[#203668] py-8">
            <Head title="Registro" />

            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <Link href="/" className="flex items-center space-x-3">
                            <img 
                                src="/images/LogoGoodMarket.png" 
                                alt="GoodMarket Logo" 
                                className="w-12 h-12 object-contain"
                            />
                            <span className="text-xl font-bold text-[#59bcb1]">GoodBuy Market</span>
                        </Link>
                    </div>
                    <div className="p-6 sm:p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-[#59bcb1]">
                                Crear una cuenta
                            </h2>
                            <p className="mt-2 text-lg text-gray-600">
                                Para registrarte en GoodBuy Market es necesario confirmar tu RUC y verificar tus datos reales.
                                <br />
                                Esto garantiza un entorno seguro y confiable para todos.
                            </p>
                        </div>

                        <form onSubmit={submit} className="space-y-8">
                            {/* RUC Section */}
                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                <p className="mb-4 text-gray-600 text-sm">
                                    Primero ingresa tu RUC y verifica su estado en SUNAT.
                                    Es requisito estar activo y habido para operar en GoodBuy Market.
                                </p>
                                <div className="flex gap-4 items-start">
                                    <div className="flex-1">
                                        <InputLabel htmlFor="ruc" value="RUC" className="text-lg" />
                                        <TextInput
                                            id="ruc"
                                            name="ruc"
                                            value={data.ruc}
                                            className="mt-2 block w-full text-lg"
                                            maxLength="11"
                                            onChange={(e) => {
                                                const newRuc = e.target.value.replace(/\D/g, '');
                                                setData('ruc', newRuc);
                                                setDatosRuc(null);
                                            }}
                                            required
                                            placeholder="Ingresa tu RUC"
                                        />
                                        {datosRuc && (
                                            <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                                <p className="text-sm text-gray-600">
                                                    Estado: <span className="font-medium text-green-600">{datosRuc.estado}</span><br/>
                                                    Condición: <span className="font-medium">{datosRuc.condicion}</span>
                                                </p>
                                            </div>
                                        )}
                                        <InputError message={errors.ruc} className="mt-2" />
                                    </div>
                                    <div className="mt-8">
                                        <button
                                            type="button"
                                            onClick={handleRucConsulta}
                                            disabled={consultandoRuc || data.ruc.length !== 11}
                                            className={`inline-flex items-center px-6 py-3 bg-blue-600 border border-transparent rounded-lg font-semibold text-sm text-white uppercase tracking-widest transition ease-in-out duration-150
                                                ${consultandoRuc || data.ruc.length !== 11 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 active:bg-blue-800'}
                                            `}
                                        >
                                            {consultandoRuc ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Consultando...
                                                </>
                                            ) : 'Consultar'}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Campos adicionales solo si el RUC es válido */}
                            {datosRuc && (
                                <>
                                    {/* Personal Information */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="col-span-2">
                                            <InputLabel htmlFor="dni" value="DNI" className="text-lg" />
                                            <TextInput
                                                id="dni"
                                                name="dni"
                                                value={data.dni}
                                                maxLength="8"
                                                onChange={(e) => {
                                                    const newDni = e.target.value.replace(/\D/g, '');
                                                    setData('dni', newDni);
                                                }}
                                                className="mt-2 block w-full text-lg"
                                                placeholder="Ingresa tu DNI"
                                            />
                                            <p className="mt-1 text-xs text-gray-500">
                                                Los datos en este campo deben coincidir con tus documentos.
                                                Si no coinciden, no podremos aprobar tu registro.
                                            </p>
                                            <InputError message={errors.dni} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="nombre" value="Nombre(s)" className="text-lg" />
                                            <TextInput
                                                id="nombre"
                                                name="nombre"
                                                value={data.nombre}
                                                className="mt-2 block w-full text-lg"
                                                onChange={(e) => setData('nombre', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.nombre} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="apellido_paterno" value="Apellido Paterno" className="text-lg" />
                                            <TextInput
                                                id="apellido_paterno"
                                                name="apellido_paterno"
                                                value={data.apellido_paterno}
                                                className="mt-2 block w-full text-lg"
                                                onChange={(e) => setData('apellido_paterno', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.apellido_paterno} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="apellido_materno" value="Apellido Materno" className="text-lg" />
                                            <TextInput
                                                id="apellido_materno"
                                                name="apellido_materno"
                                                value={data.apellido_materno}
                                                className="mt-2 block w-full text-lg"
                                                onChange={(e) => setData('apellido_materno', e.target.value)}
                                                required
                                            />
                                            <InputError message={errors.apellido_materno} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="telefono" value="Teléfono" className="text-lg" />
                                            <TextInput
                                                id="telefono"
                                                type="tel"
                                                name="telefono"
                                                value={data.telefono}
                                                className="mt-2 block w-full text-lg"
                                                onChange={(e) => setData('telefono', e.target.value.replace(/\D/g, ''))}
                                                maxLength="9"
                                                required
                                                placeholder="Ejemplo: 987654321"
                                            />
                                            <InputError message={errors.telefono} className="mt-2" />
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                        <InputLabel htmlFor="direccion" value="Dirección" className="text-lg" />
                                        <TextInput
                                            id="direccion"
                                            name="direccion"
                                            value={data.direccion}
                                            className="mt-2 block w-full text-lg"
                                            onChange={(e) => setData('direccion', e.target.value)}
                                            required
                                            placeholder="Tu dirección fiscal"
                                        />
                                        <InputError message={errors.direccion} className="mt-2" />
                                    </div>

                                    {/* Account Information */}
                                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="col-span-2">
                                                <InputLabel htmlFor="email" value="Email" className="text-lg" />
                                                <TextInput
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    value={data.email}
                                                    className="mt-2 block w-full text-lg"
                                                    onChange={(e) => setData('email', e.target.value)}
                                                    required
                                                    placeholder="tu@email.com"
                                                />
                                                <InputError message={errors.email} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="password" value="Contraseña" className="text-lg" />
                                                <TextInput
                                                    id="password"
                                                    type="password"
                                                    name="password"
                                                    value={data.password}
                                                    className="mt-2 block w-full text-lg"
                                                    onChange={(e) => setData('password', e.target.value)}
                                                    required
                                                    autoComplete="new-password"
                                                />
                                                <InputError message={errors.password} className="mt-2" />
                                            </div>

                                            <div>
                                                <InputLabel htmlFor="password_confirmation" value="Confirmar Contraseña" className="text-lg" />
                                                <TextInput
                                                    id="password_confirmation"
                                                    type="password"
                                                    name="password_confirmation"
                                                    value={data.password_confirmation}
                                                    className="mt-2 block w-full text-lg"
                                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                                    required
                                                    autoComplete="new-password"
                                                />
                                                <InputError message={errors.password_confirmation} className="mt-2" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Terms and Conditions */}
                                    <label className="flex items-center space-x-2 mt-4">
                                        <Checkbox
                                            checked={acceptedTerms}
                                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                                        />
                                        <span className="text-sm text-gray-700">
                                            Acepto los <Link href="/TerminosCondiciones" className="text-blue-600 underline">términos y condiciones</Link> de GoodBuy Market.
                                        </span>
                                    </label>

                                    <div className="flex items-center justify-between pt-6">
                                        <Link
                                            href={route('login')}
                                            className="text-lg text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            ¿Ya tienes cuenta? Inicia sesión
                                        </Link>

                                        <PrimaryButton 
                                            className="px-8 py-3 text-lg" 
                                            disabled={processing || !datosRuc || !acceptedTerms}
                                        >
                                            {processing ? 'Registrando...' : 'Crear Cuenta'}
                                        </PrimaryButton>
                                    </div>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
