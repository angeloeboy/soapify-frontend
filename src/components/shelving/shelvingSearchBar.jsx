import React from "react";
import { TableControlPanel, SearchBar, Button } from "@/styled-components/TableControlPanel";

const ShelvingSearchBar = ({ setIsAddShelfPopupOpen, setShelvesDisplay, onSearch }) => {
  return (
    <TableControlPanel>
      <SearchBar>
        <p>Search for Shelving</p>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => onSearch(e.target.value)}
        />
      </SearchBar>

      <div>
        <p> Add Shelf </p>
        <Button onClick={() => setIsAddShelfPopupOpen(true)}>+ Add Shelf</Button>
      </div>
    </TableControlPanel>
  );
};

export default ShelvingSearchBar;
