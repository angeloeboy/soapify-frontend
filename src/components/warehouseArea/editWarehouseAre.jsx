import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import StyledPanel from "@/styled-components/StyledPanel";
// import { editWarehouseArea } from "@/api/warehouse"; // Import the API function for editing warehouse areas
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

const EditWarehouseArea = ({ warehouseAreaData, onClose, onSave }) => {
	const [editedWarehouseArea, setEditedWarehouseArea] = useState({ ...warehouseAreaData });

	const handleEditWarehouseArea = async () => {
		// Call the API function to edit the warehouse area with the updated data in editedWarehouseArea
		// await editWarehouseArea(editedWarehouseArea);

		// Close the edit pop-up
		onClose();

		// Notify the parent component that the data has been updated
		onSave(editedWarehouseArea);
	};

	return (
		<PopupOverlay>
			<PopupContent>
				<StyledPanel>
					<HeaderTitle>Edit Warehouse Area</HeaderTitle>
					<FieldContainer>
						<LabelContainer first>
							<Label>General Information</Label>
						</LabelContainer>

						<div>
							<FieldTitleLabel notFirst>Area Name</FieldTitleLabel>
							<InputHolder
								type="text"
								value={editedWarehouseArea.name}
								onChange={(e) => setEditedWarehouseArea({ ...editedWarehouseArea, name: e.target.value })}
							/>
						</div>
						<div>
							<FieldTitleLabel notFirst>Description</FieldTitleLabel>
							<InputHolder
								type="text"
								value={editedWarehouseArea.description}
								onChange={(e) => setEditedWarehouseArea({ ...editedWarehouseArea, description: e.target.value })}
							/>
						</div>
						<div>
							<FieldTitleLabel notFirst>Area Type</FieldTitleLabel>
							<InputHolder
								type="text"
								value={editedWarehouseArea.areaType}
								onChange={(e) => setEditedWarehouseArea({ ...editedWarehouseArea, areaType: e.target.value })}
							/>
						</div>
						<div>
							<FieldTitleLabel notFirst>Capacity</FieldTitleLabel>
							<InputHolder
								type="text"
								value={editedWarehouseArea.capacity}
								onChange={(e) => setEditedWarehouseArea({ ...editedWarehouseArea, capacity: e.target.value })}
							/>
						</div>
						<div>
							<FieldTitleLabel notFirst>Location</FieldTitleLabel>
							<InputHolder
								type="text"
								value={editedWarehouseArea.location}
								onChange={(e) => setEditedWarehouseArea({ ...editedWarehouseArea, location: e.target.value })}
							/>
						</div>
					</FieldContainer>

					<ButtonsContainer>
						<CloseButton onClick={onClose}>Close</CloseButton>
						<Button onClick={handleEditWarehouseArea}>Save</Button>
					</ButtonsContainer>
				</StyledPanel>
			</PopupContent>
		</PopupOverlay>
	);
};

export default EditWarehouseArea;
