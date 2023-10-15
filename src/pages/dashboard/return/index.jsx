import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/misc/dashboardLayout";
import PageTitle from "@/components/misc/pageTitle";
import Table, { ActionContainer, TableData, TableHeadings, TableRows } from "@/styled-components/TableComponent";
import StyledPanel from "@/styled-components/StyledPanel";
import { faEllipsis,faTrash,faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddReturnComponent from "@/components/return/addReturn";
import ReturnSearchBar from "@/components/return/searchBar";
const ReturnPage = () => {
  const [returns, setReturns] = useState([]);
  const [filteredReturns, setFilteredReturns] = useState([]); // Initialize with an empty array
  const [activeActionContainer, setActiveActionContainer] = useState(-1);
  const [isAddPopUpOpen, setIsAddPopUpOpen] = useState(false);

  const handleSearch = (searchTerm) => {
    const filtered = returns.filter((returnItem) => {
      return (
        returnItem.customerInfo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        returnItem.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setFilteredReturns(filtered);
  };

  useEffect(() => {
    // Fetch return data when the component mounts (can be replaced with API calls)
    const staticReturnData = [
      {
        returnID: "R001",
        customerInfo: "John Doe",
        productName: "Product A",
        dateOfPurchase: "2023-01-15",
        returnAmount: 50.00,
        returnReason: "Defective",
        returnStatus: "Processing",
      },
      {
        returnID: "R002",
        customerInfo: "Alice Smith",
        productName: "Product B",
        dateOfPurchase: "2023-02-20",
        returnAmount: 30.00,
        returnReason: "Changed Mind",
        returnStatus: "Not Completed",
      },
      // Add more return objects here as needed
    ];

    setReturns(staticReturnData);
    setFilteredReturns(staticReturnData); // Initialize filteredReturns with all returns
  }, []);

  return (
    <DashboardLayout>
      <PageTitle title="Returns" />

      <StyledPanel>
        <ReturnSearchBar onSearch={handleSearch} setIsAddPopUpOpen={setIsAddPopUpOpen} setReturnsDisplay={setReturns} />

        <Table>
          <tbody>
            <TableRows heading>
              <TableHeadings>Return ID</TableHeadings>
              <TableHeadings>Customer Info</TableHeadings>
              <TableHeadings>Product Name</TableHeadings>
              <TableHeadings>Date of Purchase</TableHeadings>
              <TableHeadings>Return Amount</TableHeadings>
              <TableHeadings>Return Reason</TableHeadings>
              <TableHeadings>Return Status</TableHeadings>
              <TableHeadings>Actions</TableHeadings>
            </TableRows>

            {filteredReturns.map((returnItem, index) => (
              <TableRows key={returnItem.returnID}>
                <TableData>{returnItem.returnID}</TableData>
                <TableData>{returnItem.customerInfo}</TableData>
                <TableData>{returnItem.productName}</TableData>
                <TableData>{returnItem.dateOfPurchase}</TableData>
                <TableData>{returnItem.returnAmount}</TableData>
                <TableData>{returnItem.returnReason}</TableData>
                <TableData>{returnItem.returnStatus}</TableData>
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

      {isAddPopUpOpen && <AddReturnComponent setIsAddPopUpOpen={setIsAddPopUpOpen} />}
    </DashboardLayout>
  );
};

export default ReturnPage;
