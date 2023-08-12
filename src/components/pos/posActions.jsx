import Cart from "@/components/pos/cart";
import styled from "styled-components";
import PaymentMethods from "./paymentMethods";

const POSactionsWrapper = styled.div`
	/* width: 100%; */
	max-width: 500px;
	width: 100%;
	/* padding-top: 48px; */
	background-color: #f9f9f9;
	border: 1px solid #e7e7e7;
	border-radius: 16px;
	padding: 48px 5%;
	height: calc(100vh - 94px);
`;

const POSactions = (props) => {
	return (
		<POSactionsWrapper>
			<Cart cart={props.cart} minusToCart={props.minusToCart} addToCart={props.addToCart} />

			<PaymentMethods />
		</POSactionsWrapper>
	);
};

export default POSactions;
