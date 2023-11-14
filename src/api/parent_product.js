export const getParentProduct = async () => {
	try {
		const response = await fetch("/api/parent-product", {
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

export const addParentProduct = async (parentProduc) => {
	try {
		const response = await fetch("/api/parent-product", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(parentProduc),
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};
