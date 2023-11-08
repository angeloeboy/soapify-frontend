import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { DropdownHeader, DropdownItem, DropdownMenu, DropdownWrapper, SearchBar, TableControlPanel, Button } from "@/styled-components/TableControlPanel";
import useOutsideClick from "@/hooks/useOutsideclick";

const OrdersSearchBar = ({ setTransactionsDisplay, transactions, setCurrentPage }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedOrderStatus, setSelectedOrderStatus] = useState("All");

	const handleSearch = () => {
		let query = searchQuery;
		const queryTerms = query.split(" ");

		let filteredTransactions;

		// if (queryTerms.length > 1) {
		// 	filteredTransactions = transactions.filter((transaction) => {
		// 		return (
		// 			(queryTerms.every(
		// 				(term) =>
		// 					transaction.transaction_unique_id.toLowerCase().includes(term.toLowerCase()) ||
		// 					transaction.transaction_user_name.last_name.toLowerCase().includes(term.toLowerCase()) ||
		// 					transaction.transaction_user_name.first_name.toLowerCase().includes(term.toLowerCase())
		// 			) &&
		// 				selectedOrderStatus == "All") ||
		// 			transaction.status === selectedOrderStatus
		// 		);
		// 	});
		// } else {
		// 	filteredTransactions = transactions.filter((transaction) => {
		// 		return (
		// 			(transaction.transaction_unique_id.toLowerCase().includes(query.toLowerCase()) ||
		// 				transaction.transaction_user_name.last_name.toLowerCase().includes(query.toLowerCase()) ||
		// 				transaction.transaction_user_name.first_name.toLowerCase().includes(query.toLowerCase()) ||
		// 				transaction.transaction_number.toLowerCase().includes(query.toLowerCase())) &&
		// 			(selectedOrderStatus == "All" || transaction.status === selectedOrderStatus)
		// 		);
		// 	});
		// }

		filteredTransactions = transactions.filter((transaction) => {
			return (
				(queryTerms.every(
					(term) =>
						transaction.transaction_unique_id.toLowerCase().includes(term.toLowerCase()) ||
						transaction.transaction_user_name.last_name.toLowerCase().includes(term.toLowerCase()) ||
						transaction.transaction_user_name.first_name.toLowerCase().includes(term.toLowerCase())
				) &&
					selectedOrderStatus == "All") ||
				transaction.status === selectedOrderStatus
			);
		});
		console.log(selectedOrderStatus);
		setTransactionsDisplay(filteredTransactions);
		setCurrentPage(1);
	};

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	useEffect(() => {
		handleSearch();
	}, [searchQuery, transactions, selectedOrderStatus]);

	return (
		<TableControlPanel>
			<SearchBar>
				<p>Search for Orders</p>
				<input type="text" placeholder="Search" value={searchQuery} onChange={handleSearchChange} />
			</SearchBar>
			<div>
				<p> Status</p>
				<OrderStatus setSelectedOrderStatus={setSelectedOrderStatus} />
			</div>
			{/* 
			<div>
				<Button style={{ marginTop: "28px", padding: "16px 24px" }} onClick={() => setAddPaymentOpen(true)}>
					+ Add Payment Method
				</Button>
			</div> */}
		</TableControlPanel>
	);
};

const OrderStatus = ({ selectedOrderStatus, setSelectedOrderStatus }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState("All");
	const [status, setStatus] = useState(["Pending", "Paid", "Cancelled", "Refunded", "Done"]);
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
						setSelectedOrderStatus("All");
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
							setSelectedOrderStatus(option.toUpperCase());
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

export default OrdersSearchBar;
