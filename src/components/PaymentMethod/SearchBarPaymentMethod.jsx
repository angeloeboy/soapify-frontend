import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { DropdownHeader, DropdownItem, DropdownMenu, DropdownWrapper, SearchBar, TableControlPanel, Button } from "@/styled-components/TableControlPanel";

import AddPaymentMethod from "./addPaymentMethod"; // Import the payment popup component

const PaymentSearchBarComponent = ({ fetchPaymentMethods, setAddPaymentOpen }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedPaymentType, setSelectedPaymentType] = useState("All");

	useEffect(() => {
		handleSearch();
	}, [searchQuery, selectedPaymentType]);

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleSearch = () => {
		const paymentType = selectedPaymentType;
		console.log(paymentType);
	};

	return (
		<TableControlPanel>
			<SearchBar>
				<p>Search for Payment Method</p>
				<input type="text" placeholder="Search" value={searchQuery} onChange={handleSearchChange} />
			</SearchBar>

			<div>
				<Button style={{ marginTop: "28px", padding: "16px 24px" }} onClick={() => setAddPaymentOpen(true)}>
					+ Add Payment Method
				</Button>
			</div>
		</TableControlPanel>
	);
};

export default PaymentSearchBarComponent;
