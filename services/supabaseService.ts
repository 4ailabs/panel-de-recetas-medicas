import { supabase, Database } from '../config/supabase';
import { PrescriptionData, MedicationItem, WellkittSupplement, DoctorInfo, PatientInfo } from '../types';

// Type definitions for Supabase
type Doctor = Database['public']['Tables']['doctors']['Row'];
type Patient = Database['public']['Tables']['patients']['Row'];

// SOAP Note structure
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

// Extended prescription data with Supabase IDs
export interface PrescriptionWithIds extends PrescriptionData {
  id?: string;
  patientDbId?: string;
  doctorDbId?: string;
  soapNote?: SOAPData;
}

export class SupabaseService {
  
  // ===== DOCTOR OPERATIONS =====
  
  /**
   * Create or update a doctor
   */
  async saveDoctor(doctorInfo: DoctorInfo): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .upsert({
          professional_id: doctorInfo.professionalID,
          name: doctorInfo.name,
          university: doctorInfo.university,
          clinic_name: doctorInfo.clinicName,
          clinic_address: doctorInfo.clinicAddress,
          contact: doctorInfo.contact,
          clinic_email: doctorInfo.clinicEmail,
          logo1_url: doctorInfo.logo1Url,
          logo2_url: doctorInfo.logo2Url,
          signature_image_url: doctorInfo.signatureImageUrl,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'professional_id'
        })
        .select('id')
        .single();

      if (error) {
        console.error('Error saving doctor:', error);
        return null;
      }

      return data.id;
    } catch (error) {
      console.error('Error in saveDoctor:', error);
      return null;
    }
  }

  /**
   * Get doctor by professional ID
   */
  async getDoctor(professionalId: string): Promise<Doctor | null> {
    try {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .eq('professional_id', professionalId)
        .single();

      if (error) {
        console.error('Error getting doctor:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getDoctor:', error);
      return null;
    }
  }

  // ===== PATIENT OPERATIONS =====
  
  /**
   * Create or update a patient
   */
  async savePatient(patientInfo: PatientInfo, doctorId: string): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from('patients')
        .upsert({
          patient_id: patientInfo.patientId,
          name: patientInfo.name,
          age: patientInfo.age ? parseInt(patientInfo.age) : null,
          date_of_birth: patientInfo.dob || null,
          phone: null, // Add phone field to PatientInfo if needed
          email: null, // Add email field to PatientInfo if needed
          doctor_id: doctorId,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'patient_id'
        })
        .select('id')
        .single();

      if (error) {
        console.error('Error saving patient:', error);
        return null;
      }

      return data.id;
    } catch (error) {
      console.error('Error in savePatient:', error);
      return null;
    }
  }

  /**
   * Get patient by patient ID
   */
  async getPatient(patientId: string): Promise<Patient | null> {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('patient_id', patientId)
        .single();

      if (error) {
        console.error('Error getting patient:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getPatient:', error);
      return null;
    }
  }

  /**
   * Search patients by name
   */
  async searchPatients(query: string): Promise<Patient[]> {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .ilike('name', `%${query}%`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error searching patients:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in searchPatients:', error);
      return [];
    }
  }

  // ===== PRESCRIPTION OPERATIONS =====
  
  /**
   * Save complete prescription with all related data
   */
  async savePrescription(prescriptionData: PrescriptionData): Promise<boolean> {
    try {
      console.log('Starting savePrescription with data:', prescriptionData);
      
      // Start a transaction-like operation
      
      // 1. Save doctor
      console.log('Saving doctor...');
      const doctorId = await this.saveDoctor(prescriptionData.doctor);
      if (!doctorId) {
        console.error('Failed to save doctor');
        throw new Error('Failed to save doctor');
      }
      console.log('Doctor saved with ID:', doctorId);

      // 2. Save patient
      console.log('👤 Saving patient...');
      const patientId = await this.savePatient(prescriptionData.patient, doctorId);
      if (!patientId) {
        console.error('Failed to save patient');
        throw new Error('Failed to save patient');
      }
      console.log('Patient saved with ID:', patientId);

      // 3. Save prescription
      console.log('Saving prescription...');
      console.log('Prescription data:', {
        prescription_id: prescriptionData.prescriptionId,
        patient_id: patientId,
        doctor_id: doctorId,
        prescription_date: prescriptionData.dateTime,
        next_appointment: prescriptionData.nextAppointment,
        general_notes: prescriptionData.generalNotes
      });
      
      const { data: prescription, error: prescriptionError } = await supabase
        .from('prescriptions')
        .insert({
          prescription_id: prescriptionData.prescriptionId,
          patient_id: patientId,
          doctor_id: doctorId,
          prescription_date: prescriptionData.dateTime,
          next_appointment: prescriptionData.nextAppointment,
          general_notes: prescriptionData.generalNotes
        })
        .select('id')
        .single();

      if (prescriptionError) {
        console.error('Prescription error:', prescriptionError);
        throw new Error(`Failed to save prescription: ${prescriptionError.message}`);
      }
      
      if (!prescription) {
        console.error('No prescription data returned');
        throw new Error('Failed to save prescription: No data returned');
      }
      
      console.log('Prescription saved with ID:', prescription.id);

      // 4. Save medications
      if (prescriptionData.medications.length > 0) {
        const medicationsData = prescriptionData.medications.map((med, index) => ({
          prescription_id: prescription.id,
          medication_name: med.name,
          dosage: med.dosage,
          duration: med.duration,
          instructions: med.instructions,
          item_number: index + 1
        }));

        const { error: medicationsError } = await supabase
          .from('prescription_medications')
          .insert(medicationsData);

        if (medicationsError) {
          throw new Error('Failed to save medications');
        }
      }

      // 5. Save supplements
      if (prescriptionData.supplements.length > 0) {
        const supplementsData = prescriptionData.supplements.map((supp, index) => ({
          prescription_id: prescription.id,
          supplement_id: supp.id,
          supplement_name: supp.name,
          supplement_brand: supp.brand,
          supplement_category: supp.category,
          dosage: supp.dosage,
          duration: supp.duration,
          instructions: supp.instructions,
          item_number: prescriptionData.medications.length + index + 1
        }));

        const { error: supplementsError } = await supabase
          .from('prescription_supplements')
          .insert(supplementsData);

        if (supplementsError) {
          throw new Error('Failed to save supplements');
        }
      }

      console.log('Prescription saved to Supabase successfully');
      return true;

    } catch (error) {
      console.error('Error saving prescription to Supabase:', error);
      return false;
    }
  }

  // ===== SOAP NOTES OPERATIONS =====
  
  /**
   * Save SOAP note for a prescription
   */
  async saveSOAPNote(prescriptionId: string, soapData: SOAPData): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('soap_notes')
        .upsert({
          prescription_id: prescriptionId,
          subjective: soapData.subjective,
          objective: soapData.objective,
          assessment: soapData.assessment,
          plan: soapData.plan,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'prescription_id'
        });

      if (error) {
        console.error('Error saving SOAP note:', error);
        return false;
      }

      console.log('SOAP note saved successfully');
      return true;
    } catch (error) {
      console.error('Error in saveSOAPNote:', error);
      return false;
    }
  }

  /**
   * Get SOAP note for a prescription
   */
  async getSOAPNote(prescriptionId: string): Promise<SOAPData | null> {
    try {
      const { data, error } = await supabase
        .from('soap_notes')
        .select('*')
        .eq('prescription_id', prescriptionId)
        .single();

      if (error) {
        console.error('Error getting SOAP note:', error);
        return null;
      }

      return {
        subjective: data.subjective || {},
        objective: data.objective || {},
        assessment: data.assessment || {},
        plan: data.plan || {}
      };
    } catch (error) {
      console.error('Error in getSOAPNote:', error);
      return null;
    }
  }

  // ===== HISTORIAL OPERATIONS =====
  
  /**
   * Get patient history
   */
  async getPatientHistory(patientId: string): Promise<PrescriptionWithIds[]> {
    try {
      const { data, error } = await supabase
        .from('prescriptions')
        .select(`
          *,
          patients!inner(*),
          doctors(*),
          prescription_medications(*),
          prescription_supplements(*),
          soap_notes(*)
        `)
        .eq('patients.patient_id', patientId)
        .order('prescription_date', { ascending: false });

      if (error) {
        console.error('Error getting patient history:', error);
        return [];
      }

      // Transform the data to match PrescriptionData structure
      return data.map(prescription => this.transformPrescriptionData(prescription));
    } catch (error) {
      console.error('Error in getPatientHistory:', error);
      return [];
    }
  }

  /**
   * Get prescription by ID
   */
  async getPrescription(prescriptionId: string): Promise<PrescriptionWithIds | null> {
    try {
      const { data, error } = await supabase
        .from('prescriptions')
        .select(`
          *,
          patients(*),
          doctors(*),
          prescription_medications(*),
          prescription_supplements(*),
          soap_notes(*)
        `)
        .eq('prescription_id', prescriptionId)
        .single();

      if (error) {
        console.error('Error getting prescription:', error);
        return null;
      }

      return this.transformPrescriptionData(data);
    } catch (error) {
      console.error('Error in getPrescription:', error);
      return null;
    }
  }

  // ===== UTILITY METHODS =====
  
  /**
   * Transform Supabase data to PrescriptionData structure
   */
  private transformPrescriptionData(data: any): PrescriptionWithIds {
    const medications: MedicationItem[] = data.prescription_medications?.map((med: any) => ({
      id: med.id,
      name: med.medication_name,
      dosage: med.dosage || '',
      duration: med.duration || '',
      instructions: med.instructions || ''
    })) || [];

    const supplements: WellkittSupplement[] = data.prescription_supplements?.map((supp: any) => ({
      id: supp.supplement_id || supp.id,
      name: supp.supplement_name,
      brand: supp.supplement_brand || '',
      dosage: supp.dosage || '',
      duration: supp.duration || '',
      instructions: supp.instructions || '',
      category: supp.supplement_category || '',
      presentation: ''
    })) || [];

    return {
      id: data.id,
      prescriptionId: data.prescription_id,
      dateTime: data.prescription_date,
      patient: {
        name: data.patients.name,
        age: data.patients.age?.toString() || '',
        dob: data.patients.date_of_birth || '',
        patientId: data.patients.patient_id
      },
      doctor: {
        name: data.doctors.name,
        professionalID: data.doctors.professional_id,
        university: data.doctors.university || '',
        clinicName: data.doctors.clinic_name || '',
        clinicAddress: data.doctors.clinic_address || '',
        contact: data.doctors.contact || '',
        clinicEmail: data.doctors.clinic_email || '',
        logo1Url: data.doctors.logo1_url || '',
        logo2Url: data.doctors.logo2_url || '',
        signatureImageUrl: data.doctors.signature_image_url || ''
      },
      medications,
      supplements,
      generalNotes: data.general_notes || '',
      nextAppointment: data.next_appointment,
      patientDbId: data.patients.id,
      doctorDbId: data.doctors.id,
      soapNote: data.soap_notes ? {
        subjective: data.soap_notes.subjective || {},
        objective: data.soap_notes.objective || {},
        assessment: data.soap_notes.assessment || {},
        plan: data.soap_notes.plan || {}
      } : undefined
    };
  }

  // Save prescription correction
  async savePrescriptionCorrection(data: PrescriptionData, originalPrescriptionId: string): Promise<boolean> {
    try {
      // 1. Get original prescription data
      const { data: originalPrescription, error: originalError } = await supabase
        .from('prescriptions')
        .select('*')
        .eq('id', originalPrescriptionId)
        .single();

      if (originalError) {
        console.error('Error fetching original prescription:', originalError);
        throw originalError;
      }

      // 2. Mark original prescription as corrected
      const { error: updateError } = await supabase
        .from('prescriptions')
        .update({ 
          is_corrected: true,
          corrected_at: new Date().toISOString()
        })
        .eq('id', originalPrescriptionId);

      if (updateError) {
        console.error('Error marking original prescription as corrected:', updateError);
        throw updateError;
      }

      // 3. Save new prescription with reference to original
      const success = await this.savePrescription(data);
      
      if (success) {
        // 4. Update the new prescription to reference the original
        const { error: linkError } = await supabase
          .from('prescriptions')
          .update({ 
            original_prescription_id: originalPrescriptionId,
            correction_reason: 'Corrección de datos médicos'
          })
          .eq('prescription_id', data.prescriptionId);

        if (linkError) {
          console.error('Error linking correction to original:', linkError);
        }
      }

      return success;
    } catch (error) {
      console.error('Error saving prescription correction:', error);
      return false;
    }
  }

  // ===== DELETION OPERATIONS =====
  
  /**
   * Delete patient and all related data (cascade deletion)
   */
  async deletePatient(patientId: string): Promise<boolean> {
    try {
      console.log('Starting deletion of patient:', patientId);
      
      // 1. First, find the patient by patient_id (expediente)
      const { data: patient, error: patientFetchError } = await supabase
        .from('patients')
        .select('id')
        .eq('patient_id', patientId)
        .single();

      if (patientFetchError) {
        console.error('Error fetching patient:', patientFetchError);
        throw patientFetchError;
      }

      if (!patient) {
        console.error('Patient not found');
        throw new Error('Patient not found');
      }

      console.log('Found patient with DB ID:', patient.id);
      
      // 2. Get all prescriptions for this patient using the DB ID
      const { data: prescriptions, error: prescriptionsError } = await supabase
        .from('prescriptions')
        .select('id')
        .eq('patient_id', patient.id);

      if (prescriptionsError) {
        console.error('Error fetching prescriptions:', prescriptionsError);
        throw prescriptionsError;
      }

      console.log('Found prescriptions to delete:', prescriptions?.length || 0);

      // 2. Delete prescription medications for each prescription
      if (prescriptions && prescriptions.length > 0) {
        const prescriptionIds = prescriptions.map(p => p.id);
        
        // Delete prescription medications
        const { error: medicationsError } = await supabase
          .from('prescription_medications')
          .delete()
          .in('prescription_id', prescriptionIds);

        if (medicationsError) {
          console.error('Error deleting medications:', medicationsError);
          throw medicationsError;
        }

        // Delete prescription supplements
        const { error: supplementsError } = await supabase
          .from('prescription_supplements')
          .delete()
          .in('prescription_id', prescriptionIds);

        if (supplementsError) {
          console.error('Error deleting supplements:', supplementsError);
          throw supplementsError;
        }

        // Delete SOAP notes
        const { error: soapError } = await supabase
          .from('soap_notes')
          .delete()
          .in('prescription_id', prescriptionIds);

        if (soapError) {
          console.error('Error deleting SOAP notes:', soapError);
          throw soapError;
        }

        // Delete prescriptions
        const { error: prescriptionsDeleteError } = await supabase
          .from('prescriptions')
          .delete()
          .in('id', prescriptionIds);

        if (prescriptionsDeleteError) {
          console.error('Error deleting prescriptions:', prescriptionsDeleteError);
          throw prescriptionsDeleteError;
        }

        console.log('Deleted prescriptions and related data');
      }

      // 3. Delete the patient using the DB ID
      const { error: patientError } = await supabase
        .from('patients')
        .delete()
        .eq('id', patient.id);

      if (patientError) {
        console.error('Error deleting patient:', patientError);
        throw patientError;
      }

      console.log('Patient deleted successfully');
      return true;
    } catch (error) {
      console.error('Error in deletePatient:', error);
      return false;
    }
  }

  /**
   * Delete single prescription and related data
   */
  async deletePrescription(prescriptionId: string): Promise<boolean> {
    try {
      console.log('Starting deletion of prescription:', prescriptionId);
      
      // 1. First, find the prescription by prescription_id (RX-xxxxx)
      const { data: prescription, error: prescriptionFetchError } = await supabase
        .from('prescriptions')
        .select('id')
        .eq('prescription_id', prescriptionId)
        .single();

      if (prescriptionFetchError) {
        console.error('Error fetching prescription:', prescriptionFetchError);
        throw prescriptionFetchError;
      }

      if (!prescription) {
        console.error('Prescription not found');
        throw new Error('Prescription not found');
      }

      console.log('Found prescription with DB ID:', prescription.id);
      
      // 2. Delete prescription medications using the DB ID
      const { error: medicationsError } = await supabase
        .from('prescription_medications')
        .delete()
        .eq('prescription_id', prescription.id);

      if (medicationsError) {
        console.error('Error deleting medications:', medicationsError);
        throw medicationsError;
      }

      // 3. Delete prescription supplements using the DB ID
      const { error: supplementsError } = await supabase
        .from('prescription_supplements')
        .delete()
        .eq('prescription_id', prescription.id);

      if (supplementsError) {
        console.error('Error deleting supplements:', supplementsError);
        throw supplementsError;
      }

      // 4. Delete SOAP notes using the DB ID
      const { error: soapError } = await supabase
        .from('soap_notes')
        .delete()
        .eq('prescription_id', prescription.id);

      if (soapError) {
        console.error('Error deleting SOAP notes:', soapError);
        throw soapError;
      }

      // 5. Delete the prescription using the DB ID
      const { error: prescriptionError } = await supabase
        .from('prescriptions')
        .delete()
        .eq('id', prescription.id);

      if (prescriptionError) {
        console.error('Error deleting prescription:', prescriptionError);
        throw prescriptionError;
      }

      console.log('Prescription deleted successfully');
      return true;
    } catch (error) {
      console.error('Error in deletePrescription:', error);
      return false;
    }
  }
}

export const supabaseService = new SupabaseService();
