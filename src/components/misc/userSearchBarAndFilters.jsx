const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");
import { useEffect, useState } from "react";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import {
  DropdownHeader,
  DropdownItem,
  DropdownMenu,
  DropdownWrapper,
  SearchBar,
  TableControlPanel,
  Button,
} from "@/styled-components/TableControlPanel";

import PopupContentUser from "../user/addUser";

const UserSearchBarComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isPopupContenUserOpen, setIsPopupContentUserOpen] = useState(false);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, selectedCategory]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const accountTypeChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = () => {
    const category = selectedCategory;
    console.log(category);
  };
  const handleOpenPopupContenUser = () => {
    setIsPopupContentUserOpen(true);
  };
  const handleClosePopupContenUser = () => {
    setIsPopupContentUserOpen(false);
  };
  return (
    <TableControlPanel>
      <SearchBar>
        <p>Search for Account</p>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </SearchBar>
      <div>
        <p> Account Type</p>
        <AccountDropDown accountTypeChange={accountTypeChange} />
      </div>
      <div>
        <Button
          style={{ marginTop: "28px", padding: "16px 24px" }}
          onClick={handleOpenPopupContenUser}
        >
          + Add User
        </Button>
        {setIsPopupContentUserOpen && (
          <PopupContentUser onClose={handleOpenPopupContenUser} />
        )}
      </div>
    </TableControlPanel>
  );
};

const AccountDropDown = ({ handleCategoryChange }) => {
  const [isAccountDropDownOpen, setIsAccountDropDownOpen] = useState(false);
  const [isAccountStatusDropDownOpen, setIsAccountStatusDropDownOpen] =
    useState(false);
  const [selectedItem, setSelectedItem] = useState("All");

  return (
    <DropdownWrapper
      onClick={() => setIsAccountDropDownOpen(!isAccountDropDownOpen)}
    >
      <DropdownHeader>
        <FontAwesomeIcon icon={faFilter} />
        {selectedItem}
      </DropdownHeader>
      <DropdownMenu isAccountDropDownOpen={isAccountDropDownOpen}>
        <DropdownItem
          key={0}
          onClick={() => {
            setSelectedItem("All");
            setIsAccountDropDownOpen(false);
            handleCategoryChange("All");
          }}
        >
          All
        </DropdownItem>

        <DropdownItem
          onClick={() => {
            setSelectedItem(option.name);
            setIsAccountDropDownOpen(false);
            handleCategoryChange(option.name);
          }}
        ></DropdownItem>
      </DropdownMenu>
    </DropdownWrapper>
  );
};

export default UserSearchBarComponent;
