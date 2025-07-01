<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class fotos extends Model
{
    use HasFactory;
    protected $table = 'fotos_producto';
    protected $fillable = [
        'id_producto',
        'ruta',
    ];

    public function producto()
    {
        return $this->belongsTo(Producto::class, 'id_producto', 'id_producto');
    }

}
