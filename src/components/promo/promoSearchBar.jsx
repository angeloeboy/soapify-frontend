import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { DropdownHeader, DropdownItem, DropdownMenu, DropdownWrapper, SearchBar, TableControlPanel, Button } from "@/styled-components/TableControlPanel";
import { useEffect, useState } from "react";

const PromoSearchBar = ({ setIsAddPopUpOpen, setPromotionsDisplay, promotions, setCurrentPage }) => {
	const [query, setQuery] = useState("");

	useEffect(() => {
		handleSearch();
	}, [query]);

	const handleSearch = (e) => {
		const searchValue = query.toLowerCase();
		const filteredPromos = promotions.filter((promo) => {
			return (
				promo.promo_code.toLowerCase().includes(searchValue) ||
				promo.promo_code_type.toLowerCase().includes(searchValue) ||
				promo.promo_code_value.toString().includes(searchValue) ||
				promo.promo_code_max_use.toString().includes(searchValue) ||
				promo.promo_code_expiry.toLowerCase().includes(searchValue)
			);
		});
		setPromotionsDisplay(filteredPromos);
		setCurrentPage(1);
	};

	return (
		<TableControlPanel>
			<SearchBar>
				<p>Search for Promotions</p>
				<input type="text" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
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
//       <DropdownMenu $isOpen={isOpen}>
//         <DropdownItem key={"All"}>All</DropdownItem>
//       </DropdownMenu>
//     </DropdownWrapper>
//   );
// };

export default PromoSearchBar;
