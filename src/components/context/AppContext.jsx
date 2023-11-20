import React, { createContext, useState, useContext, useEffect } from "react";
import { usePermissions } from "./PermissionsContext";
import { useRouter } from "next/router";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const { permissions } = usePermissions();
	const [permissions_list, setPermissions] = useState([]); // Permissions state
	const router = useRouter();

	const sidebarData = [
		{
			title: "Dashboard",
			icon: "/home-icon.png",
			hasSubmenu: true,
			submenus: [
				{ title: "POS", link: "/dashboard/pos" },
				{ title: "Sales Overview", link: "/dashboard" },
				{ title: "Orders", link: "/dashboard/orders" },
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
				{ title: "Orders", link: "/dashboard/orders" },

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
		setPermissions(permissions);
	}, [permissions]);

	useEffect(() => {
		const currentPath = router.pathname;

		// Function to find the index of the menu item and submenu item with a matching link
		const findMenuAndSubmenuIndex = () => {
			for (let i = 0; i < sidebarData.length; i++) {
				const menu = sidebarData[i];
				console.log(menu.link);
				console.log(currentPath);
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
		console.log("Menu Index:", menuIndex, "Submenu Index:", submenuIndex);

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
	return <AppContext.Provider value={{ permissions_list, sidebarState, setSidebarState, sidebarData }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
