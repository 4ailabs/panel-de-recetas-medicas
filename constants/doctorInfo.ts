import type { DoctorInfo } from '../types';

/**
 * Datos del doctor hardcodeados.
 * Este panel es de uso exclusivo del Dr. Miguel Ojeda Rios.
 * Los logos y firma se cargan desde localStorage si existen,
 * el resto de datos son fijos.
 */

// Logo ISNN (fijo)
const ISNN_LOGO_URL = 'https://images.squarespace-cdn.com/content/v1/63937c55c3c2e84a13a3ede9/3088fb6e-5467-4d96-83f6-ceb69e52e49b/Square-ISNN-Logo-768x640.jpg?format=750w';

const FIXED_DOCTOR_INFO: Omit<DoctorInfo, 'signatureImageUrl'> = {
  name: 'Dr. Miguel Ojeda Rios',
  professionalID: '4098976',
  university: 'UABJO, ISNN',
  clinicName: 'Centrobioenergetica',
  clinicAddress: 'Acapulco 36 Int 803, Col. Roma, Ciudad de Mexico',
  contact: '5579076626',
  clinicEmail: 'webcentrobio@icloud.com',
  logo1Url: ISNN_LOGO_URL,
  logo2Url: '',
};

/**
 * Carga los datos completos del doctor.
 * Datos fijos + logos/firma de localStorage (si existen).
 */
export const loadDoctorInfo = (): DoctorInfo => {
  let signatureImageUrl = '';

  try {
    const saved = localStorage.getItem('doctorSignature');
    if (saved) {
      signatureImageUrl = saved;
    }
  } catch {
    // Sin firma
  }

  return {
    ...FIXED_DOCTOR_INFO,
    signatureImageUrl,
  };
};

/**
 * Guarda solo los datos visuales (logos y firma) en localStorage.
 */
export const saveDoctorSignature = (signatureImageUrl: string) => {
  try {
    if (signatureImageUrl) {
      localStorage.setItem('doctorSignature', signatureImageUrl);
    } else {
      localStorage.removeItem('doctorSignature');
    }
  } catch {
    // Silencioso
  }
};
