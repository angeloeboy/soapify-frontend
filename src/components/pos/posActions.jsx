import Cart from "@/components/pos/cart";
import styled from "styled-components";

const POSactionsContainer = styled.div`
	width: 100%;
	margin-top: 24px;
	max-width: 500px;
	/* background-color: #f8f8f8; */
	height: 100%;
`;

const POSactions = (props) => {
	return (
		<POSactionsContainer>
			<Cart cart={props.cart} minusToCart={props.minusToCart} addToCart={props.addToCart} />
		</POSactionsContainer>
	);
};

export default POSactions;
