import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/misc/dashboardLayout";
import PageTitle from "@/components/misc/pageTitle";
import Table, { ActionContainer, TableContainer, TableData, TableHeadings, TableRows } from "@/styled-components/TableComponent";
import StyledPanel from "@/styled-components/StyledPanel";
import { faEllipsis, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import PdfExporter from "@/components/misc/pdfExporter";
import { deleteRole, getRoles } from "@/api/roles";
import Pagination from "@/components/misc/pagination";
import LoadingSkeleton from "@/components/misc/loadingSkeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddRoles from "@/components/roles/addRoles";
import RolesSearchBar from "./../../../components/roles/rolesSearchBar";
import EditRoles from "@/components/roles/editRoles";
import { toast } from "react-toastify";

const Roles = () => {
	const [roles, setRoles] = useState([]);
	const [rolesDisplay, setRolesDisplay] = useState([]);
	const [rolesLoading, setRolesLoading] = useState(false);
	const [isAddPopUpOpen, setIsAddPopUpOpen] = useState(false);
	const [isEditPopUpOpen, setIsEditPopUpOpen] = useState(false);
	const [clickedRole, setClickedRole] = useState({});
	const [activeActionContainer, setActiveActionContainer] = useState(-1);

	const [currentPage, setCurrentPage] = useState(1);
	const [pagePerItem, setPagePerItem] = useState(10);

	const startIndex = (currentPage - 1) * pagePerItem;
	const endIndex = currentPage * pagePerItem;
	const paginatedRoles = rolesDisplay.slice(startIndex, endIndex);

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [currentPage, pagePerItem]);

	const handleClickOutside = (event) => {
		if (!event.target.closest(".action-container") && !event.target.closest(".ellipsis")) {
			setActiveActionContainer(null);
		}
	};

	const fetchRoles = async () => {
		setRolesLoading(true);
		const res = await getRoles();

		if (res) {
			setRoles(res.roles);
			setRolesDisplay(res.roles);
		}

		setRolesLoading(false);
	};

	const deleteRolefunc = async (id) => {
		const res = await deleteRole(id);

		if (res.status === "Success") {
			toast.success("Role deleted");
			fetchRoles();
			return;
		}

		toast.error(res.message);
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
				<TableContainer>
					<Table id="roles-table">
						<tbody>
							<TableRows $heading>
								<TableHeadings>Role </TableHeadings>
								<TableHeadings># of Users</TableHeadings>
								<TableHeadings># of Permissions</TableHeadings>

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
										<TableData>{role.permissions.length}</TableData>

										<TableData>
											<FontAwesomeIcon
												className="ellipsis"
												icon={faEllipsis}
												onClick={() => (activeActionContainer === index ? setActiveActionContainer(-1) : setActiveActionContainer(index))}
											/>

											{activeActionContainer === index && (
												<ActionContainer onClick={() => setActiveActionContainer(-1)}>
													{role.role_id !== 1 && role.role_id !== 2 && (
														<>
															<p
																onClick={() => {
																	setClickedRole(role);
																	setIsEditPopUpOpen(true);
																}}
															>
																<FontAwesomeIcon icon={faPen} />
																Edit
															</p>
															<p onClick={() => deleteRolefunc(role.role_id)}>
																<FontAwesomeIcon icon={faTrash} /> Delete
															</p>
														</>
													)}
												</ActionContainer>
											)}
										</TableData>
									</TableRows>
								))
							)}
						</tbody>
					</Table>
				</TableContainer>

				<PdfExporter tableId="roles-table" filename="roles.pdf" />
				<Pagination totalItems={rolesDisplay.length} itemsPerPage={pagePerItem} currentPage={currentPage} onPageChange={(newPage) => setCurrentPage(newPage)} />
			</StyledPanel>

			{isAddPopUpOpen && <AddRoles setIsAddPopUpOpen={setIsAddPopUpOpen} fetchRoles={fetchRoles} />}
			{isEditPopUpOpen && <EditRoles setIsEditPopUpOpen={setIsEditPopUpOpen} fetchRoles={fetchRoles} clickedRole={clickedRole} />}
		</DashboardLayout>
	);
};

export default Roles;
