import { DropdownHeader, DropdownItem, DropdownMenu, DropdownWrapper, SearchBar, TableControlPanel } from "@/styled-components/TableControlPanel";
import Button from "../misc/button";

const SearchBarComponentProduct = ({ setPopupOpen }) => {
	return (
		<TableControlPanel>
			<SearchBar>
				<p>Search for Product</p>
				<input type="text" placeholder="Search" value={"searchQuery"} />
			</SearchBar>
			<Button onClick={() => setPopupOpen(true)}>+ Add Product</Button>
			<div>
				{/* <p> Category</p> */}
				{/* <Dropdown productCategories={productCategories} handleCategoryChange={handleCategoryChange} /> */}
			</div>
		</TableControlPanel>
	);
};

export default SearchBarComponentProduct;
