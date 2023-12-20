import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { DropdownHeader, DropdownItem, DropdownMenu, DropdownWrapper, SearchBar, TableControlPanel, Button } from "@/styled-components/TableControlPanel";

const RolesSearchBar = ({ setIsAddPopUpOpen, roles, setRolesDisplay, setCurrentPage }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");

	useEffect(() => {
		handleSearch();
	}, [searchQuery, selectedCategory, roles]);

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleSearch = () => {
		const filteredRoles = roles.filter((role) => {
			if (selectedCategory === "All") {
				return role.role_name.toLowerCase().includes(searchQuery.toLowerCase());
			} else {
				return role.role_name.toLowerCase().includes(searchQuery.toLowerCase()) && role.category === selectedCategory;
			}
		});

		setRolesDisplay(filteredRoles);
		setCurrentPage(1);
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
