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
  display: flex;
  align-items: center;
  margin-left: 5px;
  padding: 8px 0;
  cursor: pointer;
  position: relative;

  /* Add margin to the FontAwesomeIcon to create the gap */
  & > svg {
    margin-right: 8px; /* Adjust this value to control the gap size */
  }
`;

const SubMenu = styled.div`
  margin-left: 25px;
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
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
    <SidebarContainer>
      <h1>SOAPIFY</h1>
      <Line />
      <Spacer />
      <MenuContainer>
        <Menu>
          <FontAwesomeIcon icon={faHouse} />
          Home
        </Menu>
        <Menu onClick={() => handleSubMenuToggle(0)}>
          <FontAwesomeIcon icon={faHouse} />
          POS
          {submenuOpen[0] && (
            <SubMenu>
              <div>POS System</div>
              <div>Sales</div>
            </SubMenu>
          )}
        </Menu>
        <Menu onClick={() => handleSubMenuToggle(1)}>
          <FontAwesomeIcon icon={faHouse} />
          Inventory
          {submenuOpen[1] && (
            <SubMenu>
              <div>Products</div>
              <div>Purchase Orders</div>
              <div>Returns</div>
            </SubMenu>
          )}
        </Menu>
        <Menu onClick={() => handleSubMenuToggle(2)}>
          <FontAwesomeIcon icon={faHouse} />
          Settings
          {submenuOpen[2] && (
            <SubMenu>
              <div>Users</div>
            </SubMenu>
          )}
        </Menu>
      </MenuContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
