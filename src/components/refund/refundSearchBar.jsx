import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SearchBar, TableControlPanel, Button } from "@/styled-components/TableControlPanel";

const RefundSearchBar = ({ setIsAddPopUpOpen, onSearch }) => {
  return (
    <TableControlPanel>
      <SearchBar>
        <p>Search for Refund</p>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => onSearch(e.target.value)}
        />
      </SearchBar>

      <div>
        <p> Add Refund </p>
        <Button onClick={() => setIsAddPopUpOpen(true)}>+ Add Refund</Button>
      </div>
    </TableControlPanel>
  );
};

export default RefundSearchBar;
