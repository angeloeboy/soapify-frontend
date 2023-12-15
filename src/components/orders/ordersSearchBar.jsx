import React, { useState, useEffect, useRef, useMemo, useContext } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { DropdownHeader, DropdownItem, DropdownMenu, DropdownWrapper, SearchBar, TableControlPanel, Button } from "@/styled-components/TableControlPanel";
import useOutsideClick from "@/hooks/useOutsideclick";
import { WebSocketContext } from "../context/WebsocketContext";

const OrdersSearchBar = ({ setTransactionsDisplay, transactions, setCurrentPage, user }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedOrderStatus, setSelectedOrderStatus] = useState(user ? "All" : "Awaiting Payment");

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
	}, [searchQuery, selectedOrderStatus, transactions, user]);

	return (
		<TableControlPanel>
			<SearchBar>
				<p>Search for Orders</p>
				<input type="text" placeholder="Search" value={searchQuery} onChange={handleSearchChange} />
			</SearchBar>
			<div>
				<p> Status</p>
				<OrderStatus setSelectedOrderStatus={setSelectedOrderStatus} transactions={transactions} user={user} />
			</div>
		</TableControlPanel>
	);
};

const OrderStatus = ({ setSelectedOrderStatus, transactions, user }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(user ? "All" : "Awaiting Payment");
	const [status, setStatus] = useState(["Awaiting Payment", "Paid", "Cancelled", "Refunded", "Released", "Under Review"]);
	const [statusCount, setStatusCount] = useState([0, 0, 0, 0, 0, 0]);
	const dropdownRef = useRef(null);

	useOutsideClick(dropdownRef, () => {
		if (isOpen) setIsOpen(false);
	});

	useEffect(() => {
		let counts = {
			awaitingPayment: 0,
			paid: 0,
			cancelled: 0,
			refunded: 0,
			released: 0,
			under_review: 0,
		};

		transactions.forEach((transaction) => {
			switch (transaction.status) {
				case "AWAITING PAYMENT":
					counts.awaitingPayment++;
					break;
				case "PAID":
					counts.paid++;
					break;
				case "CANCELLED":
					counts.cancelled++;
					break;
				case "REFUNDED":
					counts.refunded++;
					break;
				case "RELEASED":
					counts.released++;
					break;
				case "UNDER REVIEW":
					counts.under_review++;
					break;
				default:
					break;
			}
		});

		setStatusCount([counts.awaitingPayment, counts.paid, counts.cancelled, counts.refunded, counts.released, counts.under_review]);
		let newcount = [counts.awaitingPayment, counts.paid, counts.cancelled, counts.refunded, counts.released, counts.under_review];

		const statusInSelectedItem = selectedItem.includes("(") ? selectedItem.substring(0, selectedItem.indexOf("(")).trim() : selectedItem;

		// Find the index of this status in the status array
		let index = status.findIndex((s) => s === statusInSelectedItem);
		console.log("index id", index);
		console.log("index", statusInSelectedItem);
		console.log("count", newcount[0]);
		if (index !== -1) {
			//if selected item is All
			if (selectedItem.includes("All")) {
				setSelectedItem("All" + ` (${transactions.length})`);
				return;
			}

			let updatedSelectedItem = `${status[index]} (${newcount[index]})`;
			setSelectedItem(updatedSelectedItem);
			setSelectedOrderStatus(status[index].toUpperCase());
		}

		console.log("Status Count changed");
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
