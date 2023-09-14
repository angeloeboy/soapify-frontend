import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import DashboardLayout from "@/components/misc/dashboardLayout";
import StyledPanel from "@/styled-components/StyledPanel";
import PageTitle from "@/components/misc/pageTitle";
import Table, { ActionContainer, TableData, TableHeadings, TableRows } from "@/styled-components/TableComponent";
import { Button } from "@/styled-components/ItemActionModal";
import TopBar from "@/components/misc/topbar";
import UserSearchBarComponent from "@/components/misc/userSearchBarAndFilters";
import PopupContentUser from "@/components/user/addUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import PopupContentWarehouse from "@/components/warehouse/addWarehouse";
import WarehouseSearchBarComponent from "@/components/warehouse/SearchBarAndFilter";
import { getSuppliers } from "@/api/supplier";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Suppliers = () => {
	const [searchQuery, setSearchQuery] = useState(""); // Initialize searchQuery
	const [isPopupOpen, setPopupOpen] = useState(false);
	const [activeActionContainer, setActiveActionContainer] = useState(-1);
	const [suppliers, setSuppliers] = useState([]);
	const [supplierLoading, setSupplierLoading] = useState([]);
	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
		// You can perform any other actions related to search here
	};

	const handleOpenPopup = () => {
		setPopupOpen(true);
	};

	const handleClosePopup = () => {
		setPopupOpen(false);
	};

	useEffect(() => {
		setSupplierLoading(true);
		getSuppliers().then((res) => {
			console.log(res);
			setSuppliers(res.suppliers || []);
			setSupplierLoading(false);
		});
	}, []);

	const warehouseData = [
		{
			warehouse_id: "1",
			warehouse_name: "warehouseName1",
			location: "Address123",
		},
		{
			warehouse_id: "2",
			warehouse_name: "warehouseName2",
			location: "Address1234",
		},
		{
			warehouse_id: "3",
			warehouse_name: "warehouseName3",
			location: "Address12345",
		},
	];

	return (
		<DashboardLayout>
			<PageTitle title="Suppliers" />
			<StyledPanel>
				<WarehouseSearchBarComponent searchQuery={searchQuery} handleSearchChange={handleSearchChange} handleOpenPopup={handleOpenPopup} />

				<Table>
					<tbody>
						<TableRows heading>
							<TableHeadings> ID</TableHeadings>

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
										<TableData>
											<Skeleton width={50} height={20} />
										</TableData>
									</TableRows>
							  ))
							: suppliers.map((supplier, index) => (
									<TableRows key={supplier.supplier_id}>
										<TableData>{supplier.supplier_id}</TableData>
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
															setSelectedProductId(product.product_id);
															openEditPopUp(selectedProductId);
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
							  ))}
					</tbody>
				</Table>
			</StyledPanel>
			{isPopupOpen && <PopupContentWarehouse onClose={handleClosePopup} />}
		</DashboardLayout>
	);
};

export default Suppliers;
