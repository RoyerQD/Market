<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Destacados;
use App\Models\Pago;
use App\Models\Producto;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Carga categorías con productos, usuarios y fotos
        $categorias = Categoria::with([
            'productos.usuario',
            'productos.fotos' => function ($query) {
                $query->limit(1);
            },
        ])->get();

        // Destacados: carga fotos también
        $destacados = Producto::whereHas('destacados', function ($query) {
            $query->where('fecha_inicio', '<=', now())
                ->where('fecha_fin', '>=', now());
        })
        ->with([
            'usuario',
            'destacados',
            'fotos' => function ($query) {
                $query->limit(1);
            },
        ])->get();

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'categorias' => $categorias,
            'destacados' => $destacados,
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
            'metodo_pago' => 'required|in:paypal,mercado_pago',
            'estado_pago' => 'required|in:completado,cancelado,fallido',
            'imagenes.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048', 
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

            // Guardar imágenes
        if ($request->hasFile('imagenes')) {
            $imagenes = is_array($request->file('imagenes'))
                ? $request->file('imagenes')
                : [$request->file('imagenes')];

            foreach ($imagenes as $imagen) {
                $ruta = $imagen->store('productos', 'public');

                DB::table('fotos_producto')->insert([
                    'id_producto' => $producto->id_producto,
                    'ruta' => $ruta,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

            DB::commit();

            return response()->json(['success' => true, 'producto' => $producto]);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => 'Error al guardar producto, pago o imágenes', 'detalle' => $e->getMessage()], 500);
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
    $producto = Producto::with(['usuario', 'categoria', 'fotos'])->findOrFail($id);

    return Inertia::render('DetallesProducto', [
        'producto' => $producto
    ]);
    }
    public function misDestacados()
{
    $user = auth()->user();

    $productos = Producto::with('destacados')
        ->where('id_usuario', $user->id_usuario)
        ->get()
        ->map(function ($producto) {
            $ahora = Carbon::now();
            $destacado = $producto->destacado;

            return [
                'id_producto' => $producto->id_producto,
                'nombre_producto' => $producto->nombre_producto,
                'precio' => $producto->precio,
                'imagen_url' => $producto->imagen ? asset('storage/' . $producto->imagen) : '/default.jpg',
                'es_destacado' => $destacado ? true : false,
                'fecha_inicio' => $destacado ? $destacado->fecha_inicio->format('d/m/Y') : null,
                'fecha_fin' => $destacado ? $destacado->fecha_fin->format('d/m/Y') : null,
                'tiempo_restante' => $destacado && $destacado->fecha_fin->isFuture()
                    ? $ahora->diffForHumans($destacado->fecha_fin, true)
                    : null,
            ];
        });

    return Inertia::render('ComponentesDeVentasProductos/MisDestacados', [
        'productos' => $productos,
    ]);
}




public function agregarDestacado(Request $request, Producto $producto)
{
    $request->validate([
        'semanas' => 'required|integer|min:1|max:52',
        'monto' => 'required|numeric',
        'metodo_pago' => 'required|in:paypal,mercado_pago',
        'estado_pago' => 'required|in:completado',
    ]);

    if ($request->estado_pago !== 'completado') {
        return response()->json(['error' => 'Pago no completado'], 400);
    }

    DB::beginTransaction();

    try {
        // 1️⃣ Registrar pago
        $pago = Pago::create([
            'id_usuario' => $producto->id_usuario,
            'id_producto' => $producto->id_producto,
            'metodo_pago' => $request->metodo_pago,
            'pago_por' => 'publicidad',
            'monto' => $request->monto,
            'estado_pago' => 'completado',
            'fecha_pago' => now(),
        ]);

        // 2️⃣ Calcular fechas
        $fecha_inicio = Carbon::now();
        $fecha_fin = $fecha_inicio->copy()->addWeeks($request->semanas);

        // 3️⃣ Crear destacado
        Destacados::create([
            'id_producto' => $producto->id_producto,
            'id_pago' => $pago->id_pago,
            'fecha_inicio' => $fecha_inicio,
            'fecha_fin' => $fecha_fin,
            'estado_destacado' => 'activo',
        ]);

        DB::commit();

        return response()->json(['success' => true]);

    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(['error' => 'Error al procesar destacado: '.$e->getMessage()], 500);
    }
}


public function misVentas()
{
    $user = auth()->user();

    $ventas = Producto::with(['usuario', 'fotos'])
                ->where('id_usuario', $user->id_usuario)
                ->get()
                ->map(function ($producto) {
                    return [
                        'id_producto' => $producto->id_producto,
                        'nombre_producto' => $producto->nombre_producto,
                        'precio' => $producto->precio,
                        'estado_producto' => ucfirst($producto->estado_producto),
                        'imagen_url' => $producto->fotos->first()
                            ? asset('storage/' . $producto->fotos->first()->ruta)
                            : '/default.jpg',
                        'fecha_venta' => optional($producto->fecha_publicacion)->format('d/m/Y'),
                        'visualizaciones' => rand(10, 100),
                        'mensajes' => rand(1, 10),
                        'comprador_nombre' => 'María G.',
                    ];
                });

    $totalGanancias = $ventas->where('estado_producto', 'Vendido')->sum('precio');
    $productosActivos = $ventas->where('estado_producto', 'Disponible')->count();
    $productosVendidos = $ventas->where('estado_producto', 'Vendido')->count();

    return inertia('ComponentesDePerfil/MisVentas', [
        'ventas' => $ventas,
        'totalGanancias' => $totalGanancias,
        'productosActivos' => $productosActivos,
        'productosVendidos' => $productosVendidos,
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
