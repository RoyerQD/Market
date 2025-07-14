<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class ReniecController extends Controller
{
    private const API_TOKEN = 'apis-token-17079.XtBBonJoivyQ8HkvgOjxMS6NlulR5YYO';
    private const API_BASE = 'https://api.apis.net.pe/v2';

    public function show($dni)
    {
        try {
            $response = Http::timeout(15)->withHeaders([
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . self::API_TOKEN
            ])->get(self::API_BASE . '/reniec/dni', [
                'numero' => $dni
            ]);

            if ($response->failed()) {
                return response()->json(['error' => 'No se pudo consultar RENIEC'], 400);
            }

            return $response->json();
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al consultar RENIEC'], 500);
        }
    }

    public function showRuc($ruc)
    {
        try {
            // Validar formato RUC
            if (!preg_match('/^[0-9]{11}$/', $ruc)) {
                return response()->json(['error' => 'Formato de RUC inválido'], 400);
            }

            // Verificar cache
            $cacheKey = 'sunat_ruc_' . $ruc;
            if ($cached = Cache::get($cacheKey)) {
                return response()->json($cached);
            }

            $response = Http::timeout(15)->withHeaders([
                'Accept' => 'application/json',
                'Authorization' => 'Bearer ' . self::API_TOKEN
            ])->get(self::API_BASE . '/sunat/ruc', [
                'numero' => $ruc
            ]);

            if ($response->failed()) {
                return response()->json(['error' => 'No se pudo consultar SUNAT'], 400);
            }

            $data = $response->json();

            // Guardar en cache por 24 horas
            Cache::put($cacheKey, $data, now()->addHours(24));

            return response()->json($data);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al consultar SUNAT'], 500);
        }
    }
}
