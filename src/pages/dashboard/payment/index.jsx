import React, { useState, useEffect } from "react";
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
import {
  faEllipsis,
  faPen,
  faTrash,
  faXmarkCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import PaymentMethodSearchBar from "@/components/PaymentMethod/paymentMethodSearchBar";
import { getPaymentMethods } from "@/api/pos";
import PdfExporter from "@/components/misc/pdfExporter";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import EditPayment from "../../../components/PaymentMethod/editPayment";
import AddPayment from "@/components/PaymentMethod/addPayment";
import LoadingSkeleton from "@/components/misc/loadingSkeleton";
import Pagination from "@/components/misc/pagination";
import {
  activatePaymentMethod,
  deactivatePaymentMethod,
} from "@/api/payment_method";
import { toast } from "react-toastify";

const PaymentTable = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentMethodsDisplay, setPaymentMethodsDisplay] = useState([]);
  const [paymentMethodsLoading, setPaymentMethodsLoading] = useState(false);

  const [activeActionContainer, setActiveActionContainer] = useState(-1);
  const [isEditPaymentOpen, setEditPaymentOpen] = useState(false);
  const [isAddPaymentOpen, setAddPaymentOpen] = useState(false);

  const [clickedId, setClickedId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [filteredPayments, setFilteredPayments] = useState([]);

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  useEffect(() => {
    setPaymentMethodsDisplay(
      filteredPayments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    );
  }, [currentPage, filteredPayments, itemsPerPage]);

  const fetchPaymentMethods = () => {
    setPaymentMethodsLoading(true);

    getPaymentMethods().then((res) => {
      console.log(res);
      setPaymentMethods(res.paymentMethods);
      setPaymentMethodsLoading(false);

      setFilteredPayments(res.paymentMethods || []);
    });
  };

  const formatDateToMonthDayYear = (isoDate) => {
    const date = new Date(isoDate);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();

    return `${month} ${day}, ${year}`;
  };

  const handleClickOutside = (event) => {
    if (
      !event.target.closest(".action-container") &&
      !event.target.closest(".ellipsis")
    ) {
      setActiveActionContainer(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const openEditPayment = () => {
    setEditPaymentOpen(true);
  };

  const closeEditPayment = () => {
    setEditPaymentOpen(false);
  };
  const deactivatePaymentMethodFunc = async (payment_method_id) => {
    const res = await deactivatePaymentMethod(payment_method_id);
    console.log(res);

    if (!res) {
      toast.error("Something went wrong");
      return;
    }
    toast.success(res.message);
    fetchPaymentMethods();
  };

  const activatePaymentMethodFunc = async (payment_method_id) => {
    const res = await activatePaymentMethod(payment_method_id);
    console.log(res);

    if (!res) {
      toast.error("Something went wrong");
      return;
    }
    toast.success(res.message);

    fetchPaymentMethods();
  };

  return (
    <DashboardLayout>
      <PageTitle title="Payment" />
      <StyledPanel>
        <PaymentMethodSearchBar
          fetchPaymentMethods={fetchPaymentMethods}
          setAddPaymentOpen={setAddPaymentOpen}
        />
        <Table id="payment-table">
          <tbody>
            <TableRows $heading>
              <TableHeadings>Payment Name</TableHeadings>
              <TableHeadings>Number/Account Number</TableHeadings>
              <TableHeadings>Created</TableHeadings>
              <TableHeadings>Status</TableHeadings>

              <TableHeadings>Actions</TableHeadings>
            </TableRows>

            {paymentMethods.length === 0
              ? paymentMethodsLoading && <LoadingSkeleton columns={3} />
              : paymentMethodsDisplay.map((method, index) => (
                  <TableRows key={index}>
                    <TableData>{method.name}</TableData>
                    <TableData>{method.account_no}</TableData>
                    <TableData>
                      {formatDateToMonthDayYear(method.createdAt)}
                    </TableData>
                    <TableData>
                      {method.isActive ? "Active" : "Inactive"}
                    </TableData>

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
                              setClickedId(method.payment_method_id);
                              openEditPayment();
                            }}
                          >
                            <FontAwesomeIcon icon={faPen} /> Edit
                          </p>
                          <p>
                            <FontAwesomeIcon icon={faTrash} /> Delete
                          </p>
                          <p
                            onClick={() =>
                              deactivatePaymentMethodFunc(
                                method.payment_method_id
                              )
                            }
                          >
                            <FontAwesomeIcon icon={faXmarkCircle} /> Deactivate
                            Payment Method
                          </p>
                          <p
                            onClick={() =>
                              activatePaymentMethodFunc(
                                method.payment_method_id
                              )
                            }
                          >
                            <FontAwesomeIcon icon={faCheckCircle} /> Reactivate
                            Payment Method
                          </p>
                        </ActionContainer>
                      )}
                    </TableData>
                  </TableRows>
                ))}
          </tbody>
        </Table>
        <PdfExporter tableId="payment-table" fileName="payment-methods.pdf" />
        <Pagination
          totalItems={filteredPayments.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          itemsPerPageOptions={[5, 10, 15, 20]}
          defaultItemsPerPage={10}
          setItemsPerPage={setItemsPerPage}
        />
      </StyledPanel>
      {isEditPaymentOpen && (
        <EditPayment
          onClose={closeEditPayment}
          paymentId={clickedId}
          fetchPaymentMethods={fetchPaymentMethods}
        />
      )}
      {isAddPaymentOpen && (
        <AddPayment
          setAddPaymentOpen={setAddPaymentOpen}
          fetchPaymentMethods={fetchPaymentMethods}
        />
      )}
    </DashboardLayout>
  );
};

export default PaymentTable;
