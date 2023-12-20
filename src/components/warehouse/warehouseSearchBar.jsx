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
		const query = searchQuery;
		const category = selectedCategory;

		let filteredWarehouses = warehouses.filter((warehouse) => {
			if (category === "All") {
				return warehouse.warehouse_name.toLowerCase().includes(query.toLowerCase());
			} else {
				return warehouse.warehouse_name.toLowerCase().includes(query.toLowerCase()) && warehouse.warehouse_type === category;
			}
		});

		setWarehouseDisplay(filteredWarehouses);
		setCurrentPage(1);
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
