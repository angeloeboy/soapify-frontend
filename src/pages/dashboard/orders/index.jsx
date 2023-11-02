import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/misc/dashboardLayout";
import PageTitle from "@/components/misc/pageTitle";
import Table, { ActionContainer, TableData, TableHeadings, TableRows } from "@/styled-components/TableComponent";
import StyledPanel from "@/styled-components/StyledPanel";
import { faEllipsis, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getTransactions } from "@/api/transaction";
import OrdersSearchBar from "@/components/orders/ordersSearchBar";
import Pagination from "./../../../components/misc/pagination";
import LoadingSkeleton from "@/components/misc/loadingSkeleton";
import EditOrder from "@/components/orders/editOrder";
// import EditOrder from "@/components/orders/EditOrders";

const Orders = () => {
	const [transactions, setTransactions] = useState([]);
	const [transactionsDisplay, setTransactionsDisplay] = useState([]);
	const [activeActionContainer, setActiveActionContainer] = useState(-1);
	const [isAddPopUpOpen, setIsAddPopUpOpen] = useState(false);
	const [isEditPopUpOpen, setIsEditPopUpOpen] = useState(false);
	const [transactionsLoading, setTransactionsLoading] = useState(true);

	const [selectedTransactionId, setSelectedTransactionId] = useState(null);
	const [selectedTransaction, setSelectedTransaction] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = currentPage * itemsPerPage;
	const paginatedTransactions = transactionsDisplay.slice(startIndex, endIndex);

	useEffect(() => {
		getAllTransactions();
	}, []);

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
	};

	return (
		<DashboardLayout>
			<PageTitle title="Orders" />

			<StyledPanel>
				{/* <ReturnSearchBar onSearch={handleSearch} setIsAddPopUpOpen={setIsAddPopUpOpen} setReturnsDisplay={setReturns} /> */}
				<OrdersSearchBar setTransactionsDisplay={setTransactionsDisplay} transactions={transactions} setCurrentPage={setCurrentPage} />
				<Table>
					<tbody>
						<TableRows $heading>
							<TableHeadings>Transaction Number</TableHeadings>
							<TableHeadings>Payment Transaction Number</TableHeadings>
							<TableHeadings>No. of Products</TableHeadings>
							<TableHeadings>Status</TableHeadings>
							<TableHeadings>Ordered By</TableHeadings>
							<TableHeadings>Date</TableHeadings>

							<TableHeadings>Actions</TableHeadings>
						</TableRows>
						{transactions.length == 0 ? (
							transactionsLoading ? (
								<LoadingSkeleton columns={7} />
							) : (
								<p>No transactions found</p>
							)
						) : (
							paginatedTransactions.map((transaction, index) => (
								<TableRows key={transaction.transaction_unique_id}>
									<TableData $bold>{transaction.transaction_unique_id}</TableData>
									<TableData>{transaction.transaction_number}</TableData>
									<TableData>{transaction.items.length}</TableData>
									<TableData>{transaction.status}</TableData>
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
				{isEditPopUpOpen && (
					<EditOrder setIsEditPopUpOpen={setIsEditPopUpOpen} selectedTransactionId={selectedTransactionId} transaction={selectedTransaction} />
				)}

				{/* <EditOrder setIsEditPopUpOpen={setIsEditPopUpOpen} /> */}
				<Pagination
					totalItems={transactionsDisplay.length}
					itemsPerPage={itemsPerPage}
					currentPage={currentPage}
					onPageChange={(newPage) => setCurrentPage(newPage)}
				/>
			</StyledPanel>
		</DashboardLayout>
	);
};

export default Orders;
