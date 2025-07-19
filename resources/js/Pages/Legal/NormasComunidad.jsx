import React from 'react';

export default function NormasComunidad() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Normas de la Comunidad - GoodBuy Market</h1>

      <p>
        Bienvenido a GoodBuy Market. Para garantizar que nuestra comunidad sea segura,
        transparente y respetuosa, todos los usuarios deben cumplir con las siguientes normas
        de convivencia y publicación. El incumplimiento de estas reglas puede resultar en
        restricciones, suspensión o eliminación de la cuenta.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">1. Publicaciones permitidas</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>Publica solo productos que cumplan con la legislación vigente y las políticas de la plataforma.</li>
        <li>Está prohibida la venta de armas de fuego, municiones, drogas ilegales, animales vivos, artículos robados, productos falsificados o contenido sexual explícito.</li>
        <li>Evita publicar productos peligrosos o prohibidos que puedan poner en riesgo a otros usuarios.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">2. Comportamiento de los usuarios</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>Respeta a todos los miembros de la comunidad. Está prohibido usar lenguaje ofensivo, amenazas, difamación o cualquier forma de acoso.</li>
        <li>No suplantes la identidad de otras personas ni publiques información falsa, incompleta o engañosa.</li>
        <li>Interactúa de forma honesta y responsable durante las transacciones de compra y venta.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">3. Contenido denunciado</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>Si detectas publicaciones inapropiadas o usuarios que incumplen las normas, utiliza la opción de denuncia disponible en cada producto o perfil.</li>
        <li>Los anuncios que acumulen 10 denuncias de usuarios serán puestos en revisión automática por el equipo de moderación y podrán ser suspendidos temporal o permanentemente.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">4. Suspensión y bloqueo</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>GoodBuy Market se reserva el derecho de suspender cuentas, bloquear usuarios o eliminar publicaciones que infrinjan estas normas sin previo aviso.</li>
        <li>Los reincidentes o usuarios que incurran en faltas graves serán bloqueados de forma definitiva para proteger a la comunidad.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">5. Responsabilidad compartida</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>Todos los miembros deben contribuir a mantener el respeto, la seguridad y la confianza dentro de la plataforma.</li>
        <li>El equipo de GoodBuy Market está comprometido a actuar rápidamente ante cualquier reporte de abuso o incumplimiento.</li>
      </ul>

      <p className="mt-6">
        Tu participación activa y responsable es esencial para construir una comunidad segura,
        honesta y confiable para todos. Gracias por formar parte de GoodBuy Market.
      </p>
    </div>
  );
}
