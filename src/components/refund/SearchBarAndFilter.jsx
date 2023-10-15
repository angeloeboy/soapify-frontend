import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { DropdownHeader, DropdownItem, DropdownMenu, DropdownWrapper, SearchBar, TableControlPanel, Button } from "@/styled-components/TableControlPanel";

const RefundSearchBar = ({ setIsAddPopUpOpen, setRefundsDisplay }) => {
  return (
    <TableControlPanel>
      <SearchBar>
        <p>Search for Refund</p>
        <input type="text" placeholder="Search" />
      </SearchBar>

      <div>
        <p> Add Refund </p>
        <Button onClick={() => setIsAddPopUpOpen(true)}>+ Add Refund</Button>
      </div>

      <Dropdown />
    </TableControlPanel>
  );
};

const Dropdown = () => {
  const isOpen = false;

//   return (
//     <DropdownWrapper>
//       <DropdownHeader>
//         <FontAwesomeIcon icon={faFilter} />
//         All
//       </DropdownHeader>
//       <DropdownMenu isOpen={isOpen}>
//         <DropdownItem key={"All"}>All</DropdownItem>
//       </DropdownMenu>
//     </DropdownWrapper>
//   );
};

export default RefundSearchBar;
