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
const PurchaseOrder = () => {
	// const [promotions, setPromotions] = useState([]);
	// const [promotionsDisplay, setPromotionsDisplay] = useState([]);
	// const [activeActionContainer, setActiveActionContainer] = useState(-1);
	// const [isAddPopUpOpen, setIsAddPopUpOpen] = useState(false); // State to control the popup
	// const [isEditPopUpOpen, setIsEditPopUpOpen] = useState(false); // State to control the popup
	// const [showDeactivatePopUp, setShowDeactivatePopUp] = useState(false); // State to control the popup\
	// const [showActivatePopUp, setShowActivatePopUp] = useState(false); // State to control the popup\
	// const [clickedName, setClickedName] = useState("");

	// const [selectedPromo, setSelectedPromo] = useState(null);
	// const [isLoading, setIsLoading] = useState(false);

	// const [currentPage, setCurrentPage] = useState(1);
	// const [itemsPerPage, setItemsPerPage] = useState(10);
	// const startIndex = (currentPage - 1) * itemsPerPage;
	// const endIndex = currentPage * itemsPerPage;
	// const paginatedPromotions = promotionsDisplay.slice(startIndex, endIndex);

	const [purchaseOrders, setPurchaseOrders] = useState([]);
	const [filteredPurchaseOrders, setFilteredPurchaseOrders] = useState([]); // Initialize with an empty array
	const [activeActionContainer, setActiveActionContainer] = useState(-1);
	const [isAddPopUpOpen, setIsAddPopUpOpen] = useState(false);
	const [isEditPopUpOpen, setIsEditPopUpOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = currentPage * itemsPerPage;
	const paginatedPurchaseOrders = filteredPurchaseOrders.slice(startIndex, endIndex);

	useEffect(() => {
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

	return (
		<DashboardLayout>
			<PageTitle title="Purchase Order " />

			<StyledPanel>
				<PurchaseOrderSearchBar setIsAddPopUpOpen={setIsAddPopUpOpen} setPurchaseOrdersDisplay={setPurchaseOrders} />
				<TableContainer>
					<Table id="promos-table">
						<tbody>
							<TableRows $heading>
								<TableHeadings>Product ID</TableHeadings>
								<TableHeadings>Product Name</TableHeadings>
								<TableHeadings>Unit Price </TableHeadings>
								<TableHeadings>Quantity</TableHeadings>
								{/* <TableHeadings>Current usage</TableHeadings>
								<TableHeadings>Status</TableHeadings>
								<TableHeadings>Expiry</TableHeadings> */}

								<TableHeadings>Actions</TableHeadings>
							</TableRows>
							{paginatedPurchaseOrders.map((promo, index) => (
								<TableRows key={product.id}></TableRows>
							))}
						</tbody>
					</Table>
				</TableContainer>
				{isAddPopUpOpen && <AddPurchaseOrder setIsAddPopUpOpen={setIsAddPopUpOpen} setPurchaseOrdersDisplay={setPurchaseOrders} />}
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
