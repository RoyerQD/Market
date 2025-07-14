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
use Illuminate\Support\Facades\Log;
use MercadoPago\MercadoPagoConfig;
use MercadoPago\Client\Preference\PreferenceClient;
use MercadoPago\Resources\Preference;
use Exception;

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
    ///////////////

    
    public function completarPago(Request $request)
    {
        try {
            Log::info('Iniciando proceso de pago', [
                'request' => $request->all(),
                'token' => config('services.mercadopago.token'),
                'public_key' => config('services.mercadopago.public_key')
            ]);

            $request->validate([
                'id_usuario' => 'required|exists:users,id_usuario',
                'nombre_producto' => 'required',
                'descripcion' => 'nullable',
                'precio' => 'required|numeric',
                'condicion' => 'required',
                'id_categoria' => 'nullable|exists:categorias,id_categoria',
                'metodo_pago' => 'required|in:paypal,mercado_pago',
                'imagenes.*' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);

            if ($request->metodo_pago === 'mercado_pago') {
                try {
                    $accessToken = config('services.mercadopago.token');
                    if (empty($accessToken)) {
                        Log::error('Token de Mercado Pago no configurado');
                        throw new Exception('Error de configuración: MP_ACCESS_TOKEN no está configurado en el archivo .env');
                    }

                    Log::info('Configurando Mercado Pago', [
                        'token_exists' => !empty($accessToken),
                        'token_length' => strlen($accessToken)
                    ]);

                    try {
                        MercadoPagoConfig::setAccessToken($accessToken);
                        Log::info('Mercado Pago configurado correctamente');
                    } catch (Exception $e) {
                        Log::error('Error al configurar Mercado Pago', [
                            'error' => $e->getMessage(),
                            'trace' => $e->getTraceAsString()
                        ]);
                        throw new Exception('Error al configurar Mercado Pago: ' . $e->getMessage());
                    }

                    $preference_data = array(
                        "items" => array(
                            array(
                                "title" => "Publicación de producto",
                                "quantity" => 1,
                                "currency_id" => "PEN",
                                "unit_price" => 1.00
                            )
                        )
                    );

                    Log::info('Datos de preferencia preparados', [
                        'preference_data' => $preference_data
                    ]);

                    try {
                        $client = new PreferenceClient();
                        $preference = $client->create($preference_data);
                        
                        Log::info('Preferencia creada exitosamente', [
                            'preference_id' => $preference->id ?? 'no_id',
                            'init_point' => $preference->init_point ?? 'no_init_point'
                        ]);

                        return response()->json([
                            'init_point' => $preference->init_point,
                            'preference_id' => $preference->id
                        ]);
                    } catch (Exception $e) {
                        Log::error('Error al crear preferencia en Mercado Pago', [
                            'error' => $e->getMessage(),
                            'code' => $e->getCode(),
                            'trace' => $e->getTraceAsString()
                        ]);
                        throw new Exception('Error al crear preferencia: ' . $e->getMessage());
                    }

                    // Crear la preferencia con modo modal
                    $preference_data = [
                        "items" => [[
                            "title" => "Publicación: " . $request->nombre_producto,
                            "quantity" => 1,
                            "currency_id" => "PEN",
                            "unit_price" => 3.00
                        ]],
                        "back_urls" => [
                            "success" => route('productos.pago.success'),
                            "failure" => route('productos.pago.failure'),
                            "pending" => route('productos.pago.pending')
                        ],
                        "auto_return" => "approved",
                        "payment_methods" => [
                            "installments" => 1
                        ],
                        "redirect_urls" => [
                            "success" => route('productos.pago.success'),
                            "failure" => route('productos.pago.failure'),
                            "pending" => route('productos.pago.pending')
                        ],
                        "binary_mode" => true
                    ];
                    
                    Log::info('Ambiente de la aplicación', [
                        'env' => config('app.env'),
                        'is_local' => $isLocal
                    ]);

                    // En ambiente local, usar ngrok o un dominio de prueba
                    $baseUrl = $isLocal 
                        ? 'https://goodbuymarket.shop'  // Reemplaza con tu URL de ngrok
                        : config('app.url');

                    $preference_data = [
                        "items" => [[
                            "title" => "Publicación: " . $request->nombre_producto,
                            "quantity" => 1,
                            "currency_id" => "PEN",
                            "unit_price" => 3.00
                        ]],
                        "back_urls" => [
                            "success" => $baseUrl . '/productos/pago/success',
                            "failure" => $baseUrl . '/productos/pago/failure',
                            "pending" => $baseUrl . '/productos/pago/pending'
                        ],
                        "notification_url" => $baseUrl . '/webhooks/mercadopago',
                        "auto_return" => "approved"
                    ];
                    
                    Log::info('Datos de preferencia preparados', [
                        'preference_data' => $preference_data,
                        'base_url' => $baseUrl
                    ]);

                    Log::info('Datos de preferencia', ['preference_data' => $preference_data]);
                    
                    $preference = $client->create($preference_data);

                // Retornar el init_point
                    if (!isset($preference->id)) {
                        Log::error('Preferencia creada sin ID', ['preference' => $preference]);
                        throw new Exception('Error al crear la preferencia de pago');
                    }

                    Log::info('Preferencia creada exitosamente', ['preference_id' => $preference->id]);
                    
                    return response()->json([
                        'init_point' => $preference->init_point,
                        'preference_id' => $preference->id
                    ]);

                } catch (Exception $e) {
                    Log::error('Error al crear preferencia', [
                        'error' => $e->getMessage(),
                        'trace' => $e->getTraceAsString()
                    ]);
                    return response()->json([
                        'error' => 'Error al crear preferencia de pago: ' . $e->getMessage()
                    ], 500);
                }
            }

            // Si llegamos aquí, algo salió mal
            Log::warning('Método de pago no soportado', ['metodo' => $request->metodo_pago]);
            return response()->json(['error' => 'Método de pago no soportado'], 400);            } catch (Exception $e) {
                Log::error('Error general en completarPago', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
                
                if (config('app.debug')) {
                    return response()->json([
                        'error' => 'Error en el proceso de pago',
                        'message' => $e->getMessage(),
                        'file' => $e->getFile(),
                        'line' => $e->getLine(),
                        'trace' => $e->getTraceAsString()
                    ], 500);
                }
                
                return response()->json(['error' => 'Error en el proceso de pago: ' . $e->getMessage()], 500);
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
                       'imagen_url' => $producto->fotos->first()
                            ? asset('storage/' . $producto->fotos->first()->ruta)
                            : '/default.jpg',
                    'es_destacado' => $destacado ? true : false,
                    'fecha_inicio' => $destacado ? $destacado->fecha_inicio->format('d/m/Y') : null,
                    'fecha_fin' => $destacado ? $destacado->fecha_fin->format('d/m/Y') : null,
                    'tiempo_restante' => $destacado && $destacado->fecha_fin->isFuture()
                        ? $ahora->diffForHumans($destacado->fecha_fin, true)
                        : null
                ];
            });

        return Inertia::render('ComponentesDeVentasProductos/MisDestacados', [
            'productos' => $productos
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
public function subirProductoGratis(Request $request)
{
    $user = auth()->user();

    // ✅ Validar datos del producto
        $request->validate([
            'id_usuario' => 'required|exists:users,id_usuario',
            'nombre_producto' => 'required',
            'descripcion' => 'nullable',
            'precio' => 'required|numeric',
            'condicion' => 'required',
            'id_categoria' => 'nullable|exists:categorias,id_categoria',
            'imagenes.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048', 
        ]);


    // ✅ Revisar si tiene subidas gratis disponibles
    if ($user->subidas_gratis <= 0) {
        return redirect()->back()->withErrors([
            'subidas_gratis' => 'No tienes subidas gratis disponibles.'
        ]);
    }

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
            DB::beginTransaction();
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

    // ✅ Descontar una subida gratis y guardar usuario
    $user->decrement('subidas_gratis');

    return redirect()->route('home')
        ->with('success','Producto publicado correctamente. Te queda(n) ' . $user->subidas_gratis . ' subida(s) gratis.');
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => 'Error al guardar producto, pago o imágenes', 'detalle' => $e->getMessage()], 500);
        }
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

    public function handlePagoSuccess(Request $request)
    {
        DB::beginTransaction();
        try {
            // Crear el producto
            $producto = Producto::create([
                'id_usuario' => $request->session()->get('temp_producto.id_usuario'),
                'id_categoria' => $request->session()->get('temp_producto.id_categoria'),
                'nombre_producto' => $request->session()->get('temp_producto.nombre_producto'),
                'descripcion' => $request->session()->get('temp_producto.descripcion'),
                'precio' => $request->session()->get('temp_producto.precio'),
                'condicion' => $request->session()->get('temp_producto.condicion'),
                'fecha_publicacion' => now(),
                'estado_producto' => 'disponible',
            ]);

            // Crear el registro de pago
            Pago::create([
                'id_usuario' => $request->session()->get('temp_producto.id_usuario'),
                'id_producto' => $producto->id_producto,
                'metodo_pago' => 'mercado_pago',
                'pago_por' => 'subir_producto',
                'monto' => 3.00,
                'estado_pago' => 'completado',
                'fecha_pago' => now(),
            ]);

            // Procesar las imágenes si existen
            $imagenes = $request->session()->get('temp_producto.imagenes', []);
            foreach ($imagenes as $imagen) {
                if ($imagen && $imagen->isValid()) {
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
            $request->session()->forget('temp_producto');
            
            return redirect()->route('productos.show', $producto->id_producto)
                           ->with('success', 'Producto publicado exitosamente');
        } catch (\Exception $e) {
            DB::rollback();
            return redirect()->route('productos.create')
                           ->with('error', 'Error al procesar el producto: ' . $e->getMessage());
        }
    }

    public function handlePagoFailure(Request $request)
    {
        $request->session()->forget('temp_producto');
        return redirect()->route('productos.create')
                        ->with('error', 'El pago fue rechazado o cancelado');
    }

    public function handlePagoPending(Request $request)
    {
        return redirect()->route('productos.create')
                        ->with('info', 'El pago está pendiente de confirmación');
    }

    public function handleWebhook(Request $request)
    {
        Log::info('Webhook de Mercado Pago recibido', ['data' => $request->all()]);
        return response()->json(['status' => 'ok']);
    }
}
