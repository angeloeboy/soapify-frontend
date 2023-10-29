import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/misc/dashboardLayout";
import PageTitle from "@/components/misc/pageTitle";
import Table, { ActionContainer, TableData, TableHeadings, TableRows } from "@/styled-components/TableComponent";
import StyledPanel from "@/styled-components/StyledPanel";
import { faEllipsis, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getTransactions } from "@/api/transaction";
import OrdersSearchBarComponent from "@/components/orders/SearchBarOrders";
import Pagination from "./../../../components/misc/pagination";

const Orders = () => {
	const [transactions, setTransactions] = useState([]);
	const [transactionsDisplay, setTransactionsDisplay] = useState([]);
	const [activeActionContainer, setActiveActionContainer] = useState(-1);
	const [isAddPopUpOpen, setIsAddPopUpOpen] = useState(false);
	const [isEditPopUpOpen, setIsEditPopUpOpen] = useState(false);

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = currentPage * itemsPerPage;
	const paginatedTransactions = transactionsDisplay.slice(startIndex, endIndex);

	useEffect(() => {
		getAllTransactions();
	}, []);

	const getAllTransactions = async () => {
		const res = await getTransactions();
		res.transactions ? setTransactions(res.transactions) : setTransactions([]);
		res.transactions ? setTransactionsDisplay(res.transactions) : setTransactionsDisplay([]);
		console.log(res.transactions);
	};

	return (
		<DashboardLayout>
			<PageTitle title="Orders" />

			<StyledPanel>
				{/* <ReturnSearchBar onSearch={handleSearch} setIsAddPopUpOpen={setIsAddPopUpOpen} setReturnsDisplay={setReturns} /> */}
				<OrdersSearchBarComponent />
				<Table>
					<tbody>
						<TableRows heading>
							<TableHeadings>Transaction Number</TableHeadings>
							<TableHeadings>Payment Transaction Number</TableHeadings>
							<TableHeadings>No. of Products</TableHeadings>
							<TableHeadings>Status</TableHeadings>
							<TableHeadings>Ordered By</TableHeadings>

							<TableHeadings>Actions</TableHeadings>
						</TableRows>

						{paginatedTransactions.map((transaction, index) => (
							<TableRows
								key={transaction.transaction_unique_id}
								onClick={() => {
									console.log(transaction.items);
								}}
							>
								<TableData $bold>{transaction.transaction_unique_id}</TableData>
								<TableData>{transaction.transaction_number}</TableData>
								<TableData>{transaction.items.length}</TableData>
								<TableData>{transaction.status}</TableData>
								<TableData>{`${transaction.transaction_user_name.first_name} ${transaction.transaction_user_name.last_name}`}</TableData>

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
