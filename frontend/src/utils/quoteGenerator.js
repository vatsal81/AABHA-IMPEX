import jsPDF from 'jspdf';

export const generateQuotePDF = (data) => {
  const doc = jsPDF();
  
  // Header
  doc.setFillColor(10, 25, 71); // Deep Blue
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('AABHA IMPEX', 20, 25);
  
  doc.setFontSize(10);
  doc.text('Premium Global Export House | Rajkot, India', 20, 32);
  
  // Quote Details
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(18);
  doc.text('OFFICIAL QUOTATION', 20, 55);
  
  doc.setDrawColor(212, 175, 55); // Gold
  doc.setLineWidth(1);
  doc.line(20, 60, 80, 60);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 55);
  doc.text(`Quote ID: #QR-${Math.floor(Math.random() * 90000) + 10000}`, 150, 60);
  
  // Client Info
  doc.setFont('helvetica', 'bold');
  doc.text('Prepared for:', 20, 75);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.name}`, 20, 82);
  doc.text(`${data.email}`, 20, 87);
  doc.text(`${data.phone}`, 20, 92);
  
  // Product Table
  doc.setFillColor(245, 245, 245);
  doc.rect(20, 105, 170, 10, 'F');
  doc.setFont('helvetica', 'bold');
  doc.text('Product Requirement', 25, 112);
  doc.text('Incoterms', 120, 112);
  doc.text('Quantity', 160, 112);
  
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.product || 'General Inquiry'}`, 25, 125);
  doc.text(`${data.incoterms || 'FOB'}`, 120, 125);
  doc.text(`${data.quantity || 'TBD'}`, 160, 125);
  
  // Message
  doc.setFont('helvetica', 'bold');
  doc.text('Client Remarks:', 20, 145);
  doc.setFont('helvetica', 'normal');
  const splitText = doc.splitTextToSize(data.message, 170);
  doc.text(splitText, 20, 152);
  
  // Footer
  doc.setDrawColor(200, 200, 200);
  doc.line(20, 260, 190, 260);
  doc.setFontSize(8);
  doc.text('This is an automated quotation based on initial inquiry. Official proforma invoice will follow.', 20, 267);
  doc.text('Contact: info@aabhaimpex.com | +91 99042 12151', 20, 272);
  
  // Save PDF
  doc.save(`AABHA_Quote_${data.name.replace(/ /g, '_')}.pdf`);
};
