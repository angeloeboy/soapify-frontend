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
import { addPurchaseOrder, confirmPurchaseOrder } from "@/api/purchaseOrder";
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

const ViewPurchaseOrder = ({ selectedPurchaseOrder, setIsAddPopUpOpen, fetchPurchaseOrders }) => {
	const [isConfirmReceivedOpen, setIsReceiveConfirmOpen] = useState(false);

	const [suppliers, setSuppliers] = useState([]);
	const [selectedSupplier, setSelectedSupplier] = useState(0);
	const [productList, setProductList] = useState([]);
	const [purchaseOrder, setPurchaseOrder] = useState(selectedPurchaseOrder);

	useEffect(() => {
		fetchSuppliers();
	}, []);

	const fetchSuppliers = async () => {
		const res = await getSuppliers();
		setSuppliers(res.suppliers);

		console.log(res.suppliers);
	};

	const confirmPurchaseOrderFunc = async () => {
		console.log(purchaseOrder.purchase_order_items);

		//compare the purchase_order_item_quantity and purchase_order_item_current_quantity

		const purchaseOrderObject = {
			purchaseOrderId: purchaseOrder.purchase_order_id,
			itemsReceived: purchaseOrder.purchase_order_items.map((item) => {
				return {
					itemId: item.purchase_order_item_id,
					receivedQuantity:
						item.purchase_order_item_current_quantity > 0
							? item.purchase_order_item_quantity - item.purchase_order_item_current_quantity
							: item.purchase_order_item_quantity,
				};
			}),
			warehouse_id: 2,
			area_id: 1,
		};

		console.log(purchaseOrderObject);

		const res = await confirmPurchaseOrder(purchaseOrderObject);
		console.log(res);

		if (res.status == "Success") {
			setIsReceiveConfirmOpen(false);
			setIsAddPopUpOpen(false);
			fetchPurchaseOrders();
			toast.success("Purchase Order Confirmed");
			return;
		}

		toast.error("Error Confirming Purchase Order");
	};

	const checkStatus = (po) => {
		if (po.purchase_order_items.length === 0) {
			return "Pending";
		}

		let allDelivered = true;
		let hasBackOrder = false;

		po.purchase_order_items.forEach((item) => {
			if (item.purchase_order_item_current_quantity !== item.purchase_order_item_quantity) {
				allDelivered = false;
				// Check for back order
				if (item.purchase_order_item_current_quantity > 0) {
					hasBackOrder = true;
				}
			}
		});

		if (allDelivered) {
			return "Delivered";
		} else if (hasBackOrder) {
			return "Has Back Order";
		} else {
			return "Pending";
		}
	};

	return (
		<PopupOverlay>
			<PopupContent>
				<form>
					<HeaderTitle>View Purchase Order</HeaderTitle>
					<FieldContainer>
						<LabelContainer first>
							<Label>Product</Label>
						</LabelContainer>
						<div>
							<ProductList productList={productList} setProductList={setProductList} purchaseOrder={purchaseOrder} />
						</div>
						<LabelContainer first>
							<Label>Supplier</Label>
						</LabelContainer>
						<div>
							<FieldTitleLabel>Supplier</FieldTitleLabel>
							<Select value={purchaseOrder.supplier_id}>
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

						{checkStatus(purchaseOrder) !== "Delivered" && (
							<Button onClick={() => setIsReceiveConfirmOpen(true)} type="button">
								Receive
							</Button>
						)}
					</ButtonsContainer>
				</form>
			</PopupContent>

			{isConfirmReceivedOpen && (
				<ConfirmPurchaseOrderModalContainer
					purchaseOrderId={"Your Purchase Order ID"} // pass the relevant ID
					close={() => setIsReceiveConfirmOpen(false)}
					confirmPurchaseOrderFunc={confirmPurchaseOrderFunc}
					purchaseOrder={selectedPurchaseOrder}
					fetchPurchaseOrders={fetchPurchaseOrders}
					closePopup={() => setIsAddPopUpOpen(false)}
				/>
			)}
		</PopupOverlay>
	);
};

const ProductList = ({ productList, setProductList, purchaseOrder }) => {
	const [products, setProducts] = useState([]);

	const [selectedProduct, setSelectedProduct] = useState(0);

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		const res = await getProducts();
		setProducts(res.products);

		console.log(res.products);

		const NewproductList = purchaseOrder.purchase_order_items.map((item) => {
			//loop throught list of products
			const product = res.products.find((product) => product.product_id == item.product_id);
			return {
				...product,
				quantity: item.purchase_order_item_quantity,
				current_quantity: item.purchase_order_item_current_quantity,
			};
		});

		setProductList(NewproductList);
	};

	return (
		<div>
			<div>
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
											<p>Quantity: {item.quantity}</p>
											<p>Quantity received: {item.current_quantity}</p>
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

export default ViewPurchaseOrder;
