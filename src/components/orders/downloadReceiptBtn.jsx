import { PDFDownloadLink } from "@react-pdf/renderer";
import TransactionReceipt from "./orderReceipt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReceipt } from "@fortawesome/free-solid-svg-icons";

const DownloadReceiptButton = ({ transaction }) => (
	<PDFDownloadLink document={<TransactionReceipt transaction={transaction} />} fileName={`transaction-receipt-${transaction.transaction_unique_id}.pdf`}>
		{({ blob, url, loading, error }) =>
			loading ? (
				"Loading document..."
			) : (
				<p>
					<FontAwesomeIcon icon={faReceipt} /> Receipt
				</p>
			)
		}
	</PDFDownloadLink>
);

export default DownloadReceiptButton;
