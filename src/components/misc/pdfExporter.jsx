import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import styled from "styled-components";

const StyledButton = styled.button`
	background-color: #1a69f0;
	color: white;
	padding: 8px 16px;
	border-radius: 4px;
	border: none;
	cursor: pointer;
	margin-top: 100px;
	margin-bottom: 40px;
	&:hover {
		background-color: #005eff;
	}
`;

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

	return <StyledButton onClick={exportToPDF}>Export to PDF</StyledButton>;
};

export default PdfExporter;
