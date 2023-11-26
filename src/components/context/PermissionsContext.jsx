// PermissionsContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const PermissionsContext = createContext();

export const usePermissions = () => useContext(PermissionsContext);

export const PermissionsProvider = ({ children }) => {
	const [permissions, setPermissions] = useState([]);

	useEffect(() => {
		const permissionsFromCookie = Cookies.get("permissions");
		if (permissionsFromCookie) {
			try {
				const parsedPermissions = JSON.parse(permissionsFromCookie);

				setPermissions(parsedPermissions);
				console.log("Permissions from cookie:", parsedPermissions);
			} catch (error) {
				console.error("Error parsing permissions:", error);
				// Handle parsing error
			}
		}
	}, []);

	return <PermissionsContext.Provider value={{ permissions }}>{children}</PermissionsContext.Provider>;
};
