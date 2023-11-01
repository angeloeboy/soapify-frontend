const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import {
  DropdownHeader,
  DropdownItem,
  DropdownMenu,
  DropdownWrapper,
  SearchBar,
  TableControlPanel,
  Button,
} from "@/styled-components/TableControlPanel";
import { getProductCategories } from "@/api/products";

const SupplierSearchBar = ({
  handleOpenPopup,
  suppliers,
  setSuppliersDisplay,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // const handleCategoryChange = (category) => {
  // 	setSelectedCategory(category);
  // };

  const handleSearch = () => {
    const query = searchQuery;

    let filteredSuppliers = suppliers.filter((supplier) => {
      if (!query) return true; // If no query, return all suppliers

      const queryLowercased = query.toLowerCase();

      // Check if any of the fields match the query
      return (
        supplier.supplier_name.toLowerCase().includes(queryLowercased) ||
        supplier.supplier_address.toLowerCase().includes(queryLowercased) ||
        supplier.supplier_phone.toLowerCase().includes(queryLowercased) ||
        supplier.supplier_email.toLowerCase().includes(queryLowercased)
      );
    });

    setSuppliersDisplay(filteredSuppliers);
  };

  return (
    <TableControlPanel>
      <SearchBar>
        <p>Search for Supplier</p>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </SearchBar>
      {/* <div>
				<p> Category</p>
				<Dropdown productCategories={productCategories} handleCategoryChange={handleCategoryChange} />
			</div> */}

      <div>
        <p> Add </p>
        <Button onClick={() => handleOpenPopup()}>+ Add Suppliers</Button>
      </div>
    </TableControlPanel>
  );
};

const Dropdown = ({ productCategories, handleCategoryChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("All");

  return (
    <DropdownWrapper onClick={() => setIsOpen(!isOpen)}>
      <DropdownHeader>
        <FontAwesomeIcon icon={faFilter} />
        {selectedItem}
      </DropdownHeader>
      <DropdownMenu $isOpen={isOpen}>
        <DropdownItem
          key={0}
          onClick={() => {
            setSelectedItem("All");
            setIsOpen(false);
            handleCategoryChange("All");
          }}
        >
          All
        </DropdownItem>
        {productCategories.map((option) => (
          <DropdownItem
            key={option.id}
            onClick={() => {
              setSelectedItem(option.name);
              setIsOpen(false);
              handleCategoryChange(option.name);
            }}
          >
            {option.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </DropdownWrapper>
  );
};

export default SupplierSearchBar;
