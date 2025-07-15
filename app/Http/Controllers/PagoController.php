<?php

namespace App\Http\Controllers;

use App\Models\Pago;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PagoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
 public function crearPreferencia(Request $request)
{

}
public function index()
{
    $pagos = Pago::select(
            'pagos.id_pago',
            'pagos.metodo_pago',
            'pagos.pago_por',
            'pagos.monto',
            'pagos.estado_pago',
            'pagos.fecha_pago',
            'productos.nombre_producto'
        )
        ->join('productos', 'pagos.id_producto', '=', 'productos.id_producto')
        ->where('pagos.id_usuario', auth()->id()) // Opcional: filtra solo del usuario logueado
        ->orderByDesc('pagos.fecha_pago')
        ->get();

    return Inertia::render('Pagos/Index', [
        'pagos' => $pagos,
        'auth' => [
            'user' => auth()->user(),
        ],
    ]);
}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Pago $pago)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pago $pago)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pago $pago)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pago $pago)
    {
        //
    }
}
