import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { DropdownHeader, DropdownItem, DropdownMenu, DropdownWrapper, SearchBar, TableControlPanel, Button } from "@/styled-components/TableControlPanel";

const PromoSearchBar = ({ setIsAddPopUpOpen, setPromosDisplay, onSearch }) => {
	return (
		<TableControlPanel>
			  <SearchBar>
          <p>Search for Promotions</p>
          <input
          type="text"
          placeholder="Search"
          onChange={(e) => onSearch(e.target.value)}
          />
      </SearchBar>


			<div>
				<p> Add Promotion </p>
				<Button onClick={() => setIsAddPopUpOpen(true)}>+ Add Promo</Button>
			</div>

			{/* Dropdown component (you can uncomment this part if needed) */}
			{/* <Dropdown /> */}
		</TableControlPanel>
	);
};

// If you need a dropdown, you can uncomment and customize the Dropdown component

// const Dropdown = () => {
//   const isOpen = false;

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
// };

export default PromoSearchBar;
