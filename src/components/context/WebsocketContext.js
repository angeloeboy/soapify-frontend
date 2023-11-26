// WebSocketContext.js
import { connectToWebSocket } from "@/api/home";
import { getNotifications } from "@/api/notifications";
import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
	const [notifications, setnotifications] = useState([]);
	const [webSocket, setWebSocket] = useState(null);

	const getNotificationsFunc = async () => {
		const res = await getNotifications();

		if (!res) return;
		setnotifications(res.notifications);
	};

	useEffect(() => {
		let ws;
		let reconnectInterval = 5000; // Time to wait before reconnecting, in milliseconds

		const connect = () => {
			ws = connectToWebSocket((message) => {
				console.log("Received message:", message.data); // Log the raw message

				if (message.type === "newTransaction") {
					// toast.success("New order received");
					getNotificationsFunc();

					// Handle new order
				} else if (message.type === "notification") {
					// toast.info("You have a new notification");
					setnotifications((notifications) => [...notifications, message.data]);
					// Handle new notification
				} else {
					// Handle other types of messages
				}
			});

			// ws.onclose = () => {
			// 	console.log("WebSocket disconnected. Attempting to reconnect...");
			// 	setTimeout(connect, reconnectInterval); // Attempt to reconnect
			// };

			setWebSocket(ws);

			getNotificationsFunc();
		};

		connect();

		return () => {
			if (ws && ws.readyState === WebSocket.OPEN) {
				ws.close();
			}
		};
	}, []);

	return <WebSocketContext.Provider value={{ notifications, webSocket }}>{children}</WebSocketContext.Provider>;
};
