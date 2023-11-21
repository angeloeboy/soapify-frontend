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
import Table, { ActionContainer, TableData, TableHeadings, TableRows, Status } from "@/styled-components/TableComponent";
import { Button } from "@/styled-components/ItemActionModal";

import CategoriesSearchBar from "@/components/product/categories/categoriesSearchBar";
import AddCategories from "./../../../components/product/categories/addCategories";
import EditCategory from "@/components/product/categories/editCategory";
import Pagination from "@/components/misc/pagination";
import DeleteModal from "@/components/misc/delete"; 
import { toast } from "react-toastify";


const Categories = () => {
	const [categories, setCategories] = useState([]);
	const [categoriesDisplay, setCategoriesDisplay] = useState([]);
	const [categoriesLoading, setCategoriesLoading] = useState(true);
	const [isAddPopUpOpen, setIsAddPopUpOpen] = useState(false);
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
	const [selectedCategory, setSelectedCategory] = useState(null);

	return (
		<DashboardLayout>
			<PageTitle title="Category List" />

			<StyledPanel>
				<CategoriesSearchBar setIsAddPopUpOpen={setIsAddPopUpOpen} setCategoriesDisplay={setCategoriesDisplay} categories={categories} />

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
												<p
													onClick={() => {
														setSelectedCategory();
														openEditPopUp(selectedCategory);
													}}
												>
													<FontAwesomeIcon icon={faPen} />
													Edit
												</p>
												<p  
												
												onClick={() =>{
 													setShowDeactivate(true);
													setClickedName(category.name);
													setSelectedCategoriesId(category.category_id); 
					  
												  }}
												
												>
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
			{isEditCategoryOpen && <EditCategory onClose={closeEditPopUp} setEditCategoryOpen={setEditCategoryOpen} />}

		{showDeactivate && (
        <DeleteModal
          type="Category"
          text={clickedName}
          close={setShowDeactivate}
          confirm={() => deleteCategoryFunc(selectedCategoriesId)}

        />
      )}											


		</DashboardLayout>
	);
};

export default Categories;
