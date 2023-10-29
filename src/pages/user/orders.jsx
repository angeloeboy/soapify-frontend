import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/misc/dashboardLayout";
import PageTitle from "@/components/misc/pageTitle";
import Table, { ActionContainer, TableData, TableHeadings, TableRows } from "@/styled-components/TableComponent";
import StyledPanel from "@/styled-components/StyledPanel";
import { faEllipsis, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddReturnComponent from "@/components/return/addReturn";
import ReturnSearchBar from "@/components/return/searchBar";
import { getCustomerTransaction } from "@/api/transaction";
import styled from "styled-components";

const Circle = styled.span`
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background-color: ${({ status }) => (status === "PENDING" ? "#FFC107" : status === "COMPLETED" ? "#4CAF50" : "#F44336")};
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

	const [transactions, setTransactions] = useState([]);
	const [filteredTransactions, setFilteredTransactions] = useState([]); // Initialize with an empty array

	const handleSearch = (searchTerm) => {
		const filtered = returns.filter((returnItem) => {
			return (
				returnItem.customerInfo.toLowerCase().includes(searchTerm.toLowerCase()) || returnItem.productName.toLowerCase().includes(searchTerm.toLowerCase())
			);
		});

		setFilteredReturns(filtered);
	};

	useEffect(() => {
		getTransactions();
	}, []);

	const getTransactions = async () => {
		const response = await getCustomerTransaction();
		if (!response) return;
		if (response.success) {
			setTransactions(response.transactions);
		}
		setFilteredTransactions(response.transactions);
		console.log(response.transactions);
	};

	return (
		<DashboardLayout>
			<PageTitle title="Orders" />

			<StyledPanel>
				{/* <ReturnSearchBar onSearch={handleSearch} setIsAddPopUpOpen={setIsAddPopUpOpen} setReturnsDisplay={setReturns} /> */}

				<Table>
					<tbody>
						<TableRows heading>
							<TableHeadings>Order ID</TableHeadings>
							<TableHeadings>Transaction Number</TableHeadings>

							<TableHeadings>No. of Products</TableHeadings>
							<TableHeadings>Payment Method</TableHeadings>
							<TableHeadings>Status</TableHeadings>

							<TableHeadings>Actions</TableHeadings>
						</TableRows>

						{filteredTransactions.map((transaction, index) => (
							<TableRows key={transaction.id}>
								<TableData>{transaction.transaction_unique_id}</TableData>
								<TableData>{transaction.transaction_number}</TableData>
								<TableData>{transaction.items.length}</TableData>
								<TableData>{transaction.payment_method.name}</TableData>
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

			{isAddPopUpOpen && <AddReturnComponent setIsAddPopUpOpen={setIsAddPopUpOpen} />}
		</DashboardLayout>
	);
};

export default Orders;
