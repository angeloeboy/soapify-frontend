import styled from "styled-components";
// import { addPurchaseOrder } from "@/api/purchase-order"; // Adjust the API import based on your requirements
import ReportDiscrepancyModal from "../misc/reportDiscrepancyModal";
import ConfirmPurchaseOrderModalContainer from "../misc/confirmPurchaseOrderModal";
import { useEffect, useState } from "react";
import {
	Label,
	Button,
	LabelContainer,
	FieldContainer,
	Centered,
	CloseButton,
	ButtonsContainer,
	PopupOverlay,
	PopupContent,
	HeaderTitle,
	FieldTitleLabel,
	InputHolder,
	Select,
	Option,
} from "@/styled-components/ItemActionModal";
import { getSupplier, getSuppliers } from "@/api/supplier";
import { getProducts } from "@/api/products";
import ProductComponent from "../pos/product";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { addPurchaseOrder } from "@/api/purchaseOrder";
import { toast } from "react-toastify";

const NewButton = styled(Button)`
	border-radius: 0.5rem;
	color: white;
	font-size: 16px;
	font-weight: 500;
	line-height: 1.5rem;
	padding: 0.5rem 1rem;
	max-width: initial;
	border: 1px solid #e0e0e0;
	background-color: transparent;
	width: initial;
	color: #4f4f4f;
	padding: 10px 40px;
	margin-left: 25px;
`;

const Product = styled.div`
	display: flex;
	margin-bottom: 38px;
	flex-wrap: wrap;
	padding-left: 25px;
	img {
		background-color: white;
	}

	.productInformation {
		/* margin-left: 16px; */
		margin-top: 16px;
		.productName {
			color: #536686;
			font-size: 14px;
			font-weight: 700;
		}

		.productPrice {
			color: #005eff;
			font-size: 14px;
			font-weight: 700;
			margin-top: 16px;

			.dashed {
				text-decoration: line-through;
				color: red;
				opacity: 0.7;
			}
		}

		.wrapper {
			display: flex;
			p {
				margin-left: 12px;
			}
		}
	}

	.quantity {
		display: inline-flex;
		align-items: center;
		align-self: flex-end;
		font-size: 16px;
		margin-top: 16px;
		margin-right: auto;
		margin-left: 16px;
		p {
			padding: 0px 16px;
		}

		input {
			border: none;
			background-color: transparent;
			width: 70px;
			text-align: center;
			outline: none;
		}
		span {
			border-radius: 4px;
			background: #1a69f0;
			width: 21px;
			height: 21px;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 8px;
			font-size: 10px;
			cursor: pointer;
			svg {
				color: #ffffff;

				path {
					color: #ffffff;
				}
			}
		}
	}

	.minus {
		opacity: ${(props) => (props.active ? "1" : "0.5")};
	}

	.delete {
		align-self: center;
		cursor: pointer;
		margin-right: 16px;
		path {
			color: #bebebe !important;
		}

		&:hover {
			path {
				color: #f88181 !important;
			}
		}
	}

	.remove {
		/* width: 100%;
		margin-top: 20px;
		font-size: 14px;
		background-color: #f88181;
		border: 2px solid #eb5151;
		color: black;
		border-radius: 4px;
		padding: 4px 8px;
		display: block; */
		font-size: 14px;
		color: #ff00007d;
		text-decoration: underline;
		cursor: pointer;
		margin-top: 16px;
	}
`;

const AddPurchaseOrder = ({ setIsAddPurchaseOrderPopUpOpen, setIsAddPopUpOpen, fetchPurchaseOrders }) => {
	const [isConfirmReceivedOpen, setIsReceiveConfirmOpen] = useState(false);

	const [suppliers, setSuppliers] = useState([]);
	const [selectedSupplier, setSelectedSupplier] = useState(0);
	const [productList, setProductList] = useState([]);
	const [purchaseOrder, setPurchaseOrder] = useState({
		items: [],
	});

	const [items, setItems] = useState([]);

	useEffect(() => {
		fetchSuppliers();
	}, []);

	useEffect(() => {
		//for items get only the id and quantity

		// if (!selectedSupplier) return;
		// if (!productList.length <= 0) return;

		const newproductList = productList.map((item) => {
			return {
				product_id: item.product_id,
				quantity: item.quantity,
			};
		});

		setPurchaseOrder({
			...purchaseOrder,
			supplier_id: selectedSupplier,
			notes: "Test",
			items: newproductList,
		});
	}, [selectedSupplier, productList, items]);

	const fetchSuppliers = async () => {
		const res = await getSuppliers();
		setSuppliers(res.suppliers);

		console.log(res.suppliers);
	};

	const savePurchaseOrder = async () => {
		if (!selectedSupplier) return toast.error("Please select a supplier");
		if (!productList.length) return toast.error("Please select a product");

		console.log(purchaseOrder);
		const res = await addPurchaseOrder(purchaseOrder);

		if (res.status === "Success") {
			fetchPurchaseOrders();
			setIsAddPopUpOpen(false);
			return toast.success("Purchase Order Created");
		}

		toast.error("Error creating Purchase Order");
	};

	return (
		<PopupOverlay>
			<PopupContent>
				<form>
					<HeaderTitle>Create Purchase Order</HeaderTitle>
					<FieldContainer>
						<LabelContainer first>
							<Label>Product</Label>
						</LabelContainer>
						<div>
							<ProductList productList={productList} setProductList={setProductList} />
						</div>
						<LabelContainer first>
							<Label>Supplier</Label>
						</LabelContainer>
						<div>
							<FieldTitleLabel>Supplier</FieldTitleLabel>
							<Select value={selectedSupplier} onChange={(e) => setSelectedSupplier(e.target.value)}>
								<Option value="">Select a supplier</Option>
								{suppliers.map((supplier) => (
									<Option key={supplier.supplier_id} value={supplier.supplier_id}>
										{supplier.supplier_name}
									</Option>
								))}
							</Select>
						</div>
					</FieldContainer>

					<ButtonsContainer>
						<CloseButton onClick={() => setIsAddPopUpOpen(false)} type="button">
							Close
						</CloseButton>

						<Button onClick={() => savePurchaseOrder()} type="button">
							Save
						</Button>
					</ButtonsContainer>
				</form>
			</PopupContent>

			{isConfirmReceivedOpen && (
				<ConfirmPurchaseOrderModalContainer
					purchaseOrderId={"Your Purchase Order ID"} // pass the relevant ID
					close={() => setIsReceiveConfirmOpen(false)}
				/>
			)}
		</PopupOverlay>
	);
};

const ProductList = ({ productList, setProductList }) => {
	const [products, setProducts] = useState([]);

	const [selectedProduct, setSelectedProduct] = useState(0);

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		const res = await getProducts();
		setProducts(res.products);

		console.log(res.products);
	};

	// const addProduct = (productId) => {
	// 	if (!selectedProduct) return;

	// 	const product = products.find((product) => product.product_id == selectedProduct);
	// 	if (!product) return;

	// 	//if product already exists in the list, just increment the quantity
	// 	const existingProduct = productList.find((p) => p.product_id === product.product_id);
	// 	if (existingProduct) {
	// 		const updatedList = productList.map((p) => {
	// 			if (p.product_id === product.product_id) {
	// 				return { ...p, quantity: p.quantity + 1 };
	// 			}
	// 			return p;
	// 		});

	// 		return;
	// 	}
	// 	product.quantity = 1;
	// 	setProductList([...productList, product]);
	// 	setSelectedProduct(0);
	// };

	const addProduct = (productId) => {
		// Check if a product is actually selected
		if (!productId) return;

		// Find the product in the products array
		const productToAdd = products.find((product) => product.product_id === Number(productId));
		if (!productToAdd) return;

		// Check if the product already exists in the productList
		const existingProductIndex = productList.findIndex((p) => p.product_id === productToAdd.product_id);

		if (existingProductIndex !== -1) {
			// Product exists, increase quantity
			const updatedList = productList.map((product, index) => {
				if (index === existingProductIndex) {
					return { ...product, quantity: product.quantity + 1 };
				}
				return product;
			});

			setProductList(updatedList);
		} else {
			// Product doesn't exist, add to list
			setProductList([...productList, { ...productToAdd, quantity: 1 }]);
		}

		// Reset the selectedProduct
		setSelectedProduct("");
	};

	const updateProductQuantity = (product, action) => {
		let updatedList = productList.map((p) => {
			if (p.product_id === product.product_id) {
				let newQuantity = p.quantity;

				switch (action) {
					case "add":
						newQuantity = p.quantity + 1;
						break;
					case "subtract":
						newQuantity = p.quantity > 0 ? p.quantity - 1 : 0;
						break;
					default:
						break;
				}

				return { ...p, quantity: newQuantity };
			}
			return p;
		});

		// Remove products with zero quantity
		updatedList = updatedList.filter((p) => p.quantity > 0);
		setProductList(updatedList);
	};

	const handleQuantityChange = (product, valueAsString) => {
		const valueAsNumber = Number(valueAsString);

		if (!isNaN(valueAsNumber) && valueAsNumber >= 0) {
			const updatedList = productList.map((p) => (p.product_id === product.product_id ? { ...p, quantity: valueAsNumber } : p));
			setProductList(updatedList);
		}
	};

	return (
		<div>
			<div>
				<Select
					value={selectedProduct}
					onChange={(e) => {
						setSelectedProduct(e.target.value);
						addProduct(e.target.value); // Call addProduct with the selected product ID
					}}
				>
					<Option value="">Select a Product</Option>
					{products.map((product) => (
						<Option key={product.product_id} value={product.product_id}>
							{product.product_code} | {product.product_name}
						</Option>
					))}
				</Select>
				{productList.map((item) => (
					<div key={item.product_id}>
						<Product key={item.product_id} active={item.quantity > 1}>
							<div className="productInformation">
								<div className="wrapper">
									<Image src={item.image_link == "testing" ? "/sabon.png" : item.image_link.replace(/\\/g, "/")} width={40} height={40} alt="Product image" />

									<div>
										<p className="productName">
											{item.product_name} |
											{item.attribute.map((attribute) => {
												return <> {attribute.value} | </>;
											})}
										</p>

										<div className="quantity">
											<span onClick={() => updateProductQuantity(item, "subtract")} className="minus">
												<FontAwesomeIcon icon={faMinus} />
											</span>
											<input
												type="text"
												value={item.quantity}
												onChange={(e) => handleQuantityChange(item, e.target.value)}
												onBlur={(e) => {
													if (e.target.value === "0") {
														const updatedList = productList.filter((p) => p.product_id !== item.product_id);
														setProductList(updatedList);
													}
												}}
											/>

											<span onClick={() => updateProductQuantity(item, "add")}>
												<FontAwesomeIcon icon={faPlus} />
											</span>
										</div>
									</div>
								</div>
							</div>
						</Product>
					</div>
				))}
			</div>
		</div>
	);
};

export default AddPurchaseOrder;
