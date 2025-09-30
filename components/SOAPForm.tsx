import React, { useState, useEffect } from 'react';
import { Stethoscope, ChevronDown, ChevronUp } from 'lucide-react';
import { SOAPData } from '../types';

interface SOAPFormProps {
  soapNote: SOAPData | null;
  onSoapNoteChange: (soapData: SOAPData | null) => void;
}

const SOAPForm: React.FC<SOAPFormProps> = ({ soapNote, onSoapNoteChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localSoapData, setLocalSoapData] = useState<SOAPData>({
    subjective: {
      chief_complaint: '',
      current_medications: ''
    },
    objective: {
      vital_signs: '',
      key_findings: ''
    },
    assessment: {
      diagnosis: ''
    },
    plan: {
      treatment: ''
    }
  });

  // Initialize local state when soapNote prop changes
  useEffect(() => {
    if (soapNote) {
      setLocalSoapData(soapNote);
    }
  }, [soapNote]);

  const handleFieldChange = (section: keyof SOAPData, field: string, value: string) => {
    const newSoapData = {
      ...localSoapData,
      [section]: {
        ...localSoapData[section],
        [field]: value
      }
    };
    setLocalSoapData(newSoapData);
    onSoapNoteChange(newSoapData);
  };

  const clearSOAP = () => {
    const emptySoapData = {
      subjective: {
        chief_complaint: '',
        current_medications: ''
      },
      objective: {
        vital_signs: '',
        key_findings: ''
      },
      assessment: {
        diagnosis: ''
      },
      plan: {
        treatment: ''
      }
    };
    setLocalSoapData(emptySoapData);
    onSoapNoteChange(null);
  };

  const hasAnyData = () => {
    return Object.values(localSoapData).some(section => 
      Object.values(section).some(value => value && value.trim() !== '')
    );
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Stethoscope className="h-5 w-5 text-blue-600" />
          Nota Médica SOAP
        </h3>
        <div className="flex items-center gap-2">
          {hasAnyData() && (
            <button
              onClick={clearSOAP}
              className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              Limpiar
            </button>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-1"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4" />
                Ocultar
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                Expandir
              </>
            )}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-6">
          {/* Subjective */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">S</span>
              Subjetivo
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Motivo de consulta
                </label>
                <textarea
                  value={localSoapData.subjective.chief_complaint || ''}
                  onChange={(e) => handleFieldChange('subjective', 'chief_complaint', e.target.value)}
                  placeholder="¿Cuál es el motivo principal de la consulta?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medicamentos actuales
                </label>
                <textarea
                  value={localSoapData.subjective.current_medications || ''}
                  onChange={(e) => handleFieldChange('subjective', 'current_medications', e.target.value)}
                  placeholder="Medicamentos que el paciente está tomando actualmente"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Objective */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
              <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">O</span>
              Objetivo
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Signos vitales
                </label>
                <input
                  type="text"
                  value={localSoapData.objective.vital_signs || ''}
                  onChange={(e) => handleFieldChange('objective', 'vital_signs', e.target.value)}
                  placeholder="TA, FC, FR, T°, peso, talla, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hallazgos clínicos
                </label>
                <textarea
                  value={localSoapData.objective.key_findings || ''}
                  onChange={(e) => handleFieldChange('objective', 'key_findings', e.target.value)}
                  placeholder="Hallazgos del examen físico, laboratorios, estudios, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Assessment */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
              <span className="bg-yellow-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">A</span>
              Evaluación
            </h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Diagnóstico
              </label>
              <textarea
                value={localSoapData.assessment.diagnosis || ''}
                onChange={(e) => handleFieldChange('assessment', 'diagnosis', e.target.value)}
                placeholder="Diagnóstico principal y diagnósticos diferenciales"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>
          </div>

          {/* Plan */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
              <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">P</span>
              Plan
            </h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Plan de tratamiento
              </label>
              <textarea
                value={localSoapData.plan.treatment || ''}
                onChange={(e) => handleFieldChange('plan', 'treatment', e.target.value)}
                placeholder="Plan de tratamiento, seguimiento, recomendaciones, etc."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>
          </div>

          <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
            <p><strong>Nota:</strong> Esta información SOAP es solo para el expediente médico y NO aparecerá en la receta impresa.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SOAPForm;
