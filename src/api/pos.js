export const getPaymentMethods = async () => {
	//get payment methods
	try {
		const response = await fetch("/api/paymentMethods", {
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
