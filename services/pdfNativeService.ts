import jsPDF from 'jspdf';
import { PrescriptionData } from '../types';

// PDF Configuration
const PAGE_WIDTH = 210; // A4 width in mm
const PAGE_HEIGHT = 297; // A4 height in mm
const MARGIN = 15;
const CONTENT_WIDTH = PAGE_WIDTH - (MARGIN * 2);
const FOOTER_HEIGHT = 45; // Reserved space for footer
const USABLE_HEIGHT = PAGE_HEIGHT - MARGIN - FOOTER_HEIGHT;

// Helper function to load image as base64
const loadImageAsBase64 = async (url: string, timeout: number = 5000): Promise<string | null> => {
  if (!url) return null;

  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(id);

    if (!response.ok) throw new Error(`Fetch failed with status ${response.status}`);

    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('FileReader error'));
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error(`Error loading image from ${url}:`, error);
    return null;
  }
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
const getImageDimensions = (base64: string): Promise<{ width: number, height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = reject;
    img.src = base64;
  });
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

// Main export function
export const generateNativePdf = async (
  data: PrescriptionData,
  fileName: string = 'receta.pdf'
): Promise<void> => {
  try {
    // 1. PRE-LOAD ALL ASSETS (Cache)
    const [logo1, logo2, signature] = await Promise.all([
      loadImageAsBase64(data.doctor.logo1Url),
      loadImageAsBase64(data.doctor.logo2Url),
      data.doctor.signatureImageUrl ? loadImageAsBase64(data.doctor.signatureImageUrl) : Promise.resolve(null)
    ]);

    const assets = { logo1, logo2, signature };

    // Create PDF document
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    // Helper to add new page with header
    const addNewPageWithHeader = async (p: jsPDF) => {
      p.addPage();
      return await drawHeaderInternal(p, data, assets);
    };

    // Internal header drawing using cached assets
    const drawHeaderInternal = async (p: jsPDF, d: PrescriptionData, a: any): Promise<number> => {
      let yPos = MARGIN;

      // Draw logos
      if (a.logo1 || a.logo2) {
        const maxLogoHeight = 15;
        const logoY = yPos;

        if (a.logo1) {
          try {
            const dims = await getImageDimensions(a.logo1);
            const ratio = dims.width / dims.height;
            p.addImage(a.logo1, 'PNG', MARGIN, logoY, maxLogoHeight * ratio, maxLogoHeight);
          } catch (e) { console.error('Error logo1:', e); }
        }

        if (a.logo2) {
          try {
            const dims = await getImageDimensions(a.logo2);
            const ratio = dims.width / dims.height;
            const w = maxLogoHeight * ratio;
            p.addImage(a.logo2, 'PNG', PAGE_WIDTH - MARGIN - w, logoY, w, maxLogoHeight);
          } catch (e) { console.error('Error logo2:', e); }
        }

        yPos += maxLogoHeight + 5;
        p.setDrawColor(200, 200, 200);
        p.setLineWidth(0.5);
        p.line(MARGIN, yPos, PAGE_WIDTH - MARGIN, yPos);
        yPos += 5;
      }

      // Doctor Info
      p.setFont('helvetica', 'bold');
      p.setFontSize(12);
      p.setTextColor(30, 64, 175);
      const docName = d.doctor.name || 'Nombre del Médico';
      p.text(docName.startsWith('Dr.') || docName.startsWith('Dra.') ? docName : `Dr. ${docName}`, MARGIN, yPos);
      yPos += 6;

      p.setFont('helvetica', 'normal');
      p.setFontSize(9);
      p.setTextColor(100, 116, 139);

      const creds = [];
      if (d.doctor.professionalID) creds.push(`C.P. ${d.doctor.professionalID}`);
      if (d.doctor.university) creds.push(d.doctor.university);
      if (d.prescriptionId) creds.push(`Folio: ${d.prescriptionId}`);
      if (creds.length > 0) {
        p.text(creds.join('  •  '), MARGIN, yPos);
        yPos += 5;
      }

      // Date and QR
      const dateT = formatDateTime(d.dateTime);
      p.setFontSize(8);
      p.setTextColor(100, 116, 139);
      p.text(dateT, PAGE_WIDTH - MARGIN - p.getTextWidth(dateT), MARGIN + 5);


      return yPos + 3;
    };

    // Set document metadata
    pdf.setProperties({
      title: `Receta Médica - ${data.patient.name || 'Paciente'}`,
      subject: 'Receta Médica',
      author: (data.doctor.name?.startsWith('Dr.') || data.doctor.name?.startsWith('Dra.')) ? data.doctor.name : `Dr. ${data.doctor.name || 'Médico'}`,
      creator: 'Panel de Recetas Médicas',
    });

    // Start Drawing
    let yPos = await drawHeaderInternal(pdf, data, assets);
    yPos = drawPatientInfo(pdf, data, yPos);
    yPos = drawRxTitle(pdf, yPos);

    // Draw Items with intelligent pagination
    const allItems = [
      ...(data.medications || []).map((m, i) => ({ ...m, type: 'med', index: i + 1 })),
      ...(data.supplements || []).map((s, i) => ({ ...s, type: 'supp', index: (data.medications?.length || 0) + i + 1 }))
    ];

    for (const item of allItems) {
      const h = estimateMedicationHeight(pdf, item);
      if (yPos + h > USABLE_HEIGHT) {
        yPos = await addNewPageWithHeader(pdf);
        yPos = drawRxTitle(pdf, yPos);
      }
      yPos = drawMedication(pdf, item, item.index, yPos);
    }

    // Draw General Notes - FIX: Draw Box FIRST, then text
    if (data.generalNotes) {
      const lines = pdf.splitTextToSize(data.generalNotes, CONTENT_WIDTH - 6);
      const h = (lines.length * 4) + 12;

      if (yPos + h > USABLE_HEIGHT) {
        yPos = await addNewPageWithHeader(pdf);
      }

      yPos += 2;
      const notesStartY = yPos;

      // 1. Draw Background Box FIRST
      pdf.setFillColor(249, 250, 251); // Light Gray
      pdf.setDrawColor(229, 231, 235);
      pdf.setLineWidth(0.3);
      pdf.rect(MARGIN, notesStartY, CONTENT_WIDTH, h, 'FD');

      // 2. Draw Text SECOND
      yPos += 4;
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9);
      pdf.setTextColor(55, 65, 81);
      pdf.text('Indicaciones Generales:', MARGIN + 3, yPos);

      yPos += 5;
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.setTextColor(75, 85, 99);
      pdf.text(lines, MARGIN + 3, yPos);

      yPos = notesStartY + h + 3;
    }

    // Next Appointment
    if (data.nextAppointment) {
      if (yPos + 15 > USABLE_HEIGHT) {
        yPos = await addNewPageWithHeader(pdf);
      }

      const appH = 12;
      pdf.setFillColor(239, 246, 255);
      pdf.setDrawColor(147, 197, 253);
      pdf.setLineWidth(0.3);
      pdf.rect(MARGIN, yPos, CONTENT_WIDTH, appH, 'FD');

      yPos += 4;
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9);
      pdf.setTextColor(30, 64, 175);
      pdf.text('Próxima Cita:', MARGIN + 3, yPos);

      yPos += 5;
      pdf.setFontSize(8);
      pdf.setTextColor(37, 99, 235);
      pdf.text(data.nextAppointment, MARGIN + 3, yPos);

      yPos += 6;
    }

    // Footer on all pages
    const pageCount = pdf.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);

      const fY = PAGE_HEIGHT - FOOTER_HEIGHT + 5;
      pdf.setDrawColor(156, 163, 175);
      pdf.setLineWidth(0.5);
      pdf.line(MARGIN, fY, PAGE_WIDTH - MARGIN, fY);

      let fyPos = fY + 5;
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9);
      pdf.setTextColor(55, 65, 81);
      pdf.text(data.doctor.clinicName || 'Clínica', MARGIN, fyPos);

      fyPos += 5;
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8);
      pdf.setTextColor(107, 114, 128);
      if (data.doctor.clinicAddress) {
        const alines = pdf.splitTextToSize(data.doctor.clinicAddress, 90);
        pdf.text(alines, MARGIN, fyPos);
        fyPos += (alines.length * 4);
      }
      if (data.doctor.contact) {
        pdf.text(`Tel: ${data.doctor.contact}`, MARGIN, fyPos);
        fyPos += 4;
      }

      // Signature (on all pages or just last? usually last, but let's follow original)
      const sigX = PAGE_WIDTH - MARGIN - 70;
      let sigY = fY + 5;
      if (assets.signature) {
        try { pdf.addImage(assets.signature, 'PNG', sigX + 15, sigY, 40, 15); } catch (e) { }
      }
      sigY += 17;
      pdf.setDrawColor(55, 65, 81);
      pdf.setLineWidth(0.5);
      pdf.line(sigX, sigY, sigX + 70, sigY);

      sigY += 4;
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8);
      pdf.setTextColor(31, 41, 55);
      const dname = data.doctor.name?.startsWith('Dr.') || data.doctor.name?.startsWith('Dra.') ? data.doctor.name : `Dr. ${data.doctor.name}`;
      pdf.text(dname, sigX + (70 - pdf.getTextWidth(dname)) / 2, sigY);

      // Page number
      pdf.setFontSize(7);
      pdf.setTextColor(156, 163, 175);
      const ptxt = `Página ${i} de ${pageCount}`;
      pdf.text(ptxt, (PAGE_WIDTH - pdf.getTextWidth(ptxt)) / 2, PAGE_HEIGHT - 5);
    }

    pdf.save(fileName);

  } catch (error) {
    console.error('Error in PDF generation:', error);
    throw error;
  }
};
