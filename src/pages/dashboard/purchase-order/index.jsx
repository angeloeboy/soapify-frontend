import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/misc/dashboardLayout";
import PageTitle from "@/components/misc/pageTitle";
import PdfExporter from "@/components/misc/pdfExporter";
import Table, { ActionContainer, TableContainer, TableData, TableHeadings, TableRows } from "@/styled-components/TableComponent";
import StyledPanel from "@/styled-components/StyledPanel";
import { faEllipsis, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import AddPromo from "@/components/promo/addOP";

import PromoSearchBar from "@/components/promo/promoSearchBar";
import AddPromo from "@/components/promo/addPromo";
import { activatePromo, deactivatePromo, getPromos } from "@/api/promos";
import { getProducts } from "@/api/products";
import Pagination from "@/components/misc/pagination";
import EditPromo from "@/components/promo/editPromo";
import DeactivateModal from "@/components/misc/deactivate";
import { toast } from "react-toastify";
import ReactivateModal from "@/components/misc/reactivate";
import PurchaseOrderSearchBar from "@/components/purchase-order/purchaseOrderSearchbar";
import AddPurchaseOrder from "@/components/purchase-order/addPurchaseOrder";
import { getPurchaseOrders } from "@/api/purchaseOrder";
import ViewPurchaseOrder from "@/components/purchase-order/ViewPurchaseOrder";

const PurchaseOrder = () => {
	const [purchaseOrders, setPurchaseOrders] = useState([]);
	const [filteredPurchaseOrders, setFilteredPurchaseOrders] = useState([]); // Initialize with an empty array
	const [activeActionContainer, setActiveActionContainer] = useState(-1);
	const [isAddPopUpOpen, setIsAddPopUpOpen] = useState(false);
	const [isEditPopUpOpen, setIsEditPopUpOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [viewPurchaseOrder, setViewPurchaseOrder] = useState(false);
	const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState(null);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = currentPage * itemsPerPage;
	const paginatedPurchaseOrders = filteredPurchaseOrders.slice(startIndex, endIndex);

	useEffect(() => {
		fetchPurchaseOrders();

		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	const handleClickOutside = (event) => {
		if (!event.target.closest(".action-container") && !event.target.closest(".ellipsis")) {
			setActiveActionContainer(null);
		}
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

	const fetchPurchaseOrders = async () => {
		setIsLoading(true);
		console.log("fetching purchase orders");

		const response = await getPurchaseOrders();
		console.log(response.purchaseOrders);

		// Add status to each purchase order
		const purchaseOrdersWithStatus = response.purchaseOrders.map((po) => {
			const status = checkStatus(po);
			return { ...po, status }; // Spread the existing purchase order and add the status
		});

		setPurchaseOrders(purchaseOrdersWithStatus);
		setFilteredPurchaseOrders(purchaseOrdersWithStatus);
		setIsLoading(false);
	};

	const checkStatus = (po) => {
		if (po.purchase_order_items.length === 0) {
			return "Pending";
		}

		let allDelivered = true;
		let hasBackOrder = false;

		po.purchase_order_items.forEach((item) => {
			if (item.purchase_order_item_current_quantity !== item.purchase_order_item_quantity) {
				allDelivered = false;
				// Check for back order
				if (item.purchase_order_item_current_quantity > 0) {
					hasBackOrder = true;
				}
			}
		});

		if (allDelivered) {
			return "Delivered";
		} else if (hasBackOrder) {
			return "Has Back Order";
		} else {
			return "Pending";
		}
	};

	return (
		<DashboardLayout>
			<PageTitle title="Purchase Order " />

			<StyledPanel>
				<PurchaseOrderSearchBar
					setIsAddPopUpOpen={setIsAddPopUpOpen}
					setPurchaseOrdersDisplay={setFilteredPurchaseOrders}
					purchaseOrders={purchaseOrders}
					setCurrentPage={setCurrentPage}
				/>
				<TableContainer>
					<Table id="promos-table">
						<tbody>
							<TableRows $heading>
								<TableHeadings>PO ID</TableHeadings>
								<TableHeadings>Products</TableHeadings>
								<TableHeadings>Status </TableHeadings>

								<TableHeadings>Actions</TableHeadings>
							</TableRows>
							{paginatedPurchaseOrders.map((po, index) => (
								<TableRows key={po.index}>
									<TableData>PO00{po.purchase_order_id}</TableData>
									<TableData>{po.purchase_order_items.length}</TableData>
									<TableData>{po.status}</TableData>

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
														setViewPurchaseOrder(true);
														setSelectedPurchaseOrder(po);
													}}
												>
													<FontAwesomeIcon icon={faPen} />
													View
												</p>
											</ActionContainer>
										)}
									</TableData>
								</TableRows>
							))}
						</tbody>
					</Table>
				</TableContainer>
				{isAddPopUpOpen && (
					<AddPurchaseOrder setIsAddPopUpOpen={setIsAddPopUpOpen} setPurchaseOrdersDisplay={setPurchaseOrders} fetchPurchaseOrders={fetchPurchaseOrders} />
				)}
				{viewPurchaseOrder && (
					<ViewPurchaseOrder setIsAddPopUpOpen={setViewPurchaseOrder} selectedPurchaseOrder={selectedPurchaseOrder} fetchPurchaseOrders={fetchPurchaseOrders} />
				)}
				<PdfExporter tableId="purchaser-order" fileName="purchaseorder.pdf" />
				<Pagination
					setItemsPerPage={setItemsPerPage}
					totalItems={filteredPurchaseOrders.length}
					itemsPerPage={itemsPerPage} //   this is correct
					currentPage={currentPage}
					onPageChange={setCurrentPage}
				/>
			</StyledPanel>
		</DashboardLayout>
	);
};

export default PurchaseOrder;
