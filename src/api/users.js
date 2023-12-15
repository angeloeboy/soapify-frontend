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

export const getUser = async () => {
	try {
		const res = await fetch(`/api/users/user`, {
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

export const createUser = async (user) => {
	try {
		const res = await fetch(`/api/users`, {
			method: "POST",
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

export const resetUserCancellation = async (user_id) => {
	try {
		const res = await fetch(`/api/users/resetCancellationCount/${user_id}`, {
			method: "PUT",
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
