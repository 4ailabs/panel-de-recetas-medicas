import React from 'react';
import { ArrowLeft, Edit, FileText, User, Calendar, Pill, Leaf, StickyNote, Stethoscope } from 'lucide-react';
import { PrescriptionWithIds, SOAPData } from '../types';

interface PrescriptionDetailProps {
  prescription: PrescriptionWithIds;
  onBack: () => void;
  onEdit: (prescription: PrescriptionWithIds) => void;
}

const PrescriptionDetail: React.FC<PrescriptionDetailProps> = ({ 
  prescription, 
  onBack, 
  onEdit 
}) => {
  
  // Función para formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Función para capitalizar texto
  const capitalize = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FileText className="h-6 w-6" />
          Detalles de Receta
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => onEdit(prescription)}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Editar Receta
          </button>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Información del paciente */}
        <div className="bg-blue-50 p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-blue-800 mb-3 flex items-center gap-2">
            <User className="h-5 w-5" />
            Información del Paciente
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-medium text-gray-700">Nombre:</span>
              <p className="text-gray-900">{prescription.patient.name}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Expediente:</span>
              <p className="text-gray-900">{prescription.patient.patientId}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Edad:</span>
              <p className="text-gray-900">{prescription.patient.age || 'N/D'}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Fecha de nacimiento:</span>
              <p className="text-gray-900">{prescription.patient.dob || 'N/D'}</p>
            </div>
          </div>
        </div>

        {/* Información del doctor */}
        <div className="bg-gray-50 p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            👨‍⚕️ Información del Doctor
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-medium text-gray-700">Nombre:</span>
              <p className="text-gray-900">{prescription.doctor.name}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Cédula profesional:</span>
              <p className="text-gray-900">{prescription.doctor.professionalID}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Clínica:</span>
              <p className="text-gray-900">{prescription.doctor.clinicName}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Universidad:</span>
              <p className="text-gray-900">{prescription.doctor.university}</p>
            </div>
          </div>
        </div>

        {/* Información de la receta */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Información de la Receta
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="font-medium text-gray-700">ID de receta:</span>
              <p className="text-gray-900 font-mono">{prescription.prescriptionId}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Fecha de emisión:</span>
              <p className="text-gray-900">{formatDate(prescription.dateTime)}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Próxima cita:</span>
              <p className="text-gray-900">{prescription.nextAppointment || 'No programada'}</p>
            </div>
          </div>
        </div>

        {/* Medicamentos */}
        {prescription.medications.length > 0 && (
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Pill className="h-5 w-5" />
              Medicamentos ({prescription.medications.length})
            </h2>
            <div className="space-y-3">
              {prescription.medications.map((medication, index) => (
                <div key={medication.id} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2">{medication.name}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Dosis:</span> {medication.dosage || 'N/D'}
                        </div>
                        <div>
                          <span className="font-medium">Duración:</span> {medication.duration || 'N/D'}
                        </div>
                        <div>
                          <span className="font-medium">Instrucciones:</span> {medication.instructions || 'N/D'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suplementos */}
        {prescription.supplements.length > 0 && (
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Leaf className="h-5 w-5" />
              Suplementos Naturales ({prescription.supplements.length})
            </h2>
            <div className="space-y-3">
              {prescription.supplements.map((supplement, index) => (
                <div key={supplement.id} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                      {prescription.medications.length + index + 1}
                    </span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-2">{supplement.name}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Dosis:</span> {supplement.dosage || 'N/D'}
                        </div>
                        <div>
                          <span className="font-medium">Duración:</span> {supplement.duration || 'N/D'}
                        </div>
                        <div>
                          <span className="font-medium">Instrucciones:</span> {supplement.instructions || 'N/D'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notas generales */}
        {prescription.generalNotes && (
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <StickyNote className="h-5 w-5" />
              Notas Generales
            </h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-gray-800">{prescription.generalNotes}</p>
            </div>
          </div>
        )}

        {/* Notas SOAP */}
        {prescription.soapNote && (
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Stethoscope className="h-5 w-5" />
              Nota Médica (SOAP)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Subjective */}
              {prescription.soapNote.subjective && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">S - Subjetivo</h4>
                  {prescription.soapNote.subjective.chief_complaint && (
                    <div className="mb-2">
                      <span className="font-medium text-gray-700">Motivo de consulta:</span>
                      <p className="text-gray-800">{prescription.soapNote.subjective.chief_complaint}</p>
                    </div>
                  )}
                  {prescription.soapNote.subjective.current_medications && (
                    <div>
                      <span className="font-medium text-gray-700">Medicamentos actuales:</span>
                      <p className="text-gray-800">{prescription.soapNote.subjective.current_medications}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Objective */}
              {prescription.soapNote.objective && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">O - Objetivo</h4>
                  {prescription.soapNote.objective.vital_signs && (
                    <div className="mb-2">
                      <span className="font-medium text-gray-700">Signos vitales:</span>
                      <p className="text-gray-800">{prescription.soapNote.objective.vital_signs}</p>
                    </div>
                  )}
                  {prescription.soapNote.objective.key_findings && (
                    <div>
                      <span className="font-medium text-gray-700">Hallazgos:</span>
                      <p className="text-gray-800">{prescription.soapNote.objective.key_findings}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Assessment */}
              {prescription.soapNote.assessment && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">A - Evaluación</h4>
                  {prescription.soapNote.assessment.diagnosis && (
                    <div>
                      <span className="font-medium text-gray-700">Diagnóstico:</span>
                      <p className="text-gray-800">{prescription.soapNote.assessment.diagnosis}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Plan */}
              {prescription.soapNote.plan && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">P - Plan</h4>
                  {prescription.soapNote.plan.treatment && (
                    <div>
                      <span className="font-medium text-gray-700">Tratamiento:</span>
                      <p className="text-gray-800">{prescription.soapNote.plan.treatment}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionDetail;
