const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { DropdownHeader, DropdownItem, DropdownMenu, DropdownWrapper, SearchBar, TableControlPanel, Button } from "@/styled-components/TableControlPanel";
import { getProductCategories } from "@/api/products";

const SearchBarComponent = ({ setIsAddPopUpOpen, products, setFilteredProducts, setCurrentPage }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [productCategories, setProductCategories] = useState([]);

	useEffect(() => {
		fetchProductCategories();
	}, []);

	useEffect(() => {
		handleSearch();
	}, [searchQuery, selectedCategory]);

	const fetchProductCategories = async () => {
		const response = await getProductCategories();
		setProductCategories(response.categories || []);
	};
	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleCategoryChange = (category) => {
		setSelectedCategory(category);
	};

	const handleSearch = () => {
		const queryTerms = searchQuery.split(" ");
		const category = selectedCategory;

		let filteredProducts;

		if (category === "All") {
			filteredProducts = products.filter((product) => {
				console.log(product.product_code);

				return queryTerms.every(
					(term) =>
						product.product_name.toLowerCase().includes(term.toLowerCase()) ||
						(product.product_code && product.product_code.toLowerCase().includes(term.toLowerCase())) ||
						(product.attribute && product.attribute.some((attr) => attr.value.toLowerCase().includes(term.toLowerCase())))
				);
			});
		} else {
			filteredProducts = products.filter((product) => {
				return (
					queryTerms.every(
						(term) =>
							product.product_name.toLowerCase().includes(term.toLowerCase()) ||
							(product.attribute && product.attribute.some((attr) => attr.value.toLowerCase().includes(term.toLowerCase())))
					) && product.category.name.toLowerCase().includes(category.toLowerCase())
				);
			});
		}

		setFilteredProducts(filteredProducts);
		setCurrentPage(1);
	};

	return (
		<TableControlPanel>
			<SearchBar>
				<p>Search for Product</p>
				<input type="text" placeholder="Search" value={searchQuery} onChange={handleSearchChange} />
			</SearchBar>
			<div>
				<p> Category</p>
				<Dropdown productCategories={productCategories} handleCategoryChange={handleCategoryChange} />
			</div>

			<div>
				<p> Add </p>
				<Button onClick={() => setIsAddPopUpOpen(true)}>+ Add Product</Button>
			</div>
		</TableControlPanel>
	);
};

const Dropdown = ({ productCategories, handleCategoryChange }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState("All");

	return (
		<DropdownWrapper onClick={() => setIsOpen(!isOpen)}>
			<DropdownHeader>
				<FontAwesomeIcon icon={faFilter} />
				{selectedItem}
			</DropdownHeader>
			<DropdownMenu $isOpen={isOpen}>
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
				{productCategories.map((option, index) => (
					<DropdownItem
						key={index}
						onClick={() => {
							setSelectedItem(option.name);
							setIsOpen(false);
							handleCategoryChange(option.name);
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
