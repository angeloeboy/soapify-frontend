import React, { useState, useEffect } from "react";
import Image from "next/image";
import DashboardLayout from "@/components/misc/dashboardLayout";
import PageTitle from "@/components/misc/pageTitle";
import Table, { ActionContainer, Status, TableData, TableHeadings, TableRows } from "@/styled-components/TableComponent";
import StyledPanel from "@/styled-components/StyledPanel";
import { faEllipsis, faFilter, faPen, faPlus, faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableControlPanel from "@/styled-components/TableControlPanel";
import { Button, ButtonAddInventory, ButtonAddAccountType, ButtonAddStatus } from "@/styled-components/ItemActionModal";
import AddInventory from "@/components/inventory/addInventory"; // Import your popup content component
import EditInventoryComponent from "@/components/inventory/editInventory";
import { getInventory } from "@/api/inventory";
import InventorySearchBar from "@/components/inventory/inventorySearchBar";

import { PaginationControl } from "@/styled-components/ItemActionModal";
import Pagination from "@/components/misc/pagination";
import LoadingSkeleton from "@/components/misc/loadingSkeleton";
import { useRouter } from "next/router";

const InventoryPage = () => {
	// const {productId, openModal} =
	const router = useRouter();

	const { productId, openModal } = router.query;

	const [inventory, setInventory] = useState([]);
	const [inventoryDisplay, setinventoryDisplay] = useState([]);
	const [activeActionContainer, setActiveActionContainer] = useState(-1);
	const [isAddPopUpOpen, setIsAddPopUpOpen] = useState(false);

	const [isEditPopUpOpen, setIsEditPopUpOpen] = useState(false);
	const [inventoryLoading, setInventoryLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = Math.min(currentPage * itemsPerPage, inventoryDisplay.length);
	const paginatedInventory = inventoryDisplay.slice(startIndex, endIndex);

	const setCurrentPageHandler = (newPage, itemsPerPage) => {
		setCurrentPage(newPage);
		setItemsPerPage(itemsPerPage);
	};

	useEffect(() => {
		fetchInventory();
		console.log(openModal);

		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [currentPage, itemsPerPage]);

	useEffect(() => {
		setIsAddPopUpOpen(Boolean(openModal));
	}, [openModal, productId]);

	const handleClickOutside = (event) => {
		if (!event.target.closest(".action-container") && !event.target.closest(".ellipsis")) {
			setActiveActionContainer(null);
		}
	};

	const fetchInventory = () => {
		setInventoryLoading(true);
		getInventory().then((res) => {
			console.log(res);
			res.inventory ? setInventory(res.inventory) : setInventory([]);
			res.inventory ? setinventoryDisplay(res.inventory) : setinventoryDisplay([]);
			setInventoryLoading(false);
		});
	};

	const convertToDateFormat = (date) => {
		let newDate = new Date(date);
		let formattedDate = newDate.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
		return formattedDate;
	};

	const [selectedInventory, setSelectedInventory] = useState(null);

	return (
		<DashboardLayout>
			<PageTitle title="Inventory" />

			<StyledPanel>
				<InventorySearchBar
					setIsAddPopUpOpen={setIsAddPopUpOpen}
					setinventoryDisplay={setinventoryDisplay}
					inventory={inventory}
					setCurrentPage={setCurrentPage}
				/>
				<Table>
					<tbody>
						<TableRows $heading>
							<TableHeadings>Product Id</TableHeadings>

							<TableHeadings>Product Name</TableHeadings>
							{/* <TableHeadings>Attributes</TableHeadings> */}
							<TableHeadings>SKU</TableHeadings>
							<TableHeadings>Quantity</TableHeadings>
							<TableHeadings>Quantity Remaining</TableHeadings>
							<TableHeadings>Date Received</TableHeadings>
							<TableHeadings>Actions</TableHeadings>
						</TableRows>
						{inventory.length === 0 ? (
							inventoryLoading ? (
								<LoadingSkeleton columns={6} />
							) : null
						) : (
							paginatedInventory.map((inventory, index) => (
								<TableRows key={index}>
									<TableData $bold>{inventory.Product.product_code}</TableData>
									{/* <TableData>
										<div className="attr_container">
											{inventory.Product.attribute.map((attr, index) => {
												return <span key={index}> {attr.value}</span>;
											})}
										</div>
									</TableData> */}

									<TableData> {inventory.Product.product_name}</TableData>
									<TableData> Test</TableData>

									<TableData>{inventory.quantity}</TableData>
									<TableData>{inventory.current_quantity}</TableData>
									<TableData>{convertToDateFormat(inventory.date_added)}</TableData>
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
														setSelectedInventory(inventory);
														setIsEditPopUpOpen(selectedInventory);
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

				<Pagination
					setItemsPerPage={setItemsPerPage}
					totalItems={inventoryDisplay.length}
					itemsPerPage={itemsPerPage} //   this is correct
					currentPage={currentPage}
					onPageChange={setCurrentPage}
					itemsPerPageOptions={[5, 10, 15, 20]} // Customize these options as needed
					defaultItemsPerPage={10}
				/>
			</StyledPanel>
			{isAddPopUpOpen && <AddInventory setIsAddPopUpOpen={setIsAddPopUpOpen} getInventoryFunc={fetchInventory} productId={productId} />}
			{isEditPopUpOpen && <EditInventoryComponent setIsEditPopUpOpen={setIsEditPopUpOpen} getInventoryFunc={fetchInventory} />}
		</DashboardLayout>
	);
};

export default InventoryPage;
