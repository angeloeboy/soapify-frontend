import React, { useState, useRef } from "react";
import styled from "styled-components";
import DashboardLayout from "@/components/dashboardLayout";
import PageTitle from "@/components/pageTitle";
import StyledPanel, { BigTitle, FieldTitle, InfoContainer, Input, InputContainer } from "@/components/styled-components/StyledPanel";
import { useRouter } from "next/router";
import {
	Button,
	ButtonsContainer,
	Centered,
	CloseButton,
	FieldContainer,
	FileInput,
	Label,
	LabelContainer,
	Option,
	PopupContent,
	PopupOverlay,
	ProfilePictureContainer,
	SecondaryButton,
	Select,
} from "@/components/styled-components/PopUp";

const Popup = ({ onClose, onButtonClick, fileInput }) => {
	return (
		<PopupOverlay>
			<PopupContent>
				<BigTitle> Add User </BigTitle>
				<FieldContainer>
					<LabelContainer>
						<Label>General Information</Label>{" "}
					</LabelContainer>
					<FieldTitle> First Name </FieldTitle>
					<Input type="text" placeholder="Enter your First Name" />

					<FieldTitle>Last Name</FieldTitle>
					<Input type="text" placeholder="Enter your Last Name" />

					<FieldTitle>Username</FieldTitle>
					<Input type="text" placeholder="Enter your Username" />
					<FieldTitle>Image (optional)</FieldTitle>
					<ProfilePictureContainer>
						<Centered>
							<SecondaryButton onClick={onButtonClick}>Click to Upload or Drag and drop an Image</SecondaryButton>
							<FileInput ref={fileInput} />
						</Centered>
					</ProfilePictureContainer>

					<LabelContainer>
						<Label>Password</Label>{" "}
					</LabelContainer>
					<FieldTitle>Password</FieldTitle>
					<Input type="password" placeholder="Enter your Password" />
					<FieldTitle>Confirm Password</FieldTitle>
					<Input type="password" placeholder="" />

					<LabelContainer>
						<Label>Account Type</Label>{" "}
					</LabelContainer>
					<FieldTitle>Account Type</FieldTitle>
					<Select>
						<Option value="Store Clerk">Store Clerk</Option>
						<Option value="Store Owner">Store Owner</Option>
						<Option value="Cashier">Cashier</Option>
					</Select>
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
