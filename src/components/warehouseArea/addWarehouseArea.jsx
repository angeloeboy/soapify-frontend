import React, { useState } from "react";
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
import { addArea, addWarehouseArea } from "@/api/warehouse"; // Import the API function for adding warehouse areas
import Warehouse from "@/pages/dashboard/warehouse";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddWarehouseArea = ({ setAddPopUpOpen, fetchWarehouseAreas, clickedId }) => {
	const [warehouseArea, setWarehouseArea] = useState({});

	const addWarehouseAreaFunc = async () => {
		const response = await addArea(clickedId, warehouseArea);
		console.log(clickedId);
		console.log(response);
		fetchWarehouseAreas();
		toast.success("warehouse area added successfully");
		setAddPopUpOpen(false);
	};

	return (
		<PopupOverlay>
			<PopupContent>
				<HeaderTitle>Add Warehouse Area</HeaderTitle>
				<FieldContainer>
					<LabelContainer first>
						<Label>General Information</Label>
					</LabelContainer>

					<div>
						<FieldTitleLabel notFirst>Area Name</FieldTitleLabel>
						<InputHolder type="text" value={warehouseArea.area_name} onChange={(e) => setWarehouseArea({ ...warehouseArea, area_name: e.target.value })} />
					</div>

					<div>
						<FieldTitleLabel notFirst>Capacity</FieldTitleLabel>
						<InputHolder
							type="number"
							value={warehouseArea.max_capacity}
							onChange={(e) => setWarehouseArea({ ...warehouseArea, max_capacity: e.target.value })}
						/>
					</div>
				</FieldContainer>

				<ButtonsContainer>
					<CloseButton onClick={() => setAddPopUpOpen(false)}>Close</CloseButton>
					<Button onClick={() => addWarehouseAreaFunc()}>Save</Button>
				</ButtonsContainer>
			</PopupContent>
		</PopupOverlay>
	);
};

export default AddWarehouseArea;
