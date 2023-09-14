import TopBar from "@/components/misc/topbar";
import DashboardLayout from "@/components/misc/dashboardLayout";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faEllipsis, faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";
import PageTitle from "@/components/misc/pageTitle";
import TableControlPanel from "@/styled-components/TableControlPanel";
import StyledPanel from "@/styled-components/StyledPanel";
import { useEffect, useState } from "react";
import { addProduct, getProductCategories, getProducts } from "@/api/products";

import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// import Button from "@/components/misc/button";
import Table, { ActionContainer, TableData, TableHeadings, TableRows, Status } from "@/styled-components/TableComponent";
import { ButtonAddAccountType, ButtonAddStatus, ButtonAddProduct } from "@/styled-components/ItemActionModal";
import { Button } from "@/styled-components/ItemActionModal";

import AddProductComponent from "@/components/product/addProduct";
import EditProductComponent from "@/components/product/editProduct";

import SearchBarComponent from "@/components/product/categories/searchBarAndFilters";
import AddCategoriesComponent from "./../../../components/product/categories/addCategories";

const Categories = () => {
	const [categories, setCategories] = useState([]);
	const [categoriesDisplay, setCategoriesDisplay] = useState([]);
	const [categoriesLoading, setCategoriesLoading] = useState(true);
	const [isPopupOpen, setPopupOpen] = useState(false);
	const [isEditPopupOpen, setEditPopUpOpen] = useState(false);
	const [activeActionContainer, setActiveActionContainer] = useState(-1);

	const router = useRouter();

	useEffect(() => {
		fetchCategories();
	}, []);

	const fetchCategories = () => {
		getProductCategories().then((res) => {
			console.log(res);
			res.categories ? setCategoriesDisplay(res.categories) : setCategoriesDisplay([]);
			res.categories ? setCategories(res.categories) : setCategories([]);
			setCategoriesLoading(false);
		});
	};
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

	const handleClosePopup = () => {
		setPopupOpen(false);
	};

	const handleCloseEditPopUp = () => {
		setEditPopUpOpen(false);
	};
	const openEditPopUp = (product_id) => {
		setEditPopUpOpen(true);
	};

	const onButtonClick = () => {
		fileInput.current.click();
	};

	const [selectedProductId, setSelectedProductId] = useState(null);

	return (
		<DashboardLayout>
			<PageTitle title="Category List" />

			<StyledPanel>
				<SearchBarComponent setPopupOpen={setPopupOpen} setCategoriesDisplay={setCategoriesDisplay} categories={categories} />

				<Table>
					<tbody>
						<TableRows heading>
							<TableHeadings>Name</TableHeadings>
							<TableHeadings>ID</TableHeadings>
							<TableHeadings>Products</TableHeadings>
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
										<TableData>
											<Skeleton width={50} height={20} />
										</TableData>
										<TableData>
											<Skeleton width={50} height={20} />
										</TableData>
									</TableRows>
								))
							) : (
								<Button onClick={() => router.push("/dashboard/products/add")}>Add Product</Button>
							)
						) : (
							categoriesDisplay.map((category, index) => (
								<TableRows key={category.category_id}>
									<TableData bold withImage>
										{category.name}
									</TableData>
									<TableData>{category.category_id}</TableData>
									<TableData>{category.number_of_products}</TableData>
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
														setSelectedProductId(product.product_id);
														openEditPopUp(selectedProductId);
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
							))
						)}
					</tbody>
				</Table>
			</StyledPanel>
			{isPopupOpen && <AddCategoriesComponent onClose={handleClosePopup} onButtonClick={onButtonClick} setPopupOpen={setPopupOpen} />}

			{/* {isEditPopupOpen && (
				<EditProductComponent
					onClose={handleCloseEditPopUp}
					productId={selectedProductId}
					//   onButtonClick={onButtonClick}
					//   GetProducts={fetchProducts}
				/>
			)} */}
		</DashboardLayout>
	);
};

export default Categories;
