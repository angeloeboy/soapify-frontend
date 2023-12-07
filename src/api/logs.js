export const getInventoryLogs = async () => {
	try {
		const response = await fetch("/api/logs/inventory", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {
		// Handle error
	}
};

export const getLogs = async () => {
	try {
		const response = await fetch("/api/logs", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};
