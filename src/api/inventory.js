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

export const moveInventory = async (inventory) => {
	try {
		const response = await fetch("/api/inventory/move", {
			method: "PUT",
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
		console.log(error);
	}
};

export const convertBoxToPcs = async (inventory, pcs) => {
	try {
		const response = await fetch("/api/inventory/convert/box", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ inventory_id: inventory.inventory_id, quantity: pcs }),
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {
		// Handle error
		console.log(error);
	}
};

export const convertPcsToBox = async (inventory, pcs) => {
	try {
		const response = await fetch("/api/inventory/convert/pc", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ inventory_id: inventory.inventory_id, quantity: pcs }),
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {
		// Handle error
		console.log(error);
	}
};
