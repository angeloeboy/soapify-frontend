const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { DropdownHeader, DropdownItem, DropdownMenu, DropdownWrapper, SearchBar, TableControlPanel, Button } from "@/styled-components/TableControlPanel";
import { getProductCategories } from "@/api/products";

const SearchBarComponent = ({ setPopupOpen, products, setCategoriesDisplay }) => {
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

	const handleCategoryChange = (category) => {
		setSelectedCategory(category);
	};

	const handleSearch = () => {
		const query = searchQuery;

		let filteredCategories;
		filteredCategories = query ? productCategories.filter((category) => category.name.toLowerCase().includes(query.toLowerCase())) : productCategories;
		setCategoriesDisplay(filteredCategories);
	};

	return (
		<TableControlPanel>
			<SearchBar>
				<p>Search for Product</p>
				<input type="text" placeholder="Search" value={searchQuery} onChange={handleSearchChange} />
			</SearchBar>
			{/* <div>
				<p> Category</p>
				<Dropdown productCategories={productCategories} handleCategoryChange={handleCategoryChange} />
			</div> */}

			<div>
				<p> Add </p>
				<Button onClick={() => setPopupOpen(true)}>+ Add Category</Button>
			</div>
		</TableControlPanel>
	);
};

export default SearchBarComponent;
