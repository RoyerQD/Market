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
            $table->id('id_transaccion');
            
            // Clave foránea al pedido
            $table->foreignId('id_pedido')
                ->constrained('pedidos', 'id_pedido')
                ->onDelete('cascade');

            // Clave foránea al usuario (comprador)
            $table->foreignId('id_usuario')
                ->constrained('users', 'id_usuario')
                ->onDelete('cascade');

            $table->decimal('monto', 10, 2);
            $table->timestamp('fecha_transaccion')->useCurrent();

            $table->enum('estado_transaccion', [
                'Exitosa', 'Fallida', 'Pendiente', 'Reembolsada'
            ])->default('Pendiente');

            $table->string('metodo_pago', 100);

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
