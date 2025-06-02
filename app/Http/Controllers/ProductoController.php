<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
