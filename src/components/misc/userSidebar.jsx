import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { logout } from "@/api/auth";
import { usePermissions } from "../context/PermissionsContext";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppContext } from "../context/AppContext";
import { useUserAppContext } from "../context/UserAppContext";

const SidebarContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 256px;
	background-color: rgba(0, 32, 86, 1);
	padding: 20px; /* Add some padding to give space for the button */
	transition: all 0.3s ease;
	transform: ${({ $visible }) => (!$visible ? "translateX(-100%)" : "translateX(0)")};
	flex-direction: column;
	z-index: 101;
	h1 {
		color: white;
		text-align: center;
		margin-bottom: 20px;
		border-bottom: 1px solid #ffffff27;
	}

	.loading {
		margin-left: 16px;
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
	position: absolute;
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
	color: white;
	justify-content: flex-start;
	align-items: center;
	flex-grow: 1;

	width: 100%;
	/* padding-left: 5px; */
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
		display: block;
		text-decoration: none;
		&:hover {
			background-color: #1a69f0;
		}
		&.active {
			border: 1px solid black;
			background-color: #1a69f0;
		}
		display: flex;
		align-items: center;

		span {
			margin-right: 10%;
			margin-left: auto;
			svg {
				transform: rotate(-90deg);
				path: {
					color: #0a48b3;
				}
			}
			&.active {
				svg {
					transform: rotate(0deg);
				}
			}
		}
	}
`;

const SubMenu = styled.div`
	display: block;
	margin-top: 5px;
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

const UserSidebar = (props) => {
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	const { sidebarState, setSidebarState, sidebarData } = useUserAppContext();

	const { submenuOpen, sidebarVisible, activeMenuIndex, activeSubmenuItemIndex } = sidebarState;

	// Toggle the sidebar's visibility
	const handleToggleSidebar = () => {
		props.setIsSidebarOpen(!props.isSidebarOpen);
	};

	// Toggle submenu open/close and manage active indices
	const handleSubMenuToggle = (index) => {
		setSidebarState((prevState) => {
			const newSubmenuOpen = prevState.submenuOpen.map((isOpen, i) => (i === index ? !isOpen : false));
			return {
				...prevState,
				activeMenuIndex: index,
				submenuOpen: newSubmenuOpen,
				activeSubmenuItemIndex: -1, // Reset the active submenu index
			};
		});
	};

	const handleLogout = async () => {
		setIsLoggingOut(true);
		await logout();

		setTimeout(() => {
			window.location.href = "/login";
		}, 1000);
	};

	return (
		<div>
			<SidebarContainer $visible={props.isSidebarOpen}>
				<ToggleButton onClick={handleToggleSidebar}>
					{sidebarVisible ? (
						<Image src="/toggle-sidebar-icon.png" alt="Close Sidebar" width="50" height="50" />
					) : (
						<Image src="/toggle-sidebar-icon.png" alt="Open Sidebar" width="50" height="50" />
					)}
				</ToggleButton>
				<h1>SOAPIFY</h1>
				<MenuContainer>
					{sidebarData.map((menuItem, index) =>
						menuItem.hasSubmenu ? (
							<Menu key={index}>
								<div className={`menuTextContainer ${activeMenuIndex === index ? "active" : ""}`} onClick={() => handleSubMenuToggle(index)}>
									<Image src={menuItem.icon} alt={menuItem.title} width="24" height="24" />
									{menuItem.title}

									<span className={`${activeMenuIndex === index && menuItem.hasSubmenu && submenuOpen[index] ? "active" : ""}`}>
										<FontAwesomeIcon icon={faChevronDown} />
									</span>
								</div>
								{menuItem.hasSubmenu && submenuOpen[index] && (
									<SubMenu>
										{menuItem.submenus.map((submenuItem, subIndex) => (
											<Link
												key={subIndex}
												href={submenuItem.link}
												className={activeSubmenuItemIndex === subIndex ? "active" : ""}
												onClick={() =>
													setSidebarState((prevState) => ({
														...prevState,
														activeSubmenuItemIndex: subIndex,
													}))
												}
											>
												{submenuItem.title}
											</Link>
										))}
									</SubMenu>
								)}
							</Menu>
						) : (
							<Menu key={index}>
								<Link
									href={menuItem.link}
									className={`menuTextContainer ${activeMenuIndex === index ? "active" : ""}`}
									onClick={() => handleSubMenuToggle(index)}
								>
									<Image src={menuItem.icon} alt={menuItem.title} width="24" height="24" />
									{menuItem.title}
								</Link>
							</Menu>
						)
					)}

					<Menu>
						<p
							className={`menuTextContainer `}
							onClick={() => {
								handleLogout();
							}}
						>
							<Image src="/inventory-icon.png" alt="/inventory-icon.png" width="24" height="24" />
							Log out
							{isLoggingOut && <Image src="/loading.svg" alt="loading" width="24" height="24" className="loading" />}
						</p>
					</Menu>
				</MenuContainer>
			</SidebarContainer>
		</div>
	);
};

export default UserSidebar;
