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

const OrdersSearchBar = ({ setTransactionsDisplay, transactions }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    let query = searchQuery;
    const queryTerms = query.split(" ");

    let filteredTransactions;

    if (queryTerms.length > 1) {
      filteredTransactions = transactions.filter((transaction) => {
        return queryTerms.every(
          (term) =>
            transaction.transaction_unique_id
              .toLowerCase()
              .includes(term.toLowerCase()) ||
            transaction.transaction_user_name.last_name
              .toLowerCase()
              .includes(term.toLowerCase()) ||
            transaction.transaction_user_name.first_name
              .toLowerCase()
              .includes(term.toLowerCase())
        );
      });
    } else {
      filteredTransactions = transactions.filter((transaction) => {
        return (
          transaction.transaction_unique_id
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          transaction.transaction_user_name.last_name
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          transaction.transaction_user_name.first_name
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          transaction.transaction_number
            .toLowerCase()
            .includes(query.toLowerCase())
        );
      });
    }

    // filteredTransactions = query
    // 	? transactions.filter((transaction) => {
    // 			transaction.transaction_unique_id.toLowerCase().includes(query.toLowerCase()) ||
    // 				transaction.transaction_user_name.last_name.toLowerCase().includes(query.toLowerCase()) ||
    // 				transaction.transaction_user_name.first_name.toLowerCase().includes(query.toLowerCase());
    // 	  })
    // 	: transactions;

    setTransactionsDisplay(filteredTransactions);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  return (
    <TableControlPanel>
      <SearchBar>
        <p>Search for Orders</p>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </SearchBar>
      {/* 
			<div>
				<Button style={{ marginTop: "28px", padding: "16px 24px" }} onClick={() => setAddPaymentOpen(true)}>
					+ Add Payment Method
				</Button>
			</div> */}
    </TableControlPanel>
  );
};

export default OrdersSearchBar;
