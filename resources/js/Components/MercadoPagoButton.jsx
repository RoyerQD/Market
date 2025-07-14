import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export default function MercadoPagoButton({ user, producto }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const isValidImageFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
    return file instanceof File && validTypes.includes(file.type);
  };

  const handlePago = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const formData = new FormData();
      
      // Validate and append basic product data
      formData.append('id_usuario', user.id_usuario);
      formData.append('nombre_producto', producto.nombre_producto);
      formData.append('descripcion', producto.descripcion || '');
      formData.append('precio', parseFloat(producto.precio));
      formData.append('condicion', producto.condicion);
      formData.append('id_categoria', producto.id_categoria);
      formData.append('metodo_pago', 'mercado_pago');
      formData.append('estado_pago', 'completado');

      // Validate and append images
      if (producto.imagenes && producto.imagenes.length > 0) {
        const validImages = producto.imagenes.filter(isValidImageFile);
        
        if (validImages.length === 0) {
          throw new Error('No se encontraron imágenes válidas para subir');
        }

        validImages.forEach((imagen, index) => {
          formData.append(`imagenes[${index}]`, imagen);
        });
      }

      // Debug: Log form data
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value instanceof File ? `File: ${value.name}` : value);
      }

      const res = await axios.post("/productos/completar-pago", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        }
      });

      if (res.data.init_point) {
        const publicKey = import.meta.env.VITE_MP_PUBLIC_KEY;
        console.log('Public Key:', publicKey); // Para debugging
        
        if (!publicKey) {
          throw new Error('La clave pública de Mercado Pago no está configurada');
        }

        const mp = new window.MercadoPago(publicKey, {
          locale: 'es-PE'
        });

        mp.checkout({
          preference: {
            id: res.data.preference_id
          },
          render: {
            container: '.cho-container',
            label: 'Pagar',
          },
          theme: {
            elementsColor: '#4F46E5',
            headerColor: '#4F46E5',
          },
          autoOpen: true,
          modal: true
        });
      } else {
        throw new Error("No se recibió el punto de inicio del pago");
      }
    } catch (error) {
      console.error("Error creando preferencia:", error);
      
      // Mostrar información detallada del error
      const errorDetail = error.response?.data?.error || error.response?.data?.message;
      const errorMessage = errorDetail
        ? `Error: ${errorDetail}`
        : error.message || "Hubo un error al procesar el pago. Por favor, intente nuevamente.";
      
      console.log('Detalles completos del error:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers
      });
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('MercadoPago SDK status:', {
      sdkLoaded: !!window.MercadoPago,
      publicKey: import.meta.env.VITE_MP_PUBLIC_KEY
    });
  }, []);

  return (
    <div>
      {!isLoading ? (
        <button
          onClick={handlePago}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded transition-colors duration-200 flex items-center justify-center"
        >
          Pagar con Mercado Pago
        </button>
      ) : (
        <div className="flex items-center justify-center">
          <span className="animate-spin mr-2">⌛</span>
          Procesando...
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <div className="cho-container"></div>
    </div>
  );
}

MercadoPagoButton.propTypes = {
  user: PropTypes.shape({
    id_usuario: PropTypes.number.isRequired,
  }).isRequired,
  producto: PropTypes.shape({
    nombre_producto: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    precio: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    condicion: PropTypes.string.isRequired,
    id_categoria: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    imagenes: PropTypes.array
  }).isRequired,
};