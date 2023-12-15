/* eslint-disable react-hooks/rules-of-hooks */
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useRef, useState } from "react";
import { WebSocketContext, WebSocketProvider, useWebSocket } from "../context/WebsocketContext";
import useOutsideClick from "@/hooks/useOutsideclick";
import { markNotificationsAsRead } from "@/api/notifications";

let TopBarContainer = styled.div`
	padding: 16px 48px;
	width: 100%;
	background: #fff;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #dddddd;
	background-color: white;
	position: relative;
	h2 {
		font-size: 24px;
	}

	.alert-container {
		position: relative;
		cursor: pointer;
		.profile {
			width: 40px;
			height: 40px;
			background-color: #e5e5e5;
			border-radius: 50%;
			margin-left: 10px;
		}

		svg {
			font-size: 25px !important;
		}

		.number {
			position: absolute;
			top: 0px;
			right: 0px;
			transform: translate(50%, -50%);
			z-index: 100;
			color: red;
			background-color: red;
			color: white;
			/* width: 10px;
			height: 10px; */
			width: 20px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 12px;
			border-radius: 20px;
		}
	}
`;

const NotificationContainer = styled.div`
	position: absolute;
	top: 100%;
	right: 0px;
	width: 400px;
	height: 400px;
	background-color: white;
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	overflow-y: scroll;
	z-index: 1000;
`;

const NotificationItem = styled.div`
	padding: 10px 30px;
	border-bottom: 1px solid #dddddd;
	background-color: ${({ $isRead }) => ($isRead ? "white" : "#f5f5f5")};

	.notification-title {
		font-size: 14px;
		color: #536686;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		margin-bottom: 1rem;
	}

	.date {
		font-size: 12px;
		color: #536686;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		margin-bottom: 1rem;
	}
`;

const NotificationList = ({ notifications }) => {
	const [notificationsList, setNotificationsList] = useState([]);

	useEffect(() => {
		setNotificationsList(notifications);
	}, [notifications]);

	//create a function that will return the date
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

	return (
		<NotificationContainer>
			{notificationsList.length === 0 ? (
				<p>No notifications</p>
			) : (
				notificationsList.map((notification, index) => (
					<NotificationItem className="notification-item" key={index} $isRead={notification.isRead}>
						<p className="notification-title">{notification.notification}</p>
						<p className="date">{convertToDateFormat(notification.date)}</p>
					</NotificationItem>
				))
			)}
		</NotificationContainer>
	);
};

const TopBar = () => {
	const [notificationsList, setNotificationsList] = useState([]);
	const [showNotificationModal, setShowNotificationModal] = useState(false);

	const { notifications, getNotificationsFunc } = useContext(WebSocketContext);

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

	useEffect(() => {
		if (!notifications) return;

		notifications.filter((notification) => !notification.isRead);

		setNotificationsList(notifications);
	}, [notifications]);

	//mark notification as read
	const markAsRead = async () => {
		if (!notifications || notifications.length == 0) return;

		const read = notifications.filter((notification) => !notification.isRead);
		//if there are no notifications that are not read, return
		if (read.length === 0) return;

		const res = await markNotificationsAsRead();

		if (!res) return;

		if (res.status == "Success") {
			getNotificationsFunc();
		}
	};

	//get the number of notifications that are not read

	return (
		<TopBarContainer>
			<h3>{getDate()}</h3>
			<div
				className="alert-container"
				onClick={() => {
					// console.log(notifications);

					setShowNotificationModal((prev) => !prev);

					//only mark as read if the modal is closed again
					if (showNotificationModal) {
						markAsRead();
					}
				}}
			>
				<FontAwesomeIcon icon={faBell} />
				{notificationsList.filter((notification) => !notification.isRead).length > 0 && (
					<div className="number">{notificationsList.filter((notification) => !notification.isRead).length}</div>
				)}
			</div>

			{showNotificationModal && <NotificationList notifications={notificationsList} />}
		</TopBarContainer>
	);
};

export default TopBar;
