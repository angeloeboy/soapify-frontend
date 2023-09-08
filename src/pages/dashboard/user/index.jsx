import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import DashboardLayout from "@/components/misc/dashboardLayout";
import StyledPanel from "@/styled-components/StyledPanel";
import PageTitle from "@/components/misc/pageTitle";
import Table, {
  ActionContainer,
  TableData,
  TableHeadings,
  TableRows,
} from "@/styled-components/TableComponent";
import { Button } from "@/styled-components/ItemActionModal";
import TopBar from "@/components/misc/topbar";
import UserSearchBarComponent from "@/components/misc/userSearchBarAndFilters";
import PopupContentUser from "@/components/user/addUser";

const User = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Initialize searchQuery
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // You can perform any other actions related to search here
  };

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  useEffect(() => {
    // Fetch your users or any other data here using a similar pattern as in the Products component.
    // For example:
    // fetchUsers().then((res) => {
    //   setUsers(res.users || []);
    // });
  }, []);

  return (
    <DashboardLayout>
      <PageTitle title="Accounts Lists" />
      <StyledPanel>
        <UserSearchBarComponent
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          handleOpenPopup={handleOpenPopup} // Pass handleOpenPopup function
        />
        <Table>
          <tbody>
            <TableRows heading>
              <TableHeadings>Name</TableHeadings>
              <TableHeadings>Username</TableHeadings>
              <TableHeadings>Status</TableHeadings>
              <TableHeadings>Type</TableHeadings>
              <TableHeadings>Actions</TableHeadings>
            </TableRows>
          </tbody>
        </Table>
      </StyledPanel>
      {isPopupOpen && <PopupContentUser onClose={handleClosePopup} />}
    </DashboardLayout>
  );
};

export default User;
