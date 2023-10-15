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
import AddPaymentMethod from "@/components/PaymentMethod/addPaymentMethod";

const PaymentTable = () => {
	const [activeActionContainer, setActiveActionContainer] = useState(-1);
	const [isEditPaymentOpen, setEditPaymentOpen] = useState(false);
	const [isAddPaymentOpen, setAddPaymentOpen] = useState(false);
	const [paymentMethods, setPaymentMethods] = useState([]);
	const [paymentMethodsLoading, setPaymentMethodsLoading] = useState(false);

	const [clickedId, setClickedId] = useState(null);

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
				<PaymentSearchBarComponent fetchPaymentMethods={fetchPaymentMethods} setAddPaymentOpen={setAddPaymentOpen} />
				<Table>
					<tbody>
						<TableRows heading>
							<TableHeadings>Payment Name</TableHeadings>
							<TableHeadings>Number/Account Number</TableHeadings>
							<TableHeadings>Created</TableHeadings>
							<TableHeadings>Actions</TableHeadings>
						</TableRows>

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
															setClickedId(method.payment_method_id);
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
			{isEditPaymentOpen && <EditPaymentMethodComponent onClose={closeEditPayment} paymentId={clickedId} fetchPaymentMethods={fetchPaymentMethods} />}
			{isAddPaymentOpen && <AddPaymentMethod setAddPaymentOpen={setAddPaymentOpen} fetchPaymentMethods={fetchPaymentMethods} />}
		</DashboardLayout>
	);
};

export default PaymentTable;
