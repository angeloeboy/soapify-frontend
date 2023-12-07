/* eslint-disable react-hooks/rules-of-hooks */
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { WebSocketContext, useWebSocket } from "../context/WebsocketContext";

let TopBarContainer = styled.div`
	padding: 16px 48px;
	width: 100%;
	background: #fff;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #dddddd;
	background-color: white;

	h2 {
		font-size: 24px;
	}

	.alert-container {
		display: flex;
		align-items: center;
		justify-content: center;

		.profile {
			width: 40px;
			height: 40px;
			background-color: #e5e5e5;
			border-radius: 50%;
			margin-left: 10px;
		}
	}
`;
const TopBar = () => {
	const [notificationsList, setNotificationsList] = useState([]);

	// Use useContext to access the WebSocketContext
	const context = useContext(WebSocketContext);
	if (!context) {
		// handle the case where context is not available
		return null;
	}

	const { notifications } = context;

	useEffect(() => {
		if (!notifications) return;
		setNotificationsList(notifications);
	}, [notifications]);

	const getDate = () => {
		let date = new Date();
		let month = date.getMonth();
		let day = date.getDate();
		let year = date.getFullYear();

		const monthIndex = date.getMonth(); // get the month as a number

		const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

		const monthName = monthNames[monthIndex];

		let fullDate = `${monthName} ${day} ${year}`;
		return fullDate;
	};

	return (
		<TopBarContainer>
			<h3>{getDate()}</h3>
			<div className="alert-container">
				<FontAwesomeIcon icon={faBell} />
				{notificationsList.length}
			</div>
		</TopBarContainer>
	);
};

export default TopBar;
