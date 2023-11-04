import React from "react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DashboardLayout from "@/components/misc/dashboardLayout";
import PageTitle from "@/components/misc/pageTitle";
import StyledPanel from "@/styled-components/StyledPanel";
import { TableData,TableRows,TableHeadings } from "@/styled-components/TableComponent";
import Table from "@/styled-components/TableComponent";
import { faFilter, faPlus, faEdit, faEllipsis } from "@fortawesome/free-solid-svg-icons";
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

import AddWarehouseArea from "@/components/warehouseArea/addWarehouseArea";  
import WarehouseAreaSearchBar from "@/components/warehouseArea/warehouseAreSearchBar";

const WarehouseAreas = () => {
  const [showAddPopUp, setShowAddPopUp] = useState(false); // Add this line
	const [activeActionContainer, setActiveActionContainer] = useState(-1);

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

  const itemsPerPage = 10;
  const currentPage = 1; // Set the current page as needed

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const paginatedAreas = filteredWarehouseAreas.slice(startIndex, endIndex);

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
                  {/* <TableData>
										<FontAwesomeIcon
											className="ellipsis"
											icon={faEllipsis}
											onClick={() => (activeActionContainer === index ? setActiveActionContainer(-1) : setActiveActionContainer(index))}
										/>

										{activeActionContainer === index && (
											<ActionContainer onClick={() => setActiveActionContainer(-1)}>
												<p
													onClick={() => {
														setSelectedProductId(product.product_id);
														openEditPopUp(selectedProductId);
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
									</TableData> */}
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
        <Pagination totalItems={filteredWarehouseAreas.length} itemsPerPage={itemsPerPage} currentPage={currentPage} />
      </StyledPanel>
    </DashboardLayout>
  );
};

export default WarehouseAreas;
