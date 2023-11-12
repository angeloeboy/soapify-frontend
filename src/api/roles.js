export const getRoles = async () => {
	try {
		const res = await fetch("/api/role", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		const data = await res.json();
		return data;
	} catch (error) {
		console.log("error:", error);
	}
};

export const getPermissions = async () => {
	try {
		const res = await fetch("/api/role/permissions", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const addRoles = async (role) => {
	try {
		const res = await fetch("/api/role", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(role),
			credentials: "include",
		});

		const data = await res.json();
		return data;
	} catch (error) {}
};
