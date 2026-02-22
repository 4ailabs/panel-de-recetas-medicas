import { createClient } from '@supabase/supabase-js'

// IMPORTANT: Replace with your actual Supabase credentials
// You should ideally store these as environment variables in production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for TypeScript
export interface Database {
  public: {
    Tables: {
      doctors: {
        Row: {
          id: string
          name: string
          professional_id: string
          university: string | null
          clinic_name: string | null
          clinic_address: string | null
          contact: string | null
          clinic_email: string | null
          logo1_url: string | null
          logo2_url: string | null
          signature_image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          professional_id: string
          university?: string | null
          clinic_name?: string | null
          clinic_address?: string | null
          contact?: string | null
          clinic_email?: string | null
          logo1_url?: string | null
          logo2_url?: string | null
          signature_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          professional_id?: string
          university?: string | null
          clinic_name?: string | null
          clinic_address?: string | null
          contact?: string | null
          clinic_email?: string | null
          logo1_url?: string | null
          logo2_url?: string | null
          signature_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      patients: {
        Row: {
          id: string
          patient_id: string
          name: string
          age: number | null
          date_of_birth: string | null
          phone: string | null
          email: string | null
          doctor_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          name: string
          age?: number | null
          date_of_birth?: string | null
          phone?: string | null
          email?: string | null
          doctor_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          name?: string
          age?: number | null
          date_of_birth?: string | null
          phone?: string | null
          email?: string | null
          doctor_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      prescriptions: {
        Row: {
          id: string
          prescription_id: string
          patient_id: string | null
          doctor_id: string | null
          prescription_date: string
          next_appointment: string | null
          general_notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          prescription_id: string
          patient_id?: string | null
          doctor_id?: string | null
          prescription_date?: string
          next_appointment?: string | null
          general_notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          prescription_id?: string
          patient_id?: string | null
          doctor_id?: string | null
          prescription_date?: string
          next_appointment?: string | null
          general_notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      prescription_medications: {
        Row: {
          id: string
          prescription_id: string | null
          medication_name: string
          dosage: string | null
          duration: string | null
          instructions: string | null
          item_number: number
          created_at: string
        }
        Insert: {
          id?: string
          prescription_id?: string | null
          medication_name: string
          dosage?: string | null
          duration?: string | null
          instructions?: string | null
          item_number: number
          created_at?: string
        }
        Update: {
          id?: string
          prescription_id?: string | null
          medication_name?: string
          dosage?: string | null
          duration?: string | null
          instructions?: string | null
          item_number?: number
          created_at?: string
        }
      }
      prescription_supplements: {
        Row: {
          id: string
          prescription_id: string | null
          supplement_id: string | null
          supplement_name: string
          supplement_brand: string | null
          supplement_category: string | null
          dosage: string | null
          duration: string | null
          instructions: string | null
          item_number: number
          created_at: string
        }
        Insert: {
          id?: string
          prescription_id?: string | null
          supplement_id?: string | null
          supplement_name: string
          supplement_brand?: string | null
          supplement_category?: string | null
          dosage?: string | null
          duration?: string | null
          instructions?: string | null
          item_number: number
          created_at?: string
        }
        Update: {
          id?: string
          prescription_id?: string | null
          supplement_id?: string | null
          supplement_name?: string
          supplement_brand?: string | null
          supplement_category?: string | null
          dosage?: string | null
          duration?: string | null
          instructions?: string | null
          item_number?: number
          created_at?: string
        }
      }
      soap_notes: {
        Row: {
          id: string
          prescription_id: string | null
          subjective: any | null
          objective: any | null
          assessment: any | null
          plan: any | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          prescription_id?: string | null
          subjective?: any | null
          objective?: any | null
          assessment?: any | null
          plan?: any | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          prescription_id?: string | null
          subjective?: any | null
          objective?: any | null
          assessment?: any | null
          plan?: any | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
