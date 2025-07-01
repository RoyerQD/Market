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
    public function user()
    {
        return $this->belongsTo(User::class, 'id_usuario');
    }
    public function categoria()
    {
        return $this->belongsTo(Categoria::class, 'id_categoria');
    }
    public function destacados()
    {
        return $this->hasMany(Destacados::class, 'id_producto', 'id_producto');
    }
    public function fotos()
    {
        return $this->hasMany(fotos::class, 'id_producto', 'id_producto');
    }
    public function pagos()
    {
        return $this->hasMany(Pago::class, 'id_producto', 'id_producto');
    }

}
