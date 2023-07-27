import TopBar from "@/components/topbar";
import Button from "@/components/button";
import { logout } from "@/api/auth";
import { useRouter } from "next/router";
import DashboardLayout from "../../components/dashboardLayout";
import PageTitle from "@/components/pageTitle";

const Dashboard = () => {
	let router = useRouter();

	return <DashboardLayout></DashboardLayout>;
};

export default Dashboard;
