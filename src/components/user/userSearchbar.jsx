import React, { useState } from "react";

const UserSearchBarComponent = ({ users, setFilteredUsers, setCurrentPage, setIsLoading }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    setIsLoading(true);
    const filteredUsers = users.filter((user) =>
      user.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
    setCurrentPage(1); // Reset the current page to 1
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(); // Automatically update the table as you type
  };

  return (
    <div className="user-search-bar">
      <input
        type="text"
        placeholder="Search users"
        value={searchTerm}
        onChange={handleInputChange} // Trigger search on input change
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default UserSearchBarComponent;
