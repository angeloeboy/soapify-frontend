import { useRouter } from "next/router";
import { useEffect } from "react";

const checkAuthStatus = async () => {
	// Implement the logic to check the user's authentication status
	// Make a request to your API endpoint, e.g., /auth/check-auth
	// Return true if the user is authenticated, or false if not
	// You can use localStorage, cookies, or JWTs to store and check authentication status
};

const withAuth = (WrappedComponent) => {
	return function WithAuth(props) {
		const router = useRouter();

		useEffect(() => {
			async function handleAuthCheck() {
				const isAuthenticated = await checkAuthStatus();

				if (!isAuthenticated) {
					router.push("/login");
				}
			}

			handleAuthCheck();
		}, []);

		return <WrappedComponent {...props} />;
	};
};

export default withAuth;
