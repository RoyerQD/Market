<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    //
    use HasFactory;

    protected $primaryKey = 'id_producto';

    protected $fillable = [
        'id_usuario',
        'id_categoria',
        'nombre_producto',
        'descripcion',
        'precio',
        'condicion',
        'fecha_publicacion',
        'estado_producto',
    ];


    public function usuario()
    {
        return $this->belongsTo(User::class, 'id_usuario');
    }
 
    public function categoria()
    {
        return $this->belongsTo(Categoria::class, 'id_categoria');
    }
}
