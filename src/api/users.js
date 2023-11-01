export const getUsers = async () => {
	try {
		const res = await fetch("/api/users", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		const data = await res.json();
		return data;
	} catch (error) {}
};
