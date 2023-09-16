import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import PopupContentWarehouse from "@/components/warehouse/addWarehouse";
import EditWarehouseComponent from "@/components/warehouse/editWarehouse";
import WarehouseSearchBarComponent from "@/components/warehouse/SearchBarAndFilter";

const User = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Initialize searchQuery
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isEditWarehouseOpen, setEditWarehouseOpen] = useState(false);
  const [activeActionContainer, setActiveActionContainer] = useState(-1);

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

  const openEditWarehouse = () => {
    setEditWarehouseOpen(true);
  };
  const closeEditWarehouse = () => {
    setEditWarehouseOpen(false);
  };

  // useEffect(() => {
  //   // Fetch your users or any other data here using a similar pattern as in the Products component.
  //   // For example:
  //   // fetchUsers().then((res) => {
  //   //   setUsers(res.users || []);
  //   // });
  // }, []);
  const warehouseData = [
    {
      warehouse_id: "1",
      warehouse_name: "warehouseName1",
      location: "Address123",
    },
    {
      warehouse_id: "2",
      warehouse_name: "warehouseName2",
      location: "Address1234",
    },
    {
      warehouse_id: "3",
      warehouse_name: "warehouseName3",
      location: "Address12345",
    },
  ];

  return (
    <DashboardLayout>
      <PageTitle title="Warehouse" />
      <StyledPanel>
        <WarehouseSearchBarComponent
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          handleOpenPopup={handleOpenPopup}
        />

        <Table>
          <tbody>
            <TableRows heading>
              <TableHeadings>Warehouse ID</TableHeadings>
              <TableHeadings>Warehouse Name</TableHeadings>
              <TableHeadings>Location</TableHeadings>
              <TableHeadings>Actions</TableHeadings>
            </TableRows>

            {warehouseData.map((warehouse, index) => (
              <TableRows key={index}>
                <TableData>{warehouse.warehouse_id}</TableData>
                <TableData>{warehouse.warehouse_name}</TableData>
                <TableData>{warehouse.location}</TableData>
                <TableData>
                  <FontAwesomeIcon
                    className="ellipsis"
                    icon={faEllipsis}
                    onClick={() =>
                      activeActionContainer === index
                        ? setActiveActionContainer(-1)
                        : setActiveActionContainer(index)
                    }
                  />

                  {activeActionContainer === index && (
                    <ActionContainer
                      onClick={() => setActiveActionContainer(-1)}
                    >
                      <p
                        onClick={() => {
                          openEditWarehouse();
                        }}
                      >
                        <FontAwesomeIcon icon={faPen} />
                        Edit
                      </p>
                      <p>
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </p>
                    </ActionContainer>
                  )}
                </TableData>
              </TableRows>
            ))}
          </tbody>
        </Table>
      </StyledPanel>
      {isPopupOpen && <PopupContentWarehouse onClose={handleClosePopup} />}
      {isEditWarehouseOpen && (
        <EditWarehouseComponent onClose={closeEditWarehouse} />
      )}
    </DashboardLayout>
  );
};

export default User;
