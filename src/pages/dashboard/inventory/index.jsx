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
import AddInventoryComponent from "@/components/inventory/addInventory"; // Import your popup content component
import { getInventory } from "@/api/inventory";

const InventoryPage = () => {


	const [inventory, setInventory] = useState([]);

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
		getInventoryFunc();

		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);



	const getInventoryFunc = () => {
		getInventory().then((res) => {
			console.log(res);
			res.inventory ? setInventory(res.inventory) : setInventory([]);
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

						{inventory.map((inventory, index) => (
							<TableRows key={index}>
								<TableData bold withImage>
									{/* <Image src="/product_img2.png" width={40} height={40} alt={"Product image"} /> */}
									<Image src="/product_img2.png" width={40} height={40} alt={"Product image"} />

									{inventory.Product.product_name}
								</TableData>
								<TableData>test</TableData>
								<TableData>{inventory.quantity}</TableData>
								<TableData>{inventory.quantity}</TableData>
								<TableData>{convertToDateFormat(inventory.date_added)}</TableData>
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
			</StyledPanel>
			{isPopupOpen && <AddInventoryComponent onClose={handleClosePopup} getInventoryFunc={getInventoryFunc} />}
		</DashboardLayout>
	);
};

export default InventoryPage;
