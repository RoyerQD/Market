<?php

namespace App\Http\Controllers;

use App\Models\Pago;
use Illuminate\Http\Request;
use MercadoPago\SDK;
use MercadoPago\Preference;
use MercadoPago\Item;


class PagoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
 public function crearPreferencia(Request $request)
{
  \MercadoPago\SDK::setAccessToken(env('MERCADO_PAGO_ACCESS_TOKEN'));

    $preference = new Preference();

    $item = new Item();
    $item->title = $request->descripcion ?? 'Pago por publicación';
    $item->quantity = 1;
    $item->unit_price = (float) $request->precio;

    $preference->items = [$item];
    $preference->back_urls = [
        'success' => url('/pago-exitoso'),
        'failure' => url('/pago-fallido'),
        'pending' => url('/pago-pendiente'),
    ];
    $preference->auto_return = "approved";

    $preference->save();

    return response()->json(['preference_id' => $preference->id]);
}
    public function index()
    {
        //
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
