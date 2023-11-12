import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { DropdownHeader, DropdownItem, DropdownMenu, DropdownWrapper, SearchBar, TableControlPanel, Button } from "@/styled-components/TableControlPanel";

const RolesSearchBar = ({ setIsAddPopUpOpen, roles, setRolesDisplay, setCurrentPage }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");

	useEffect(() => {
		handleSearch();
	}, [searchQuery, selectedCategory]);

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleSearch = () => {
		// setRolesDisplay(filteredWarehouses);
	};

	return (
		<TableControlPanel>
			<SearchBar>
				<p>Search for Warehouse</p>
				<input type="text" placeholder="Search" value={searchQuery} onChange={handleSearchChange} />
			</SearchBar>
			<div>
				<Button style={{ marginTop: "28px", padding: "16px 24px" }} onClick={() => setIsAddPopUpOpen(true)}>
					+ Add Roles
				</Button>
			</div>
		</TableControlPanel>
	);
};

export default RolesSearchBar;
