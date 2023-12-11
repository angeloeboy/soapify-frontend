import { useRouter } from "next/router";
import { getSubCategories } from "@/api/subcategories";
import { getPaymentMethods } from "@/api/pos";
import { getProducts } from "@/api/products";
import { getSuppliers } from "@/api/supplier";
import { getAllWarehouse } from "@/api/warehouse";
import { getTransactions } from "@/api/transaction";
import { getUsers } from "@/api/users";
import { getProductCategories } from "@/api/products";
import DashboardLayout from "@/components/misc/dashboardLayout";
import { useEffect, useState } from "react";
import { connectToWebSocket, getHomeData } from "@/api/home";
import Widget from "@/components/home/widget";
import ProductPerformance from "@/components/home/productPerformance";
import AnnualSalesGraph from "@/components/home/annualSalesGraph";
import ProductSalesGraph from "@/components/home/productSalesGraph";
import { toast } from "react-toastify";
import styled from "styled-components";
import { usePermissions } from "@/components/context/PermissionsContext";

const DashboardGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: 20px;
	margin: 20px;
`;

const DashboardCard = styled.div`
	background-color: #fff;
	border-radius: 10px;
	box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
	padding: 20px;
	transition: transform 0.3s ease-in-out;

	&:hover {
		transform: translateY(-5px);
		box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.15);
	}

	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
`;

const Title = styled.h3`
	color: #333;
	font-size: 1.2em;
	margin-bottom: 10px;
`;

const Count = styled.span`
	color: #555;
	font-size: 1.5em;
	font-weight: bold;
`;

const Button = styled.button`
	padding: 8px 16px;
	border: none;
	border-radius: 5px;
	background-color: #3498db;
	color: #fff;
	font-size: 1em;
	cursor: pointer;
	transition: background-color 0.3s ease-in-out;

	&:hover {
		background-color: #2980b9;
	}
`;

const Dashboard = () => {
	const [data, setData] = useState({});
	const [salesData, setSalesData] = useState([]);
	const [ordersData, setOrdersData] = useState([]);
	const [supplierCount, setSupplierCount] = useState(0);
	const [productCount, setProductCount] = useState(0);
	const [warehouseCount, setWarehouseCount] = useState(0);
	const [userCount, setUserCount] = useState(0);
	const [categoriesCount, setCategoriesCount] = useState(0);
	const [TransactionCount, setTransactionCount] = useState(0);
	const [paymentCount, setPaymentMethodCount] = useState(0);
	const [subcategoriesCount, setsubcategoriesCount] = useState(0);

	const { fetchPermissions } = usePermissions();

	useEffect(() => {
		fetchPermissions();
		fetchHomeData();

		fetchProductCount();
		fetchSupplierCount();
		fetchWarehouseCount();
		fetchUserCount();
		fetchProductCategoriesCount();
		fetchTransactionCount();
		fetchPaymentMethodCount();
		fetchSubcategoriesCount();
	}, []);

	useEffect(() => {
		setSalesData(getSalesData());
		setOrdersData(getOrdersData());
	}, [data]);

	const fetchHomeData = async () => {
		const homeData = await getHomeData();
		console.log(homeData);
		setData(homeData.data);
	};

	const fetchProductCount = async () => {
		try {
			const productsData = await getProducts();
			if (productsData && Array.isArray(productsData.products)) {
				setProductCount(productsData.products.length);
			}
		} catch (error) {
			console.error("Error fetching product count: ", error);
		}
	};

	const fetchSupplierCount = async () => {
		try {
			const supplierData = await getSuppliers();
			if (supplierData && Array.isArray(supplierData.suppliers)) {
				setSupplierCount(supplierData.suppliers.length);
			}
			console.log(supplierData);
		} catch (error) {
			console.error("Error fetching product count: ", error);
		}
	};

	const fetchWarehouseCount = async () => {
		try {
			const warehouseData = await getAllWarehouse();
			if (warehouseData && Array.isArray(warehouseData.warehouses)) {
				setWarehouseCount(warehouseData.warehouses.length);
			}
			console.log(warehouseData);
		} catch (error) {
			console.error("Error fetching product count: ", error);
		}
	};

	const fetchUserCount = async () => {
		try {
			const userData = await getUsers();
			if (userData && Array.isArray(userData.users)) {
				setUserCount(userData.users.length);
			}
			console.log(userData);
		} catch (error) {
			console.error("Error fetching product count: ", error);
		}
	};

	const fetchProductCategoriesCount = async () => {
		try {
			const categoriesData = await getProductCategories();
			if (categoriesData && Array.isArray(categoriesData.categories)) {
				setCategoriesCount(categoriesData.categories.length);
			}
			console.log(categoriesData);
		} catch (error) {
			console.error("Error fetching product count: ", error);
		}
	};

	const fetchTransactionCount = async () => {
		try {
			const transactionData = await getTransactions();
			if (transactionData && Array.isArray(transactionData.transactions)) {
				setTransactionCount(transactionData.transactions.length);
			}
			console.log(transactionData);
		} catch (error) {
			console.error("Error fetching product count: ", error);
		}
	};
	const fetchPaymentMethodCount = async () => {
		try {
			const paymentData = await getPaymentMethods();
			if (paymentData && Array.isArray(paymentData.paymentMethods)) {
				setPaymentMethodCount(paymentData.paymentMethods.length);
			}
			console.log(paymentData);
		} catch (error) {
			console.error("Error fetching product count: ", error);
		}
	};

	const fetchSubcategoriesCount = async () => {
		try {
			const subcategoriesData = await getSubCategories();
			if (subcategoriesData && Array.isArray(subcategoriesData.subcategories)) {
				setsubcategoriesCount(subcategoriesData.subcategories.length);
			}
			console.log(subcategoriesData);
		} catch (error) {
			console.error("Error fetching product count: ", error);
		}
	};

	const router = useRouter();

	const handleViewProducts = () => {
		router.push("/dashboard/products");
	};
	const handleViewSuppliers = () => {
		router.push("/dashboard/suppliers");
	};
	const handleViewWarehouses = () => {
		router.push("/dashboard/warehouse");
	};
	const handleViewUser = () => {
		router.push("/dashboard/user");
	};
	const handleViewCategories = () => {
		router.push("/dashboard/products/categories");
	};
	const handleViewOrders = () => {
		router.push("/dashboard/orders");
	};

	const handleViewPaymentMethod = () => {
		router.push("/dashboard/payment");
	};
	const handleViewSubcategories = () => {
		router.push("/dashboard/products/subcategories");
	};

	const getSalesData = () => {
		let salesData = [];

		let annualSales = {
			title: "Annual Sales",
			value: "P" + data.annual_sales / 100,
		};

		let todaysSales = {
			title: "Today's Sales",
			value: "P" + data.todays_sales / 100,
		};

		salesData.push(annualSales);
		salesData.push(todaysSales);

		return salesData;
	};

	const getOrdersData = () => {
		let ordersData = [];

		let annualOrders = {
			title: "Annual Orders",
			value: data.total_transactions,
		};

		let todaysOrders = {
			title: "Today's Orders",
			value: data.todays_transactions,
		};

		ordersData.push(annualOrders);
		ordersData.push(todaysOrders);

		return ordersData;
	};

	// const [ws, setWs] = useState(null);

	// useEffect(() => {
	// 	const webSocket = connectToWebSocket((message) => {
	// 		console.log("Real-time message received:", message);
	// 		// Process the message here (e.g., update state or UI)

	// 		fetchHomeData();
	// 		toast.success("New order received!");
	// 	});

	// 	setWs(webSocket);

	// 	return () => {
	// 		if (webSocket && webSocket.readyState === WebSocket.OPEN) {
	// 			webSocket.close();
	// 		}
	// 	};
	// }, []);

	return (
		<DashboardLayout>
			<div style={{ display: "flex" }}>
				<Widget title="Sales Overview" width="50%" data={salesData} />
				<Widget title="Orders Overview" width="50%" data={ordersData} />
			</div>
			<div style={{ display: "flex" }}>
				{data.annual_sales_stats && <AnnualSalesGraph annualSalesData={data.annual_sales_stats} />}
				<ProductSalesGraph />
			</div>
			<ProductPerformance />
			<DashboardGrid>
				<DashboardCard>
					<Title>Total Products </Title>
					<Count>{productCount}</Count>
					<Button onClick={handleViewProducts}>View Products</Button>
				</DashboardCard>
				<DashboardCard>
					<Title>Total Supplier:</Title>
					<Count>{supplierCount}</Count>
					<Button onClick={handleViewSuppliers}>View Suppliers</Button>
				</DashboardCard>
				<DashboardCard>
					<Title>Total no of warehouse: </Title>
					<Count>{warehouseCount} </Count>
					<Button onClick={handleViewWarehouses}>View Warehouses</Button>
				</DashboardCard>
				<DashboardCard>
					<Title>Total no of user:</Title>
					<Count>{userCount}</Count>
					<Button onClick={handleViewUser}>View User</Button>
				</DashboardCard>
				<DashboardCard>
					<Title>Total no of product categories: </Title>
					<Count>{categoriesCount} </Count>
					<Button onClick={handleViewCategories}>View Categories</Button>
				</DashboardCard>
				<DashboardCard>
					<Title>Total no of orders:</Title> <Count> {TransactionCount}</Count>
					<Button onClick={handleViewOrders}>View Orders</Button>
				</DashboardCard>
				<DashboardCard>
					<Title> Total no of payment methods: </Title> <Count>{paymentCount} </Count>
					<Button onClick={handleViewPaymentMethod}>View Payment Method</Button>
				</DashboardCard>
				<DashboardCard>
					<Title>Total no of product subcategories:</Title>

					<Count>{subcategoriesCount}</Count>
					<Button onClick={handleViewSubcategories}>View Subcategories</Button>
				</DashboardCard>
			</DashboardGrid>
		</DashboardLayout>
	);
};

export default Dashboard;
