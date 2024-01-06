export const getPurchaseOrders = async () => {
	try {
		const res = await fetch("/api/purchaseOrder", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const addPurchaseOrder = async (purchaseOrder) => {
	try {
		const response = await fetch("/api/purchaseOrder", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(purchaseOrder),
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const confirmPurchaseOrder = async (purchaseOrder) => {
	try {
		const response = await fetch(`/api/purchaseOrder/confirm`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(purchaseOrder),
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};
