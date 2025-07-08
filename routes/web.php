<?php

use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\DestacadosController;
use App\Http\Controllers\PagoController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ProfileController;
use App\Models\Destacados;
use GuzzleHttp\Handler\Proxy;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

//INDEX
Route::get('/', [ProductoController::class, 'index'])->name('home');

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// })->name('home');->middleware(['auth', 'verified'])->name('home');

//VISTA PARA CUANDO ALGO FALTE INTEGRAR
Route::get('No-Found',function () {
    return Inertia::render('NoFound');
})->name('not-found');

//VISTA PARA LOS PAGOS
Route::get('/SubirProducto',[CategoriaController::class, 'crearProducto'])->middleware(['auth', 'verified'])->name('productos.create');

Route::middleware('auth')->group(function () {
    Route::post('/productos/iniciar-pago', [ProductoController::class, 'iniciarPago'])->name('productos.iniciar-pago');
    Route::post('/productos/completar-pago', [ProductoController::class, 'completarPago'])->name('productos.completar-pago');
    Route::post('/api/mercadopago/preferencia', [PagoController::class, 'crearPreferencia']);
});

//VISTA QUE UTILIZARE PARA VER EL PERFIL
Route::middleware(['auth', 'verified'])->get('/Dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

//VISTA QUE TENGO QUE MODIFICAR
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//VISTA DE DETALLES PRODUCTOS 
Route::get('/producto/{id}', [ProductoController::class, 'show'])->name('producto.show');

//VISTA DETALLES MIS VENTAS 
Route::middleware(['auth'])->group(function () {
    Route::get('/mis-ventas', [ProductoController::class, 'misVentas'])->name('productos.misVentas');
});
Route::get('/mis-destacados', [ProductoController::class, 'misDestacados'])->name('productos.misDestacados');
Route::post('/productos/agregar-destacado/{producto}', [ProductoController::class, 'agregarDestacado'])
    ->name('productos.agregarDestacado');
require __DIR__.'/auth.php';
