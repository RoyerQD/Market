<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Destacados extends Model
{
    //
    use HasFactory;
    protected $fillable = [
        'id_producto',
        'id_pago',
        'fecha_inicio',
        'fecha_fin',
        'estado_destacado'
    ];

    public function producto()
    {
        return $this->belongsTo(Producto::class, 'id_producto', 'id_producto');
    }
    public function pago()
    {
        return $this->belongsTo(Pago::class, 'id_pago', 'id_pago');
    }
}
