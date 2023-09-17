import React, { useState, useRef, useEffect } from "react";
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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import WarehouseSearchBarComponent from "@/components/warehouse/SearchBarAndFilter";
import { getSuppliers } from "@/api/supplier";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AddSupplierComponent from "@/components/suppliers/addSupplier";
import EditSupplierComponent from "@/components/suppliers/editSupplier";
import SupplierSearchBarComponent from "@/components/suppliers/searchBarAndFilter";

const Suppliers = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Initialize searchQuery
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [activeActionContainer, setActiveActionContainer] = useState(-1);
  const [suppliers, setSuppliers] = useState([]);
  const [suppliersDisplay, setSuppliersDisplay] = useState([]); // Initialize suppliersDisplay
  const [supplierLoading, setSupplierLoading] = useState([]);
  const [isEditSupplierPopupOpen, setEditSupplierPopUpOpen] = useState(false);
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

  const openEditSupplier = () => {
    setEditSupplierPopUpOpen(true);
  };

  const closeEditSupplier = () => {
    setEditSupplierPopUpOpen(false);
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = () => {
    setSupplierLoading(true);
    getSuppliers().then((res) => {
      console.log(res);
      setSuppliers(res.suppliers || []);
      setSuppliersDisplay(res.suppliers || []);
      setSupplierLoading(false);
    });
  };

  const [selectedSupplierId, setSelectedSupplierId] = useState(null);

  return (
    <DashboardLayout>
      <PageTitle title="Suppliers" />
      <StyledPanel>
        <SupplierSearchBarComponent
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          handleOpenPopup={handleOpenPopup}
          suppliers={suppliers}
          setSuppliersDisplay={setSuppliersDisplay}
        />

        <Table>
          <tbody>
            <TableRows heading>
              <TableHeadings> ID</TableHeadings>
              <TableHeadings>Supplier Name</TableHeadings>
              <TableHeadings>Contact</TableHeadings>
              <TableHeadings>Address</TableHeadings>
              <TableHeadings>Actions</TableHeadings>
            </TableRows>

            {supplierLoading
              ? Array.from({ length: 8 }, (_, index) => (
                  <TableRows key={index}>
                    <TableData>
                      <Skeleton width={50} height={20} />
                    </TableData>
                    <TableData>
                      <Skeleton width={50} height={20} />
                    </TableData>
                    <TableData>
                      <Skeleton width={50} height={20} />
                    </TableData>
                    <TableData>
                      <Skeleton width={50} height={20} />
                    </TableData>
                    <TableData>
                      <Skeleton width={50} height={20} />
                    </TableData>
                  </TableRows>
                ))
              : suppliersDisplay.map((supplier, index) => (
                  <TableRows key={supplier.supplier_id}>
                    <TableData>{supplier.supplier_id}</TableData>
                    <TableData>{supplier.supplier_name}</TableData>
                    <TableData>{supplier.supplier_phone}</TableData>
                    <TableData>{supplier.supplier_address}</TableData>
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
                              setSelectedSupplierId(supplier.supplier_id);
                              openEditSupplier(selectedSupplierId);
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
      {isPopupOpen && (
        <AddSupplierComponent
          onClose={handleClosePopup}
          fetchSuppliers={fetchSuppliers}
        />
      )}
      {isEditSupplierPopupOpen && (
        <EditSupplierComponent
          onClose={closeEditSupplier}
          supplierID={selectedSupplierId}
          fetchSuppliers={fetchSuppliers}
          //   onButtonClick={onButtonClick}
          //   GetProducts={fetchProducts}
        />
      )}
    </DashboardLayout>
  );
};

export default Suppliers;
