export const addPaymentMethod = async (paymentMethod) => {
	//add payment methods
	try {
		const response = await fetch("/api/paymentMethods", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(paymentMethod),
		});

		const data = await response.json();
		return data;
	} catch (error) {
		// Handle error
	}
};

export const getPaymentMethod = async (id) => {
	try {
		const response = await fetch(`/api/paymentMethods/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {}
};

export const editPayment = async (id, paymentMethod) => {
	try {
		const response = await fetch(`/api/paymentMethods/edit/${id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(paymentMethod),
		});

		const data = await response.json();
		return data;
	} catch (error) {}
};
