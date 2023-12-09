import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { DropdownHeader, DropdownItem, DropdownMenu, DropdownWrapper, SearchBar, TableControlPanel, Button } from "@/styled-components/TableControlPanel";
import useOutsideClick from "@/hooks/useOutsideclick";

const OrdersSearchBar = ({ setTransactionsDisplay, transactions, setCurrentPage }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedOrderStatus, setSelectedOrderStatus] = useState("AWAITING PAYMENT");

	const handleSearch = () => {
		let query = searchQuery;
		const queryTerms = query.split(" ");

		let filteredTransactions;

		filteredTransactions = transactions.filter((transaction) => {
			return (
				(selectedOrderStatus === "All" || transaction.status.toUpperCase() === selectedOrderStatus) &&
				queryTerms.every(
					(term) =>
						transaction.transaction_no?.toLowerCase().includes(term.toLowerCase()) ||
						transaction.transaction_unique_id?.toLowerCase().includes(term.toLowerCase()) ||
						transaction.transaction_user_name.first_name.toLowerCase().includes(term.toLowerCase()) ||
						transaction.transaction_user_name.last_name.toLowerCase().includes(term.toLowerCase())
				)
			);
		});

		setTransactionsDisplay(filteredTransactions);
		setCurrentPage(1);
	};

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	useEffect(() => {
		handleSearch();
	}, [searchQuery, selectedOrderStatus, transactions]);

	return (
		<TableControlPanel>
			<SearchBar>
				<p>Search for Orders</p>
				<input type="text" placeholder="Search" value={searchQuery} onChange={handleSearchChange} />
			</SearchBar>
			<div>
				<p> Status</p>
				<OrderStatus setSelectedOrderStatus={setSelectedOrderStatus} transactions={transactions} />
			</div>
		</TableControlPanel>
	);
};

const OrderStatus = ({ setSelectedOrderStatus, transactions }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState("Awaiting Payment");
	const [status, setStatus] = useState(["Awaiting Payment", "Paid", "Cancelled", "Refunded", "Released", "Under Review"]);
	const [statusCount, setStatusCount] = useState([0, 0, 0, 0, 0]);
	const dropdownRef = useRef(null);

	useOutsideClick(dropdownRef, () => {
		if (isOpen) setIsOpen(false);
	});

	//count the number of orders depending on the status

	useEffect(() => {
		let awaitingPayment = 0;
		let paid = 0;
		let cancelled = 0;
		let refunded = 0;
		let released = 0;
		let under_review = 0;

		transactions.forEach((transaction) => {
			if (transaction.status === "AWAITING PAYMENT") awaitingPayment++;
			else if (transaction.status === "PAID") paid++;
			else if (transaction.status === "CANCELLED") cancelled++;
			else if (transaction.status === "REFUNDED") refunded++;
			else if (transaction.status === "RELEASED") released++;
			else if (transaction.status === "UNDER REVIEW") under_review++;
		});

		// setStatus([`Awaiting Payment (${awaitingPayment})`, `Paid (${paid})`, `Cancelled (${cancelled})`, `Refunded (${refunded})`, `Released (${released})`]);
		setStatusCount([awaitingPayment, paid, cancelled, refunded, released, under_review]);
		setSelectedItem("Awaiting Payment" + ` (${awaitingPayment})`);
	}, [transactions]);

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
						setSelectedItem("All" + ` (${transactions.length})`);
						setSelectedOrderStatus("All");
						setIsOpen(false);
					}}
				>
					All ({transactions.length})
				</DropdownItem>
				{status.map((option, index) => (
					<DropdownItem
						key={index + 1}
						onClick={() => {
							setSelectedItem(option + ` (${statusCount[index]})`);
							setSelectedOrderStatus(option.toUpperCase());
							setIsOpen(false);
						}}
					>
						{option} ({statusCount[index]})
					</DropdownItem>
				))}
			</DropdownMenu>
		</DropdownWrapper>
	);
};

export default OrdersSearchBar;
