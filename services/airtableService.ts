
import { PrescriptionData, MedicationItem } from '../types';

// --- IMPORTANT: REPLACE WITH YOUR ACTUAL AIRTABLE CREDENTIALS ---
// You should ideally store these as environment variables in a real application.
// For this exercise, you'll set them in App.tsx and pass them down,
// or you can directly replace them here if this service is only used once.
// const YOUR_AIRTABLE_API_KEY = 'YOUR_PERSONAL_ACCESS_TOKEN_HERE'; // Starts with 'pat...'
// const YOUR_AIRTABLE_BASE_ID = 'YOUR_BASE_ID_HERE'; // Starts with 'app...'
// const YOUR_AIRTABLE_TABLE_NAME = 'YOUR_TABLE_NAME_HERE'; // E.g., 'Recetas Emitidas'
// ---

interface AirtableFieldData {
  [key: string]: any;
}

interface AirtableRecord {
  fields: AirtableFieldData;
}

interface AirtableRequest {
  records: AirtableRecord[];
}

/**
 * Formats a DD/MM/YYYY HH:mm string to YYYY-MM-DDTHH:mm:ss.000Z (ISO 8601 UTC)
 * Airtable is generally good at parsing dates, but ISO 8601 is robust.
 */
const formatDateTimeForAirtable = (dateTimeString: string): string => {
  try {
    const [datePart, timePart] = dateTimeString.split(' ');
    if (!datePart || !timePart) throw new Error('Invalid dateTimeString format');

    const [day, month, year] = datePart.split('/');
    if (!day || !month || !year) throw new Error('Invalid date part');
    
    const dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), ...timePart.split(':').map(Number) as [number, number]);
    if (isNaN(dateObj.getTime())) throw new Error('Invalid date created');
    
    return dateObj.toISOString();
  } catch (error) {
    console.error("Error formatting date for Airtable:", error, "Original string:", dateTimeString);
    return dateTimeString; 
  }
};


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const savePrescriptionToAirtable = async (
  prescriptionData: PrescriptionData,
  apiKey: string,
  baseId: string,
  tableName: string,
  maxRetries: number = 3
): Promise<boolean> => {
  if (!apiKey || !baseId || !tableName) {
    console.error("Airtable API Key, Base ID, or Table Name is missing.");
    alert("Configuración de Airtable incompleta. Revisa la consola.");
    return false;
  }

  const endpoint = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;

  const fields: AirtableFieldData = {
    // Patient Info
    'Nombre_Paciente': prescriptionData.patient.name,
    'Edad_Paciente': prescriptionData.patient.age ? parseInt(prescriptionData.patient.age, 10) : undefined, // Send as number if present
    'Fecha_Nacimiento_Paciente': prescriptionData.patient.dob, // Assumes YYYY-MM-DD from <input type="date">, Airtable handles this
    'ID_Expediente_Paciente': prescriptionData.patient.patientId,
    
    // Prescription Meta
    'Fecha_Hora_Emision': formatDateTimeForAirtable(prescriptionData.dateTime),
    
    // Doctor Info
    'Nombre_Doctor': prescriptionData.doctor.name,
    'Cedula_Profesional_Doctor': prescriptionData.doctor.professionalID,
    'Universidad_Doctor': prescriptionData.doctor.university,
    
    // Clinic Info
    'Nombre_Clinica': prescriptionData.doctor.clinicName,
    'Direccion_Clinica': prescriptionData.doctor.clinicAddress,
    'Telefono_Clinica': prescriptionData.doctor.contact,
    'Email_Clinica': prescriptionData.doctor.clinicEmail,
    'URL_Logo1': prescriptionData.doctor.logo1Url,
    'URL_Logo2': prescriptionData.doctor.logo2Url,
    
    // Prescription Details
    'Medicamentos': JSON.stringify(prescriptionData.medications.map(med => ({
        nombre: med.name,
        dosis: med.dosage,
        duracion: med.duration,
        instrucciones: med.instructions
    }))), 
    'Suplementos_Naturales': prescriptionData.supplements ? JSON.stringify(prescriptionData.supplements.map(supp => ({
        nombre: supp.name,
        marca: supp.brand,
        categoria: supp.category,
        dosis: supp.dosage,
        duracion: supp.duration,
        instrucciones: supp.instructions,
        presentacion: supp.presentation
    }))) : undefined,
    'Notas_Generales': prescriptionData.generalNotes,
    'Proxima_Cita': prescriptionData.nextAppointment,
  };

  Object.keys(fields).forEach(key => {
    if (fields[key] === '' || fields[key] === null || fields[key] === undefined || (typeof fields[key] === 'number' && isNaN(fields[key]))) {
      delete fields[key];
    }
  });


  const requestBody: AirtableRequest = {
    records: [{ fields }],
  };

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.status === 429 && attempt < maxRetries) {
        // Rate limit hit, wait and retry
        const waitTime = Math.pow(2, attempt) * 1000; // Exponential backoff: 2s, 4s, 8s
        console.log(`Rate limit hit. Reintentando en ${waitTime/1000} segundos... (intento ${attempt}/${maxRetries})`);
        await delay(waitTime);
        continue;
      }

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error saving to Airtable:', response.status, errorData);
        
        if (response.status === 429) {
          alert(`Error de límite de solicitudes en Airtable. Se agotaron los ${maxRetries} reintentos. Intenta de nuevo en unos minutos.`);
        } else {
          alert(`Error al guardar en Airtable: ${errorData.error?.message || response.statusText}`);
        }
        return false;
      }
      
      console.log(`Receta guardada en Airtable exitosamente (intento ${attempt})`);
      return true;
      
    } catch (error) {
      console.error(`Network or other error saving to Airtable (attempt ${attempt}):`, error);
      
      if (attempt === maxRetries) {
        alert('Error de red o desconocido al guardar en Airtable. Revisa la consola.');
        return false;
      }
      
      // Wait before retrying network errors too
      await delay(1000 * attempt);
    }
  }

  return false;
};