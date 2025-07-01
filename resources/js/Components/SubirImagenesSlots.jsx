import { useState } from "react";

export default function SubirImagenesSlots() {
  const [imagenes, setImagenes] = useState([null, null, null, null]);

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const nuevasImagenes = [...imagenes];
    nuevasImagenes[index] = file;
    setImagenes(nuevasImagenes);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-2">Imágenes del Producto</h2>
      <p className="text-sm mb-4">Sube hasta 4 imágenes de tu producto</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {imagenes.map((img, index) => (
          <div
            key={index}
            className="relative w-full aspect-square border-2 border-dashed border-gray-400 rounded flex items-center justify-center overflow-hidden"
          >
            {img ? (
              <img
                src={URL.createObjectURL(img)}
                alt={`Imagen ${index + 1}`}
                className="object-cover w-full h-full"
              />
            ) : (
              <label className="flex flex-col items-center justify-center cursor-pointer text-gray-500">
                <span className="text-4xl">+</span>
                <span className="text-xs">Subir Imagen</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, index)}
                />
              </label>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
