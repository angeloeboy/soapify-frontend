// useRequirePermissions.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { usePermissions } from "./PermissionsContext";

export const useRequirePermissions = (requiredPermissions) => {
	const { permissions } = usePermissions();
	const router = useRouter();

	useEffect(() => {
		const hasRequiredPermissions = requiredPermissions.every((perm) => permissions.includes(perm));

		if (!hasRequiredPermissions) {
			router.push("/unauthorized"); // Redirect to an unauthorized page or home
		}
	}, [permissions, requiredPermissions, router]);
};
