import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isLoggedIn } from "../utils/withAuth";

// HOC function that wraps a component and checks for authentication
export function withAuth(Component) {
	return function WrappedComponent(props) {
		const router = useRouter();
		const [loading, setLoading] = useState(true);

		useEffect(() => {
			async function checkAuth() {
				try {
					const authenticated = await isLoggedIn();
					if (!authenticated) {
						router.replace("/login");
					} else {
						setLoading(false);
					}
				} catch (error) {
					console.error("Error checking authentication:", error);
					// Handle error case if needed
				} finally {
				}
			}

			checkAuth();
		}, []);

		if (loading) {
			// Render a loading state or placeholder while checking authentication
			return <div>Loading...</div>;
		} else {
			// Render the component if the user is logged in
			return <Component {...props} />;
		}
	};
}
