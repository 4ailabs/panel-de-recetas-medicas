import React, { useState, useEffect } from 'react';
import { Search, ArrowLeft, User, Calendar, FileText, Eye, Edit, Trash2 } from 'lucide-react';
import { supabaseService } from '../services/supabaseService';
import { PrescriptionWithIds } from '../types';

interface PatientHistoryProps {
  onBackToForm: () => void;
  onViewPrescription: (prescription: PrescriptionWithIds) => void;
  onEditPrescription: (prescription: PrescriptionWithIds) => void;
}

interface PatientSearchResult {
  patientId: string;
  name: string;
  lastVisit: string;
  totalPrescriptions: number;
}

const PatientHistory: React.FC<PatientHistoryProps> = ({ onBackToForm, onViewPrescription, onEditPrescription }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<PatientSearchResult[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<PatientSearchResult | null>(null);
  const [patientPrescriptions, setPatientPrescriptions] = useState<PrescriptionWithIds[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPrescriptions, setIsLoadingPrescriptions] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Función para buscar pacientes
  const searchPatients = async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const patients = await supabaseService.searchPatients(query);
      
      // Transformar datos para mostrar en la búsqueda
      const searchResults = patients.map(patient => ({
        patientId: patient.patient_id,
        name: patient.name,
        lastVisit: patient.created_at,
        totalPrescriptions: 0 // Se calculará después
      }));

      setSearchResults(searchResults);
    } catch (error) {
      console.error('Error searching patients:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para cargar recetas de un paciente
  const loadPatientPrescriptions = async (patientId: string) => {
    setIsLoadingPrescriptions(true);
    try {
      const prescriptions = await supabaseService.getPatientHistory(patientId);
      setPatientPrescriptions(prescriptions);
    } catch (error) {
      console.error('Error loading patient prescriptions:', error);
      setPatientPrescriptions([]);
    } finally {
      setIsLoadingPrescriptions(false);
    }
  };

  // Función para seleccionar un paciente
  const selectPatient = (patient: PatientSearchResult) => {
    setSelectedPatient(patient);
    loadPatientPrescriptions(patient.patientId);
  };

  // Función para formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Función para eliminar paciente
  const handleDeletePatient = async () => {
    if (!selectedPatient) return;

    setIsDeleting(true);
    try {
      const success = await supabaseService.deletePatient(selectedPatient.patientId);
      
      if (success) {
        alert('Paciente eliminado exitosamente junto con todas sus recetas.');
        // Reset the view
        setSelectedPatient(null);
        setPatientPrescriptions([]);
        setSearchQuery('');
        setSearchResults([]);
      } else {
        alert('Error al eliminar el paciente. Revisa la consola para más detalles.');
      }
    } catch (error) {
      console.error('Error deleting patient:', error);
      alert('Error inesperado al eliminar el paciente.');
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  // Función para eliminar receta individual
  const handleDeletePrescription = async (prescriptionId: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta receta? Esta acción no se puede deshacer.')) {
      return;
    }

    try {
      const success = await supabaseService.deletePrescription(prescriptionId);
      
      if (success) {
        alert('Receta eliminada exitosamente.');
        // Reload prescriptions for the current patient
        if (selectedPatient) {
          loadPatientPrescriptions(selectedPatient.patientId);
        }
      } else {
        alert('Error al eliminar la receta. Revisa la consola para más detalles.');
      }
    } catch (error) {
      console.error('Error deleting prescription:', error);
      alert('Error inesperado al eliminar la receta.');
    }
  };

  // Efecto para búsqueda con debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        searchPatients(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Historial Médico
          </h1>
          <button
            onClick={onBackToForm}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al Formulario
          </button>
        </div>

        {/* Búsqueda de pacientes */}
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar paciente por nombre o expediente..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          
          {isLoading && (
            <div className="absolute right-3 top-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>
      </div>

      {/* Resultados de búsqueda */}
      {searchQuery && searchResults.length > 0 && !selectedPatient && (
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              Resultados de búsqueda ({searchResults.length})
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {searchResults.map((patient) => (
              <div
                key={patient.patientId}
                onClick={() => selectPatient(patient)}
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-800">{patient.name}</h4>
                    <p className="text-sm text-gray-600">Expediente: {patient.patientId}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      Última visita: {formatDate(patient.lastVisit)}
                    </p>
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {patient.totalPrescriptions} recetas
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mensaje cuando no hay resultados */}
      {searchQuery && searchResults.length === 0 && !isLoading && (
        <div className="text-center py-8">
          <p className="text-gray-500">No se encontraron pacientes con ese nombre o expediente.</p>
        </div>
      )}

      {/* Historial del paciente seleccionado */}
      {selectedPatient && (
        <div className="bg-white rounded-lg shadow-md">
          {/* Header del paciente */}
          <div className="p-6 border-b border-gray-200 bg-blue-50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {selectedPatient.name}
                </h2>
                <p className="text-gray-600">Expediente: {selectedPatient.patientId}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedPatient(null);
                    setPatientPrescriptions([]);
                  }}
                  className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                  Cambiar Paciente
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center gap-1"
                >
                  <Trash2 className="h-4 w-4" />
                  Eliminar Paciente
                </button>
              </div>
            </div>
          </div>

          {/* Lista de recetas */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Historial de Recetas ({patientPrescriptions.length})
            </h3>

            {isLoadingPrescriptions ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="text-gray-500 mt-2">Cargando historial...</p>
              </div>
            ) : patientPrescriptions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No hay recetas registradas para este paciente.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {patientPrescriptions.map((prescription) => (
                  <div
                    key={prescription.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Receta {prescription.prescriptionId}
                          </h4>
                          <span className="text-sm text-gray-500">
                            {formatDate(prescription.dateTime)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Medicamentos:</span> {prescription.medications.length}
                          </div>
                          <div>
                            <span className="font-medium">Suplementos:</span> {prescription.supplements.length}
                          </div>
                          <div>
                            <span className="font-medium">Próxima cita:</span> {prescription.nextAppointment || 'No programada'}
                          </div>
                        </div>

                        {prescription.generalNotes && (
                          <div className="mt-2">
                            <span className="font-medium text-sm text-gray-600">Notas:</span>
                            <p className="text-sm text-gray-700 mt-1">{prescription.generalNotes}</p>
                          </div>
                        )}
                      </div>

                      <div className="ml-4 flex gap-2">
                        <button
                          onClick={() => onEditPrescription(prescription)}
                          className="px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center gap-2"
                        >
                          <Edit className="h-4 w-4" />
                          Editar
                        </button>
                        <button
                          onClick={() => onViewPrescription(prescription)}
                          className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          Ver
                        </button>
                        <button
                          onClick={() => handleDeletePrescription(prescription.id!)}
                          className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Instrucciones cuando no hay búsqueda */}
      {!searchQuery && !selectedPatient && (
        <div className="text-center py-12">
          <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Buscar Historial de Paciente
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Escribe el nombre o expediente del paciente para ver su historial médico completo.
          </p>
        </div>
      )}

      {/* Modal de confirmación para eliminar paciente */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 p-2 rounded-full">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Eliminar Paciente
              </h3>
            </div>
            
            <p className="text-gray-600 mb-4">
              ¿Estás seguro de que quieres eliminar a <strong>{selectedPatient?.name}</strong>?
            </p>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-red-800">
                <strong>Advertencia:</strong> Esta acción eliminará permanentemente:
              </p>
              <ul className="text-sm text-red-700 mt-2 ml-4 list-disc">
                <li>El registro del paciente</li>
                <li>Todas las recetas asociadas</li>
                <li>Medicamentos y suplementos</li>
                <li>Notas SOAP</li>
              </ul>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                disabled={isDeleting}
              >
                Cancelar
              </button>
              <button
                onClick={handleDeletePatient}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Eliminando...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Eliminar Definitivamente
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientHistory;
