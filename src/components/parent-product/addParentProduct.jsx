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

import { toast } from "react-toastify";
import { addParentProduct } from "@/api/parent_product";

const AddParentProduct = ({ setAddParentProductOpen, fetchParentProducts }) => {
	const [parentProduct, setParentProduc] = useState({
		name: "",
	});

	const addParentProductFunc = async () => {
		const response = await addParentProduct(parentProduct);

		if (!response) return;
		console.log(response);
		//check if response is successful
		if (response.status == "Success") {
			fetchParentProducts();
			toast.success(response.message);
			setAddParentProductOpen(false);
		} else {
			toast.warning(response.message);
		}
	};

	return (
		<PopupOverlay>
			<PopupContent>
				<HeaderTitle>Add Parent Product</HeaderTitle>
				<FieldContainer>
					<LabelContainer first>
						<Label>Parent Product Information</Label>
					</LabelContainer>
					<div>
						<FieldTitleLabel> Name</FieldTitleLabel>
						<InputHolder type="text" value={parentProduct.name} onChange={(e) => setParentProduc({ ...parentProduct, name: e.target.value })} />
					</div>
				</FieldContainer>
				<ButtonsContainer>
					<CloseButton onClick={() => setAddParentProductOpen(false)}>Close</CloseButton>
					<Button onClick={() => addParentProductFunc()}>Save</Button>
				</ButtonsContainer>

				{/* <ToastNotifier message={notification.text} type={notification.type} key={showToast} /> */}
			</PopupContent>
		</PopupOverlay>
	);
};

export default AddParentProduct;
