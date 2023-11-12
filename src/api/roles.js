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
