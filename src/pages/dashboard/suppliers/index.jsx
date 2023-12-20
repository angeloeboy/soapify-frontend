import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import DashboardLayout from "@/components/misc/dashboardLayout";
import StyledPanel from "@/styled-components/StyledPanel";
import PdfExporter from "@/components/misc/pdfExporter";
import PageTitle from "@/components/misc/pageTitle";
import Table, { ActionContainer, TableContainer, TableData, TableHeadings, TableRows } from "@/styled-components/TableComponent";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import WarehouseSearchBarComponent from "@/components/warehouse/warehouseSearchBar";
import { deleteSupplier, getSuppliers } from "@/api/supplier";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AddSupplier from "@/components/suppliers/addSupplier";
import EditSupplier from "@/components/suppliers/editSupplier";
import SupplierSearchBar from "@/components/suppliers/supplierSearchBar";
import { PaginationControl } from "@/styled-components/ItemActionModal";
import Pagination from "@/components/misc/pagination";
import DeleteModal from "@/components/misc/delete";
import { toast } from "react-toastify";

const Suppliers = () => {
	const [searchQuery, setSearchQuery] = useState(""); // Initialize searchQuery
	const [isPopupOpen, setPopupOpen] = useState(false);
	const [activeActionContainer, setActiveActionContainer] = useState(-1);
	const [suppliers, setSuppliers] = useState([]);
	const [suppliersDisplay, setSuppliersDisplay] = useState([]); // Initialize suppliersDisplay
	const [supplierLoading, setSupplierLoading] = useState([]);
	const [isEditSupplierPopupOpen, setEditSupplierPopUpOpen] = useState(false);

	const [selectedSupplierId, setSelectedSupplierId] = useState(null);

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = currentPage * itemsPerPage;
	const paginatedSuppliers = suppliersDisplay.slice(startIndex, endIndex);

	const [isDeletePopUpOpen, setIsDeletePopUpOpen] = useState(false);
	const [selectedName, setSelectedName] = useState("");
	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
		// You can perform any other actions related to search here
	};

	const handleOpenPopup = () => {
		setPopupOpen(true);
	};

	const handleClosePopup = () => {
		setPopupOpen(false);

		//remove the ?add=true query from url
		const url = new URL(window.location.href);
		url.searchParams.delete("add");
		window.history.replaceState({}, "", url);
	};

	const openEditSupplier = () => {
		setEditSupplierPopUpOpen(true);
	};

	const closeEditSupplier = () => {
		setEditSupplierPopUpOpen(false);
	};

	useEffect(() => {
		fetchSuppliers();
	}, []);

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [currentPage, itemsPerPage]);

	const handleClickOutside = (event) => {
		if (!event.target.closest(".action-container") && !event.target.closest(".ellipsis")) {
			setActiveActionContainer(null);
		}
	};

	const fetchSuppliers = () => {
		setSupplierLoading(true);
		getSuppliers().then((res) => {
			console.log(res);
			console.log("testing");
			setSuppliers(res.suppliers || []);
			setSuppliersDisplay(res.suppliers || []);
			setSupplierLoading(false);
		});
		setSupplierLoading(false);
	};

	useEffect(() => {
		//check if link has ?add=true quert
		const url = new URL(window.location.href);
		const add = url.searchParams.get("add");
		if (add) {
			setPopupOpen(true);
		}
	}, []);

	const deleteSupplierFunc = async (id) => {
		const res = await deleteSupplier(id);
		console.log(res);
		if (!res) {
			return;
		}

		if (res.status === "Success") {
			toast.success("Supplier deleted");
			fetchSuppliers();
			return;
		}

		toast.error(res.errors[0].message);
	};

	return (
		<DashboardLayout>
			<PageTitle title="Suppliers" />
			<StyledPanel>
				<SupplierSearchBar
					searchQuery={searchQuery}
					handleSearchChange={handleSearchChange}
					handleOpenPopup={handleOpenPopup}
					suppliers={suppliers}
					setSuppliersDisplay={setSuppliersDisplay}
					setCurrentPage={setCurrentPage}
				/>
				<TableContainer>
					<Table id="suppliers-table">
						<tbody>
							<TableRows $heading>
								<TableHeadings>Supplier Name</TableHeadings>
								<TableHeadings>Contact</TableHeadings>
								<TableHeadings>Address</TableHeadings>
								<TableHeadings>Actions</TableHeadings>
							</TableRows>

							{supplierLoading
								? Array.from({ length: 8 }, (_, index) => (
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
								: paginatedSuppliers.map((supplier, index) => (
										<TableRows key={supplier.supplier_id}>
											<TableData>{supplier.supplier_name}</TableData>
											<TableData>{supplier.supplier_phone}</TableData>
											<TableData>{supplier.supplier_address}</TableData>
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
																setSelectedSupplierId(supplier.supplier_id);
																openEditSupplier(selectedSupplierId);
															}}
														>
															<FontAwesomeIcon icon={faPen} />
															Edit
														</p>
														<p
															onClick={() => {
																setSelectedSupplierId(supplier.supplier_id);
																setIsDeletePopUpOpen(true);
																setSelectedName(supplier.supplier_name);
															}}
														>
															<FontAwesomeIcon icon={faTrash} /> Delete
														</p>
													</ActionContainer>
												)}
											</TableData>
										</TableRows>
								  ))}
						</tbody>
					</Table>
				</TableContainer>

				<PdfExporter tableId="suppliers-table" filename="suppliers" />
				<Pagination
					totalItems={suppliersDisplay.length} // Total number of items
					itemsPerPage={itemsPerPage}
					currentPage={currentPage}
					onPageChange={setCurrentPage}
					itemsPerPageOptions={[5, 10, 15, 20]}
					defaultItemsPerPage={10}
					setItemsPerPage={setItemsPerPage}
				/>
			</StyledPanel>
			{isPopupOpen && <AddSupplier onClose={handleClosePopup} fetchSuppliers={fetchSuppliers} suppliers={suppliers} />}
			{isEditSupplierPopupOpen && (
				<EditSupplier
					onClose={closeEditSupplier}
					supplierID={selectedSupplierId}
					fetchSuppliers={fetchSuppliers}
					//   onButtonClick={onButtonClick}
					//   GetProducts={fetchProducts}
				/>
			)}

			{isDeletePopUpOpen && (
				<DeleteModal type="supplier" text={selectedName} close={setIsDeletePopUpOpen} confirm={() => deleteSupplierFunc(selectedSupplierId)} />
			)}
		</DashboardLayout>
	);
};

export default Suppliers;
