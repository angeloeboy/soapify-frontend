import TopBar from "@/components/misc/topbar";
import DashboardLayout from "@/components/misc/dashboardLayout";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faEllipsis, faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";
import PageTitle from "@/components/misc/pageTitle";
import TableControlPanel from "@/styled-components/TableControlPanel";
import StyledPanel from "@/styled-components/StyledPanel";
import { useEffect, useState } from "react";
import { addProduct, getProducts } from "@/api/products";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// import Button from "@/components/misc/button";
import Table, { ActionContainer, TableData, TableHeadings, TableRows, Status } from "@/styled-components/TableComponent";
import { ButtonAddAccountType, ButtonAddStatus, ButtonAddProduct } from "@/styled-components/ItemActionModal";
import { Button } from "@/styled-components/ItemActionModal";

import AddProductComponent from "@/components/product/addProduct";

const Products = () => {
	const [products, setProducts] = useState([]);
	const [productsLoading, setProductsLoading] = useState(true);
	const [isPopupOpen, setPopupOpen] = useState(false);
	const [activeActionContainer, setActiveActionContainer] = useState(-1);

	const router = useRouter();

	useEffect(() => {
		GetProducts();
	}, []);

	const GetProducts = () => {
		getProducts().then((res) => {
			console.log(res);
			res.products ? setProducts(res.products) : setProducts([]);
			setProductsLoading(false);
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

	const handleOpenPopup = () => {
		setPopupOpen(true);
	};

	const handleClosePopup = () => {
		setPopupOpen(false);
	};

	const onButtonClick = () => {
		fileInput.current.click();
	};

	return (
		<DashboardLayout>
			<form onSubmit={(e) => AddProduct(e)} enctype="multipart/form-data">
				<input type="file" name="product_image" required />
				<button type="submit">Upload</button>
			</form>

			<PageTitle title="Products List" />

			<StyledPanel>
				<TableControlPanel>
				<div className="searchBar" style={{ display: "flex", alignItems: "center" }}>
  <div>
    <p style={{ marginBottom: "0", alignSelf: "flex-start" }}>Search for Product</p>
    <input type="text" placeholder="Search" />
  </div>
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginLeft: "16px" }}>
    <p style={{ marginBottom: "0", textAlign: "center", alignSelf: "center" }}>Account Type</p>
    <ButtonAddAccountType>
      <FontAwesomeIcon icon={faFilter} />
      All
    </ButtonAddAccountType>
  </div>
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginLeft: "11px" }}>
    <p style={{ marginBottom: "0", textAlign: "center", alignSelf: "center" }}>Status</p>
    <ButtonAddStatus>
      <FontAwesomeIcon icon={faFilter} />
      All
    </ButtonAddStatus>
  </div>
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <p style={{ marginBottom: "0", textAlign: "center" }}>Add Product</p>
    <ButtonAddProduct onClick={handleOpenPopup}>
      + Add Product
    </ButtonAddProduct>
  </div>
</div>



				</TableControlPanel>
				<Table>
					<tbody>
						<TableRows heading>
							<TableHeadings>Name</TableHeadings>
							<TableHeadings>ID</TableHeadings>
							<TableHeadings>Stock</TableHeadings>
							<TableHeadings>Price</TableHeadings>
							<TableHeadings>Status</TableHeadings>
							<TableHeadings>Actions</TableHeadings>
						</TableRows>

						{products.length === 0 ? (
							productsLoading ? (
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
										<TableData>
											<Skeleton width={50} height={20} />
										</TableData>
									</TableRows>
								))
							) : (
								<Button onClick={() => router.push("/dashboard/products/add")}>Add Product</Button>
							)
						) : (
							products.map((product, index) => (
								<TableRows key={product.product_id}>
									<TableData bold withImage>
										<Image src="/sabon.png" alt="My Image" width="40" height="40" /> {product.product_name}
									</TableData>
									<TableData>{product.product_id}</TableData>
									<TableData>{product.quantity_in_stock}</TableData>
									<TableData>{product.product_price / 100}</TableData>
									<TableData>
										<Status bgColor={"rgba(255, 116, 116, 0.49)"} color={"#EA0000"}>
											LOW
										</Status>
									</TableData>
									<TableData>
										<FontAwesomeIcon
											className="ellipsis"
											icon={faEllipsis}
											onClick={() => (activeActionContainer === index ? setActiveActionContainer(-1) : setActiveActionContainer(index))}
										/>

										{activeActionContainer === index && (
											<ActionContainer onClick={() => setActiveActionContainer(-1)}>
												<p>
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
			{isPopupOpen && <AddProductComponent onClose={handleClosePopup} onButtonClick={onButtonClick} GetProducts={GetProducts} />}
		</DashboardLayout>
	);
};

export default Products;
