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
	};
	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleCategoryChange = (category) => {
		setSelectedCategory(category);
	};

	const handleSearch = () => {
		// const query = searchQuery;
		// const category = selectedCategory;
		// console.log(category);

		// let filteredProducts;

		// // if (category == "All") {
		// // 	filteredProducts = query ? products.filter((product) => product.product_name.toLowerCase().includes(query.toLowerCase())) : products;
		// // } else {
		// // 	filteredProducts = products.filter(
		// // 		(product) => product.product_name.toLowerCase().includes(query.toLowerCase()) && product.category.name.toLowerCase().includes(category.toLowerCase())
		// // 	);
		// // }

		// if (category == "All") {
		// 	filteredProducts = query
		// 		? products.filter(
		// 				(product) =>
		// 					product.product_name.toLowerCase().includes(query.toLowerCase()) ||
		// 					product.attribute.some((attr) => attr.value.toLowerCase().includes(query.toLowerCase()))
		// 		  )
		// 		: products;
		// } else {
		// 	filteredProducts = products.filter(
		// 		(product) =>
		// 			(product.product_name.toLowerCase().includes(query.toLowerCase()) ||
		// 				product.attribute.some((attr) => attr.value.toLowerCase().includes(query.toLowerCase()))) &&
		// 			product.category.name.toLowerCase().includes(category.toLowerCase())
		// 	);
		// }

		const queryTerms = searchQuery.split(" ");
		const category = selectedCategory;
		
		let filteredProducts;

		if (category === "All") {
			filteredProducts = products.filter((product) => {
				return queryTerms.every(
					(term) =>
						product.product_name.toLowerCase().includes(term.toLowerCase()) ||
						product.attribute.some((attr) => attr.value.toLowerCase().includes(term.toLowerCase()))
				);
			});
		} else {
			filteredProducts = products.filter((product) => {
				return (
					queryTerms.every(
						(term) =>
							product.product_name.toLowerCase().includes(term.toLowerCase()) ||
							product.attribute.some((attr) => attr.value.toLowerCase().includes(term.toLowerCase()))
					) && product.category.name.toLowerCase().includes(category.toLowerCase())
				);
			});
		}

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
