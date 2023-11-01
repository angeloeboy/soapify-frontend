import { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import { logout } from "@/api/auth";

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 256px;
  background-color: rgba(0, 32, 86, 1);
  padding: 20px; /* Add some padding to give space for the button */
  transition: all 0.3s ease;
  transform: ${({ $visible }) =>
    !$visible ? "translateX(-100%)" : "translateX(0)"};
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
const sidebarData = [
  {
    title: "Dashboard",
    icon: "/home-icon.png",
    link: "/dashboard",
    hasSubmenu: true,
    submenus: [
      { title: "POS", link: "/dashboard/pos" },
      { title: "Sales Overview", link: "/" },
      { title: "Orders", link: "/dashboard/orders" },
      { title: "Returns", link: "/dashboard/returns" },
      { title: "Refunds", link: "/dashboard/refunds" },
      { title: "Promos", link: "/dashboard/promos" },
    ],
  },

  {
    title: "Inventory",
    icon: "/inventory-icon.png",
    link: "/dashboard/products",
    hasSubmenu: true,
    submenus: [
      { title: "Products List", link: "/dashboard/products" },
      { title: "Inventory List", link: "/dashboard/inventory" },
      { title: "Categories", link: "/dashboard/products/categories" },
      { title: "Suppliers", link: "/dashboard/suppliers" },
      { title: "Subcategories", link: "/dashboard/products/subcategories" },
      { title: "Attributes", link: "/dashboard/attributes" },
      { title: "Shelving", link: "/dashboard/shelving" },
    ],
  },
  {
    title: "Settings",
    icon: "/settings-icon.png",
    link: "/settings",
    hasSubmenu: true,
    submenus: [
      { title: "Users", link: "/dashboard/user" },
      { title: "Warehouse", link: "/dashboard/warehouse" },
      { title: "Payment Methods", link: "/dashboard/payment" },
    ],
  },
];

const Sidebar = (props) => {
  // Initialize sidebar state
  const [sidebarState, setSidebarState] = useState({
    submenuOpen: Array(sidebarData.length).fill(false),
    sidebarVisible: true,
    activeMenuIndex: -1,
    activeSubmenuItemIndex: -1,
  });

  const {
    submenuOpen,
    sidebarVisible,
    activeMenuIndex,
    activeSubmenuItemIndex,
  } = sidebarState;
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  // Load previous state from localStorage on component mount
  useEffect(() => {
    const storedSidebarState = JSON.parse(localStorage.getItem("sidebarState"));

    if (storedSidebarState) {
      setSidebarState((prevState) => ({
        ...prevState,
        ...storedSidebarState,
      }));
    }
  }, []);

  // Toggle the sidebar's visibility
  const handleToggleSidebar = () => {
    props.setIsSidebarOpen(!props.isSidebarOpen);
    console.log("test");
  };

  // Toggle submenu open/close and manage active indices
  const handleSubMenuToggle = (index) => {
    setSidebarState((prevState) => {
      const newSubmenuOpen = prevState.submenuOpen.map((isOpen, i) =>
        i === index ? !isOpen : false
      );
      return {
        ...prevState,
        activeMenuIndex: index,
        submenuOpen: newSubmenuOpen,
        activeSubmenuItemIndex: -1, // Reset the active submenu index
      };
    });
  };

  // Update localStorage when state changes
  useEffect(() => {
    localStorage.setItem("sidebarState", JSON.stringify(sidebarState));
  }, [sidebarState]);

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
            <Image
              src="/toggle-sidebar-icon.png"
              alt="Close Sidebar"
              width="50"
              height="50"
            />
          ) : (
            <Image
              src="/toggle-sidebar-icon.png"
              alt="Open Sidebar"
              width="50"
              height="50"
            />
          )}
        </ToggleButton>
        <h1>SOAPIFY</h1>
        <MenuContainer>
          {sidebarData.map((menuItem, index) =>
            menuItem.hasSubmenu ? (
              <Menu key={index}>
                <div
                  className={`menuTextContainer ${
                    activeMenuIndex === index ? "active" : ""
                  }`}
                  onClick={() => handleSubMenuToggle(index)}
                >
                  <Image
                    src={menuItem.icon}
                    alt={menuItem.title}
                    width="24"
                    height="24"
                  />
                  {menuItem.title}
                </div>
                {menuItem.hasSubmenu && submenuOpen[index] && (
                  <SubMenu>
                    {menuItem.submenus.map((submenuItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={submenuItem.link}
                        className={
                          activeSubmenuItemIndex === subIndex ? "active" : ""
                        }
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
                  className={`menuTextContainer ${
                    activeMenuIndex === index ? "active" : ""
                  }`}
                  onClick={() => handleSubMenuToggle(index)}
                >
                  <Image
                    src={menuItem.icon}
                    alt={menuItem.title}
                    width="24"
                    height="24"
                  />
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
              <Image
                src="/inventory-icon.png"
                alt="/inventory-icon.png"
                width="24"
                height="24"
              />
              Log out
              {isLoggingOut && (
                <Image
                  src="/loading.svg"
                  alt="loading"
                  width="24"
                  height="24"
                  className="loading"
                />
              )}
            </p>
          </Menu>
        </MenuContainer>
      </SidebarContainer>
    </div>
  );
};

export default Sidebar;
