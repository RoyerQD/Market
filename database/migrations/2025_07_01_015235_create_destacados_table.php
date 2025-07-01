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
        Schema::create('destacados', function (Blueprint $table) {
            $table->id('id_destacado');
            $table->foreignId('id_producto')->constrained('productos', 'id_producto')->onDelete('cascade');
            $table->foreignId('id_pago')->constrained('pagos', 'id_pago')->onDelete('cascade');
            $table->timestamp('fecha_inicio');
            $table->timestamp('fecha_fin');
            $table->enum('estado_destacado', ['activo', 'inactivo'])->default('activo');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('destacados');
    }
};
