import React, { useState, useRef } from "react";
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
import { addWarehouse } from "@/api/warehouse";

const AddWarehouse = ({ setAddPopUpOpen, fetchWarehouses }) => {
	const [warehouse, setWarehouse] = useState({
		warehouse_name: "",
		warehouse_location: "",
	});

	const addWarehouseFunc = async () => {
		const response = await addWarehouse(warehouse);
		console.log(response);
		fetchWarehouses();
	};
	return (
		<PopupOverlay>
			<PopupContent>
				<HeaderTitle>Add Warehouse</HeaderTitle>
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
					<CloseButton onClick={() => setAddPopUpOpen(false)}>Close</CloseButton>
					<Button onClick={() => addWarehouseFunc()}>Save</Button>
				</ButtonsContainer>
			</PopupContent>
		</PopupOverlay>
	);
};

export default AddWarehouse;
