import { useRouter } from "next/router";
import DashboardLayout from "@/components/misc/dashboardLayout";
import { useEffect, useState } from "react";
import { getHomeData } from "@/api/home";

const Dashboard = () => {
	const [data, setData] = useState({});
	useEffect(() => {
		fetchHomeData();
	}, []);

	const fetchHomeData = async () => {
		const homeData = await getHomeData();
		console.log(homeData);
		setData(homeData.data);
	};
	return (
		<DashboardLayout>
			<p>Total Transactions: </p>
			<p>{data.total_transactions}</p>

			<p>Todays Transactions: </p>
			<p>{data.todays_transactions && data.todays_transactions.length}</p>
		</DashboardLayout>
	);
};

export default Dashboard;
