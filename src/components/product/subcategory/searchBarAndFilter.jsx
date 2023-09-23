const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { DropdownHeader, DropdownItem, DropdownMenu, DropdownWrapper, SearchBar, TableControlPanel, Button } from "@/styled-components/TableControlPanel";
import { getProductCategories } from "@/api/products";

const SearchBarComponent = ({ setPopupOpen, subCategories, setSubcategoryDisplay }) => {
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

		let filteredSubCategories = [];

		filteredSubCategories = query
			? subCategories.filter((subcategory) => subcategory.subcategory_name.toLowerCase().includes(query.toLowerCase()))
			: subCategories;
		setSubcategoryDisplay(filteredSubCategories);
	};

	return (
		<TableControlPanel>
			<SearchBar>
				<p>Search for Subcategory</p>
				<input type="text" placeholder="Search" value={searchQuery} onChange={handleSearchChange} />
			</SearchBar>

			<div>
				<p> Add </p>
				<Button onClick={() => setPopupOpen(true)}>+ Add Template</Button>
			</div>
		</TableControlPanel>
	);
};

export default SearchBarComponent;
