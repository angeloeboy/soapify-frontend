import React, { useState, useEffect } from "react";
import Image from "next/image";
import DashboardLayout from "@/components/misc/dashboardLayout";
import PageTitle from "@/components/misc/pageTitle";
import Table, { ActionContainer, Status, TableContainer, TableData, TableHeadings, TableRows } from "@/styled-components/TableComponent";
import StyledPanel from "@/styled-components/StyledPanel";
import { faArrowsSpin, faBox, faBoxOpen, faEllipsis, faFilter, faPen, faPlus, faPlusCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableControlPanel from "@/styled-components/TableControlPanel";
import PdfExporter from "@/components/misc/pdfExporter";
import { Button, ButtonAddInventory, ButtonAddAccountType, ButtonAddStatus } from "@/styled-components/ItemActionModal";
import AddInventory from "@/components/inventory/addInventory"; // Import your popup content component
import EditInventoryComponent from "@/components/inventory/editInventory";
import { convertBoxToPcs, convertPcsToBox, getInventory } from "@/api/inventory";
import InventorySearchBar from "@/components/inventory/inventorySearchBar";

import { PaginationControl } from "@/styled-components/ItemActionModal";
import Pagination from "@/components/misc/pagination";
import LoadingSkeleton from "@/components/misc/loadingSkeleton";
import { useRouter } from "next/router";
import MoveInventory from "@/components/inventory/moveInventory";
import InventoryLogs from "@/components/inventory/inventoryLogs";

const Expired = styled.p`
	color: red;
	font-weight: bold;
	background-color: #ff000058;
	padding: 0.5rem;
	font-size: 12px;
	border-radius: 0.5rem;
	display: inline-block;
`;

const AboutToExpire = styled.p`
	color: #6f00ff;
	font-weight: bold;
	background-color: #6f00ff58;
	padding: 0.5rem;
	font-size: 12px;
	border-radius: 0.5rem;
	display: inline-block;
`;

const Good = styled.p`
	color: #001d07;
	font-weight: bold;
	background-color: #00ff4058;
	padding: 0.5rem;
	font-size: 12px;
	border-radius: 0.5rem;
	display: inline-block;
`;

const InventoryPage = ({ hasAddinventory }) => {
	// const {productId, openModal} =
	const router = useRouter();

	const { productId, openModal } = router.query;

	const [inventory, setInventory] = useState([]);
	const [inventoryDisplay, setinventoryDisplay] = useState([]);
	const [activeActionContainer, setActiveActionContainer] = useState(-1);
	const [isAddPopUpOpen, setIsAddPopUpOpen] = useState(false);
	const [isMovePopUpOpen, setIsMovePopUpOpen] = useState(false);
	const [isEditPopUpOpen, setIsEditPopUpOpen] = useState(false);
	const [isPackPopUpOpen, setIsPackPopUpOpen] = useState(false);
	const [isUnpackPopUpOpen, setIsUnpackPopUpOpen] = useState(false);
	const [inventoryLoading, setInventoryLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [showLogs, setShowLogs] = useState(false);
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

			if (!res) return;
			res.inventory = res.inventory.filter((inventory) => inventory.current_quantity > 0);
			res.inventory ? setInventory(res.inventory) : setInventory([]);
			res.inventory ? setinventoryDisplay(res.inventory) : setinventoryDisplay([]);
			setInventoryLoading(false);

			console.log("inventory: ", res.inventory);
		});
	};

	const convertToDateFormat = (date) => {
		let newDate = new Date(date);
		let formattedDate = newDate.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});

		//add time to formatted date
		let hours = newDate.getHours();
		let minutes = newDate.getMinutes();
		let ampm = hours >= 12 ? "pm" : "am";
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? "0" + minutes : minutes;
		let strTime = hours + ":" + minutes + " " + ampm;

		formattedDate = formattedDate + " " + strTime;

		//add the seconds to formatted date
		let seconds = newDate.getSeconds();
		formattedDate = formattedDate + ":" + seconds;
		//add the miliseconds to formatted date
		let miliseconds = newDate.getMilliseconds();
		formattedDate = formattedDate + ":" + miliseconds;

		return formattedDate;
	};

	const checkIfAboutToExpire = (date) => {
		let newDate = new Date(date);
		let today = new Date();
		let diff = newDate.getTime() - today.getTime();
		let days = diff / (1000 * 3600 * 24);

		//return expired if days is less than 0
		if (days < 0) {
			return <Expired>Expired</Expired>;
		}

		//return about to expire if days is less than 30
		if (days < 30) {
			return <AboutToExpire>About to Expire</AboutToExpire>;
		}

		//return empty string if not about to expire
		return <Good>Good</Good>;
	};

	const convertBoxToPcsFunc = async (inventory, quantity) => {
		const res = await convertBoxToPcs(inventory, quantity);

		console.log(res);
		if (res.status == "Success") {
			toast.success("Inventory converted successfully");
			fetchInventory();
			return;
		}

		toast.error("Something went wrong");
	};

	const convertPcsToBoxFunc = async (inventory, quantity) => {
		const res = await convertPcsToBox(inventory, quantity);

		console.log(res);
		if (res.status == "Success") {
			toast.success("Inventory converted successfully");
			fetchInventory();
			return;
		}

		toast.error("Something went wrong");
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
					hasAddinventory={hasAddinventory}
				/>

				<TableContainer>
					<Table id="inventory-table">
						<tbody>
							<TableRows $heading>
								<TableHeadings>Batch No.</TableHeadings>
								<TableHeadings>Product Id</TableHeadings>

								<TableHeadings>Product Name</TableHeadings>

								{/* <TableHeadings>Attributes</TableHeadings> */}
								<TableHeadings>SKU</TableHeadings>
								<TableHeadings>Quantity</TableHeadings>
								<TableHeadings>Quantity On hand</TableHeadings>
								<TableHeadings>Date Received</TableHeadings>
								<TableHeadings>Actions</TableHeadings>
							</TableRows>
							{inventory.length === 0 ? (
								inventoryLoading ? (
									<LoadingSkeleton columns={8} />
								) : null
							) : (
								paginatedInventory.map((inventory, index) => (
									<TableRows key={index}>
										<TableData $bold>{inventory.batch_no}</TableData>
										<TableData>{inventory.Product.product_code}</TableData>
										<TableData> {inventory.Product.product_name}</TableData>

										<TableData> {inventory.warehouse && `W: ${inventory.warehouse?.warehouse_name} A: ${inventory.area?.area_name}`}</TableData>

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
														onClick={(e) => {
															setIsMovePopUpOpen(true);
															setSelectedInventory(inventory);
														}}
													>
														<FontAwesomeIcon icon={faArrowsSpin} /> Move Inventory
													</p>
													{inventory.Product.isBox ? (
														<p
															onClick={() => {
																setSelectedInventory(inventory);
																setIsUnpackPopUpOpen(true);
															}}
														>
															<FontAwesomeIcon icon={faBoxOpen} /> Unpack
														</p>
													) : (
														<p
															onClick={() => {
																setSelectedInventory(inventory);
																setIsPackPopUpOpen(true);
															}}
														>
															<FontAwesomeIcon icon={faBox} /> Pack
														</p>
													)}

													<p
														onClick={() => {
															setSelectedInventory(inventory);
															setShowLogs(true);
														}}
													>
														Show Logs
													</p>
												</ActionContainer>
											)}
										</TableData>
									</TableRows>
								))
							)}
						</tbody>
					</Table>
				</TableContainer>
				<PdfExporter tableId="inventory-table" fileName="inventory.pdf" />
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

			{isAddPopUpOpen && <AddInventory setIsAddPopUpOpen={setIsAddPopUpOpen} getInventoryFunc={fetchInventory} productId={productId} openModal={openModal} />}
			{isEditPopUpOpen && <EditInventoryComponent setIsEditPopUpOpen={setIsEditPopUpOpen} getInventoryFunc={fetchInventory} />}
			{isMovePopUpOpen && (
				<MoveInventory
					setIsMovePopUpOpen={setIsMovePopUpOpen}
					getInventoryFunc={fetchInventory}
					selectedInventory={selectedInventory}
					inventoryList={inventory}
				/>
			)}
			{isPackPopUpOpen && <PackInventory setIsPackPopUpOpen={setIsPackPopUpOpen} getInventoryFunc={fetchInventory} selectedInventory={selectedInventory} />}
			{isUnpackPopUpOpen && (
				<UnpackInventory setIsUnpackPopUpOpen={setIsUnpackPopUpOpen} getInventoryFunc={fetchInventory} selectedInventory={selectedInventory} />
			)}

			{showLogs && <InventoryLogs inventory={selectedInventory} />}
		</DashboardLayout>
	);
};

export default InventoryPage;

import cookie, { parse } from "cookie";
import styled from "styled-components";
import { toast } from "react-toastify";
import PackInventory from "@/components/inventory/pack";
import UnpackInventory from "@/components/inventory/unpack";
export async function getServerSideProps(context) {
	const { req } = context;
	const parsedCookies = cookie.parse(req.headers.cookie || "").permissions;

	if (!parsedCookies.includes("View Inventory:inventory")) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {
			hasAddinventory: parsedCookies.includes("Add Inventory:inventory"),
		}, // will be passed to the page component as props
	};
}
