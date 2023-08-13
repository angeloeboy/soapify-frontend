export const getInventory = async () => {
	try {
		const response = await fetch("/api/inventory", {
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

export const addInventory = async (inventory) => {
	try {
		const response = await fetch("/api/inventory", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(inventory),
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {
		// Handle error
	}
};
