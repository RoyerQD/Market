<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Config;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    private const API_TOKEN = 'apis-token-17079.XtBBonJoivyQ8HkvgOjxMS6NlulR5YYO';
    private const API_BASE_URL = 'https://api.apis.net.pe/v2';

    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido_paterno' => 'required|string|max:255',
            'apellido_materno' => 'required|string|max:255',
            'dni' => 'required|string|size:8|unique:users,dni',
            'ruc' => 'nullable|string|size:11|unique:users,ruc',
            'telefono' => 'required|string|max:20',
            'direccion' => 'nullable|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ],[
            'dni.unique' => 'Este DNI ya está registrado.',
            'dni.unique' => 'Este RUC ya está registrado.',
            'email.unique' => 'Este correo ya está registrado.',
        ]);

        // Verificar DNI con RENIEC
        $reniecVerified = $this->verifyWithReniec($validated);
        if (!$reniecVerified['success']) {
            return back()->withErrors(['dni' => $reniecVerified['message']]);
        }

        // Si se proporcionó RUC, verificar con SUNAT
        if (!empty($validated['ruc'])) {
            $sunatVerified = $this->verifyWithSunat($validated);
            if (!$sunatVerified['success']) {
                return back()->withErrors(['ruc' => $sunatVerified['message']]);
            }

            // Verificar que el RUC corresponda al DNI
            if (!$this->validateRucWithDni($validated['ruc'], $validated['dni'])) {
                return back()->withErrors(['ruc' => 'El RUC no corresponde al DNI ingresado.']);
            }
        }

        // Crear usuario
        $user = User::create([
            'nombre' => $validated['nombre'],
            'apellido_paterno' => $validated['apellido_paterno'],
            'apellido_materno' => $validated['apellido_materno'],
            'dni' => $validated['dni'],
            'ruc' => $validated['ruc'],
            'telefono' => $validated['telefono'],
            'direccion' => $validated['direccion'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        event(new Registered($user));
        Auth::login($user);
        return redirect()->route('home');
    }

    /**
     * Verificar datos con RENIEC
     */
    private function verifyWithReniec(array $data): array
    {
        try {
            $response = Http::timeout(15)->withHeaders([
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . self::API_TOKEN
            ])->get(self::API_BASE_URL . '/reniec/dni', [
                'numero' => $data['dni']
            ]);

            if ($response->failed()) {
                return ['success' => false, 'message' => 'No se pudo verificar el DNI con RENIEC.'];
            }

            $reniec = $response->json();

            // Comparar datos normalizados
            $matches = $this->compareReniecData($data, $reniec);
            
            return $matches ? 
                ['success' => true] : 
                ['success' => false, 'message' => 'Los datos ingresados no coinciden con RENIEC.'];

        } catch (\Exception $e) {
            return ['success' => false, 'message' => 'Error al consultar RENIEC. Por favor, intente nuevamente.'];
        }
    }

    /**
     * Verificar datos con SUNAT
     */
    private function verifyWithSunat(array $data): array
    {
        try {
            $response = Http::timeout(15)->withHeaders([
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . self::API_TOKEN
            ])->get(self::API_BASE_URL . '/sunat/ruc', [
                'numero' => $data['ruc']
            ]);

            if ($response->failed()) {
                return ['success' => false, 'message' => 'No se pudo verificar el RUC con SUNAT.'];
            }

            $sunat = $response->json();

            // Verificar si el RUC está activo
            if (!isset($sunat['estado']) || strtoupper($sunat['estado']) !== 'ACTIVO') {
                return ['success' => false, 'message' => 'El RUC no se encuentra activo en SUNAT.'];
            }

            return ['success' => true, 'data' => $sunat];

        } catch (\Exception $e) {
            return ['success' => false, 'message' => 'Error al consultar SUNAT. Por favor, intente nuevamente.'];
        }
    }

    /**
     * Comparar datos normalizados de RENIEC
     */
    private function compareReniecData(array $input, array $reniec): bool
    {
        $normalize = fn($str) => strtolower(trim($str));

        return 
            $normalize($reniec['nombres']) === $normalize($input['nombre']) &&
            $normalize($reniec['apellidoPaterno']) === $normalize($input['apellido_paterno']) &&
            $normalize($reniec['apellidoMaterno']) === $normalize($input['apellido_materno']);
    }

    /**
     * Validar que el RUC corresponda al DNI
     */
    private function validateRucWithDni(string $ruc, string $dni): bool
    {
        // El RUC debe comenzar con 10 para personas naturales
        if (!str_starts_with($ruc, '10')) {
            return false;
        }

        // Los siguientes 8 dígitos deben ser el DNI
        $rucDni = substr($ruc, 2, 8);
        return $rucDni === $dni;
    }
}
