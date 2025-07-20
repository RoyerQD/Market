<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reclamacion extends Model
{
    use HasFactory;

    protected $table = 'reclamaciones';

    protected $fillable = [
        'tipoDocumento',
        'numeroDocumento',
        'nombre',
        'apellido',
        'email',
        'telefono',
        'direccion',
        'tipoReclamo',
        'descripcion',
        'pedido',
        'estado'
    ];
}
