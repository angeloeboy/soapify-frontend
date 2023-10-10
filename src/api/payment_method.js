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
