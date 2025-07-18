import React from 'react';

export default function NormasComunidad() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Normas de la Comunidad - GoodBuy Market</h1>

      <p>Para mantener una comunidad segura y respetuosa, todos los usuarios deben seguir estas normas:</p>

      <ul className="list-disc ml-6 mt-4 space-y-2">
        <li>No publiques armas, drogas, animales vivos ni contenido sexual explícito.</li>
        <li>Respeta a otros usuarios. No se tolera lenguaje ofensivo, amenazas o acoso.</li>
        <li>No publiques información falsa o fraudulenta.</li>
        <li>Si ves contenido inapropiado, usa el botón de denunciar.</li>
        <li>Los productos con 10 denuncias serán revisados y podrán ser bloqueados.</li>
        <li>GoodBuy Market se reserva el derecho de suspender o bloquear cuentas que violen estas normas.</li>
      </ul>

      <p className="mt-6">Tu colaboración es clave para mantener la comunidad segura y confiable.</p>
    </div>
  );
}
