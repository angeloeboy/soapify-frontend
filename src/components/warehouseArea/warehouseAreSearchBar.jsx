import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

// Import the Warehouse Area popup component
import AddWarehouseArea from "./addWarehouseArea";

const WarehouseAreaSearchBar = ({ setAddPopUpOpen, warehouseAreas, setFilteredWarehouseAreas }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    handleSearch();
  }, [searchQuery, selectedCategory]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const areaTypeChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = () => {
    const filteredWarehouseAreas = warehouseAreas.filter((area) => {
      const matchCategory = selectedCategory === "All" || area.areaType === selectedCategory;
      const matchSearchQuery = area.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearchQuery;
    });

    setFilteredWarehouseAreas(filteredWarehouseAreas);
  };

  return (
    <TableControlPanel>
      <SearchBar>
        <p>Search for Warehouse Area</p>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </SearchBar>
      <div>
        <Button
          style={{ marginTop: "28px", padding: "16px 24px" }}
          onClick={() => setAddPopUpOpen(true)}
        >
          + Add Warehouse Area
        </Button>
      </div>
    </TableControlPanel>
  );
};

export default WarehouseAreaSearchBar;
