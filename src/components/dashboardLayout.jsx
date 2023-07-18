import Sidebar from "@/components/sidebar";
import styled from "styled-components";

const DashboardRight = styled.div`
	width: 100%;
	padding-left: 280px;
`;

let DashboardLayout = ({ children }) => {
	return (
		<>
			<Sidebar />

			<DashboardRight>{children}</DashboardRight>
		</>
	);
};

export default DashboardLayout;
