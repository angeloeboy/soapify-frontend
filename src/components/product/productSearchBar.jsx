const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { DropdownHeader, DropdownItem, DropdownMenu, DropdownWrapper, SearchBar, TableControlPanel, Button } from "@/styled-components/TableControlPanel";
import { getProductCategories } from "@/api/products";
import useOutsideClick from "@/hooks/useOutsideclick";
import { getAllWarehouse, getWarehouse } from "@/api/warehouse";

const ProductSearchBar = ({ setIsAddPopUpOpen, products, setProductDisplay, setCurrentPage, hasAddProduct, calculateStocksBasedOnInventoryObject }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [selectedStatus, setSelectedStatus] = useState("All");
	const [selectedProductStatus, setSelectedProductStatus] = useState("All");
	const [selectedWarehouse, setSelectedWarehouse] = useState("All");
	const [productCategories, setProductCategories] = useState([]);
	const [warehouses, setWarehouse] = useState([]);
	const [selectedWarehouseId, setSelectedWarehouseId] = useState("");
	const [originalInventories, setOriginalInventories] = useState([]);

	useEffect(() => {
		fetchProductCategories();
		fetchWarehouse();
	}, []);

	useEffect(() => {
		let originalInventoriesMap = new Map(products.map((prod) => [prod.product_id, prod.Inventories]));
		setOriginalInventories(originalInventoriesMap);
		handleSearch();
		console.log("Product is changed");
	}, [searchQuery, selectedCategory, selectedStatus, selectedProductStatus, products, selectedWarehouseId]);

	const fetchProductCategories = async () => {
		const response = await getProductCategories();
		setProductCategories(response.categories || []);
	};

	const fetchWarehouse = async () => {
		const response = await getAllWarehouse();
		console.log(response);

		response.warehouses.sort((a, b) => a.warehouse_id - b.warehouse_id);
		setWarehouse(response.warehouses || []);
	};

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleCategoryChange = (category) => {
		setSelectedCategory(category);
	};

	// const handleSearch = () => {
	// 	const queryTerms = searchQuery.split(" ");
	// 	const category = selectedCategory;
	// 	const productStatus = selectedProductStatus;
	// 	let filteredProducts;

	// 	if (category === "All") {
	// 		filteredProducts = products.filter((product) => {
	// 			return (
	// 				queryTerms.every(
	// 					(term) =>
	// 						product.product_name.toLowerCase().includes(term.toLowerCase()) ||
	// 						(product.product_code && product.product_code.toLowerCase().includes(term.toLowerCase())) ||
	// 						(product.attribute && product.attribute.some((attr) => attr.value?.toLowerCase().includes(term.toLowerCase())))
	// 				) &&
	// 				(selectedStatus == "All" || product.isActive === selectedStatus) &&
	// 				(selectedProductStatus == "All" || product.status === selectedProductStatus)
	// 			);
	// 		});
	// 		// Create a map for quick access to original inventories by product_id
	// 		const originalInventoriesMap = new Map();
	// 		products.forEach((prod) => {
	// 			originalInventoriesMap.set(prod.product_id, prod.Inventories);
	// 		});

	// 		// Filter the inventory based on the selected warehouse
	// 		if (selectedWarehouse !== "All") {
	// 			filteredProducts.forEach((product) => {
	// 				let currentInventory = originalInventoriesMap.get(product.product_id);
	// 				product.Inventories = currentInventory.filter((inventory) => inventory.warehouse_id === selectedWarehouseId);
	// 			});

	// 			console.log("I'm here");
	// 		} else {
	// 			filteredProducts.forEach((product) => {
	// 				// Clone the original inventories to avoid reference issues
	// 				product.Inventories = [...originalInventoriesMap.get(product.product_id)];
	// 			});
	// 		}
	// 	} else {
	// 		filteredProducts = products.filter((product) => {
	// 			return (
	// 				queryTerms.every(
	// 					(term) =>
	// 						product.product_name.toLowerCase().includes(term.toLowerCase()) ||
	// 						(product.attribute && product.attribute.some((attr) => attr.value.toLowerCase().includes(term.toLowerCase())))
	// 				) &&
	// 				product.category.name.toLowerCase().includes(category.toLowerCase()) &&
	// 				(selectedStatus == "All" || product.isActive === selectedStatus) &&
	// 				(selectedProductStatus == "All" || product.status === selectedProductStatus)
	// 			);
	// 		});

	// 		//filter the inventory based on the selected warehouse
	// 		if (selectedWarehouse !== "All") {
	// 			filteredProducts.forEach((product) => {
	// 				let currentInventory = products.find((origProduct) => origProduct.product_id === product.product_id).Inventories;
	// 				product.Inventories = currentInventory.filter((inventory) => inventory.warehouse_id === selectedWarehouseId);
	// 			});
	// 		} else {
	// 			filteredProducts.forEach((product) => {
	// 				product.Inventories = products.find((origProduct) => origProduct.product_id === product.product_id).Inventories;
	// 			});

	// 			console.log("Im in else");
	// 		}
	// 	}

	// 	console.log(filteredProducts);

	// 	setProductDisplay(filteredProducts);
	// 	setCurrentPage(1);
	// };

	const handleSearch = () => {
		if (originalInventories.size === 0) return;

		const queryTerms = searchQuery.toLowerCase().split(" ");
		let filteredProducts = products
			.map((product) => {
				// Clone the product to avoid direct state manipulation
				let newProduct = { ...product };

				const productMatch = queryTerms.every(
					(term) =>
						newProduct.product_name.toLowerCase().includes(term) ||
						newProduct.product_code?.toLowerCase().includes(term) ||
						newProduct.attribute?.some((attr) => attr.value?.toLowerCase().includes(term))
				);

				const categoryMatch = selectedCategory === "All" || newProduct.category.name.toLowerCase() === selectedCategory.toLowerCase();
				const statusMatch = selectedStatus === "All" || newProduct.isActive === selectedStatus;
				const productStatusMatch = selectedProductStatus === "All" || newProduct.status === selectedProductStatus;

				if (productMatch && categoryMatch && statusMatch && productStatusMatch) {
					// Filter the inventory based on the selected warehouse
					if (selectedWarehouse !== "All") {
						let currentInventory = originalInventories.get(newProduct.product_id);
						newProduct.Inventories = currentInventory.filter((inventory) => inventory.warehouse_id === selectedWarehouseId);
					} else {
						//if original inventory is empty, set to empty array
						if (!originalInventories?.get(newProduct.product_id)) {
							newProduct.Inventories = [];
						} else {
							newProduct.Inventories = [...originalInventories?.get(newProduct.product_id)];
						}
					}
					return newProduct;
				}
				return null;
			})
			.filter((product) => product !== null);

		filteredProducts.map((product) => {
			//check product status and add to product object
			if (calculateStocksBasedOnInventoryObject(product.Inventories) <= product.minimum_reorder_level) {
				product.status = "Low";
			}
			if (
				calculateStocksBasedOnInventoryObject(product.Inventories) > product.minimum_reorder_level &&
				calculateStocksBasedOnInventoryObject(product.Inventories) < 2 * product.minimum_reorder_level
			) {
				product.status = "Moderate";
			}
			if (calculateStocksBasedOnInventoryObject(product.Inventories) >= 2 * product.minimum_reorder_level) {
				product.status = "High";
			}
		});

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
				<p>Warehouse</p>
				<WarehouseDropDown warehouses={warehouses} setSelectedWarehouse={setSelectedWarehouse} setSelectedWarehouseId={setSelectedWarehouseId} />
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

const WarehouseDropDown = ({ warehouses, selectedWarehouse, setSelectedWarehouse, setSelectedWarehouseId }) => {
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
						setSelectedWarehouse("All");
						setIsOpen(false);
						setSelectedWarehouseId("");
					}}
				>
					All
				</DropdownItem>
				{warehouses.map((option, index) => (
					<DropdownItem
						key={index + 1}
						onClick={() => {
							setSelectedItem(option.warehouse_name);
							setSelectedWarehouse(option.warehouse_name);
							setIsOpen(false);
							setSelectedWarehouseId(option.warehouse_id);
						}}
					>
						{option.warehouse_name}
					</DropdownItem>
				))}
			</DropdownMenu>
		</DropdownWrapper>
	);
};

export default ProductSearchBar;
