import DashboardLayout from "@/components/misc/dashboardLayout";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Table, {
  ActionContainer,
  TableData,
  TableHeadings,
  TableRows,
} from "@/styled-components/TableComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import PageTitle from "@/components/misc/pageTitle";
import StyledPanel from "@/styled-components/StyledPanel";
import ProductPageSearchBar from "@/components/product/searchBarAndFiltersProductPages";
import AddProductComponent from "@/components/product/addProduct";
const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [activeActionContainer, setActiveActionContainer] = useState(-1);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // Handle search logic here
  };

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const yourData = [ {

  
    warehouse_id: "1",
    warehouse_name:"warehouseName1",
    location:"Address123"  

},];

  return (
    <DashboardLayout>
      <PageTitle title="Products Page" />
      <StyledPanel>
      <ProductPageSearchBar
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        handleOpenPopup={handleOpenPopup}
      />

         
        <Table>
          <tbody>
            <TableRows heading>
              <TableHeadings>Column 1</TableHeadings>
              <TableHeadings>Column 2</TableHeadings>
              <TableHeadings>Column 3</TableHeadings>
              <TableHeadings>Column 4</TableHeadings>
              <TableHeadings>Column 5</TableHeadings>
              <TableHeadings>Actions</TableHeadings>
            </TableRows>

            {yourData.map((item, index) => (
              <TableRows key={index}>
                <TableData>{item.data1}</TableData>
                <TableData>{item.data2}</TableData>
                <TableData>{item.data3}</TableData>
                <TableData>{item.data2}</TableData>
                <TableData>{item.data3}</TableData>
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
                    <ActionContainer onClick={() => setActiveActionContainer(-1)}>
                      <p>
                        <FontAwesomeIcon icon={faPen} /> Edit
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
      {isPopupOpen && <AddProductComponent onClose={handleClosePopup} />}
    </DashboardLayout>
  );
};

export default ProductsPage;
