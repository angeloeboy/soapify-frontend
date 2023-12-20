export const getAllWarehouse = async () => {
	try {
		const response = await fetch("/api/warehouse", {
			method: "GET",
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const addWarehouse = async (warehouse) => {
	try {
		const response = await fetch("/api/warehouse", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(warehouse),
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const getWarehouse = async (warehouse_id) => {
	try {
		const response = await fetch(`/api/warehouse/${warehouse_id}`, {
			method: "GET",
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {}
};

export const getAreasByWarehouseId = async (warehouse_id) => {
	try {
		const response = await fetch(`/api/area/${warehouse_id}`, {
			method: "GET",
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {}
};

export const editWarehouse = async (warehouse_id, warehouse) => {
	try {
		const response = await fetch(`/api/warehouse/edit/${warehouse_id}`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(warehouse),
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const addArea = async (warehouse_id, area) => {
	try {
		const response = await fetch(`/api/area`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				area_name: area.area_name,
				warehouse_id: warehouse_id,
				max_capacity: area.max_capacity,
			}),
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const deleteArea = async (area_id) => {
	try {
		const response = await fetch(`/api/area/${area_id}`, {
			method: "DELETE",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const deactivateWarehouse = async (warehouse_id, warehouse) => {
	try {
		const response = await fetch(`/api/warehouse/deactivate/${warehouse_id}`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(warehouse),
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const reactivateWarehouse = async (warehouse_id, warehouse) => {
	try {
		const response = await fetch(`/api/warehouse/activate/${warehouse_id}`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(warehouse),
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const addAreas = async (areas) => {
	try {
		const response = await fetch("/api/areas", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(areas),
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const getAreas = async () => {
	try {
		const response = await fetch("/api/area", {
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

//edit area
export const editArea = async (area) => {
	try {
		const response = await fetch(`/api/area/${area.area_id}`, {
			method: "PUT",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ area_name: area.area_name, max_capacity: area.max_capacity }),
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const deleteWarehouse = async (warehouse_id) => {
	try {
		const response = await fetch(`/api/warehouse/${warehouse_id}`, {
			method: "DELETE",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};
