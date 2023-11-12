import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import DashboardLayout from "@/components/misc/dashboardLayout";
import StyledPanel from "@/styled-components/StyledPanel";
import PageTitle from "@/components/misc/pageTitle";
import Table, { ActionContainer, TableData, TableHeadings, TableRows } from "@/styled-components/TableComponent";
import { Button } from "@/styled-components/ItemActionModal";
import TopBar from "@/components/misc/topbar";
import { useRouter } from "next/router";
import UserSearchBarComponent from "@/components/user/userSearchbar";
import EditUser from "@/components/user/editUser";
import AddUser from "@/components/user/addUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Pagination from "@/components/misc/pagination";
import { getUsers } from "@/api/users";

const User = () => {
	const [users, setUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [userDisplay, setUserDisplay] = useState([]);
	const [activeActionContainer, setActiveActionContainer] = useState(-1);
	const [isAddUserOpen, setisAddUserOpen] = useState(false);
	const [isEditUserPopup, setEditUserPopup] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [pagePerItem, setPagePerItem] = useState(5);

	const handleClickOutside = (event) => {
		if (!event.target.closest(".action-container") && !event.target.closest(".ellipsis")) {
			setActiveActionContainer(null);
		}
	};

	useEffect(() => {
		const startIndex = (currentPage - 1) * pagePerItem;
		const endIndex = currentPage * pagePerItem;
		const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
		setUserDisplay(paginatedUsers);
	}, [currentPage, filteredUsers]);

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

	return (
		<DashboardLayout>
			<PageTitle title="Accounts Lists" />
			<StyledPanel>
				<UserSearchBarComponent users={users} setFilteredUsers={setFilteredUsers} setCurrentPage={setCurrentPage} setIsLoading={setIsLoading} />

				<Table>
					<tbody>
						<TableRows $heading>
							<TableHeadings>Name</TableHeadings>
							<TableHeadings>Username</TableHeadings>
							<TableHeadings>Status</TableHeadings>
							<TableHeadings>Type</TableHeadings>
							<TableHeadings>Actions</TableHeadings>
						</TableRows>

						{userDisplay.map((user, index) => (
							<TableRows key={index}>
								<TableData $bold $withImage>
									<Image src="/product_img2.png" width={40} height={40} alt={"Product image"} />
									{user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)} {user.last_name.charAt(0).toUpperCase() + user.last_name.slice(1)}
								</TableData>
								<TableData>{user.username}</TableData>
								<TableData>{user.isActive}</TableData>
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
													setSelectedUserId();
													// (user.user_id);
													openEditUserPopUp();
													// (selectedProductId);
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
			{isAddUserOpen && <AddUser setisAddUserOpen={setisAddUserOpen} fetchUsers={fetchUsers} />}
			{isEditUserPopup && (
				<EditUser
					onClose={handleCloseEditUserPopUp}
					// productId={selectedProductId}
					//   onButtonClick={onButtonClick}
					//   GetProducts={fetchProducts}
				/>
			)}

			<Pagination itemsPerPage={pagePerItem} totalItems={filteredUsers.length} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} />
		</DashboardLayout>
	);
};

export default User;
