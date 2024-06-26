import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import DashboardLayout from "@/components/misc/dashboardLayout";
import StyledPanel from "@/styled-components/StyledPanel";
import PageTitle from "@/components/misc/pageTitle";
import PdfExporter from "@/components/misc/pdfExporter";
import Table, { ActionContainer, TableContainer, TableData, TableHeadings, TableRows } from "@/styled-components/TableComponent";
import { Button } from "@/styled-components/ItemActionModal";
import TopBar from "@/components/misc/topbar";
import { useRouter } from "next/router";
import UserSearchBarComponent from "@/components/user/userSearchbar";
import EditUser from "@/components/user/editUser";
import AddUser from "@/components/user/addUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPen, faRefresh, faTrash } from "@fortawesome/free-solid-svg-icons";
import Pagination from "@/components/misc/pagination";
import { getUsers, resetUserCancellation } from "@/api/users";

const User = () => {
	const [users, setUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [userDisplay, setUserDisplay] = useState([]);
	const [activeActionContainer, setActiveActionContainer] = useState(-1);
	const [isAddUserOpen, setisAddUserOpen] = useState(false);
	const [isEditUserPopup, setEditUserPopup] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const [selectedUser, setSelectedUser] = useState(null);

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = currentPage * itemsPerPage;
	const paginatedUser = userDisplay.slice(startIndex, endIndex);

	const handleClickOutside = (event) => {
		if (!event.target.closest(".action-container") && !event.target.closest(".ellipsis")) {
			setActiveActionContainer(null);
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		const res = await getUsers();
		console.log(res.users);
		res.users ? setUsers(res.users) : setUsers([]);
		res.users ? setUserDisplay(res.users) : setUserDisplay([]);
		res.users ? setFilteredUsers(res.users) : setFilteredUsers([]);
	};

	const handleCloseEditUserPopUp = () => {
		setEditUserPopup(false);
	};
	const openEditUserPopUp = () => {
		setEditUserPopup(true);
	};

	const resetCancellationCountFunc = async (user) => {
		const res = await resetUserCancellation(user.id);

		if (res.status === "Success") {
			toast.success("Cancellation count reset");

			fetchUsers();
			return;
		}

		toast.error(res.message);
	};

	return (
		<DashboardLayout>
			<PageTitle title="Accounts Lists" />
			<StyledPanel>
				<UserSearchBarComponent
					users={users}
					setFilteredUsers={setFilteredUsers}
					setCurrentPage={setCurrentPage}
					setIsLoading={setIsLoading}
					setUserDisplay={setUserDisplay}
					setisAddUserOpen={setisAddUserOpen}
				/>
				<TableContainer>
					<Table id="user-table">
						<tbody>
							<TableRows $heading>
								<TableHeadings>Name</TableHeadings>
								<TableHeadings>Username</TableHeadings>
								<TableHeadings>Type</TableHeadings>
								<TableHeadings>Actions</TableHeadings>
							</TableRows>

							{paginatedUser.map((user, index) => (
								<TableRows key={index}>
									<TableData $bold $withImage>
										<Image src="/product_img2.png" width={40} height={40} alt={"Product image"} />
										{user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)} {user.last_name.charAt(0).toUpperCase() + user.last_name.slice(1)}
									</TableData>
									<TableData>{user.email}</TableData>
									<TableData>{user.role.role_name}</TableData>
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
														setSelectedUser(user);
														openEditUserPopUp();
													}}
												>
													<FontAwesomeIcon icon={faPen} />
													Edit
												</p>
												{/* <p>
													<FontAwesomeIcon icon={faTrash} /> Delete
												</p> */}

												{user.role.role_id == 2 && user.cancellation_count > 0 && (
													<p
														onClick={() => {
															resetCancellationCountFunc(user);
														}}
													>
														<FontAwesomeIcon icon={faRefresh} /> Reset Cancellation count
													</p>
												)}
											</ActionContainer>
										)}
									</TableData>
								</TableRows>
							))}
						</tbody>
					</Table>
				</TableContainer>

				<PdfExporter tableId="user-table" filename="user-list" />
				<Pagination
					totalItems={userDisplay.length}
					itemsPerPage={itemsPerPage} //   this is correct
					currentPage={currentPage}
					onPageChange={setCurrentPage}
					setItemsPerPage={setItemsPerPage}
				/>
			</StyledPanel>
			{isAddUserOpen && <AddUser fetchUsers={fetchUsers} setisAddUserOpen={setisAddUserOpen} />}
			{isEditUserPopup && <EditUser onClose={handleCloseEditUserPopUp} selectedUser={selectedUser} fetchUsers={fetchUsers} />}
		</DashboardLayout>
	);
};

export default User;

import cookie from "cookie";
import { toast } from "react-toastify";

export async function getServerSideProps(context) {
	const { req } = context;
	const parsedCookies = cookie.parse(req.headers.cookie || "").permissions;

	if (!parsedCookies.includes("View Users:users")) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {
			permissions: parsedCookies ? JSON.parse(parsedCookies) : [],
		}, // will be passed to the page component as props
	};
}
