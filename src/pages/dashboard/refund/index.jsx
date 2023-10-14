import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/misc/dashboardLayout";
import PageTitle from "@/components/misc/pageTitle";
import Table, { ActionContainer, TableData, TableHeadings, TableRows } from "@/styled-components/TableComponent";
import StyledPanel from "@/styled-components/StyledPanel"; 
import { faEllipsis, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddRefundComponent from "@/components/refund/addRefund"; 
import RefundSearchBar from "@/components/refund/SearchBarAndFilter";
const RefundPage = () => {
  const [refunds, setRefunds] = useState([]);
  const [activeActionContainer, setActiveActionContainer] = useState(-1);
  const [isAddPopUpOpen, setIsAddPopUpOpen] = useState(false); // State to control the popup

  useEffect(() => {
    // Fetch refund data when the component mounts (can be replaced with API calls)
    const staticRefundData = [
      {
        customerInfo: "John Doe",
        productName: "Product A",
        dateOfPurchase: "2023-01-15",
        refundAmount: 50.00,
        reasonForRefund: "Product was damaged",
      },
      {
        customerInfo: "Alice Smith",
        productName: "Product B",
        dateOfPurchase: "2023-02-20",
        refundAmount: 30.00,
        reasonForRefund: "Changed mind",
      },
      // Add more refund objects here as needed
    ];

    setRefunds(staticRefundData);
  }, []);

  const getRefundsFunc = () => {
    // Implement this function to fetch the latest refund data (e.g., from an API)
    // Update the 'refunds' state with the fetched data
  };

  return (
    <DashboardLayout>
      <PageTitle title="Refunds" />

      <StyledPanel>
        {/* Button to open the Add Refund popup */}
        <RefundSearchBar setIsAddPopUpOpen={setIsAddPopUpOpen} setRefundsDisplay={setRefunds} />

        <Table>
          <tbody>
            <TableRows heading>
              <TableHeadings>Customer Info</TableHeadings>
              <TableHeadings>Product Name</TableHeadings>
              <TableHeadings>Date of Purchase</TableHeadings>
              <TableHeadings>Refund Amount</TableHeadings>
              <TableHeadings>Reason for Refund</TableHeadings>
              <TableHeadings>Actions</TableHeadings>
            </TableRows>

            {refunds.map((refund, index) => (
              <TableRows key={index}>
                <TableData>{refund.customerInfo}</TableData>
                <TableData>{refund.productName}</TableData>
                <TableData>{refund.dateOfPurchase}</TableData>
                <TableData>{refund.refundAmount}</TableData>
                <TableData>{refund.reasonForRefund}</TableData>
                <TableData>
                  <FontAwesomeIcon
                    className="ellipsis"
                    icon={faEllipsis}
                    onClick={() => (activeActionContainer === index ? setActiveActionContainer(-1) : setActiveActionContainer(index))}
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

      {isAddPopUpOpen && <AddRefundComponent setIsAddPopUpOpen={setIsAddPopUpOpen} getRefundsFunc={getRefundsFunc} />}
    </DashboardLayout>
  );
};

export default RefundPage;
