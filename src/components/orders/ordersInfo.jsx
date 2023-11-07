import React, { useEffect, useState } from "react";
import {
	Button,
	FieldContainer,
	FieldTitleLabel,
	InputHolder,
	Label,
	LabelContainer,
	PopupContent,
	PopupOverlay,
	HeaderTitle,
	ButtonsContainer,
} from "@/styled-components/ItemActionModal";
import { CloseButton } from "../styled-components/PopUp";
import { setTransactionStatus } from "@/api/transaction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrdersInfo = ({ setIsOrdersInfoOpen, selectedTransaction, fetchTransactions }) => {
	useEffect(() => {
		console.log(selectedTransaction.items);
	}, []);

	const markAsDone = async () => {
		const res = await setTransactionStatus(selectedTransaction.transaction_id, "DONE");
		console.log(res);

		if (res.status === "Success") {
			toast.success("Transaction status updated");
			setIsOrdersInfoOpen(false);
			console.log("Success");
			fetchTransactions();
			return;
		}

		toast.error(res.message);
	};

	return (
		<PopupOverlay>
			<PopupContent>
				<HeaderTitle>Edit Order {selectedTransaction.transaction_id} </HeaderTitle>
				<FieldContainer>
					{selectedTransaction.createdAt}
					{selectedTransaction.items.map((item) => (
						<div key={item.id}>
							<p>Name: {item.product.product_name}</p>
							<p>Price: {item.product.product_price}</p>
							<p>Quantity: {item.quantity}</p>
						</div>
					))}
				</FieldContainer>

				<p>Status: {selectedTransaction.status}</p>
				<button onClick={() => markAsDone()}>Mark as done</button>
				<ButtonsContainer>
					<CloseButton onClick={() => setIsOrdersInfoOpen(false)}>Close </CloseButton>
					<Button onClick={() => addPaymentMethodFunc()}>Save</Button>
				</ButtonsContainer>
			</PopupContent>
		</PopupOverlay>
	);
};

export default OrdersInfo;
