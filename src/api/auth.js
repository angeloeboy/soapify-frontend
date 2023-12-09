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
	} catch (error) {
		console.log(error);
	}
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

export const verifyEmail = async (token) => {
	try {
		const response = await fetch(`/api/auth/verify/${token}`, {
			method: "GET",
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const resendVerificationEmail = async (email) => {
	try {
		const response = await fetch("/api/auth/verify/resend", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email }),
		});

		const data = await response.json();
		return data;
	} catch (error) {}
};

export const forgotPassword = async (email) => {
	try {
		const response = await fetch("/api/auth/change-password", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email }),
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const resetPassword = async (password, token) => {
	try {
		const response = await fetch(`/api/auth/reset-password`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ token, password }),
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};
