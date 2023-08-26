const { default: DashboardLayout } = require("@/components/dashboardLayout");
import { addCategory, getCategories } from "@/api/products";
import Button from "@/components/button";
import Table, { ActionContainer, Status, TableData, TableHeadings, TableRows } from "@/components/styled-components/TableComponent";
import { useEffect, useState } from "react";
const { default: PageTitle } = require("@/components/pageTitle");
const { default: StyledPanel } = require("@/components/styled-components/StyledPanel");
const { default: TableControlPanel } = require("@/components/styled-components/TableControlPanel");
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faEllipsis } from "@fortawesome/free-solid-svg-icons";

const ProductCategories = () => {
	const [categories, setCategories] = useState([]);
	const [categoriesLoading, setCategoriesLoading] = useState(true);
	const [activeActionContainer, setActiveActionContainer] = useState(-1);

	useEffect(() => {
		getCategoryFunction();
	}, []);

	const addCategoryfunc = () => {
		addCategory({
			name: "Category 2",
			number_of_products: 0,
			isActive: true,
		}).then((res) => {
			console.log(res);
			getCategoryFunction();
		});
	};

	const getCategoryFunction = () => {
		getCategories().then((res) => {
			console.log(res);
			res ? setCategories(res.categories) : setCategories([]);
			setCategoriesLoading(true);
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

	return (
		<DashboardLayout>
			<PageTitle title="Product Categories" />
			<Button onClick={addCategoryfunc}>Add Category</Button>
			<StyledPanel>
				<TableControlPanel>
					<div className="searchBar">
						<p>Search for Product</p>
						<input type="text" placeholder="Search" />
					</div>
				</TableControlPanel>

				<Table>
					<tbody>
						<TableRows heading>
							<TableHeadings>Name</TableHeadings>
							<TableHeadings>Number of Products</TableHeadings>
							<TableHeadings>Created at </TableHeadings>
							<TableHeadings>Actions</TableHeadings>
						</TableRows>

						{categories.length === 0 ? (
							categoriesLoading ? (
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
										<TableData>
											<Skeleton width={50} height={20} />
										</TableData>
									</TableRows>
								))
							) : (
								<Button onClick={() => router.push("/dashboard/products/add")}>Add Product</Button>
							)
						) : (
							categories.map((category, index) => (
								<TableRows key={category.product_id}>
									<TableData bold>{category.name}</TableData>
									<TableData>{category.number_of_products}</TableData>
									<TableData>{category.quantity_in_stock}</TableData>

									<TableData>
										<FontAwesomeIcon
											className="ellipsis"
											icon={faEllipsis}
											onClick={() => (activeActionContainer === index ? setActiveActionContainer(-1) : setActiveActionContainer(index))}
										/>

										{activeActionContainer === index && (
											<ActionContainer onClick={() => setActiveActionContainer(-1)}>
												<p>
													{" "}
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
		</DashboardLayout>
	);
};

export default ProductCategories;
