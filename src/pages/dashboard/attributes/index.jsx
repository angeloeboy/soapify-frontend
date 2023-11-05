import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/misc/dashboardLayout";
import StyledPanel from "@/styled-components/StyledPanel";
import PageTitle from "@/components/misc/pageTitle";
import Table, { ActionContainer, TableData, TableHeadings, TableRows } from "@/styled-components/TableComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

import { deleteAttribute, getAttributes } from "@/api/attributes";
import AttributeSearchBar from "@/components/attributes/attributeSearchbar";
import AddAttribute from "@/components/attributes/addAttributes";
import EditAttribute from "@/components/attributes/editAttribute";
import Pagination from "@/components/misc/pagination";
import LoadingSkeleton from "@/components/misc/loadingSkeleton";

const PaymentTable = () => {
	const [activeActionContainer, setActiveActionContainer] = useState(-1);

	const [attributes, setAttributes] = useState([]);
	const [attributesLoading, setAttributesLoading] = useState(false);
	const [isEditAttributeOpen, setEditAttributeOpen] = useState(false); // Define isEditOpen state variable
	const [isPopUpOpen, setPopUpOpen] = useState(false);

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	const [attributesDisplay, setAttributesDisplay] = useState([]); // Define attributesDisplay state variable

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = currentPage * itemsPerPage;
	const paginatedAttributes = attributesDisplay.slice(startIndex, endIndex);

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

	const fetchAttributes = async () => {
		const res = await getAttributes();

		if (!res) {
			setAttributes([]);
			setAttributesDisplay([]);
			setAttributesLoading(false);
			return;
		}

		res.attributes ? setAttributes(res.attributes) : setAttributes([]);
		res.attributes ? setAttributesDisplay(res.attributes) : setAttributesDisplay([]);
		setAttributesLoading(false);
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

	return (
		<DashboardLayout>
			<PageTitle title="Attributes" />
			<StyledPanel>
				{/* <PaymentSearchBarComponent searchQuery={searchQuery} handleSearchChange={handleSearchChange} handleOpenPopup={handleOpenPopup} /> */}
				<AttributeSearchBar setPopUpOpen={setPopUpOpen} />

				<Table>
					<tbody>
						<TableRows $heading>
							<TableHeadings>Attribute Name</TableHeadings>
							<TableHeadings>Choices</TableHeadings>
							<TableHeadings>Additional info?</TableHeadings>
							<TableHeadings>Actions</TableHeadings>
						</TableRows>

						{attributes.length === 0
							? attributesLoading && <LoadingSkeleton columns={4} />
							: paginatedAttributes.map((attribute, index) => (
									<TableRows key={attribute.attribute_id}>
										<TableData>{attribute.attribute_name}</TableData>
										<TableData>{attribute.values.length}</TableData>

										<TableData>{attribute.requires_additional_value ? "Yes" : "No"}</TableData>
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
														}}
													>
														<FontAwesomeIcon icon={faPen} /> Edit
													</p>
													<p onClick={() => deleteAttributeFunc(attribute.attribute_id)}>
														<FontAwesomeIcon icon={faTrash} /> Delete
													</p>
												</ActionContainer>
											)}
										</TableData>
									</TableRows>
							  ))}
					</tbody>
				</Table>

				<Pagination
					totalItems={attributesDisplay.length}
					itemsPerPage={itemsPerPage}
					currentPage={currentPage}
					onPageChange={(newPage) => setCurrentPage(newPage)}
				/>
			</StyledPanel>
			{isPopUpOpen && <AddAttribute setPopUpOpen={setPopUpOpen} fetchAttributes={fetchAttributes} />}
			{isEditAttributeOpen && <EditAttribute onClose={closeEditAttribute} />}
		</DashboardLayout>
	);
};

export default PaymentTable;
