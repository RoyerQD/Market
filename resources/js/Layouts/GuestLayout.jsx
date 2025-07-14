import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
                        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
                            <div className="p-8">
                                {children}
                            </div>
                        </div>
        </div>
    );
}
