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

export const deleteParentProduct = async (id) => {
	try {
		const response = await fetch(`/api/parent-product/${id}`, {
			method: "DELETE",
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

export const editParentProduct = async (parentProduct, id) => {
	try {
		const response = await fetch(`/api/parent-product/edit/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(parentProduct),
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};
