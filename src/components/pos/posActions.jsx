import Cart from "@/components/pos/cart";
import styled from "styled-components";
import PaymentMethods from "./paymentMethods";
import { useState } from "react";
import Receipt from "./receipt";

const POSactionsWrapper = styled.div`
	/* width: 100%; */
	max-width: 500px;
	width: 100%;
	/* padding-top: 48px; */
	background-color: #f9f9f9;
	border: 1px solid #e7e7e7;
	border-radius: 16px;
	padding: 48px 5%;
	height: calc(100vh - 68px);
	overflow-y: auto;
`;

const POSactions = (props) => {
	const [activeAction, setActiveAction] = useState("cart");

	return (
		<POSactionsWrapper>
			{activeAction == "cart" && <Cart minusToCart={props.minusToCart} addToCart={props.addToCart} setActiveAction={setActiveAction} />}
			{activeAction == "payment" && <PaymentMethods setActiveAction={setActiveAction} />}
			{activeAction == "receipt" && <Receipt />}
		</POSactionsWrapper>
	);
};

export default POSactions;
