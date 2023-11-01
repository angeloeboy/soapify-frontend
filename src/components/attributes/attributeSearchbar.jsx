const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
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

const AttributeSearchBar = ({ setPopUpOpen }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [productCategories, setProductCategories] = useState([]);

  useEffect(() => {
    fetchProductCategories();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, selectedCategory]);

  const fetchProductCategories = async () => {
    const response = await getProductCategories();
    setProductCategories(response.categories || []);
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    const query = searchQuery;
    const category = selectedCategory;
    console.log(category);

    // let filteredProducts;

    // if (category == "All") {
    // 	filteredProducts = query ? products.filter((product) => product.product_name.toLowerCase().includes(query.toLowerCase())) : products;
    // } else {
    // 	filteredProducts = products.filter(
    // 		(product) => product.product_name.toLowerCase().includes(query.toLowerCase()) && product.category.name.toLowerCase().includes(category.toLowerCase())
    // 	);
    // }

    // setProductDisplay(filteredProducts);
  };

  return (
    <TableControlPanel>
      <SearchBar>
        <p>Search for attributes</p>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </SearchBar>
      <div>
        {/* <p> Category</p>
				<Dropdown productCategories={productCategories} handleCategoryChange={handleCategoryChange} /> */}
      </div>

      <div>
        <p> Add </p>
        <Button onClick={() => setPopUpOpen(true)}>+ Add Attribute</Button>
      </div>
    </TableControlPanel>
  );
};

export default AttributeSearchBar;
