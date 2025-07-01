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

    public function usuario()
    {
        return $this->belongsTo(User::class, 'id_usuario');
    }
    public function producto()
    {
        return $this->belongsTo(Producto::class, 'id_producto');
    }
    public function destacados()
    {
        return $this->hasMany(Destacados::class, 'id_pago', 'id_pago');
    }
    
}
