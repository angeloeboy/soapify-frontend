import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/misc/dashboardLayout";
import StyledPanel from "@/styled-components/StyledPanel";
import PageTitle from "@/components/misc/pageTitle";
import Table, { ActionContainer, TableContainer, TableData, TableHeadings, TableRows } from "@/styled-components/TableComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import pdfExporter from "@/components/misc/pdfExporter";
import { faEllipsis, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteModal from "@/components/misc/delete";
import { deleteAttribute, getAttributes } from "@/api/attributes";
import AttributeSearchBar from "@/components/attributes/attributeSearchbar";
import AddAttribute from "@/components/attributes/addAttributes";
import EditAttribute from "@/components/attributes/editAttribute";
import Pagination from "@/components/misc/pagination";
import LoadingSkeleton from "@/components/misc/loadingSkeleton";
import PdfExporter from "@/components/misc/pdfExporter";
// // eto din
// import DeactivateModal from "@/components/misc/deactivate";

const PaymentTable = ({ hasAddPermission, hasEditPermission, hasDeletePermission }) => {
	const [activeActionContainer, setActiveActionContainer] = useState(-1);

	const [attributes, setAttributes] = useState([]);
	const [attributesLoading, setAttributesLoading] = useState(false);
	const [isEditAttributeOpen, setEditAttributeOpen] = useState(false); // Define isEditOpen state variable
	const [isPopUpOpen, setPopUpOpen] = useState(false);

	//IMPORT MO TO
	const [clickedName, setClickedName] = useState(null);
	const [showDeactivate, setShowDeactivate] = useState(false);

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [attributesDisplay, setAttributesDisplay] = useState([]); // Define attributesDisplay state variable
	const [paginatedAttributes, setPaginatedAttributes] = useState([]); // Define paginatedAttributes state variable
	const [selectedAttributeId, setSelectedAttributeId] = useState(null);

	const fetchAttributes = async () => {
		const res = await getAttributes();

		if (!res) {
			setAttributes([]);
			setAttributesDisplay([]); // Initialize attributesDisplay
			setPaginatedAttributes([]); // Initialize paginatedAttributes
			setAttributesLoading(false);

			return;
		}

		const attributesArray = res.attributes || [];
		setAttributes(attributesArray);
		setAttributesDisplay(attributesArray);
		// Use setPagePerItem here
		setPaginatedAttributes(attributesArray.slice(0, itemsPerPage)); // Initialize paginatedAttributes with the first page
		setAttributesLoading(false);
	};

	useEffect(() => {
		// Step 3: Use pagePerItem state in the useEffect
		fetchAttributes();
	}, [itemsPerPage]); // Fetch attributes when pagePerItem changes

	useEffect(() => {
		// Use setAttributesDisplay instead of attributesDisplay
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = currentPage * itemsPerPage;
		const paginatedAttributesSlice = attributesDisplay.slice(startIndex, endIndex);
		setPaginatedAttributes(paginatedAttributesSlice);
	}, [currentPage, attributesDisplay, itemsPerPage]);

	useEffect(() => {
		fetchAttributes();
	}, []);

	useEffect(() => {
		console.log(isPopUpOpen);
	}, [isPopUpOpen]);

	const handleClosePopup = () => {
		setPopupOpen(false);
	};

	const closeEditAttribute = () => {
		setEditAttributeOpen(false);
	};
	const openEditAttribute = () => {
		setEditAttributeOpen(true);
	};

	const deleteAttributeFunc = async (attribute_id) => {
		const res = await deleteAttribute(attribute_id);
		console.log(res);

		if (!res) {
			return;
		}

		fetchAttributes();
	};

	const [selectedAttribute, setSelectedAttribute] = useState(null);

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
	return (
		<DashboardLayout>
			<PageTitle title="Attributes" />
			<StyledPanel>
				{/* <PaymentSearchBarComponent searchQuery={searchQuery} handleSearchChange={handleSearchChange} handleOpenPopup={handleOpenPopup} /> */}
				<AttributeSearchBar setPopUpOpen={setPopUpOpen} hasAddPermission={hasAddPermission} fetchAttributes={fetchAttributes} />
				<TableContainer>
					<Table id="attributes-table">
						<tbody>
							<TableRows $heading>
								<TableHeadings>Attribute Name</TableHeadings>
								<TableHeadings>Choices</TableHeadings>
								<TableHeadings>Actions</TableHeadings>
							</TableRows>

							{attributes.length === 0
								? attributesLoading && <LoadingSkeleton columns={4} />
								: paginatedAttributes.map((attribute, index) => (
										<TableRows key={attribute.attribute_id}>
											<TableData>{attribute.attribute_name}</TableData>
											<TableData>{attribute.values.length}</TableData>

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
																setSelectedAttribute(attribute);
																openEditAttribute(selectedAttribute);
																setSelectedAttributeId(attribute);
															}}
														>
															<FontAwesomeIcon icon={faPen} /> Edit
														</p>

														<p
															onClick={() => {
																//GAWIN MO TO
																setShowDeactivate(true);
																setClickedName(attribute.attribute_name);
																setSelectedAttributeId(attribute.attribute_id);
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

				<PdfExporter tableId="attributes-table" fileName="attributes.pdf" className="export-btn" />
				<Pagination
					totalItems={attributesDisplay.length}
					itemsPerPage={itemsPerPage}
					currentPage={currentPage}
					onPageChange={setCurrentPage}
					itemsPerPageOptions={[5, 10, 15, 20]}
					defaultItemsPerPage={10}
					setItemsPerPage={setItemsPerPage}
				/>
			</StyledPanel>
			{isPopUpOpen && <AddAttribute setPopUpOpen={setPopUpOpen} fetchAttributes={fetchAttributes} />}
			{isEditAttributeOpen && <EditAttribute onClose={closeEditAttribute} fetchAttributes={fetchAttributes} selectedAttr={selectedAttributeId} />}

			{showDeactivate && (
				<DeleteModal type="attributes" text={clickedName} close={setShowDeactivate} confirm={() => deleteAttributeFunc(selectedAttributeId)} />
			)}
		</DashboardLayout>
	);
};

export default PaymentTable;

import cookie, { parse } from "cookie";
export async function getServerSideProps(context) {
	const { req } = context;
	const parsedCookies = cookie.parse(req.headers.cookie || "").permissions;

	if (!parsedCookies.includes("View Attributes:attributes")) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {
			hasAddPermission: parsedCookies.includes("Add Attributes:attributes"),
			hasEditPermission: parsedCookies.includes("Edit Attributes:attributes"),
			hasDeletePermission: parsedCookies.includes("Delete Attributes:attributes"),
		}, // will be passed to the page component as props
	};
}
