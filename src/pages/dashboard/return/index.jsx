import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/misc/dashboardLayout";
import PageTitle from "@/components/misc/pageTitle";
import Table, { ActionContainer, TableData, TableHeadings, TableRows } from "@/styled-components/TableComponent";
import StyledPanel from "@/styled-components/StyledPanel";
import { faEllipsis, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddReturnComponent from "@/components/return/addReturn"; 
import ReturnSearchBar from "@/components/return/SearchBarAndFilters"; 
const ReturnPage = () => {
  const [returns, setReturns] = useState([]);
  const [activeActionContainer, setActiveActionContainer] = useState(-1);
  const [isAddPopUpOpen, setIsAddPopUpOpen] = useState(false);

  useEffect(() => {
    // Fetch return data when the component mounts (replace with API calls)
    const staticReturnData = [
      {
        returnID: "R001",
        customerInfo: "John Doe",
        productName: "Widget A",
        dateOfPurchase: "2023-01-15",
        returnAmount: 40.00,
        returnReason: "Defective",
        returnStatus: "Processing",
      },
      {
        returnID: "R002",
        customerInfo: "Alice Smith",
        productName: "Gadget B",
        dateOfPurchase: "2023-02-20",
        returnAmount: 25.00,
        returnReason: "Changed Mind",
        returnStatus: "not completed",
      },
      {
        returnID: "R003",
        customerInfo: "Bob Johnson",
        productName: "Product C",
        dateOfPurchase: "2023-03-10",
        returnAmount: 35.00,
        returnReason: "Wrong Size",
        returnStatus: "Processing",
      },
      {
        returnID: "R004",
        customerInfo: "Eve Brown",
        productName: "Device D",
        dateOfPurchase: "2023-04-05",
        returnAmount: 15.00,
        returnReason: "Defective",
        returnStatus: "Processing",
      },
    ];

    setReturns(staticReturnData);
  }, []);

  const getReturnsFunc = async () => {
    // Implement this function to fetch the latest return data (e.g., from an API)
    // Update the 'returns' state with the fetched data
  };

  return (
    <DashboardLayout>
      <PageTitle title="Returns" />

      <StyledPanel>
        <ReturnSearchBar setIsAddPopUpOpen={setIsAddPopUpOpen} setReturnsDisplay={setReturns} />

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

            {returns.map((returnItem, index) => (
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

      {isAddPopUpOpen && <AddReturnComponent setIsAddPopUpOpen={setIsAddPopUpOpen} getReturnsFunc={getReturnsFunc} />}
    </DashboardLayout>
  );
};

export default ReturnPage;
