import Navbar from '@/Layouts/Navbar';
import { Head, Link } from '@inertiajs/react';
import Main from '@/Components/Main';
export default function Welcome({ auth, categorias = [] }) {
    console.log("CATEGORIAS EN WELCOME", categorias);

    return (
        <>
            <Head title="Welcome" />
            <Navbar auth={auth} />
            <Main categorias={categorias} />
        </>
    );
}