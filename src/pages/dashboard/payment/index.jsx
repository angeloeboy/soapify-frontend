import React, { useState } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import PaymentSearchBarComponent from "@/components/PaymentMethod/SearchBarPaymentMethod";
import EditPaymentMethodComponent from "@/components/PaymentMethod/editPaymentMethod";

const PaymentTable = () => {
  const paymentData = [
    {
      paymentName: "Payment 1",
      accountNumber: "1234567890",
      type: "Credit Card",
      createdDate: "2023-09-10",
    },
    {
      paymentName: "Payment 2",
      accountNumber: "9876543210",
      type: "Bank Transfer",
      createdDate: "2023-09-11",
    },
    {
      paymentName: "Payment 3",
      accountNumber: "5678901234",
      type: "PayPal",
      createdDate: "2023-09-12",
    },
  ];

  const [activeActionContainer, setActiveActionContainer] = useState(-1);
  const [searchQuery, setSearchQuery] = useState(""); // Define searchQuery state variable
  const [isEditPaymentOpen, setEditPaymentOpen] = useState(false);
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleOpenPopup = () => {
    // Handle opening the payment method popup here
  };

  const openEditPayment = () => {
    setEditPaymentOpen(true);
  };
  const closeEditPayment = () => {
    setEditPaymentOpen(false);
  };

  return (
    <DashboardLayout>
      <PageTitle title="Payment" />
      <StyledPanel>
        <PaymentSearchBarComponent
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          handleOpenPopup={handleOpenPopup}
        />
        <Table>
          <tbody>
            <TableRows heading>
              <TableHeadings>Payment Name</TableHeadings>
              <TableHeadings>Number/Account Number</TableHeadings>
              <TableHeadings>Type</TableHeadings>
              <TableHeadings>Created</TableHeadings>
              <TableHeadings>Actions</TableHeadings>
            </TableRows>

            {paymentData.map((payment, index) => (
              <TableRows key={index}>
                <TableData>{payment.paymentName}</TableData>
                <TableData>{payment.accountNumber}</TableData>
                <TableData>{payment.type}</TableData>
                <TableData>{payment.createdDate}</TableData>
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
                          openEditPayment();
                        }}
                      >
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
      {isEditPaymentOpen && (
        <EditPaymentMethodComponent onClose={closeEditPayment} />
      )}
    </DashboardLayout>
  );
};

export default PaymentTable;
