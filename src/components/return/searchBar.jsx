import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { DropdownHeader, DropdownItem, DropdownMenu, DropdownWrapper, SearchBar, TableControlPanel, Button } from "@/styled-components/TableControlPanel";

const ReturnSearchBar = ({ setIsAddPopUpOpen, setReturnsDisplay }) => {
  return (
    <TableControlPanel>
      <SearchBar>
        <p>Search for Returns</p>
        <input type="text" placeholder="Search" />
      </SearchBar>

      <div>
        <p> Add Return </p>
        <Button onClick={() => setIsAddPopUpOpen(true)}>+ Add Return</Button>

       </div>

      <Dropdown />
    </TableControlPanel>
  );
};

const Dropdown = () => {
  const isOpen = false;

  return (
    <DropdownWrapper>
      <DropdownHeader>
        <FontAwesomeIcon icon={faFilter} />
        All
      </DropdownHeader>
      <DropdownMenu isOpen={isOpen}>
        <DropdownItem key={"All"}>All</DropdownItem>
        {/* Add more filtering options here */}
      </DropdownMenu>
    </DropdownWrapper>
  );
};

export default ReturnSearchBar;
