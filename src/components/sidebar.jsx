import { useState } from "react";
import styled from "styled-components";

const SidebarContainer = styled.div`
	position: fixed;
	height: 100vh;
	top: 0px;
	left: 0px;
	background-color: red;
	width: 256px;
`;

const Sidebar = () => {
	// return (
	// 	<SidebarContainer>
	// 		<h1>Sidebar</h1>
	// 	</SidebarContainer>
	// );

	const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

	const handleSubMenuToggle = () => {
		setIsSubMenuOpen(!isSubMenuOpen);
	};

	return (
		<SidebarContainer className="sidebar">
			<div className="menu-item">Menu 1</div>
			<div className="menu-item">Menu 2</div>
			<div className="menu-item with-submenu" onClick={handleSubMenuToggle}>
				Menu 3
				{isSubMenuOpen ? (
					<div className="submenu">
						<div className="submenu-item">Submenu 1</div>
						<div className="submenu-item">Submenu 2</div>
					</div>
				) : null}
			</div>
			<div className="menu-item">Menu 4</div>
		</SidebarContainer>
	);
};

export default Sidebar;
