<?php

use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\ProfileController;
use GuzzleHttp\Handler\Proxy;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', [ProductoController::class, 'index'])->name('home');

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// })->name('home');->middleware(['auth', 'verified'])->name('home');

Route::get('/SubirProducto',[CategoriaController::class, 'crearProducto'])->middleware(['auth', 'verified'])->name('productos.create');

Route::middleware('auth')->group(function () {
    Route::post('/productos/iniciar-pago', [ProductoController::class, 'iniciarPago'])->name('productos.iniciar-pago');
    Route::post('/productos/completar-pago', [ProductoController::class, 'completarPago'])->name('productos.completar-pago');
});


Route::middleware(['auth', 'verified'])->get('/Dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/producto/{id}', [ProductoController::class, 'show'])->name('producto.show');


require __DIR__.'/auth.php';
