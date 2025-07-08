import React from 'react';

export default function ResumenVentas({ titulo, valor, icono, color }) {
  return (
    <div className="bg-gradient-to-r from-[#203668] to-[#1a2a4f] p-4 rounded-md shadow flex items-center gap-4">
      <span className="text-3xl">{icono}</span>
      <div>
        <h3 className="text-sm">{titulo}</h3>
        <p className={`text-xl font-bold ${color ?? ''}`}>{valor}</p>
      </div>
    </div>
  );
}
