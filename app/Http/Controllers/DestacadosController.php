<?php

namespace App\Http\Controllers;

use App\Models\Destacados;
use Illuminate\Http\Request;

class DestacadosController extends Controller
{
       public function index()
    {
        // Devuelve solo los destacados vigentes
        $destacados = Destacados::with('producto')
            ->where('fecha_inicio', '<=', now())
            ->where('fecha_fin', '>=', now())
            ->get();

        return response()->json($destacados);
    }
        public function indexLista(){
            // Devuelve todos los destacados, sin filtrar por fecha
            $destacados = Destacados::with('producto')->get();

            return response()->json($destacados);
        }
    /**
     * Crear manualmente un destacado (opcional, normalmente se crea al confirmar pago)
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_producto' => 'required|exists:productos,id_producto',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after:fecha_inicio',
        ]);

        $destacado = Destacados::create([
            'id_producto' => $validated['id_producto'],
            'id_pago' => $request->input('id_pago'), // opcional
            'fecha_inicio' => $validated['fecha_inicio'],
            'fecha_fin' => $validated['fecha_fin'],
        ]);

        return response()->json([
            'message' => 'Destacado creado correctamente',
            'destacado' => $destacado
        ]);
    }
   

    /**
     * Mostrar los destacados de un producto específico
     */
    public function showPorProducto($id_producto)
    {
        $destacados = Destacados::where('id_producto', $id_producto)
            ->where('fecha_inicio', '<=', now())
            ->where('fecha_fin', '>=', now())
            ->get();

        return response()->json($destacados);
    }
}
