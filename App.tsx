import React, { useState, useCallback, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { PatientInfo, MedicationItem, DoctorInfo, PrescriptionData, WellkittSupplement, PrescriptionWithIds, SOAPData } from './types';
import PrescriptionForm from './components/PrescriptionForm';
import PrescriptionPreview from './components/PrescriptionPreview';
import PatientHistory from './components/PatientHistory';
import PrescriptionDetail from './components/PrescriptionDetail';
import { generatePdf } from './services/pdfService';
import { supabaseService } from './services/supabaseService'; // Import Supabase service
import { v4 as uuidv4 } from 'uuid'; 

// Application configuration
// All data is now stored in Supabase - no Airtable dependency

// Generate current date and time formatted for PostgreSQL
const getCurrentDateTimeFormatted = (): string => {
  const now = new Date();
  // Return ISO string format that PostgreSQL understands
  return now.toISOString();
};

// Generate unique prescription ID
const generatePrescriptionId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `RX-${timestamp}-${randomStr}`.toUpperCase();
};

// Generate patient ID based on date and name initials (short format)
const generatePatientId = (patientName: string): string => {
  if (!patientName || patientName.trim() === '') {
    return '';
  }

  // Get current date in DDMM format (shorter)
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const dateStr = `${day}${month}`;

  // Extract initials from patient name
  const nameParts = patientName.trim().split(/\s+/);
  let initials = '';
  
  if (nameParts.length >= 2) {
    // Take first letter of first name and first letter of last name
    initials = nameParts[0].charAt(0).toUpperCase() + nameParts[nameParts.length - 1].charAt(0).toUpperCase();
  } else if (nameParts.length === 1) {
    // If only one name, take first two letters
    initials = nameParts[0].substring(0, 2).toUpperCase();
  }

  // Generate sequential number based on localStorage
  const todayKey = `expediente_count_${dateStr}_${initials}`;
  const currentCount = parseInt(localStorage.getItem(todayKey) || '0') + 1;
  localStorage.setItem(todayKey, currentCount.toString());
  
  const sequential = String(currentCount).padStart(2, '0');

  return `${dateStr}${initials}${sequential}`;
};

// Helper functions for localStorage
const loadDoctorInfoFromStorage = (): DoctorInfo => {
  try {
    const saved = localStorage.getItem('doctorInfo');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading doctor info from localStorage:', error);
  }
  return {
    name: '',
    clinicName: '',
    clinicAddress: '',
    contact: '',
    clinicEmail: '',
    professionalID: '',
    university: '', 
    logo1Url: '',
    logo2Url: '',
    signatureImageUrl: '',
  };
};

const saveDoctorInfoToStorage = (doctorInfo: DoctorInfo) => {
  try {
    localStorage.setItem('doctorInfo', JSON.stringify(doctorInfo));
  } catch (error) {
    console.error('Error saving doctor info to localStorage:', error);
  }
};

const App: React.FC = () => {
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({ 
    name: '',
    age: '',
    dob: '',
    patientId: '' 
  });
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo>(loadDoctorInfoFromStorage());
  const [medications, setMedications] = useState<MedicationItem[]>([]);
  const [supplements, setSupplements] = useState<WellkittSupplement[]>([]);
  const [generalNotes, setGeneralNotes] = useState<string>('');
  const [nextAppointment, setNextAppointment] = useState<string>('');
  const [soapNote, setSoapNote] = useState<SOAPData | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [isSavingToAirtable, setIsSavingToAirtable] = useState<boolean>(false); 
  
  // Navigation state
  const [currentView, setCurrentView] = useState<'form' | 'history' | 'detail'>('form');
  const [selectedPrescription, setSelectedPrescription] = useState<PrescriptionWithIds | null>(null);
  
  // Edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editingPrescription, setEditingPrescription] = useState<PrescriptionWithIds | null>(null);

  const PREVIEW_ELEMENT_ID = 'prescription-preview-area-content';

  // Clear patient info after exporting/saving
  const clearPatientInfo = useCallback(() => {
    setPatientInfo({
      name: '',
      age: '',
      dob: '',
      patientId: ''
    });
    setMedications([]);
    setSupplements([]);
    setGeneralNotes('');
    setNextAppointment('');
    setSoapNote(null);
  }, []);

  const handlePatientInfoChange = useCallback((field: keyof PatientInfo, value: string) => {
    setPatientInfo(prev => {
      const newPatientInfo = { ...prev, [field]: value };
      
      // Auto-generate patient ID when name is entered
      if (field === 'name' && value.trim() !== '') {
        newPatientInfo.patientId = generatePatientId(value);
      }
      
      return newPatientInfo;
    });
  }, []);

  const handleDoctorInfoChange = useCallback((field: keyof DoctorInfo, value: string) => {
    setDoctorInfo(prev => {
      const newDoctorInfo = { ...prev, [field]: value };
      saveDoctorInfoToStorage(newDoctorInfo);
      return newDoctorInfo;
    });
  }, []);

  const handleAddMedication = useCallback(() => {
    setMedications(prev => [
      ...prev,
      { id: uuidv4(), name: '', dosage: '', duration: '', instructions: '' }
    ]);
  }, []);

  const handleUpdateMedication = useCallback((id: string, field: keyof Omit<MedicationItem, 'id'>, value: string) => {
    setMedications(prev => 
      prev.map(med => med.id === id ? { ...med, [field]: value } : med)
    );
  }, []);

  const handleRemoveMedication = useCallback((id: string) => {
    setMedications(prev => prev.filter(med => med.id !== id));
  }, []);

  const handleAddSupplement = useCallback((supplement: WellkittSupplement) => {
    setSupplements(prev => [...prev, supplement]);
  }, []);

  const handleUpdateSupplement = useCallback((id: string, updatedSupplement: WellkittSupplement) => {
    setSupplements(prev => 
      prev.map(supp => supp.id === id ? updatedSupplement : supp)
    );
  }, []);

  const handleRemoveSupplement = useCallback((id: string) => {
    setSupplements(prev => prev.filter(supp => supp.id !== id));
  }, []);

  const handleGeneralNotesChange = useCallback((value: string) => {
    setGeneralNotes(value);
  }, []);

  const handleNextAppointmentChange = useCallback((value: string) => {
    setNextAppointment(value);
  }, []);

  const handleSoapNoteChange = useCallback((soapData: SOAPData | null) => {
    setSoapNote(soapData);
  }, []);

  // Function getCurrentDateTimeFormatted is defined globally above (line 16)
  
  const currentPrescriptionData = useCallback((): PrescriptionData => {
    return {
      patient: patientInfo,
      doctor: doctorInfo,
      medications: medications,
      supplements: supplements,
      generalNotes: generalNotes,
      nextAppointment: nextAppointment,
      soapNote: soapNote,
      dateTime: getCurrentDateTimeFormatted(),
      prescriptionId: generatePrescriptionId(),
    };
  }, [patientInfo, doctorInfo, medications, supplements, generalNotes, nextAppointment, soapNote]);

  const handleExportPdfOnly = useCallback(async () => {
    const dataToPreview = currentPrescriptionData();
     if (!dataToPreview.patient.name && !dataToPreview.doctor.name && dataToPreview.medications.length === 0 && dataToPreview.supplements.length === 0) {
        alert("Por favor, completa al menos algunos datos de la receta antes de exportar.");
        return;
    }

    setIsGeneratingPdf(true);
    const fileName = dataToPreview.patient.name ? `Receta-${dataToPreview.patient.name.replace(/\s+/g, '_')}.pdf` : 'Receta.pdf';

    try {
      await generatePdf(PREVIEW_ELEMENT_ID, fileName);
      alert('Receta exportada a PDF exitosamente.');
      clearPatientInfo();
    } catch(e) {
      console.error("Error durante la generación del PDF:", e);
      // La alerta de error ya es manejada por pdfService
    } finally {
      setIsGeneratingPdf(false);
    }
  }, [currentPrescriptionData, clearPatientInfo]);

  const handleExportAndSave = useCallback(async () => {
    const dataToSave = currentPrescriptionData();
    if (!dataToSave.patient.name && !dataToSave.doctor.name && dataToSave.medications.length === 0 && dataToSave.supplements.length === 0) {
        alert("Por favor, completa al menos algunos datos de la receta antes de exportar/guardar.");
        return;
    }

    setIsGeneratingPdf(true);
    const fileName = dataToSave.patient.name ? `Receta-${dataToSave.patient.name.replace(/\s+/g, '_')}.pdf` : 'Receta.pdf';

    try {
      await generatePdf(PREVIEW_ELEMENT_ID, fileName);
      setIsGeneratingPdf(false);
      setIsSavingToAirtable(true);

      // Save to Supabase only
      const supabaseSuccess = await supabaseService.savePrescription(dataToSave);

      if (supabaseSuccess) {
        alert('✅ Receta exportada a PDF y guardada en Supabase exitosamente.');
        clearPatientInfo();
      } else {
        alert('⚠️ Error al guardar en Supabase. Revisa la consola para más detalles.');
        clearPatientInfo();
      }
    } catch(e) {
      console.error("Error durante el proceso de exportación o guardado:", e);
      alert("Error durante la exportación/guardado. Revisa la consola para más detalles.");
    } finally {
      setIsGeneratingPdf(false);
      setIsSavingToAirtable(false);
    }
  }, [currentPrescriptionData, clearPatientInfo]); 

  // Navigation functions
  const handleViewHistory = useCallback(() => {
    setCurrentView('history');
  }, []);

  const handleBackToForm = useCallback(() => {
    setCurrentView('form');
    setSelectedPrescription(null);
  }, []);

  const handleViewPrescription = useCallback((prescription: PrescriptionWithIds) => {
    setSelectedPrescription(prescription);
    setCurrentView('detail');
  }, []);

  // Edit functions
  const handleEditPrescription = useCallback((prescription: PrescriptionWithIds) => {
    setEditingPrescription(prescription);
    setIsEditing(true);
    
    // Load prescription data into form
    setPatientInfo(prescription.patient);
    setDoctorInfo(prescription.doctor);
    setMedications(prescription.medications);
    setSupplements(prescription.supplements);
    setGeneralNotes(prescription.generalNotes || '');
    setNextAppointment(prescription.nextAppointment || '');
    
    setCurrentView('form');
  }, []);

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
    setEditingPrescription(null);
    clearPatientInfo();
  }, [clearPatientInfo]);

  const handleSaveCorrection = useCallback(async () => {
    if (!editingPrescription) return;

    const dataToSave = currentPrescriptionData();
    const fileName = dataToSave.patient.name ?
      `Receta-Corregida-${dataToSave.patient.name.replace(/\s+/g, '_')}.pdf` :
      'Receta-Corregida.pdf';

    setIsGeneratingPdf(true);
    setIsSavingToAirtable(true);

    try {
      await generatePdf(PREVIEW_ELEMENT_ID, fileName);
      setIsGeneratingPdf(false);

      // Save correction with reference to original
      const success = await supabaseService.savePrescriptionCorrection(
        dataToSave,
        editingPrescription.id!
      );

      if (success) {
        alert('✅ Corrección guardada exitosamente. La receta original se mantiene para auditoría.');
        handleCancelEdit();
      } else {
        alert('⚠️ Error al guardar la corrección. Revisa la consola.');
      }
    } catch (error) {
      console.error("Error durante la corrección:", error);
      alert("Error durante la corrección. Revisa la consola para más detalles.");
    } finally {
      setIsGeneratingPdf(false);
      setIsSavingToAirtable(false);
    }
  }, [editingPrescription, currentPrescriptionData, handleCancelEdit]);

  const previewDisplayData: PrescriptionData | null = (patientInfo.name || patientInfo.age || patientInfo.dob || patientInfo.patientId || doctorInfo.name || medications.length > 0 || supplements.length > 0 || generalNotes || nextAppointment || doctorInfo.professionalID || doctorInfo.clinicEmail) ? {
    patient: patientInfo,
    doctor: doctorInfo,
    medications: medications,
    supplements: supplements,
    generalNotes: generalNotes,
    nextAppointment: nextAppointment,
    dateTime: getCurrentDateTimeFormatted(),
    prescriptionId: generatePrescriptionId(),
  } : null;


  // Render different views based on currentView state
  if (currentView === 'history') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-sky-100 p-4 sm:p-6 lg:p-8">
        <PatientHistory 
          onBackToForm={handleBackToForm}
          onViewPrescription={handleViewPrescription}
          onEditPrescription={handleEditPrescription}
        />
      </div>
    );
  }

  if (currentView === 'detail' && selectedPrescription) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-sky-100 p-4 sm:p-6 lg:p-8">
        <PrescriptionDetail 
          prescription={selectedPrescription}
          onBack={handleBackToForm}
          onEdit={handleEditPrescription}
        />
      </div>
    );
  }

  // Default form view
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-sky-100 p-4 sm:p-6 lg:p-8">
      <header className="mb-8 text-center">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-primary">
              {isEditing ? 'Corrigiendo Receta Médica' : 'Panel de Recetas Médicas'}
            </h1>
            <p className="text-lg text-neutral mt-2">
              {isEditing ? `Editando receta: ${editingPrescription?.prescriptionId}` : 'Sistema de Consulta V1'}
            </p>
          </div>
          <div className="flex gap-3">
            {isEditing && (
              <button
                onClick={handleCancelEdit}
                className="px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center gap-2"
              >
                Cancelar Edición
              </button>
            )}
            <button
              onClick={handleViewHistory}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
            >
              <FileText className="h-5 w-5" />
              Ver Historial
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="lg:sticky lg:top-8">
          <PrescriptionForm
            patientInfo={patientInfo}
            onPatientInfoChange={handlePatientInfoChange}
            doctorInfo={doctorInfo}
            onDoctorInfoChange={handleDoctorInfoChange}
            medications={medications}
            onAddMedication={handleAddMedication}
            onUpdateMedication={handleUpdateMedication}
            onRemoveMedication={handleRemoveMedication}
            supplements={supplements}
            onAddSupplement={handleAddSupplement}
            onUpdateSupplement={handleUpdateSupplement}
            onRemoveSupplement={handleRemoveSupplement}
            generalNotes={generalNotes}
            onGeneralNotesChange={handleGeneralNotesChange}
            nextAppointment={nextAppointment}
            onNextAppointmentChange={handleNextAppointmentChange}
            onGeneratePatientId={generatePatientId}
            soapNote={soapNote}
            onSoapNoteChange={handleSoapNoteChange}
            onExportAndSave={isEditing ? handleSaveCorrection : handleExportAndSave} 
            onExportPdfOnly={handleExportPdfOnly} 
            isGeneratingPdf={isGeneratingPdf}
            isSavingToAirtable={isSavingToAirtable}
            isEditing={isEditing}
            editingPrescription={editingPrescription}
          />
        </div>
        
        <div className="bg-gray-200 p-4 rounded-xl shadow-inner">
           <PrescriptionPreview data={previewDisplayData} previewId={PREVIEW_ELEMENT_ID} />
        </div>
      </main>

      <footer className="text-center mt-12 py-6 border-t border-gray-300">
        <p className="text-sm text-neutral">&copy; {new Date().getFullYear()} Panel de Recetas Médicas. 4 ailabs.</p>
      </footer>
    </div>
  );
};

export default App;