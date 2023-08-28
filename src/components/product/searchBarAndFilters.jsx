import { DropdownHeader, DropdownItem, DropdownMenu, DropdownWrapper, SearchBar, TableControlPanel } from "@/styled-components/TableControlPanel";

const SearchBarComponentProduct = () => {
	return (
		<TableControlPanel>
			<SearchBar>
				<p>Search for Product</p>
				<input type="text" placeholder="Search" value={"searchQuery"} />
			</SearchBar>
			<div>
				{/* <p> Category</p> */}
				{/* <Dropdown productCategories={productCategories} handleCategoryChange={handleCategoryChange} /> */}
			</div>
		</TableControlPanel>
	);
};

export default SearchBarComponentProduct;
