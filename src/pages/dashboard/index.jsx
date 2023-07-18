import TopBar from "@/components/topbar";
import Button from "@/components/button";
import { logout } from "@/api/auth";
import { useRouter } from "next/router";
import DashboardLayout from "../../components/dashboardLayout";

const Dashboard = () => {
	let router = useRouter();

	return (
		<DashboardLayout>
			<TopBar pageName="Home" />
			{/* <Button
				onClick={() => {
					logout()
						.then((res) => {
							console.log(res);
						})
						.then(() => {
							router.push("/login");
						});
				}}
			>
				Log out{" "}
			</Button> */}
		</DashboardLayout>
	);
};

export default Dashboard;
