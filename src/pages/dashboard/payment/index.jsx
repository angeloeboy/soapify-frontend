import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DashboardLayout from "@/components/misc/dashboardLayout";
import StyledPanel from "@/styled-components/StyledPanel";
import PageTitle from "@/components/misc/pageTitle";
import Table, { ActionContainer, TableData, TableHeadings, TableRows } from "@/styled-components/TableComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import PaymentSearchBarComponent from "@/components/PaymentMethod/SearchBarPaymentMethod";
import { getPaymentMethods } from "@/api/pos";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import EditPaymentMethodComponent from "./../../../components/PaymentMethod/editPaymentMethod";

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
	const [paymentMethods, setPaymentMethods] = useState([]); // Define paymentMethods state variable
	const [paymentMethodsLoading, setPaymentMethodsLoading] = useState(false); // Define paymentMethodsLoading state variable
	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
	};

	const handleOpenPopup = () => {
		// Handle opening the payment method popup here
	};

	useEffect(() => {
		fetchPaymentMethods();
	}, []);

	const fetchPaymentMethods = () => {
		getPaymentMethods().then((res) => {
			setPaymentMethodsLoading(true);
			console.log(res);
			setPaymentMethods(res.paymentMethods);
			setPaymentMethodsLoading(false);
		});
	};

	const formatDateToMonthDayYear = (isoDate) => {
		const date = new Date(isoDate);
		const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		const month = monthNames[date.getUTCMonth()];
		const day = date.getUTCDate();
		const year = date.getUTCFullYear();

		return `${month} ${day}, ${year}`;
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
				<PaymentSearchBarComponent searchQuery={searchQuery} handleSearchChange={handleSearchChange} handleOpenPopup={handleOpenPopup} />
				<Table>
					<tbody>
						<TableRows heading>
							<TableHeadings>Payment Name</TableHeadings>
							<TableHeadings>Number/Account Number</TableHeadings>
							<TableHeadings>Type</TableHeadings>
							<TableHeadings>Created</TableHeadings>
							<TableHeadings>Actions</TableHeadings>
						</TableRows>

						{/* {paymentData.map((payment, index) => (
							<TableRows key={index}>
								<TableData>{payment.paymentName}</TableData>
								<TableData>{payment.accountNumber}</TableData>
								<TableData>{payment.type}</TableData>
								<TableData>{payment.createdDate}</TableData>
								<TableData>
									<FontAwesomeIcon
										className="ellipsis"
										icon={faEllipsis}
										onClick={() => (activeActionContainer === index ? setActiveActionContainer(-1) : setActiveActionContainer(index))}
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
						))} */}

						{paymentMethods.length === 0
							? paymentMethodsLoading &&
							  Array.from({ length: 8 }, (_, index) => (
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
									</TableRows>
							  ))
							: paymentMethods.map((method, index) => (
									<TableRows key={index}>
										<TableData>{method.name}</TableData>
										<TableData>{method.account_no}</TableData>
										<TableData>Test Type</TableData>
										<TableData>{formatDateToMonthDayYear(method.createdAt)}</TableData>
										<TableData>
											<FontAwesomeIcon
												className="ellipsis"
												icon={faEllipsis}
												onClick={() => (activeActionContainer === index ? setActiveActionContainer(-1) : setActiveActionContainer(index))}
											/>

											{activeActionContainer === index && (
												<ActionContainer onClick={() => setActiveActionContainer(-1)}>
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
			{isEditPaymentOpen && <EditPaymentMethodComponent onClose={closeEditPayment} />}
		</DashboardLayout>
	);
};

export default PaymentTable;
