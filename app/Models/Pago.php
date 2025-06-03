<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pago extends Model
{
    //
    protected $table = 'pagos';
    protected $fillable = [
        'id_usuario',
        'id_producto',
        'monto',
        'estado',
        'referencia_pago',
    ];
    
}
