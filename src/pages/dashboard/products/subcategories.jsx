import TopBar from "@/components/misc/topbar";
import DashboardLayout from "@/components/misc/dashboardLayout";
import PdfExporter from "@/components/misc/pdfExporter";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faEllipsis, faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";
import PageTitle from "@/components/misc/pageTitle";
import StyledPanel from "@/styled-components/StyledPanel";
import { useEffect, useState } from "react";
import { addProduct, deleteSubCategory, getProductTemplates, getProducts, getSubCategories } from "@/api/products";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// import Button from "@/components/misc/button";
import Table, { ActionContainer, TableData, TableHeadings, TableRows, Status, TableContainer } from "@/styled-components/TableComponent";
import { Button } from "@/styled-components/ItemActionModal";

import SearchBarComponent from "@/components/product/subcategory/searchBarAndFilter";
// import AddSubCategory from "@/components/product/subcategory/addSubcategory";
import EditSubCategory from "@/components/product/subcategory/editSubCategory";
import AddSubCategory from "@/components/product/subcategory/addSubcategory";
import Pagination from "@/components/misc/pagination";
import { toast } from "react-toastify";
import DeleteModal from "@/components/misc/delete";

// import SearchBarComponent from "@/components/product/product-template/searchBarAndFilters";

const ProductTemplates = () => {
	const [isAddSubCatOpen, setisAddSubCatOpen] = useState(false);
	const [isEditSubCatOpen, setEditSubCatOpen] = useState(false);
	const [activeActionContainer, setActiveActionContainer] = useState(-1);

	const [subCategories, setSubCategories] = useState([]);
	const [subCategoriesLoading, setSubCategoriesLoading] = useState(true);
	const [subcategoryDisplay, setSubcategoryDisplay] = useState([]);

	const [clickedName, setClickedName] = useState(null);
	const [showDeactivate, setShowDeactivate] = useState(false);
	const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);

	const router = useRouter();

	useEffect(() => {
		fetchProductSubcategories();
	}, []);

	const fetchProductSubcategories = async () => {
		const res = await getSubCategories();

		if (!res) {
			setSubcategoryDisplay([]);
			setSubCategoriesLoading(false);
			return;
		}

		res.subcategories ? setSubcategoryDisplay(res.subcategories) : setSubcategoryDisplay([]);
		res.subcategories ? setSubCategories(res.subcategories) : setSubCategories([]);
		setSubCategoriesLoading(false);
	};

	const handleClickOutside = (event) => {
		if (!event.target.closest(".action-container") && !event.target.closest(".ellipsis")) {
			setActiveActionContainer(null);
		}
	};

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = currentPage * itemsPerPage;
	const paginatedSubcategories = subcategoryDisplay.slice(startIndex, endIndex);
	const [selectedTemplateId, setSelectedTempalateId] = useState(null);
	const [selectedSubCat, setSelectedSubCat] = useState(null);

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	const deleteSubCategoryFunc = async (subcategory_id) => {
		const response = await deleteSubCategory(subcategory_id);

		if (!response) return;

		toast.success(response.message);
		fetchProductSubcategories();
	};

	return (
		<DashboardLayout>
			<PageTitle title="Subcategories" />

			<StyledPanel>
				<SearchBarComponent setisAddSubCatOpen={setisAddSubCatOpen} subCategories={subCategories} setSubcategoryDisplay={setSubcategoryDisplay} />

				<TableContainer>
					<Table id="subcategories-table">
						<tbody>
							<TableRows $heading>
								<TableHeadings>Name</TableHeadings>
								<TableHeadings>Attributes</TableHeadings>
								<TableHeadings>Actions</TableHeadings>
							</TableRows>

							{subCategories.length === 0 ? (
								subCategoriesLoading ? (
									Array.from({ length: 8 }, (_, index) => (
										<TableRows key={index}>
											<TableData className="imgContainer">
												<Skeleton circle={true} height={40} width={40} />
												{/* <Skeleton width={100} height={20} /> */}
											</TableData>
											<TableData>
												<Skeleton width={50} height={20} />
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
									<p>No Subcategories found</p>
								)
							) : (
								paginatedSubcategories.map((subcategory, index) => (
									<TableRows key={subcategory.subcategory_id}>
										<TableData>{subcategory.subcategory_name}</TableData>
										<TableData>{subcategory.attributes.length}</TableData>
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
															setSelectedSubCat(subcategory);
															setEditSubCatOpen(true);
														}}
													>
														<FontAwesomeIcon icon={faPen} />
														Edit
													</p>
													<p
														onClick={() => {
															//GAWIN MO TO
															setShowDeactivate(true);
															setClickedName(subcategory.subcategory_name);
															setSelectedSubCategoryId(subcategory.subcategory_id);
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
				</TableContainer>

				<PdfExporter tableId="subcategories-table" fileName="subcategories.pdf" />
				<Pagination
					totalItems={subcategoryDisplay.length} // Total number of items
					itemsPerPage={itemsPerPage}
					currentPage={currentPage}
					onPageChange={setCurrentPage}
					itemsPerPageOptions={[5, 10, 15, 20]}
					defaultItemsPerPage={10}
					setItemsPerPage={setItemsPerPage}
				/>
			</StyledPanel>
			{/* {isPopupOpen && (
        <AddSubCategory
          onClose={handleClosePopup}
          
          fetchProductSubcategories={fetchProductSubcategories}
        />
      )} */}
			{isAddSubCatOpen && <AddSubCategory setisAddSubCatOpen={setisAddSubCatOpen} fetchProductSubcategories={fetchProductSubcategories} />}

			{isEditSubCatOpen && (
				<EditSubCategory setEditSubCatOpen={setEditSubCatOpen} selectedSubCat={selectedSubCat} fetchSubCategories={fetchProductSubcategories} />
			)}

			{showDeactivate && (
				<DeleteModal type="subcategories" text={clickedName} close={setShowDeactivate} confirm={() => deleteSubCategoryFunc(selectedSubCategoryId)} />
			)}
		</DashboardLayout>
	);
};

export default ProductTemplates;
