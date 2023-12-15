const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { DropdownHeader, DropdownItem, DropdownMenu, DropdownWrapper, SearchBar, TableControlPanel, Button } from "@/styled-components/TableControlPanel";
import { getProductCategories } from "@/api/products";
import useOutsideClick from "@/hooks/useOutsideclick";

const ProductSearchBar = ({ setIsAddPopUpOpen, products, setProductDisplay, setCurrentPage, hasAddProduct }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [selectedStatus, setSelectedStatus] = useState("All");
	const [selectedProductStatus, setSelectedProductStatus] = useState("All");

	const [productCategories, setProductCategories] = useState([]);

	useEffect(() => {
		fetchProductCategories();
	}, []);

	useEffect(() => {
		handleSearch();
	}, [searchQuery, selectedCategory, selectedStatus, selectedProductStatus, products]);

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
		const productStatus = selectedProductStatus;
		let filteredProducts;

		if (category === "All") {
			filteredProducts = products.filter((product) => {
				return (
					queryTerms.every(
						(term) =>
							product.product_name.toLowerCase().includes(term.toLowerCase()) ||
							(product.product_code && product.product_code.toLowerCase().includes(term.toLowerCase())) ||
							(product.attribute && product.attribute.some((attr) => attr.value?.toLowerCase().includes(term.toLowerCase())))
					) &&
					(selectedStatus == "All" || product.isActive === selectedStatus) &&
					(selectedProductStatus == "All" || product.status === selectedProductStatus)
				);
			});
		} else {
			filteredProducts = products.filter((product) => {
				return (
					queryTerms.every(
						(term) =>
							product.product_name.toLowerCase().includes(term.toLowerCase()) ||
							(product.attribute && product.attribute.some((attr) => attr.value.toLowerCase().includes(term.toLowerCase())))
					) &&
					product.category.name.toLowerCase().includes(category.toLowerCase()) &&
					(selectedStatus == "All" || product.isActive === selectedStatus) &&
					(selectedProductStatus == "All" || product.status === selectedProductStatus)
				);
			});
		}

		setProductDisplay(filteredProducts);
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
				<p> Status</p>
				<StatusDropdown setSelectedStatus={setSelectedStatus} />
			</div>
			<div>
				<p>Stock Status</p>
				<StockStatusDropdown setSelectedProductStatus={setSelectedProductStatus} />
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
	const dropdownRef = useRef(null);

	useOutsideClick(dropdownRef, () => {
		if (isOpen) setIsOpen(false);
	});

	return (
		<DropdownWrapper ref={dropdownRef} onClick={() => setIsOpen(!isOpen)}>
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

const StatusDropdown = ({ selectedStatus, setSelectedStatus }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState("All");
	const [status, setStatus] = useState(["Active", "Inactive"]);
	const dropdownRef = useRef(null);

	useOutsideClick(dropdownRef, () => {
		if (isOpen) setIsOpen(false);
	});
	return (
		<DropdownWrapper ref={dropdownRef} onClick={() => setIsOpen(!isOpen)}>
			<DropdownHeader>
				<FontAwesomeIcon icon={faFilter} />
				{selectedItem}
			</DropdownHeader>
			<DropdownMenu $isOpen={isOpen}>
				<DropdownItem
					key={0}
					onClick={() => {
						setSelectedItem("All");
						setSelectedStatus("All");
						setIsOpen(false);
					}}
				>
					All
				</DropdownItem>
				{status.map((option, index) => (
					<DropdownItem
						key={index + 1}
						onClick={() => {
							setSelectedItem(option);
							setSelectedStatus(option === "Active" ? true : false);
							setIsOpen(false);
							// handleCategoryChange(option.name);
						}}
					>
						{option}
					</DropdownItem>
				))}
			</DropdownMenu>
		</DropdownWrapper>
	);
};

const StockStatusDropdown = ({ selectedProductStatus, setSelectedProductStatus }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState("All");
	const [status, setStatus] = useState(["Low", "Moderate", "High"]);
	const dropdownRef = useRef(null);

	useOutsideClick(dropdownRef, () => {
		if (isOpen) setIsOpen(false);
	});

	return (
		<DropdownWrapper ref={dropdownRef} onClick={() => setIsOpen(!isOpen)}>
			<DropdownHeader>
				<FontAwesomeIcon icon={faFilter} />
				{selectedItem}
			</DropdownHeader>
			<DropdownMenu $isOpen={isOpen}>
				<DropdownItem
					key={0}
					onClick={() => {
						setSelectedItem("All");
						setSelectedProductStatus("All");
						setIsOpen(false);
					}}
				>
					All
				</DropdownItem>
				{status.map((option, index) => (
					<DropdownItem
						key={index + 1}
						onClick={() => {
							setSelectedItem(option);
							setSelectedProductStatus(option);
							setIsOpen(false);
						}}
					>
						{option}
					</DropdownItem>
				))}
			</DropdownMenu>
		</DropdownWrapper>
	);
};

export default ProductSearchBar;
