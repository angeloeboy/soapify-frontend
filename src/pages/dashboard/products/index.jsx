import TopBar from "@/components/topbar";
import DashboardLayout from "@/components/dashboardLayout";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import PageTitle from "@/components/pageTitle";
import TableControlPanel from "@/components/styled-components/TableControlPanel";
import StyledPanel from "@/components/styled-components/StyledPanel";
import { useEffect, useState } from "react";
import { addProduct, getProducts } from "@/api/products";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// import Button from "@/components/button";
import Table, { ActionContainer, TableData, TableHeadings, TableRows, Status } from "@/components/styled-components/TableComponent";

import {
	Button,
	Select,
	LabelContainer,
	Label,
	Option,
	FieldContainer,
	ProfilePictureContainer,
	FileInput,
	Centered,
	SecondaryButton,
	CloseButton,
	ButtonsContainer,
	PopupOverlay,
	PopupContent,
	HeaderTitle,
	FieldTitleLabel,
	InputHolder,
} from "@/components/styled-components/ItemActionModal";
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
			res ? setProducts(res.products) : setProducts([]);
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

	let AddProduct = (e) => {
		e.preventDefault();

		let product = {
			product_name: "test",
			product_desc: "test",
			product_price: 10000,
			category_id: 23,
			supplier_id: 2,
			quantity_in_stock: 0,
		};

		const formData = new FormData();
		formData.append("product_image", e.target.elements.product_image.files[0]);

		// Append each property in the product object to formData
		for (let key in product) {
			formData.append(key, product[key]);
		}

		for (let pair of formData.entries()) {
			console.log(pair[0] + ", " + pair[1]);
		}

		addProduct(formData).then((res) => {
			console.log(res);
		});
	};

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

			<PageTitle title="Products" />

			<StyledPanel>
				<TableControlPanel>
					<div className="searchBar">
						<p>Search for Product</p>
						<input type="text" placeholder="Search" />

						<Button onClick={handleOpenPopup}>Add Products</Button>
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
										<Image src="/product_img.png" alt="My Image" width="40" height="40" /> {product.product_name}
									</TableData>
									<TableData>{product.product_id}</TableData>
									<TableData>{product.quantity_in_stock}</TableData>
									<TableData>{product.product_price}</TableData>
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
			{isPopupOpen && <AddProductComponent onClose={handleClosePopup} onButtonClick={onButtonClick} GetProducts={GetProducts} />}
		</DashboardLayout>
	);
};

export default Products;
