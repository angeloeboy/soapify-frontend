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

const OrdersInfo = ({ setIsOrdersInfoOpen, selectedTransaction }) => {
	useEffect(() => {
		console.log(selectedTransaction.items);
	}, []);
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
				<ButtonsContainer>
					<CloseButton onClick={() => setIsOrdersInfoOpen(false)}>Close </CloseButton>
					<Button onClick={() => addPaymentMethodFunc()}>Save</Button>
				</ButtonsContainer>
			</PopupContent>
		</PopupOverlay>
	);
};

export default OrdersInfo;
