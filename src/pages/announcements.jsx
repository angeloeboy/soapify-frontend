import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DashboardLayout from "@/components/misc/dashboardLayout";
import PageTitle from "@/components/misc/pageTitle";
import { addAnnouncement, getAllAnnouncements } from "@/api/announcements";
import AddAnnouncement from "@/components/announcements/addAnnouncements";
import Button from "@/components/misc/button";
import UserDashboardLayout from "@/components/misc/userDashboardLayout";
import NavBar from "@/components/misc/navbar";

const AnnouncementContainer = styled.div`
	padding: 55px 0px;
	box-sizing: border-box;
	max-width: 1500px;
	margin: 0 auto;
	padding-top: 100px;

	h2 {
		margin-bottom: 50px !important;
	}
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

const AnnouncementTitle = styled.div`
	color: #333;
	font-size: ${(props) => (props.isImportant ? "24px" : "20px")};
	margin-bottom: 10px;
	font-weight: ${(props) => (props.isImportant ? "bold" : "normal")};
	color: ${(props) => (props.isImportant ? "#ff6347" : "#333")};

	display: flex;
	justify-content: space-between;

	.date {
		color: #555;
		font-size: 14px;
	}
`;

const AnnouncementContent = styled.p`
	color: #555;
	font-size: 14px;
	margin-top: 16px;
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

	const convertToDateFormat = (date) => {
		let newDate = new Date(date);
		let formattedDate = newDate.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});

		//add the time too and check if am or pm
		let hours = newDate.getHours();
		let minutes = newDate.getMinutes();
		let ampm = hours >= 12 ? "pm" : "am";
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? "0" + minutes : minutes;
		let strTime = hours + ":" + minutes + " " + ampm;

		formattedDate = formattedDate + " " + strTime;

		return formattedDate;
	};

	//create a function for displaying the announcement and display br as new line
	const displayAnnouncement = (announcement) => {
		return announcement.split("\n").map((str, index) => <p key={index}>{str}</p>);
	};

	return (
		<div className="announcement-page-container">
			<NavBar />
			<AnnouncementContainer>
				<h2>Announcements</h2>

				{announcements.map((announcement, index) => (
					<AnnouncementCard key={index}>
						<AnnouncementTitle>
							<h4>{announcement.announcement_title}</h4>
							<p className="date"> {convertToDateFormat(announcement.createdAt)}</p>
						</AnnouncementTitle>
						<AnnouncementContent>{displayAnnouncement(announcement.announcement_content)}</AnnouncementContent>
					</AnnouncementCard>
				))}
			</AnnouncementContainer>
		</div>
	);
};

export default AnnouncementUserPage;
