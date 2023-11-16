import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const PdfExporter = ({ tableId, fileName }) => {
  const exportToPDF = () => {
    const input = document.getElementById(tableId);

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(fileName || "table-export.pdf");
    });
  };

  return <button onClick={exportToPDF}>Export to PDF</button>;
};

export default PdfExporter;
