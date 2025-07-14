import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#1a2a4f] to-[#203668] py-8">
            <Head title="Iniciar Sesión" />

            <div className="max-w-xl mx-auto px-4">
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
                                Iniciar Sesión
                            </h2>
                            <p className="mt-2 text-lg text-gray-600">
                                Bienvenido de vuelta a GoodBuy Market
                            </p>
                        </div>

                        {status && (
                            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="email" value="Email" className="text-lg" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-2 block w-full text-lg"
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) => setData('email', e.target.value)}
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
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500"
                                    />
                                    <span className="ms-2 text-sm text-gray-600">
                                        Recordar sesión
                                    </span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                )}
                            </div>

                            <div className="pt-6 flex flex-col space-y-4">
                                <PrimaryButton className="w-full justify-center py-3 text-lg" disabled={processing}>
                                    {processing ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                                </PrimaryButton>

                                <div className="text-center">
                                    <Link
                                        href={route('register')}
                                        className="text-lg text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        ¿No tienes cuenta? Regístrate
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
