import { useState } from "react";
import styled from "styled-components";

const SidebarContainer = styled.div`
  position: fixed;
  height: 100vh;
  top: 0px;
  left: 0px;
  background-color: lightblue;
  width: 256px;
`;

const Menu = styled.div`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: lightgray;
  }
`;

const SubMenu = styled.div`
  margin-left: 16px;
`;

const Sidebar = () => {
  const [isPosSubMenuOpen, setIsPosSubMenuOpen] = useState(false);
  const [isInventorySubMenuOpen, setIsInventorySubMenuOpen] = useState(false);
  const [isSettingsSubMenuOpen, setIsSettingsSubMenuOpen] = useState(false);

  const handlePosSubMenuToggle = () => {
    setIsPosSubMenuOpen(!isPosSubMenuOpen);
  };

  const handleInventorySubMenuToggle = () => {
    setIsInventorySubMenuOpen(!isInventorySubMenuOpen);
  };

  const handleSettingsSubMenuToggle = () => {
    setIsSettingsSubMenuOpen(!isSettingsSubMenuOpen);
  };

  return (
    <SidebarContainer className="sidebar">
      <h1>SOAPIFY</h1>
      <Menu className="home-menu">Home</Menu>
      <Menu className="pos-with with-submenu" onClick={handlePosSubMenuToggle}>
        POS
        {isPosSubMenuOpen && (
          <SubMenu>
            <div className="pos-sub-sales">Sales</div>
          </SubMenu>
        )}
      </Menu>
      <Menu
        className="inventory-menu with-submenu"
        onClick={handleInventorySubMenuToggle}
      >
        Inventory
        {isInventorySubMenuOpen && (
          <SubMenu>
            <div className="inventory-sub-products">Products</div>
            <div className="inventory-sub-purchase-orders">Purchase Orders</div>
            <div className="inventory-sub-returns">Returns</div>
          </SubMenu>
        )}
      </Menu>
      <Menu
        className="settings-menu with-submenu"
        onClick={handleSettingsSubMenuToggle}
      >
        Settings
        {isSettingsSubMenuOpen && (
          <SubMenu>
            <div className="settings-sub-users">Users</div>
          </SubMenu>
        )}
      </Menu>
    </SidebarContainer>
  );
};

export default Sidebar;
