import React, { useEffect, useState } from "react";
import { TableControlPanel, SearchBar, Button } from "@/styled-components/TableControlPanel";
import AddUser from "./addUser";

const UserSearchBarComponent = ({ users, setFilteredUsers, setCurrentPage, setUserDisplay, setisAddUserOpen }) => {
	const [searchTerm, setSearchTerm] = useState("");

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
				<Button style={{ marginTop: "10px", padding: "16px 24px" }} onClick={() => setisAddUserOpen(true)}>
					+ Add User
				</Button>
			</div>
		</TableControlPanel>
	);
};

export default UserSearchBarComponent;
