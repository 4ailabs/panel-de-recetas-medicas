-- Supabase Schema for Medical Prescription System
-- Execute these commands in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  professional_id TEXT NOT NULL UNIQUE,
  university TEXT,
  clinic_name TEXT,
  clinic_address TEXT,
  contact TEXT,
  clinic_email TEXT,
  logo1_url TEXT,
  logo2_url TEXT,
  signature_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create patients table
CREATE TABLE IF NOT EXISTS patients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id TEXT NOT NULL UNIQUE, -- Expediente generado (ej: 150124-JP-01)
  name TEXT NOT NULL,
  age INTEGER,
  date_of_birth DATE,
  phone TEXT,
  email TEXT,
  doctor_id UUID REFERENCES doctors(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create prescriptions table
CREATE TABLE IF NOT EXISTS prescriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  prescription_id TEXT NOT NULL UNIQUE, -- RX-xxxxx
  patient_id UUID REFERENCES patients(id),
  doctor_id UUID REFERENCES doctors(id),
  prescription_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  next_appointment TEXT,
  general_notes TEXT,
  -- Correction tracking fields
  is_corrected BOOLEAN DEFAULT FALSE,
  corrected_at TIMESTAMP WITH TIME ZONE,
  original_prescription_id UUID REFERENCES prescriptions(id),
  correction_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create prescription_medications table
CREATE TABLE IF NOT EXISTS prescription_medications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  prescription_id UUID REFERENCES prescriptions(id) ON DELETE CASCADE,
  medication_name TEXT NOT NULL,
  dosage TEXT,
  duration TEXT,
  instructions TEXT,
  item_number INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create prescription_supplements table
CREATE TABLE IF NOT EXISTS prescription_supplements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  prescription_id UUID REFERENCES prescriptions(id) ON DELETE CASCADE,
  supplement_id TEXT, -- Referencia a wellkittProducts
  supplement_name TEXT NOT NULL,
  supplement_brand TEXT,
  supplement_category TEXT,
  dosage TEXT,
  duration TEXT,
  instructions TEXT,
  item_number INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create soap_notes table
CREATE TABLE IF NOT EXISTS soap_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  prescription_id UUID REFERENCES prescriptions(id) ON DELETE CASCADE,
  subjective JSONB, -- {chief_complaint, current_medications}
  objective JSONB,  -- {vital_signs, key_findings}
  assessment JSONB, -- {diagnosis}
  plan JSONB,       -- {treatment}
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_patients_patient_id ON patients(patient_id);
CREATE INDEX IF NOT EXISTS idx_patients_name ON patients(name);
CREATE INDEX IF NOT EXISTS idx_patients_doctor_id ON patients(doctor_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_prescription_id ON prescriptions(prescription_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_patient_id ON prescriptions(patient_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_doctor_id ON prescriptions(doctor_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_date ON prescriptions(prescription_date);
CREATE INDEX IF NOT EXISTS idx_medications_prescription_id ON prescription_medications(prescription_id);
CREATE INDEX IF NOT EXISTS idx_supplements_prescription_id ON prescription_supplements(prescription_id);
CREATE INDEX IF NOT EXISTS idx_supplements_supplement_id ON prescription_supplements(supplement_id);
CREATE INDEX IF NOT EXISTS idx_soap_prescription_id ON soap_notes(prescription_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_doctors_updated_at BEFORE UPDATE ON doctors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_prescriptions_updated_at BEFORE UPDATE ON prescriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_soap_notes_updated_at BEFORE UPDATE ON soap_notes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS) for better security
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescription_medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE prescription_supplements ENABLE ROW LEVEL SECURITY;
ALTER TABLE soap_notes ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your authentication needs)
-- For now, allow all operations - you can restrict these later
CREATE POLICY "Enable all operations for doctors" ON doctors FOR ALL USING (true);
CREATE POLICY "Enable all operations for patients" ON patients FOR ALL USING (true);
CREATE POLICY "Enable all operations for prescriptions" ON prescriptions FOR ALL USING (true);
CREATE POLICY "Enable all operations for prescription_medications" ON prescription_medications FOR ALL USING (true);
CREATE POLICY "Enable all operations for prescription_supplements" ON prescription_supplements FOR ALL USING (true);
CREATE POLICY "Enable all operations for soap_notes" ON soap_notes FOR ALL USING (true);

-- Insert a sample doctor (optional - for testing)
INSERT INTO doctors (name, professional_id, university, clinic_name, clinic_address, contact, clinic_email)
VALUES (
  'Dr. Juan Pérez',
  'C12345678',
  'Universidad Nacional',
  'Clínica San Miguel',
  'Calle Principal 123',
  '+52 55 1234 5678',
  'contacto@clinicasanmiguel.com'
) ON CONFLICT (professional_id) DO NOTHING;
