import React, { useState } from "react";
import styled from "styled-components";
import {
	Button,
	FieldContainer,
	FieldTitleLabel,
	InputHolder,
	Label,
	LabelContainer,
	PopupContent,
	PopupOverlay,
	SecondaryButton,
} from "@/styled-components/ItemActionModal";
import { HeaderTitle } from "@/styled-components/ItemActionModal";
import { ButtonsContainer } from "@/styled-components/ItemActionModal";
import { CloseButton } from "../styled-components/PopUp";
import { addPaymentMethod } from "@/api/payment_method";

const AddPaymentMethod = ({ setAddPaymentOpen }) => {
	const [paymentMethod, setPaymentMethod] = useState({
		name: "",
		account_no: "",
	});

	const addPaymentMethodFunc = async () => {
		const response = await addPaymentMethod(paymentMethod);
		console.log(response);
		fetchPaymentMethods();
	};

	return (
		<PopupOverlay>
			<PopupContent>
				<HeaderTitle>Add Payment Method</HeaderTitle>
				<FieldContainer>
					<LabelContainer first>
						<Label>Payment Information</Label>
					</LabelContainer>
					<div>
						<FieldTitleLabel>Payment Name</FieldTitleLabel>
						<InputHolder type="text" value={paymentMethod.name} onChange={(e) => setPaymentMethod({ ...paymentMethod, name: e.target.value })} />
					</div>
					<div>
						<FieldTitleLabel notFirst>Number/Account Number</FieldTitleLabel>
						<InputHolder type="text" value={paymentMethod.accountNumber} onChange={(e) => setPaymentMethod({ ...paymentMethod, account_no: e.target.value })} />
					</div>
				</FieldContainer>
				<ButtonsContainer>
					<CloseButton onClick={() => setAddPaymentOpen(false)}>Close</CloseButton>
					<Button onClick={() => addPaymentMethodFunc(paymentMethod)}>Save</Button>
				</ButtonsContainer>
			</PopupContent>
		</PopupOverlay>
	);
};

export default AddPaymentMethod;
