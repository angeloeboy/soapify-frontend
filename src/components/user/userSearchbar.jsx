import React, { useState } from "react";
import { TableControlPanel, SearchBar, Button } from "@/styled-components/TableControlPanel";
import AddUser from "./addUser";

const UserSearchBarComponent = ({ users, setFilteredUsers, setCurrentPage, setIsLoading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isPopupContenUserOpen, setIsPopupContentUserOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const accountTypeChange = (category) => {
    setSelectedCategory(category);
  };

  const handleOpenPopupContentUser = () => {
    setIsPopupContentUserOpen(true);
  };

  const handleClosePopupContentUser = () => {
    setIsPopupContentUserOpen(false);
  };

  const handleSearch = () => {
    setIsLoading(true);
    const filteredUsers = users.filter((user) =>
      user.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
    setCurrentPage(1);
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch();
  };

  return (
    <TableControlPanel>
      <SearchBar>
        <div className="user-search-bar">
          <input
            type="text"
            placeholder="Search users"
            value={searchTerm}
            onChange={handleInputChange}
          />
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
