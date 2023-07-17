import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  height: 100vh;
  top: 0px;
  left: 0px;
  background-color: white;
  width: 256px;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
  margin-top: 20px;
`;

const Line = styled.div`
  position: relative;
  margin-bottom: 8px;
  width: 80%;
  height: 1px;
  background-color: lightgray;
  left: -5px;
  right: -5px;
`;

const Spacer = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
`;

const Menu = styled.div`
  margin-left: 5px;
  padding: 8px;
  cursor: pointer;
`;

const SubMenu = styled.div`
  margin-left: 25px;
`;

const Sidebar = () => {
  const initialSubmenuState = Array(3).fill(false);

  const [submenuOpen, setSubmenuOpen] = useState(initialSubmenuState);

  const handleSubMenuToggle = (index) => {
    setSubmenuOpen((prevState) =>
      prevState.map((isOpen, i) => (i === index ? !isOpen : isOpen))
    );
  };

  return (
    <SidebarContainer className="sidebar">
      <h1>SOAPIFY</h1>
      <Line />
      <Spacer />
      <MenuContainer>
        <Menu className="home-menu">
          <FontAwesomeIcon icon={faHouse} />
          Home
        </Menu>
        <Menu
          className="pos-with with-submenu"
          onClick={() => handleSubMenuToggle(0)}
        >
          <FontAwesomeIcon icon={faHouse} />
          POS
          {submenuOpen[0] && (
            <SubMenu>
              <div className="pos-sub-possytem">POS System</div>
              <div className="pos-sub-sales">Sales</div>
            </SubMenu>
          )}
        </Menu>
        <Menu
          className="inventory-menu with-submenu"
          onClick={() => handleSubMenuToggle(1)}
        >
          <FontAwesomeIcon icon={faHouse} />
          Inventory
          {submenuOpen[1] && (
            <SubMenu>
              <div className="inventory-sub-products">Products</div>
              <div className="inventory-sub-purchase-orders">
                Purchase Orders
              </div>
              <div className="inventory-sub-returns">Returns</div>
            </SubMenu>
          )}
        </Menu>
        <Menu
          className="settings-menu with-submenu"
          onClick={() => handleSubMenuToggle(2)}
        >
          <FontAwesomeIcon icon={faHouse} />
          Settings
          {submenuOpen[2] && (
            <SubMenu>
              <div className="settings-sub-users">Users</div>
            </SubMenu>
          )}
        </Menu>
      </MenuContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
