import jsPDF from 'jspdf';
import { PrescriptionData } from '../types';
import QRCode from 'qrcode';

// PDF Configuration
const PAGE_WIDTH = 210; // A4 width in mm
const PAGE_HEIGHT = 297; // A4 height in mm
const MARGIN = 15;
const CONTENT_WIDTH = PAGE_WIDTH - (MARGIN * 2);
const FOOTER_HEIGHT = 45; // Reserved space for footer
const USABLE_HEIGHT = PAGE_HEIGHT - MARGIN - FOOTER_HEIGHT;

// Helper function to load image as base64
const loadImageAsBase64 = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error loading image:', error);
    return null;
  }
};

// Generate QR code as base64
const generateQRCode = async (data: PrescriptionData): Promise<string | null> => {
  try {
    const qrData = {
      prescriptionId: data.prescriptionId,
      doctorName: data.doctor.name,
      doctorId: data.doctor.professionalID,
      patientName: data.patient.name,
      dateTime: data.dateTime,
      verificationUrl: `https://energyintelligence.work/receta-verificada?folio=${data.prescriptionId}&doctor=${encodeURIComponent(data.doctor.name)}&cedula=${data.doctor.professionalID}`
    };

    return await QRCode.toDataURL(JSON.stringify(qrData), {
      width: 200,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
  } catch (error) {
    console.error('Error generating QR code:', error);
    return null;
  }
};

// Helper to add text with word wrap
const addWrappedText = (
  pdf: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number = 5
): number => {
  const lines = pdf.splitTextToSize(text, maxWidth);
  pdf.text(lines, x, y);
  return y + (lines.length * lineHeight);
};

// Format date for display
const formatDateTime = (dateTimeStr: string): string => {
  try {
    const date = new Date(dateTimeStr);
    return date.toLocaleString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return dateTimeStr;
  }
};

// Format date of birth
const formatDOB = (dobStr: string): string => {
  if (!dobStr) return 'N/D';
  try {
    const [year, month, day] = dobStr.split('-');
    if (year && month && day) {
      return `${day}/${month}/${year}`;
    }
    return dobStr;
  } catch {
    return dobStr;
  }
};

// Helper to get image dimensions
const getImageDimensions = (base64: string): Promise<{width: number, height: number}> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = reject;
    img.src = base64;
  });
};

// Draw header with logos and doctor info
const drawHeader = async (
  pdf: jsPDF,
  data: PrescriptionData,
  qrCodeUrl: string | null
): Promise<number> => {
  let yPos = MARGIN;

  // Load and draw logos
  if (data.doctor.logo1Url || data.doctor.logo2Url) {
    const maxLogoHeight = 15; // Max height in mm
    const logoY = yPos;

    if (data.doctor.logo1Url) {
      const logo1 = await loadImageAsBase64(data.doctor.logo1Url);
      if (logo1) {
        try {
          const dimensions = await getImageDimensions(logo1);
          const aspectRatio = dimensions.width / dimensions.height;
          const logoHeight = maxLogoHeight;
          const logoWidth = logoHeight * aspectRatio;
          pdf.addImage(logo1, 'PNG', MARGIN, logoY, logoWidth, logoHeight);
        } catch (error) {
          console.error('Error adding logo1:', error);
        }
      }
    }

    if (data.doctor.logo2Url) {
      const logo2 = await loadImageAsBase64(data.doctor.logo2Url);
      if (logo2) {
        try {
          const dimensions = await getImageDimensions(logo2);
          const aspectRatio = dimensions.width / dimensions.height;
          const logoHeight = maxLogoHeight;
          const logoWidth = logoHeight * aspectRatio;
          pdf.addImage(logo2, 'PNG', PAGE_WIDTH - MARGIN - logoWidth, logoY, logoWidth, logoHeight);
        } catch (error) {
          console.error('Error adding logo2:', error);
        }
      }
    }

    yPos += maxLogoHeight + 5;

    // Horizontal line after logos
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.5);
    pdf.line(MARGIN, yPos, PAGE_WIDTH - MARGIN, yPos);
    yPos += 5;
  }

  // Doctor name and credentials
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(12);
  pdf.setTextColor(30, 64, 175); // Primary color
  pdf.text(`Dr. ${data.doctor.name || 'Nombre del Médico'}`, MARGIN, yPos);
  yPos += 6;

  // Doctor credentials in one line
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.setTextColor(100, 116, 139); // Secondary color

  const credentials = [];
  if (data.doctor.professionalID) credentials.push(`C.P. ${data.doctor.professionalID}`);
  if (data.doctor.university) credentials.push(data.doctor.university);
  if (data.prescriptionId) credentials.push(`Folio: ${data.prescriptionId}`);

  if (credentials.length > 0) {
    pdf.text(credentials.join('  •  '), MARGIN, yPos);
    yPos += 5;
  }

  // Date and QR code on the right
  const dateText = formatDateTime(data.dateTime);
  pdf.setFontSize(8);
  pdf.setTextColor(100, 116, 139);
  const dateWidth = pdf.getTextWidth(dateText);
  pdf.text(dateText, PAGE_WIDTH - MARGIN - dateWidth, MARGIN + 5);

  // Add QR code
  if (qrCodeUrl) {
    const qrSize = 20;
    const qrX = PAGE_WIDTH - MARGIN - qrSize;
    const qrY = MARGIN + 8;
    try {
      pdf.addImage(qrCodeUrl, 'PNG', qrX, qrY, qrSize, qrSize);

      // "Verificación" text under QR
      pdf.setFontSize(6);
      pdf.setTextColor(120, 120, 120);
      const verText = 'Verificación';
      const verWidth = pdf.getTextWidth(verText);
      pdf.text(verText, qrX + (qrSize - verWidth) / 2, qrY + qrSize + 3);
    } catch (error) {
      console.error('Error adding QR code:', error);
    }
  }

  yPos += 3;
  return yPos;
};

// Draw patient information box
const drawPatientInfo = (pdf: jsPDF, data: PrescriptionData, yPos: number): number => {
  // Title
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(50, 50, 50);
  pdf.text('DATOS DEL PACIENTE', MARGIN, yPos);
  yPos += 6;

  // Thin line under title
  pdf.setDrawColor(200, 200, 200);
  pdf.setLineWidth(0.5);
  pdf.line(MARGIN, yPos, PAGE_WIDTH - MARGIN, yPos);
  yPos += 5;

  // Patient data in two columns
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.setTextColor(60, 60, 60);

  const leftColumn = [];
  const rightColumn = [];

  if (data.patient.name) {
    leftColumn.push({ label: 'Nombre:', value: data.patient.name });
  }
  if (data.patient.age) {
    leftColumn.push({ label: 'Edad:', value: `${data.patient.age} años` });
  }
  if (data.patient.patientId) {
    rightColumn.push({ label: 'Expediente:', value: data.patient.patientId });
  }
  if (data.patient.dob) {
    rightColumn.push({ label: 'F. Nacimiento:', value: formatDOB(data.patient.dob) });
  }

  const maxRows = Math.max(leftColumn.length, rightColumn.length);
  const midPoint = PAGE_WIDTH / 2;

  for (let i = 0; i < maxRows; i++) {
    if (leftColumn[i]) {
      pdf.setFont('helvetica', 'bold');
      pdf.text(leftColumn[i].label, MARGIN, yPos);
      pdf.setFont('helvetica', 'normal');
      pdf.text(leftColumn[i].value, MARGIN + 20, yPos);
    }

    if (rightColumn[i]) {
      pdf.setFont('helvetica', 'bold');
      pdf.text(rightColumn[i].label, midPoint, yPos);
      pdf.setFont('helvetica', 'normal');
      pdf.text(rightColumn[i].value, midPoint + 28, yPos);
    }

    yPos += 5;
  }

  return yPos + 3;
};

// Draw Rx symbol and title
const drawRxTitle = (pdf: jsPDF, yPos: number): number => {
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(12);
  pdf.setTextColor(50, 50, 50);
  pdf.text('PRESCRIPCIÓN MÉDICA', MARGIN, yPos);
  yPos += 6;

  // Thin line
  pdf.setDrawColor(200, 200, 200);
  pdf.setLineWidth(0.5);
  pdf.line(MARGIN, yPos, PAGE_WIDTH - MARGIN, yPos);

  return yPos + 5;
};

// Helper to estimate medication box height before drawing
const estimateMedicationHeight = (pdf: jsPDF, medication: any): number => {
  let height = 5; // Name line

  if (medication.dosage) height += 4.5;
  if (medication.duration) height += 4.5;
  if (medication.instructions) {
    const lines = pdf.splitTextToSize(medication.instructions, CONTENT_WIDTH - 12);
    height += 4.5 + (lines.length * 4);
  }

  height += 6; // Separator line and padding
  return height;
};

// Draw medication box
const drawMedication = (
  pdf: jsPDF,
  medication: any,
  index: number,
  yPos: number
): number => {
  // Medication number and name
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(40, 40, 40);
  const nameText = `${index}. ${medication.name || 'Medicamento sin nombre'}`;
  pdf.text(nameText, MARGIN, yPos);
  yPos += 5;

  // Details with indent
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.setTextColor(70, 70, 70);
  const indent = MARGIN + 6;

  if (medication.dosage) {
    pdf.text(`• Dosis: ${medication.dosage}`, indent, yPos);
    yPos += 4.5;
  }

  if (medication.duration) {
    pdf.text(`• Duración: ${medication.duration}`, indent, yPos);
    yPos += 4.5;
  }

  if (medication.instructions) {
    pdf.text('• Instrucciones:', indent, yPos);
    yPos += 4.5;
    const lines = pdf.splitTextToSize(medication.instructions, CONTENT_WIDTH - 12);
    lines.forEach((line: string) => {
      pdf.text(line, indent + 4, yPos);
      yPos += 4;
    });
  }

  // Light separator line
  yPos += 2;
  pdf.setDrawColor(220, 220, 220);
  pdf.setLineWidth(0.3);
  pdf.line(MARGIN, yPos, PAGE_WIDTH - MARGIN, yPos);
  yPos += 4;

  return yPos;
};

// Draw medications and supplements with improved pagination
const drawMedicationsAndSupplements = (
  pdf: jsPDF,
  medications: any[],
  supplements: any[],
  yPos: number
): number => {
  // Combine medications and supplements
  const allItems = [
    ...medications.map((med, idx) => ({ ...med, index: idx + 1 })),
    ...supplements.map((supp, idx) => ({ ...supp, index: medications.length + idx + 1 }))
  ];

  if (allItems.length === 0) return yPos;

  allItems.forEach((item) => {
    // Pre-calculate height needed for this item
    const estimatedHeight = estimateMedicationHeight(pdf, item);

    // Check if we need a new page (with buffer for footer)
    if (yPos + estimatedHeight > PAGE_HEIGHT - FOOTER_HEIGHT - 10) {
      pdf.addPage();
      yPos = MARGIN;
      // Redraw Rx title on new page
      yPos = drawRxTitle(pdf, yPos);
    }

    yPos = drawMedication(pdf, item, item.index, yPos);
  });

  return yPos;
};

// Draw general notes and next appointment
const drawNotesAndAppointment = (
  pdf: jsPDF,
  data: PrescriptionData,
  yPos: number
): number => {
  if (!data.generalNotes && !data.nextAppointment) return yPos;

  yPos += 2;

  // General notes
  if (data.generalNotes) {
    if (yPos > USABLE_HEIGHT - 20) {
      pdf.addPage();
      yPos = MARGIN;
    }

    // Box background
    pdf.setFillColor(249, 250, 251);
    const notesStartY = yPos;

    yPos += 4;

    // Title
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.setTextColor(55, 65, 81);
    pdf.text('Indicaciones Generales:', MARGIN + 3, yPos);
    yPos += 5;

    // Content
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.setTextColor(75, 85, 99);
    yPos = addWrappedText(pdf, data.generalNotes, MARGIN + 3, yPos, CONTENT_WIDTH - 6, 4);

    const notesHeight = yPos - notesStartY + 2;
    pdf.setDrawColor(229, 231, 235);
    pdf.setLineWidth(0.3);
    pdf.rect(MARGIN, notesStartY, CONTENT_WIDTH, notesHeight, 'FD');

    yPos += 3;
  }

  // Next appointment
  if (data.nextAppointment) {
    if (yPos > USABLE_HEIGHT - 15) {
      pdf.addPage();
      yPos = MARGIN;
    }

    const appointmentHeight = 12;

    // Blue background
    pdf.setFillColor(239, 246, 255);
    pdf.rect(MARGIN, yPos, CONTENT_WIDTH, appointmentHeight, 'F');

    // Blue border
    pdf.setDrawColor(147, 197, 253);
    pdf.setLineWidth(0.3);
    pdf.rect(MARGIN, yPos, CONTENT_WIDTH, appointmentHeight, 'S');

    yPos += 4;

    // Title
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.setTextColor(30, 64, 175);
    pdf.text('Próxima Cita:', MARGIN + 3, yPos);
    yPos += 5;

    // Content
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(37, 99, 235);
    pdf.text(data.nextAppointment, MARGIN + 3, yPos);

    yPos += 6;
  }

  return yPos;
};

// Draw footer with clinic info and signature
const drawFooter = async (pdf: jsPDF, data: PrescriptionData, pageCount: number): Promise<void> => {
  const footerY = PAGE_HEIGHT - FOOTER_HEIGHT + 5;

  // Draw separator line
  pdf.setDrawColor(156, 163, 175);
  pdf.setLineWidth(0.5);
  pdf.line(MARGIN, footerY, PAGE_WIDTH - MARGIN, footerY);

  let yPos = footerY + 5;

  // Clinic information (left side)
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9);
  pdf.setTextColor(55, 65, 81);
  pdf.text(data.doctor.clinicName || 'Nombre de la Clínica', MARGIN, yPos);
  yPos += 5;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  pdf.setTextColor(107, 114, 128);

  if (data.doctor.clinicAddress) {
    yPos = addWrappedText(pdf, data.doctor.clinicAddress, MARGIN, yPos, 90, 4);
  }

  if (data.doctor.contact) {
    pdf.text(`Tel: ${data.doctor.contact}`, MARGIN, yPos);
    yPos += 4;
  }

  if (data.doctor.clinicEmail) {
    pdf.text(`Email: ${data.doctor.clinicEmail}`, MARGIN, yPos);
  }

  // Signature section (right side)
  const signatureX = PAGE_WIDTH - MARGIN - 70;
  let signatureY = footerY + 5;

  // Add signature image if available
  if (data.doctor.signatureImageUrl) {
    const signature = await loadImageAsBase64(data.doctor.signatureImageUrl);
    if (signature) {
      try {
        const sigWidth = 40;
        const sigHeight = 15;
        const sigX = signatureX + 15;
        pdf.addImage(signature, 'PNG', sigX, signatureY, sigWidth, sigHeight);
        signatureY += sigHeight + 2;
      } catch (error) {
        console.error('Error adding signature:', error);
        signatureY += 17; // Reserve space anyway
      }
    }
  } else {
    signatureY += 17; // Reserve space for manual signature
  }

  // Signature line
  pdf.setDrawColor(55, 65, 81);
  pdf.setLineWidth(0.5);
  pdf.line(signatureX, signatureY, signatureX + 70, signatureY);
  signatureY += 4;

  // Doctor details under signature
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8);
  pdf.setTextColor(31, 41, 55);
  const doctorName = `Dr. ${data.doctor.name || 'Nombre del Médico'}`;
  const nameWidth = pdf.getTextWidth(doctorName);
  pdf.text(doctorName, signatureX + (70 - nameWidth) / 2, signatureY);
  signatureY += 4;

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7);
  pdf.setTextColor(107, 114, 128);

  if (data.doctor.professionalID) {
    const cpText = `C.P. ${data.doctor.professionalID}`;
    const cpWidth = pdf.getTextWidth(cpText);
    pdf.text(cpText, signatureX + (70 - cpWidth) / 2, signatureY);
    signatureY += 3;
  }

  if (data.doctor.university) {
    const uniWidth = pdf.getTextWidth(data.doctor.university);
    pdf.text(data.doctor.university, signatureX + (70 - uniWidth) / 2, signatureY);
  }

  // Page numbers on all pages
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7);
    pdf.setTextColor(156, 163, 175);
    const pageText = `Página ${i} de ${pageCount}`;
    const pageWidth = pdf.getTextWidth(pageText);
    pdf.text(pageText, (PAGE_WIDTH - pageWidth) / 2, PAGE_HEIGHT - 5);
  }
};

// Main export function
export const generateNativePdf = async (
  data: PrescriptionData,
  fileName: string = 'receta.pdf'
): Promise<void> => {
  try {
    // Create PDF document
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    // Set document metadata
    pdf.setProperties({
      title: `Receta Médica - ${data.patient.name || 'Paciente'}`,
      subject: 'Receta Médica',
      author: `Dr. ${data.doctor.name || 'Médico'}`,
      keywords: 'receta, medicina, prescripción',
      creator: 'Panel de Recetas Médicas',
    });

    // Generate QR code
    const qrCodeUrl = await generateQRCode(data);

    // Draw header
    let yPos = await drawHeader(pdf, data, qrCodeUrl);

    // Draw patient info
    yPos = drawPatientInfo(pdf, data, yPos);

    // Draw Rx title
    yPos = drawRxTitle(pdf, yPos);

    // Draw medications and supplements
    yPos = drawMedicationsAndSupplements(
      pdf,
      data.medications || [],
      data.supplements || [],
      yPos
    );

    // Draw notes and appointment
    yPos = drawNotesAndAppointment(pdf, data, yPos);

    // Draw footer on all pages
    const pageCount = pdf.getNumberOfPages();
    await drawFooter(pdf, data, pageCount);

    // Save the PDF
    pdf.save(fileName);

  } catch (error) {
    console.error('Error generating native PDF:', error);
    throw error;
  }
};
