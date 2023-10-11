import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { DropdownHeader, DropdownItem, DropdownMenu, DropdownWrapper, SearchBar, TableControlPanel, Button } from "@/styled-components/TableControlPanel";

import AddPaymentMethod from "./addPaymentMethod"; // Import the payment popup component

const PaymentSearchBarComponent = ({ fetchPaymentMethods }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedPaymentType, setSelectedPaymentType] = useState("All");
	const [isPopupContentPaymentOpen, setIsPopupContentPaymentOpen] = useState(false);

	useEffect(() => {
		handleSearch();
	}, [searchQuery, selectedPaymentType]);

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const paymentTypeChange = (paymentType) => {
		setSelectedPaymentType(paymentType);
	};

	const handleSearch = () => {
		const paymentType = selectedPaymentType;
		console.log(paymentType);
	};

	const handleOpenPopupContentPayment = () => {
		setIsPopupContentPaymentOpen(true);
	};

	const handleClosePopupContentPayment = () => {
		setIsPopupContentPaymentOpen(false);
	};

	return (
		<TableControlPanel>
			<SearchBar>
				<p>Search for Payment Method</p>
				<input type="text" placeholder="Search" value={searchQuery} onChange={handleSearchChange} />
			</SearchBar>

			<div>
				<Button style={{ marginTop: "28px", padding: "16px 24px" }} onClick={handleOpenPopupContentPayment}>
					+ Add Payment Method
				</Button>
				{isPopupContentPaymentOpen && <AddPaymentMethod onClose={handleClosePopupContentPayment} fetchPaymentMethods={fetchPaymentMethods} />}
			</div>
		</TableControlPanel>
	);
};

export default PaymentSearchBarComponent;
