import Sidebar from "./../components/sidebar";
import { styled } from "styled-components";

const DashboardContainer = styled.div`
	height: 200vh;
`;

const Dashboard = () => {
	return (
		<DashboardContainer>
			<h1>This is Dashboard</h1>
			<Sidebar />
		</DashboardContainer>
	);
};

export default Dashboard;
