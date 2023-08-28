//get products from api
export const getProducts = async () => {
	try {
		const response = await fetch("/api/product", {
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

//get specfic product from api
export const getProduct = async (id) => {
	try {
		const response = await fetch(`/api/product/${id}`, {
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

export const addProduct = async (product) => {
	try {
		const response = await fetch("/api/product/create", {
			method: "POST",
			body: product,
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

//product categories

export const getProductCategories = async () => {
	try {
		const response = await fetch("/api/product/category", {
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

export const addCategory = async (category) => {
	try {
		const response = await fetch("/api/product/category/add", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(category),
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};
