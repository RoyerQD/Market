import { useState, useEffect, useCallback } from "react";
import MercadoPagoButton from "@/Components/MercadoPagoButton";
import Navbar from "@/Layouts/Navbar";
import { router } from '@inertiajs/react';

export default function CrearProductos({ categorias, auth }) {
  const [producto, setProducto] = useState({
    nombre_producto: "",
    descripcion: "",
    precio: "3.00",
    condicion: "nuevo",
    id_categoria: "",
    imagenes: [],
  });
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usarSubidaGratis, setUsarSubidaGratis] = useState(false);

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!producto.nombre_producto.trim()) {
      newErrors.nombre_producto = 'El nombre es requerido';
    }

    if (!producto.id_categoria) {
      newErrors.id_categoria = 'La categoría es requerida';
    }

    const precio = parseFloat(producto.precio);
    if (isNaN(precio) || precio <= 0) {
      newErrors.precio = 'El precio debe ser mayor a 0';
    }

    if (producto.imagenes.length === 0) {
      newErrors.imagenes = 'Se requiere al menos una imagen';
    }

    setErrors(newErrors);
    const valid = Object.keys(newErrors).length === 0;
    setIsValid(valid);
    return valid;
  }, [producto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateForm();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (producto.imagenes.length >= 4) {
      alert('Solo puedes subir hasta 4 imágenes');
      return;
    }

    setProducto(prev => ({
      ...prev,
      imagenes: [...prev.imagenes, file]
    }));
  };

  const removeImage = (index) => {
    setProducto(prev => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    validateForm();
  };

  const handleSubidaGratis = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (validateForm()) {
      const formData = new FormData();
      formData.append('id_usuario', auth.user.id_usuario);
      formData.append('nombre_producto', producto.nombre_producto);
      formData.append('descripcion', producto.descripcion || '');
      formData.append('precio', producto.precio);
      formData.append('condicion', producto.condicion);
      formData.append('id_categoria', producto.id_categoria);
      
      // Agregar las imágenes al FormData
      producto.imagenes.forEach((imagen) => {
        formData.append('imagenes[]', imagen);
      });

      router.post('/productos/agregar', formData, {
        forceFormData: true,
        onSuccess: () => {
          // Redirección manejada por el controlador
        },
        onError: (errors) => {
          setErrors(errors);
          setFormSubmitted(true);
        },
      });
    }
  };

  const precioValido = parseFloat(producto.precio) > 0;

  const shouldShowError = (fieldName) => {
    return (touched[fieldName] || formSubmitted) && errors[fieldName];
  };

  return (
    <>
      <Navbar auth={auth} />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna del Formulario */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="p-6 sm:p-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Agregar nuevo producto</h1>
                  <p className="text-gray-600 mb-8">Complete los detalles de su producto para publicarlo</p>

                  {/* Slots de imágenes */}
                  <div className="space-y-4 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900">Imágenes del Producto</h2>
                    <p className="text-sm text-gray-600">Sube hasta 4 imágenes de tu producto</p>
                    
                    <div className="flex flex-wrap gap-4">
                      {producto.imagenes.map((img, index) => (
                        <div
                          key={index}
                          className="relative w-32 h-32 group"
                        >
                          <img
                            src={URL.createObjectURL(img)}
                            alt={`Imagen ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg border-2 border-gray-200"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                      
                      {producto.imagenes.length < 4 && (
                        <label className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                          </svg>
                          <span className="mt-2 text-sm text-gray-500">Agregar imagen</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                        </label>
                      )}
                    </div>
                    {shouldShowError('imagenes') && (
                      <p className="mt-1 text-sm text-red-600">{errors.imagenes}</p>
                    )}
                  </div>

                  {/* Formulario */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del producto</label>
                      <input
                        type="text"
                        name="nombre_producto"
                        value={producto.nombre_producto}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                      {shouldShowError('nombre_producto') && (
                        <p className="mt-1 text-sm text-red-600">{errors.nombre_producto}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                      <textarea
                        name="descripcion"
                        value={producto.descripcion}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows="4"
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Describe tu producto detalladamente..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Precio (S/)</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">S/</span>
                          </div>
                          <input
                            type="number"
                            name="precio"
                            value={producto.precio}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="block w-full pl-12 pr-4 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            min="0"
                            step="0.01"
                            required
                          />
                        </div>
                        {shouldShowError('precio') && (
                          <p className="mt-1 text-sm text-red-600">{errors.precio}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Condición</label>
                        <select
                          name="condicion"
                          value={producto.condicion}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          required
                        >
                          <option value="nuevo">Nuevo</option>
                          <option value="usado">Usado</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                      <select
                        name="id_categoria"
                        value={producto.id_categoria}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                      >
                        <option value="">Selecciona una categoría</option>
                        {categorias.map((cat) => (
                          <option key={cat.id_categoria} value={cat.id_categoria}>
                            {cat.nombre}
                          </option>
                        ))}
                      </select>
                      {shouldShowError('id_categoria') && (
                        <p className="mt-1 text-sm text-red-600">{errors.id_categoria}</p>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Panel Lateral de Pago */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Resumen de Publicación */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Resumen de Publicación</h2>
                    <div className="space-y-4">
                      {auth.user.subidas_gratis > 0 && (
                        <div className="border-b border-gray-200 pb-4">
                          <label className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={usarSubidaGratis}
                              onChange={(e) => setUsarSubidaGratis(e.target.checked)}
                              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <div>
                              <span className="text-sm font-medium text-gray-700">
                                Usar subida gratis
                              </span>
                              <p className="text-sm text-gray-500">
                                Te quedan {auth.user.subidas_gratis} subida{auth.user.subidas_gratis !== 1 ? 's' : ''} gratis
                              </p>
                            </div>
                          </label>
                        </div>
                      )}

                      {!usarSubidaGratis && (
                        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                          <span className="text-gray-600">Costo de publicación</span>
                          <span className="text-lg font-semibold text-gray-900">S/ 3.00</span>
                        </div>
                      )}
                      
                      {precioValido && isValid ? (
                        <div className="space-y-4">
                          {usarSubidaGratis ? (
                            <button
                              onClick={handleSubidaGratis}
                              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Publicar Gratis
                            </button>
                          ) : (
                            <MercadoPagoButton 
                              user={auth.user} 
                              producto={producto}
                            />
                          )}
                          <p className="text-sm text-gray-500 text-center">
                            {usarSubidaGratis 
                              ? "Al hacer clic en 'Publicar Gratis', usarás una de tus subidas gratuitas"
                              : "Al hacer clic en 'Pagar', aceptas proceder con el pago de la publicación"
                            }
                          </p>
                        </div>
                      ) : formSubmitted && (
                        <p className="text-red-500 text-sm font-medium text-center">
                          Complete todos los campos requeridos para continuar.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Información Importante */}
                {/* <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">¿Por qué S/ 3.00?</h2>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            Este pequeño costo nos ayuda a:
                          </p>
                          <ul className="mt-2 text-sm text-gray-600 space-y-2">
                            <li className="flex items-center">
                              <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              Mantener publicaciones de calidad
                            </li>
                            <li className="flex items-center">
                              <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              Verificar vendedores serios
                            </li>
                            <li className="flex items-center">
                              <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              Brindar soporte prioritario
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
