const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { styled } from "styled-components";
import { DropdownHeader, DropdownItem, DropdownMenu, DropdownWrapper, SearchBar, TableControlPanel } from "@/styled-components/TableControlPanel";

const SearchBarComponent = ({ searchQuery, handleSearch, productCategories }) => (
	<TableControlPanel>
		<SearchBar>
			<p>Search for Product</p>
			<input type="text" placeholder="Search" value={searchQuery} onChange={handleSearch} />
		</SearchBar>
		<div>
			<p> Category</p>
			<Dropdown productCategories={productCategories} />
		</div>
	</TableControlPanel>
);

const Dropdown = ({ productCategories }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState("All");

	return (
		<DropdownWrapper>
			<DropdownHeader onClick={() => setIsOpen(!isOpen)}>
				<FontAwesomeIcon icon={faFilter} />
				{selectedItem}
			</DropdownHeader>
			<DropdownMenu isOpen={isOpen}>
				{productCategories.map((option) => (
					<DropdownItem
						key={option.id}
						onClick={() => {
							setSelectedItem(option.name);
							setIsOpen(false);
						}}
					>
						{option.name}
					</DropdownItem>
				))}
			</DropdownMenu>
		</DropdownWrapper>
	);
};

export default SearchBarComponent;
