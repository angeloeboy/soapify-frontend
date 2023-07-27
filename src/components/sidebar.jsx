import { useState } from "react";
import styled from "styled-components";

const SidebarContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 256px;
	background-color: rgba(0, 32, 86, 1);
	padding: 20px; /* Add some padding to give space for the button */
	transition: all 0.3s ease;
	transform: ${({ visible }) => (visible ? "translateX(0px)" : "translateX(-100%)")};
	flex-direction: column;

	h1 {
		/* font-family: DM Sans; */
		color: white;
		text-align: center;
		margin-bottom: 20px;
	}
`;

const ToggleButton = styled.button`
	position: absolute;
	transform: translate(100%);
	top: 0px;
	right: 0px;
	border: none;
	background-color: white;
	cursor: pointer;
	transition: left 0.3s ease;
`;

const MenuContainer = styled.div`
	color: white;
	justify-content: flex-start;
	align-items: center;
	flex-grow: 1;
	/* margin-top: 80px; */
	width: 100%;
	padding-left: 5px;

	:hover {
		background-color: #0141ae;

		transition: 0.3s;
	}
	:active {
		background-color: rgba(26, 105, 240, 1);
		transition: 0.05s;
	}
`;

const Line = styled.div`
	position: relative;
	margin-bottom: 8px;
	padding-left: 10px;
	width: 100%;
	height: 1px;
	background-color: #d3d3d312;
`;

const Menu = styled.div`
	color: white;
	align-items: center;
	margin-left: 5px;
	padding: 8px 0;
	cursor: pointer;
	position: relative;
	/* display: flex; */

	img {
		margin-right: 13px;
		padding: 0px;
		vertical-align: middle;
		display: inline-block;
	}
`;

const SubMenu = styled.div`
	margin-left: 50px;
	display: block;
	/* width: 100%; */
	/* color: white; */
	p {
		color: white;
	}
`;

const Sidebar = () => {
	const initialSubmenuState = Array(3).fill(false);
	const [submenuOpen, setSubmenuOpen] = useState(initialSubmenuState);
	const [sidebarVisible, setSidebarVisible] = useState(true);

	const handleToggleSidebar = () => {
		setSidebarVisible((prevVisible) => !prevVisible);
	};

	const handleSubMenuToggle = (index) => {
		setSubmenuOpen((prevState) => prevState.map((isOpen, i) => (i === index ? !isOpen : isOpen)));
	};

	return (
		<div>
			<SidebarContainer visible={sidebarVisible}>
				<ToggleButton visible={sidebarVisible} onClick={handleToggleSidebar}>
					{sidebarVisible ? <img src="/toggle-sidebar-icon.png" alt="Close Sidebar" /> : <img src="/toggle-sidebar-icon.png" alt="Open Sidebar" />}
				</ToggleButton>
				<h1>SOAPIFY</h1>
				<Line />

				<MenuContainer>
					<Menu>
						<img src="/home-icon.png" alt="Home" />
						Home
					</Menu>

					<Menu onClick={() => handleSubMenuToggle(0)}>
						<img src="/pos-icon.png" alt="Home" />
						POS
						{submenuOpen[0] && (
							<SubMenu>
								<p>POS System</p>
								<p>Sales</p>
							</SubMenu>
						)}
					</Menu>

					<Menu onClick={() => handleSubMenuToggle(1)}>
						<img src="/inventory-icon.png" alt="Home" />
						Inventory
						{submenuOpen[1] && (
							<SubMenu>
								<p>Products</p>
								<p>Purchase Orders</p>
								<p>Returns</p>
							</SubMenu>
						)}
					</Menu>
					<Menu onClick={() => handleSubMenuToggle(2)}>
						<img src="/settings-icon.png" alt="Home" />
						Settings
						{submenuOpen[2] && (
							<SubMenu>
								<p>Users</p>
							</SubMenu>
						)}
					</Menu>
				</MenuContainer>
			</SidebarContainer>
		</div>
	);
};

export default Sidebar;
