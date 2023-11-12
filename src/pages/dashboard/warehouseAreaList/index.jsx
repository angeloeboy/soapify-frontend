import React from "react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DashboardLayout from "@/components/misc/dashboardLayout";
import PageTitle from "@/components/misc/pageTitle";
import StyledPanel from "@/styled-components/StyledPanel";
import { TableData,TableRows,TableHeadings,ActionContainer } from "@/styled-components/TableComponent";
import Table from "@/styled-components/TableComponent";
import { faFilter, faPlus, faEdit, faEllipsis,faPen,faTrash} from "@fortawesome/free-solid-svg-icons";
import Pagination from "@/components/misc/pagination";
import {
  DropdownHeader,
  DropdownItem,
  DropdownMenu,
  DropdownWrapper,
  SearchBar,
  TableControlPanel,
  Button,
} from "@/styled-components/TableControlPanel";
import EditWarehouseArea from "@/components/warehouseArea/editWarehouseAre";
import AddWarehouseArea from "@/components/warehouseArea/addWarehouseArea";  
import WarehouseAreaSearchBar from "@/components/warehouseArea/warehouseAreSearchBar";

const WarehouseAreas = () => {
  const [showAddPopUp, setShowAddPopUp] = useState(false); // Add this line
	const [activeActionContainer, setActiveActionContainer] = useState(-1);
  const [editingWarehouseArea, setEditingWarehouseArea] = useState(null);

  const [warehouseAreas, setWarehouseAreas] = useState([
    {
      name: "Receiving",
      description: "Goods receipt and inspection",
      areaType: "Storage",
      capacity: "1000 sq. ft",
      location: "dun sa malayo",
    },
    {
        name: "Receiving",
        description: "Goods receipt and inspection",
        areaType: "Storage",
        capacity: "500 sq. ft",
        location: "sa tabi ng bintana ",
      },
      {
        name: "Receiving",
        description: "Goods receipt and inspection",
        areaType: "Storage",
        capacity: "450 sq. ft",
        location: "sa tabi ng cabinet ",
      },
      {
        name: "Receiving",
        description: "Goods receipt and inspection",
        areaType: "Storage",
        capacity: "1500 sq. ft",
        location: "sa left side ng bahay",
      },
   ]);

  const [filteredWarehouseAreas, setFilteredWarehouseAreas] = useState([...warehouseAreas]);

  const [currentPage, setCurrentPage] = useState(1);
	const [pagePerItem, setPagePerItem] = useState(10);


  const startIndex = (currentPage - 1) * pagePerItem;
  const endIndex = currentPage * pagePerItem;
  const paginatedAreas = filteredWarehouseAreas.slice(startIndex, endIndex);

  const handleEditClick = (index) => {
    setActiveActionContainer(index);
    setEditingWarehouseArea(warehouseAreas[index]);
  };
  const handleEditSave = (updatedWarehouseArea) => {
    // Update the warehouse area in your data source, e.g., an array or API
    // Also update the state or data source for the warehouse areas
    setActiveActionContainer(-1);
  };


  return (
    <DashboardLayout>
      <PageTitle title="Warehouse Areas List" />

      <StyledPanel>
        <WarehouseAreaSearchBar
          setAddPopUpOpen={setShowAddPopUp}
          warehouseAreas={warehouseAreas}
          setFilteredWarehouseAreas={setFilteredWarehouseAreas}
        />
        <Table>
          <tbody>
            <TableRows $heading>
              <TableHeadings>Area Name</TableHeadings>
              <TableHeadings>Description</TableHeadings>
              <TableHeadings>Area Type</TableHeadings>
              <TableHeadings>Capacity</TableHeadings>
              <TableHeadings>Location</TableHeadings>
              <TableHeadings>Actions</TableHeadings>
            </TableRows>

            {filteredWarehouseAreas.length === 0 ? (
              <p>No Warehouse Areas found</p>
            ) : (
              paginatedAreas.map((area, index) => (
                <TableRows key={index}>
                  <TableData>{area.name}</TableData>
                  <TableData>{area.description}</TableData>
                  <TableData>{area.areaType}</TableData>
                  <TableData>{area.capacity}</TableData>
                  <TableData>{area.location}</TableData>
                  <TableData>
                  <FontAwesomeIcon
                      className="ellipsis"
                      icon={faPen}
                      onClick={() => handleEditClick(index)}
                    />

                    {activeActionContainer === index && (
                      <EditWarehouseArea
                        warehouseAreaData={editingWarehouseArea}
                        onClose={() => setActiveActionContainer(-1)}
                      />
                    )}

                </TableData>
                </TableRows>
              ))
            )}
          </tbody>
        </Table>
        {showAddPopUp && (
          <AddWarehouseArea
            setAddPopUpOpen={setShowAddPopUp}
            // fetchWarehouseAreas
          />
        )}
        <Pagination totalItems={filteredWarehouseAreas.length} itemsPerPage={pagePerItem} currentPage={currentPage} />
      </StyledPanel>
    </DashboardLayout>
  );
};

export default WarehouseAreas;
