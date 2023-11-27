import React, { createContext, useState, useContext, useEffect } from "react";
import { usePermissions } from "./PermissionsContext";
import { useRouter } from "next/router";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const { permissions } = usePermissions();
	const [permissions_list, setPermissions] = useState([]); // Permissions state
	const router = useRouter();
	const [loadingPermissions, setLoadingPermissions] = useState(true); // New state to track loading of permissions

	const hasPermission = (permission) => permissions.includes(permission);

	const generateSidebarData = () => {
		const sidebarData = [
			{
				title: "Dashboard",
				icon: "/home-icon.png",
				hasSubmenu: true,
				submenus: [
					{ title: "POS", link: "/dashboard/pos" },
					{ title: "Sales Overview", link: "/dashboard" },
					{ title: "Orders", link: "/dashboard/orders", permission: "View Orders:orders" },
					{ title: "Returns", link: "/dashboard/returns" },
					{ title: "Refunds", link: "/dashboard/refunds" },
					{ title: "Promos", link: "/dashboard/promos" },
					{ title: "Parent Products", link: "/dashboard/parent-product" },
				],
			},

			{
				title: "Inventory",
				icon: "/inventory-icon.png",
				hasSubmenu: true,
				submenus: [
					{ title: "Products", link: "/dashboard/products" },
					{ title: "Inventory", link: "/dashboard/inventory" },
					{ title: "Categories", link: "/dashboard/products/categories" },
					{ title: "Suppliers", link: "/dashboard/suppliers" },
					{ title: "Subcategories", link: "/dashboard/products/subcategories" },
					{ title: "Attributes", link: "/dashboard/attributes" },
					{ title: "Shelving", link: "/dashboard/shelving" },
				],
			},
			{
				title: "Settings",
				icon: "/settings-icon.png",
				hasSubmenu: true,
				submenus: [
					{ title: "Users", link: "/dashboard/user" },
					{ title: "Warehouse", link: "/dashboard/warehouse" },
					{ title: "Payment Methods", link: "/dashboard/payment" },
					{ title: "Roles", link: "/dashboard/roles" },
					{ title: "User Settings", link: "/dashboard/user-settings" },
				],
			},
		];

		return sidebarData.map((section) => ({
			...section,
			submenus: section.submenus.filter((item) => !item.permission || hasPermission(item.permission)),
		}));

		return sidebarData;
	};

	const [sidebarData, setSidebarData] = useState(generateSidebarData());

	const [sidebarState, setSidebarState] = useState({
		submenuOpen: Array(sidebarData.length).fill(false),
		sidebarVisible: true,
		activeMenuIndex: -1,
		activeSubmenuItemIndex: -1,
	});

	useEffect(() => {
		if (permissions === undefined || permissions.length <= 0) return;
		setPermissions(permissions);
		setLoadingPermissions(false);
		setSidebarData(generateSidebarData()); // Update sidebar data when permissions change
	}, [permissions]);

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
	}, [router.pathname, sidebarData, permissions]); // Dependency on the path and sidebarData

	// Add logic to fetch and set permissions here
	return <AppContext.Provider value={{ permissions_list, sidebarState, setSidebarState, sidebarData }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
