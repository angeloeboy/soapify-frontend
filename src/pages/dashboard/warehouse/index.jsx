import React, { useState, useRef, useEffect } from "react";

import DashboardLayout from "@/components/misc/dashboardLayout";
import StyledPanel from "@/styled-components/StyledPanel";
import PageTitle from "@/components/misc/pageTitle";
import Table, {
  ActionContainer,
  TableData,
  TableHeadings,
  TableRows,
} from "@/styled-components/TableComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddWarehouse from "@/components/warehouse/addWarehouse";
import WarehouseSearchBar from "@/components/warehouse/warehouseSearchBar";
import { getAllWarehouse } from "@/api/warehouse";
import EditWarehouse from "@/components/warehouse/editWarehouse";
import DeactivateModal from "@/components/misc/deactivate";
import { PaginationControl } from "@/styled-components/ItemActionModal";
import Pagination from "@/components/misc/pagination";

const Warehouse = () => {
  const [isAddPopUpOpen, setAddPopUpOpen] = useState(false);
  const [isEditPopUpOpen, setEditPopUpOpen] = useState(false);
  const [activeActionContainer, setActiveActionContainer] = useState(-1);
  const [clickedId, setClickedId] = useState(null);
  const [clickedName, setClickedName] = useState(null);
  const [showDeactivate, setShowDeactivate] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const paginatedWarehouses = warehouses.slice(startIndex, endIndex);

  const fetchWarehouses = async () => {
    const res = await getAllWarehouse();
    res ? setWarehouses(res.warehouses) : setWarehouses([]);
  };

  const deactivateWarehouse = async () => {};

  return (
    <DashboardLayout>
      <PageTitle title="Warehouse" />
      <StyledPanel>
        <WarehouseSearchBar setAddPopUpOpen={setAddPopUpOpen} />

        <Table>
          <tbody>
            <TableRows $heading>
              <TableHeadings>Warehouse ID</TableHeadings>
              <TableHeadings>Warehouse Name</TableHeadings>
              <TableHeadings>Location</TableHeadings>
              <TableHeadings>Actions</TableHeadings>
            </TableRows>

            {paginatedWarehouses.map((warehouse, index) => (
              <TableRows key={index}>
                <TableData>{warehouse.warehouse_id}</TableData>
                <TableData>{warehouse.warehouse_name}</TableData>
                <TableData>{warehouse.warehouse_location}</TableData>
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
                          setClickedId(warehouse.warehouse_id);
                          setEditPopUpOpen(true);
                        }}
                      >
                        <FontAwesomeIcon icon={faPen} />
                        Edit
                      </p>
                      <p
                        onClick={() => {
                          setShowDeactivate(true);
                          setClickedName(warehouse.warehouse_name);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </p>
                    </ActionContainer>
                  )}
                </TableData>
              </TableRows>
            ))}
          </tbody>
        </Table>
        <Pagination
          totalItems={warehouses.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={(newPage) => setCurrentPage(newPage)}
        />
      </StyledPanel>
      {isAddPopUpOpen && (
        <AddWarehouse
          setAddPopUpOpen={setAddPopUpOpen}
          fetchWarehouses={fetchWarehouses}
        />
      )}
      {isEditPopUpOpen && (
        <EditWarehouse
          setEditPopUpOpen={setEditPopUpOpen}
          fetchWarehouses={fetchWarehouses}
          clickedId={clickedId}
        />
      )}
      {showDeactivate && (
        <DeactivateModal
          type="warehouse"
          text={clickedName}
          close={setShowDeactivate}
        />
      )}
    </DashboardLayout>
  );
};

export default Warehouse;
