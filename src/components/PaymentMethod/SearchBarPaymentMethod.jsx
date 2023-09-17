import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import {
  DropdownHeader,
  DropdownItem,
  DropdownMenu,
  DropdownWrapper,
  SearchBar,
  TableControlPanel,
  Button,
} from "@/styled-components/TableControlPanel";

import PopupContentPaymentMethod from "./addPaymentMethod"; // Import the payment popup component

const PaymentSearchBarComponent = () => {
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
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </SearchBar>
      <div>
        <p>Payment Type</p>
        <PaymentTypeDropDown paymentTypeChange={paymentTypeChange} />
      </div>
      <div>
        <Button
          style={{ marginTop: "28px", padding: "16px 24px" }}
          onClick={handleOpenPopupContentPayment}
        >
          + Add Payment Method
        </Button>
        {isPopupContentPaymentOpen && (
          <PopupContentPaymentMethod onClose={handleClosePopupContentPayment} />
        )}
      </div>
    </TableControlPanel>
  );
};

const PaymentTypeDropDown = ({ paymentTypeChange }) => {
  const [isPaymentTypeDropDownOpen, setIsPaymentTypeDropDownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("All");

  return (
    <DropdownWrapper
      onClick={() => setIsPaymentTypeDropDownOpen(!isPaymentTypeDropDownOpen)}
    >
      <DropdownHeader>
        <FontAwesomeIcon icon={faFilter} />
        {selectedItem}
      </DropdownHeader>
      <DropdownMenu isPaymentTypeDropDownOpen={isPaymentTypeDropDownOpen}>
        <DropdownItem
          key={0}
          onClick={() => {
            setSelectedItem("All");
            setIsPaymentTypeDropDownOpen(false);
            paymentTypeChange("All");
          }}
        >
          All
        </DropdownItem>

        {/* Add other payment types as DropdownItems */}
      </DropdownMenu>
    </DropdownWrapper>
  );
};

export default PaymentSearchBarComponent;
