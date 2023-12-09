import React, { useRef, useState } from "react";
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
import NotificationModal from "../misc/notificationModal";

import { ToastContainer, toast } from "react-toastify";
import ToastNotifier from "../misc/toastNotifier";

const AddPayment = ({ setAddPaymentOpen, fetchPaymentMethods }) => {
	const [paymentMethod, setPaymentMethod] = useState({
		name: "",
		account_no: "",
	});

	const [notification, setNotification] = useState({
		text: "",
		type: "success",
	});
	const [showToast, setShowToast] = useState(false);
	const addPaymentMethodFunc = async () => {
		const response = await addPaymentMethod(paymentMethod);

		if (!response) return;

		//check if response is successful
		if (response.status == "Success") {
			fetchPaymentMethods();
			// setNotification({ text: response.message, type: "success" });
			toast.success(response.message);
			// setShowToast((prev) => !prev); // toggle the showToast state
			setAddPaymentOpen(false);
		} else {
			console.log(response);
			toast.error(response.errors[0].message);
		}
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
						<InputHolder
							type="text"
							value={paymentMethod.accountNumber}
							onChange={(e) =>
								setPaymentMethod({
									...paymentMethod,
									account_no: e.target.value,
								})
							}
						/>
					</div>
				</FieldContainer>
				<ButtonsContainer>
					<CloseButton onClick={() => setAddPaymentOpen(false)}>Close</CloseButton>
					<Button onClick={() => addPaymentMethodFunc()}>Save</Button>
				</ButtonsContainer>

				{/* <ToastNotifier message={notification.text} type={notification.type} key={showToast} /> */}
			</PopupContent>
		</PopupOverlay>
	);
};

export default AddPayment;
