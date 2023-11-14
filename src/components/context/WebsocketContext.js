// WebSocketContext.js
import { connectToWebSocket } from "@/api/home";
import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
	const [webSocket, setWebSocket] = useState(null);

	useEffect(() => {
		const ws = connectToWebSocket((message) => {
			console.log("Real-time message received:", message);
			// Add additional message handling as needed
			toast.success("New order received");
		});

		setWebSocket(ws);

		return () => {
			if (ws && ws.readyState === WebSocket.OPEN) {
				ws.close();
			}
		};
	}, []);

	return <WebSocketContext.Provider value={webSocket}>{children}</WebSocketContext.Provider>;
};
