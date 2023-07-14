// api/auth.js

const auth_link = process.env.NEXT_PUBLIC_API_LINK + "/auth";

export const login = async (credentials) => {
	try {
		const response = await fetch(auth_link + "/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify(credentials),
		});

		const data = await response.json();

		// Save the bearer token in localStorage
		if (response.ok) {
			localStorage.setItem("token", data.token);
		}

		return data;
	} catch (error) {
		// Handle error
	}
};

export const register = async (userInfo) => {
	try {
		const response = await fetch(auth_link + "/register", {
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
		const response = await fetch(auth_link + "/logout", {
			method: "GET",
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {}
};

export const test = async () => {
	try {
		const response = await fetch(auth_link + "/test", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include", // This is important for the response cookies to be saved
		});

		const data = await response.json();
		return data;
	} catch (error) {}
};
