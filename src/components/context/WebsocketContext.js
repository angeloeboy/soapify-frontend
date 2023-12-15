import React, { createContext, useState, useEffect } from "react";
import { connectToWebSocket } from "@/api/home"; // Assuming this is your WebSocket connection function
import { getNotifications } from "@/api/notifications";
import { toast } from "react-toastify";
import { getCustomerTransaction, getTransactions } from "@/api/transaction";

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
	const [notifications, setNotifications] = useState([]);
	const [transactions, setTransactions] = useState([]);
	const [userTransactions, setUserTransactions] = useState([]);
	const [webSocket, setWebSocket] = useState(null);

	const getNotificationsFunc = async () => {
		const res = await getNotifications();
		if (!res) return;
		setNotifications(res.notifications);
	};

	//get transactions
	const getTransactionsFunc = async () => {
		const res = await getTransactions();
		if (!res) return;

		if (res.transactions?.length < 0) {
			return;
		}

		setTransactions(res.transactions);
	};

	const getUserTransaction = async () => {
		const response = await getCustomerTransaction();
		if (!response) return;
		if (response.transactions?.length < 0) {
			return;
		}

		setUserTransactions(response.transactions);
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
				getTransactionsFunc();
				getUserTransaction();
			};

			ws.onmessage = (event) => {
				const message = JSON.parse(event.data); // Assuming the message is JSON
				getNotificationsFunc();
				getTransactionsFunc();
				getUserTransaction();

				console.log("Received message:", message);

				if (message.type === "newTransaction") {
					// Handle new transaction
					toast.success("New order received");
					getNotificationsFunc();
				} else if (message.type === "notification") {
					// Handle new notification
					// toast.info("You have a new notification");
					setNotifications((prevNotifications) => [...prevNotifications, message.data]);
				} else if (message.type === "orderStatusChanged") {
					// Handle order status change
					console.log("Order status changed:", message.data);
					// toast.info(`Your order ${message.data.data.transaction_unique_id} status has changed to ${message.data.data.transaction_status}`);
				} else if (message.type === "newAnnouncement") {
					// Handle new order
					// toast.success(`New announcement`);
					getNotificationsFunc();
				} else if (message.type === "newNotification") {
					// toast.success("New notification received");
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

	return (
		<WebSocketContext.Provider
			value={{
				notifications,
				webSocket,
				getNotificationsFunc,
				transactions,
				setTransactions,
				getTransactionsFunc,
				userTransactions,
				setUserTransactions,
				getUserTransaction,
			}}
		>
			{children}
		</WebSocketContext.Provider>
	);
};
