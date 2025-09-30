export interface PatientInfo {
  name: string;
  age: string;
  dob: string; // Date of Birth YYYY-MM-DD
  patientId: string; // Patient record number/ID
}

export interface MedicationItem {
  id: string;
  name: string;
  dosage: string;
  duration: string;
  instructions: string;
}

export interface WellkittSupplement {
  id: string;
  name: string;
  brand: string;
  dosage: string;
  duration: string;
  instructions: string;
  category: string;
  presentation?: string;
}

export interface DoctorInfo {
  name: string;
  clinicName: string;
  clinicAddress: string;
  contact: string; // This will now primarily be for phone
  clinicEmail: string; // New field for clinic email
  professionalID: string;
  university: string;
  logo1Url: string;
  logo2Url: string;
  signatureImageUrl: string; // Base64 encoded signature image
}

export interface PrescriptionData {
  patient: PatientInfo;
  doctor: DoctorInfo;
  medications: MedicationItem[];
  supplements: WellkittSupplement[];
  generalNotes: string;
  nextAppointment?: string; // Next appointment text (e.g., "En una semana", "En 15 días")
  soapNote?: SOAPData; // SOAP note for medical records
  dateTime: string; // Changed from 'date' to 'dateTime'
  prescriptionId: string; // Unique prescription ID/folio
}

// SOAP Note structure for medical notes
export interface SOAPData {
  subjective: {
    chief_complaint?: string;
    current_medications?: string;
  };
  objective: {
    vital_signs?: string;
    key_findings?: string;
  };
  assessment: {
    diagnosis?: string;
  };
  plan: {
    treatment?: string;
  };
}

// Extended prescription data with database IDs
export interface PrescriptionWithIds extends PrescriptionData {
  id?: string;
  patientDbId?: string;
  doctorDbId?: string;
  soapNote?: SOAPData;
}