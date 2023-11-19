import { ComponentTitle } from "@/styled-components/pos";
import Button from "../misc/button";
import { getTransaction } from "@/api/transaction";
import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
const Receipt = (props) => {
	const fetchTransaction = async () => {
		const response = await getTransaction(15);
		console.log(response);
	};

	const { orderFromBackend } = useContext(TransactionContext);

	const printOrderFromBackend = () => {
		console.log(orderFromBackend);
	};

	const downloadPdf = () => {
		const input = document.getElementById("receipt-content");
		html2canvas(input).then((canvas) => {
			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF();
			pdf.addImage(imgData, "PNG", 0, 0);
			pdf.save("receipt.pdf");
		});
	};

	return (
		<>
			<ComponentTitle>Receipt</ComponentTitle>
			<Button width={"100%"} onClick={fetchTransaction}>
				See Receipt
			</Button>
			<Button width={"100%"} onClick={downloadPdf}>
				Print Receipt
			</Button>

			{orderFromBackend ? (
				<div id="receipt-content" className="receipt">
					{/* Render your transaction details here */}
					<h2>Transaction Details</h2>
					{/* Example: */}
					<p>Transaction ID: {orderFromBackend.transaction.transaction_unique_id}</p>
					{/* Add more details as required */}
				</div>
			) : null}
		</>
	);
};

export default Receipt;
