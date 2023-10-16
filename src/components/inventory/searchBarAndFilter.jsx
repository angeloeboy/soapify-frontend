const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { DropdownHeader, DropdownItem, DropdownMenu, DropdownWrapper, SearchBar, TableControlPanel, Button } from "@/styled-components/TableControlPanel";
import { getProducts } from "@/api/products";

const SearchBarComponent = ({ setIsAddPopUpOpen, inventory, setinventoryDisplay }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedProduct, setSelectedProduct] = useState("All");
	const [productCategories, setProductCategories] = useState([]);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetchProducts();
	}, []);

	useEffect(() => {
		handleSearch();
	}, [searchQuery, selectedProduct]);

	const fetchProducts = () => {
		getProducts().then((res) => {
			res.products ? setProducts(res.products) : setProducts([]);
		});
	};

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleProductChange = (category) => {
		setSelectedProduct(category);
	};

	const handleSearch = () => {
		// const query = searchQuery;
		// // const category = selectedCategory;
		// const product = selectedProduct.product_name;
		// let filteredInventory;

		// filteredInventory = query ? inventory.filter((inventory) => inventory.Product.product_name.toLowerCase().includes(query.toLowerCase())) : inventory;

		// setinventoryDisplay(filteredInventory);

		const queryTerms = searchQuery.split(" ");

		let filteredInventory;

		filteredInventory = inventory.filter((item) => {
			return queryTerms.every(
				(term) =>
					item.Product.product_name.toLowerCase().includes(term.toLowerCase()) ||
					(item.Product.attribute && item.Product.attribute.some((attr) => attr.value.toLowerCase().includes(term.toLowerCase())))
			);
		});

		setinventoryDisplay(filteredInventory);
	};

	return (
		<TableControlPanel>
			<SearchBar>
				<p>Search for Product</p>
				<input type="text" placeholder="Search" value={searchQuery} onChange={handleSearchChange} />
			</SearchBar>
			{/* <div>
				<p>Product</p>
				<Dropdown products={products} handleProductChange={handleProductChange} />
			</div> */}

			<div>
				<p> Add </p>
				<Button onClick={() => setIsAddPopUpOpen(true)}>+ Add Inventory</Button>
			</div>
		</TableControlPanel>
	);
};

const Dropdown = ({ products, handleProductChange }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState("All");

	return (
		<DropdownWrapper onClick={() => setIsOpen(!isOpen)}>
			<DropdownHeader>
				<FontAwesomeIcon icon={faFilter} />
				{selectedItem}
			</DropdownHeader>
			<DropdownMenu isOpen={isOpen}>
				<DropdownItem
					key={0}
					onClick={() => {
						setSelectedItem("All");
						setIsOpen(false);
						handleCategoryChange("All");
					}}
				>
					All
				</DropdownItem>
				{products.map((option) => (
					<DropdownItem
						key={option.id}
						onClick={() => {
							setSelectedItem(option.product_name);
							setIsOpen(false);
							handleProductChange(option.product_name);
						}}
					>
						{option.product_name}
					</DropdownItem>
				))}
			</DropdownMenu>
		</DropdownWrapper>
	);
};

export default SearchBarComponent;
