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
        Schema::create('pagos', function (Blueprint $table) {
        $table->id('id_pago');
        $table->foreignId('id_usuario')->constrained('users', 'id_usuario')->onDelete('cascade');
        $table->foreignId('id_producto')->unique()->constrained('productos', 'id_producto')->onDelete('cascade');
        $table->enum('metodo_pago', ['paypal', 'otros']);
        $table->enum('pago_por', ['subir_producto', 'publicidad']);
        $table->decimal('monto', 8, 2);
        $table->enum('estado_pago', ['pendiente', 'completado', 'cancelado', 'fallido'])->default('pendiente');
        $table->timestamp('fecha_pago')->nullable();
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pagos');
    }
};
