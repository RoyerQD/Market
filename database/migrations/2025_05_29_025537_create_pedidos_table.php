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
        Schema::create('pedidos', function (Blueprint $table) {
           $table->id('id_pedido');
            $table->foreignId('id_comprador')->constrained('users', 'id_usuario')->onDelete('cascade');
            $table->foreignId('id_vendedor')->constrained('users', 'id_usuario')->onDelete('cascade');
            $table->timestamp('fecha_pedido')->useCurrent();
            $table->enum('estado_pedido', ['Pendiente', 'Pagado', 'Enviado', 'Entregado', 'Cancelado'])->default('Pendiente');
            $table->decimal('monto_total', 10, 2);
            $table->text('direccion');
            $table->string('metodo_envio')->nullable();
            $table->timestamp('fecha_envio')->nullable();
            $table->timestamp('fecha_entrega')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pedidos');
    }
};
