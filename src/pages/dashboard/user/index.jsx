import React, { useState, useRef } from "react";
import styled from "styled-components";
import DashboardLayout from "@/components/dashboardLayout";
import PageTitle from "@/components/pageTitle";
import StyledPanel, { BigTitle, FieldTitle, InfoContainer, Input, InputContainer } from "@/components/styled-components/StyledPanel";
import { useRouter } from "next/router";

const Button = styled.button`
	color: #fff;
	font-family: Arial;
	background-color: #1a69f0;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	border-radius: 8px 12px 12px 12px;
	padding: 10px 20px;
	border: none;
	width: 133px;
	margin: 5px;
	font-size: 16px;
	cursor: pointer;
	width: 50; /* Set width to 100% */
`;

const Select = styled.select`
	color: #1a69f0;
	width: 700.824px;
	height: 41px;
	padding: 10px;
	margin-top: 10px;
	margin-bottom: 10px;
	margin-left: 23.92px;
	border: 1px solid #ccc;
	border-radius: 11px;
	font-size: 16px;
	font-family: DM Sans;
	font-size: 14px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;
const LabelContainer = styled.div`
	background-color: #f3f3f3;
	border: 1px solid #dfdfdf;
	padding: 15px;
	margin-top: 29px;
	flex-shrink: 0;
	width: 100%; /* Extend to full width */
	margin-bottom: 8.52px;
`;

const Label = styled.div`
	color: #002056;
	font-size: 16px;
	font-style: normal;
	font-family: DM Sans;
	font-weight: 500;
	line-height: normal;
	display: block;
`;

const Option = styled.option`
	font-family: DM Sans;
	font-size: 14px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	margin-left: 23.92px;
`;

const FieldContainer = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
`;

const ProfilePictureContainer = styled.div`
	width: 780.824px;
	flex-shrink: 0;
	padding: 10px;
	margin-top: -15px;
`;

const FileInput = styled.input.attrs({ type: "file" })`
	height: 300px;
	align-items: center;
	justify-content: center;
	padding: 10px;
	border-radius: 10px;
	background-color: #f9f9f9;
	text-align: center;
	max-width: 300px;
	padding: 20px;
	display: none;
	width: 100%;
`;

const Centered = styled.div`
	margin-top: 10px;
	display: flex;
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 10px;
	background-color: #f9f9f9;
	text-align: center;
	justify-content: center;
	align-items: center;
	margin-left: 10px;
	height: 300px;
	width: 100%;
`;

const SecondaryButton = styled.button`
	color: white;
	background-color: #002056;
	border-radius: 6px;
	padding: 10px 20px;
	border: none;
	margin: 5px;
	font-size: 16px;
	cursor: pointer;
	width: 50%; /* Set width to 100% */
`;

const CloseButton = styled.button`
	width: 115px;
	color: #1a69f0;
	background-color: white;
	border: 1px solid rgba(26, 105, 240, 1);
	border-radius: 8px;
	height: 40px;
	padding: 10px 20px;
	margin: 5px;
	font-size: 16px;
	font-style: normal;
	font-weight: 700;
	font-family: Arial, Helvetica, sans-serif;
	line-height: normal;
	cursor: pointer;
`;
const ButtonsContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: 222px;
	box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

const PopupOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black overlay */
	display: flex;
	justify-content: center;
	align-items: center;
`;

const PopupContent = styled.div`
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	overflow-y: auto;
	overflow-x: hidden; /* Hide horizontal overflow */
	width: 828.924px;
	max-height: 90vh; /* Set the maximum height to 90% of the viewport height */
	display: block;
	flex-shrink: 0;
	margin: 0 auto;
	padding: 0 auto;
`;
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
