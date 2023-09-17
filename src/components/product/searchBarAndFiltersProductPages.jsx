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

import PopupContentProduct from "./addProduct"; // Import the product popup component

const ProductPageSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isPopupContentProductOpen, setIsPopupContentProductOpen] = useState(false);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, selectedCategory]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const productCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = () => {
    const category = selectedCategory;
    console.log(category);
    // Add logic to perform a product search based on the selected category and search query
  };

  const handleOpenPopupContentProduct = () => {
    setIsPopupContentProductOpen(true);
  };

  const handleClosePopupContentProduct = () => {
    setIsPopupContentProductOpen(false);
  };

  return (
    <TableControlPanel>
      <SearchBar>
        <p>Search for Products</p>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </SearchBar>
      <div>
        <p>Product Category</p>
        <ProductCategoryDropDown productCategoryChange={productCategoryChange} />
      </div>
      <div>
        <Button
          style={{ marginTop: "28px", padding: "16px 24px" }}
          onClick={handleOpenPopupContentProduct}
        >
          + Add Product
        </Button>
        {isPopupContentProductOpen && (
          <PopupContentProduct onClose={handleClosePopupContentProduct} />
        )}
      </div>
    </TableControlPanel>
  );
};

const ProductCategoryDropDown = ({ productCategoryChange }) => {
  const [isProductCategoryDropDownOpen, setIsProductCategoryDropDownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("All");

  return (
    <DropdownWrapper
      onClick={() => setIsProductCategoryDropDownOpen(!isProductCategoryDropDownOpen)}
    >
      <DropdownHeader>
        <FontAwesomeIcon icon={faFilter} />
        {selectedItem}
      </DropdownHeader>
      <DropdownMenu isProductCategoryDropDownOpen={isProductCategoryDropDownOpen}>
        <DropdownItem
          key={0}
          onClick={() => {
            setSelectedItem("All");
            setIsProductCategoryDropDownOpen(false);
            productCategoryChange("All");
          }}
        >
          All
        </DropdownItem>

        {/* Add other product categories as DropdownItems */}
      </DropdownMenu>
    </DropdownWrapper>
  );
};

export default ProductPageSearchBar;
