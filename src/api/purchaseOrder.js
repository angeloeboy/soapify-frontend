export const getPurchaseOrders = async () => {
	try {
		const res = await fetch("/api/promos", {
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
