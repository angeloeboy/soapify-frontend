// PermissionsContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const PermissionsContext = createContext();

export const usePermissions = () => useContext(PermissionsContext);

export const PermissionsProvider = ({ children }) => {
	const [permissions, setPermissions] = useState([]);

	const fetchPermissions = () => {
		// console.log("running fetch permissions");
		const permissionsFromCookie = Cookies.get("permissions");
		if (permissionsFromCookie) {
			try {
				const parsedPermissions = JSON.parse(permissionsFromCookie);
				// console.log("Permissions from cookie:", parsedPermissions);
				setPermissions(parsedPermissions);
			} catch (error) {
				console.error("Error parsing permissions:", error);
				// Handle parsing error
			}
		}
	};

	useEffect(() => {
		fetchPermissions();
	}, []);

	return <PermissionsContext.Provider value={{ permissions, fetchPermissions }}>{children}</PermissionsContext.Provider>;
};
