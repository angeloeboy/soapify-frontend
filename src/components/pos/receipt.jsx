import { ComponentTitle } from "@/styled-components/pos";
import Button from "../misc/button";

const Receipt = (props) => {
	return (
		<>
			<ComponentTitle>Receipt</ComponentTitle>

			<Button width={"100%"}>See Receipt</Button>
			<Button width={"100%"}>Print Receipt</Button>
		</>
	);
};

export default Receipt;
