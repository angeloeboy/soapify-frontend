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
		const response = await fetch("/api/product/", {
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
export const editProduct = async (product, product_id) => {
	try {
		const response = await fetch(`/api/product/edit/${product_id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(product),
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const deactivateProduct = async (product_id) => {
	try {
		const response = await fetch(`/api/product/deactivate/${product_id}`, {
			method: "PUT",
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

export const activateProduct = async (product_id) => {
	try {
		const response = await fetch(`/api/product/activate/${product_id}`, {
			method: "PUT",
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

export const deleteProduct = async (product_id) => {
	try {
		const response = await fetch(`/api/product/${product_id}`, {
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

export const getProductTemplates = async () => {
	try {
		const response = await fetch("/api/product/template", {
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

export const getSubCategories = async () => {
	try {
		const response = await fetch("/api/subcategory", {
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

export const deleteSubCategory = async (subCategory_id) => {
	try {
		const response = await fetch(`/api/subcategory/${subCategory_id}`, {
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

export const deleteCategory = async (category_id) => {
	try {
		const response = await fetch(`/api/product/category/${category_id}`, {
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
