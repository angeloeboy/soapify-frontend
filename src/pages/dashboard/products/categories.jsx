import TopBar from "@/components/misc/topbar";
import DashboardLayout from "@/components/misc/dashboardLayout";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faEllipsis, faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";
import PageTitle from "@/components/misc/pageTitle";
import TableControlPanel from "@/styled-components/TableControlPanel";
import StyledPanel from "@/styled-components/StyledPanel";
import { useEffect, useState } from "react";
import { addProduct, getProductCategories, getProducts, deleteCategory } from "@/api/products";
import PdfExporter from "@/components/misc/pdfExporter";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Table, { ActionContainer, TableData, TableHeadings, TableRows, Status, TableContainer } from "@/styled-components/TableComponent";
import { Button } from "@/styled-components/ItemActionModal";

import CategoriesSearchBar from "@/components/product/categories/categoriesSearchBar";
import AddCategories from "./../../../components/product/categories/addCategories";
import EditCategory from "@/components/product/categories/editCategory";
import Pagination from "@/components/misc/pagination";
import DeleteModal from "@/components/misc/delete";
import { toast } from "react-toastify";

const Categories = ({ hasAddPermission, hasEditPermission, hasDeletePermission }) => {
	const [categories, setCategories] = useState([]);
	const [categoriesDisplay, setCategoriesDisplay] = useState([]);
	const [categoriesLoading, setCategoriesLoading] = useState(true);
	const [isAddPopUpOpen, setIsAddPopUpOpen] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState(null);

	const [isEditCategoryOpen, setEditCategoryOpen] = useState(false);
	const [activeActionContainer, setActiveActionContainer] = useState(-1);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const [clickedName, setClickedName] = useState(null);
	const [showDeactivate, setShowDeactivate] = useState(false);
	const [selectedCategoriesId, setSelectedCategoriesId] = useState(null);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = currentPage * itemsPerPage;
	const paginatedCategories = categoriesDisplay.slice(startIndex, endIndex);

	useEffect(() => {
		fetchCategories();
	}, [currentPage]);

	const fetchCategories = () => {
		getProductCategories().then((res) => {
			console.log(res);
			res.categories ? setCategories(res.categories) : setCategories([]);
			res.categories ? setCategoriesDisplay(res.categories) : setCategoriesDisplay([]);
			setCategoriesLoading(false);
		});
	};

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const openEditPopUp = (category_id) => {
		setEditCategoryOpen(true);
	};

	const closeEditPopUp = () => {
		setEditCategoryOpen(false);
	};

	const deleteCategoryFunc = async (category_id) => {
		const res = await deleteCategory(category_id);

		if (!res) return;

		//check if response is successful

		if (res.status == "Success") {
			fetchCategories();
			toast.success(res.message);
		} else {
			toast.warning(res.message);
		}
	};

	const [selectedProductId, setSelectedProductId] = useState(null);
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
			<PageTitle title="Category List" />

			<StyledPanel>
				<CategoriesSearchBar
					setIsAddPopUpOpen={setIsAddPopUpOpen}
					setCategoriesDisplay={setCategoriesDisplay}
					categories={categories}
					hasAddPermission={hasAddPermission}
				/>
				<TableContainer>
					<Table id="categories-table">
						<tbody>
							<TableRows $heading>
								<TableHeadings>Name</TableHeadings>
								<TableHeadings>Status</TableHeadings>
								<TableHeadings>Actions</TableHeadings>
							</TableRows>

							{categories.length === 0 ? (
								categoriesLoading ? (
									Array.from({ length: 8 }, (_, index) => (
										<TableRows key={index}>
											<TableData className="imgContainer">
												<Skeleton circle={true} height={40} width={40} />
											</TableData>

											<TableData>
												<Skeleton width={50} height={20} />
											</TableData>
											<TableData>
												<Skeleton width={50} height={20} />
											</TableData>
										</TableRows>
									))
								) : (
									<p>No Categories found</p>
								)
							) : (
								paginatedCategories.map((category, index) => (
									<TableRows key={category.category_id}>
										<TableData>{category.name}</TableData>

										<TableData>{category.isActive ? "Active" : "Not active"}</TableData>

										<TableData>
											<FontAwesomeIcon
												className="ellipsis"
												icon={faEllipsis}
												onClick={() => (activeActionContainer === index ? setActiveActionContainer(-1) : setActiveActionContainer(index))}
											/>

											{activeActionContainer === index && (
												<ActionContainer onClick={() => setActiveActionContainer(-1)}>
													{category.name !== "Uncategorized" && (
														<p
															onClick={() => {
																setSelectedCategory(category);
																openEditPopUp(true);
															}}
														>
															<FontAwesomeIcon icon={faPen} />
															Edit
														</p>
													)}

													{category.name !== "Uncategorized" && (
														<p
															onClick={() => {
																//GAWIN MO TO
																setShowDeactivate(true);
																setClickedName(category.name);
																setSelectedCategoriesId(category.category_id);
															}}
														>
															<FontAwesomeIcon icon={faTrash} /> Delete
														</p>
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

				<PdfExporter tableId="categories-table" fileName="categories.pdf" />
				<Pagination
					totalItems={categoriesDisplay.length} // Total number of items
					itemsPerPage={itemsPerPage}
					currentPage={currentPage}
					onPageChange={setCurrentPage}
					itemsPerPageOptions={[5, 10, 15, 20]}
					defaultItemsPerPage={10}
					setItemsPerPage={setItemsPerPage}
				/>
			</StyledPanel>
			{isAddPopUpOpen && <AddCategories setIsAddPopUpOpen={setIsAddPopUpOpen} fetchCategories={fetchCategories} />}
			{isEditCategoryOpen && (
				<EditCategory
					onClose={closeEditPopUp}
					setEditCategoryOpen={setEditCategoryOpen}
					selectedCategory={selectedCategory}
					fetchCategories={fetchCategories}
				/>
			)}

			{showDeactivate && <DeleteModal type="Category" text={clickedName} close={setShowDeactivate} confirm={() => deleteCategoryFunc(selectedCategoriesId)} />}
		</DashboardLayout>
	);
};

export default Categories;

import cookie, { parse } from "cookie";
export async function getServerSideProps(context) {
	const { req } = context;
	const parsedCookies = cookie.parse(req.headers.cookie || "").permissions;

	if (!parsedCookies.includes("View Categories:categories")) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {
			hasAddPermission: parsedCookies.includes("Add Categories:categories"),
			hasEditPermission: parsedCookies.includes("Edit Categories:categories"),
			hasDeletePermission: parsedCookies.includes("Delete Categories:categories"),
		}, // will be passed to the page component as props
	};
}
