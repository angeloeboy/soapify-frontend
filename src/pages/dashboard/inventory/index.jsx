import React, { useState, useEffect } from "react";
import Image from "next/image";
import DashboardLayout from "@/components/dashboardLayout";
import PageTitle from "@/components/pageTitle";
import Table, { ActionContainer, Status, TableData, TableHeadings, TableRows } from "@/components/styled-components/TableComponent";
import StyledPanel from "@/components/styled-components/StyledPanel";
import { faEllipsis, faFilter, faPen, faPlus, faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableControlPanel from "@/components/styled-components/TableControlPanel";
import { Button, ButtonAddInventory, ButtonAddAccountType, ButtonAddStatus, StyledFontAwesomeIcon } from "@/components/styled-components/ItemActionModal";
import AddInventoryComponent from "@/components/inventoryField/addInventory"; // Import your popup content component

const InventoryPage = () => {
	const [products, setProducts] = useState([
		{
			name: "Yellow Soap Ind..",
			sku: " RC1D2D3",
			quantity: "23",
			quantityRemaining: "3",
			dateReceived: "8/8/2023",
		},
		{
			name: "Yellow Soap Ind..",
			sku: " RC1D2D3",
			quantity: "344",
			quantityRemaining: "230",
			dateReceived: "8/8/2023",
		},
		{
			name: "Yellow Soap Ind..",
			sku: "RC1D2D3",
			quantity: "23",
			quantityRemaining: "3",
			dateReceived: "8/8/2023",
		},
		{
			name: "Yellow Soap Ind..",
			sku: "RC1D2D3",
			quantity: "23",
			quantityRemaining: "3",
			dateReceived: "8/8/2023",
		},
	]);

	const [activeActionContainer, setActiveActionContainer] = useState(-1);
	const [isPopupOpen, setPopupOpen] = useState(false);

	const handleClickOutside = (event) => {
		if (!event.target.closest(".action-container") && !event.target.closest(".ellipsis")) {
			setActiveActionContainer(null);
		}
	};

	const handleOpenPopup = () => {
		setPopupOpen(true);
	};

	const handleClosePopup = () => {
		setPopupOpen(false);
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10; // Adjust the number of items per page

	// Calculate the index range for the current page
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

	// Handle page change
	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<DashboardLayout>
			<PageTitle title="Add Inventory" />

			<StyledPanel>
				<TableControlPanel>
					<div className="searchBar" style={{ display: "flex", alignItems: "center" }}>
						<div>
							<p>Search for Product</p>
							<input type="text" placeholder="Search" />
						</div>
						<div style={{ display: "flex", marginLeft: "16px" }}>
							<div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "36px" }}>
								<p style={{ marginBottom: "0", textAlign: "center" }}>Account Type</p>
								<ButtonAddAccountType>
									<FontAwesomeIcon icon={faFilter} />
									All
								</ButtonAddAccountType>
							</div>
							<div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "11px" }}>
								<p style={{ marginBottom: "0", textAlign: "center" }}>Status</p>
								<ButtonAddStatus>
									<FontAwesomeIcon icon={faFilter} />
									All
								</ButtonAddStatus>
							</div>
							<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
								<p style={{ marginBottom: "0", textAlign: "center" }}>Add Inventory</p>
								<ButtonAddInventory onClick={handleOpenPopup}> + Add Inventory</ButtonAddInventory>
							</div>
						</div>
					</div>
				</TableControlPanel>
				<Table>
					<tbody>
						<TableRows heading>
							<TableHeadings>Product Name</TableHeadings>
							<TableHeadings>SKU</TableHeadings>
							<TableHeadings>Quantity</TableHeadings>
							<TableHeadings>Quantity Remaining</TableHeadings>
							<TableHeadings>Date Received</TableHeadings>
							<TableHeadings>Actions</TableHeadings>
						</TableRows>
						{products.map((product, index) => (
							<TableRows key={index}>
								<TableData bold withImage>
									<Image src="/product_img2.png" width={40} height={40} alt={"Product image"} />
									{product.name}
								</TableData>
								<TableData>{product.sku}</TableData>
								<TableData>{product.quantity}</TableData>
								<TableData>{product.quantityRemaining}</TableData>
								<TableData>{product.dateReceived}</TableData>
								<TableData>
									<FontAwesomeIcon
										className="ellipsis"
										icon={faEllipsis}
										onClick={() => (activeActionContainer === index ? setActiveActionContainer(-1) : setActiveActionContainer(index))}
									/>

									{activeActionContainer === index && (
										<ActionContainer onClick={() => setActiveActionContainer(-1)}>
											<p>
												{" "}
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

				<div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "1rem" }}>
					<Button
						style={{
							width: "80px",
							height: "18px",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							color: "black",
							backgroundColor: "white", // Default background color
							marginRight: "10px",
							cursor: "pointer",
						}}
						onMouseEnter={(e) => (e.target.style.backgroundColor = "rgba(26, 105, 240, 1)")}
						onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
					>
						Previous
					</Button>

					<Button
						style={{
							width: "30px",
							height: "30px",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							color: "black",
							backgroundColor: "white", // Default background color
							marginRight: "5px",
							cursor: "pointer",
						}}
						onMouseEnter={(e) => (e.target.style.backgroundColor = "rgba(26, 105, 240, 1)")}
						onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
					>
						1
					</Button>
					<Button
						style={{
							width: "30px",
							height: "30px",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							color: "black",
							backgroundColor: "white", // Default background color
							marginRight: "5px",
							cursor: "pointer",
						}}
						onMouseEnter={(e) => (e.target.style.backgroundColor = "rgba(26, 105, 240, 1)")}
						onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
					>
						2
					</Button>
					{/* Repeat for other buttons */}
					<Button
						style={{
							width: "50px",
							height: "30px",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							color: "black",
							backgroundColor: "white", // Default background color
							marginRight: "5px",
							cursor: "pointer",
						}}
						onMouseEnter={(e) => (e.target.style.backgroundColor = "rgba(26, 105, 240, 1)")}
						onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
					>
						Next
					</Button>
				</div>
			</StyledPanel>
			{isPopupOpen && <AddInventoryComponent onClose={handleClosePopup} /* other props if needed */ />}
		</DashboardLayout>
	);
};

export default InventoryPage;
