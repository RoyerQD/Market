<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SoporteController extends Controller
{
    public function index()
    {
        return inertia('Soporte');
    }

    public function enviarMensaje(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'asunto' => 'required|string|max:255',
            'mensaje' => 'required|string',
        ]);

        // Aquí puedes agregar la lógica para manejar el mensaje
        // Por ejemplo, enviar un email, guardar en base de datos, etc.

        return redirect()->back()->with('success', 'Mensaje enviado correctamente');
    }
}
