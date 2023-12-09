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

import { toast } from "react-toastify";
import { addParentProduct, editParentProduct } from "@/api/parent_product";

const EditParentProduct = ({ setEditParentProductOpen, fetchParentProducts, selectedParentProduct }) => {
	const [parentProduct, setParentProduc] = useState({
		name: "",
	});

	useEffect(() => {
		setParentProduc(selectedParentProduct);
		console.log("Parent Product", selectedParentProduct);
	}, [selectedParentProduct]);

	const editParentProductFunc = async () => {
		const response = await editParentProduct(parentProduct, selectedParentProduct.parent_product_id);

		if (!response) return;
		console.log(response);
		//check if response is successful
		if (response.status == "Success") {
			fetchParentProducts();
			toast.success(response.message);
			setEditParentProductOpen(false);
		} else {
			toast.warning(response.message);
		}
	};

	return (
		<PopupOverlay>
			<PopupContent>
				<HeaderTitle>Edit Parent Product</HeaderTitle>
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
					<CloseButton
						onClick={() => {
							window.history.replaceState(null, null, window.location.pathname);
							setEditParentProductOpen(false);
						}}
					>
						Close
					</CloseButton>
					<Button onClick={() => editParentProductFunc()}>Save</Button>
				</ButtonsContainer>
			</PopupContent>
		</PopupOverlay>
	);
};

export default EditParentProduct;
