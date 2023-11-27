import React, { useEffect, useState } from "react";
import { TableControlPanel, SearchBar, Button } from "@/styled-components/TableControlPanel";
import AddUser from "./addUser";

const UserSearchBarComponent = ({ users, setFilteredUsers, setCurrentPage, setIsLoading, setUserDisplay }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [isPopupContenUserOpen, setIsPopupContentUserOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState("All");

	useEffect(() => {
		handleSearch();
	}, [searchTerm, , users]);

	const handleOpenPopupContentUser = () => {
		setIsPopupContentUserOpen(true);
	};

	const handleClosePopupContentUser = () => {
		setIsPopupContentUserOpen(false);
	};

	const handleSearch = () => {
		const queryTerms = searchTerm.split(" ");

		let filteredUsers;

		filteredUsers = users.filter((user) => {
			return queryTerms.every(
				(term) =>
					user.first_name.toLowerCase().includes(term.toLowerCase()) ||
					user.last_name.toLowerCase().includes(term.toLowerCase()) ||
					user.email.toLowerCase().includes(term.toLowerCase())
			);
		});

		setUserDisplay(filteredUsers);
		setCurrentPage(1);
	};

	const handleInputChange = (e) => {
		setSearchTerm(e.target.value);
		handleSearch();
	};

	return (
		<TableControlPanel>
			<SearchBar>
				<div className="user-search-bar">
					<input type="text" placeholder="Search users" value={searchTerm} onChange={handleInputChange} />
				</div>
			</SearchBar>

			<div>
				<Button style={{ marginTop: "10px", padding: "16px 24px" }} onClick={handleOpenPopupContentUser}>
					+ Add User
				</Button>
				{isPopupContenUserOpen && <AddUser onClose={handleClosePopupContentUser} />}
			</div>
		</TableControlPanel>
	);
};

export default UserSearchBarComponent;
