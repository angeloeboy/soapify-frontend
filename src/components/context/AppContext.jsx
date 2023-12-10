import React, { createContext, useState, useContext, useEffect } from "react";
import { usePermissions } from "./PermissionsContext";
import { useRouter } from "next/router";
import { getTransactions } from "@/api/transaction";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const { permissions } = usePermissions();
	const [permissions_list, setPermissions] = useState([]); // Permissions state
	const [orders, setOrders] = useState([]);
	const router = useRouter();
	const [loadingPermissions, setLoadingPermissions] = useState(true); // New state to track loading of permissions

	const hasPermission = (permission) => permissions.includes(permission);

	const getOrders = async () => {
		try {
			const response = await getTransactions();

			//get orders that are "Awating payment"
			response.transactions = response.transactions.filter((order) => order.status == "AWAITING PAYMENT");

			setOrders(response.transactions);
		} catch (error) {
			console.error("Error fetching orders", error);
		}
	};

	useEffect(() => {
		getOrders();
	}, []);

	const generateSidebarData = () => {
		const sidebarData = [
			{
				title: "Sales",
				icon: "/sales-icon.png",
				hasSubmenu: true,
				submenus: [
					{ title: "POS", link: "/dashboard/pos" },
					{ title: "Overview", link: "/dashboard" },
					{ title: `${orders.length > 0 ? `Orders (${orders.length})` : "Orders"}`, link: "/dashboard/orders", permission: "View Orders:orders" },
					{ title: "Promos", link: "/dashboard/promos" },
				],
			},
			{
				title: "Inventory",
				icon: "/inventory-icon.png",
				hasSubmenu: true,
				submenus: [
					{ title: "Overview", link: "/dashboard/inventory", permission: "View Inventory:inventory" },
					{ title: "Products", link: "/dashboard/products", permission: "View Products:products" },
					{ title: "Attributes", link: "/dashboard/attributes", permission: "View Attributes:attributes" },
					{ title: "Categories", link: "/dashboard/products/categories", permission: "View Categories:categories" },
					{ title: "Subcategories", link: "/dashboard/products/subcategories", permission: "View Subcategories:subcategories" },
					{ title: "Parent Products", link: "/dashboard/parent-product", permission: "View Parent Products:parent_products" },
				],
			},
			{
				title: "Operations",
				icon: "/settings-icon.png",
				hasSubmenu: true,
				submenus: [
					{ title: "Users", link: "/dashboard/user" },
					{ title: "Warehouse", link: "/dashboard/warehouse", permission: "View Warehouses:warehouses" },
					{ title: "Areas", link: "/dashboard/areas", permission: "View Areas:areas" },
					{ title: "Payments", link: "/dashboard/payment" },
					{ title: "Suppliers", link: "/dashboard/suppliers", permission: "View Suppliers:suppliers" },
					{ title: "Roles", link: "/dashboard/roles" },
					{ title: "Logs", link: "/dashboard/logs" },
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
	}, [permissions, orders]);

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
	return <AppContext.Provider value={{ permissions_list, sidebarState, setSidebarState, sidebarData, setOrders }}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
