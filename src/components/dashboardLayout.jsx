import Sidebar from "@/components/sidebar";
import styled from "styled-components";
import TopBar from "./topbar";

const DashboardRight = styled.div`
	width: 100%;
	padding-left: 256px;
	/* padding-right: 2%; */
`;

const DashboardRightContainer = styled.div`
	padding: 48px;
`;

let DashboardLayout = ({ children }) => {
	return (
		<>
			<Sidebar />

			<DashboardRight>
				<TopBar pageName="Products" />
				<DashboardRightContainer>{children}</DashboardRightContainer>
			</DashboardRight>
		</>
	);
};

export default DashboardLayout;
