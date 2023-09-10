import { ComponentTitle } from "@/styled-components/pos";
import Button from "../misc/button";
import { getTransaction } from "@/api/transaction";

const Receipt = (props) => {
	const fetchTransaction = async () => {
		const response = await getTransaction(15);
		console.log(response);
	};

	return (
		<>
			<ComponentTitle>Receipt</ComponentTitle>

			<Button width={"100%"} onClick={() => fetchTransaction()}>
				See Receipt
			</Button>
			<Button width={"100%"}>Print Receipt</Button>
		</>
	);
};

export default Receipt;
