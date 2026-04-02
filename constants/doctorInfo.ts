import type { DoctorInfo } from '../types';

/**
 * Datos del doctor hardcodeados.
 * Este panel es de uso exclusivo del Dr. Miguel Ojeda Rios.
 * Los logos y firma se cargan desde localStorage si existen,
 * el resto de datos son fijos.
 */

const FIXED_DOCTOR_INFO: Omit<DoctorInfo, 'logo1Url' | 'logo2Url' | 'signatureImageUrl'> = {
  name: 'Dr. Miguel Ojeda Rios',
  professionalID: '4098976',
  university: 'Benemerita Universidad Autonoma de Puebla',
  clinicName: 'Centrobioenergetica',
  clinicAddress: 'Puebla, Mexico',
  contact: '2224536789',
  clinicEmail: 'miguel@centrobioenergetica.com',
};

/**
 * Carga los datos completos del doctor.
 * Datos fijos + logos/firma de localStorage (si existen).
 */
export const loadDoctorInfo = (): DoctorInfo => {
  let logo1Url = '';
  let logo2Url = '';
  let signatureImageUrl = '';

  try {
    const saved = localStorage.getItem('doctorInfo');
    if (saved) {
      const parsed = JSON.parse(saved);
      logo1Url = parsed.logo1Url || '';
      logo2Url = parsed.logo2Url || '';
      signatureImageUrl = parsed.signatureImageUrl || '';
    }
  } catch {
    // Si falla localStorage, continúa sin logos
  }

  return {
    ...FIXED_DOCTOR_INFO,
    logo1Url,
    logo2Url,
    signatureImageUrl,
  };
};

/**
 * Guarda solo los datos visuales (logos y firma) en localStorage.
 */
export const saveDoctorImages = (doctorInfo: DoctorInfo) => {
  try {
    localStorage.setItem('doctorInfo', JSON.stringify({
      logo1Url: doctorInfo.logo1Url,
      logo2Url: doctorInfo.logo2Url,
      signatureImageUrl: doctorInfo.signatureImageUrl,
    }));
  } catch {
    // Silencioso
  }
};
