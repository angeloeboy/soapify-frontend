export const getSuppliers = async () => {
	try {
		const response = await fetch("/api/supplier", {
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

export const addSupplier = async (supplier) => {
	try {
		const response = await fetch("/api/supplier", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(supplier),
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const editSupplier = async (supplier, supplier_id) => {
	try {
		const response = await fetch(`/api/supplier/edit/${supplier_id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(supplier),
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const getSupplier = async (supplier_id) => {
	try {
		const response = await fetch(`/api/supplier/${supplier_id}`, {
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
