import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { DropdownHeader, DropdownItem, DropdownMenu, DropdownWrapper, SearchBar, TableControlPanel, Button } from "@/styled-components/TableControlPanel";

import PopupContentWarehouse from "./addWarehouse"; // Import the warehouse popup component

const WarehouseSearchBar = ({ setAddPopUpOpen, warehouses, setWarehouseDisplay, setCurrentPage }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");

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
		const filteredWarehouses = warehouses.filter((warehouse) => {
			const matchCategory = selectedCategory === "All" || warehouse.category === selectedCategory;
			const matchSearchQuery = warehouse.warehouse_name.toLowerCase().includes(searchQuery.toLowerCase());
			return matchCategory && matchSearchQuery;
		});

		setWarehouseDisplay(filteredWarehouses);
	};

	return (
		<TableControlPanel>
			<SearchBar>
				<p>Search for Warehouse</p>
				<input type="text" placeholder="Search" value={searchQuery} onChange={handleSearchChange} />
			</SearchBar>
			<div>
				<Button style={{ marginTop: "28px", padding: "16px 24px" }} onClick={() => setAddPopUpOpen(true)}>
					+ Add Warehouse
				</Button>
			</div>
		</TableControlPanel>
	);
};

export default WarehouseSearchBar;
