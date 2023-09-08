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
import SearchBarComponent from "@/components/inventory/searchBarAndFilter";

const InventoryPage = () => {
	const [inventory, setInventory] = useState([]);
	const [inventoryDisplay, setinventoryDisplay] = useState([]);
	const [activeActionContainer, setActiveActionContainer] = useState(-1);
	const [isPopupOpen, setPopupOpen] = useState(false);

	useEffect(() => {
		fetchInventory();

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

	const handleOpenPopup = () => {
		setPopupOpen(true);
	};

	const handleClosePopup = () => {
		setPopupOpen(false);
	};

	const fetchInventory = () => {
		getInventory().then((res) => {
			console.log(res);
			res.inventory ? setInventory(res.inventory) : setInventory([]);
			res.inventory ? setinventoryDisplay(res.inventory) : setinventoryDisplay([]);
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
			<PageTitle title="Inventory" />

			<StyledPanel>
				<SearchBarComponent setPopupOpen={setPopupOpen} setinventoryDisplay={setinventoryDisplay} inventory={inventory} />
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

						{inventoryDisplay.map((inventory, index) => (
							<TableRows key={index}>
								<TableData bold withImage>
									{/* <Image src="/product_img2.png" width={40} height={40} alt={"Product image"} /> */}
									<Image src="/product_img2.png" width={40} height={40} alt={"Product image"} />

									{inventory.Product.product_name}
								</TableData>
								<TableData>test</TableData>
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
			{isPopupOpen && <AddInventoryComponent onClose={handleClosePopup} getInventoryFunc={fetchInventory} />}
		</DashboardLayout>
	);
};

export default InventoryPage;
