import TopBar from "@/components/topbar";
import { withAuth } from "./../../hoc/withAuth.hoc";
import Button from "@/components/button";
import { logout } from "@/api/auth";
import { useRouter } from "next/router";

const Dashboard = () => {
	let router = useRouter();
    
	return (
		<div>
			<TopBar pageName="Home" />
			<Button
				onClick={() => {
					logout().then(() => {
						router.push("/login");
					});
				}}
			>
				Log out{" "}
			</Button>
		</div>
	);
};

export default withAuth(Dashboard);
