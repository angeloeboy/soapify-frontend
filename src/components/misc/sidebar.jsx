import { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

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
		border-bottom: 1px solid #ffffff27;
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
	/* padding-left: 5px; */
`;

const Menu = styled.div`
	font-weight: 400;
	color: white !important;
	align-items: center;
	margin: 10px;
	padding: 10px 0;
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
		background-color: #1a68f08c;
		padding: 8px 5px 8px 5px;
		border-radius: 10px;
		transition: all 0.3s ease;
		background-color: ${({ isOpen }) => (isOpen ? "" : "transparent")};
		&:hover {
			background-color: #1a69f0;
		}
		&.active {
			border: 1px solid black;
			background-color: #1a69f0;
		}
	}
`;

const SubMenu = styled.div`
	display: block;
	margin-top: 5px;

	a {
		padding: 5px 10px 5px 40px;
		display: block;
		color: #ffffffaf;
		transition: all 0.3s ease;
		background-color: transparent;
		text-decoration: none;
		margin-left: 16px;
		margin-top: 24px;
		margin-bottom: 24px;
		font-size: 16px;
		border-radius: 25px;
		position: relative;
		&:before {
			content: "";
			position: absolute;
			left: 12px;
			top: 50%;
			width: 12px;
			height: 12px;
			background-color: #1a69f0;
			border-radius: 50%;
			transform: translateY(-50%);
			opacity: 0;
			transition: all 0.3s ease;
		}
		&:hover {
			&:before {
				opacity: 1;
			}
		}

		&.active {
			color: white;
			&:before {
				opacity: 1;
			}
		}
	}
`;
// SIDEBAR DATA
const sidebarData = [
	{
		title: "Home",
		icon: "/home-icon.png",
		link: "/",
		hasSubmenu: false,
	},
	{
		title: "POS",
		icon: "/pos-icon.png",
		link: "/dashboard/pos",
		hasSubmenu: true,
		submenus: [
			{ title: "POS System", link: "/dashboard/pos" },
			{ title: "Sales", link: "/" },
		],
	},
	{
		title: "Inventory",
		icon: "/inventory-icon.png",
		link: "/dashboard/products",
		hasSubmenu: true,
		submenus: [
			{ title: "Products List", link: "/dashboard/products" },
			{ title: "Categories", link: "/dashboard" },
			{ title: "Statistics", link: "/" },
		],
	},
	{
		title: "Settings",
		icon: "/settings-icon.png",
		link: "/settings",
		hasSubmenu: false,
	},
];

const Sidebar = (props) => {
	const [submenuOpen, setSubmenuOpen] = useState(Array(sidebarData.length).fill(false));

	const [sidebarVisible, setSidebarVisible] = useState(true);
	const [activeMenuIndex, setActiveMenuIndex] = useState(-1);
	const [activeSubmenuItemIndex, setActiveSubmenuItemIndex] = useState(-1);

	//basically you just didnt saved and fetched the activeSubmenuItemIndex
	//for styling look for line 97
  
	useEffect(() => {
		const storedActiveMenuIndex = localStorage.getItem("activeMenuIndex");
		if (storedActiveMenuIndex !== null) {
			setActiveMenuIndex(parseInt(storedActiveMenuIndex));
		}

		const storedSubmenuState = localStorage.getItem("submenuOpen");
		if (storedSubmenuState !== null) {
			setSubmenuOpen(JSON.parse(storedSubmenuState));
		}

		//this code gets which index is active in the submenu
		const storedactiveSubmenuItemIndex = localStorage.getItem("activeSubmenuItemIndex");
		console.log(storedactiveSubmenuItemIndex);
		if (storedactiveSubmenuItemIndex !== null) {
			setActiveSubmenuItemIndex(parseInt(storedactiveSubmenuItemIndex));
		}
	}, []);

	const handleToggleSidebar = () => {
		setSidebarVisible((prevVisible) => !prevVisible);
		props.setIsSidebarOpen(!sidebarVisible);
	};

	const handleSubMenuToggle = (index) => {
		if (index === activeMenuIndex) {
			setSubmenuOpen((prevState) => prevState.map((isOpen, i) => (i === index ? !isOpen : false)));
		} else {
			setActiveMenuIndex(index);
			setSubmenuOpen((prevState) => prevState.map((_, i) => i === index));
			setActiveSubmenuItemIndex(-1); // Reset the active submenu index
		}
	};

	useEffect(() => {
		localStorage.setItem("activeMenuIndex", activeMenuIndex.toString());
		localStorage.setItem("submenuOpen", JSON.stringify(submenuOpen));

		//this code saves which index is active in the submenu
		localStorage.setItem("activeSubmenuItemIndex", JSON.stringify(activeSubmenuItemIndex));
	}, [activeMenuIndex, submenuOpen, activeSubmenuItemIndex]);

	return (
		<div>
			<SidebarContainer visible={sidebarVisible}>
				<ToggleButton visible={sidebarVisible} onClick={handleToggleSidebar}>
					{sidebarVisible ? (
						<Image src="/toggle-sidebar-icon.png" alt="Close Sidebar" width="50" height="50" />
					) : (
						<Image src="/toggle-sidebar-icon.png" alt="Open Sidebar" width="50" height="50" />
					)}
				</ToggleButton>
				<h1>SOAPIFY</h1>
				<MenuContainer>
					{sidebarData.map((menuItem, index) => (
						<Menu key={index} active>
							<div className={`menuTextContainer ${activeMenuIndex === index ? "active" : ""}`} onClick={() => handleSubMenuToggle(index)}>
								<Image src={menuItem.icon} alt={menuItem.title} width="24" height="24" />
								{menuItem.title}
							</div>
							{menuItem.hasSubmenu && submenuOpen[index] && (
								<SubMenu>
									{menuItem.submenus.map((submenuItem, subIndex) => (
										<Link
											key={subIndex}
											href={submenuItem.link}
											className={activeSubmenuItemIndex === subIndex ? "active" : ""}
											onClick={() => setActiveSubmenuItemIndex(subIndex)}
										>
											{submenuItem.title}
										</Link>
									))}
								</SubMenu>
							)}
						</Menu>
					))}
				</MenuContainer>
			</SidebarContainer>
		</div>
	);
};

export default Sidebar;
