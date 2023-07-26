// api/auth.js

export const login = async (credentials) => {
	try {
		const response = await fetch("/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(credentials),
		});

		const data = await response.json();

		return data;
	} catch (error) {
		// Handle error
	}
};

export const register = async (userInfo) => {
	try {
		const response = await fetch("/api/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userInfo),
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {}
};

export const logout = async () => {
	try {
		const response = await fetch("/api/auth/logout", {
			method: "GET",
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {}
};

export const test = async () => {
	try {
		const response = await fetch("/api/auth/verify-token", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {}
};
