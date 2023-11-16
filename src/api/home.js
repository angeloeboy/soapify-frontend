export const getHomeData = async () => {
	try {
		const response = await fetch("/api/home", {
			method: "GET",
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const getProductStats = async (id, year) => {
	try {
		const response = await fetch(`/api/product/${id}/stats/${year}`, {
			method: "GET",
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

//connect to websocket
export const connectToWebSocket = (onMessageReceived) => {
	const wsURL = process.env.NEXT_PUBLIC_WEBSOCKET_URL || "wss://iamangelo.tech"; // Default URL
	let webSocket;

	try {
		// Open a WebSocket connection
		webSocket = new WebSocket(wsURL);

		webSocket.onopen = () => {
			console.log("WebSocket connection established");
		};

		webSocket.onmessage = (event) => {
			const message = JSON.parse(event.data);
			console.log("Message from server:", message);
			if (typeof onMessageReceived === "function") {
				onMessageReceived(message);
			}
		};

		webSocket.onerror = (error) => {
			console.error("WebSocket error:", error);
		};

		webSocket.onclose = () => {
			console.log("WebSocket connection closed");
		};
	} catch (error) {
		console.log("WebSocket connection error:", error);
	}

	return webSocket;
};
