import React, { useState, useRef, useEffect } from "react";

import DashboardLayout from "@/components/misc/dashboardLayout";
import StyledPanel from "@/styled-components/StyledPanel";
import PageTitle from "@/components/misc/pageTitle";
import Table, { ActionContainer, TableData, TableHeadings, TableRows } from "@/styled-components/TableComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faEllipsis, faPen, faTrash, faTrashCan, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import AddWarehouse from "@/components/warehouse/addWarehouse";
import WarehouseSearchBar from "@/components/warehouse/warehouseSearchBar";
import { deactivateWarehouse, deleteWarehouse, getAllWarehouse, reactivateWarehouse } from "@/api/warehouse";
import EditWarehouse from "@/components/warehouse/editWarehouse";
import DeactivateModal from "@/components/misc/deactivate";
import { PaginationControl } from "@/styled-components/ItemActionModal";
import Pagination from "@/components/misc/pagination";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Warehouse = () => {
	const [isAddPopUpOpen, setAddPopUpOpen] = useState(false);
	const [isEditPopUpOpen, setEditPopUpOpen] = useState(false);
	const [activeActionContainer, setActiveActionContainer] = useState(-1);
	const [clickedId, setClickedId] = useState(null);
	const [clickedName, setClickedName] = useState(null);
	const [showDeactivate, setShowDeactivate] = useState(false);

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);


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
		res ? setWarehouses(res.warehouses) : setWarehouses([]);
		res ? setWarehouseDisplay(res.warehouses) : setWarehouseDisplay([]);
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

				<Table>
					<tbody>
						<TableRows $heading>
							<TableHeadings>Warehouse ID</TableHeadings>
							<TableHeadings>Warehouse Name</TableHeadings>
							<TableHeadings>Location</TableHeadings>
							<TableHeadings>Status</TableHeadings>
							<TableHeadings>Actions</TableHeadings>
						</TableRows>

						{paginatedWarehouses.map((warehouse, index) => (
							<TableRows key={index}>
								<TableData>{warehouse.warehouse_id}</TableData>
								<TableData>{warehouse.warehouse_name}</TableData>
								<TableData>{warehouse.warehouse_location}</TableData>
								<TableData>{warehouse.isActive ? "Active" : "Not active"}</TableData>

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
													setClickedId(warehouse.warehouse_id);
													setEditPopUpOpen(true);
												}}
											>
												<FontAwesomeIcon icon={faPen} />
												Edit
											</p>
											<p
												onClick={() => {
													setShowDeactivate(true);
													setClickedName(warehouse.warehouse_name);
												}}
											>
												<FontAwesomeIcon icon={faTrash} /> Delete
											</p>

											<p onClick={() => deactivateWarehouseFunc(warehouse.warehouse_id)}>
												<FontAwesomeIcon icon={faXmarkCircle} /> Deactivate Warehouse
											</p>
											<p onClick={() => reactivateWarehouseFunc(warehouse.warehouse_id)}>
												<FontAwesomeIcon icon={faCheckCircle} /> Reactivate Warehouse
											</p>
										</ActionContainer>
									)}
								</TableData>
							</TableRows>
						))}
					</tbody>
				</Table>
				<Pagination totalItems={warehouses.length}  
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
			{showDeactivate && <DeactivateModal type="warehouse" text={clickedName} close={setShowDeactivate} />}
		</DashboardLayout>
	);
};

export default Warehouse;
