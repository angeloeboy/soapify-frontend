const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { DropdownHeader, DropdownItem, DropdownMenu, DropdownWrapper, SearchBar, TableControlPanel, Button } from "@/styled-components/TableControlPanel";
import { getProducts } from "@/api/products";
import { getAllWarehouse, getWarehouse } from "@/api/warehouse";
import useOutsideClick from "@/hooks/useOutsideclick";

const InventorySearchBar = ({ setIsAddPopUpOpen, inventory, setinventoryDisplay, setCurrentPage, hasAddinventory }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedProduct, setSelectedProduct] = useState("All");
	const [selectedWarehouse, setSelectedWarehouse] = useState("All");
	const [selectedArea, setSelectedArea] = useState("All");
	const [productCategories, setProductCategories] = useState([]);
	const [products, setProducts] = useState([]);
	const [warehouses, setWarehouses] = useState([]);
	const [areas, setAreas] = useState([]);

	useEffect(() => {
		fetchWarehouses();
		fetchProducts();
	}, []);

	useEffect(() => {
		handleSearch();
		console.log(warehouses);
	}, [searchQuery, selectedProduct, selectedWarehouse, selectedArea]);

	const fetchProducts = () => {
		getProducts().then((res) => {
			res.products ? setProducts(res.products) : setProducts([]);
		});
	};

	const fetchWarehouses = () => {
		getAllWarehouse().then((res) => {
			res.warehouses ? setWarehouses(res.warehouses) : setWarehouses([]);
		});
	};

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleProductChange = (product) => {
		setSelectedProduct(product);
	};

	const handleWarehouseChange = (warehouse) => {
		setSelectedWarehouse(warehouse);
		setAreas(warehouses.find((wh) => wh.warehouse_name === warehouse)?.areas || []);
	};

	const handleAreaChange = (area) => {
		setSelectedArea(area);
	};

	const handleSearch = () => {
		const queryTerms = searchQuery.split(" ");

		let filteredInventory;

		//filter inventory based on search and on selected product
		filteredInventory = inventory.filter((item) => {
			return (
				(selectedProduct === "All" || item.Product?.product_name === selectedProduct) &&
				(selectedWarehouse === "All" || item.warehouse?.warehouse_name === selectedWarehouse) &&
				(selectedArea === "All" || item.area?.area_name === selectedArea) &&
				queryTerms.every(
					(term) =>
						item.Product.product_name.toLowerCase().includes(term.toLowerCase()) ||
						item.Product.product_code.toLowerCase().includes(term.toLowerCase()) ||
						item.batch_no.toLowerCase().includes(term.toLowerCase()) ||
						(item.Product.attribute && item.Product.attribute.some((attr) => attr.value?.toLowerCase().includes(term.toLowerCase())))
				)
			);
		});

		setinventoryDisplay(filteredInventory);
		setCurrentPage(1);
	};

	return (
		<TableControlPanel>
			<SearchBar>
				<p>Search for Product</p>
				<input type="text" placeholder="Search" value={searchQuery} onChange={handleSearchChange} />
			</SearchBar>
			<div>
				<p>Product</p>
				<Dropdown products={products} handleProductChange={handleProductChange} />
			</div>
			<div>
				<p>Warehouse</p>
				<DropDownWarehouse warehouses={warehouses} handleWarehouseChange={handleWarehouseChange} />
			</div>
			<div>
				<p>Area</p>
				<DropdownArea areas={areas} handleAreaChange={handleAreaChange} />
			</div>

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
						handleProductChange("All");
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

const DropDownWarehouse = ({ warehouses, handleWarehouseChange }) => {
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
						handleWarehouseChange("All");
					}}
				>
					All
				</DropdownItem>
				{warehouses.map((option) => (
					<DropdownItem
						key={option.id}
						onClick={() => {
							setSelectedItem(option.warehouse_name);
							setIsOpen(false);
							handleWarehouseChange(option.warehouse_name);
						}}
					>
						{option.warehouse_name}
					</DropdownItem>
				))}
			</DropdownMenu>
		</DropdownWrapper>
	);
};

const DropdownArea = ({ areas, handleAreaChange }) => {
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
						handleAreaChange("All");
					}}
				>
					All
				</DropdownItem>
				{areas.map((option) => (
					<DropdownItem
						key={option.id}
						onClick={() => {
							setSelectedItem(option.area_name);
							setIsOpen(false);
							handleAreaChange(option.area_name);
						}}
					>
						{option.area_name}
					</DropdownItem>
				))}
			</DropdownMenu>
		</DropdownWrapper>
	);
};

export default InventorySearchBar;
