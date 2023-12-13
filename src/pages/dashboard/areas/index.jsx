import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/misc/dashboardLayout";
import PageTitle from "@/components/misc/pageTitle";
import PdfExporter from "@/components/misc/pdfExporter";
import Table, { ActionContainer, TableData, TableHeadings, TableRows } from "@/styled-components/TableComponent";
import StyledPanel from "@/styled-components/StyledPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddShelving from "@/components/shelving/addShelving";
import ShelvingSearchBar from "@/components/shelving/shelvingSearchBar";
import Pagination from "@/components/misc/pagination";
import { getAreas } from "@/api/warehouse";
import EditArea from "@/components/shelving/editArea";
import styled from "styled-components";

const Full = styled.p`
	color: red;
	font-weight: bold;
	background-color: #ff000058;
	padding: 0.5rem;
	font-size: 12px;
	border-radius: 0.5rem;
	display: inline-block;
`;

const AboutToBeFull = styled.p`
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

const Areas = () => {
	const [areas, setAreas] = useState([]);
	const [filteredShelves, setFilteredShelves] = useState([]);
	const [filteredAreas, setFilteredAreas] = useState([]);
	const [activeActionContainer, setActiveActionContainer] = useState(-1);
	const [isAddShelfPopupOpen, setIsAddShelfPopupOpen] = useState(false);
	const [isAddAreaPopupOpen, setIsAddAreaPopupOpen] = useState(false);

	const [selectedArea, setSelectedArea] = useState(null);
	const [isEditAreaPopupOpen, setIsEditAreaPopupOpen] = useState(false);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);

	const getAreasFunc = async () => {
		const res = await getAreas();
		if (!res) return;
		setAreas(res.areas);
		setFilteredAreas(res.areas);
		console.log(res.areas);
	};

	useEffect(() => {
		getAreasFunc();

		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	//check if area is full, about to be full or good
	const checkAreaStatus = (area) => {
		if (area.currentCapacity >= area.max_capacity) {
			return <Full>Full</Full>;
		} else if (area.currentCapacity >= area.max_capacity * 0.8) {
			return <AboutToBeFull>About to be full</AboutToBeFull>;
		} else {
			return <Good>Good</Good>;
		}
	};

	const handleClickOutside = (event) => {
		if (!event.target.closest(".action-container") && !event.target.closest(".ellipsis")) {
			setActiveActionContainer(null);
		}
	};
	// const handleSearchShelves = (searchTerm) => {
	// 	const lowerCaseSearchTerm = searchTerm.toLowerCase();

	// 	const filteredShelves = shelves.filter((shelf) => shelf.shelfName.toLowerCase().includes(lowerCaseSearchTerm));

	// 	setFilteredShelves(filteredShelves);
	// 	setCurrentPage(1); // Reset to the first page when searching.
	// };

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = currentPage * itemsPerPage;
	const paginatedAreas = areas.slice(startIndex, endIndex);

	return (
		<DashboardLayout>
			<PageTitle title="Areas" />

			<StyledPanel>
				<ShelvingSearchBar setIsAddShelfPopupOpen={setIsAddShelfPopupOpen} setShelvesDisplay={setFilteredShelves} />

				<Table id="shelving-table">
					<tbody>
						<TableRows $heading>
							<TableHeadings>Area Name</TableHeadings>

							<TableHeadings>Warehouse</TableHeadings>
							<TableHeadings>Capacity</TableHeadings>
							<TableHeadings>Current Capacity</TableHeadings>
							<TableHeadings>Status</TableHeadings>
							<TableHeadings>Action</TableHeadings>
						</TableRows>

						{paginatedAreas.map((area, index) => (
							<TableRows key={area.area_id}>
								<TableData>{area.area_name}</TableData>
								<TableData>{area.warehouse.warehouse_name}</TableData>
								<TableData>{area.max_capacity}</TableData>
								<TableData>{area.currentCapacity}</TableData>
								<TableData>{checkAreaStatus(area)}</TableData>

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
													setSelectedArea(area);
													setIsEditAreaPopupOpen(true);
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
				<PdfExporter tableId="shelving-table" filename="shelving" />
				<Pagination
					totalItems={areas.length}
					itemsPerPage={itemsPerPage}
					currentPage={currentPage}
					onPageChange={setCurrentPage}
					itemsPerPageOptions={[5, 10, 15, 20]}
					defaultItemsPerPage={10}
					setItemsPerPage={setItemsPerPage}
				/>
			</StyledPanel>

			{isAddShelfPopupOpen && <AddShelving setIsAddShelfPopupOpen={setIsAddShelfPopupOpen} getShelvesFunc={getShelvesFunc} />}
			{isEditAreaPopupOpen && <EditArea setIsEditAreaPopupOpen={setIsEditAreaPopupOpen} getAreasFunc={getAreasFunc} selectedArea={selectedArea} />}
		</DashboardLayout>
	);
};

export default Areas;

import cookie, { parse } from "cookie";
export async function getServerSideProps(context) {
	const { req } = context;
	const parsedCookies = cookie.parse(req.headers.cookie || "").permissions;

	if (!parsedCookies.includes("View Areas:areas")) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {
			hasAddAreaPermission: parsedCookies.includes("Add Area:areas"),
			hasEditAreaPermission: parsedCookies.includes("Edit Area:areas"),
			hasDeleteAreaPermission: parsedCookies.includes("Delete Area:areas"),
		}, // will be passed to the page component as props
	};
}
