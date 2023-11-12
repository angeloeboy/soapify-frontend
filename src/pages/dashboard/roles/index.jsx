import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/misc/dashboardLayout";
import PageTitle from "@/components/misc/pageTitle";
import Table, { ActionContainer, TableData, TableHeadings, TableRows } from "@/styled-components/TableComponent";
import StyledPanel from "@/styled-components/StyledPanel";
import { faEllipsis, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

import { getRoles } from "@/api/roles";
import Pagination from "@/components/misc/pagination";
import LoadingSkeleton from "@/components/misc/loadingSkeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddRoles from "@/components/roles/addRoles";
import RolesSearchBar from "./../../../components/roles/rolesSearchBar";

const Roles = () => {
	const [roles, setRoles] = useState([]);
	const [rolesDisplay, setRolesDisplay] = useState([]);
	const [rolesLoading, setRolesLoading] = useState(false);
	const [isAddPopUpOpen, setIsAddPopUpOpen] = useState(false);

	const [activeActionContainer, setActiveActionContainer] = useState(-1);

	const [currentPage, setCurrentPage] = useState(1);
	const [pagePerItem, setPagePerItem] = useState(10);

	const startIndex = (currentPage - 1) * pagePerItem;
	const endIndex = currentPage * pagePerItem;
	const paginatedRoles = rolesDisplay.slice(startIndex, endIndex);

	const fetchRoles = async () => {
		setRolesLoading(true);
		const res = await getRoles();

		if (res) {
			setRoles(res.roles);
			setRolesDisplay(res.roles);
		}

		setRolesLoading(false);
	};

	useEffect(() => {
		fetchRoles();
	}, []);

	useEffect(() => {
		console.log(roles);
	}, [roles]);

	return (
		<DashboardLayout>
			<PageTitle title="Roles" />
			<StyledPanel>
				<RolesSearchBar setIsAddPopUpOpen={setIsAddPopUpOpen} roles={roles} setRolesDisplay={setRolesDisplay} setCurrentPage={setCurrentPage} />

				<Table>
					<tbody>
						<TableRows $heading>
							<TableHeadings>Role </TableHeadings>
							<TableHeadings># of Users</TableHeadings>
							<TableHeadings>Actions</TableHeadings>
						</TableRows>

						{roles.length === 0 ? (
							rolesLoading ? (
								<LoadingSkeleton columns={6} />
							) : null
						) : (
							paginatedRoles.map((role, index) => (
								<TableRows key={index}>
									<TableData>{role.role_name}</TableData>

									<TableData>{role.users}</TableData>
									<TableData>
										<FontAwesomeIcon
											className="ellipsis"
											icon={faEllipsis}
											onClick={() => (activeActionContainer === index ? setActivecAtionContainer(-1) : setActiveActionContainer(index))}
										/>

										{activeActionContainer === index && (
											<ActionContainer onClick={() => setActiveActionContainer(-1)}>
												<p
												// onClick={() => {
												// 	setSelectedInventory(inventory);
												// 	setIsEditPopUpOpen(selectedInventory);
												// }}
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
							))
						)}
					</tbody>
				</Table>
				<Pagination totalItems={rolesDisplay.length} itemsPerPage={pagePerItem} currentPage={currentPage} onPageChange={(newPage) => setCurrentPage(newPage)} />
			</StyledPanel>

			{isAddPopUpOpen && <AddRoles setIsAddPopUpOpen={setIsAddPopUpOpen} />}
		</DashboardLayout>
	);
};

export default Roles;
