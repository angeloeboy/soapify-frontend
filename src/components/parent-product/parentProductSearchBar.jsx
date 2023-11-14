import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { DropdownHeader, DropdownItem, DropdownMenu, DropdownWrapper, SearchBar, TableControlPanel, Button } from "@/styled-components/TableControlPanel";
import useOutsideClick from "@/hooks/useOutsideclick";

const ParentProductSearchBar = ({ setParentProductDisplay, parentProducts, setCurrentPage, setAddParentProductOpen }) => {
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = () => {
		let query = searchQuery;
		const queryTerms = query.split(" ");

		let filteredParentProduct = parentProducts.filter((parentProduct) => {
			let found = false;
			queryTerms.forEach((term) => {
				if (parentProduct.name.toLowerCase().includes(term.toLowerCase())) {
					found = true;
				}
			});
			return found;
		});

		setParentProductDisplay(filteredParentProduct);
		setCurrentPage(1);
	};

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	// useEffect(() => {
	// 	handleSearch();
	// }, [searchQuery]);

	return (
		<TableControlPanel>
			<SearchBar>
				<p>Search for Orders</p>
				<input type="text" placeholder="Search" value={searchQuery} onChange={handleSearchChange} />
			</SearchBar>

			<div>
				<Button style={{ marginTop: "28px", padding: "16px 24px" }} onClick={() => setAddParentProductOpen(true)}>
					+ Add Parent Product
				</Button>
			</div>
		</TableControlPanel>
	);
};

// const OrderStatus = ({ selectedOrderStatus, setSelectedOrderStatus }) => {
// 	const [isOpen, setIsOpen] = useState(false);
// 	const [selectedItem, setSelectedItem] = useState("All");
// 	const [status, setStatus] = useState(["Pending", "Paid", "Cancelled", "Refunded", "Done"]);
// 	const dropdownRef = useRef(null);

// 	useOutsideClick(dropdownRef, () => {
// 		if (isOpen) setIsOpen(false);
// 	});

// 	return (
// 		<DropdownWrapper ref={dropdownRef} onClick={() => setIsOpen(!isOpen)}>
// 			<DropdownHeader>
// 				<FontAwesomeIcon icon={faFilter} />
// 				{selectedItem}
// 			</DropdownHeader>
// 			<DropdownMenu $isOpen={isOpen}>
// 				<DropdownItem
// 					key={0}
// 					onClick={() => {
// 						setSelectedItem("All");
// 						setSelectedOrderStatus("All");
// 						setIsOpen(false);
// 					}}
// 				>
// 					All
// 				</DropdownItem>
// 				{status.map((option, index) => (
// 					<DropdownItem
// 						key={index + 1}
// 						onClick={() => {
// 							setSelectedItem(option);
// 							setSelectedOrderStatus(option.toUpperCase());
// 							setIsOpen(false);
// 						}}
// 					>
// 						{option}
// 					</DropdownItem>
// 				))}
// 			</DropdownMenu>
// 		</DropdownWrapper>
// 	);
// };

export default ParentProductSearchBar;
