export const getNotifications = async () => {
	try {
		const response = await fetch("/api/notifications", {
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

export const markNotificationsAsRead = async () => {
	try {
		const response = await fetch("/api/notifications/read", {
			method: "PUT",
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
