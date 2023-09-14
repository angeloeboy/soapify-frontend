import {
	Button,
	LabelContainer,
	Label,
	FieldContainer,
	CloseButton,
	ButtonsContainer,
	PopupOverlay,
	PopupContent,
	HeaderTitle,
	FieldTitleLabel,
	InputHolder,
} from "@/styled-components/ItemActionModal";

import { useEffect, useState } from "react";
import { addCategory, addProduct, getProductCategories, getProducts } from "@/api/products";
import { addSupplier } from "@/api/supplier";

const AddSupplierComponent = ({ onClose, onButtonClick, fetchSuppliers }) => {
	const [category, setCategory] = useState({
		name: "",
	});

	const [supplier, setSupplier] = useState({
		supplier_name: "",
		supplier_address: "",
		supplier_phone: "",
		supplier_email: "",
		supplier_status: true,
	});

	let AddSupplier = (e) => {
		e.preventDefault();

		addSupplier(supplier)
			.then((res) => {
				console.log(res);
			})
			.then(() => {
				fetchSuppliers();
			});
	};

	return (
		<PopupOverlay>
			<PopupContent>
				<form onSubmit={(e) => AddSupplier(e)}>
					<FieldContainer>
						<HeaderTitle>Add Suppliers</HeaderTitle>

						<LabelContainer first>
							<Label>General Information</Label>{" "}
						</LabelContainer>
						<div>
							<FieldTitleLabel> Supplier Name </FieldTitleLabel>
							<InputHolder
								type="text"
								placeholder="Enter your Category Name"
								onChange={(e) => {
									setSupplier({ ...supplier, supplier_name: e.target.value });
								}}
								required
								value={supplier.supplier_name}
							/>

							<FieldTitleLabel> Supplier Address </FieldTitleLabel>
							<InputHolder
								type="text"
								placeholder="Enter supplier address "
								onChange={(e) => {
									setSupplier({ ...supplier, supplier_address: e.target.value });
								}}
								value={supplier.supplier_address}
							/>

							<FieldTitleLabel> Supplier Phone No.</FieldTitleLabel>
							<InputHolder
								type="text"
								placeholder="Enter Supplier Phone no. "
								onChange={(e) => {
									setSupplier({ ...supplier, supplier_phone: e.target.value });
								}}
								value={supplier.supplier_phone}
							/>
						</div>
					</FieldContainer>

					<ButtonsContainer>
						<CloseButton onClick={onClose}>Close</CloseButton>
						<Button type="submit">Save</Button>
					</ButtonsContainer>
				</form>
			</PopupContent>
		</PopupOverlay>
	);
};

export default AddSupplierComponent;
