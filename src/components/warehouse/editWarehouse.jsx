import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import DashboardLayout from "@/components/misc/dashboardLayout";
import ItemActionModal, {
	Button,
	Select,
	LabelContainer,
	Label,
	Option,
	FieldContainer,
	ProfilePictureContainer,
	FileInput,
	Centered,
	SecondaryButton,
	CloseButton,
	ButtonsContainer,
	PopupOverlay,
	PopupContent,
	HeaderTitle,
	FieldTitleLabel,
	InputHolder,
} from "@/styled-components/ItemActionModal";
import StyledPanel from "@/styled-components/StyledPanel";
import { addWarehouse, editWarehouse, getWarehouse } from "@/api/warehouse";
import { toast } from "react-toastify";

const EditWarehouse = ({ setEditPopUpOpen, fetchWarehouses, clickedId }) => {
	const [warehouse, setWarehouse] = useState({
		warehouse_name: "",
		warehouse_location: "",
	});

	const addWarehouseFunc = async () => {
		const response = await addWarehouse(warehouse);
		console.log(response);
		fetchWarehouses();
	};

	const fetchWarehouseInfo = async () => {
		const res = await getWarehouse(clickedId);
		res ? setWarehouse(res.warehouse) : setWarehouse({});
		console.log(res.warehouse);
	};

	const editWarehouseFunc = async () => {
		const res = await editWarehouse(clickedId, warehouse);
		res ? setWarehouse(res.warehouse) : setWarehouse({});
		console.log(res.warehouse);
		if (res.warehouse) {
			fetchWarehouses();
			setEditPopUpOpen(false);
			toast.success("Warehouse edited successfully!");
		}
	};

	useEffect(() => {
		fetchWarehouseInfo();
	}, []);
	return (
		<PopupOverlay>
			<PopupContent>
				<HeaderTitle>Edit Warehouse </HeaderTitle>
				<FieldContainer>
					<LabelContainer first>
						<Label>General Information</Label>
					</LabelContainer>

					<div>
						<FieldTitleLabel notFirst>Warehouse Name</FieldTitleLabel>
						<InputHolder type="text" value={warehouse.warehouse_name} onChange={(e) => setWarehouse({ ...warehouse, warehouse_name: e.target.value })} />
					</div>
					<div>
						<FieldTitleLabel notFirst>Address</FieldTitleLabel>
						<InputHolder
							type="text"
							value={warehouse.warehouse_location}
							onChange={(e) => setWarehouse({ ...warehouse, warehouse_location: e.target.value })}
						/>
					</div>
				</FieldContainer>

				<ButtonsContainer>
					<CloseButton onClick={() => setEditPopUpOpen(false)}>Close</CloseButton>
					<Button onClick={() => editWarehouseFunc()}>Save</Button>
				</ButtonsContainer>
			</PopupContent>
		</PopupOverlay>
	);
};

export default EditWarehouse;
