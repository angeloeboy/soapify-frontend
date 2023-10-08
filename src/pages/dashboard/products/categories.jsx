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
import Table, { ActionContainer, TableData, TableHeadings, TableRows, Status } from "@/styled-components/TableComponent";
import { Button } from "@/styled-components/ItemActionModal";

import SearchBarComponent from "@/components/product/categories/searchBarAndFilters";
import AddCategoriesComponent from "./../../../components/product/categories/addCategories";

const Categories = () => {
	const [categories, setCategories] = useState([]);
	const [categoriesDisplay, setCategoriesDisplay] = useState([]);
	const [categoriesLoading, setCategoriesLoading] = useState(true);
	const [isAddPopUpOpen, setIsAddPopUpOpen] = useState(false);
	const [activeActionContainer, setActiveActionContainer] = useState(-1);

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




	const openEditPopUp = (product_id) => {
		setEditPopUpOpen(true);
	};



	const [selectedProductId, setSelectedProductId] = useState(null);

	return (
		<DashboardLayout>
			<PageTitle title="Category List" />

			<StyledPanel>
				<SearchBarComponent setIsAddPopUpOpen={setIsAddPopUpOpen} setCategoriesDisplay={setCategoriesDisplay} categories={categories} />

				<Table>
					<tbody>
						<TableRows heading>
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
							categoriesDisplay.map((category, index) => (
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
			{isAddPopUpOpen && (
				<AddCategoriesComponent setIsAddPopUpOpen={setIsAddPopUpOpen} fetchCategories={fetchCategories}  />
			)}


		</DashboardLayout>
	);
};

export default Categories;
