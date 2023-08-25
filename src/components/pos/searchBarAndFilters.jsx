const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { DropdownHeader, DropdownItem, DropdownMenu, DropdownWrapper, SearchBar, TableControlPanel } from "@/styled-components/TableControlPanel";
import { getProductCategories } from "@/api/products";

const SearchBarComponent = ({ products, setProductDisplay }) => {
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
		console.log(response.categories);
	};
	const handleSearchChange = (e) => {
		// const query = e.target.value;
		// setSearchQuery(query);
		// if (query == "") return setProductDisplay(products);
		// const filteredProducts = query ? products.filter((product) => product.product_name.toLowerCase().includes(query.toLowerCase())) : productDisplay;
		// setProductDisplay(filteredProducts);
		setSearchQuery(e.target.value);
	};

	const handleCategoryChange = (category) => {
		// const query = category;
		// if (query == "All") return setProductDisplay(products);
		// const filteredProducts = query ? products.filter((product) => product.category.name.toLowerCase().includes(query.toLowerCase())) : products;
		// setProductDisplay(filteredProducts);
		setSelectedCategory(category);
	};

	const handleSearch = () => {
		const query = searchQuery;
		const category = selectedCategory;
		console.log(query, category);
		if (query == "" && category == "All") return setProductDisplay(products);

		//get products with same name and category
		let filteredProducts;

		if (category == "All") {
			filteredProducts = query ? products.filter((product) => product.product_name.toLowerCase().includes(query.toLowerCase())) : products;
		} else {
			filteredProducts = query
				? products.filter(
						(product) =>
							product.product_name.toLowerCase().includes(query.toLowerCase()) && product.category.name.toLowerCase().includes(category.toLowerCase())
				  )
				: products;
		}

		// setSearchQuery(query);
		// if (query == "") return setProductDisplay(products);
		// const filteredProducts = query ? products.filter((product) => product.product_name.toLowerCase().includes(query.toLowerCase())) : productDisplay;
		setProductDisplay(filteredProducts);
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
		</TableControlPanel>
	);
};

const Dropdown = ({ productCategories, handleCategoryChange }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState("All");

	return (
		<DropdownWrapper>
			<DropdownHeader onClick={() => setIsOpen(!isOpen)}>
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
				{productCategories.map((option) => (
					<DropdownItem
						key={option.id}
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
