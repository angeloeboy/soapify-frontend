const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { DropdownHeader, DropdownItem, DropdownMenu, DropdownWrapper, SearchBar, TableControlPanel } from "@/styled-components/TableControlPanel";
import { getProductCategories } from "@/api/products";

const PosSearchBar = ({ products, setProductDisplay, parentProducts, setParentProductsDisplay }) => {
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

		//make the category withthe name Uncategorized the last item in the array
		response.categories.sort((a, b) => {
			if (a.name === "Uncategorized") {
				return 1;
			}
			if (b.name === "Uncategorized") {
				return -1;
			}
			return 0;
		});

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
				//dont show if they are a variant

				if (product.parent_product_id !== null) {
					return false;
				}
				return queryTerms.every(
					(term) =>
						product.product_name.toLowerCase().includes(term.toLowerCase()) ||
						product.attribute.some((attr) => attr.value?.toLowerCase().includes(term.toLowerCase()))
				);
			});
		} else {
			filteredProducts = products.filter((product) => {
				if (product.parent_product_id !== null) {
					return false;
				}
				return (
					queryTerms.every(
						(term) =>
							product.product_name.toLowerCase().includes(term.toLowerCase()) ||
							product.attribute.some((attr) => attr.value?.toLowerCase().includes(term.toLowerCase()))
					) && product.category.name.toLowerCase().includes(category.toLowerCase())
				);
			});
		}

		setProductDisplay(filteredProducts);

		let filteredParentProducts;

		if (category === "All") {
			filteredParentProducts = parentProducts.filter((parent_product) => {
				return parent_product.products.some((product) => {
					return queryTerms.every(
						(term) =>
							product.product_name.toLowerCase().includes(term.toLowerCase()) ||
							product.attribute.some((attr) => attr.value?.toLowerCase().includes(term.toLowerCase()))
					);
				});
			});
		} else {
			filteredParentProducts = parentProducts.filter((parent_product) => {
				return parent_product.products.some((product) => {
					return (
						product.parent_product_id === null ||
						(product.category.name.toLowerCase().includes(category.toLowerCase()) &&
							queryTerms.every(
								(term) =>
									product.product_name.toLowerCase().includes(term.toLowerCase()) ||
									product.attribute.some((attr) => attr.value?.toLowerCase().includes(term.toLowerCase()))
							))
					);
				});
			});
		}
		console.log(filteredParentProducts);

		setParentProductsDisplay(filteredParentProducts);
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

export default PosSearchBar;
