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
import UserSearchBarComponent from "@/components/misc/userSearchBarAndFilters";
import EditUserComponent from "@/components/user/editUser";
import PopupContentUser from "@/components/user/addUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Pagination from "@/components/misc/pagination";

const User = () => {
	const [searchQuery, setSearchQuery] = useState(""); // Initialize searchQuery
	const [isPopupOpen, setPopupOpen] = useState(false);
	const [activeActionContainer, setActiveActionContainer] = useState(-1);
	const [isEditUserPopup, setEditUserPopup] = useState(false);

	const ITEMS_PER_PAGE = 10; // Adjust this to your desired number of items per page
	const [currentPage, setCurrentPage] = useState(1);

	const paginate = (array, currentPage, itemsPerPage) => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		return array.slice(startIndex, startIndex + itemsPerPage);
	};

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
		// You can perform any other actions related to search here
	};
	const router = useRouter();

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

	const handleCloseEditUserPopUp = () => {
		setEditUserPopup(false);
	};
	const openEditUserPopUp = () => {
		setEditUserPopup(true);
	};

	const handleClosePopup = () => {
		setEditUserPopup(false);
	};
	const onButtonClick = () => {
		fileInput.current.click();
	};

	// useEffect(() => {
	//   // Fetch your users or any other data here using a similar pattern as in the Products component.
	//   // For example:
	//   // fetchUsers().then((res) => {
	//   //   setUsers(res.users || []);
	//   // });
	// }, []);
	const userData = [
		{
			name: "User 1",
			username: "user1",
			status: "Active",
			type: "Admin",
		},
		{
			name: "User 2",
			username: "user2",
			status: "Inactive",
			type: "User",
		},
		{
			name: "User 3",
			username: "user3",
			status: "Active",
			type: "User",
		},
	];
	const paginatedUserData = paginate(userData, currentPage, ITEMS_PER_PAGE);

	const [selectedUserId, setSelectedUserId] = useState(null);
	return (
		<DashboardLayout>
			<PageTitle title="Accounts Lists" />
			<StyledPanel>
				<UserSearchBarComponent
					searchQuery={searchQuery}
					handleSearchChange={handleSearchChange}
					// handleOpenPopup={handleOpenPopup} // Pass handleOpenPopup function
				/>

				<Table>
					<tbody>
						<TableRows heading>
							<TableHeadings>Name</TableHeadings>
							<TableHeadings>Username</TableHeadings>
							<TableHeadings>Status</TableHeadings>
							<TableHeadings>Type</TableHeadings>
							<TableHeadings>Actions</TableHeadings>
						</TableRows>

						{paginatedUserData.map((user, index) => (
							<TableRows key={index}>
								<TableData $bold withImage>
									<Image src="/product_img2.png" width={40} height={40} alt={"Product image"} />
									{user.name}
								</TableData>
								<TableData>{user.username}</TableData>
								<TableData>{user.status}</TableData>
								<TableData>{user.type}</TableData>
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
			{isPopupOpen && <PopupContentUser onClose={handleClosePopup} onButtonClick={onButtonClick} />}
			{isEditUserPopup && (
				<EditUserComponent
					onClose={handleCloseEditUserPopUp}
					// productId={selectedProductId}
					//   onButtonClick={onButtonClick}
					//   GetProducts={fetchProducts}
				/>
			)}

			<Pagination itemsPerPage={ITEMS_PER_PAGE} totalItems={userData.length} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} />
		</DashboardLayout>
	);
};

export default User;
