import Sidebar from "@/components/misc/sidebar";
import styled from "styled-components";
import TopBar from "./topbar";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/globals.css";
import { WebSocketProvider } from "../context/WebsocketContext";

const DashboardRight = styled.div`
	width: 100%;
	padding-left: ${(props) => (props.$isSidebarOpen ? "256px" : "56px")};
	transition: all 0.3s ease;

	@media (max-width: 1500px) {
		padding-left: 56px;
	}

	@media (max-width: 800px) {
		padding-left: 0px;
	}
`;

const DashboardRightContainer = styled.div`
	padding: 48px;

	@media (max-width: 800px) {
		padding: 48px 5%;
	}
`;

let DashboardLayout = ({ children }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	return (
		<WebSocketProvider>
			<Sidebar setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />
			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
				className="toast-container"
			/>

			<DashboardRight $isSidebarOpen={isSidebarOpen}>
				<TopBar pageName="Products" />

				<DashboardRightContainer>{children}</DashboardRightContainer>
			</DashboardRight>
		</WebSocketProvider>
	);
};

export default DashboardLayout;
