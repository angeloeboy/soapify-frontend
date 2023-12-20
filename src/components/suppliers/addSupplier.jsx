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
import { addSupplier, getSuppliers } from "@/api/supplier";
import { toast } from "react-toastify";

const AddSupplier = ({ onClose, onButtonClick, fetchSuppliers, suppliers }) => {
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

	let AddSupplier = async (e) => {
		e.preventDefault();

		if (!supplier.supplier_name) {
			toast.error("Supplier name is required");
			return;
		}

		if (!supplier.supplier_address) {
			toast.error("Supplier address is required");
			return;
		}

		if (!supplier.supplier_phone) {
			toast.error("Supplier phone is required");
			return;
		}

		if (suppliers) {
			const supplierExists = suppliers.find((s) => s.supplier_name == supplier.supplier_name);
			if (supplierExists) {
				toast.error("Supplier already exists");
				return;
			}
		}

		const res = await addSupplier(supplier);
		if (!res) {
			toast.error("Something went wrong");
			return;
		}

		if (res.status == "Success") {
			toast.success("Supplier added successfully");
			fetchSuppliers();
			onClose();
		}
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
							<FieldTitleLabel>Name </FieldTitleLabel>
							<InputHolder
								type="text"
								onChange={(e) => {
									setSupplier({ ...supplier, supplier_name: e.target.value });
								}}
								required
								value={supplier.supplier_name}
							/>

							<FieldTitleLabel> Address </FieldTitleLabel>
							<InputHolder
								type="text"
								onChange={(e) => {
									setSupplier({
										...supplier,
										supplier_address: e.target.value,
									});
								}}
								value={supplier.supplier_address}
							/>

							<FieldTitleLabel> Phone No.</FieldTitleLabel>
							<InputHolder
								type="text"
								onChange={(e) => {
									const value = e.target.value;
									///remove anything that is not a digit and limit it to 12 digits
									const sanitizedValue = value.replace(/\D/g, "").slice(0, 12);
									setSupplier({ ...supplier, supplier_phone: sanitizedValue });
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

export default AddSupplier;
