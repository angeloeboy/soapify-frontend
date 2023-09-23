import TopBar from "@/components/misc/topbar";
import DashboardLayout from "@/components/misc/dashboardLayout";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faEllipsis, faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";
import PageTitle from "@/components/misc/pageTitle";
import TableControlPanel from "@/styled-components/TableControlPanel";
import StyledPanel from "@/styled-components/StyledPanel";
import { useEffect, useState } from "react";
import { addProduct, getProductTemplates, getProducts, getSubCategories } from "@/api/products";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// import Button from "@/components/misc/button";
import Table, { ActionContainer, TableData, TableHeadings, TableRows, Status } from "@/styled-components/TableComponent";
import { ButtonAddAccountType, ButtonAddStatus, ButtonAddProduct } from "@/styled-components/ItemActionModal";
import { Button } from "@/styled-components/ItemActionModal";

import AddProductComponent from "@/components/product/addProduct";
import EditProductComponent from "@/components/product/editProduct";
import SearchBarComponent from "@/components/product/subcategory/searchBarAndFilter";
import AddTemplateComponent from "@/components/product/subcategory/addTemplate";

// import SearchBarComponent from "@/components/product/product-template/searchBarAndFilters";

const ProductTemplates = () => {
	const [isPopupOpen, setPopupOpen] = useState(false);
	const [isEditPopupOpen, setEditPopUpOpen] = useState(false);
	const [activeActionContainer, setActiveActionContainer] = useState(-1);

	const [templates, setTemplates] = useState([]);
	const [templatesDisplay, setTemplatesDisplay] = useState([]);
	const [templatesLoading, setTemplatesLoading] = useState(true);

	const [subCategories, setSubCategories] = useState([]);
	const [subCategoriesLoading, setSubCategoriesLoading] = useState(true);
	const [subcategoryDisplay, setSubcategoryDisplay] = useState([]);

	const router = useRouter();

	useEffect(() => {
		fetchProductTemplates();
		fetchProductSubcategories();
	}, []);

	const fetchProductTemplates = async () => {
		const res = await getProductTemplates();
		res.templates ? setTemplatesDisplay(res.templates) : setTemplatesDisplay([]);
		res.templates ? setTemplates(res.templates) : setTemplates([]);
		console.log(res.templates);
		setTemplatesLoading(false);
	};

	const fetchProductSubcategories = async () => {
		const res = await getSubCategories();
		res.subcategories ? setSubcategoryDisplay(res.subcategories) : setSubcategoryDisplay([]);
		res.subcategories ? setSubCategories(res.subcategories) : setSubCategories([]);
		console.log(res.subcategories);
		setSubCategoriesLoading(false);
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

	const [selectedTemplateId, setSelectedTempalateId] = useState(null);

	return (
		<DashboardLayout>
			<PageTitle title="Product Templates" />

			<StyledPanel>
				<SearchBarComponent setPopupOpen={setPopupOpen} subCategories={subCategories} setSubcategoryDisplay={setSubcategoryDisplay} />
				<Table>
					<tbody>
						<TableRows heading>
							<TableHeadings>ID</TableHeadings>
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
								<Button onClick={() => router.push("/dashboard/products/add")}>No Templates</Button>
							)
						) : (
							subcategoryDisplay.map((subcategory, index) => (
								<TableRows key={subcategory.subcategory_id}>
									<TableData>{subcategory.subcategory_id}</TableData>
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
														setSelectedTempalateId(product.product_id);
														openEditPopUp(selectedTemplateId);
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
			{isPopupOpen && <AddTemplateComponent onClose={handleClosePopup} onButtonClick={onButtonClick} fetchProductTemplates={fetchProductTemplates} />}
			{isEditPopupOpen && <EditProductComponent onClose={handleCloseEditPopUp} productId={selectedProductId} fetchProducts={fetchProducts} />}
		</DashboardLayout>
	);
};

export default ProductTemplates;
