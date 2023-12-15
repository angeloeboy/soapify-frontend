import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DashboardLayout from "@/components/misc/dashboardLayout";
import PageTitle from "@/components/misc/pageTitle";
import { addAnnouncement, getAllAnnouncements } from "@/api/announcements";
import AddAnnouncement from "@/components/announcements/addAnnouncements";
import Button from "@/components/misc/button";
import UserDashboardLayout from "@/components/misc/userDashboardLayout";

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

const AnnouncementUserPage = () => {
	const [announcements, setAnnouncements] = useState([]);
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

	//create a function for displaying the announcement and display br as new line
	const displayAnnouncement = (announcement) => {
		return announcement.split("\n").map((str, index) => <p key={index}>{str}</p>);
	};

	return (
		<div className="announcement-page-container">
			<PageTitle title="Announcements" />
			<AnnouncementContainer>
				{announcements.map((announcement, index) => (
					<AnnouncementCard key={index}>
						<AnnouncementTitle>{announcement.announcement_title}</AnnouncementTitle>
						<AnnouncementContent>{displayAnnouncement(announcement.announcement_content)}</AnnouncementContent>
					</AnnouncementCard>
				))}
			</AnnouncementContainer>
		</div>
	);
};

export default AnnouncementUserPage;
