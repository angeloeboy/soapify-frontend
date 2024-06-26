import React, { useState, useRef, useEffect } from "react";

import DashboardLayout from "@/components/misc/dashboardLayout";
import StyledPanel from "@/styled-components/StyledPanel";
import PdfExporter from "@/components/misc/pdfExporter";
import PageTitle from "@/components/misc/pageTitle";
import Table, { ActionContainer, TableContainer, TableData, TableHeadings, TableRows } from "@/styled-components/TableComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faEllipsis, faPen, faTrash, faTrashCan, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import AddWarehouse from "@/components/warehouse/addWarehouse";
import DeactivateModal from "@/components/misc/deactivate";
import WarehouseSearchBar from "@/components/warehouse/warehouseSearchBar";
import { deactivateWarehouse, deleteWarehouse, getAllWarehouse, reactivateWarehouse } from "@/api/warehouse";
import EditWarehouse from "@/components/warehouse/editWarehouse";
import { PaginationControl } from "@/styled-components/ItemActionModal";
import Pagination from "@/components/misc/pagination";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddWarehouseArea from "@/components/warehouseArea/addWarehouseArea";
import AreasComponent from "@/components/warehouseArea/areasComponent";
import ReactivateModal from "@/components/misc/reactivate";

const Warehouse = () => {
	const [isAddPopUpOpen, setAddPopUpOpen] = useState(false);
	const [isEditPopUpOpen, setEditPopUpOpen] = useState(false);

	const [activeActionContainer, setActiveActionContainer] = useState(-1);
	const [clickedId, setClickedId] = useState(null);

	const [clickedName, setClickedName] = useState(null);
	const [showDeactivate, setShowDeactivate] = useState(false);
	const [showReactivateModal, setShowReactivateModal] = useState(false);

	const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);
	const [showAddArea, setShowAddArea] = useState(false); // Add state for "Add Area"
	const [showAreas, setShowAreas] = useState(false); // Add state to control the display of areas
	const [showAreasModal, setShowAreasModal] = useState(false);

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [warehouseIdForModal, setWarehouseIdForModal] = useState(null);

	const [warehouses, setWarehouses] = useState([]);
	const [warehouseDisplay, setWarehouseDisplay] = useState([]); // Initialize suppliersDisplay

	useEffect(() => {
		fetchWarehouses();
	}, []);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = currentPage * itemsPerPage;
	const paginatedWarehouses = warehouseDisplay.slice(startIndex, endIndex);

	const fetchWarehouses = async () => {
		const res = await getAllWarehouse();

		if (!res) {
			return;
		}

		res ? setWarehouses(res.warehouses) : setWarehouses([]);
		res ? setWarehouseDisplay(res.warehouses) : setWarehouseDisplay([]);
		console.log(res.warehouses);
	};

	const handleReactivateModal = (warehouse_id, warehouse_name) => {
		setSelectedWarehouseId(warehouse_id);
		setClickedName(warehouse_name);
		setShowReactivateModal(true);
	};

	const deactivateWarehouseFunc = async (warehouse_id) => {
		const res = await deactivateWarehouse(warehouse_id);
		console.log(res);
		if (!res) {
			return;
		}

		if (res.errors && res.errors.length > 0) {
			toast.error(res.errors[0].message);
			return;
		}

		toast.success(res.message);
		fetchWarehouses();
	};

	const reactivateWarehouseFunc = async (warehouse_id) => {
		const res = await reactivateWarehouse(warehouse_id);
		console.log(res);
		if (!res) {
			return;
		}

		if (res.errors && res.errors.length > 0) {
			toast.error(res.errors[0].message);
			return;
		}

		toast.success(res.message);
		fetchWarehouses();
	};

	const addWarehouseAreaFunc = async () => {
		console.log("Adding new warehouse area:", warehouseArea);

		fetchWarehouseAreas();
		// Close the add pop-up
		setAddPopUpOpen(false);
	};

	const showAreasFunc = (warehouse_id) => {
		setShowAreas(!showAreas);
		setClickedId(warehouse_id);
	};

	const deleteWarehouseFunc = async (warehouse_id) => {
		const res = await deleteWarehouse(warehouse_id);
		console.log(res);
		if (!res) {
			return;
		}

		if (res.errors && res.errors.length > 0) {
			toast.error(res.errors[0].message);
			return;
		}

		toast.success(res.message);
		fetchWarehouses();
	};

	const actionContainerRef = useRef(null);

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleClickOutside = (event) => {
		if (actionContainerRef.current && !actionContainerRef.current.contains(event.target) && !event.target.classList.contains("ellipsis")) {
			setActiveActionContainer(-1); // Hide the ellipsis menu only
		}
	};

	return (
		<DashboardLayout>
			<PageTitle title="Warehouse" />
			<StyledPanel>
				<WarehouseSearchBar
					setAddPopUpOpen={setAddPopUpOpen}
					warehouses={warehouses}
					setWarehouseDisplay={setWarehouseDisplay}
					setCurrentPage={setCurrentPage}
				/>
				<TableContainer>
					<Table id="warehouse-table">
						<tbody>
							<TableRows $heading>
								<TableHeadings>Warehouse Name</TableHeadings>
								<TableHeadings>Location</TableHeadings>
								<TableHeadings>Status</TableHeadings>

								<TableHeadings>Actions </TableHeadings>
							</TableRows>

							{paginatedWarehouses.map((warehouse, index) => (
								<React.Fragment key={index}>
									<TableRows onClick={() => showAreasFunc(warehouse.warehouse_id)}>
										<TableData>{warehouse.warehouse_name}</TableData>
										<TableData>{warehouse.warehouse_location}</TableData>
										<TableData>{warehouse.isActive ? "Active" : "Not active"}</TableData>
										<TableData>
											<FontAwesomeIcon className="ellipsis" icon={faEllipsis} onClick={() => setActiveActionContainer(index)} />
											{activeActionContainer === index && (
												<ActionContainer ref={actionContainerRef}>
													{warehouse.warhouse_id !== 1 ||
														warehouse.warhouse_id !==
															2(
																<>
																	<p
																		onClick={() => {
																			setClickedId(warehouse.warehouse_id);
																			setEditPopUpOpen(true);
																		}}
																	>
																		<FontAwesomeIcon icon={faPen} />
																		Edit
																	</p>
																	<p
																		onClick={() => {
																			// setShowDeactivate(true);
																			// setClickedName(warehouse.warehouse_name);
																			deleteWarehouseFunc(warehouse.warehouse_id);
																			console.log("Delete warehouse with ID:", warehouse.warehouse_id);
																		}}
																	>
																		<FontAwesomeIcon icon={faTrash} /> Delete
																	</p>

																	{warehouse.isActive && (
																		<p
																			onClick={() => {
																				setShowDeactivate(true);
																				setClickedName(warehouse.warehouse_name);
																				setSelectedWarehouseId(warehouse.warehouse_id);
																			}}
																		>
																			<FontAwesomeIcon icon={faXmarkCircle} /> Deactivate
																		</p>
																	)}

																	{!warehouse.isActive && (
																		<p onClick={() => handleReactivateModal(warehouse.warehouse_id, warehouse.warehouse_name)}>
																			<FontAwesomeIcon icon={faCheckCircle} /> Activate
																		</p>
																	)}
																</>
															)}

													<p
														onClick={() => {
															setShowAddArea(true);
															setClickedId(warehouse.warehouse_id);
														}}
													>
														Add Area
													</p>

													<p
														onClick={() => {
															setShowAreasModal(true);
															setWarehouseIdForModal(warehouse.warehouse_id);
														}}
													>
														Show Areas
													</p>
												</ActionContainer>
											)}
										</TableData>
									</TableRows>
								</React.Fragment>
							))}
						</tbody>
					</Table>
				</TableContainer>

				<PdfExporter tableId="warehouse-table" filename="warehouse" />
				<Pagination
					totalItems={warehouses.length}
					itemsPerPage={itemsPerPage}
					currentPage={currentPage}
					onPageChange={setCurrentPage}
					itemsPerPageOptions={[5, 10, 15, 20]}
					defaultItemsPerPage={10}
					setItemsPerPage={setItemsPerPage}
				/>
			</StyledPanel>
			{isAddPopUpOpen && <AddWarehouse setAddPopUpOpen={setAddPopUpOpen} fetchWarehouses={fetchWarehouses} />}
			{isEditPopUpOpen && <EditWarehouse setEditPopUpOpen={setEditPopUpOpen} fetchWarehouses={fetchWarehouses} clickedId={clickedId} />}
			{showDeactivate && (
				<DeactivateModal type="warehouse" text={clickedName} close={setShowDeactivate} confirm={() => deactivateWarehouseFunc(selectedWarehouseId)} />
			)}

			{showReactivateModal && (
				<ReactivateModal
					type="Warehouse"
					text={clickedName}
					close={() => setShowReactivateModal(false)}
					confirm={() => {
						reactivateWarehouseFunc(selectedWarehouseId);
						setShowReactivateModal(false);
					}}
				/>
			)}

			{showAddArea && <AddWarehouseArea setAddPopUpOpen={setShowAddArea} fetchWarehouseAreas={fetchWarehouses} clickedId={clickedId} />}
			{showAreasModal && (
				<AreasComponent
					setShowAddArea={setShowAddArea} // Pass the setShowAddArea function as a prop
					warehouse_id={warehouseIdForModal}
					onClose={() => setShowAreasModal(false)}
				/>
			)}

			{/* {showAreas && (
        <div>
          <h2>Areas for Warehouse ID: {clickedId}</h2>
          <AreasComponent warehouse_id={clickedId} />
        </div>
      )} */}
		</DashboardLayout>
	);
};

export default Warehouse;
