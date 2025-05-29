import Navbar from '@/Layouts/Navbar';
import { Head, Link } from '@inertiajs/react';
import Main from '@/Components/Main';
export default function Welcome({ auth }) {
   
    return (
        <>
            <Head title="Welcome" />
            <Navbar auth={auth}>
               
            </Navbar>
            <Main>

            </Main>


           
        </>
    );
}
