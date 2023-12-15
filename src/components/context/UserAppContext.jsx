import React, { createContext, useState, useContext, useEffect } from "react";
import { usePermissions } from "./PermissionsContext";
import { useRouter } from "next/router";

const UserAppContext = createContext();

export const UserAppProvider = ({ children }) => {
	// const { permissions } = usePermissions();
	// const [permissions_list, setPermissions] = useState([]); // Permissions state
	const router = useRouter();

	const sidebarData = [
		{
			title: "Dashboard",
			icon: "/home-icon.png",
			hasSubmenu: true,
			submenus: [
				{ title: "Products", link: "/user" },
				{ title: "Orders", link: "/user/orders" },
				{ title: "User Settings", link: "/user/user-settings" },
				{ title: "Announcements", link: "/user/announcements" },
			],
		},
	];

	const [sidebarState, setSidebarState] = useState({
		submenuOpen: Array(sidebarData.length).fill(false),
		sidebarVisible: true,
		activeMenuIndex: -1,
		activeSubmenuItemIndex: -1,
	});

	useEffect(() => {
		const currentPath = router.pathname;

		// Function to find the index of the menu item and submenu item with a matching link
		const findMenuAndSubmenuIndex = () => {
			for (let i = 0; i < sidebarData.length; i++) {
				const menu = sidebarData[i];

				if (menu.link === currentPath) {
					// If the current path matches the main menu link

					return { menuIndex: i, submenuIndex: -1 };
				}

				const submenuIndex = menu.submenus?.findIndex((subItem) => subItem.link === currentPath);
				if (submenuIndex !== -1) {
					// If the current path matches a submenu link
					return { menuIndex: i, submenuIndex };
				}
			}
			// Return -1 if no match is found
			return { menuIndex: -1, submenuIndex: -1 };
		};

		const { menuIndex, submenuIndex } = findMenuAndSubmenuIndex();

		if (menuIndex !== -1) {
			setSidebarState((prevState) => ({
				...prevState,
				submenuOpen: prevState.submenuOpen.map((_, index) => index === menuIndex),
				activeMenuIndex: menuIndex,
				activeSubmenuItemIndex: submenuIndex,
			}));
		}
	}, [router.pathname]); // Dependency on the path and sidebarData

	// Add logic to fetch and set permissions here
	return <UserAppContext.Provider value={{ sidebarState, setSidebarState, sidebarData }}>{children}</UserAppContext.Provider>;
};

export const useUserAppContext = () => useContext(UserAppContext);
