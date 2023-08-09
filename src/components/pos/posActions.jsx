import Cart from "@/components/pos/cart";
import styled from "styled-components";

const POSactionsContainer = styled.div`
	width: 100%;
	margin-top: 24px;
	max-width: 500px;
	position: -webkit-sticky;
	position: sticky;
	top: 0;
`;

const POSactions = ({ cart }) => {
	return (
		<POSactionsContainer>
			<Cart cart={cart} />
		</POSactionsContainer>
	);
};

export default POSactions;
