import React, { useEffect, useRef, useState } from "react";
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
import NotificationModal from "./../misc/notificationModal";

import { ToastContainer, toast } from "react-toastify";
import ToastNotifier from "../misc/toastNotifier";
import { getTransaction } from "@/api/transaction";

const EditOrder = ({ setIsEditPopUpOpen, selectedTransactionId, transaction }) => {
	const [paymentMethod, setPaymentMethod] = useState({
		name: "",
		account_no: "",
	});

	const [notification, setNotification] = useState({
		text: "",
		type: "success",
	});

	const [showToast, setShowToast] = useState(false);

	// useEffect(() => {
	// 	fetchTransaction();
	// }, []);

	const fetchTransaction = async () => {
		const res = await getTransaction(selectedTransactionId);
		console.log(res.transaction);
	};
	return (
		<PopupOverlay>
			<PopupContent>
				<HeaderTitle>Edit Order {transaction.transaction_id} </HeaderTitle>
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
					<CloseButton onClick={() => setIsEditPopUpOpen(false)}>Close </CloseButton>
					<Button onClick={() => addPaymentMethodFunc()}>Save</Button>
				</ButtonsContainer>

				{/* <ToastNotifier message={notification.text} type={notification.type} key={showToast} /> */}
			</PopupContent>
		</PopupOverlay>
	);
};

export default EditOrder;
