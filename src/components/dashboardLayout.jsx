import Sidebar from "@/components/sidebar";

let DashboardLayout = ({ children }) => {
	return (
		<>
			<Sidebar />
			<div>{children}</div>
		</>
	);
};

export default DashboardLayout;
