import DashboardLayout from "@/components/misc/dashboardLayout";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faEllipsis, faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";
import PageTitle from "@/components/misc/pageTitle";
import StyledPanel from "@/styled-components/StyledPanel";
import { useEffect, useState } from "react";
import { deactivateProduct, getProducts, activateProduct } from "@/api/products";
import "react-loading-skeleton/dist/skeleton.css";
// import Button from "@/components/misc/button";
import Table, { ActionContainer, TableData, TableHeadings, TableRows, Status } from "@/styled-components/TableComponent";

import AddProduct from "@/components/product/addProduct";
import EditProduct from "@/components/product/editProduct";

import ProductSearchBar from "@/components/product/productSearchBar";
import LoadingSkeleton from "@/components/misc/loadingSkeleton";
import Pagination from "@/components/misc/pagination";
import "react-toastify/dist/ReactToastify.css";

import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Products = () => {
	const [products, setProducts] = useState([]);
	const [productDisplay, setProductDisplay] = useState([]);
	const [productsLoading, setProductsLoading] = useState(true);

	const [isAddPopUpOpen, setIsAddPopUpOpen] = useState(false);
	const [isEditPopupOpen, setEditPopUpOpen] = useState(false);
	const [activeActionContainer, setActiveActionContainer] = useState(-1);

	const [selectedProductId, setSelectedProductId] = useState(null);

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = currentPage * itemsPerPage;
	const paginatedProducts = productDisplay.slice(startIndex, endIndex);

	const router = useRouter();
	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = () => {
		getProducts().then((res) => {
			if (res.products) {
				let products = res.products;

				products.map((product) => {
					//check product status and add to product object
					if (product.quantity_in_stock <= product.minimum_reorder_level) {
						product.status = "Low";
					}
					if (product.quantity_in_stock > product.minimum_reorder_level && product.quantity_in_stock < 2 * product.minimum_reorder_level) {
						product.status = "Moderate";
					}
					if (product.quantity_in_stock >= 2 * product.minimum_reorder_level) {
						product.status = "High";
					}
				});
				console.log(products);
				setProducts(products);
				setProductDisplay(products);
			} else {
				setProducts([]);
			}
			setProductsLoading(false);
		});
	};

	const deactivateProductFunc = async (product_id) => {
		const res = await deactivateProduct(product_id);

		if (!res) {
			return;
		}
		toast.success("Product successfully deactivated");
		fetchProducts();
	};

	const activateProductFunc = async (product_id) => {
		const res = await activateProduct(product_id);

		if (!res) {
			return;
		}

		toast.success("Product sucessfuly activated");
		fetchProducts();
	};

	const handleAddInventoryClick = (productId) => {
		router.push({
			pathname: "/dashboard/inventory",
			query: { productId, openModal: "true" },
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

	return (
		<DashboardLayout>
			<PageTitle title="Products List" />

			<StyledPanel>
				<ProductSearchBar setIsAddPopUpOpen={setIsAddPopUpOpen} setProductDisplay={setProductDisplay} products={products} setCurrentPage={setCurrentPage} />
				<Table>
					<tbody>
						<TableRows $heading>
							<TableHeadings>Product ID</TableHeadings>

							<TableHeadings>Name</TableHeadings>
							{/* <TableHeadings>Attributes</TableHeadings> */}
							<TableHeadings>Stock</TableHeadings>
							<TableHeadings>Price</TableHeadings>
							<TableHeadings>Stock Status</TableHeadings>
							<TableHeadings>Actions</TableHeadings>
						</TableRows>

						{products.length === 0 ? (
							productsLoading ? (
								<LoadingSkeleton columns={6} />
							) : (
								<p>No Products found</p>
							)
						) : (
							paginatedProducts.map((product, index) => (
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
									{/* <TableData>
										<div className="attr_container">
											{product.attribute.map((attr, index) => {
												return <span key={index}> {attr.value}</span>;
											})}
										</div>
									</TableData> */}
									<TableData>{product.quantity_in_stock}</TableData>
									<TableData>{product.product_price / 100}</TableData>
									<TableData>
										{product.status === "Low" && (
											<Status $bgColor={"rgba(255, 116, 116, 0.49)"} color={"#EA0000"}>
												{product.status}
											</Status>
										)}

										{product.status === "Moderate" && (
											<Status $bgColor={"rgba(255, 246, 116, 0.49)"} color={"#312600"}>
												{product.status}
											</Status>
										)}

										{product.status === "High" && (
											<Status $bgColor={"rgba(179, 255, 116, 0.49)"} color={"#56ea00"}>
												{product.status}
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
												<p onClick={() => activateProductFunc(product.product_id)}>Reactivate</p>
												<p onClick={() => deactivateProductFunc(product.product_id)}>Deactivate</p>
												{/* <p onClick={() => handleAddInventoryClick(product.product_id)}>Add Inventory</p> */}
											</ActionContainer>
										)}
									</TableData>
								</TableRows>
							))
						)}
					</tbody>
				</Table>

				<Pagination
					totalItems={productDisplay.length}
					itemsPerPage={itemsPerPage}
					currentPage={currentPage}
					onPageChange={(newPage) => setCurrentPage(newPage)}
				/>
			</StyledPanel>

			{isAddPopUpOpen && <AddProduct setIsAddPopUpOpen={setIsAddPopUpOpen} GetProducts={fetchProducts} />}
			{isEditPopupOpen && <EditProduct onClose={handleCloseEditPopUp} productId={selectedProductId} fetchProducts={fetchProducts} />}
		</DashboardLayout>
	);
};

export default Products;
