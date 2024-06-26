import React, { useState, useEffect, useContext } from "react";
import DashboardLayout from "@/components/misc/dashboardLayout";
import PageTitle from "@/components/misc/pageTitle";
import Table, { ActionContainer, TableData, TableHeadings, TableRows } from "@/styled-components/TableComponent";
import StyledPanel from "@/styled-components/StyledPanel";
import { faEllipsis, faTrash, faPen, faReceipt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddReturnComponent from "@/components/return/addReturn";
import ReturnSearchBar from "@/components/return/returnSearchBar";
import { getCustomerTransaction } from "@/api/transaction";
import styled from "styled-components";
import UserDashboardLayout from "@/components/misc/userDashboardLayout";
import UserOrdersInfo from "@/components/user_components/UserorderInfo";
import generatePDF from "@/components/orders/orderReceipt";
import { WebSocketContext } from "@/components/context/WebsocketContext";
import OrdersSearchBar from "@/components/orders/ordersSearchBar";
import Pagination from "@/components/misc/pagination";
import LoadingSkeleton from "@/components/misc/loadingSkeleton";

const Circle = styled.span`
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background-color: ${({ status }) =>
		status === "AWAITING PAYMENT"
			? "#FFC107"
			: status === "RELEASED"
			? "#4CAF50"
			: status === "UNDER REVIEW"
			? "#f49236"
			: status === "PAID"
			? "#36b8f4"
			: "#F44336"};
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
	animation: fadeInFadeOut 1s ease-in-out infinite;
	display: block;
	padding: 0.5rem 1rem;

	/* background-color: ${({ status }) => (status === "PENDING" ? "#FFC107" : status === "COMPLETED" ? "#4CAF50" : "#F44336")}; */
`;

const Orders = () => {
	const [returns, setReturns] = useState([]);
	const [filteredReturns, setFilteredReturns] = useState([]); // Initialize with an empty array
	const [activeActionContainer, setActiveActionContainer] = useState(-1);
	const [isAddPopUpOpen, setIsAddPopUpOpen] = useState(false);
	const [transactionsDisplay, setTransactionsDisplay] = useState([]);
	const [transactionsLoading, setTransactionsLoading] = useState(true);

	// const [transactions, setTransactions] = useState([]);
	const { userTransactions, getUserTransaction } = useContext(WebSocketContext);

	const [transactions, setTransactions] = useState([]);
	const [filteredTransactions, setFilteredTransactions] = useState([]); // Initialize with an empty array

	const [showOrderInfo, setShowOrderInfo] = useState(false);
	const [selectedTransaction, setSelectedTransaction] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = currentPage * itemsPerPage;
	const paginatedTransactions = transactionsDisplay.slice(startIndex, endIndex);
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
	const handleSearch = (searchTerm) => {
		const filtered = returns.filter((returnItem) => {
			return (
				returnItem.customerInfo.toLowerCase().includes(searchTerm.toLowerCase()) || returnItem.productName.toLowerCase().includes(searchTerm.toLowerCase())
			);
		});

		setFilteredReturns(filtered);
	};

	// useEffect(() => {
	// 	getTransactions();
	// }, []);

	// const getTransactions = async () => {
	// 	const response = await getCustomerTransaction();
	// 	if (!response) return;
	// 	if (response.success) {
	// 		setTransactions(response.transactions);
	// 	}
	// 	console.log(response.transactions);
	// 	setFilteredTransactions(response.transactions);
	// 	console.log(response.transactions);
	// };

	const getAllTransactions = async (transactionsObject) => {
		setFilteredTransactions(transactionsObject || []);
	};

	useEffect(() => {
		getAllTransactions(userTransactions);
		setTransactionsLoading(false);
	}, [userTransactions]);

	return (
		<UserDashboardLayout>
			<PageTitle title="Orders" />

			<StyledPanel>
				{/* <ReturnSearchBar onSearch={handleSearch} setIsAddPopUpOpen={setIsAddPopUpOpen} setReturnsDisplay={setReturns} /> */}
				<OrdersSearchBar setTransactionsDisplay={setTransactionsDisplay} transactions={userTransactions} setCurrentPage={setCurrentPage} user={true} />

				<Table>
					<tbody>
						<TableRows $heading>
							<TableHeadings>Order ID</TableHeadings>
							<TableHeadings>Transaction Number</TableHeadings>

							<TableHeadings>No. of Products</TableHeadings>
							<TableHeadings>Payment Method</TableHeadings>
							<TableHeadings>Status</TableHeadings>

							<TableHeadings>Actions</TableHeadings>
						</TableRows>
						{transactionsDisplay.length == 0 ? (
							transactionsLoading ? (
								<LoadingSkeleton columns={7} />
							) : null
						) : (
							paginatedTransactions.map((transaction, index) => (
								<TableRows key={transaction.id}>
									<TableData>{transaction.transaction_unique_id}</TableData>
									<TableData>{transaction.transaction_number}</TableData>
									<TableData>{transaction.items.length}</TableData>
									<TableData>{transaction.payment_method ? transaction.payment_method.name : "Deleted"}</TableData>
									<TableData>
										<Animated status={transaction.status}>
											<Circle status={transaction.status} />
											{transaction.status}
										</Animated>
									</TableData>

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
														setSelectedTransaction(transaction);
														setShowOrderInfo(true);
													}}
												>
													<FontAwesomeIcon icon={faPen} />
													View
												</p>

												{transaction.status === "RELEASED" ||
													(transaction.status === "PAID" && (
														<p
															onClick={() => {
																generatePDF(transaction);
															}}
														>
															<FontAwesomeIcon icon={faReceipt} /> See receipt
														</p>
													))}
											</ActionContainer>
										)}
									</TableData>
								</TableRows>
							))
						)}
					</tbody>
				</Table>
				<Pagination
					setItemsPerPage={setItemsPerPage}
					totalItems={transactionsDisplay.length}
					itemsPerPage={itemsPerPage} //   this is correct
					currentPage={currentPage}
					onPageChange={setCurrentPage}
				/>
			</StyledPanel>

			{isAddPopUpOpen && <AddReturnComponent setIsAddPopUpOpen={setIsAddPopUpOpen} />}
			{showOrderInfo && <UserOrdersInfo setShowOrderInfo={setShowOrderInfo} getTransactions={getUserTransaction} selectedTransaction={selectedTransaction} />}
		</UserDashboardLayout>
	);
};

export default Orders;
