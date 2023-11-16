import React from "react";
import { TableControlPanel, SearchBar, Button } from "@/styled-components/TableControlPanel";

const ReturnSearchBar = ({ setIsAddPopUpOpen, setReturnsDisplay, onSearch }) => {
	return (
		<TableControlPanel>
			<SearchBar>
				<p>Search for Returns</p>
				<input type="text" placeholder="Search" onChange={(e) => onSearch(e.target.value)} />
			</SearchBar>

			<div>
				<p> Add Return </p>
				<Button onClick={() => setIsAddPopUpOpen(true)}>+ Add Return</Button>
			</div>
		</TableControlPanel>
	);
};

export default ReturnSearchBar;
