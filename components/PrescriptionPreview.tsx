
import React, { useEffect, useState } from 'react';
import { PrescriptionData } from '../types';
import QRCode from 'qrcode';

interface PrescriptionPreviewProps {
  data: PrescriptionData | null;
  previewId: string;
}

const PrescriptionPreview: React.FC<PrescriptionPreviewProps> = ({ data, previewId }) => {
  if (!data) {
    return (
      <div className="p-8 bg-white shadow-lg rounded-xl h-full flex items-center justify-center text-gray-500">
        <p>Completa el formulario para ver la vista previa de la receta.</p>
      </div>
    );
  }

  const { patient, doctor, medications, generalNotes, nextAppointment, dateTime, prescriptionId } = data;
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  // Generate QR Code when prescription data changes
  useEffect(() => {
    if (prescriptionId && doctor.name && patient.name) {
      const qrData = {
        prescriptionId,
        doctorName: doctor.name,
        doctorId: doctor.professionalID,
        patientName: patient.name,
        dateTime,
        verificationUrl: `https://energyintelligence.work/receta-verificada?folio=${prescriptionId}&doctor=${encodeURIComponent(doctor.name)}&cedula=${doctor.professionalID}`
      };
      
      QRCode.toDataURL(JSON.stringify(qrData), {
        width: 100,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      })
      .then((url) => setQrCodeUrl(url))
      .catch((err) => console.error('Error generating QR code:', err));
    }
  }, [prescriptionId, doctor.name, doctor.professionalID, patient.name, dateTime]);

  // Helper to format YYYY-MM-DD to DD/MM/YYYY for display
  const formatDisplayDate = (dateString: string): string => {
    if (!dateString) return "N/D";
    try {
        const [year, month, day] = dateString.split('-');
        if (year && month && day) {
            return `${day}/${month}/${year}`;
        }
        return dateString; // Return original if not in YYYY-MM-DD
    } catch {
        return dateString; // Fallback
    }
  };


  return (
    <div 
      id={previewId} 
      className="p-8 bg-white shadow-lg rounded-xl h-full overflow-y-auto prescription-preview-area flex flex-col" 
      style={{ maxWidth: '210mm', width: '100%', minHeight: '297mm', margin: '0 auto' }}
    >
      {/* Prescription Header - Logos */}
      {(doctor.logo1Url || doctor.logo2Url) && (
        <header className="mb-4 pb-2">
            <div className="flex justify-between items-center">
                {doctor.logo1Url ? (
                    <img 
                        src={doctor.logo1Url} 
                        alt="Logo Clínica 1" 
                        className="max-h-16 object-contain"
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                ) : <div className="flex-1 min-w-[64px]"></div>}
                
                {doctor.logo2Url ? (
                    <img 
                        src={doctor.logo2Url} 
                        alt="Logo Clínica 2" 
                        className="max-h-16 object-contain"
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                ) : <div className="flex-1 min-w-[64px]"></div>}
            </div>
            <hr className="mt-2 border-gray-300"/>
        </header>
      )}

      {/* Doctor and Date Info */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <h2 className="text-base font-semibold text-gray-700">Dr. {doctor.name || <span className="italic text-gray-400">Nombre del Médico</span>}</h2>
          {doctor.professionalID && <p className="text-sm text-gray-600">Cédula Profesional: {doctor.professionalID}</p>}
          {doctor.university && <p className="text-sm text-gray-600">{doctor.university}</p>}
          {prescriptionId && <p className="text-xs text-gray-500 mt-1">Folio: {prescriptionId}</p>}
        </div>
        <div className="flex flex-col items-end space-y-2">
          <p className="text-sm text-gray-600">Fecha y Hora: {dateTime}</p>
          {qrCodeUrl && (
            <div className="text-center">
              <img src={qrCodeUrl} alt="Código QR de verificación" className="w-16 h-16" />
              <p className="text-[10px] text-gray-500 mt-1">Verificación</p>
            </div>
          )}
        </div>
      </div>

      {/* Patient Information */}
      <section className="mb-6 p-4 border border-gray-300 rounded-md bg-gray-50">
        <h3 className="text-md font-semibold text-gray-700 mb-2">Información del Paciente:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-800">
            <p><span className="font-medium">Nombre:</span> {patient.name || <span className="italic text-gray-400">N/D</span>}</p>
            {patient.patientId && <p><span className="font-medium">No. Expediente:</span> {patient.patientId}</p>}
            {patient.age && <p><span className="font-medium">Edad:</span> {patient.age} años</p>}
            {patient.dob && <p><span className="font-medium">Fecha de Nacimiento:</span> {formatDisplayDate(patient.dob)}</p>}
        </div>
      </section>
      
      {/* Medications Symbol and Title */}
      <div className="flex items-center mb-4">
        <span className="text-2xl font-serif text-primary mr-2">℞</span>
        <h3 className="text-lg font-semibold text-gray-700">Receta</h3>
      </div>

      {/* Medications List */}
      <section className="mb-6 space-y-4">
        {medications.length > 0 ? (
          medications.map((med, index) => (
            <div key={med.id} className="pb-3 border-b border-dashed border-gray-300 last:border-b-0">
              <p className="text-sm font-semibold text-gray-800">{index + 1}. {med.name || <span className="italic text-gray-400">Medicamento sin nombre</span>}</p>
              <div className="pl-5 text-xs text-gray-600">
                <p><span className="font-medium">Dosis:</span> {med.dosage || "N/D"}</p>
                <p><span className="font-medium">Duración:</span> {med.duration || "N/D"}</p>
                {med.instructions && <p><span className="font-medium">Instrucciones:</span> {med.instructions}</p>}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 italic">No hay medicamentos listados.</p>
        )}
      </section>

      {/* General Notes */}
      {generalNotes && (
        <section className="mb-8 p-4 border border-gray-300 rounded-md bg-gray-50">
          <h3 className="text-md font-semibold text-gray-700 mb-1">Indicaciones Generales:</h3>
          <p className="text-sm text-gray-600 whitespace-pre-line">{generalNotes}</p>
        </section>
      )}

      {/* Next Appointment */}
      {nextAppointment && (
        <section className="mb-8 p-4 border border-blue-300 rounded-md bg-blue-50">
          <h3 className="text-md font-semibold text-blue-700 mb-1">Próxima Cita:</h3>
          <p className="text-sm text-blue-600 font-medium">{nextAppointment}</p>
        </section>
      )}

      {/* Footer Area - Pushed to bottom */}
      <footer className="mt-auto pt-8 border-t-2 border-gray-400">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1: Clinic Information */}
          <div className="text-xs text-gray-600">
            <p className="font-semibold text-sm mb-1">{doctor.clinicName || <span className="italic text-gray-400">Nombre de la Clínica</span>}</p>
            <p>{doctor.clinicAddress || <span className="italic text-gray-400">Dirección de la Clínica</span>}</p>
            {doctor.contact && <p>Teléfono: {doctor.contact}</p>}
            {doctor.clinicEmail && <p>Email: {doctor.clinicEmail}</p>}
            {(!doctor.contact && !doctor.clinicEmail) && <p><span className="italic text-gray-400">Contacto de la clínica no proporcionado</span></p>}
          </div>

          {/* Column 2: Doctor's Signature and Details */}
          <div className="text-xs text-gray-600 md:text-right">
            <div className="inline-block w-full max-w-[250px] md:ml-auto text-center">
              {/* Digital Signature */}
              {doctor.signatureImageUrl && (
                <div className="mb-2 flex justify-center">
                  <img 
                    src={doctor.signatureImageUrl} 
                    alt="Firma digital" 
                    className="max-h-12 max-w-full object-contain"
                  />
                </div>
              )}
              
              <div className="border-t-2 border-gray-700 pt-2">
                {(doctor.name || doctor.professionalID || doctor.university) ? (
                  <>
                    {doctor.name && <p className="font-semibold text-xs">Dr. {doctor.name}</p>}
                    {doctor.professionalID && <p className="text-xs">C.P. {doctor.professionalID}</p>}
                    {doctor.university && <p className="text-xs">{doctor.university}</p>}
                  </>
                ) : (
                  <div className="min-h-[40px]"></div> 
                )}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrescriptionPreview;
