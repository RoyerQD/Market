import React, { useState } from "react";
import axios from "axios";

export default function MercadoPagoButton({ user, producto, disabled = false }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePago = async () => {
    if (disabled) return;
    
    try {
      setIsLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append('id_usuario', user.id_usuario);
      formData.append('nombre_producto', producto.nombre_producto);
      formData.append('descripcion', producto.descripcion || '');
      formData.append('precio', producto.precio);
      formData.append('condicion', producto.condicion);
      formData.append('id_categoria', producto.id_categoria);
      formData.append('metodo_pago', 'mercado_pago');

      // Agregar las imágenes al FormData
      if (producto.imagenes && producto.imagenes.length > 0) {
        producto.imagenes.forEach((imagen, index) => {
          formData.append(`imagenes[${index}]`, imagen);
        });
      }

      const response = await axios.post("/productos/completar-pago", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        }
      });

      if (response.data.init_point) {
        window.location.href = response.data.init_point;
      } else {
        throw new Error('No se recibió el punto de inicio del pago');
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      setError(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handlePago}
        disabled={isLoading || disabled}
        className={`w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg transition-all duration-200 ${
          disabled
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-[#009EE3] to-[#32B9ED] text-white hover:from-[#32B9ED] hover:to-[#009EE3] hover:shadow-lg transform hover:-translate-y-0.5'
        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#009EE3] disabled:opacity-50 disabled:hover:transform-none`}
      >
        <div className="flex items-center space-x-2">
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Procesando...</span>
            </>
          ) : (
            <>
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M19 14V6c0-1.1-.9-2-2-2H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-9-1c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" fill="currentColor"/>
              </svg>
              <span>Pagar con Mercado Pago</span>
            </>
          )}
        </div>
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
      )}
    </div>
  );
}