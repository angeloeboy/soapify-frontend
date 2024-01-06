import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { DropdownHeader, DropdownItem, DropdownMenu, DropdownWrapper, SearchBar, TableControlPanel, Button } from "@/styled-components/TableControlPanel";
import { useEffect, useRef, useState } from "react";
import PurchaseOrder from "@/pages/dashboard/purchase-order";
import useOutsideClick from "@/hooks/useOutsideclick";

const PurchaseOrderSearchBar = ({ setIsAddPopUpOpen, setCurrentPage, purchaseOrders, setPurchaseOrdersDisplay }) => {
	const [query, setQuery] = useState("");
	const [isloading, setIsLoading] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState("All");
	useEffect(() => {
		handleSearch();
	}, [query, selectedStatus]);

	const handleSearch = () => {
		const searchQuery = query;

		let filteredPurchaseOrders;
		//convert int to string

		filteredPurchaseOrders = searchQuery
			? purchaseOrders.filter((purchaseOrder) => `PO00${purchaseOrder.purchase_order_id.toString()}`.toLowerCase().includes(searchQuery.toLowerCase()))
			: purchaseOrders;

		if (selectedStatus !== "All") {
			filteredPurchaseOrders = filteredPurchaseOrders.filter((purchaseOrder) => purchaseOrder.status === selectedStatus);
		}

		setPurchaseOrdersDisplay(filteredPurchaseOrders);
		setCurrentPage(1);
	};

	return (
		<TableControlPanel>
			<SearchBar>
				<p>Search for Purchase Order</p>
				<input type="text" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
			</SearchBar>

			<div>
				<p>Status</p>
				<Dropdown setSelectedStatus={setSelectedStatus} />
			</div>

			<div>
				<p> Create Purchase Order </p>
				<Button onClick={() => setIsAddPopUpOpen(true)}>+ Create Purchase Order</Button>
			</div>
		</TableControlPanel>
	);
};

const Dropdown = ({ setSelectedStatus }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState("All");
	const [choices, setChoices] = useState(["All", "Pending", "Has Back Order", "Delivered"]);
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
				{choices.map((option, index) => (
					<DropdownItem
						key={index}
						onClick={() => {
							setSelectedItem(option);
							setIsOpen(false);
							setSelectedStatus(option);
						}}
					>
						{option}
					</DropdownItem>
				))}
			</DropdownMenu>
		</DropdownWrapper>
	);
};

export default PurchaseOrderSearchBar;
