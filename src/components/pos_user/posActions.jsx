import Cart from "@/components/pos/cart";
import styled from "styled-components";
import { useContext, useState } from "react";
import Receipt from "./receipt";
import { TransactionContext } from "../context/TransactionContext";
import UserPaymentMethods from "./userPaymentMethod";
import PickupDate from "./pickup_date";
import UserCart from "./cart";
// import { TransactionContext } from "@/pages/dashboard/pos";

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

	@media (max-width: 1500px) {
		/* transform: translateX(120%); */
		/* width: 0px; */
		/* margin-left: 130%; */
	}

	@media (max-width: 1000px) {
		/* margin-left: 0px;
		position: absolute;
		right: 0px;
		width: 500px;
		z-index: 104; */
	}
`;

const UserPOSactions = (props) => {
	// const [activeAction, setActiveAction] = useState("cart");
	const { activeAction, setActiveAction } = useContext(TransactionContext);

	return (
		<POSactionsWrapper>
			{activeAction == "cart" && <UserCart setActiveAction={setActiveAction} />}
			{activeAction == "pickup" && <PickupDate setActiveAction={setActiveAction} />}
			{activeAction == "payment" && <UserPaymentMethods setActiveAction={setActiveAction} />}
			{activeAction == "receipt" && <Receipt />}
		</POSactionsWrapper>
	);
};

export default UserPOSactions;
