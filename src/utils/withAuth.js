// Function to check if the user is logged in
export async function isLoggedIn() {
	// Check if the JWT token is present in the cookies

	// Send a request to your backend API to verify the JWT token
	const response = await fetch(process.env.NEXT_PUBLIC_API_LINK + "/auth/verify-token", {
		credentials: "include", // Send cookies along with the request
	});

	console.log(response.ok);
	if (response.ok) {
		// The token is valid, the user is logged in
		return true;
	}

	// The token is invalid or expired, the user is not logged in
	return false;
}
