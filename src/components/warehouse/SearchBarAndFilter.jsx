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

import PopupContentWarehouse from "./addWarehouse"; // Import the warehouse popup component

const WarehouseSearchBarComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isPopupContentWarehouseOpen, setIsPopupContentWarehouseOpen] = useState(false);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, selectedCategory]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const warehouseTypeChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = () => {
    const category = selectedCategory;
    console.log(category);
  };

  const handleOpenPopupContentWarehouse = () => {
    setIsPopupContentWarehouseOpen(true);
  };

  const handleClosePopupContentWarehouse = () => {
    setIsPopupContentWarehouseOpen(false);
  };

  return (
    <TableControlPanel>
      <SearchBar>
        <p>Search for Warehouse</p>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </SearchBar>
      <div>
        <p>Warehouse Location</p>
        <WarehouseDropDown warehouseTypeChange={warehouseTypeChange} />
      </div>
      <div>
        <Button
          style={{ marginTop: "28px", padding: "16px 24px" }}
          onClick={handleOpenPopupContentWarehouse}
        >
          + Add Warehouse
        </Button>
        {isPopupContentWarehouseOpen && (
          <PopupContentWarehouse onClose={handleClosePopupContentWarehouse} />
        )}
      </div>
    </TableControlPanel>
  );
};

const WarehouseDropDown = ({ warehouseTypeChange }) => {
  const [isWarehouseDropDownOpen, setIsWarehouseDropDownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("All");

  return (
    <DropdownWrapper
      onClick={() => setIsWarehouseDropDownOpen(!isWarehouseDropDownOpen)}
    >
      <DropdownHeader>
        <FontAwesomeIcon icon={faFilter} />
        {selectedItem}
      </DropdownHeader>
      <DropdownMenu isWarehouseDropDownOpen={isWarehouseDropDownOpen}>
        <DropdownItem
          key={0}
          onClick={() => {
            setSelectedItem("All");
            setIsWarehouseDropDownOpen(false);
            warehouseTypeChange("All");
          }}
        >
          All
        </DropdownItem>

        {/* Add other warehouse types as DropdownItems */}
      </DropdownMenu>
    </DropdownWrapper>
  );
};

export default WarehouseSearchBarComponent;
