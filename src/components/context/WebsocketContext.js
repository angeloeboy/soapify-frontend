import React, { createContext, useState, useEffect } from "react";
import { connectToWebSocket } from "@/api/home"; // Assuming this is your WebSocket connection function
import { getNotifications } from "@/api/notifications";
import { toast } from "react-toastify";

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
	const [notifications, setNotifications] = useState([]);
	const [webSocket, setWebSocket] = useState(null);

	const getNotificationsFunc = async () => {
		const res = await getNotifications();
		if (!res) return;
		setNotifications(res.notifications);
	};

	useEffect(() => {
		let ws;
		let reconnectInterval = 5000; // Time to wait before reconnecting, in milliseconds

		const connect = () => {
			if (webSocket && webSocket.readyState === WebSocket.OPEN) {
				console.log("WebSocket is already connected.");
				return;
			}

			ws = connectToWebSocket(); // Connect to WebSocket

			ws.onopen = () => {
				console.log("Connected to WebSocket");
				getNotificationsFunc();
			};

			ws.onmessage = (event) => {
				const message = JSON.parse(event.data); // Assuming the message is JSON

				console.log("Received message:", message);

				if (message.type === "newTransaction") {
					// Handle new transaction
					toast.success("New order received");
					getNotificationsFunc();
					console.log("testing testing ran again");
				} else if (message.type === "notification") {
					// Handle new notification
					toast.info("You have a new notification");
					setNotifications((prevNotifications) => [...prevNotifications, message.data]);
				} else if (message.type === "orderStatusChanged") {
					// Handle order status change
					console.log("Order status changed:", message.data);
					toast.info(`Your order ${message.data.data.transaction_unique_id} status has changed to ${message.data.data.transaction_status}`);
				}
			};

			ws.onclose = () => {
				console.log("WebSocket Disconnected. Attempting to Reconnect...");
				setTimeout(connect, reconnectInterval); // Attempt to reconnect
			};

			ws.onerror = (error) => {
				console.error("WebSocket Error:", error);
				ws.close(); // Optionally close the connection on error
			};

			setWebSocket(ws);
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
