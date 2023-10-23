export const getTransactions = async (product) => {
	try {
		const response = await fetch("/api/transactions", {
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

export const addTransaction = async (transaction) => {
	try {
		const response = await fetch("/api/transactions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(transaction),
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const getTransaction = async () => {
	try {
		const response = await fetch("/api/transactions/" + id, {
			method: "GET",
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const getCustomerTransaction = async () => {
	try {
		const response = await fetch("/api/transactions/orders", {
			method: "GET",
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {}
};
