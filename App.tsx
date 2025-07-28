import React, { useState, useCallback, useEffect } from 'react';
import { PatientInfo, MedicationItem, DoctorInfo, PrescriptionData } from './types';
import PrescriptionForm from './components/PrescriptionForm';
import PrescriptionPreview from './components/PrescriptionPreview';
import { generatePdf } from './services/pdfService';
import { savePrescriptionToAirtable } from './services/airtableService'; // Import Airtable service
import { v4 as uuidv4 } from 'uuid'; 

// --- IMPORTANT: REPLACE WITH YOUR ACTUAL AIRTABLE CREDENTIALS ---
// These should ideally be environment variables in a real application.
const AIRTABLE_API_KEY = 'patIzNNnbvXsS2OiG.f4383a609b51eae5d6e27c57632e7ade2782dc4d62ababc6d976cfb35971b788'; // Starts with 'pat...'
const AIRTABLE_BASE_ID = 'appYbBijylq9Xo1o4'; // Starts with 'app...'
const AIRTABLE_TABLE_NAME = 'Datos'; // Or your specific table name
// --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- ---

// Generate unique prescription ID
const generatePrescriptionId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `RX-${timestamp}-${randomStr}`.toUpperCase();
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
  const [generalNotes, setGeneralNotes] = useState<string>('');
  const [nextAppointment, setNextAppointment] = useState<string>('');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [isSavingToAirtable, setIsSavingToAirtable] = useState<boolean>(false); 

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
    setGeneralNotes('');
    setNextAppointment('');
  }, []);

  const handlePatientInfoChange = useCallback((field: keyof PatientInfo, value: string) => {
    setPatientInfo(prev => ({ ...prev, [field]: value }));
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

  const handleGeneralNotesChange = useCallback((value: string) => {
    setGeneralNotes(value);
  }, []);

  const handleNextAppointmentChange = useCallback((value: string) => {
    setNextAppointment(value);
  }, []);

  const getCurrentDateTimeFormatted = (): string => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };
  
  const currentPrescriptionData = useCallback((): PrescriptionData => {
    return {
      patient: patientInfo,
      doctor: doctorInfo,
      medications: medications,
      generalNotes: generalNotes,
      nextAppointment: nextAppointment,
      dateTime: getCurrentDateTimeFormatted(),
      prescriptionId: generatePrescriptionId(),
    };
  }, [patientInfo, doctorInfo, medications, generalNotes, nextAppointment]);

  const handleExportPdfOnly = useCallback(async () => {
    const dataToPreview = currentPrescriptionData();
     if (!dataToPreview.patient.name && !dataToPreview.doctor.name && dataToPreview.medications.length === 0) {
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
    if (AIRTABLE_API_KEY === 'YOUR_PERSONAL_ACCESS_TOKEN_HERE' || AIRTABLE_BASE_ID === 'YOUR_BASE_ID_HERE') {
        alert('Por favor, configura tus credenciales de Airtable en App.tsx antes de guardar.');
        return;
    }

    const dataToSave = currentPrescriptionData();
    if (!dataToSave.patient.name && !dataToSave.doctor.name && dataToSave.medications.length === 0) {
        alert("Por favor, completa al menos algunos datos de la receta antes de exportar/guardar.");
        return;
    }

    setIsGeneratingPdf(true);
    const fileName = dataToSave.patient.name ? `Receta-${dataToSave.patient.name.replace(/\s+/g, '_')}.pdf` : 'Receta.pdf';
    
    try {
      await generatePdf(PREVIEW_ELEMENT_ID, fileName);
      setIsGeneratingPdf(false); 
      setIsSavingToAirtable(true); 

      const airtableSuccess = await savePrescriptionToAirtable(
        dataToSave,
        AIRTABLE_API_KEY,
        AIRTABLE_BASE_ID,
        AIRTABLE_TABLE_NAME
      );

      if (airtableSuccess) {
        alert('Receta exportada a PDF y guardada en Airtable exitosamente.');
        clearPatientInfo();
      } else {
        alert('Receta exportada a PDF, pero hubo un error al guardarla en Airtable.');
        clearPatientInfo();
      }
    } catch(e) {
      console.error("Error durante el proceso de exportación o guardado:", e);
       if (!isSavingToAirtable) { 
         // Alert for PDF generation error is handled by pdfService, no need to double alert
       }
    } finally {
      setIsGeneratingPdf(false);
      setIsSavingToAirtable(false);
    }
  }, [currentPrescriptionData, clearPatientInfo]); 

  const previewDisplayData: PrescriptionData | null = (patientInfo.name || patientInfo.age || patientInfo.dob || patientInfo.patientId || doctorInfo.name || medications.length > 0 || generalNotes || nextAppointment || doctorInfo.professionalID || doctorInfo.clinicEmail) ? {
    patient: patientInfo,
    doctor: doctorInfo,
    medications: medications,
    generalNotes: generalNotes,
    nextAppointment: nextAppointment,
    dateTime: getCurrentDateTimeFormatted(),
    prescriptionId: generatePrescriptionId(),
  } : null;


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-sky-100 p-4 sm:p-6 lg:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-primary">Panel de Recetas Médicas</h1>
        <p className="text-lg text-neutral mt-2">Sistema de Consulta V1</p>
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
            generalNotes={generalNotes}
            onGeneralNotesChange={handleGeneralNotesChange}
            nextAppointment={nextAppointment}
            onNextAppointmentChange={handleNextAppointmentChange}
            onExportAndSave={handleExportAndSave} 
            onExportPdfOnly={handleExportPdfOnly} 
            isGeneratingPdf={isGeneratingPdf}
            isSavingToAirtable={isSavingToAirtable}
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