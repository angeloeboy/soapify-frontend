import DashboardLayout from "@/components/misc/dashboardLayout";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faEllipsis, faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";
import PageTitle from "@/components/misc/pageTitle";
import StyledPanel from "@/styled-components/StyledPanel";
import { useEffect, useState } from "react";
import { getProducts } from "@/api/products";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// import Button from "@/components/misc/button";
import Table, { ActionContainer, TableData, TableHeadings, TableRows, Status } from "@/styled-components/TableComponent";
import { PaginationControl } from "@/styled-components/ItemActionModal";

import AddProductComponent from "@/components/product/addProduct";
import EditProductComponent from "@/components/product/editProduct";

import SearchBarComponent from "@/components/product/searchBarAndFilters";
import LoadingSkeleton from "@/components/misc/loadingSkeleton";
import Pagination from "@/components/misc/pagination";

const Products = () => {
	const [products, setProducts] = useState([]);
	const [productDisplay, setProductDisplay] = useState([]);
	const [productsLoading, setProductsLoading] = useState(true);

	const [isAddPopUpOpen, setIsAddPopUpOpen] = useState(false);
	const [isEditPopupOpen, setEditPopUpOpen] = useState(false);
	const [activeActionContainer, setActiveActionContainer] = useState(-1);

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	const [filteredProducts, setFilteredProducts] = useState([]);

	useEffect(() => {
		fetchProducts();
	}, []);

	useEffect(() => {
		setProductDisplay(filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
	}, [currentPage, filteredProducts]);

	const fetchProducts = () => {
		getProducts().then((res) => {
			if (res.products) {
				setProducts(res.products);
				console.log(res.products);
			} else {
				setProducts([]);
			}
			setProductsLoading(false);
			setFilteredProducts(res.products || []);
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

	const handleCloseEditPopUp = () => {
		setEditPopUpOpen(false);
	};
	const openEditPopUp = (product_id) => {
		setEditPopUpOpen(true);
	};

	const onButtonClick = () => {
		fileInput.current.click();
	};

	const checkStockStatus = (product) => {
		let status = "";

		if (product.quantity_in_stock <= product.minimum_reorder_level) {
			status = "Low";
		}
		if (product.quantity_in_stock > product.minimum_reorder_level && product.quantity_in_stock < 2 * product.minimum_reorder_level) {
			status = "Moderate";
		}
		if (product.quantity_in_stock >= 2 * product.minimum_reorder_level) {
			status = "High";
		}

		return status;
	};

	const [selectedProductId, setSelectedProductId] = useState(null);

	return (
		<DashboardLayout>
			<PageTitle title="Products List" />

			<StyledPanel>
				<SearchBarComponent
					setIsAddPopUpOpen={setIsAddPopUpOpen}
					setProductDisplay={setProductDisplay}
					products={products}
					setFilteredProducts={setFilteredProducts}
					setCurrentPage={setCurrentPage}
				/>
				<Table>
					<tbody>
						<TableRows $heading>
							<TableHeadings>Product ID</TableHeadings>

							<TableHeadings>Name</TableHeadings>
							<TableHeadings>Attributes</TableHeadings>
							<TableHeadings>Stock</TableHeadings>
							<TableHeadings>Price</TableHeadings>
							<TableHeadings>Stock Status</TableHeadings>
							<TableHeadings>Actions</TableHeadings>
						</TableRows>

						{products.length === 0 ? (
							productsLoading ? (
								<LoadingSkeleton columns={5} />
							) : (
								<p>No Products found</p>
							)
						) : (
							productDisplay.map((product, index) => (
								<TableRows key={product.product_id}>
									<TableData $bold $withImage>
										<Image
											src={product.image_link == "testimage" ? "/sabon.png" : "/api/" + product.image_link.replace(/\\/g, "/")}
											alt="My Image"
											width="40"
											height="40"
										/>
										{product.product_code}
									</TableData>
									<TableData>{product.product_name}</TableData>
									<TableData>
										<div className="attr_container">
											{product.attribute.map((attr, index) => {
												return <span key={index}> {attr.value}</span>;
											})}
										</div>
									</TableData>
									<TableData>{product.quantity_in_stock}</TableData>
									<TableData>{product.product_price / 100}</TableData>
									<TableData>
										{checkStockStatus(product) === "Low" && (
											<Status $bgColor={"rgba(255, 116, 116, 0.49)"} color={"#EA0000"}>
												{checkStockStatus(product)}
											</Status>
										)}

										{checkStockStatus(product) === "Moderate" && (
											<Status $bgColor={"rgba(255, 246, 116, 0.49)"} color={"#312600"}>
												{checkStockStatus(product)}
											</Status>
										)}

										{checkStockStatus(product) === "High" && (
											<Status $bgColor={"rgba(179, 255, 116, 0.49)"} color={"#56ea00"}>
												{checkStockStatus(product)}
											</Status>
										)}
									</TableData>
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

				<Pagination
					totalItems={filteredProducts.length}
					itemsPerPage={itemsPerPage}
					currentPage={currentPage}
					onPageChange={(newPage) => setCurrentPage(newPage)}
				/>
			</StyledPanel>

			{isAddPopUpOpen && <AddProductComponent setIsAddPopUpOpen={setIsAddPopUpOpen} onButtonClick={onButtonClick} GetProducts={fetchProducts} />}
			{isEditPopupOpen && <EditProductComponent onClose={handleCloseEditPopUp} productId={selectedProductId} fetchProducts={fetchProducts} />}
		</DashboardLayout>
	);
};

export default Products;
