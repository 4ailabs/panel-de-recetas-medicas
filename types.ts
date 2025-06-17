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
  generalNotes: string;
  dateTime: string; // Changed from 'date' to 'dateTime'
  prescriptionId: string; // Unique prescription ID/folio
}