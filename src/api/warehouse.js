export const getAllWarehouse = async () => {
	try {
		const response = await fetch("/api/warehouse", {
			method: "GET",
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const addWarehouse = async (warehouse) => {
	try {
		const response = await fetch("/api/warehouse", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(warehouse),
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};
