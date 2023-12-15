import React, { useRef, useState } from "react";
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
import NotificationModal from "../misc/notificationModal";

import { ToastContainer, toast } from "react-toastify";
import ToastNotifier from "../misc/toastNotifier";
import { addAnnouncement } from "@/api/announcements";

const TextArea = styled.textarea`
	width: calc(100% - 48px);
	max-width: calc(100% - 48px);
	/* min-width: 100%; */
	min-width: calc(100% - 48px);
	height: 100px;
	border: 1px solid #ddd;
	border-radius: 5px;
	padding: 10px;
	margin-left: 24px;
`;

const AddAnnouncement = ({ setAddAnnouncementOpen, fetchAnnouncements }) => {
	const [announcement, setAnnouncement] = useState({
		announcement_title: "",
		announcement_content: "",
	});

	const addAnnouncemetFunc = async () => {
		const response = await addAnnouncement(announcement);

		if (!response) return;

		//check if response is successful
		if (response.status == "Success") {
			fetchAnnouncements();
			// setNotification({ text: response.message, type: "success" });
			toast.success(response.message);
			// setShowToast((prev) => !prev); // toggle the showToast state
			setAddAnnouncementOpen(false);
		} else {
			console.log(response);
			toast.error(response.errors[0].message);
		}
	};

	return (
		<PopupOverlay>
			<PopupContent>
				<HeaderTitle>Add Announcements</HeaderTitle>
				<FieldContainer>
					<LabelContainer first>
						<Label>Announcement</Label>
					</LabelContainer>
					<div>
						<FieldTitleLabel>Announcement Title</FieldTitleLabel>
						<TextArea
							type="text"
							value={announcement.announcement_title}
							onChange={(e) => setAnnouncement({ ...announcement, announcement_title: e.target.value })}
						/>

						<FieldTitleLabel>Content</FieldTitleLabel>
						<TextArea
							type="text"
							value={announcement.announcement_content}
							onChange={(e) => setAnnouncement({ ...announcement, announcement_content: e.target.value })}
						/>
					</div>
				</FieldContainer>
				<ButtonsContainer>
					<CloseButton onClick={() => setAddAnnouncementOpen(false)}>Close</CloseButton>
					<Button onClick={() => addAnnouncemetFunc()}>Save</Button>
				</ButtonsContainer>

				{/* <ToastNotifier message={notification.text} type={notification.type} key={showToast} /> */}
			</PopupContent>
		</PopupOverlay>
	);
};

export default AddAnnouncement;
