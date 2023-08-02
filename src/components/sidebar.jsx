import { useState, useEffect } from "react";
import styled from "styled-components";
// import React, { useState, useEffect } from "react";
// import {  } from "react";
import Link from "next/link";

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

	width: 100%;
	padding-left: 5px;
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
	font-weight: 400;
	color: white !important;
	align-items: center;
	margin: 8px;
	padding: 8px 0;
	cursor: pointer;
	position: relative;

	img {
		margin-right: 13px;
		padding: 0px;
		vertical-align: middle;
		display: inline-block;
	}

	.menuTextContainer {
		color: white;
		background-color: ${({ isOpen }) => (isOpen ? "rgba(26, 105, 240, 1)" : "transparent")};
		&:hover {
			background-color: rgba(26, 105, 240, 1);
		}
		&.active {
			background-color: #ffbb00;
		}
	}
`;

const SubMenu = styled.div`
	display: block;
	a {
		margin: 8px;
		padding-left: 40px;
		display: block;
		color: white;
		transition: all 0.3s ease;

		&:hover {
			background-color: #0c3885;
			text-decoration: none;
		}
	}
	/* Updated part: Apply background color for the active submenu */
	background-color: ${({ isOpen }) => (isOpen ? "#1af045" : "transparent")};
	/* .linkTextContainer {
    background-color: ${({ isOpen }) => (isOpen ? "rgba(26, 105, 240, 1)" : "transparent")};
    &.active {
      background-color: #00ffa6;
    }
  } */
`;

const Sidebar = (props) => {
	const initialSubmenuState = [false, false, false, false];
	const [submenuOpen, setSubmenuOpen] = useState(initialSubmenuState);
	const [sidebarVisible, setSidebarVisible] = useState(true);
	const [activeMenuIndex, setActiveMenuIndex] = useState(-1);

	// Load active menu index and submenu state from local storage on component mount
	useEffect(() => {
		const storedActiveMenuIndex = localStorage.getItem("activeMenuIndex");
		if (storedActiveMenuIndex !== null) {
			setActiveMenuIndex(parseInt(storedActiveMenuIndex));
		}

		const storedSubmenuState = localStorage.getItem("submenuOpen");
		if (storedSubmenuState !== null) {
			setSubmenuOpen(JSON.parse(storedSubmenuState));
		}
	}, []);

	// Toggle SideBar
	const handleToggleSidebar = () => {
		setSidebarVisible((prevVisible) => !prevVisible);
		props.setIsSidebarOpen(!sidebarVisible);
	};

	// Toggle SubmenuState
	const handleSubMenuToggle = (index) => {
		if (index === activeMenuIndex) {
			// Clicked on the currently active menu, so toggle its submenu
			setSubmenuOpen((prevState) => prevState.map((isOpen, i) => (i === index ? !isOpen : isOpen)));
		} else {
			// Clicked on a different menu item, set it as active and open its submenu
			setActiveMenuIndex(index);
			setSubmenuOpen((prevState) => prevState.map((isOpen, i) => (i === index ? true : false)));
		}
	};

	// Save active menu index and submenu state to local storage whenever they change
	useEffect(() => {
		localStorage.setItem("activeMenuIndex", activeMenuIndex.toString());
		localStorage.setItem("submenuOpen", JSON.stringify(submenuOpen));
	}, [activeMenuIndex, submenuOpen]);

	return (
		<div>
			<SidebarContainer visible={sidebarVisible}>
				<ToggleButton visible={sidebarVisible} onClick={handleToggleSidebar}>
					{sidebarVisible ? <img src="/toggle-sidebar-icon.png" alt="Close Sidebar" /> : <img src="/toggle-sidebar-icon.png" alt="Open Sidebar" />}
				</ToggleButton>
				<MenuContainer>
					<Menu>
						<div className={`menuTextContainer ${activeMenuIndex === -1 ? "active" : ""}`} onClick={() => handleSubMenuToggle(-1)}>
							<img src="/home-icon.png" alt="Home" />
							Home
						</div>
					</Menu>

					<Menu>
						<div className={`menuTextContainer ${activeMenuIndex === 0 ? "active" : ""}`} onClick={() => handleSubMenuToggle(0)}>
							<img src="/pos-icon.png" alt="Home" />
							POS
						</div>

						{submenuOpen[0] && (
							<SubMenu>
								<Link href="/">POS System</Link>
								<Link href="/">Sales</Link>
							</SubMenu>
						)}
					</Menu>

					<Menu>
						<div className={`menuTextContainer ${activeMenuIndex === 1 ? "active" : ""}`} onClick={() => handleSubMenuToggle(1)}>
							<img src="/inventory-icon.png" alt="Home" />
							Inventory
						</div>

						{submenuOpen[1] && (
							<SubMenu>
								<Link href="/dashboard/products">Products</Link>
								<Link href="/">Purchase Orders</Link>
								<Link href="/">Returns</Link>
							</SubMenu>
						)}
					</Menu>
					<Menu>
						<div className={`menuTextContainer ${activeMenuIndex === 2 ? "active" : ""}`} onClick={() => handleSubMenuToggle(2)}>
							<img src="/settings-icon.png" alt="Home" />
							Settings
						</div>

						{submenuOpen[2] && (
							<SubMenu>
								<Link href="/">Users</Link>
							</SubMenu>
						)}
					</Menu>
				</MenuContainer>
			</SidebarContainer>
		</div>
	);
};

export default Sidebar;
