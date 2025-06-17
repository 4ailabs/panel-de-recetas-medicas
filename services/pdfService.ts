import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePdf = async (elementId: string, fileName: string = 'receta.pdf'): Promise<void> => {
  const input = document.getElementById(elementId);
  if (!input) {
    console.error(`Element with ID '${elementId}' not found.`);
    alert(`Error: No se pudo encontrar el elemento con ID '${elementId}' para generar el PDF.`);
    return;
  }

  try {
    const canvasOptions = {
      scale: 2, 
      useCORS: true, 
      backgroundColor: '#ffffff', 
      logging: false, 
      letterRendering: true,
      allowTaint: true 
    };

    const canvas = await html2canvas(input, canvasOptions);
    const imgData = canvas.toDataURL('image/png', 1.0); 

    const pdfWidth = 210; 
    const pdfHeight = 297; 

    const imgProps = jsPDF.API.getImageProperties(imgData);
    const imgWidth = imgProps.width;
    const imgHeight = imgProps.height;
    
    const aspectRatio = imgWidth / imgHeight;
    
    let finalImgWidth = pdfWidth;
    let finalImgHeight = pdfWidth / aspectRatio;

    if (finalImgHeight > pdfHeight) {
        finalImgHeight = pdfHeight;
        finalImgWidth = pdfHeight * aspectRatio;
    }
    
    const xOffset = (pdfWidth - finalImgWidth) / 2;
    const yOffset = (pdfHeight - finalImgHeight) / 2;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true,
      compress: true, 
    });

    pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalImgWidth, finalImgHeight);
    pdf.save(fileName);

  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("Ocurrió un error al generar el PDF. Por favor, revisa la consola para más detalles.");
  }
};