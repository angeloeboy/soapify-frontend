import { getProductsBoughtTimes } from "@/api/reports";
import DashboardLayout from "@/components/misc/dashboardLayout";
import PageTitle from "@/components/misc/pageTitle";
import BarChart from "@/components/reports/barChart";
import { useEffect, useState } from "react";

const SalesReport = () => {
	const [products, setProducts] = useState([]);

	const data = {
		labels: products.map((product) => product.product_name),
		datasets: [
			{
				label: "Times Bought",
				data: products.map((product) => product.transactions.map((transaction) => transaction.quantity).reduce((acc, curr) => acc + curr, 0)),
				backgroundColor: "rgba(75,192,192,0.4)",
				borderColor: "rgba(75,192,192,1)",
				borderWidth: 1,
			},
		],
	};

	const options = {
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	};

	useEffect(() => {
		getProductsBoughtTimes().then((res) => {
			setProducts(res.products);
		});
	}, []);
	return (
		<DashboardLayout>
			<PageTitle title="Reports" />
			<BarChart data={data} options={options} />
		</DashboardLayout>
	);
};

export default SalesReport;
