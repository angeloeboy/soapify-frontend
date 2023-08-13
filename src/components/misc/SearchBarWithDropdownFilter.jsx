const { FieldTitle } = require("@/styled-components/StyledPanel");
const styled = require("styled-components");

const SearchBarContainer = styled.div`
	display: flex;
	align-items: center;
	position: relative;
	background-color: transparent; /* Make the background transparent */
	margin-bottom: 20px; /* Add margin-bottom to create a gap between SearchBar and CategoriesButton */
`;

const SearchIcon = styled.img`
	position: absolute;
	top: 50%;
	left: 20px; /* Adjust the left position as needed */
	transform: translateY(-50%);
	width: 20px;
	height: 20px;
	cursor: pointer;
`;

const SearchBar = styled.input`
	width: 592px;
	padding: 10px 30px 10px 50px; /* Add padding on both sides for the icon */
	border: 1px solid #dddd;
	border-radius: 4px;
	font-size: 14px;
	border-radius: 12px;
`;

const CategoriesButton = styled.button`
	color: black;
	background-color: transparent; /* Make the background transparent */
	border: 1px solid #dddd; /* Add a border around the button */
	font-size: 6px;
	cursor: pointer;
	padding: 8px 15px;
	display: flex;
	align-items: center;
	gap: 10px;
	border-radius: 12px;
	margin-left: 16px;
	min-width: 108px;
`;

const FilterIcon = styled.img`
	width: 20px;
	height: 20px;
`;

const AllText = styled.span`
	font-size: 16px;
	font-weight: bold;
`;

let SearchBarWithDropdownFilter = (props) => {
	return (
		<>
			<FieldTitle>Search for Product</FieldTitle>

			<SearchBarContainer>
				<SearchIcon src="search.png" alt="Search Icon" />
				<SearchBar type="text" placeholder="Search" value={searchQuery} onChange={handleSearchChange} />
				<CategoriesButton onClick={() => router.push("/categories")}>
					<FilterIcon src="Filter.PNG" alt="Filter Icon" />
					<AllText>All</AllText>
				</CategoriesButton>
			</SearchBarContainer>
		</>
	);
};

export default SearchBarWithDropdownFilter;
