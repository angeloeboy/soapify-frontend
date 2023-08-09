import React, { useState, useRef } from "react";
import styled from "styled-components";
import DashboardLayout from "@/components/dashboardLayout";
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

const Popup = ({ onClose, onButtonClick, fileInput }) => {
	const [fileUploaded, setFileUploaded] = useState(false);

	const handleFileUpload = () => {
		setFileUploaded(true);
	};

	const resetFileUpload = () => {
		setFileUploaded(false);
	};

	return (
		<PopupOverlay>
			<PopupContent>
				<HeaderTitle>Add User</HeaderTitle>
				<FieldContainer>
					<LabelContainer first>
						<Label>General Information</Label>{" "}
					</LabelContainer>
					<div>
						<FieldTitleLabel> First Name </FieldTitleLabel>
						<InputHolder type="text" placeholder="Enter your First Name" />
					</div>
					<div>
						<FieldTitleLabel notFirst>Last Name</FieldTitleLabel>
						<InputHolder type="text" placeholder="Enter your Last Name" />
					</div>
					<div>
						<FieldTitleLabel notFirst>Username</FieldTitleLabel>
						<InputHolder type="text" placeholder="Enter your Username" />
					</div>
					<div>
						<FieldTitleLabel notFirst>Image (optional)</FieldTitleLabel>
						<ProfilePictureContainer>
							<Centered>
								<SecondaryButton onClick={onButtonClick}>
									{fileUploaded ? "You've uploaded a file" : "Click to Upload or Drag and drop an Image"}
								</SecondaryButton>
								<FileInput ref={fileInput} onChange={handleFileUpload} />
							</Centered>
						</ProfilePictureContainer>
					</div>
					<LabelContainer>
						<Label>Password</Label>
					</LabelContainer>
					<div>
						<FieldTitleLabel notFirst>Password</FieldTitleLabel>
						<InputHolder type="password" placeholder="Enter your Password" />
					</div>
					<div>
						<FieldTitleLabel notFirst>Confirm Password</FieldTitleLabel>
						<InputHolder type="password" placeholder="" />
					</div>
					<LabelContainer>
						<Label>Account Type</Label>
					</LabelContainer>
					<div>
						<FieldTitleLabel notFirst>Account Type</FieldTitleLabel>
						<Select>
							<Option value="Store Clerk">Store Clerk</Option>
							<Option value="Store Owner">Store Owner</Option>
							<Option value="Cashier">Cashier</Option>
						</Select>
					</div>
				</FieldContainer>

				<ButtonsContainer>
					<CloseButton onClick={onClose}>Close</CloseButton>
					<Button onClick={() => router.push("/dashboard")}>Save</Button>
				</ButtonsContainer>
			</PopupContent>
		</PopupOverlay>
	);
};

const Test = () => {
	const [isPopupOpen, setPopupOpen] = useState(false);
	const fileInput = useRef(null);

	const handleOpenPopup = () => {
		setPopupOpen(true);
	};

	const handleClosePopup = () => {
		setPopupOpen(false);
	};

	const onButtonClick = () => {
		fileInput.current.click();
	};

	return (
		<DashboardLayout>
			<StyledPanel>
				<Button onClick={handleOpenPopup}>Create User</Button>
				{isPopupOpen && <Popup onClose={handleClosePopup} onButtonClick={onButtonClick} fileInput={fileInput} />}
			</StyledPanel>
		</DashboardLayout>
	);
};

export default Test;
