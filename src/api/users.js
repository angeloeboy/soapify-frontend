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

export const editUser = async (user, user_id) => {
	try {
		const res = await fetch(`/api/users/${user_id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
			credentials: "include",
		});

		const data = await res.json();
		return data;
	} catch (error) {}
};
