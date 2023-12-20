import React, { useEffect, useState } from "react";
import { TableControlPanel, SearchBar, Button } from "@/styled-components/TableControlPanel";

const ShelvingSearchBar = ({ setIsAddShelfPopupOpen, setShelvesDisplay, onSearch, setCurrentPage, shelves }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");

	useEffect(() => {
		handleSearch();
	}, [searchQuery, selectedCategory, shelves]);

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleSearch = () => {
		const query = searchQuery;
		const category = selectedCategory;

		console.log("original ", shelves);

		let filteredShelves = shelves.filter((shelf) => {
			if (category === "All") {
				return shelf.area_name.toLowerCase().includes(query.toLowerCase());
			} else {
				return shelf.area_name.toLowerCase().includes(query.toLowerCase());
			}
		});

		console.log("filtered shelves", filteredShelves);

		setShelvesDisplay(filteredShelves);
		setCurrentPage(1);
	};

	return (
		<TableControlPanel>
			<SearchBar>
				<p>Search for Area</p>
				<input type="text" placeholder="Search" onChange={(e) => handleSearchChange(e)} />
			</SearchBar>

			{/* <div>
        <p> Add Shelf </p>
        <Button onClick={() => setIsAddShelfPopupOpen(true)}>+ Add Shelf</Button>
      </div> */}
		</TableControlPanel>
	);
};

export default ShelvingSearchBar;
