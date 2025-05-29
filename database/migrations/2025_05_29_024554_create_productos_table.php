<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->id('id_producto');
            $table->foreignId('id_usuario')->constrained('users','id_usuario')->onDelete('cascade');
            $table->foreignId('id_categoria')->nullable()->constrained('categorias', 'id_categoria')->onDelete('set null');
            $table->string('nombre_producto');
            $table->text('descripcion')->nullable();
            $table->decimal('precio', 10, 2);
            $table->string('condicion');
            $table->timestamp('fecha_publicacion')->useCurrent();
            $table->enum('estado_producto', ['Disponible', 'Vendido', 'Pausado'])->default('Disponible');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
