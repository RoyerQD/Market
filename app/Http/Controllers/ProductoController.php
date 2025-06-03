<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Pago;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
     $categorias = Categoria::with(['productos.usuario'])->get();

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'categorias' => $categorias,
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
    public function storeConPago(Request $request)
    {
        //
    
    }

    public function iniciarPago(Request $request)
    {
        //
        $request->validate([
            'nombre_producto' => 'required',
            'descripcion' => 'nullable',
            'precio' => 'required|numeric',
            'condicion' => 'required',
            'id_categoria' => 'nullable|exists:categorias,id_categoria',
        ]);

        return response()->json([
            'success' => true,
            'mensaje' => 'Listo para procesar el pago',
            'data' => $request->all(),
        ]);
    }
    
    public function completarPago(Request $request)
    {
    $request->validate([
        'id_usuario' => 'required|exists:users,id_usuario',
        'nombre_producto' => 'required',
        'descripcion' => 'nullable',
        'precio' => 'required|numeric',
        'condicion' => 'required',
        'id_categoria' => 'nullable|exists:categorias,id_categoria',
        'metodo_pago' => 'required|in:paypal,otros',
        'estado_pago' => 'required|in:completado,cancelado,fallido',
    ]);

    if ($request->estado_pago !== 'completado') {
        return response()->json(['error' => 'El pago no fue completado'], 400);
    }

    DB::beginTransaction();
    try {
        $producto = Producto::create([
            'id_usuario' => $request->id_usuario,
            'id_categoria' => $request->id_categoria,
            'nombre_producto' => $request->nombre_producto,
            'descripcion' => $request->descripcion,
            'precio' => $request->precio,
            'condicion' => $request->condicion,
            'fecha_publicacion' => now(),
            'estado_producto' => 'disponible',
        ]);

        Pago::create([
            'id_usuario' => $request->id_usuario,
            'id_producto' => $producto->id_producto,
            'metodo_pago' => $request->metodo_pago,
            'pago_por' => 'subir_producto',
            'monto' => 3.00,
            'estado_pago' => 'completado',
            'fecha_pago' => now(),
        ]);

        DB::commit();
        return response()->json(['success' => true, 'producto' => $producto]);
    } catch (\Exception $e) {
        DB::rollback();
        return response()->json(['error' => 'Error al guardar producto o pago'], 500);
    }
    }

    public function store(Request $request)
    {
        //
          $request->validate([
            'nombre' => 'required',
            'precio' => 'required|numeric',
        ]);

        Producto::create($request->only('nombre', 'precio'));

        return redirect()->route('productos.index');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
    $producto = Producto::with('usuario', 'categoria')->findOrFail($id);

    return Inertia::render('DetallesProducto', [
        'producto' => $producto,
    ]);
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Producto $producto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Producto $producto)
    {
        //
         $request->validate([
            'nombre' => 'required',
            'precio' => 'required|numeric',
        ]);

        $producto->update($request->only('nombre', 'precio'));

        return redirect()->route('productos.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Producto $producto)
    {
        //
        $producto->delete();
        return redirect()->route('productos.index');
    }
}
