import jsPDF from "jspdf";
import "jspdf-autotable";

const generatePDF = (transaction) => {
	const doc = new jsPDF();

	// Add title
	doc.setFontSize(18);
	doc.text("Transaction Receipt", 15, 15);

	// Add transaction details
	doc.setFontSize(12);
	doc.text(`Transaction Number: ${transaction.transaction_unique_id}`, 15, 30);
	doc.text(`Total Amount: ${transaction.total_amount}`, 15, 40);
	doc.text(`Bought by: ${transaction.transaction_user_name.first_name} ${transaction.transaction_user_name.last_name}`, 15, 50);
	doc.text(`Payment Method: ${transaction.payment_method.name}`, 15, 60);
	doc.text(`Transaction Status: ${transaction.status}`, 15, 70);

	// Add other details similarly

	// Add table for items
	const tableColumn = ["Product Name", "Quantity", "Price", "Total Price"];
	const tableRows = [];

	transaction.items.forEach((item) => {
		const itemData = [
			item.product.product_name,
			item.quantity,
			item.price,
			item.quantity * item.price,
			// Add other item details if needed
		];
		tableRows.push(itemData);
	});

	tableRows.push(["Total", "", "", transaction.total_amount]);

	doc.autoTable(tableColumn, tableRows, { startY: 80 });

	// Save the PDF
	doc.save(`transaction-receipt-${transaction.transaction_unique_id}.pdf`);
};

export default generatePDF;
