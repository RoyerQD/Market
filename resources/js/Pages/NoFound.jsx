import React from 'react';

const ComingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Error</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-8">Found</h2>
      
      <div className="max-w-md mx-auto">
        <p className="text-lg text-gray-600 mb-6">
          Estamos trabajando para crear.
        </p>
        <p className="text-lg text-gray-600">
          Esta funcionalidades aún no se han integrado completamente.
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;