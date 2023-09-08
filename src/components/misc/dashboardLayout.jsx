import Sidebar from "@/components/misc/sidebar";
import styled from "styled-components";
import TopBar from "./topbar";
import { useState } from "react";

const DashboardRight = styled.div`
	width: 100%;
	padding-left: ${(props) => (props.isSidebarOpen ? "256px" : "56px")};
	transition: all 0.3s ease;
`;

const DashboardRightContainer = styled.div`
	padding: 48px;
`;

let DashboardLayout = ({ children }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	return (
		<>
			<Sidebar setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />

			<DashboardRight isSidebarOpen={isSidebarOpen}>
				<TopBar pageName="Products" />
				<DashboardRightContainer>{children}</DashboardRightContainer>
			</DashboardRight>
		</>
	);
};

export default DashboardLayout;
