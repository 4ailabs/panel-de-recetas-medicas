import React from 'react';

const RecetaVerificada = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        
        {/* Header */}
        <div className="mb-6">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-2xl font-bold text-green-600 mb-2">
            RECETA VERIFICADA
          </h1>
          <p className="text-gray-600 text-sm">
            Esta receta médica ha sido verificada como auténtica.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-gray-200 my-6"></div>

        {/* Doctor Info */}
        <div className="space-y-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-blue-600 text-2xl mb-2">👨‍⚕️</div>
            <h3 className="font-semibold text-gray-700 mb-1">MÉDICO AUTORIZADO:</h3>
            <p className="text-lg font-bold text-blue-600">Dr. Miguel Ojeda Rios</p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-green-600 text-2xl mb-2">📋</div>
            <h3 className="font-semibold text-gray-700 mb-1">CÉDULA PROFESIONAL:</h3>
            <p className="text-lg font-bold text-green-600">4098976</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-gray-200 my-6"></div>

        {/* Verification Items */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-start text-green-600 text-sm">
            <span className="mr-3">✓</span>
            <span>Receta emitida por médico certificado</span>
          </div>
          <div className="flex items-center justify-start text-green-600 text-sm">
            <span className="mr-3">✓</span>
            <span>Información verificada</span>
          </div>
          <div className="flex items-center justify-start text-green-600 text-sm">
            <span className="mr-3">✓</span>
            <span>Documento auténtico</span>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-600">
          <p className="mb-1">Para consultas médicas contacte directamente</p>
          <p className="font-semibold">con el Dr. Miguel Ojeda Rios</p>
        </div>

        {/* Trust Badge */}
        <div className="mt-6 inline-flex items-center bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
          <span className="mr-1">🔒</span>
          Verificación Segura
        </div>
      </div>
    </div>
  );
};

export default RecetaVerificada;