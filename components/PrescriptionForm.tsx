import React from 'react';
import { PatientInfo, MedicationItem, DoctorInfo } from '../types';
import MedicationInput from './MedicationInput';
import Button from './Button';
import PlusIcon from './icons/PlusIcon';
import DownloadIcon from './icons/DownloadIcon';

interface PrescriptionFormProps {
  patientInfo: PatientInfo;
  onPatientInfoChange: (field: keyof PatientInfo, value: string) => void;
  doctorInfo: DoctorInfo;
  onDoctorInfoChange: (field: keyof DoctorInfo, value: string) => void;
  medications: MedicationItem[];
  onAddMedication: () => void;
  onUpdateMedication: (id: string, field: keyof Omit<MedicationItem, 'id'>, value: string) => void;
  onRemoveMedication: (id: string) => void;
  generalNotes: string;
  onGeneralNotesChange: (value: string) => void;
  onExportAndSave: () => void; 
  onExportPdfOnly: () => void; 
  isGeneratingPdf: boolean;
  isSavingToAirtable: boolean;
}

const PrescriptionForm: React.FC<PrescriptionFormProps> = ({
  patientInfo,
  onPatientInfoChange,
  doctorInfo,
  onDoctorInfoChange,
  medications,
  onAddMedication,
  onUpdateMedication,
  onRemoveMedication,
  generalNotes,
  onGeneralNotesChange,
  onExportAndSave,
  onExportPdfOnly, 
  isGeneratingPdf,
  isSavingToAirtable
}) => {
  
  const handlePatientInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPatientInfoChange(e.target.name as keyof PatientInfo, e.target.value);
  };

  const handleDoctorInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onDoctorInfoChange(e.target.name as keyof DoctorInfo, e.target.value);
  };

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecciona un archivo de imagen.');
        return;
      }
      
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('La imagen debe ser menor a 2MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target?.result as string;
        onDoctorInfoChange('signatureImageUrl', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearSignature = () => {
    onDoctorInfoChange('signatureImageUrl', '');
  };

  const getExportAndSaveButtonText = () => {
    if (isGeneratingPdf && isSavingToAirtable) return 'Generando PDF y Guardando...';
    if (isGeneratingPdf) return 'Generando PDF...'; 
    if (isSavingToAirtable) return 'Guardando Receta...';
    return 'Exportar PDF y Guardar Receta';
  };

  const getExportOnlyButtonText = () => {
    if (isGeneratingPdf && !isSavingToAirtable) return 'Generando PDF...'; // Only show if this button initiated PDF
    return 'Exportar PDF Solamente';
  };

  // Determine if the "Export PDF Only" button should be disabled
  const isExportOnlyDisabled = isGeneratingPdf; 
  // Determine if the "Export and Save" button should be disabled
  const isExportAndSaveDisabled = isGeneratingPdf || isSavingToAirtable;


  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6 p-6 bg-white shadow-lg rounded-xl h-full overflow-y-auto">
      
      <section>
        <h3 className="text-xl font-semibold text-primary mb-3 border-b pb-2">Información del Médico</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="doctorName" className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo del Médico</label>
            <input
              type="text"
              name="name"
              id="doctorName"
              value={doctorInfo.name}
              onChange={handleDoctorInputChange}
              placeholder="Ej: Dra. Ana Pérez"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="professionalID" className="block text-sm font-medium text-gray-700 mb-1">Cédula Profesional</label>
            <input
              type="text"
              name="professionalID"
              id="professionalID"
              value={doctorInfo.professionalID}
              onChange={handleDoctorInputChange}
              placeholder="Ej: 1234567"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-1">Universidad (Se mostrará en la receta)</label>
            <input
              type="text"
              name="university"
              id="university"
              value={doctorInfo.university}
              onChange={handleDoctorInputChange}
              placeholder="Ej: Universidad Nacional Autónoma de México"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="clinicName" className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Clínica</label>
            <input
              type="text"
              name="clinicName"
              id="clinicName"
              value={doctorInfo.clinicName}
              onChange={handleDoctorInputChange}
              placeholder="Ej: Centro Médico Bienestar"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="clinicAddress" className="block text-sm font-medium text-gray-700 mb-1">Dirección de la Clínica</label>
            <input
              type="text"
              name="clinicAddress"
              id="clinicAddress"
              value={doctorInfo.clinicAddress}
              onChange={handleDoctorInputChange}
              placeholder="Ej: Calle Salud 123, Ciudad Médica"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
           <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">Teléfono de la Clínica</label>
            <input
              type="tel"
              name="contact"
              id="contact"
              value={doctorInfo.contact}
              onChange={handleDoctorInputChange}
              placeholder="Ej: (555) 123-4567"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="clinicEmail" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico de la Clínica</label>
            <input
              type="email"
              name="clinicEmail"
              id="clinicEmail"
              value={doctorInfo.clinicEmail}
              onChange={handleDoctorInputChange}
              placeholder="Ej: info@clinicabienestar.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="logo1Url" className="block text-sm font-medium text-gray-700 mb-1">URL del Logo 1 (Opcional)</label>
            <input
              type="url"
              name="logo1Url"
              id="logo1Url"
              value={doctorInfo.logo1Url}
              onChange={handleDoctorInputChange}
              placeholder="https://ejemplo.com/logo1.png"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="logo2Url" className="block text-sm font-medium text-gray-700 mb-1">URL del Logo 2 (Opcional)</label>
            <input
              type="url"
              name="logo2Url"
              id="logo2Url"
              value={doctorInfo.logo2Url}
              onChange={handleDoctorInputChange}
              placeholder="https://ejemplo.com/logo2.png"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="signatureUpload" className="block text-sm font-medium text-gray-700 mb-1">Firma Digital (Imagen PNG/JPG)</label>
            <div className="space-y-2">
              <input
                type="file"
                id="signatureUpload"
                accept="image/*"
                onChange={handleSignatureUpload}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
              />
              {doctorInfo.signatureImageUrl && (
                <div className="flex items-center justify-between p-2 bg-green-50 border border-green-200 rounded-md">
                  <div className="flex items-center space-x-2">
                    <img 
                      src={doctorInfo.signatureImageUrl} 
                      alt="Firma" 
                      className="h-8 w-auto border border-gray-200 rounded"
                    />
                    <span className="text-sm text-green-700">Firma cargada exitosamente</span>
                  </div>
                  <button
                    type="button"
                    onClick={clearSignature}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Eliminar
                  </button>
                </div>
              )}
              <p className="text-xs text-gray-500">Sube una imagen transparente (PNG recomendado) de tu firma. Máximo 2MB.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-primary mb-3 border-b pb-2">Información del Paciente</h3>
        <div className="space-y-4">
            <div>
                <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo del Paciente</label>
                <input
                    type="text"
                    name="name"
                    id="patientName"
                    value={patientInfo.name}
                    onChange={handlePatientInputChange}
                    placeholder="Ej: Juan García"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="patientAge" className="block text-sm font-medium text-gray-700 mb-1">Edad</label>
                    <input
                        type="number" // Use number for age for better input control
                        name="age"
                        id="patientAge"
                        value={patientInfo.age}
                        onChange={handlePatientInputChange}
                        placeholder="Ej: 30"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="patientDob" className="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento</label>
                    <input
                        type="date" // Standard date picker
                        name="dob"
                        id="patientDob"
                        value={patientInfo.dob}
                        onChange={handlePatientInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 mb-1">Número de Expediente (Opcional)</label>
                <input
                    type="text"
                    name="patientId"
                    id="patientId"
                    value={patientInfo.patientId}
                    onChange={handlePatientInputChange}
                    placeholder="Ej: EXP-00123"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                />
            </div>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-3 border-b pb-2">
          <h3 className="text-xl font-semibold text-primary">Medicamentos / Remedios</h3>
          <Button
            type="button"
            onClick={onAddMedication}
            variant="secondary"
            size="sm"
            leftIcon={<PlusIcon />}
          >
            Agregar Ítem
          </Button>
        </div>
        {medications.length === 0 && (
          <p className="text-sm text-gray-500 italic">Aún no se han agregado medicamentos. Haz clic en "Agregar Ítem" para comenzar.</p>
        )}
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {medications.map((item, index) => (
            <MedicationInput
              key={item.id}
              item={item}
              index={index}
              onChange={onUpdateMedication}
              onRemove={onRemoveMedication}
            />
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-primary mb-3 border-b pb-2">Indicaciones Generales</h3>
        <textarea
          name="generalNotes"
          id="generalNotes"
          rows={3}
          value={generalNotes}
          onChange={(e) => onGeneralNotesChange(e.target.value)}
          placeholder="Ej: Seguimiento en 2 semanas, Mantener una dieta equilibrada..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
        />
      </section>
      
      <div className="pt-4 border-t space-y-3">
        <Button
          type="button"
          onClick={onExportAndSave}
          variant="primary"
          size="lg"
          className="w-full"
          leftIcon={<DownloadIcon />}
          disabled={isExportAndSaveDisabled}
        >
          {getExportAndSaveButtonText()}
        </Button>
        <Button
          type="button"
          onClick={onExportPdfOnly}
          variant="outline" 
          size="lg"
          className="w-full"
          leftIcon={<DownloadIcon />}
          disabled={isExportOnlyDisabled} 
        >
          {getExportOnlyButtonText()}
        </Button>
      </div>
    </form>
  );
};

export default PrescriptionForm;