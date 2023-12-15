import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DashboardLayout from "@/components/misc/dashboardLayout";
import PageTitle from "@/components/misc/pageTitle";
import { addAnnouncement, deleteAnnouncement, getAllAnnouncements } from "@/api/announcements";
import AddAnnouncement from "@/components/announcements/addAnnouncements";
import Button from "@/components/misc/button";
import DeleteModal from "@/components/misc/delete";
import EditAnnouncement from "@/components/announcements/editAnnouncements";

const AnnouncementContainer = styled.div`
	padding: 55px 0px;
	box-sizing: border-box;
`;

const AnnouncementCard = styled.div`
	background-color: #fff;
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	padding: 20px;
	margin-bottom: 20px;
	transition: transform 0.2s ease-in-out;
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const ImportantAnnouncementCard = styled(AnnouncementCard)`
	border: 2px solid #ff6347;
`;

const AnnouncementTitle = styled.h2`
	color: #333;
	font-size: ${(props) => (props.isImportant ? "24px" : "20px")};
	margin-bottom: 10px;
	font-weight: ${(props) => (props.isImportant ? "bold" : "normal")};
	color: ${(props) => (props.isImportant ? "#ff6347" : "#333")};
`;

const AnnouncementContent = styled.p`
	color: #555;
	font-size: 14px;
`;

const NewButton = styled(Button)`
	margin-bottom: 20px;
	margin-top: 20px;
`;

const AnnouncementPage = () => {
	const [announcements, setAnnouncements] = useState([]);
	const [isaddAnnouncementOpen, setAddAnnouncementOpen] = useState(false);
	const [isDeleteAnnouncementOpen, setDeleteAnnouncementOpen] = useState(false);
	const [selectedAnnouncementId, setAnnouncementId] = useState("");

	const [isEditAnnouncementOpen, setEditAnnouncementOpen] = useState(false);
	const [clickedName, setClickedName] = useState("");

	const [selectedAnnouncement, setSelectedAnnouncement] = useState({});
	useEffect(() => {
		getAnnouncementsFunc();
	}, []);

	const getAnnouncementsFunc = async () => {
		const response = await getAllAnnouncements();

		if (!response) {
			return;
		}

		if (response.errors) {
			toast.error(response.errors[0].message);
			return;
		}

		setAnnouncements(response.data);
	};

	const deleteAnnouncementFunc = async (id) => {
		const response = await deleteAnnouncement(id);

		if (!response) {
			return;
		}

		if (response.errors) {
			toast.error(response.errors[0].message);
			return;
		}

		getAnnouncementsFunc();
	};

	//create a function for displaying the announcement and display br as new line
	const displayAnnouncement = (announcement) => {
		return announcement.split("\n").map((str, index) => <p key={index}>{str}</p>);
	};

	return (
		<div className="announcement-page-container">
			<DashboardLayout>
				<PageTitle title="Announcements" />
				<Button onClick={() => setAddAnnouncementOpen(true)}>Add Announcement</Button>
				<AnnouncementContainer>
					{announcements.map((announcement, index) => (
						<AnnouncementCard key={index}>
							<AnnouncementTitle>{announcement.announcement_title}</AnnouncementTitle>
							<AnnouncementContent>{displayAnnouncement(announcement.announcement_content)}</AnnouncementContent>
							<NewButton
								width="100px"
								onClick={() => {
									setDeleteAnnouncementOpen(true);
									setClickedName(announcement.announcement_title);
									setAnnouncementId(announcement.announcement_id);
								}}
							>
								Delete
							</NewButton>

							<NewButton
								width="100px"
								onClick={() => {
									setEditAnnouncementOpen(true);
									setSelectedAnnouncement(announcement);
								}}
							>
								Edit
							</NewButton>
						</AnnouncementCard>
					))}
				</AnnouncementContainer>
			</DashboardLayout>

			{isaddAnnouncementOpen && <AddAnnouncement setAddAnnouncementOpen={setAddAnnouncementOpen} fetchAnnouncements={getAnnouncementsFunc} />}
			{isDeleteAnnouncementOpen && (
				<DeleteModal type="announcement" text={clickedName} close={setDeleteAnnouncementOpen} confirm={() => deleteAnnouncementFunc(selectedAnnouncementId)} />
			)}

			{isEditAnnouncementOpen && (
				<EditAnnouncement onClose={setEditAnnouncementOpen} fetchAnnouncements={getAnnouncementsFunc} selectedAnnouncement={selectedAnnouncement} />
			)}
		</div>
	);
};

export default AnnouncementPage;
