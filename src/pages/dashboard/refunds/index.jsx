import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/misc/dashboardLayout";
import PageTitle from "@/components/misc/pageTitle";
import Table, {
  ActionContainer,
  TableData,
  TableHeadings,
  TableRows,
} from "@/styled-components/TableComponent";
import StyledPanel from "@/styled-components/StyledPanel";
import { faTrash, faEllipsis, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddRefund from "@/components/refund/addRefund";
import EditRefund from "@/components/refund/editRefund";
import RefundSearchBar from "@/components/refund/refundSearchBar";
import { PaginationControl } from "@/styled-components/ItemActionModal";
import Pagination from "@/components/misc/pagination";

const RefundPage = () => {
  const [refunds, setRefunds] = useState([]);
  const [filteredRefunds, setFilteredRefunds] = useState([]); // Initialize with an empty array
  const [activeActionContainer, setActiveActionContainer] = useState(-1);
  const [isAddPopUpOpen, setIsAddPopUpOpen] = useState(false);
  const [isEditPopUpOpen, setIsEditPopUpOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = currentPage * itemsPerPage;
  const paginatedRefunds = filteredRefunds.slice(startIndex, endIndex);

  const handleSearch = (searchTerm) => {
    const filtered = refunds.filter((refund) => {
      return (
        refund.customerInfo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        refund.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setFilteredRefunds(filtered);
  };

  useEffect(() => {
    // Fetch refund data when the component mounts (can be replaced with API calls)
    const staticRefundData = [
      {
        customerInfo: "John Doe",
        productName: "Product A",
        dateOfPurchase: "2023-01-15",
        refundAmount: 50.0,
        reasonForRefund: "Product was damaged",
      },
      {
        customerInfo: "Alice Smith",
        productName: "Product B",
        dateOfPurchase: "2023-02-20",
        refundAmount: 30.0,
        reasonForRefund: "Changed mind",
      },
      // Add more refund objects here as needed
    ];

    setRefunds(staticRefundData);
    setFilteredRefunds(staticRefundData); // Initialize filteredRefunds with all refunds
  }, []);
  const [selectedRefund, setSelectedRefund] = useState({}); // Initialize with an empty object
  return (
    <DashboardLayout>
      <PageTitle title="Refunds" />

      <StyledPanel>
        <RefundSearchBar
          onSearch={handleSearch}
          setIsAddPopUpOpen={setIsAddPopUpOpen}
          setRefundsDisplay={setRefunds}
        />

        <Table>
          <tbody>
            <TableRows $heading>
              <TableHeadings>Customer Info</TableHeadings>
              <TableHeadings>Product Name</TableHeadings>
              <TableHeadings>Date of Purchase</TableHeadings>
              <TableHeadings>Refund Amount</TableHeadings>
              <TableHeadings>Reason for Refund</TableHeadings>
              <TableHeadings>Actions</TableHeadings>
            </TableRows>

            {paginatedRefunds.map((refund, index) => (
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
                          setSelectedRefund(refund);
                          setIsEditPopUpOpen(selectedRefund);
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
        <Pagination
          totalItems={filteredRefunds.length} // Total number of items
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          itemsPerPageOptions={[5, 10, 15, 20]}
          defaultItemsPerPage={10}
          setItemsPerPage={setItemsPerPage}
          />
      </StyledPanel>

      {isAddPopUpOpen && <AddRefund setIsAddPopUpOpen={setIsAddPopUpOpen} />}
      {isEditPopUpOpen && (
        <EditRefund setIsEditPopUpOpen={setIsEditPopUpOpen} />
      )}
    </DashboardLayout>
  );
};

export default RefundPage;
