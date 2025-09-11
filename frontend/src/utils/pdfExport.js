// frontend/src/utils/pdfExport.js
import html2pdf from 'html2pdf.js';

export const exportToPDF = (elementId, filename = 'resume.pdf') => {
  const element = document.getElementById(elementId);
  const opt = {
    margin: 10,
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save();
};