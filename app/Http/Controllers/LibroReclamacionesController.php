<?php

namespace App\Http\Controllers;

use App\Models\Reclamacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LibroReclamacionesController extends Controller
{
    public function index()
    {
        return inertia('LibroReclamaciones', [
            'auth' => [
                'user' => Auth::user()
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tipoDocumento' => 'required|string',
            'numeroDocumento' => 'required|string',
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'email' => 'required|email',
            'telefono' => 'required|string',
            'direccion' => 'required|string',
            'tipoReclamo' => 'required|in:Reclamo,Queja',
            'descripcion' => 'required|string',
            'pedido' => 'required|string',
        ]);

        $reclamacion = Reclamacion::create($validated);

        // Aquí podrías agregar lógica adicional como:
        // - Enviar email al cliente
        // - Enviar email al administrador
        // - Generar un PDF del reclamo

        return redirect()->back()->with('success', 'Su reclamo ha sido registrado correctamente. Número de reclamo: ' . $reclamacion->id);
    }
}
