import React, { useState, useRef, useEffect } from "react";

import DashboardLayout from "@/components/misc/dashboardLayout";
import StyledPanel from "@/styled-components/StyledPanel";
import PageTitle from "@/components/misc/pageTitle";
import Table, { ActionContainer, TableData, TableHeadings, TableRows } from "@/styled-components/TableComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddWarehouse from "@/components/warehouse/addWarehouse";
import WarehouseSearchBarComponent from "@/components/warehouse/SearchBarAndFilter";
import { getAllWarehouse } from "@/api/warehouse";

const Warehouse = () => {
	const [isAddPopUpOpen, setAddPopUpOpen] = useState(false);
	const [activeActionContainer, setActiveActionContainer] = useState(-1);
	const [warehouses, setWarehouses] = useState([]);

	useEffect(() => {
		fetchWarehouses();
	}, []);

	const fetchWarehouses = async () => {
		const res = await getAllWarehouse();
		res ? setWarehouses(res.warehouses) : setWarehouses([]);
	};

	return (
		<DashboardLayout>
			<PageTitle title="Warehouse" />
			<StyledPanel>
				<WarehouseSearchBarComponent  setAddPopUpOpen={setAddPopUpOpen} />

				<Table>
					<tbody>
						<TableRows heading>
							<TableHeadings>Warehouse ID</TableHeadings>
							<TableHeadings>Warehouse Name</TableHeadings>
							<TableHeadings>Location</TableHeadings>
							<TableHeadings>Actions</TableHeadings>
						</TableRows>

						{warehouses.map((warehouse, index) => (
							<TableRows key={index}>
								<TableData>{warehouse.warehouse_id}</TableData>
								<TableData>{warehouse.warehouse_name}</TableData>
								<TableData>{warehouse.warehouse_location}</TableData>
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
			{isAddPopUpOpen && <AddWarehouse setAddPopUpOpen={setAddPopUpOpen} fetchWarehouses={fetchWarehouses} />}
		</DashboardLayout>
	);
};

export default Warehouse;
