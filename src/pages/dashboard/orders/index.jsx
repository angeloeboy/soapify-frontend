import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/misc/dashboardLayout";
import PageTitle from "@/components/misc/pageTitle";
import Table, { ActionContainer, TableData, TableHeadings, TableRows } from "@/styled-components/TableComponent";
import StyledPanel from "@/styled-components/StyledPanel";
import PdfExporter from "@/components/misc/pdfExporter";
import { faEllipsis, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getTransactions } from "@/api/transaction";
import OrdersSearchBar from "@/components/orders/ordersSearchBar";
import Pagination from "./../../../components/misc/pagination";
import LoadingSkeleton from "@/components/misc/loadingSkeleton";
import EditOrder from "@/components/orders/editOrder";
import styled from "styled-components";
import OrdersInfo from "@/components/orders/ordersInfo";
// import EditOrder from "@/components/orders/EditOrders";

const Circle = styled.span`
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background-color: ${({ status }) => (status === "PENDING" ? "#FFC107" : status === "DONE" ? "#4CAF50" : "#F44336")};
	display: inline-flex;
	align-items: center;
	justify-content: center;
	margin-right: 6px;
`;

const Animated = styled.div`
	@keyframes fadeInFadeOut {
		0% {
			opacity: 0.5;
		}
		45% {
			opacity: 1;
		}
		100% {
			opacity: 0.5;
		}
	}

	//add animation
	/* animation: fadeInFadeOut 1s ease-in-out infinite; */
	animation: ${({ status }) => (status === "PENDING" ? "fadeInFadeOut 1s ease-in-out infinite" : "")};
	display: block;
	padding: 0.5rem 1rem;

	/* background-color: ${({ status }) => (status === "PENDING" ? "#FFC107" : status === "COMPLETED" ? "#4CAF50" : "#F44336")}; */
`;

const Orders = () => {
	const [transactions, setTransactions] = useState([]);
	const [transactionsDisplay, setTransactionsDisplay] = useState([]);
	const [activeActionContainer, setActiveActionContainer] = useState(-1);
	const [isEditPopUpOpen, setIsEditPopUpOpen] = useState(false);
	const [isOrdersInfoOpen, setIsOrdersInfoOpen] = useState(false);

	const [transactionsLoading, setTransactionsLoading] = useState(true);

	const [selectedTransactionId, setSelectedTransactionId] = useState(null);
	const [selectedTransaction, setSelectedTransaction] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = currentPage * itemsPerPage;
	const paginatedTransactions = transactionsDisplay.slice(startIndex, endIndex);

	useEffect(() => {
		getAllTransactions();
	}, [currentPage, itemsPerPage]);

	const handleClickOutside = (event) => {
		if (!event.target.closest(".action-container") && !event.target.closest(".ellipsis")) {
			setActiveActionContainer(null);
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	const convertToDateFormat = (date) => {
		let newDate = new Date(date);
		let formattedDate = newDate.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
		return formattedDate;
	};

	const getAllTransactions = async () => {
		setTransactionsLoading(true);
		const res = await getTransactions();
		res.transactions ? setTransactions(res.transactions) : setTransactions([]);
		res.transactions ? setTransactionsDisplay(res.transactions) : setTransactionsDisplay([]);
		setTransactionsLoading(false);
		console.log(res.transactions);
	};

	return (
		<DashboardLayout>
			<PageTitle title="Orders" />

			<StyledPanel>
				{/* <ReturnSearchBar onSearch={handleSearch} setIsAddPopUpOpen={setIsAddPopUpOpen} setReturnsDisplay={setReturns} /> */}
				<OrdersSearchBar setTransactionsDisplay={setTransactionsDisplay} transactions={transactions} setCurrentPage={setCurrentPage} />
				<Table id="orders-table">
					<tbody>
						<TableRows $heading>
							<TableHeadings>Transaction Number</TableHeadings>
							{/* <TableHeadings>Payment Transaction Number</TableHeadings> */}
							<TableHeadings>No. of Products</TableHeadings>
							<TableHeadings>Status</TableHeadings>
							<TableHeadings>Ordered By</TableHeadings>
							<TableHeadings>Date</TableHeadings>

							<TableHeadings>Actions</TableHeadings>
						</TableRows>
						{transactions.length == 0 ? (
							transactionsLoading ? (
								<LoadingSkeleton columns={7} />
							) : null
						) : (
							paginatedTransactions.map((transaction, index) => (
								<TableRows
									key={transaction.transaction_unique_id}
									onClick={() => {
										setSelectedTransactionId(transaction);
										setIsOrdersInfoOpen(true);
									}}
								>
									<TableData $bold>{transaction.transaction_unique_id}</TableData>
									{/* <TableData>{transaction.transaction_number ? transaction.transaction_number : "N/A"}</TableData> */}
									<TableData>{transaction.items.length}</TableData>
									<TableData>
										<Animated status={transaction.status}>
											<Circle status={transaction.status} />
											{transaction.status}
										</Animated>
									</TableData>
									<TableData>{`${transaction.transaction_user_name.first_name} ${transaction.transaction_user_name.last_name}`}</TableData>
									<TableData>{convertToDateFormat(transaction.createdAt)}</TableData>

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
														setSelectedTransactionId(transaction.transaction_id);
														setSelectedTransaction(transaction);
														setIsEditPopUpOpen(true);
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
							))
						)}
					</tbody>
				</Table>
				<PdfExporter tableId="orders-table" fileName="orders.pdf" />
				{isEditPopUpOpen && (
					<EditOrder setIsEditPopUpOpen={setIsEditPopUpOpen} selectedTransactionId={selectedTransactionId} transaction={selectedTransaction} />
				)}
				{isOrdersInfoOpen && (
					<OrdersInfo setIsOrdersInfoOpen={setIsOrdersInfoOpen} selectedTransaction={selectedTransactionId} fetchTransactions={getAllTransactions} />
				)}

				<Pagination
					setItemsPerPage={setItemsPerPage}
					totalItems={transactionsDisplay.length}
					itemsPerPage={itemsPerPage} //   this is correct
					currentPage={currentPage}
					onPageChange={setCurrentPage}
				/>
			</StyledPanel>
		</DashboardLayout>
	);
};

export default Orders;

import cookie from "cookie";

export async function getServerSideProps(context) {
	const { req } = context;
	const parsedCookies = cookie.parse(req.headers.cookie || "").permissions;

	if (!parsedCookies.includes("View Orders:orders")) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {
			permissions: parsedCookies ? JSON.parse(parsedCookies) : [],
		}, // will be passed to the page component as props
	};
}
